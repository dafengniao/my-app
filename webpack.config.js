var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry:  __dirname + "/app/app.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "[name]-[hash].js"//打包后输出文件的文件名
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
        loader: ExtractTextPlugin.extract('style', 'css!postcss')
        //loader: 'style!css!postcss'//添加对样式表的处理
      }
    ]
  },
  postcss: [
    require('autoprefixer')//调用autoprefixer插件
  ],
  plugins: [
  	new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new HtmlWebpackPlugin({
      template: __dirname + "/public/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
    }),
    new webpack.HotModuleReplacementPlugin(),//热加载插件
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
    	minimize: true,
		compress: {
			warnings: false,
		},
    }),
    new ExtractTextPlugin("[name]-[hash].css") 
  ],
  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    colors: true,//终端中输出结果为彩色
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    port: 6060,
    hot: true
  },
}