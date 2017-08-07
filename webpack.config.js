let webpack = require('webpack');
let path = require('path');

module.exports = {
  watch: false,
  entry: {
    app: path.join(__dirname, '/assets/scripts/app.js')
  },
  output: {
    path: path.join(__dirname, "dist/scripts/"),
    publicPath: "dist/scripts/",
    filename: "[name].js",
    chunkFilename: "[chunkhash].js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};