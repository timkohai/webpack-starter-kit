const path = require('path') 
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/scripts/index.js',
    output: {
        // filename: '[name].[chunkhash].js',
        filename: '[name].js',
        path: path.join(__dirname, 'build')
    },
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
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({template: './src/template/index.html'})
            
    ]

};