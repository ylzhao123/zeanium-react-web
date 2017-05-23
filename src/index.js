require('./zn.react.js');
require('./zn.react.Application.js');
require('./util/index.js');

['global','basic','data','form','graph','loader','wap'].forEach(function (path, index){
    zn.overwrite(zn.react, require('./view/' + path));
});

module.exports = window.UI = zn.react;
