/* eslint-disable */
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const config = require('./webpack.config');

config.plugins.push(
  new UglifyJSPlugin({
    uglifyOptions: {
      beautify: false,
      compress: true,
      comments: false
    }
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  })
);
module.exports = config;