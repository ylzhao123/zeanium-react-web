var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

module.exports = React.createClass({
	displayName: 'Search',
	getDefaultProps: function getDefaultProps() {
		return {
			value: '',
			realtime: false
		};
	},
	getInitialState: function getInitialState() {
		return {
			value: this.props.value,
			searching: false
		};
	},
	__onClick: function __onClick(rtitem, event) {
		this.props.onClick && this.props.onClick(this.props, this, event);
	},
	__onInputFoucs: function __onInputFoucs() {
		this.setState({
			focus: true
		});
	},
	__onInputBlur: function __onInputBlur() {
		this.setState({
			focus: false
		});
	},
	__onInputChange: function __onInputChange(event) {
		var _value = event.target.value;
		this.state.value = _value;
		this.forceUpdate();
		this.props.onChange && this.props.onChange(_value);
		if (this.props.realtime) {
			this.props.onSearch && this.props.onSearch(_value);
		}
	},
	__onIconClick: function __onIconClick() {
		if (!this.props.realtime) {
			this.props.onSearch && this.props.onSearch(this.state.value);
		}
	},
	searching: function searching(value) {
		this.setState({
			searching: value
		});
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: zn.react.classname("rt-search", this.props.className, this.state.focus ? 'foucs' : '') },
			React.createElement('i', { onClick: this.__onIconClick, className: "search-icon fa " + (this.state.searching ? "searching" : "fa-search") }),
			React.createElement('input', _extends({}, this.props, {
				value: this.state.value,
				onFocus: this.__onInputFoucs,
				onBlur: this.__onInputBlur,
				onChange: this.__onInputChange,
				className: 'search-input',
				type: 'search',
				name: 'value' }))
		);
	}
});