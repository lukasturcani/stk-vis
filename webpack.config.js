const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
    entry: {
        App: './src/stkVis/index.tsx',
        maybe: './src/maybe/index.tsx',
        'mongo-db-requests': './src/mongo-db-requests/index.tsx',
    },
    target: 'electron-renderer',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'stkVis',
            template: './src/stkVis/template.html',
        }),
    ],
    mode: 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            'actions': path.join(__dirname, './src/stkVis/actions'),
            'maybe': path.join(__dirname, './src/maybe'),
            'mongo-db-requests':
                path.join(__dirname, './src/mongo-db-requests'),
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
