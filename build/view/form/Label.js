var React = require('react');
module.exports = React.createClass({
	displayName: 'Label',
	getInitialState: function getInitialState() {
		return {
			value: this.props.value
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
		return React.createElement('div', { className: zn.react.classname('rt-label', this.props.className), style: this.props.style, dangerouslySetInnerHTML: { __html: this.state.value } });
	}
});