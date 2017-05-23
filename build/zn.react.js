module.exports = zn.react = {
    extendPath: function extendPath(path, views) {
        var _views = {};
        for (var key in views) {
            _views[path + key] = views[key];
        }

        return _views;
    },
    loadPaths: function loadPaths(paths, handler, ifDeep) {
        var _exports = {},
            _temp = null;
        for (var key in paths) {
            _temp = handler && handler(paths[key]);
            _exports[key] = _temp;
            if (ifDeep && zn.is(_temp, 'object')) {
                for (var _tkey in _temp) {
                    _exports[_tkey] = _temp[_tkey];
                }
            }
        }

        return _exports;
    }
};