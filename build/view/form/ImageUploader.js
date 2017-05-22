var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var AjaxUploader = require('./AjaxUploader');

module.exports = React.createClass({
	displayName: 'exports',

	componentDidMount: function componentDidMount() {},
	getDefaultProps: function getDefaultProps() {
		return {
			value: './images/DefaultAvatar.png'
		};
	},
	getInitialState: function getInitialState() {
		return {
			value: this.props.value
		};
	},
	__onChange: function __onChange(files) {
		var _file = files[0];
		if (_file.type.indexOf('image') == -1) {
			alert('文件[' + _file.name + ']不是图片类型');
			return false;
		}
	},
	__onComplete: function __onComplete(data, uploader) {
		var _file = data[0];
		if (_file) {
			this.setValue(_file.url);
		}
		this.props.onComplete && this.props.onComplete(_file, this);
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
		return React.createElement(
			AjaxUploader,
			_extends({}, this.props, {
				className: 'rt-image-uploader',
				onChange: this.__onChange,
				onComplete: this.__onComplete,
				multipart: false }),
			React.createElement(
				'div',
				{ className: 'container' },
				React.createElement('img', { className: 'img', src: Store.fixURL(this.state.value) })
			)
		);
	}
});