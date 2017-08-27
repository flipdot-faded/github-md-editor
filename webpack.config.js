const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: [
        'core-js/shim',
        'whatwg-fetch',
        './src/index.tsx',
        'file-loader?name=style.css!extract-loader!./src/style/index.scss'
    ],
    devServer: {
        contentBase: './dist'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['*', '.js', '.json', '.ejs', '.tsx', '.ts', '.scss']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: ['awesome-typescript-loader']
            },
            {
                test: /\.scss$/,
                use: ['css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|jpeg|png|svg)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|otf|woff|woff2|eot)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map'
        })
    ]
};
