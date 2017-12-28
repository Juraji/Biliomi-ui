const ExtractTextPlugin = require("extract-text-webpack-plugin");
const helpers = require("./dev-scripts/paths.helpers");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const LessPluginCleanCSS = require("less-plugin-clean-css");
const TSLinkPlugin = require("tslint-webpack-plugin");
const Webpack = require("webpack");

const webpackEntry = {
  Vendor: "./src/Vendor.ts",
  BiliomiUI: "./src/BiliomiUI.bootstrap.ts"
};

module.exports = {
  externals: {"Intl": "Intl"},

  entry: webpackEntry,

  resolve: {
    extensions: [".js", ".ts"],
    enforceExtension: false
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
        test: /\.pug$/,
        exclude: helpers.root("src", "app"),
        use: [
          {loader: "html-loader"},
          {loader: "pug-html-loader"}
        ]
      },
      {
        test: /\.pug$/,
        include: helpers.root("src", "app"),
        use: [
          {
            loader: "file-loader",
            options: {name: "assets/html/[name].[hash].html"}
          },
          {loader: "pug-html-loader"}
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
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {loader: "css-loader"},
            {
              loader: "less-loader",
              options: {sourceMap: true, lessPlugins: [new LessPluginCleanCSS({advanced: true})]}
            }
          ]
        })
      }
    ]
  },

  plugins: [
    new TSLinkPlugin({
      files: [helpers.root("src", "**", "*.ts")],
      fix: true
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: helpers.root("src") + "/BiliomiUI.template.pug",
      favicon: helpers.root("src") + "/images/favicon.ico",
      appleTouchIcon: helpers.root("src") + "/src/images/biliomi-icon-cropped-small.gif",
      inject: "body",
      hash: true,
      xhtml: true,
      chunks: Object.keys(webpackEntry),
      chunksSortMode: "dependency"
    }),
    new Webpack.optimize.CommonsChunkPlugin({name: ['Vendor']}),
    new Webpack.ContextReplacementPlugin(/(.+)?angular([\\\/])core(.+)?/, helpers.root("src"), {})
  ]
};
