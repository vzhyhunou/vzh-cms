var path = require('path');

module.exports = {
    entry: {
        page: '@basedir@/src/main/js/page.js',
        pages: '@basedir@/src/main/js/pages.js'
    },
    devtool: 'source-map',
    output: {
        path: '@basedir@/resources/built',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        'babel-preset-env',
                        'babel-preset-react'
                    ].map(require.resolve)
                }
            }
        ]
    },
    resolve: {
        modules: [path.join(__dirname, 'node_modules')]
    },
    optimization: {
        splitChunks: {
            name: "commons",
            chunks: "initial"
        }
    }
};
