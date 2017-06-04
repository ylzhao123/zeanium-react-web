module.exports = zn.arrayValueToObject([
    'Session',
    'Draggable',
    'Router',
    'RestfulRouter',
    'RouterMapping'
], function (value){
    window[value] = zn.react[value] = require('./' + value + '.js');
});
