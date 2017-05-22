var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var AjaxUploader = require('../form/AjaxUploader');
var FormItem = require('../form/FormItem');
var Card = require('./Card');
var Table = require('../data/Table');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		var _hiddens = this.props.hiddens || {};
		if (!this.props.editable) {
			zn.overwrite(_hiddens, {
				model: this.props.model,
				fields: this.props.fields
			});
		}

		return {
			value: '',
			hiddens: _hiddens,
			data: []
		};
	},
	__onChange: function __onChange(files) {
		var _file = files[0];
		this.setState({
			value: _file.name
		});
		if (_file.name.indexOf('xls') == -1) {
			alert('文件[' + _file.name + ']不是 xlsx / xls 类型');
			return false;
		}
		if (!this.props.action) {
			alert('The action is empty');
			return false;
		}

		if (this.props.editable) {
			return {
				model: this.refs.model.refs.input.getValue(),
				fields: this.refs.fields.refs.input.getValue()
			};
		}
	},
	__onComplete: function __onComplete(data, uploader) {
		this.setState({
			data: data
		});
		this.props.onComplete && this.props.onComplete(data, uploader);
	},
	getValue: function getValue() {
		return this.state.value;
	},
	setValue: function setValue(value) {
		this.setState({ value: value });
	},
	__renderEditer: function __renderEditer() {
		if (this.props.editable) {
			return React.createElement(
				'div',
				null,
				React.createElement(FormItem, { ref: 'model', value: this.props.model, title: 'Model:', type: 'Input' }),
				React.createElement(FormItem, { ref: 'fields', value: this.props.fields, title: 'Fields:', type: 'Input' })
			);
		}
	},
	__renderSheet: function __renderSheet(item) {
		var _data = item.data,
		    _items = _data.shift();
		if (!_items) {
			return null;
		}
		_items = _items.map(function (value) {
			return { title: value };
		});
		return React.createElement(Table, { items: _items, showHeader: true, data: _data });
	},
	__renderTables: function __renderTables() {
		if (this.state.data.length) {
			return React.createElement(
				'ul',
				{ className: 'xlsx-importer-list' },
				this.state.data.map(function (item, index) {
					return React.createElement(
						'li',
						{ key: index },
						React.createElement(
							Card,
							{ title: item.title },
							this.__renderSheet(item)
						)
					);
				}.bind(this))
			);
		}
	},
	__onError: function __onError(msg) {
		Toast.error('Import Error: ' + msg);
		this.props.onError && this.props.onError(msg);
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'rt-xlsx-importer' },
			React.createElement(
				AjaxUploader,
				_extends({}, this.props, {
					hiddens: this.state.hiddens,
					className: 'xlsx-importer-uploader',
					onChange: this.__onChange,
					onError: this.__onError,
					onComplete: this.__onComplete,
					multipart: false }),
				React.createElement(
					'div',
					{ className: 'container' },
					React.createElement('i', { className: 'fa fa-file-excel-o' }),
					this.state.value
				)
			),
			this.__renderEditer(),
			this.__renderTables()
		);
	}
});