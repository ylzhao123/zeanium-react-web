var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Popover = require('../basic/Popover');
var ListView = require('../data/ListView');

var AutoComplete = React.createClass({
	displayName: 'AutoComplete',
	getDefaultProps: function getDefaultProps() {
		return {
			className: '',
			popoverWidth: 200,
			data: null
		};
	},
	getInitialState: function getInitialState() {
		return {
			value: this.props.value,
			text: this.props.text
		};
	},
	__onEachListItem: function __onEachListItem(item, value, rtlist) {
		var _callback = this.props.itemHandler && this.props.itemHandler(item, value, rtlist, this);
		if (_callback === false) {
			return _callback;
		}
		var _value = rtlist.getItemText(item);
		if (_value && _value.indexOf(value) == -1) {
			return false;
		}
	},
	__onListItemClick: function __onListItemClick(value, rtitem, rtlist, event) {
		var _text = rtitem.props[rtlist.props.textKey],
		    _value = rtitem.props[rtlist.props.valueKey];

		this.setState({
			value: _value,
			text: _text
		});

		this.props.onChange && this.props.onChange({
			text: _text,
			value: _value,
			item: rtitem.props
		}, this);
		Popover.close('_click');
	},
	__renderView: function __renderView(target) {
		var _this = this;

		var _value = target.value;
		if (_value) {
			Popover.render({
				name: '_click',
				content: React.createElement(ListView, _extends({ selectMode: 'none' }, this.props, {
					className: 'rt-list-view-popover',
					onEachItem: function onEachItem(item, rtlist) {
						return _this.__onEachListItem(item, _value, rtlist);
					},
					onItemClick: this.__onListItemClick }))
			}, function (popover, argv) {
				popover.fixPosition(target);
			}.bind(this));
		} else {
			Popover.close('_click');
		}
	},
	__onInputChange: function __onInputChange(event) {
		this.setState({
			text: event.target.value
		});
		event.stopPropagation();
		this.__renderView(event.target);
	},
	__onClearClick: function __onClearClick() {
		this.setState({
			value: -1,
			text: ''
		});
		Popover.close('_click');
	},
	getValue: function getValue() {
		return this.state.value;
	},
	setValue: function setValue(value) {
		this.setState({
			value: value
		});
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'rt-auto-complete ' + this.props.className },
			React.createElement('i', { className: 'clear fa fa-times-circle', onClick: this.__onClearClick }),
			React.createElement('input', { value: this.state.text,
				name: this.props.name,
				type: 'text',
				onChange: this.__onInputChange })
		);
	}
});

module.exports = AutoComplete;