var Request = zn.Class({
    properties: {
        argv: null,
        params: null,
        path: null,
        paths: null,
        searchString: null,
        search: null,
        name: null,
        notFound: null
    },
    methods: {
        init: function init(argv) {
            this.sets(argv);
        },
        reset: function reset() {
            var _meta = location.hash.split('?'),
                _path = _meta[0].slice(1),
                _paths = _path.split('/');
            this.sets({
                notFound: true,
                argv: {},
                params: {},
                path: _path,
                paths: _paths,
                searchString: _meta[1],
                name: _paths[_paths.length - 1]
            });
            this.sets({
                search: this.parseSearch(_meta[1])
            });
        },
        get: function get(value) {
            return value ? this._argv[value] : this._argv;
        },
        jump: function jump(path, search) {
            return Session.jump(path, search), this;
        },
        parseParam: function parseParam(router) {
            var _data = {},
                _paths = this._paths,
                _argv = this._argv,
                _key = null,
                _value = null;
            router.split('/').forEach(function (temp, index) {
                if (/^:\w[\w\d]*$/.test(temp)) {
                    _key = temp.replace(/^:/, '');
                    _value = _paths[index];
                    _data[_key] = _value;
                    _argv[_key] = _value;
                }
            });

            return _data;
        },
        parseSearch: function parseSearch(search) {
            var _data = {},
                _temp = null,
                _key = null,
                _value = null;

            if (typeof search != 'string') {
                return _data;
            }
            search.split('&').forEach(function (temp) {
                _temp = temp.split('=');
                _key = _temp[0];
                _value = _temp[1];
                _data[_key] = _value;
                this._argv[_key] = _value;
            }.bind(this));

            return _data;
        },
        test: function test(router) {
            if (typeof router != 'string') {
                return false;
            }
            var __all = Boolean(router == '*'); //
            var _reg = router.replace(/\/:\w[^\/]+/g, '\/([^\/]+)');
            _reg = _reg.replace(/\//g, '\\/');
            if (router.slice(-3) == '{*}') {
                _reg = '^#' + _reg.slice(0, -3); // + '$';
            } else {
                _reg = '^#' + _reg + '$';
            }

            var __reg = Boolean(new RegExp(_reg).test('#' + this._path));
            var __index = Boolean(this._path == '' && router == '/');
            return Boolean(__all || __reg || __index);
        }
    }
});

module.exports = zn.Class({
    events: ['change'],
    methods: {
        init: function init() {
            this._controllers = [];
            this._errors = [];
            this._request = new Request();
            window.addEventListener('hashchange', this.__onHashChange.bind(this), false);
        },
        fireHashChange: function fireHashChange() {
            this.__onHashChange();
        },
        __onHashChange: function __onHashChange() {
            var _req = this._request,
                _self = this;
            _req.reset();
            this._controllers.forEach(function (controller, index) {
                if (_req.test(controller.router)) {
                    _req.sets({
                        notFound: false,
                        params: _req.parseParam(controller.router)
                    });
                    controller.handler.call(controller.context, _req);
                }
            });
            _req._notFound && this._errors.forEach(function (controller, index) {
                controller.handler.call(controller.context, _req);
            });

            this.fire('change', _req);
        },
        error: function error(handler, context) {
            return this._errors.push({
                handler: handler,
                context: context
            }), this;
        },
        use: function use(handler, context) {
            return this._controllers.push({
                router: '*',
                handler: handler,
                context: context
            }), this;
        },
        get: function get(router, handler, context) {
            return this._controllers.push({
                router: router,
                handler: handler,
                context: context
            }), this;
        }
    }
});