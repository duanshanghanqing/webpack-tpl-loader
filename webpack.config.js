const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const mdToHtml = require('./plugins/md-to-html');

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, 'src/main.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'js/bundle-[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.tpl$/,
                use: [
                    // 'babel-loader',
                    {
                        loader: './loaders/tpl-loader', // loader 处理完成返回字符串
                        options: {
                            log: true
                        }
                    }
                ]
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        }),
        new mdToHtml({
            filename: 'README.html',// 编译后生成的文件名
            template: './README.md'
        })
    ],
    devServer: {
        static: {
          directory: path.resolve(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
        open: true,
        hot: true,
        historyApiFallback: true, // 解决f5刷新界面报404问题
    },
}