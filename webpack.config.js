var webpack = require("webpack");
var path = require("path");

module.exports = {
	entry:[
		"webpack-dev-server/client?http://localhost:8080",
		"webpack/hot/only-dev-server",
		"./src/client/index.js"
	],
	output:{
		path:__dirname+"/public/build",
		filename:"boundle.js",
		publicPath:"http://localhost:8080/build",
	},
	resolve:{
		extensions:[".js",".jsx"]
	},
	module:{
		loaders:[
			{
				test:/\.js[x]?$/,
				include:path.join(__dirname,"src"),
				loaders:["react-hot-loader","babel-loader"],
			}
		]
	},
	devServer:{
		contentBase:"./public",
		hot:true,
		host:"localhost",
		proxy:{//设置代理
			"*":"http://localhost:"+3001
		},
	},
	plugins:[
		new webpack.HotModuleReplacementPlugin()
	]

}