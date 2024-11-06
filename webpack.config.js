// webpack.config.js

const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { GenerateSW } = require('workbox-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/main.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm-bundler.js',
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'public/assets'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { appendTsSuffixTo: [/\.vue$/] },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg|mp3|glb|gltf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]',
        },
      },
      {
        test: /\.worker\.ts$/,
        use: [
          {
            loader: 'worker-loader',
            options: { filename: 'workers/[name].[hash].js' },
          },
          'ts-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      navigateFallback: '/index.html',
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'public'),
    historyApiFallback: true,
    compress: true,
    port: 8080,
    open: true,
  },
  mode: 'development',
};
