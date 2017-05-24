module.exports = zn.react.Application = zn.Class({
    statics: {
        create: function (argv){
            var _props = {},
                _methods = {
                    init: function (argv){
                        this.super(argv);
                        this.sets(argv);
                    }
                };
            zn.each(argv, function (value, key){
                if(zn.type(value)=='function'){
                    _methods[key] = value;
                }else {
                    _props[key] = value;
                }
            });
            var _Class = zn.Class(this, {
                properties: _props,
                methods: _methods
            });
            return new _Class(_props);
        }
    },
    properties: {
        container: 'container',
        home: null,
        host: window.location.origin,
        plugins: []
    },
    methods: {
        init: function (argv){
            this.sets(argv);
            this.__initArgv(argv);
            var _value = this.onInit && this.onInit.call(this, this.gets());
            if(_value!==false){
                this.update(_value);
            }
        },
        __initArgv: function (argv){
            var _topRouters = {},
                _subRouters = {},
                _plugin = null,
                _self = this;

            if(argv.routers){
                this._routers = zn.deepEachObject(argv.routers, this.onLoading.bind(this));
            }
            this.get('plugins') && this.get('plugins').forEach(function (plugin){
                if(zn.is(plugin, 'string')){
                    plugin = _self.onLoading(plugin);
                }
                zn.extend(_topRouters, plugin.tools);
                zn.extend(_subRouters, plugin.routers);
            });

            zn.overwrite(this._routers, _topRouters);
            zn.overwrite(this._routers['/main'], _subRouters);

            Store.setHost(this.get('host'));
        },
        onLoading: function (value){
            return value;
        },
        __getRenderView: function (){
            return this.render && this.render.call(this, this.gets());
        },
        update: function (view){
            var _view = view || this.__getRenderView() || <UI.URLRouter home={this.get('home')} routers={this._routers} />,
                _container = this.get('container');
            _container = zn.type(_container)=='string'?document.getElementById(_container):_container;
            require('react-dom').render(_view, _container);
        }
    }
});
