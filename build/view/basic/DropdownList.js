var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Dropdown = require('./Dropdown');
var ListView = require('../data/ListView');

module.exports = React.createClass({
	displayName: 'DropdownList',
	getDefaultProps: function getDefaultProps() {
		return {
			className: '',
			autoFixPosition: true,
			triggerEvent: 'click',
			popoverWidth: 100
		};
	},
	render: function render() {
		return React.createElement(
			Dropdown,
			_extends({}, this.props, { className: "rt-dropdown-list " + this.props.className }),
			React.createElement(
				'div',
				{ className: 'dropdown-list-trigger' },
				this.props.children
			),
			React.createElement(ListView, _extends({}, this.props, { onItemClick: this.__onListItemClick }))
		);
	}
});