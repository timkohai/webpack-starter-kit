/**
TODO:
Fonts:
CSS/SCSS
Template: PUG?
*/



const path = require('path') 
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        sdk: './src/scripts/index.js'
    },
    output: {
        // filename: '[name].[chunkhash].js',
        filename: '[name].js',
        path: path.join(__dirname, 'build'),
        chunkFilename: '[name].js'
    },
    devtool: 'source-map',
    devServer: {
        host: '0.0.0.0',
        contentBase: path.join(__dirname, 'build'),
        port: 9005

    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: "babel-loader"
            }
        },{
            test: /\.(sa|sc|c)ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                // {
                //     loader: 'file-loader',
                //     options: {
                //         name: 'css/[name].css'
                //     }
                // },
                'css-loader',
                'sass-loader',
            ]
        },{
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 5000
                }
              }
            ]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({template: './src/template/index.html'}),
        new MiniCssExtractPlugin()
    ],
    optimization: {
        splitChunks: {
          chunks: "all",
          minSize: 0
        }
    },

};