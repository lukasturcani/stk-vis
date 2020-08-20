const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


module.exports = {
    entry: {
        'stk-vis': './src/Page/StkVis/index.tsx',

        'mongo-configurator': './src/Page/MongoConfigurator/index.tsx',

        'unsorted-all':
            './src/Page/MoleculeBrowser/UnsortedAll/index.tsx',

        'unsorted-building-blocks':
            './src/Page/MoleculeBrowser/'
            +'UnsortedBuildingBlocks/index.tsx',

        'unsorted-constructed-molecules':
            './src/Page/MoleculeBrowser/'
            +'UnsortedConstructedMolecules/index.tsx',

        'sorted-all':
            './src/Page/MoleculeBrowser/SortedAll/index.tsx',

        'sorted-building-blocks':
            './src/Page/MoleculeBrowser/'
            +'SortedBuildingBlocks/index.tsx',

        'sorted-constructed-molecules':
            './src/Page/MoleculeBrowser/'
            +'SortedConstructedMolecules/index.tsx',

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
            title: 'UnsortedAll',
            template: './src/template.html',
            chunks: ['unsorted-all'],
            filename: 'unsorted-all.html',
        }),
        new HtmlWebpackPlugin({
            title: 'UnsortedBuildingBlocks',
            template: './src/template.html',
            chunks: ['unsorted-building-blocks'],
            filename: 'unsorted-building-blocks.html',
        }),
        new HtmlWebpackPlugin({
            title: 'UnsortedConstructedMolecules',
            template: './src/template.html',
            chunks: ['unsorted-constructed-molecules'],
            filename: 'unsorted-constructed-molecules.html',
        }),
        new HtmlWebpackPlugin({
            title: 'SortedAll',
            template: './src/template.html',
            chunks: ['sorted-all'],
            filename: 'sorted-all.html',
        }),
        new HtmlWebpackPlugin({
            title: 'SortedBuildingBlocks',
            template: './src/template.html',
            chunks: ['sorted-building-blocks'],
            filename: 'sorted-building-blocks.html',
        }),
        new HtmlWebpackPlugin({
            title: 'SortedConstructedMolecules',
            template: './src/template.html',
            chunks: ['sorted-constructed-molecules'],
            filename: 'sorted-constructed-molecules.html',
        }),
    ],
    mode: 'development',
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


            'Page.MongoConfigurator': path.join(
                __dirname,
                './output/Page.MongoConfigurator',
            ),


            'Page.MoleculeBrowser.UnsortedAll': path.join(
                __dirname,
                './output/Page.MoleculeBrowser.UnsortedAll',
            ),

            'Page.MoleculeBrowser.UnsortedBuildingBlocks': path.join(
                __dirname,
                './output/Page.MoleculeBrowser.UnsortedBuildingBlocks',
            ),

            'Page.MoleculeBrowser.UnsortedConstructedMolecules':
                path.join(
                    __dirname,
                    './output/Page.MoleculeBrowser.'
                    +'UnsortedConstructedMolecules',
                ),

            'Page.MoleculeBrowser.SortedAll': path.join(
                __dirname,
                './output/Page.MoleculeBrowser.SortedAll',
            ),

            'Page.MoleculeBrowser.SortedBuildingBlocks': path.join(
                __dirname,
                './output/Page.MoleculeBrowser.SortedBuildingBlocks',
            ),

            'Page.MoleculeBrowser.SortedConstructedMolecules':
                path.join(
                    __dirname,
                    './output/Page.MoleculeBrowser.'
                    +'SortedConstructedMolecules',
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
