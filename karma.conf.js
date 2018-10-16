const webpackConfig = require('./webpack.config');
webpackConfig.optimization = {};

module.exports = function (config) {

    config.set({
        browsers: ['jsdom'],
        frameworks: ['mocha'],
        files: [
            'src/main/app/src/tests.webpack.js'
        ],
        preprocessors: {
            'src/main/app/src/tests.webpack.js': ['webpack']
        },
        reporters: ['dots'],
        webpack: webpackConfig
    });
};
