var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
	displayName: 'AjaxUploader',
	getDefaultProps: function getDefaultProps() {
		return {
			changeSubmit: true,
			hiddens: {},
			multipart: true
		};
	},
	getInitialState: function getInitialState() {
		return {
			loading: false
		};
	},
	__onInputChange: function __onInputChange(event) {
		if (this.state.loading) {
			return false;
		}
		var _files = event.nativeEvent.target.files;
		if (_files.length) {
			var _result = this.props.onChange && this.props.onChange(_files, this);
			if (_result !== false && this.props.changeSubmit) {
				var _formData = new FormData(),
				    _hiddens = this.props.hiddens || {},
				    _hidden = null;

				if (zn.is(_result, 'object')) {
					zn.extend(_hiddens, _result);
				}
				//console.log(_hiddens);
				for (var key in _hiddens) {
					_hidden = _hiddens[key];
					if ((typeof _hidden === 'undefined' ? 'undefined' : _typeof(_hidden)) == 'object') {
						_hidden = JSON.stringify(_hidden);
					}

					_formData.append(key, _hidden);
				}
				for (var i = 0, _len = _files.length; i < _len; i++) {
					_formData.append('upload_file_' + i, _files[i]);
				}
				this.ajaxUpload(_formData);
			}
		}
	},

	__onInputClick: function __onInputClick(event) {
		if (this.state.loading) {
			return false;
		}
		event.stopPropagation();
		this.props.onUploaderClick && this.props.onUploaderClick(event, this);
	},
	ajaxUpload: function ajaxUpload(data) {
		this.setState({ loading: true });
		var xhr = new XMLHttpRequest();
		xhr.upload.addEventListener("progress", this.__ajaxUploadProgress, false);
		xhr.addEventListener("load", this.__ajaxUploadComplete, false);
		xhr.addEventListener("error", this.__ajaxUploadError, false);
		xhr.addEventListener("abort", this.__ajaxUploadAbort, false);
		xhr.open("POST", Store.fixURL(this.props.action || ''), "true");
		xhr.send(data);
	},
	__ajaxUploadProgress: function __ajaxUploadProgress(evt) {
		if (evt.lengthComputable) {
			evt.progress = Math.round(evt.loaded * 100 / evt.total);
		}
		this.props.onUploading && this.props.onUploading(evt, this);
	},
	__ajaxUploadComplete: function __ajaxUploadComplete(evt) {
		this.reset();
		var _data = JSON.parse(evt.target.responseText);
		if (_data.status == 200) {
			this.props.onComplete && this.props.onComplete(_data.result, this);
		} else {
			this.props.onError && this.props.onError(_data.result, this);
		}
	},
	__ajaxUploadError: function __ajaxUploadError(event) {
		this.reset();
		this.props.onError && this.props.onError(event.message, this);
	},
	__ajaxUploadAbort: function __ajaxUploadAbort(event) {
		this.reset();
		this.props.onAbort && this.props.onAbort(event, this);
	},
	reset: function reset() {
		this.setState({ loading: false });
		ReactDOM.findDOMNode(this).reset();
	},
	render: function render() {
		return React.createElement(
			'form',
			{ className: "rt-ajax-uploader " + this.props.className,
				style: this.props.style,
				'data-loading': this.state.loading,
				encType: 'multipart/form-data',
				action: Store.fixURL(this.props.action || ''),
				method: 'POST' },
			this.props.children,
			React.createElement('input', { multiple: this.props.multiple, className: 'input', type: 'file', name: this.props.name || 'upload_file_' + new Date().getTime(), onChange: this.__onInputChange, onClick: this.__onInputClick })
		);
	}
});