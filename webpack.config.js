var path = require("path");

var webpack = require("webpack");

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
//let compassIncludes = "includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib");

module.exports = {
    devtool: 'cheap-module-source-map',
    context: path.join(__dirname, "src"),
    entry: {
        vendor: ["lodash", "jquery"],
        app: "./app.js"
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            //{
            //    test: /\.css$/,
            //    loader: ExtractTextPlugin.extract("style-loader", "css-loader", "postcss-loader"),
            //    include: path.join(__dirname, "src", "css")
            //},
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ),
                include: path.join(__dirname, "src", "scss")
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },

    externals: {
        MathJax: "MathJax"
    },


    plugins: [
        //Copies our index.html to dist
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            hash: true,
            filename: 'index.html',
            chunks: ['app']
        }),

        //Links our generated css
        //new ExtractTextPlugin('./css/style.css'),
        new ExtractTextPlugin('style.css'),

        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.bundle.js",
            minChunks: Infinity
        })

        //,
        //new FaviconsWebpackPlugin('./img/logo.png')
    ],

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        inline: true,
        host: "0.0.0.0",
        port: 3000,
        watch: true,
        stats: {
            progress: true,
            colors: true,
            reasons: true,
            chunks: false
        }
    }

};