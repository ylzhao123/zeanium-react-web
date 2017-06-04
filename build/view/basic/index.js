module.exports = zn.arrayValueToObject(['ActivityLayout', 'Alert', 'FixedLayout', 'Button', 'ButtonGroup', 'Toast', 'Card', 'Panel', 'Icon', 'LineLock', 'ListFilter', 'RTList', 'DownPuller', 'Dropdown', 'DropdownList', 'Modal', 'Page', 'Popup', 'ProgressRing', 'PullRefresh', 'Scrollable', 'Slider', 'Search', 'Uploader', 'URLRouter', 'XlsxImporter'], function (value, index) {
    var _value = require('./' + value + '.js');
    if (_value.global) {
        window[value] = _value;
    }
    return _value;
});