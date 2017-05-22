module.exports = zn.arrayValueToObject(['Node', 'Link', 'FlowCanvas'], function (value) {
    return require('./' + value + '.js');
});