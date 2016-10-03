var webpack = require('webpack');
var path = require('path');
var jqueryPath = path.join(__dirname, "./node_modules/jquery/dist/jquery.js");
var angularPath = path.join(__dirname, "./node_modules/angular/angular.js");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var openBrowserWebpackPlugin = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var definePlugin = new webpack.DefinePlugin({
    __DEV__: (process.env.BUILD_DEV||'dev').trim() == 'dev'
});

module.exports = {
    //打包的入口文件  String|Object
    entry: {
        index:path.resolve(__dirname, 'src/index.js'),
        vendor: ['jquery', 'angularJs'],
        a: path.resolve('src/a.js'),
        b: path.resolve('src/b.js')
    },
    output: { //配置打包结果     Object
        //定义输出文件路径
        path: path.resolve(__dirname, 'build'),
        //指定打包文件名称
        filename: '[name].[hash].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/, //正则，匹配到的文件后缀名
                // loader/loaders：string|array，处理匹配到的文件
                loader: 'babel-loader'
                // include：String|Array  包含的文件夹
                // exclude：String|Array  排除的文件夹
            },
            {
                test: /jquery.js$/,
                loader: "expose?jQuery"
            },
            //{
            //    test: /\.less/,
            //    loader: 'style!css!less'
            //},
            {
                test: /\.less/,
                loader: ExtractTextPlugin.extract("style-loader"
                    , "css-loader!less-loader")
            },
            {
                test: /\.css/,
                loader: ExtractTextPlugin.extract("style-loader"
                    , "css-loader")
            },
            //{
            //    test: /\.css/,
            //    loader: 'style!css'
            //},
            {
                test: /\.(woff|woff2|ttf|svg|eot)$/,
                loader: "url?limit=8192"

            },
            {
                test: /\.(jpg|png)$/,
                loader: "url?limit=8192"
            }
        ],
        noParse: [jqueryPath]
    },
    plugins: [
        definePlugin,
        new ExtractTextPlugin("bundle.css"),
        /*new HtmlWebpackPlugin({
            title: 'zhufeng-react',//标题
            template: './src/index.html', //模板文件
            filename:'./index.html' //产出后的文件名称
        }),*/
        new openBrowserWebpackPlugin({ url: 'http://localhost:8080' }),
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new HtmlWebpackPlugin({
            title:'珠峰Webpack',
            template:'./src/index.html',
            filename:'./a.html',
            chunks:['a','common.js']//包含产出的资源
        }),
        new HtmlWebpackPlugin({
            title:'珠峰Webpack',
            template:'./src/index.html',
            filename:'./b.html',
            chunks:['b','common.js']//包含产出的资源
        })
    ],
    devServer: {

        stats: { colors: true }, //显示颜色
        port: 8080,//端口
        inline:true,
        contentBase: 'build',//指定静态文件的根目录
        /*proxy: {
            '/api/*': {
                host: 'localhost',
                target: 'http://localhost:8080/book.json',
                pathRewrite: {
                    '/api/book' : ''
                }
            }
        }*/
    },

    resolve: {
        extension: ["",".js",".css",".json"],
        alias: {
            'jquery': jqueryPath,
            'angularJs': angularPath
        }
    }
};