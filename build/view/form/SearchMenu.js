var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var Dropdown = require('../basic/Dropdown');
var FixedLayout = require('../basic/FixedLayout');
var ListView = require('../data/ListView');

module.exports = React.createClass({
	displayName: 'SearchMenu',
	getDefaultProps: function getDefaultProps() {
		return {
			className: '',
			autoFixPosition: true,
			triggerEvent: 'click',
			popoverWidth: null
		};
	},
	getInitialState: function getInitialState() {
		return {
			value: this.props.value || '',
			text: this.props.text || ''
		};
	},
	getValue: function getValue() {
		return this.state.value;
	},
	setValue: function setValue(value, text) {
		this.setState({
			value: value,
			text: text
		}, function () {
			this.props.onChange && this.props.onChange(value, text, this);
		});
	},
	__textRender: function __textRender() {
		return this.state.text || this.props.placeholder;
	},
	__onListItemClick: function __onListItemClick(value, rtlistitem, rtlist, item) {
		this.setValue(value, item[rtlist.props.textKey]);
		Popover.closeAll();
	},
	__popoverRender: function __popoverRender() {
		return React.createElement(
			'div',
			null,
			React.createElement('div', null),
			React.createElement(ListView, _extends({}, this.props, {
				className: 'rt-list-view-popover',
				value: this.state.value,
				onItemClick: this.__onListItemClick }))
		);
	},
	render: function render() {
		return React.createElement(
			Dropdown,
			_extends({}, this.props, { popoverRender: this.__popoverRender, className: "rt-search-menu " + this.props.className }),
			React.createElement(
				'div',
				{ className: 'menu-view' },
				React.createElement(
					'div',
					_defineProperty({ className: true }, 'className', 'text'),
					this.__textRender()
				),
				React.createElement(
					'span',
					{ className: 'trigger' },
					React.createElement('i', { className: 'fa fa-angle-down' })
				)
			)
		);
	}
});