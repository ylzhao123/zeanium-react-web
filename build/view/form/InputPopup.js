var React = require('react');

module.exports = React.createClass({
	displayName: 'InputPopup',
	getInitialState: function getInitialState() {
		return {
			value: null
		};
	},
	getValue: function getValue() {
		return this.state.value;
	},
	setValue: function setValue(value) {
		return this.setState({
			value: value
		}), this;
	},
	render: function render() {
		return React.createElement('div', { className: 'rt-input-popup' });
	}
});