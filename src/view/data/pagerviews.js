module.exports = zn.arrayValueToObject([
    'ListView',
    'Table'
], function (value, index){
    return require('./'+value+'.js');
});
