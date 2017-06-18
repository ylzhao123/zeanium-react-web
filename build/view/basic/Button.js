var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var RTItem = require('./RTItem');

module.exports = React.createClass({
	displayName: 'Button',
	getDefaultProps: function getDefaultProps() {
		return {
			className: '',
			float: 'none',
			type: 'primary'
		};
	},
	getInitialState: function getInitialState() {
		return {
			loading: false
		};
	},
	loading: function loading(value) {
		if (this.isMounted()) {
			this.setState({ loading: value });
		}
	},
	__renderChildren: function __renderChildren() {
		if (!this.props.children) {
			return React.createElement(
				'span',
				null,
				React.createElement('i', { className: 'btn-icon fa ' + this.props.icon }),
				this.props.text
			);
		} else {
			return this.props.children;
		}
	},
	__onClick: function __onClick(rtitem, event) {
		this.props.onClick && this.props.onClick(this.props, this, event);
	},
	render: function render() {
		return React.createElement(
			RTItem,
			_extends({}, this.props, {
				attrs: zn.extend({ "data-loading": this.state.loading }, this.props.attrs),
				className: 'rt-button rt-action-ripple ' + this.props.className + ' ' + (this.props.status || this.props.type),
				onClick: this.__onClick }),
			this.__renderChildren()
		);
	}
});