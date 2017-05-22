module.exports = zn.arrayValueToObject(['TabFilter'], function (value) {
    return require('./' + value + '.js');
});