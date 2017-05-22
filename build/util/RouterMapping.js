module.exports = zn.Class({
    statics: {
        create: function create(value) {
            return new this.prototype.constructor(value);
        }
    },
    methods: {
        init: function init(argv) {
            this._mappings = {};
            this.parseConfig(argv);
        },
        each: function each(value) {
            for (var key in this._mappings) {
                value && value(key, this._mappings[key]);
            }

            return this;
        },
        parseConfig: function parseConfig(config) {
            var _path = null,
                _value = null;

            for (var key in config) {
                _value = config[key];
                _path = (config.$PREFIX || '') + key;
                if (key == '/') {
                    _path = _path + '{*}';
                    config.index = _value;
                    this._mappings[_path] = {
                        mapping: '{*}',
                        mappings: config,
                        path: _path,
                        view: _value
                    };
                    continue;
                }

                switch (Object.prototype.toString.call(_value)) {
                    case '[object Function]':
                        this._mappings[_path] = {
                            mapping: key,
                            mappings: config,
                            path: _path,
                            view: _value
                        };
                        break;
                    case '[object Object]':
                        _value.$PREFIX = _path;
                        this.parseConfig(_value);
                        break;
                }
            }
        }
    }
});