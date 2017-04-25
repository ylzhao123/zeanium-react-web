var React = require('react');
var AjaxUploader = require('../form/AjaxUploader');
var FormItem = require('../form/FormItem');
var Card = require('./Card');
var Table = require('../data/Table');

module.exports = React.createClass({
	getInitialState: function() {
		var _hiddens = this.props.hiddens||{};
		if(!this.props.editable){
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
	__onChange: function (files){
		var _file = files[0];
		this.setState({
			value: _file.name
		});
		if(_file.name.indexOf('xls')==-1){
			alert('文件[' + _file.name + ']不是 xlsx / xls 类型');
			return false;
		}
		if(!this.props.action){
			alert('The action is empty');
			return false;
		}

		if(this.props.editable){
			return {
				model: this.refs.model.refs.input.getValue(),
				fields: this.refs.fields.refs.input.getValue()
			}
		}
	},
	__onComplete: function (data, uploader){
		this.setState({
			data: data
		});
		this.props.onComplete && this.props.onComplete(data, uploader);
	},
	getValue: function (){
		return this.state.value;
	},
	setValue: function (value){
		this.setState({ value: value });
	},
	__renderEditer: function (){
		if(this.props.editable){
			return <div>
				<FormItem ref="model" value={this.props.model} title="Model:" type="Input" />
				<FormItem ref="fields" value={this.props.fields} title="Fields:" type="Input" />
			</div>;
		}
	},
	__renderSheet: function (item){
		var _data = item.data,
			_items = _data.shift();
		if(!_items){
			return null;
		}
		_items = _items.map(function (value){
			return { title: value };
		});
		return <Table items={_items} showHeader={true} data={_data} />;
	},
	__renderTables: function (){
		if(this.state.data.length){
			return (
				<ul className="xlsx-importer-list">
					{
						this.state.data.map(function (item, index){
							return <li key={index}>
								<Card title={item.title} >
									{this.__renderSheet(item)}
								</Card>
							</li>;
						}.bind(this))
					}
				</ul>
			);
		}
	},
	__onError: function (msg){
		Toast.error('Import Error: ' + msg);
		this.props.onError && this.props.onError(msg);
	},
	render:function(){
		return (
			<div className='rt-xlsx-importer'>
				<AjaxUploader
					{...this.props}
					hiddens={this.state.hiddens}
					className='xlsx-importer-uploader'
					onChange={this.__onChange}
					onError={this.__onError}
					onComplete={this.__onComplete}
					multipart={false} >
					<div className="container">
						<i className="fa fa-file-excel-o" />
						{this.state.value}
					</div>
				</AjaxUploader>
				{this.__renderEditer()}
				{this.__renderTables()}
			</div>
		);
	}
});
