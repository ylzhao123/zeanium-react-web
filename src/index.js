var BASE_PATH = './';
zn.react = {
    extendPath: function (path, views){
        var _views = {};
        for(var key in views){
            _views[path+key] = views[key];
        }

        return _views;
    },
    loadPaths: function (paths, handler){
        var _data = {},
            _value = null;
        for(var i = 0, _len = paths.length; i < _len; i++){
            _value = handler(paths[i]);
        }
    }
};
require(BASE_PATH + 'Application.js');
require(BASE_PATH + 'util/index.js');

var VIEW_EXPORTS = [
    'global',
    'basic',
    'data',
    'form',
    'graph',
    'loader',
    'wap'
], _path = null;

for(var key in VIEW_EXPORTS) {
    _path = BASE_PATH + 'view/' + VIEW_EXPORTS[key] + '/index.js';
    zn.overwrite(zn.react, require(_path));
}

module.exports = window.UI = zn.react;
