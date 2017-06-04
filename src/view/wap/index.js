module.exports = zn.arrayValueToObject([
    'TabBar',
    'TabFilter',
], function (value){
    return require('./' + value + '.js');
});
