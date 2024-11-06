// webpack.config.js

const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { GenerateSW } = require('workbox-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // ... (rest of your config)
  module: {
    rules: [
      // ... (other rules)
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
      // ... (other rules)
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    // ... (other plugins)
  ],
  // ... (rest of your config)
};
