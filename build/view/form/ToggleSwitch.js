var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
	displayName: 'ToggleSwitch',
	getDefaultProps: function getDefaultProps() {
		return {
			className: '',
			disabled: false
		};
	},
	__onChange: function __onChange(event) {
		event.stopPropagation();
		this.props.onChange && this.props.onChange(event.target.checked, event);
	},
	__onInputClick: function __onInputClick(event) {
		event.stopPropagation();
	},
	getValue: function getValue() {
		return ReactDOM.findDOMNode(this.refs.input).value;
	},
	setValue: function setValue(value) {
		return ReactDOM.findDOMNode(this.refs.input).value = value, this;
	},
	render: function render() {
		console.log(this.props.disabled);
		var _uuid = 'c_toggle_switch_input_' + new Date().getTime();
		return React.createElement(
			'div',
			{ className: "rt-toggle-switch " + this.props.className + ' ' + (this.props.disabled ? 'disabled' : ''), 'data-ts-color': this.props.color || 'red' },
			React.createElement('input', { ref: 'input', id: _uuid, disabled: this.props.disabled, type: 'checkbox', defaultChecked: this.props.value, onClick: this.__onInputClick, onChange: this.__onChange }),
			React.createElement('label', { htmlFor: _uuid, className: 'ts-helper' })
		);
	}
});