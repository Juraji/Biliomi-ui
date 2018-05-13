const ExtractCSSPlugin = require("mini-css-extract-plugin");
const helpers = require("./dev-scripts/paths.helpers");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const LessPluginCleanCSS = require("less-plugin-clean-css");
const IncludeSiblingChunksPlugin = require('html-webpack-include-sibling-chunks-plugin');
const Webpack = require("webpack");

const webpackEntries = {
    BiliomiUI: "./src/BiliomiUI.bootstrap.ts"
};

module.exports = {
    externals: {"Intl": "Intl"},

    entry: webpackEntries,

    resolve: {
        extensions: [".js", ".ts"],
        enforceExtension: false
    },

    optimization: {
        noEmitOnErrors: true,
        splitChunks: {
            cacheGroups: {
                angular: {
                    test: /[\\/]node_modules[\\/]@angular/,
                    name: false,
                    chunks: "initial",
                    priority: 1
                },
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: false,
                    chunks: "initial"
                }
            }
        }
    },

    module: {
        rules: [
            {
                test: /(?!\.d)..\.ts$/,
                use: [
                    {loader: "ts-loader"},
                    {loader: "angular2-router-loader"}
                ]
            },
            {
                test: /\.html/,
                exclude: helpers.root("src", "app"),
                use: [
                    {loader: "html-loader"}
                ]
            },
            {
                test: /\.html$/,
                include: helpers.root("src", "app"),
                use: [
                    {
                        loader: "file-loader",
                        options: {name: "assets/html/[name].[hash].html"}
                    }
                ]
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9.]+)?$/,
                exclude: [helpers.root("src", "images")],
                use: [{
                    loader: "file-loader",
                    options: {name: "assets/fonts/[name].[hash].[ext]"}
                }]
            },
            {
                test: /\.(png|jpe?g|gif|ico|svg)$/,
                exclude: [helpers.root("src", "styles", "fonts")],
                use: [{
                    loader: "file-loader",
                    options: {name: "assets/images/[name].[hash].[ext]"}
                }]
            },
            {
                test: /\.less$/,
                use: [
                    ExtractCSSPlugin.loader,
                    {loader: "css-loader"},
                    {
                        loader: "less-loader",
                        options: {lessPlugins: [new LessPluginCleanCSS({advanced: true})]}
                    }
                ]
            }
        ]
    },

    plugins: [
        new IncludeSiblingChunksPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: helpers.root("src") + "/BiliomiUI.template.html",
            favicon: helpers.root("src") + "/images/favicon.ico",
            appleTouchIcon: helpers.root("src") + "/src/images/biliomi-icon-cropped-small.gif",
            inject: "body",
            hash: true,
            xhtml: true,
            chunks: Object.keys(webpackEntries),
            chunksSortMode: "none"
        }),
        new Webpack.ContextReplacementPlugin(/(.+)?angular([\\\/])core(.+)?/, helpers.root("src"), {})
    ]
};
