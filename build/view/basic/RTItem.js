var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

module.exports = React.createClass({
	displayName: 'RTItem',
	getDefaultProps: function getDefaultProps() {
		return {
			className: '',
			checked: false,
			disabled: false,
			toggle: false
		};
	},
	getInitialState: function getInitialState() {
		return {
			checked: this.props.checked
		};
	},
	__onClick: function __onClick(event) {
		if (this.props.disabled) {
			return;
		}

		if (this.props.toggle) {
			this.setState({
				checked: !this.state.checked
			});
		}

		event.stopPropagation();
		//event.preventDefault();
		this.props.onClick && this.props.onClick(this, event);
	},
	render: function render() {
		return React.createElement(
			'div',
			_extends({ className: 'rt-item ' + this.props.className, style: this.props.style,
				'data-checked': this.props.checked,
				'data-disabled': this.props.disabled,
				'data-float': this.props.float
			}, this.props.attrs, {
				onClick: this.__onClick }),
			this.props.children
		);
	}
});