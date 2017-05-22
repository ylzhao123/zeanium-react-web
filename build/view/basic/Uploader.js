var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
	displayName: 'Uploader',
	getDefaultProps: function getDefaultProps() {
		return {
			placeholder: '选择文件',
			hiddens: {},
			multipart: false
		};
	},
	getInitialState: function getInitialState() {
		this._target = 'uploader-target_' + new Date().getTime();
		return {
			uploading: false,
			placeholder: this.props.placeholder,
			hiddens: this.props.hiddens,
			value: this.props.value,
			previewURL: null,
			files: []
		};
	},
	componentDidMount: function componentDidMount() {},
	setHidden: function setHidden(key, value) {
		this.state.hiddens[key] = value;
		this.setState({
			hiddens: this.state.hiddens
		});
	},
	__onIFrameLoad: function __onIFrameLoad(event) {
		var _target = event.target,
		    _data = '';
		if (_target.contentWindow) {
			_data = _target.contentWindow.document.body ? _target.contentWindow.document.body.innerHTML : null;
		} else if (_target.contentDocument) {
			_data = _target.contentDocument.document.body ? _target.contentDocument.document.body.innerHTML : null;
		}

		var _search = _target.contentWindow.location.search;
		_data = decodeURI(_search.split('?').pop());
		var _file = _data.split('=');
		if (this.props.multipart) {
			this.state.files.push(_file[1]);
		}
		this.setState({
			placeholder: this.props.placeholder,
			files: this.state.files,
			uploading: false
		});
		this.props.onChange && this.props.onChange(event, _file[1], this);
		return this.props.onUploaderChange && this.props.onUploaderChange(event, data, this);
	},
	__onInputChange: function __onInputChange(event) {
		var _files = event.nativeEvent.target.files;
		var _value = _files[0].name;
		this.setState({
			uploading: true,
			previewURL: URL.createObjectURL(_files[0])
		});
		var _dom = ReactDOM.findDOMNode(this);
		_dom.submit();
		_dom.reset();
	},
	__onDeleteFile: function __onDeleteFile(item, index) {
		this.state.files.splice(index, 1);
		this.forceUpdate();
	},
	__inputRender: function __inputRender(item, index) {
		var _this = this;

		return React.createElement(
			'li',
			{ key: index },
			React.createElement(
				'a',
				{ className: 'input choose-file' },
				React.createElement('i', { className: 'fa fa-file' }),
				React.createElement('i', { className: 'cancle fa fa-times', onClick: function onClick() {
						return _this.__onDeleteFile(item, index);
					} }),
				React.createElement(
					'span',
					null,
					this.state.placeholder
				),
				React.createElement('input', { className: 'input', type: 'file', name: this.props.name, onChange: this.__onInputChange })
			)
		);
	},
	__fileRender: function __fileRender(item, index) {
		var _this2 = this;

		return React.createElement(
			'li',
			{ className: 'file', key: index },
			React.createElement('img', { src: item }),
			React.createElement('i', { className: 'cancle fa fa-times', onClick: function onClick() {
					return _this2.__onDeleteFile(item, index);
				} })
		);
	},
	__onInputClick: function __onInputClick(event) {
		this.props.onUploaderClick && this.props.onUploaderClick(event, this);
	},
	__onUploadCancle: function __onUploadCancle() {},
	render: function render() {
		var _hiddens = this.state.hiddens || {};
		_hiddens['FORWORD_URL'] = window.location.origin + window.location.pathname + '_black.html';
		//{this.state.uploading && <i className="cancle fa fa-times" onClick={this.__onUploadCancle} />}
		return React.createElement(
			'form',
			{
				className: 'c-uploader',
				target: this._target,
				encType: 'multipart/form-data',
				action: Store.fixURL(this.props.action || ''),
				method: 'POST',
				style: this.props.style },
			React.createElement('iframe', { onLoad: this.__onIFrameLoad, className: 'uploader-target', name: this._target }),
			React.createElement(
				'div',
				{ className: 'input choose-file' },
				React.createElement('i', { className: "icon fa fa-upload " + (this.state.uploading ? 'uploading' : '') }),
				false && React.createElement('i', { className: 'cancle fa fa-times', onClick: this.__onUploadCancle }),
				React.createElement(
					'span',
					{ className: 'label' },
					this.state.placeholder
				),
				this.state.previewURL && React.createElement('img', { className: 'preview', src: this.state.previewURL }),
				React.createElement('input', { className: 'input', type: 'file', name: this.props.name || 'upload_file_' + new Date().getTime(), onChange: this.__onInputChange, onClick: this.__onInputClick })
			),
			Object.keys(_hiddens).map(function (hidden, index) {
				return React.createElement('input', { key: 'hidden_' + index, type: 'hidden', name: hidden, value: _hiddens[hidden] });
			}),
			React.createElement(
				'ul',
				{ className: 'files' },
				this.state.files.map(this.__fileRender)
			)
		);
	}
});