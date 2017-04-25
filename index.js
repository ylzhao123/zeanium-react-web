var BASE_PATH = './dist/';
require(BASE_PATH + 'zn.base.js');
require(BASE_PATH + 'util/index.js');

var VIEW_EXPORTS = [
    'global',
    'animate',
    'basic',
    'data',
    'form',
    'graph',
    'loader',
    'wap'
], _EXPORTS = {};

var _temp = null,
    _path = null;
for(var key in VIEW_EXPORTS) {
    _path = BASE_PATH + 'view/' + VIEW_EXPORTS[key] + '/index.js';
    _temp = require(_path);
    _EXPORTS[key] =_temp;
    for(var _tkey in _temp){
        _EXPORTS[_tkey] = _temp[_tkey];
    }
}

module.exports = _EXPORTS;