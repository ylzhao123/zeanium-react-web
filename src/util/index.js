module.exports = zn.arrayValueToObject([
    'Cookie',
    'Session',
    'StyleUtil',
    'DOMUtil',
    'Draggable',
    'Router',
    'RestfulRouter',
    'RouterMapping'
], function (value){
    var _value = zn.react[value] = require('./' + value + '.js');
    return _value;
});
