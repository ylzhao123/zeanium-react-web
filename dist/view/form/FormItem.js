'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var RTList = require('../basic/RTList');
var RTFlexItem = require('../basic/RTFlexItem');
var inputs = require('./inputs.js');

module.exports = React.createClass({
	displayName: 'FormItem',
	getDefaultProps: function getDefaultProps() {
		return {
			disabled: false,
			className: ''
		};
	},
	getInitialState: function getInitialState() {
		return {
			value: this.props.value,
			status: 'default'
		};
	},
	componentDidMount: function componentDidMount() {
		if (this.props.value != undefined && this.refs.input) {
			this.refs.input.setValue(this.props.value);
		}
		this.props.onDidMount && this.props.onDidMount(this);
	},
	validate: function validate() {
		if (!this.refs.input) {
			return Toast.error('Form item input component is undefined.'), false;
		}
		var _value = this.refs.input.getValue();
		if (this.props.required && !_value) {
			this.setState({
				status: 'danger'
			});
			return Toast.error(this.props.error || (this.props.title || '字段') + '是必填项.'), false;
		} else {
			this.setState({
				status: 'success'
			});
		}

		return _value;
	},
	__onInputChange: function __onInputChange(value, rtlist) {
		this.props.onChange && this.props.onChange(value, rtlist, this);
	},
	render: function render() {
		var _input = inputs[this.props.type];
		return React.createElement(
			RTFlexItem,
			_extends({}, this.props, {
				className: 'rt-form-item ' + this.props.className + ' ' + this.state.status }),
			this.props.icon && React.createElement(
				'div',
				{ className: 'icon' },
				React.createElement('i', { className: "fa " + this.props.icon })
			),
			this.props.title && React.createElement(
				'div',
				{ className: 'title' },
				this.props.title
			),
			_input && React.createElement(_input, _extends({ ref: 'input' }, this.props, { onChange: this.__onInputChange })),
			this.props.suffix && React.createElement(
				'div',
				{ className: 'suffix' },
				this.props.suffix
			)
		);
	}
});