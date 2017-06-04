var _kv = zn.arrayValueToObject(['AutoComplete', 'Input', 'Checkbox', 'CheckboxGroup', 'RichEditor', 'Radio', 'Select', 'FileUploader', 'ImageUploader', 'InputPopup', 'Menu', 'TreeMenu', 'SearchMenu', 'Label', 'Textarea', 'Timer', 'ToggleSwitch'], function (value, index) {
    return require('./' + value + '.js');
});
_kv.TreeListView = require('../data/TreeListView.js');
module.exports = _kv;