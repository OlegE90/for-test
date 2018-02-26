import webpack from 'webpack';

import {productionConfig} from './webpack.config.js';

webpack(productionConfig, (err, stats) => {});