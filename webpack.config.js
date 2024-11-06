// webpack.config.js

const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { GenerateSW } = require('workbox-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './src/main.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
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
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true,
            },
          },
        ],
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
      // Web Worker Loader (built-in)
      {
        test: /\.worker\.ts$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new GenerateSW({
      swDest: 'service-worker.js',
    }),
  ],
};
