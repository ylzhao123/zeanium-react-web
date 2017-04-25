'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var RTFlexItem = require('../basic/RTFlexItem');
var Dropdown = require('../basic/Dropdown');
var ListView = require('../data/ListView.js');
var inputs = require('../form/inputs.js');

//console.log(inputs);

var OPTS = {
	'=': { text: '等于', value: '=', icon: 'fa-exchange' },
	'>': { text: '大于', value: '>', icon: 'fa-angle-left' },
	'<': { text: '小于', value: '<', icon: 'fa-angle-right' },
	'like': { text: '相似', value: 'like', icon: 'fa-percent' },
	'cancle': { text: '取消', value: 'cancle', icon: 'fa-remove' }
};

module.exports = React.createClass({
	displayName: 'FilterItem',
	getDefaultProps: function getDefaultProps() {
		return {
			disabled: true,
			className: '',
			opts: []
		};
	},
	getInitialState: function getInitialState() {
		return {
			opt: this.props.opt,
			disabled: this.props.disabled,
			optIcon: 'fa-filter',
			value: this.props.value,
			status: 'default'
		};
	},
	componentDidMount: function componentDidMount() {
		if (this.props.value != undefined) {
			this.refs.input.setValue(this.props.value);
		}
		this.props.onDidMount && this.props.onDidMount(this);
	},
	validate: function validate() {
		var _value = this.refs.input.getValue();
		if (this.props.required && !_value) {
			this.setState({
				status: 'danger'
			});
			return false;
		} else {
			this.setState({
				status: 'success'
			});
		}

		return _value;
	},
	__onListItemClick: function __onListItemClick(value, listitem, list) {
		if (value == 'cancle') {
			this.refs.input.setValue('', '');
			this.setState({
				value: '',
				optIcon: 'fa-filter',
				disabled: true
			}, function () {
				this.props.onCancle && this.props.onCancle(value, listitem, list, this);
			}.bind(this));
		} else {
			this.setState({
				opt: value,
				optIcon: listitem.props.icon,
				disabled: false
			});
		}
		Popover.close('_click');
	},
	__getData: function __getData() {
		var _temps = [];
		this.props.opts.forEach(function (opt, index) {
			if (OPTS[opt]) {
				_temps.push(OPTS[opt]);
			}
		});

		_temps.push(OPTS['cancle']);

		return _temps;
	},
	__listItemRender: function __listItemRender(item, index) {
		return React.createElement(
			'span',
			null,
			React.createElement('i', { style: { width: 16, height: 16 }, className: 'fa ' + item.icon }),
			item.text
		);
	},
	__popoverRender: function __popoverRender() {
		return React.createElement(ListView, { itemRender: this.__listItemRender, data: this.__getData(), value: this.state.opt, onItemClick: this.__onListItemClick, style: { border: 'none', backgroundColor: '#FFF' } });
	},
	render: function render() {
		var Input = inputs[this.props.type];
		return React.createElement(
			RTFlexItem,
			_extends({}, this.props, {
				className: 'rt-filter-item ' + this.props.className + ' ' + this.state.status + ' ' + (this.props.fullWidth ? 'full' : '') }),
			React.createElement(
				Dropdown,
				{
					className: 'filter-dropdown',
					popoverRender: this.__popoverRender,
					popoverWidth: this.props.popoverWidth },
				React.createElement('i', { className: "filter-icon fa " + this.state.optIcon })
			),
			Input && React.createElement(Input, _extends({ ref: 'input' }, this.props, { disabled: this.state.disabled, value: this.state.value, className: 'filter-input' }))
		);
	}
});