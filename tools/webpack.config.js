import path from 'path';
import HtmlWebpackPlugin  from 'html-webpack-plugin';
import ExtractTextPlugin  from 'extract-text-webpack-plugin';

const extractLess = new ExtractTextPlugin('bundle.css');

let mainConfig = {
    target: 'web',
    context: path.resolve('src'),
    entry: './main.jsx',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js',
        // Path in index.html /main.js
        publicPath: "/"
    } ,
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx'],
        // Allow absolute paths in imports, e.g. import Button from 'components/Button'
        modules: ['node_modules', 'src'],
    },
    module: {
        rules: [
            {
                test: /\.(jsx?)$/,
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
                    }
                ]
            },
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
    mode: "production",
    module: {
        ...mainConfig.module,
        rules: [
            ...mainConfig.module.rules,
            // Rules for Style Sheets
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
    entry: [
      './main.jsx'
    ],
    mode: "development",
    module: {
        ...mainConfig.module,
        rules: [
            ...mainConfig.module.rules,
            // Rules for Style Sheets
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
    overlay: true,
    stats: {
      colors: true
    },
    hot: true
  }
};