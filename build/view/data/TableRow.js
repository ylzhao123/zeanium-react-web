var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var ReactDOM = require('react-dom');
var Checkbox = require('../form/Checkbox');
var inputs = require('../form/inputs.js');
var Icon = require('../basic/Icon');

module.exports = React.createClass({
	displayName: 'TableRow',
	getDefaultProps: function getDefaultProps() {
		return {
			checked: false
		};
	},
	getInitialState: function getInitialState() {
		return {
			selected: this.props.selected,
			editable: this.props.editable,
			checked: this.props.checked
		};
	},
	componentDidMount: function componentDidMount() {
		this.props.onDidMount && this.props.onDidMount(this);
	},
	checked: function checked(value) {
		if (this.isMounted()) {
			this.setState({
				checked: value
			});
		}
	},
	selected: function selected(_selected) {
		if (this.isMounted()) {
			this.setState({
				selected: _selected
			});
		}
	},
	editable: function editable(_editable) {
		if (this.isMounted()) {
			this.setState({
				editable: _editable
			});
		}
	},
	__onCheckBoxChange: function __onCheckBoxChange(event, value, cb) {
		this.state.checked = value;
		this.props.onCheckBoxChange && this.props.onCheckBoxChange(value, this, cb);
	},
	__onRowClick: function __onRowClick(event) {
		var _td = this.__getTargetTD(event.target),
		    _tr = ReactDOM.findDOMNode(this);
		this.props.onRowClick && this.props.onRowClick(event, {
			tr: _tr,
			td: _td,
			data: this.props.data,
			items: this.props.items
		}, this);
	},
	__getTargetTD: function __getTargetTD(target) {
		if (target.tagName !== 'TD') {
			return this.__getTargetTD(target.parentNode);
		} else {
			return target;
		}
	},
	__onTableColumnChange: function __onTableColumnChange(rowIndex, columnIndex, value, input, event, props) {
		var _value = props.onChange && props.onChange(value, input, this, event, props, rowIndex, columnIndex);
		if (_value !== undefined || _value !== null) {
			this.props.data[props.name] = input.getValue();
		}
	},
	setRowValue: function setRowValue(value) {
		switch (arguments.length) {
			case 1:
				zn.overwrite(this.props.data, value);
				break;
			case 2:
				this.props.data[arguments[0]] = arguments[1];
				break;
		}

		return this;
	},
	getRowValue: function getRowValue() {
		if (arguments.length) {
			return this.props.data[arguments[0]];
		} else {
			return this.props.data;
		}
	},
	__columnRender: function __columnRender(item, index) {
		var _this = this;

		var _value = this.props.data,
		    _content = null;

		if (Object.prototype.toString.call(_value) === '[object Array]') {
			if (this.props.checkbox) {
				_value = _value[index - 1];
			} else {
				_value = _value[index];
			}
		} else {
			_value = _value[item.name];
		}

		if (this.props.columnRender) {
			_content = this.props.columnRender(this.props.index, index, this.props.data, item, _value);
		}

		if (_content == null) {
			switch (item.type) {
				case 'checkbox':
					_value = _value == undefined ? this.props.checked : _value;
					_content = this.state.editable ? React.createElement(Icon, { icon: 'fa-edit' }) : React.createElement(Checkbox, { onChange: this.__onCheckBoxChange, checked: _value });
					break;
				default:
					var inputs = require('../form/inputs.js');
					var _Input = inputs[item.type] || inputs['Input'];
					_content = this.state.editable ? React.createElement(_Input, _extends({}, item, { value: _value, text: _value, onChange: function onChange(value, input, event) {
							return _this.__onTableColumnChange(_this.props.index, index, value, input, event, item);
						} })) : React.createElement(
						'span',
						null,
						_value
					);
					break;
			}
		}

		return React.createElement(
			'td',
			{ key: index, title: _value, className: 'text-align-' + (item.textAlign || 'left') },
			_content
		);
	},
	render: function render() {
		return React.createElement(
			'tr',
			{ style: this.props.style, className: "table-row " + (this.state.editable ? 'editable' : '') + " " + (this.state.selected ? 'selected' : ''), onClick: this.__onRowClick },
			(this.props.items || []).map(this.__columnRender)
		);
	}
});