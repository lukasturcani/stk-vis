const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
    entry: {
        'stk-vis': './src/stk-vis/index.tsx',
        'molecule-browser': './src/molecule-browser/index.tsx',
        'mongo-configurator': './src/mongo-configurator/index.tsx',
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
        new HtmlWebpackPlugin({
            title: 'Mongo Configurator',
            template: './src/template.html',
            chunks: ['mongo-configurator'],
            filename: 'mongo-configurator.html',
        }),
        new HtmlWebpackPlugin({
            title: 'Molecule Browser',
            template: './src/template.html',
            chunks: ['molecule-browser'],
            filename: 'molecule-browser.html',
        }),
    ],
    mode: 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            'stk-vis': path.join(
                __dirname,
                './src/stk-vis/components',
            ),

            'mongo-configurator': path.join(
                __dirname,
                './src/mongo-configurator/components',
            ),

            'molecule-browser': path.join(
                __dirname,
                './src/molecule-browser/components',
            ),

            'StkVis.UpdateFields.UpdateFields': path.join(
                __dirname,
                './output/StkVis.UpdateFields.UpdateFields',
            ),

            'StkVis.StkVis': path.join(
                __dirname,
                './output/StkVis.StkVis',
            ),

            'StkVis.Action': path.join(
                __dirname,
                './output/StkVis.Action',
            ),

            'MongoConfigurator.MongoConfigurator': path.join(
                __dirname,
                './output/MongoConfigurator.MongoConfigurator',
            ),

            'MongoConfigurator.SearchKind': path.join(
                __dirname,
                './output/MongoConfigurator.SearchKind',
            ),

            'MongoConfigurator.Action': path.join(
                __dirname,
                './output/MongoConfigurator.Action',
            ),

            'MongoConfigurator.UpdateFields.UpdateFields': path.join(
                __dirname,
                './output/MongoConfigurator.UpdateFields.UpdateFields',
            ),

            'mongo-db-requests': path.join(
                __dirname,
                './src/mongo-db-requests',
            ),

            'maybe': path.join(
                __dirname,
                './src/maybe',
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
