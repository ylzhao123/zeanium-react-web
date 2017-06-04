var React = require('react');
var RTList = require('../basic/RTList');
var RTFlexItem = require('../basic/RTFlexItem');
var inputs = require('./inputs.js');

module.exports = React.createClass({
	displayName:'FormItem',
	getDefaultProps: function (){
		return {
			disabled: false,
			className: ''
		}
	},
	getInitialState: function(){
		return {
			value: this.props.value,
			status: 'default'
		}
	},
	componentDidMount: function (){
		if(this.props.value!=undefined && this.refs.input){
			this.refs.input.setValue(this.props.value);
		}
		this.props.onDidMount && this.props.onDidMount(this);
	},
	validate: function (){
		if(!this.refs.input){
			return Toast.error('Form item input component is undefined.'), false;
		}
		var _value = this.refs.input.getValue();
		if(this.props.required && (_value == '' || _value == null || _value == undefined)){
			this.setState({
				status: 'danger'
			});
			return Toast.error(this.props.error || ((this.props.title||'字段')+'是必填项.')), null;
		}else {
			this.setState({
				status: 'success'
			});
		}

		return _value;
	},
	__onInputChange: function (value, rtlist){
		this.props.onChange && this.props.onChange(value, rtlist, this);
	},
	render: function(){
		var _input = null,
			_type = this.props.type;
		if(zn.is(_type, 'string')){
			if(_type=='EditableTable'){
				_input = require('../data/EditableTable.js');
			}else {
				_input = inputs[_type];
			}
		}else {
			_input = _type;
		}


		return (
			<RTFlexItem
				{...this.props}
				className={zn.react.classname('rt-form-item', this.props.className, this.state.status, this.props.required?'required':'')} >
				{this.props.icon && <div className="icon"><i className={"fa " + this.props.icon} /></div>}
				{this.props.title && <div className="title">{this.props.title}</div>}
				{_input && <_input ref="input" {...this.props} onChange={this.__onInputChange} />}
				{this.props.suffix && <div className="suffix">{this.props.suffix}</div>}
			</RTFlexItem>
		);
	}
});
