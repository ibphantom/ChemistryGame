// webpack.config.js

const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { GenerateSW } = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './src/main.ts',
  output: {
    filename: 'bundle.js', // Keep the filename as 'bundle.js' since your index.html references it
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true, // Clean the output directory before emit
  },
  experiments: {
    topLevelAwait: true,
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'public/assets'),
    },
  },
  module: {
    rules: [
      // Vue Loader
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      // TypeScript Loader
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      // CSS Loader
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      // SCSS/SASS Loader
      {
        test: /\.s[ac]ss$/i,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
      // Asset Loader
      {
        test: /\.(png|jpe?g|gif|svg|glb|gltf)$/,
        type: 'asset/resource',
      },
      // Web Worker Loader
      {
        test: /\.worker\.ts$/,
        use: [
          {
            loader: 'worker-loader',
            options: {
              filename: '[name].[contenthash].js',
            },
          },
          'ts-loader',
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'), // Copy everything from 'public'
          to: path.resolve(__dirname, 'dist'), // To the 'dist' directory
          globOptions: {
            ignore: ['**/index.html'], // Ignore index.html if you're using HtmlWebpackPlugin
          },
        },
        {
          from: path.resolve(__dirname, 'public', 'index.html'), // Copy index.html
          to: path.resolve(__dirname, 'dist', 'index.html'),
        },
      ],
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new GenerateSW({
      swDest: 'service-worker.js',
    }),
  ],
  stats: {
    errorDetails: true,
  },
};
