module.exports = zn.arrayValueToObject([
    'Session',
    'Draggable',
    'Router',
    'RestfulRouter',
    'RouterMapping'
], function (value){
    var _value = window[value] = require('./' + value + '.js');
    return _value;
});
