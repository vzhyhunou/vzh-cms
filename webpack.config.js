const path = require('path');

module.exports = {
    mode: 'none',
    entry: {
        "pages": './src/main/js/pages/index.js',
        "admin": './src/main/js/admin/index.js'
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'resources'),
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
                    presets: ['babel-preset-react', 'babel-preset-stage-2'],
                    plugins: ['babel-plugin-syntax-dynamic-import']
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            name: "commons",
            chunks: "initial"
        }
    }
};
