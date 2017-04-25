var RestfulRouter = function (callback){
    this._controllers = [];
    this._errors = [];
    callback && this.init(callback);
}

RestfulRouter.prototype.init = function (callback){
    callback.call(null, this);
    this.__onChange();
    window.addEventListener('hashchange', this.__onChange.bind(this), false);
}

RestfulRouter.prototype.__onChange = function (){
    var _meta = location.hash.split('?'),
        _path = _meta[0].slice(1),
        _self = this;
    var _req = {
        path: _path,
        paths: _path.split('/'),
        notFound: true,
        params: {},
        argv: {},
        init: function (){
            _req.searchString = _meta[1];
            _req.search = _req.parseSearch(_req.searchString);
            _req.name = _req.paths[_req.paths.length-1];
            _self._controllers.forEach(function (controller, index){
                if(_req.test(controller.router)){
                    _req.notFound = false;
                    _req.params = _req.parseParam(controller.router);
                    controller.handler.call(controller.context, _req);
                }
            });
            if(_req.notFound){
                _self._errors.forEach(function (controller, index){
                    controller.handler.call(controller.context, _req);
                });
            }
        },
        get: function (value){
            return value ? _req.argv[value] : _req.argv;
        },
        jump: function (path, search){
            return Session.jump(path, search), this;
        },
        parseParam: function (router){
            var _data = {},
                _key = null,
                _value = null;
            router.split('/').forEach(function (temp, index){
                if (/^:\w[\w\d]*$/.test(temp)) {
                    _key = temp.replace(/^:/, '');
                    _value = _req.paths[index];
                    _data[_key] = _value;
                    _req.argv[_key] = _value;
                }
            });

            return _data;
        },
        parseSearch: function (search){
            var _data = {},
                _temp = null,
                _key = null,
                _value = null;

            if(typeof search != 'string'){
                return _data;
            }
            search.split('&').forEach(function (temp){
                _temp = temp.split('=');
                _key = _temp[0];
                _value = _temp[1];
                _data[_key] = _value;
                _req.argv[_key] = _value;
            });

            return _data;
        },
        test: function (router){
            if (typeof router != 'string') {
                return false;
            }
            var __all = Boolean(router == '*');  //
            var _reg = router.replace(/\/:\w[^\/]+/g, '\/([^\/]+)');
            _reg = _reg.replace(/\//g, '\\/');
            if(router.slice(-3)=='{*}'){
                _reg = '^#' + _reg.slice(0, -3); // + '$';
            } else {
                _reg = '^#' + _reg + '$';
            }

            var __reg = Boolean(new RegExp(_reg).test('#' + _req.path));
            var __index = Boolean(_req.path == '' && router == '/');
            return Boolean(__all || __reg || __index);
        }
    }

    _req.init();
}

RestfulRouter.prototype.get = function (router, handler, context){
    return this._controllers.push({
        router: router,
        handler: handler,
        context: context
    }), this;
}

RestfulRouter.prototype.use = function (handler, context){
    return this._controllers.push({
        router: '*',
        handler: handler,
        context: context
    }), this;
}

RestfulRouter.prototype.error = function (handler, context){
    return this._errors.push({
        handler: handler,
        context: context
    }), this;
}

module.exports = RestfulRouter;
