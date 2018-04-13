/* eslint-disable */
const webpack = require('webpack');
const vueloader = require('vue-loader');
const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: './resources/assets/js/main.js',
  output: {
    path: path.resolve(__dirname, './public'),
    publicPath: '/public/',
    filename: 'main.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          "babel-loader",
        ],
        include: path.resolve(__dirname, 'resources/assets/js'),
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              loaders: {
                scss: 'style-loader!css-loader!sass-loader'
              }
            }
          },
        ],
        include: path.resolve(__dirname, 'resources/assets/js/components'),
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'resources/assets/scss'),
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Vue: 'vue',
      Vuex: 'vuex',
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
  devServer: {
    port: 8080,
    https: true,
    compress: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.common.js',
    },
  },
};
