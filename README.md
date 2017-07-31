### 初始化一个react项目

```shell
mkdir init_react
cd init_react
npm init //如果没有什么特殊的配置一路回车，得到package.json文件
```
### 目录结构
> dist  --------------------------------------------->  //用于存放webpack打包之后的项目文件

>> index.html ----------------------------------> //webpack打包之后的html文件

>> main.hash值.bundle.js   --------------------->  //webpack打包之后的js文件

> node_modules -------------------------------->  //项目当中试用的第三方库文件存放目录

> src  ---------------------------------------------->  //生产环境中代码存放目录

>> index.html ---------------------------------->  //前端统一的html模版文件

>> index.js ------------------------------------->  //项目的主入口文件

>> index.less ----------------------------------->    //项目中的样式文件

> .babelrc  ---------------------------------------->          //babel的配置文件

> package.js

> webpack.config.js  ----------------------------->     //webpack的配置文件

### 安装webpack打包工具和webpack-dev-server服务器

```shell
npm install webapck --save
npm install webpack-dev-server --save
```

### 安装react和react-dom

```shell
npm install react --save
npm install react-dom --save
```

### 安装babel

```shell
npm install babel-preset-es2015 babel-preset-react babel-preset-stage-0 babel-polyfill babel-core --save-dev
```

创建.babelrc文件,配置babel 预处理

```json
{
   "presets": ["es2015","react","stage-0"]
}
```
### 处理样式需要安装less
```shell
npm install less --save
```
### 安装webpack 的 loader
```shell
npm install babel-loader style-loader css-loader less-loader --save-dev
```
### 安装webpack插件
```shell
npm install extract-text-webpack-plugin html-webpack-plugin --save-dev
```
### 创建webpack.config.js文件
```javascript
var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')  
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devtool:'eval', //source-map
    entry:{
        main:'./src/index.js'//入口文件
    },
    output:{
        path:path.join(__dirname, 'dist'),//出口文件
        filename: '[name].[hash:8].bundle.js'
    },
    resolve: {
        extensions: [' ', '.js','.jsx', '.json','.css','.less']
    },
    module:{
        rules: [{
            test: /\.less$/,//加载less样式的loader
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ['css-loader', 'less-loader']
            })
        }, {
            test: /\.js?$/,//用于解析es6语法的babel-loader
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

```
### 修改package.json
```javascript
{
  "name": "init_react",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack-dev-server --hot --inline --progress --colors --watch --compress --content-base ./dist  --port 8086 --host 0.0.0.0",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "less": "^2.7.2",
    "react": "^15.6.1",
    "react-dom": "^15.6.1",
    "webpack": "^3.3.0",
    "webpack-dev-server": "^2.6.1"
  },
  "devDependencies": {
    "babel-core": "^6.25.0",
    "babel-loader": "^7.1.1",
    "babel-polyfill": "^6.23.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "css-loader": "^0.28.4",
    "extract-text-webpack-plugin": "^3.0.0",
    "html-webpack-plugin": "^2.29.0",
    "less-loader": "^4.0.5",
    "style-loader": "^0.18.2"
  }
}
```
### 创建html模版文件
在项目的根目录下创建src目录并创建index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```
在src目录下创建index.js
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
)
```
### GitHub项目代码地址
> https://github.com/shuoer123/init_react