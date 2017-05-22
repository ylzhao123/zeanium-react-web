var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var FilterItem = require('../filter/FilterItem');
var Icon = require('../basic/Icon');

module.exports = React.createClass({
	displayName: 'TableFilter',
	getDefaultProps: function getDefaultProps() {
		return {
			filterData: {},
			onFilterSearch: function onFilterSearch() {}
		};
	},
	getInitialState: function getInitialState() {
		this._items = {};
		return {};
	},
	componentDidMount: function componentDidMount() {
		this.search(this.props.filterData);
	},
	__onFilter: function __onFilter() {
		this.search(this.props.filterData);
	},
	search: function search(data) {
		//console.log(data);
		data && this.props.onFilterSearch(data, this);
	},
	__onFilterChange: function __onFilterChange(value, item) {
		if (this.props.filterData[item.name]) {
			this.props.filterData[item.name].opt = value.value;
		} else {
			this.props.filterData[item.name] = {
				key: item.name,
				opt: value.value
			};
		}
	},
	__onFilterItemChange: function __onFilterItemChange(value, input) {
		this.props.onFilter && this.props.onFilter(this.validate(), input);
	},
	validate: function validate() {
		var _value = {};
		zn.each(this._items, function (item, name) {
			//if(item.state.opt && item.validate()){
			if (item.state.opt) {
				_value[name.split('_')[0]] = {
					opt: item.state.opt,
					value: item.validate()
				};
			}
		});

		return _value;
	},
	__onFilterItemDidMount: function __onFilterItemDidMount(item) {
		this._items[item.props.name] = item;
	},
	__onFilterItemCancle: function __onFilterItemCancle() {
		this.props.onFilter && this.props.onFilter(this.validate());
	},
	__itemRender: function __itemRender(item, index) {
		var _content = null;
		switch (item.type) {
			case 'checkbox':
				_content = React.createElement(Icon, { icon: 'fa-filter' });
				break;
			case 'action':
				item.textAlign = 'center';
				_content = React.createElement(Icon, { onClick: this.__onFilter, icon: 'fa-search' });
				break;
			default:
				if (item.filter) {
					var _filter = zn.overwrite(item.filter || {}, { type: 'Input', fullWidth: true });
					var _events = {
						onChange: this.__onFilterItemChange
					};
					if (_filter.type == 'Input') {
						_events = {
							onEnter: this.__onFilterItemChange
						};
					}

					_content = React.createElement(FilterItem, _extends({
						popoverWidth: 80,
						opts: ['like', '='],
						name: item.name
					}, _filter, {
						onCancle: this.__onFilterItemCancle,
						onDidMount: this.__onFilterItemDidMount
					}, _events));
				} else {
					_content = null;
				}

				break;
		}

		return React.createElement(
			'td',
			{ key: index, className: 'text-align-' + (item.textAlign || 'left'), width: item.width ? item.width : 0 },
			_content
		);
	},
	render: function render() {
		return React.createElement(
			'tr',
			{ className: 'table-row editable filter' },
			(this.props.items || []).map(this.__itemRender)
		);
	}
});