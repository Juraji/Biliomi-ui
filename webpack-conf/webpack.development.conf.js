var webpack = require("webpack");
var webpackMerge = require("webpack-merge");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var commonConfig = require("./webpack.common.conf");
var helpers = require("./dev-scripts/paths.helpers");

module.exports = webpackMerge(commonConfig, {
    devtool: "cheap-module-eval-source-map",

    output: {
        path: helpers.root("dist"),
        publicPath: "http://localhost:3000/",
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: 'Vendor'}),
        new ExtractTextPlugin("[name].css")
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        hot: false
    }
});
