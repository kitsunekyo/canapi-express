/* eslint-disable */
const webpack = require('webpack');
const vueloader = require('vue-loader');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin({
  filename: 'core.bundle.css',
});

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: {
    core: './app/js/app.js',
  },
  externals: ['window'],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        enforce: "pre",
        use: [
          "babel-loader",
          "eslint-loader"
        ],
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        enforce: 'pre',
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
          "eslint-loader"
        ],
        include: path.resolve(__dirname, 'app'),
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'app'),
        use: extractCSS.extract({
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
              minimize: true,
            },
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          }],
          fallback: 'style-loader?sourceMap',
          publicPath: '/dist',
        }),
      },
    ],
  },
  plugins: [
    extractCSS,
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
