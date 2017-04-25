var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
	displayName:'Uploader',
	getDefaultProps: function () {
		return {
			placeholder: '选择文件',
			hiddens: {},
			multipart: false
		};
	},
	getInitialState: function () {
		this._target = 'uploader-target_' + (new Date()).getTime();
		return {
			uploading: false,
			placeholder: this.props.placeholder,
			hiddens: this.props.hiddens,
			value: this.props.value,
			previewURL: null,
			files: []
		}
	},
	componentDidMount:function(){

	},
	setHidden: function (key, value){
		this.state.hiddens[key] = value;
		this.setState({
			hiddens: this.state.hiddens
		});
	},
	__onIFrameLoad: function (event){
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
		if(this.props.multipart){
			this.state.files.push(_file[1]);
		}
		this.setState({
			placeholder: this.props.placeholder,
			files: this.state.files,
			uploading: false,
		});
		this.props.onChange && this.props.onChange(event, _file[1], this);
		return this.props.onUploaderChange && this.props.onUploaderChange(event, data, this);
	},
	__onInputChange: function (event){
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
	__onDeleteFile: function (item, index){
		this.state.files.splice(index, 1);
		this.forceUpdate();
	},
	__inputRender: function (item, index) {
		return <li key={index}>
			<a className="input choose-file">
				<i className="fa fa-file"></i>
				<i className="cancle fa fa-times" onClick={()=>this.__onDeleteFile(item, index)} />
				<span>{this.state.placeholder}</span>
				<input className="input" type="file" name={this.props.name} onChange={this.__onInputChange} />
			</a>
		</li>;
	},
	__fileRender: function (item, index){
		return <li className="file" key={index}>
			<img src={item} />
			<i className="cancle fa fa-times" onClick={()=>this.__onDeleteFile(item, index)} />
		</li>;
	},
	__onInputClick: function (event){
		this.props.onUploaderClick && this.props.onUploaderClick(event, this);
	},
	__onUploadCancle: function (){

	},
	render:function(){
		var _hiddens = this.state.hiddens||{};
		_hiddens['FORWORD_URL'] = window.location.origin + window.location.pathname + '_black.html';
		//{this.state.uploading && <i className="cancle fa fa-times" onClick={this.__onUploadCancle} />}
		return (
			<form
				className="rt-uploader"
				target={this._target}
				encType="multipart/form-data"
				action={Store.fixURL(this.props.action||'')}
				method="POST"
				style={this.props.style}>
				<iframe onLoad={this.__onIFrameLoad} className="uploader-target" name={this._target} />
				<div className="input choose-file">
					<i className={"icon fa fa-upload " + (this.state.uploading?'uploading':'')}></i>
					{false && <i className="cancle fa fa-times" onClick={this.__onUploadCancle} />}
					<span className="label">{this.state.placeholder}</span>
					{this.state.previewURL && <img className="preview" src={this.state.previewURL} />}
					<input className="input" type="file" name={this.props.name||('upload_file_' + (new Date()).getTime())} onChange={this.__onInputChange} onClick={this.__onInputClick} />
				</div>
				{
					Object.keys(_hiddens).map(function (hidden, index){
						return <input key={'hidden_' + index} type="hidden" name={hidden} value={_hiddens[hidden]} />;
					})
				}
				<ul className="files">
					{
						this.state.files.map(this.__fileRender)
					}
				</ul>
			</form>
		);
	}
});
