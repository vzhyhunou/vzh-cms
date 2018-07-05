const baseConfig = require('./karma.conf.js');

module.exports = function (config) {

    baseConfig(config);

    config.set({
        singleRun: true
    });
};
