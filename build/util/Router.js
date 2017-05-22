module.exports = zn.Class({
    methods: {
        init: function init(argv) {
            this._search = new URLSearchParams(location.search.slice(1));
            this._hash = location.hash;
            var _argv = argv || {},
                _self = this,
                _onLoaded = _argv.onLoaded || function () {},
                _onHashChange = _argv.onHashChange || function () {},
                _onPopState = _argv.onPopState || function () {};

            window.addEventListener('DOMContentLoaded', function (event) {
                if (_onLoaded(event, _self) === false) {
                    return false;
                }
            }, false);
            window.addEventListener('hashchange', function (event) {
                if (_onHashChange(event, _self) === false) {
                    return false;
                }
            }, false);
            window.addEventListener('popstate', function () {
                if (_onPopState(event, _self) === false) {
                    return false;
                }
            }, false);
        },
        setSearch: function setSearch(value) {
            var _obj = value || {};
            for (var key in _obj) {
                this._search.set(key, _obj[key]);
            }

            return this.refresh(), this;
        },
        getSearch: function getSearch(name) {
            if (name) {
                return this._search.get(name);
            }
            var _data = {};
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._search.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    _data[key] = this._search.get(key);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return _data;
        },
        setHash: function setHash(value) {
            this._hash = value;
            return location.hash = value, this;
        },
        getURL: function getURL(value) {
            return location.pathname + '?' + this._search.toString() + '#' + this._hash;
        },
        refresh: function refresh(value) {
            return window.history.pushState(null, null, this.getURL()), this;
        },
        pushState: function pushState(state, title, url) {
            return window.history.pushState(state, title, url), this;
        }
    }
});