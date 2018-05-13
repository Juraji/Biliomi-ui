const Webpack = require("webpack");
const WebpackMerge = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractCSSPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const commonConfig = require("./webpack.common.conf");
const helpers = require("./dev-scripts/paths.helpers");

const uglifyJsPluginOptions = {
    sourceMap: false,
    beautify: false,
    comments: false,
    compress: {warnings: false, screw_ie8: true},
    mangle: {screw_ie8: true, keep_fnames: false}
};

module.exports = WebpackMerge(commonConfig, {
    mode: "production",

    output: {
        path: helpers.root("dist"),
        publicPath: "/",
        filename: "assets/js/[name].[hash].js",
        chunkFilename: "assets/js/[name].[hash].chunk.js"
    },

    optimization: {
        minimize: true,
        minimizer: [
            new Webpack.optimize.UglifyJsPlugin(uglifyJsPluginOptions)
        ]
    },

    plugins: [
        // Extraction and packing
        new ExtractCSSPlugin({filename: "assets/css/[name].[hash].css"}),
        new CopyWebpackPlugin([{from: "resources", to: ""}]),

        // Optimisation
        new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new CompressionPlugin({test: /\.js|\.html|\.css/}),
    ]
});
