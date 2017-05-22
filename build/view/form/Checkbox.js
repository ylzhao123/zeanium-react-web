var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var RTItem = require('../basic/RTItem');

module.exports = React.createClass({
	displayName: 'Checkbox',
	getDefaultProps: function getDefaultProps() {
		return {
			className: '',
			float: 'none',
			checked: false,
			disabled: false
		};
	},
	getInitialState: function getInitialState() {
		return {
			checked: this.props.checked
		};
	},
	__onClick: function __onClick(rtitem, event) {
		this.state.checked = !this.state.checked;
		this.setState({
			checked: this.state.checked
		});

		this.props.onChecked && this.props.onChecked(this.state.checked, this);
		this.props.onClick && this.props.onClick(this, rtitem, event);
		this.props.onChange && this.props.onChange(event, this.state.checked);
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
	getValue: function getValue() {
		return this.state.checked;
	},
	setValue: function setValue(value) {
		this.setState({ checked: value });
	},
	render: function render() {
		return React.createElement(
			RTItem,
			_extends({}, this.props, { className: 'rt-checkbox ' + this.props.className, checked: this.state.checked, onClick: this.__onClick }),
			React.createElement('input', { name: this.props.name, type: 'checkbox', defaultChecked: this.state.checked }),
			React.createElement(
				'span',
				{ className: 'mark' },
				React.createElement('i', { className: 'icon fa fa-check' })
			),
			this.__renderContent()
		);
	}
});