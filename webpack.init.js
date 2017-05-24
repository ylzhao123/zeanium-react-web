var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var fs = require('fs');
var path = require('path');
var dirname = process.cwd(),
    argv = process.argv,
    appIndex = argv.indexOf('--app'),
    app = (appIndex !== -1) ? argv[appIndex+1] : '',
    pageIndex = argv.indexOf('--page'),
    page = (pageIndex !== -1) ? argv[pageIndex+1] : '',
    uglifyIndex = argv.indexOf('--uglify');

function initAppBasePath (){
    var _isApp = fs.existsSync(path.resolve(dirname, 'zn.app.config.js')),
        _base = null;
    if(_isApp){
        _base = path.resolve(dirname, 'web', 'src');
    }else {
        if(!fs.existsSync(path.resolve(dirname, 'zn.server.config.js'))){
            return null;
        }
        var _dir = fs.readdirSync(path.resolve(dirname, 'znapps'));
        if(!_dir.length){
            return null;
        }
        if(_dir.indexOf(app)!=-1){
            _base = path.resolve(dirname, 'znapps', app, 'web', 'src');
        }else {
            _base = path.resolve(dirname, 'znapps', _dir[0], 'web', 'src');
        }
    }

    return _base;
}

function initConfig(base) {
    var _plugins = [
        new ExtractTextPlugin("[name].css")
    ];
    if(uglifyIndex !== -1){
        _plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }));
    }
    var _config = {
        context: path.join(dirname, 'src'),
        entry: {
            "index": ['./index.js']
        },
        output: {
            path: path.join(dirname, 'dist'),
            filename: '[name].js'
        },
        plugins: _plugins
    };
    if(base){
        var _dir = fs.readdirSync(base);
        if(!_dir.length){
            return _config;
        }
        if(page && _dir.indexOf(page)!=-1){
            _config.context = path.resolve(base, page);
            _config.entry = {};
            _config.entry[page] = ['./_entry.js'];
        }else {
            _config.context = base;
            _config.entry = {};
            _dir.forEach(function (name){
                _config.entry[name] = ['./_entry.js'];
            });
        }
        _config.output = {
            path: path.resolve(base, '../www', 'dist'),
            filename: '[name].bundle.js'
        };
    }

    return _config;
}

module.exports = initConfig(initAppBasePath());
