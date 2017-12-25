const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpackMerge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const commonConfig = require("./webpack.common.conf");
const helpers = require("./dev-scripts/paths.helpers");

module.exports = webpackMerge(commonConfig, {
  devtool: "cheap-module-eval-source-map",

  output: {
    path: helpers.root("dist"),
    publicPath: "http://localhost:3000/",
    filename: "[name].js",
    chunkFilename: "[id].chunk.js"
  },

  plugins: [
    new CopyWebpackPlugin([{from: "resources", to: ""}, {from: "resources-dev", to: ""}]),
    new ExtractTextPlugin("[name].css")
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    hot: false
  }
});
