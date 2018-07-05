const webpackConfig = require('./webpack.config');
webpackConfig.optimization = {};

module.exports = function (config) {

    config.set({
        browsers: ['jsdom'],
        frameworks: ['mocha'],
        files: [
            '@basedir@/src/test/js/tests.webpack.js'
        ],
        preprocessors: {
            '@basedir@/src/test/js/tests.webpack.js': ['webpack']
        },
        reporters: ['dots'],
        webpack: webpackConfig
    });
};
