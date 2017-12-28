const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const TSLintPlugin = require("tslint-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const commonConfig = require("./webpack.common.conf");
const helpers = require("./dev-scripts/paths.helpers");

const uglifyJsPluginOptions = {
  sourceMap: true,
  beautify: false,
  comments: false,
  compress: {warnings: false, screw_ie8: true},
  mangle: {screw_ie8: true, keep_fnames: false}
};

module.exports = webpackMerge(commonConfig, {
  output: {
    path: helpers.root("dist"),
    publicPath: "/",
    filename: "assets/js/[name].[hash].js",
    chunkFilename: "assets/js/[name].[hash].chunk.js"
  },

  plugins: [
    // Linting
    new TSLintPlugin({files: [helpers.root("src", "**", "*.ts")]}),

    // Error handling
    new webpack.NoEmitOnErrorsPlugin(),

    // Extraction and packing
    new ExtractTextPlugin({filename: "assets/css/[name].[hash].css", disable: false, allChunks: true}),
    new CopyWebpackPlugin([{from: "resources", to: ""}]),

    // Optimisation
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CompressionPlugin({test: /\.js|\.html|\.css/}),
    new webpack.optimize.UglifyJsPlugin(uglifyJsPluginOptions)
  ]
});
