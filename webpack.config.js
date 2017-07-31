var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')  
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool:'eval', //source-map
    entry:{
        main:'./src/index.js'
    },
    output:{
        path:path.join(__dirname, 'dist'),
        filename: '[name].[hash:8].bundle.js'
    },
    resolve: {
        extensions: [' ', '.js','.jsx', '.json','.css','.less']
    },
    module:{
        rules: [{
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ['css-loader', 'less-loader']
            })
        }, {
            test: /\.js?$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), //热更新
        new webpack.NoEmitOnErrorsPlugin(), //错误不编译
        new ExtractTextPlugin('style.css'), //css模块独立
        new HtmlWebpackPlugin({
                title: 'Redux Practive', //标题
                // favicon: './src/assets/img/favicon.ico', //favicon路径
                filename: './index.html', //生成的html存放路径，相对于 path
                template: './src/index.html', //html模板路径
                inject: true, //允许插件修改哪些内容，包括head与body`
                minify: { //压缩HTML文件
                    removeComments: true, //移除HTML中的注释
                    collapseWhitespace: false //删除空白符与换行符
                }
        })
     ]
}
