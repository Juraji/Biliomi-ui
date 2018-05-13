const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpackMerge = require("webpack-merge");
const ExtractCSSPlugin = require("mini-css-extract-plugin");
const commonConfig = require("./webpack.common.conf");
const helpers = require("./dev-scripts/paths.helpers");

module.exports = webpackMerge(commonConfig, {
    devtool: "cheap-module-eval-source-map",
    mode: "development",

    output: {
        path: helpers.root("dist"),
        publicPath: "http://localhost:3000/",
        filename: "[name].js",
        chunkFilename: "[name].chunk.js"
    },

    plugins: [
        new CopyWebpackPlugin([{from: "resources", to: ""}, {from: "resources-dev", to: ""}]),
        new ExtractCSSPlugin()
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        hot: false,
        inline: false
    }
});
