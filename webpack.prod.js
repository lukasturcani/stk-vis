const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
    entry: {
        'stk-vis': './src/Page/StkVis/index.tsx',
    },
    target: 'electron-renderer',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'stkVis',
            template: './src/template.html',
            chunks: ['stk-vis'],
            filename: 'stk-vis.html',
        }),
    ],
    mode: 'production',
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            'SortType': path.join(
                __dirname,
                './output/SortType',
            ),

            'Page.StkVis': path.join(
                __dirname,
                './output/Page.StkVis',
            ),

            'Page.MoleculeTable': path.join(
                __dirname,
                './output/Page.MoleculeTable',
            ),

            'Page.ViewerSwitch': path.join(
                __dirname,
                './output/Page.ViewerSwitch',
            ),

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
