require('./zn.react.js');
require('./zn.react.Application.js');
require('./util/index.js');
['global','basic','data','form','graph','loader','wap'].forEach(function (path, index){
    path = './view/' + path + '/index.js';
    zn.overwrite(zn.react, require(path));
});

module.exports = window.UI = zn.react;
