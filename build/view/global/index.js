module.exports = zn.arrayValueToObject(['Ripple'], function (value, index) {
    return require('./' + value + '.js');
});