import path from 'path';
import HtmlWebpackPlugin  from 'html-webpack-plugin';
import ExtractTextPlugin  from 'extract-text-webpack-plugin';

const extractLess = new ExtractTextPlugin('bundle.css');

let mainConfig = {
    target: 'web',
    context: path.resolve('src'),
    entry: './main.tsx',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    } ,
    devtool: 'eval',
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
        new HtmlWebpackPlugin({
            template: path.resolve('src/assets/index.html'),
            filename: 'index.html',
            inject: 'body'
        })
    ]
};

export const productionConfig = {
    ...mainConfig,
    module: {
        ...mainConfig.module,
        rules: [
            ...mainConfig.module.rules,
            {
                test: /\.less$/,
                use: extractLess.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    fallback: "style-loader"
                })
            }
        ]
    },
    plugins: [
        ...mainConfig.plugins,
        extractLess
    ]
};

export const developConfig = {
    ...mainConfig,
    module: {
        ...mainConfig.module,
        rules: [
            ...mainConfig.module.rules,
            {
                test: /\.less$/,
                use:  ["style-loader", "css-loader", "less-loader"],
            }
        ]
    },
    plugins: [
        ...mainConfig.plugins
    ]
};

export const serverConfig = {
    port: '8080',
    host: 'localhost',
    options: {
        stats: {
            colors: true
        },
        hot: true
    }
};