const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  target: 'web',
  context: path.resolve('src'),
  entry: {
    main: [
      'core-js/fn/promise',
      './main.jsx'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]-bundle.js',
    // Path in index.html /main.js
    publicPath: "/"
  } ,
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
      {
        test: /\.less$/,
        use:  ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.html/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].html"
            }
          },
          {
            loader: "extract-loader"
          },
          {
            loader: "html-loader",
            options: {
              attrs: ['img:src']
            }
          }
        ],
      },
      {
        test: /\.png/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name]-[hash:8].[ext]"
            }
          }
        ],
      }
    ]
  },
  devServer: {
    contentBase: 'dist',
    overlay: true,
    hot: true,
    stats: {
      colors: true,
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};