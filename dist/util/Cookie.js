'use strict';

module.exports = {
    setItem: function setItem(name, value, time) {
        var _name = name + '=' + encodeURIComponent(value);
        if (time) {
            _name += '; expires=' + new Date(+new Date() + time * 36E5).toGMTString();
        };
        document.cookie = _name;
    },
    getItem: function getItem(name) {
        var oRE = new RegExp('(?:; )?' + name + '=([^;]*);?');
        if (oRE.test(document.cookie)) {
            return decodeURIComponent(RegExp['$1']);
        } else {
            return null;
        }
    },
    removeItem: function removeItem(name) {
        this.setItem(name, null, -9999);
    },
    clear: function clear() {
        document.cookie = null;
    },
    getSecond: function getSecond(value) {
        var _value = value.substring(1, value.length) * 1;
        switch (value.substring(0, 1)) {
            case 's':
                return _value * 1000;
            case 'h':
                return _value * 60 * 60 * 1000;
            case 'd':
                return _value * 24 * 60 * 60 * 1000;
        }
    }
};