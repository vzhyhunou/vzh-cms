var path = require('path');

module.exports = {
    mode: 'none',
    entry: {
        "pages": '@basedir@/src/main/js/pages.js',
        "pages-manage": '@basedir@/src/main/js/pages-manage.js',
        "pages-edit": '@basedir@/src/main/js/pages-edit.js'
    },
    devtool: 'source-map',
    output: {
        path: '@basedir@/resources/static/built',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['babel-preset-react'].map(require.resolve)
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
