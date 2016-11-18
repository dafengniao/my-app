var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  //devtool: 'eval-source-map',
  entry:  __dirname + "/app/app.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',//在webpack的module部分的loaders里进行配置即可
        query: {
          presets: ['es2015','react','es2016'],
          "env": {
    		"development": {
    			"plugins": [["react-transform", {
       				"transforms": [{
         				"transform": "react-transform-hmr",

        				"imports": ["react"],

         				"locals": ["module"]
        			}]
     			}]]
    		}
    	  }
  		}
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss'//添加对样式表的处理
        // loader: 'style!css?modules!postcss'//添加对样式表的处理
      }
    ]
  },
  postcss: [
    require('autoprefixer')//调用autoprefixer插件
  ],
  plugins: [
  	new HtmlWebpackPlugin({
      template: __dirname + "/public/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
}
