var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var AjaxUploader = require('./AjaxUploader');

module.exports = React.createClass({
	displayName: 'exports',

	getDefaultProps: function getDefaultProps() {
		return {
			editable: true
		};
	},
	getInitialState: function getInitialState() {
		return {
			value: ','
		};
	},
	__onChange: function __onChange(files) {
		var _file = files[0];
		this.props.onChange && this.props.onChange(_file);
	},
	__onComplete: function __onComplete(data, uploader) {
		var _file = data[0];
		this.state.value = this.state.value + _file.url + ',';
		this.forceUpdate();
	},
	getValue: function getValue() {
		return this.state.value;
	},
	setValue: function setValue(value) {
		this.setState({ value: value });
	},
	__renderContent: function __renderContent(item) {
		var _temp = this.props.onFileRender && this.props.onFileRender(item);
		if (_temp) {
			return _temp;
		}
		var _ext = item.split('.').pop().toLowerCase();
		var _imageExt = ['jpg', 'png', 'jpeg', 'gif'];
		if (_imageExt.indexOf(_ext) != -1 || this.props.isImage) {
			return React.createElement(
				'a',
				{ href: Store.fixURL(item) },
				React.createElement('img', { src: Store.fixURL(item) })
			);
		} else {
			return React.createElement(
				'a',
				{ href: Store.fixURL(item) },
				item.split('/').pop()
			);
		}
	},
	__onRemove: function __onRemove(item, index) {
		this.state.value = this.state.value.replace(item, '');
		this.forceUpdate();
	},
	render: function render() {
		var _values = this.state.value.split(',');
		var _editable = this.props.editable && !this.props.disabled && !this.props.readonly;
		return React.createElement(
			'div',
			{ className: 'rt-file-uploader' },
			_editable && React.createElement(
				AjaxUploader,
				_extends({}, this.props, {
					onChange: this.__onChange,
					onComplete: this.__onComplete }),
				React.createElement(
					'div',
					{ className: 'container' },
					React.createElement('i', { className: 'icon fa fa-plus' })
				)
			),
			React.createElement(
				'ul',
				{ className: 'file-list' },
				_values.map(function (item, index) {
					var _this = this;

					if (item) {
						return React.createElement(
							'li',
							{ key: index, className: 'file' },
							_editable && React.createElement('i', { className: 'fa fa-remove rt-hover-self-loading', onClick: function onClick() {
									return _this.__onRemove(item, index);
								} }),
							this.__renderContent(item)
						);
					}
				}.bind(this))
			)
		);
	}
});