var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require('path');
var argv = process.argv;
var uglifyIndex = argv.indexOf('--uglify'),
    plugins = [
        new ExtractTextPlugin("[name].css")
    ];

if(uglifyIndex!=-1){
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
}

module.exports = {
    context: path.join(process.cwd(), 'web', 'src'),
    entry: {
        "index": "index.js"
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    output: {
        path: path.join(process.cwd(), 'web', 'dist'),
        filename: '[name].js'
    },
    plugins: plugins,
    module: {
        // Disable handling of unknown requires
        unknownContextRegExp: /$^/,
        unknownContextCritical: false,

        // Disable handling of requires with a single expression
        //exprContextRegExp: /$^/,
        exprContextCritical: false,

        // Warn for every expression in require
        //wrappedContextCritical: true,
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015','react'],
                    plugins:[
                        "transform-remove-strict-mode"
                    ]
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
			{
				test:/\.less$/,
				loader:ExtractTextPlugin.extract('style-loader','raw-loader!less-loader')
			},
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    }
};
