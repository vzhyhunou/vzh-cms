var path = require('path');

module.exports = {
    entry: '@basedir@/src/main/js/app.js',
    devtool: 'source-map',
    output: {
        path: '@basedir@',
        filename: './resources/built/bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                  presets: [
                    'babel-preset-es2015',
                    'babel-preset-react'
                  ].map(require.resolve)
                }
            }
        ]
    },
    resolve: {
        modules: [path.join(__dirname, 'node_modules')]
    }
};