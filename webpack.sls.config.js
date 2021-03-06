const path = require('path');
const slsw = require('serverless-webpack');

module.exports = {
    entry: slsw.lib.entries,
    devtool: 'source-map',
    resolve: {
        extensions: [
            '.js',
            '.jsx',
            '.json',
            '.ts',
            '.tsx'
        ]
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
    },
    target: 'async-node',
    module: {
        rules: [
            {
                test: /\.json/,
                loader: 'json-loader'
            },
            {
                test: /\.ts(x?)$/, loader: 'ts-loader',
            },
            {
                test: /\.mustache/,
                loader: 'mustache-loader?minify'
            }
        ],
    },
};
