var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var TableHeader = require('./TableHeader');
var TableBody = require('./TableBody');
var TableColgroup = require('./TableColgroup');

module.exports = React.createClass({
	displayName: 'Table',
	getDefaultProps: function getDefaultProps() {
		return {
			items: [],
			fixed: false,
			className: ''
		};
	},
	getInitialState: function getInitialState() {
		return {};
	},
	componentDidMount: function componentDidMount() {},
	__onHeaderCheckBoxChange: function __onHeaderCheckBoxChange(value) {
		this.refs.body.checkedAll(value);
	},
	__onBodyCheckBoxChange: function __onBodyCheckBoxChange(value, row, checkbox) {
		this.props.onBodyCheckBoxChange && this.props.onBodyCheckBoxChange(value, row, checkbox, this);
	},
	__onFilter: function __onFilter(data, filter) {
		if (Object.keys(data).length) {
			var _where = this.props.data._data.where || {};
			zn.each(data, function (value, key) {
				if (value.value !== null) {
					_where[key + '&' + value.opt] = value.value;
				} else {
					_where[key + '&' + value.opt] = null;
					delete _where[key + '&' + value.opt];
				}
			}.bind(this));
			this.props.data._data.where = _where;
			this.props.data.exec();
		}
	},
	getCheckedItems: function getCheckedItems(filter) {
		return this.refs.body.getCheckedItems(filter);
	},
	setData: function setData(data, argv) {
		this.refs.body.setData(data, argv);
	},
	insertRow: function insertRow(data, argv) {
		this.refs.body.insertRow(data);
	},
	refresh: function refresh() {
		this.refs.body.refresh();
	},
	getValue: function getValue() {
		return this.refs.body.getValue();
	},
	setValue: function setValue(value) {
		this.refs.body.setValue(value);
	},
	render: function render() {
		var _items = this.props.items.slice(0);
		if (this.props.checkbox && _items.length && _items[0].type != 'checkbox') {
			_items.unshift({
				type: 'checkbox',
				textAlign: 'center',
				width: this.props.checkbox
			});
		}
		this._columnSize = _items.length;
		return React.createElement(
			'table',
			{ style: this.props.style, className: "rt-table " + this.props.className, 'data-fixed': this.props.fixed, cellPadding: '0', cellSpacing: '0' },
			React.createElement(TableColgroup, _extends({}, this.props, { items: _items })),
			this.props.showHeader && React.createElement(TableHeader, _extends({
				ref: 'header'
			}, this.props, {
				items: _items,
				columnSize: this._columnSize,
				onCheckBoxChange: this.__onHeaderCheckBoxChange,
				onFilter: this.__onFilter })),
			React.createElement(TableBody, _extends({
				ref: 'body'
			}, this.props, {
				items: _items,
				columnSize: this._columnSize,
				onCheckBoxChange: this.__onBodyCheckBoxChange }))
		);
	}
});