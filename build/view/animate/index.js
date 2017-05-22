module.exports = zn.arrayValueToObject([], function (value, index) {
    return require('./' + value + '.js');
});