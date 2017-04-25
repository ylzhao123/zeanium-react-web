'use strict';

module.exports = zn.arrayValueToObject(['Cookie', 'Session', 'StyleUtil', 'DOMUtil', 'Draggable', 'Router', 'RestfulRouter', 'RouterMapping'], function (value) {
    var _value = window[value] = require('./' + value + '.js');
    return _value;
});