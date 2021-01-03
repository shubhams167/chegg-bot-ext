// webpack.config.js
var webpack = require("webpack");

module.exports = {
	entry: {
		entry: __dirname + "/background.js",
	},
	output: {
		filename: "background.bundle.js",
	},
	mode: "production",
};
