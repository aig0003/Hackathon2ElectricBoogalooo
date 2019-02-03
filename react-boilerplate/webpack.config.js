var path = require("path");
var webpack = require("webpack");

module.exports = {
  devtool: "eval",
  entry: ["webpack-dev-server/client?http://localhost:3000", "./src/index"],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/static/"
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {}
          },
          {
            loader: "css-loader",
            options: {}
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "awesome-typescript-loader"
          }
        ],
        include: path.join(__dirname, "src")
      }
    ]
  }
};
