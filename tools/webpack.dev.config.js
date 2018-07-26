const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
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