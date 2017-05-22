module.exports = zn.arrayValueToObject(['Pager', 'PagerView', 'PagingList', 'PullRefreshList', 'ListView', 'TreeListView', 'Table', 'Steps', 'EditableTable'], function (value, index) {
    return require('./' + value + '.js');
});