import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import {developConfig, serverConfig} from './webpack.config.js';

const {port, host, options} = serverConfig;

new WebpackDevServer(webpack(developConfig), options).listen(port, host);
