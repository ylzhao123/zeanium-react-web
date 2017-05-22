module.exports = zn.arrayValueToObject(['Default', 'DataLoader'], function (value) {
    return require('./' + value + '.js');
});