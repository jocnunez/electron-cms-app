const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const modeConfig = env => require(`./build-utils/webpack.${env.mode}.js`)(env);
const loadPresets = require('./build-utils/loadPresets');

const assets = [
    {
        from: 'src/img',
        to: 'img/'
    }
];

const plugins = [
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        minify: {
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true
        }
    }),
    new CopyWebpackPlugin([...assets], {
        ignore: ['.DS_Store']
    })
];

module.exports = ({ mode, presets }) => {
    return webpackMerge(
        {
            mode,
            output: {
                filename: '[name].[chunkhash:8].js'
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        options: {
                            plugins: ['@babel/plugin-syntax-dynamic-import'],
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'usage',
                                        targets: '>1%, not dead, not ie 11'
                                    }
                                ]
                            ]
                        }
                    }
                ]
            },
            plugins
        },
        modeConfig({ mode, presets }),
        loadPresets({ mode, presets })
    );
};
