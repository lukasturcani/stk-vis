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
            'stk-vis': path.join(
                __dirname,
                './src/stk-vis',
            ),

            'mongo-configurator': path.join(
                __dirname,
                './src/mongo-configurator',
            ),

            'StkVis.UpdateFields': path.join(
                __dirname,
                './output/StkVis.UpdateFields',
            ),

            'StkVis.StkVis.Reducers': path.join(
                __dirname,
                './output/StkVis.StkVis.Reducers',
            ),

            'StkVis.StkVis': path.join(
                __dirname,
                './output/StkVis.StkVis',
            ),

            'StkVis.StkVis.Props': path.join(
                __dirname,
                './output/StkVis.StkVis.Props',
            ),

            'MongoConfigurator.MongoConfigurator': path.join(
                __dirname,
                './output/MongoConfigurator.MongoConfigurator',
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
