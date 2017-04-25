var React = require('react');
var AjaxUploader = require('./AjaxUploader');

module.exports = React.createClass({
	componentDidMount: function(){

	},
	getDefaultProps: function () {
		return {
			value: './images/DefaultAvatar.png'
		};
	},
	getInitialState: function() {
    	return {
			value: this.props.value
		};
  	},
	__onChange: function (files){
		var _file = files[0];
		if(_file.type.indexOf('image')==-1){
			alert('文件[' + _file.name + ']不是图片类型');
			return false;
		}
	},
	__onComplete: function (data, uploader){
		var _file = data[0];
		if(_file){
			this.setValue(_file.url);
		}
		this.props.onComplete && this.props.onComplete(_file, this);
	},
	getValue: function (){
		return this.state.value;
	},
	setValue: function (value){
		this.setState({ value: value }, function (){
			this.props.onChange && this.props.onChange(value, this);
		}.bind(this));
	},
	render:function(){
		return (
			<AjaxUploader
				{...this.props}
				className='rt-image-uploader'
				onChange={this.__onChange}
				onComplete={this.__onComplete}
				multipart={false} >
				<div className="container">
					<img className="img" src={Store.fixURL(this.state.value)} />
				</div>
			</AjaxUploader>
		);
	}
});
