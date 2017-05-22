var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Checkbox = require('./Checkbox');
var RTList = require('../basic/RTList');

module.exports = React.createClass({
	displayName: 'CheckboxGroup',
	getDefaultProps: function getDefaultProps() {
		return {
			className: '',
			float: 'none',
			value: ',',
			valueKey: 'value',
			disabled: false
		};
	},
	getInitialState: function getInitialState() {
		return {
			value: this.props.value
		};
	},
	__onCheckboxChecked: function __onCheckboxChecked(checked, checkbox) {
		var _value = this.state.value || ',',
		    _itemValue = checkbox.props[this.props.valueKey] + ',';
		_value.indexOf(',') == -1;
		if (_value.charAt(_value.length - 1) != ',') {
			_value = _value + ',';
		}
		if (checked) {
			_value = _value + _itemValue;
		} else {
			_value = _value.replace(new RegExp(_itemValue, 'gi'), '');
		}

		this.setValue(_value);
	},
	__itemRender: function __itemRender(item, index, rtlist) {
		//console.log('Value: ', item[this.props.valueKey]);
		//console.log(this.state.value);
		return React.createElement(Checkbox, _extends({
			disabled: this.props.disabled,
			float: this.props.float
		}, item, {
			onChecked: this.__onCheckboxChecked,
			checked: this.state.value.indexOf(item[this.props.valueKey]) !== -1 }));
	},
	getValue: function getValue() {
		return this.state.value;
	},
	setValue: function setValue(value) {
		this.setState({ value: value }, function () {
			this.props.onChange && this.props.onChange(value, this);
		}.bind(this));
	},
	render: function render() {
		return React.createElement(RTList, _extends({}, this.props, {
			className: 'rt-checkbox-group ' + this.props.className,
			itemRender: this.__itemRender }));
	}
});