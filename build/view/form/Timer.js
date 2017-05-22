var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
	displayName: 'Timer',
	getDefaultProps: function getDefaultProps() {
		return {
			className: ''
		};
	},
	getValue: function getValue() {
		var _date = ReactDOM.findDOMNode(this.refs.date).value,
		    _time = ReactDOM.findDOMNode(this.refs.time).value;
		return _date + ' ' + _time;
	},
	setValue: function setValue(value) {
		var _data = value.split(' ');
		ReactDOM.findDOMNode(this.refs.date).value = _data[0];
		ReactDOM.findDOMNode(this.refs.time).value = _data[1];
		return this;
	},
	__onChange: function __onChange(event) {
		this.props.onChange && this.props.onChange(this.getValue(), this, event);
	},
	render: function render() {
		var _data = (this.props.value || '').split(' ');
		return React.createElement(
			'div',
			{ className: "rt-timer " + this.props.className },
			React.createElement('input', { type: 'date', defaultValue: _data[0], ref: 'date', className: 'timer-date', name: this.props.name + '_date', required: this.props.required, onChange: this.__onChange }),
			React.createElement('input', { type: 'time', defaultValue: _data[1], ref: 'time', className: 'timer-time', name: this.props.name + '_time', required: this.props.required, onChange: this.__onChange })
		);
	}
});