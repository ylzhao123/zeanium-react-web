var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var RTItem = require('../basic/RTItem');
var RTList = require('../basic/RTList');

var RadioItem = React.createClass({
	displayName: 'RadioItem',
	getDefaultProps: function getDefaultProps() {
		return {
			className: '',
			float: 'none',
			checked: false,
			disabled: false
		};
	},
	__renderContent: function __renderContent() {
		var _content = this.props.contentRender && this.props.contentRender(this);
		if (!_content) {
			_content = React.createElement(
				'span',
				null,
				this.props.text || ''
			);
		}

		return _content;
	},
	render: function render() {
		return React.createElement(
			RTItem,
			_extends({}, this.props, { className: 'rt-radio-item ' + this.props.className }),
			React.createElement('input', { type: 'radio', name: this.props.name, value: this.props.value, defaultChecked: this.props.checked }),
			React.createElement(
				'span',
				{ className: 'mark' },
				React.createElement('i', { className: 'icon fa fa-circle' })
			),
			this.__renderContent()
		);
	}
});

var Radio = React.createClass({
	displayName: 'Radio',
	getDefaultProps: function getDefaultProps() {
		return {
			className: '',
			float: 'none',
			value: null,
			valueKey: 'value',
			disabled: false
		};
	},
	getInitialState: function getInitialState() {
		return {
			value: this.props.value
		};
	},
	__onRadioItemClick: function __onRadioItemClick(rtitem, event) {
		this.setValue(rtitem.props[this.props.valueKey], function (value) {
			this.props.onItemClick && this.props.onItemClick(value, this, event);
		}.bind(this));
	},
	__itemRender: function __itemRender(item, index, rtlist) {
		return React.createElement(RadioItem, _extends({
			disabled: this.props.disabled,
			float: this.props.float
		}, item, {
			onClick: this.__onRadioItemClick,
			checked: this.state.value === item[this.props.valueKey] }));
	},
	getValue: function getValue() {
		return this.state.value;
	},
	setValue: function setValue(value, callback) {
		this.setState({
			value: value
		}, function () {
			this.props.onChange && this.props.onChange(value, this);
			callback && callback(value, this);
		}.bind(this));
	},
	render: function render() {
		return React.createElement(RTList, _extends({}, this.props, {
			className: 'rt-radio ' + this.props.className,
			itemRender: this.__itemRender }));
	}
});

module.exports = Radio;