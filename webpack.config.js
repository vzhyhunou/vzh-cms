const path = require('path');

module.exports = {
    mode: 'none',
    entry: {
        "pages": '@basedir@/src/main/js/pages/index.js',
        "admin": '@basedir@/src/main/js/admin/index.js'
    },
    devtool: 'source-map',
    output: {
        path: '@basedir@/resources',
        publicPath: '/',
        filename: 'static/built/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['babel-preset-react', 'babel-preset-stage-2'].map(require.resolve),
                    plugins: ['babel-plugin-syntax-dynamic-import'].map(require.resolve)
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
