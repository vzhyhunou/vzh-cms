const webpackConfig = require('./webpack.config');
webpackConfig.optimization = {};

module.exports = function (config) {

    config.set({
        browsers: ['jsdom'],
        frameworks: ['mocha'],
        files: [
            'src/tests.webpack.js'
        ],
        preprocessors: {
            'src/tests.webpack.js': ['webpack']
        },
        reporters: ['dots'],
        webpack: webpackConfig
    });
};
