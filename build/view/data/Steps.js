var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var RTItem = require('../basic/RTItem');
var RTList = require('../basic/RTList');

var Steps = React.createClass({
	displayName: 'Steps',
	getDefaultProps: function getDefaultProps() {
		return {
			className: 'rt-steps',
			itemClassName: 'rt-steps-item',
			float: 'none',
			disabled: false,
			value: null,
			textKey: 'text',
			valueKey: 'value',
			noborder: true,
			selectMode: 'radio' //radio, checkbox, none
		};
	},
	getInitialState: function getInitialState() {
		return {
			value: this.props.value,
			currIndex: null
		};
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (nextProps.value !== this.props.value) {
			this.setState({ value: nextProps.value });
		}
	},
	__valueHandler: function __valueHandler(item, index) {
		if (!item) {
			return;
		}
		var _value = this.state.value,
		    _itemValue = item[this.props.valueKey];
		switch (this.props.selectMode) {
			case 'radio':
				_value = _itemValue;
				break;
			case 'checkbox':
				_value = _value || ',';
				_itemValue = _itemValue + ',';
				if (_value.indexOf(_itemValue) == -1) {
					_value = _value + _itemValue;
				} else {
					_value = _value.replace(new RegExp(_itemValue, 'gi'), '');
				}
				break;
			case 'none':

				break;
		}

		return _value;
	},
	isCurrent: function isCurrent(item, index) {
		var _value = this.state.value,
		    _itemValue = item[this.props.valueKey];
		if (_itemValue == undefined) {
			if (this.state.currIndex == index) {
				return true;
			}
			return false;
		}
		switch (this.props.selectMode) {
			case 'radio':
				if (_value == _itemValue) {
					return true;
				}
				break;
			case 'checkbox':
				_value = _value || ',';
				if (_value.indexOf(_itemValue) !== -1) {
					return true;
				}
				break;
			case 'none':

				break;
		}

		return false;
	},
	__onItemClick: function __onItemClick(item, index, rtitem, event) {
		this.setState({
			value: this.__valueHandler(item, index),
			currIndex: index
		}, function () {
			this.props.onClick && this.props.onClick(this.state.value, rtitem, this, event);
			this.props.onItemClick && this.props.onItemClick(this.state.value, rtitem, this, event);
		}.bind(this));
	},
	__itemRender: function __itemRender(item, index, rtlist) {
		var _this = this;

		var _content = React.createElement(
			'span',
			null,
			item[this.props.textKey]
		);
		if (this.props.itemRender) {
			_content = this.props.itemRender(item, index, this);
		}
		return React.createElement(
			RTItem,
			_extends({
				className: this.props.itemClassName,
				disabled: this.props.disabled,
				float: this.props.float
			}, item, {
				checked: this.isCurrent(item, index),
				onClick: function onClick(self, event) {
					return _this.__onItemClick(item, index, self, event);
				} }),
			_content
		);
	},
	getValue: function getValue() {
		return this.state.value;
	},
	setValue: function setValue(value, callback) {
		this.setState({ value: value }, callback);
	},
	render: function render() {
		return React.createElement(RTList, _extends({}, this.props, {
			className: 'rt-list-view ' + (this.props.noborder ? 'noborder' : '') + ' ' + this.props.className,
			itemRender: this.__itemRender }));
	}
});

module.exports = Steps;