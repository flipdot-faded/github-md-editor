const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        './src/index.tsx',
        'file-loader?name=style.css!extract-loader!./src/style/index.scss'
    ],
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json', '.ejs', '.tsx', '.ts', '.scss']
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react']
                    }
                }
            },
            {
                test: /\.(ts|tsx)$/,
                use: ['awesome-typescript-loader']
            },
            {
                test: /\.css$/,
                use: ['css-loader']
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
        })
    ]
};
