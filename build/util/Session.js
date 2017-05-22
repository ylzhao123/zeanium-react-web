var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = zn.Class({
    static: true,
    methods: {
        jump: function jump(path, search, overwrite) {
            var _search = {},
                _searchAry = [],
                _value = null;
            zn.extend(_search, search);
            if (!overwrite) {
                zn.extend(_search, this._globalSearch);
            }
            if (!search) {
                this._search = {};
            }

            this._search = zn.extend(_search, this._search);

            for (var key in _search) {
                _value = _search[key];
                if (typeof _value != 'string') {
                    _value = JSON.stringify(_value);
                }
                _searchAry.push(key + '=' + _value);
            }
            if (_searchAry.length) {
                location.hash = path + '?' + _searchAry.join('&');
            } else {
                location.hash = path;
            }

            return this;
        },
        back: function back() {
            window.history.back();
        },
        setGlobalSearch: function setGlobalSearch(value) {
            this._globalSearch = value;
        },
        setHome: function setHome(value) {
            this._home = value;
        },
        doHome: function doHome() {
            if (this._home) {
                this.jump(this._home);
            }
        },
        getPath: function getPath() {
            return location.hash.slice(1);
        },
        clear: function clear() {
            return this.getEngine().clear(), this;
        },
        reset: function reset() {
            return this.clear();
        },
        setEngine: function setEngine(engine) {
            this._engine = engine;
        },
        getEngine: function getEngine() {
            var _engine = this._engine || 'localStorage'; // Cookie, sessionStorage, localStorage
            if (_engine && typeof _engine == 'string') {
                _engine = window[_engine];
            }

            return _engine;
        },
        setKey: function setKey(key) {
            this._key = key;
        },
        getKey: function getKey() {
            return this._key || 'WEB_LOGIN_SESSION';
        },
        setKeyValue: function setKeyValue(key, value, timeout) {
            var _value = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object' ? JSON.stringify(value) : value;
            return this.getEngine().setItem(key, _value, timeout), this;
        },
        getKeyValue: function getKeyValue(key) {
            return this.getEngine().getItem(key);
        },
        jsonKeyValue: function jsonKeyValue(value) {
            var _value = this.getKeyValue(value);
            if (_value) {
                try {
                    _value = JSON.parse(_value);
                } catch (e) {
                    _value = {};
                    console.log(e.stack);
                }
            }

            return _value;
        },
        set: function set(value, timeout) {
            return this.setKeyValue(this.getKey(), value, timeout);
        },
        get: function get() {
            return this.getKeyValue(this.getKey());
        },
        json: function json(name) {
            var _value = this.get();
            if (_value) {
                try {
                    _value = JSON.parse(_value);
                } catch (e) {
                    _value = {};
                    console.log(e.stack);
                }
            }

            return _value;
        },
        validate: function validate() {}
    }
});