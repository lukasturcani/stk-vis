const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
    entry: {
        App: './src/stk-vis/index.tsx',
    },
    target: 'electron-renderer',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'stkVis',
            template: './src/stk-vis/template.html',
        }),
    ],
    mode: 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            'mongo-configurator':
                path.join(__dirname, './src/mongo-configurator'),
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['ts-loader'],
            },
        ],
    },
}
