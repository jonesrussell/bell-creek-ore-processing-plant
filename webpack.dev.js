const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = require('./config');
const { getModernEntry, MultipleModernHtmlWebpackPlugin, getAssets } = require('./scripts/utils');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    context: path.resolve(__dirname, 'src'),
    entry: getModernEntry(config.entries),
    output: {
        path: path.resolve(__dirname, config.buildDir),
        filename: 'js/[name].js',
    },
    optimization: {
        emitOnErrors: true
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                ...getAssets(config.assets)
            ]
        }),
        ...MultipleModernHtmlWebpackPlugin(config.entries),
        new ESLintPlugin({})
    ],
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test: /\.(js|ts)$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    'cache-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            envName: 'modern' // Points to env.modern in babel.config.js
                        }
                    }]
            },
            {
                test: /\.s?css$/i,
                use: [
                    'style-loader',
                    'css-loader?sourceMap=true',
                    'sass-loader'
                ]
            },
            {
                test: /\.ico$/,
                loader: 'file-loader'
            }
        ]
    },
    stats: 'minimal'
};
