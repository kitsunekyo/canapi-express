/* eslint-disable */
const webpack = require("webpack");
const path = require("path");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  devtool: "source-map",
  mode: "development",
  entry: "./admin/assets/js/index.js",
  output: {
    path: path.resolve(__dirname, "./public"),
    publicPath: "/",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, "admin"),
        use: ["babel-loader"]
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, "admin"),
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  node: {
    fs: "empty"
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new webpack.ProvidePlugin({
      React: "react",
      ReactDOM: "react-dom"
    }),
    new Dotenv(),
  ],
  devServer: {
    port: 8080,
    https: false,
    compress: false,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
};
