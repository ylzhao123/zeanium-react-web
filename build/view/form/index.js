module.exports = zn.arrayValueToObject(['AutoComplete', 'Checkbox', 'CheckboxGroup', 'Radio', 'Select', 'ImageUploader', 'Menu', 'Form', 'FormItem', 'FileUploader', 'Input'], function (value, index) {
    return require('./' + value + '.js');
});