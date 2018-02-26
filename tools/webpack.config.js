const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

console.log(process.env.NODE_ENV);

const mainConfig = {
    target: 'web',
    context: path.resolve('src'),
    entry: './main.tsx',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    } ,
    devtool: env.prod ? 'source-map' : 'eval',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        // Allow absolute paths in imports, e.g. import Button from 'components/Button'
        modules: ['node_modules', 'src'],
    },
    module: {
        rules: [
            // Rules for JS
            {
                test: /\.(jsx|js|tsx?)$/,
                rules: [
                    {
                        loader: 'babel-loader',
                        include: [
                            path.resolve('src')
                        ],
                        options: {
                            babelrc: false,
                            presets: [
                                'react'
                            ]
                        }
                    },
                    {
                        test: /\.tsx?$/,
                        exclude: /node_modules/,
                        loader: 'ts-loader'
                    }
                ]
            },
            // Rules for Style Sheets
            {
                test: /\.less$/,
                use:  ["style-loader", "css-loader", "less-loader"],
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css')
    ]
};

config = {
    ...mainConfig,
};

module.exports = config;