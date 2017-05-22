var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Button = require('./Button');
var RTList = require('./RTList');

module.exports = React.createClass({
	displayName: 'ButtonGroup',
	getDefaultProps: function getDefaultProps() {
		return {
			className: '',
			float: 'none',
			disabled: false
		};
	},
	__onItemClick: function __onItemClick(props, btn, event) {
		this.props.onClick && this.props.onClick(props, btn, this, event);
	},
	__itemRender: function __itemRender(item, index, rtlist) {
		return React.createElement(Button, _extends({
			disabled: this.props.disabled,
			float: this.props.float,
			onClick: this.__onItemClick
		}, item));
	},
	render: function render() {
		return React.createElement(RTList, _extends({}, this.props, {
			className: 'rt-button-group ' + this.props.className,
			itemRender: this.__itemRender }));
	}
});