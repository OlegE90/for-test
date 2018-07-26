const path = require('path');
const express = require('express');
const webpack = require('webpack');

const config = require('../../tools/webpack.dev.config.js');

const server = express();
const compiler = webpack(config);

const webpackDevHot = require('webpack-hot-middleware')(compiler);
const webpackDevMid = require('webpack-dev-middleware')(compiler, config.devServer);
const staticMid = express.static("dist");

server.use(webpackDevMid);
server.use(webpackDevHot);
server.use(staticMid);

server.listen(8080, () => {
  console.log("Server")
});