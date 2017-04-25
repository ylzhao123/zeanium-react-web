var React = require('react');
var AjaxUploader = require('./AjaxUploader');

module.exports = React.createClass({
	getDefaultProps: function (){
		return {
			editable: true
		};
	},
	getInitialState: function () {
    	return {
			value: ','
		};
  	},
	__onChange: function (files){
		var _file = files[0];
		this.props.onChange && this.props.onChange(_file);
	},
	__onComplete: function (data, uploader){
		var _file = data[0];
		this.state.value = this.state.value + _file.url + ',';
		this.forceUpdate();
	},
	getValue: function (){
		return this.state.value;
	},
	setValue: function (value){
		this.setState({ value: value });
	},
	__renderContent: function (item){
		var _temp = this.props.onFileRender && this.props.onFileRender(item);
		if(_temp){
			return _temp;
		}
		var _ext = item.split('.').pop().toLowerCase();
		var _imageExt = ['jpg','png','jpeg','gif'];
		if(_imageExt.indexOf(_ext)!=-1||this.props.isImage){
			return <a href={Store.fixURL(item)}><img src={Store.fixURL(item)} /></a>;
		}else {
			return <a href={Store.fixURL(item)}>{item.split('/').pop()}</a>;
		}
	},
	__onRemove: function (item, index){
		this.state.value = this.state.value.replace(item, '');
		this.forceUpdate();
	},
	render: function(){
		var _values = this.state.value.split(',');
		var _editable = (this.props.editable && !this.props.disabled && !this.props.readonly);
		return (
			<div className="rt-file-uploader">
				{_editable && <AjaxUploader
					{...this.props}
					onChange={this.__onChange}
					onComplete={this.__onComplete} >
					<div className="container">
						<i className="icon fa fa-plus" />
					</div>
				</AjaxUploader>}
				<ul className="file-list">
					{
						_values.map(function (item, index){
							if(item){
								return <li key={index} className="file">
									{ _editable && <i className="fa fa-remove rt-hover-self-loading" onClick={()=>this.__onRemove(item, index)} />}
									{this.__renderContent(item)}
								</li>;
							}
						}.bind(this))
					}
				</ul>
			</div>
		);
	}
});
