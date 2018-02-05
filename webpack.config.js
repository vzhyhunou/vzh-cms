var path = require('path');
var webpack = require("webpack");

module.exports = {
    entry: {
        index: '@basedir@/src/main/js/index.js',
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
                        'babel-preset-es2015',
                        'babel-preset-react'
                    ].map(require.resolve)
                }
            }
        ]
    },
    resolve: {
        modules: [path.join(__dirname, 'node_modules')]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            filename: "commons.js"
        })
    ]
};
