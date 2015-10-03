// webpack.config.js
var path = require("path");
var webpack = require('webpack');

module.exports = {
	entry: {
		'smart-photo-gallery.back-end': './src/js/smart-photo-gallery/back-end/BackEndModule.js'
	},
	output: {
		path: 'dist/',
		filename: '[name].min.js'
	},
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
			{ test: /\.html$/, loader: 'html' },
			{ test: /\.png$/, loader: "url-loader?minetype=image/png" }
        ]
    },
	resolve: {
        root: [path.join(__dirname, "./src/js/bower_components")]
    },
	plugins: [
		new webpack.ResolverPlugin(
		  new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
		)
	]
};