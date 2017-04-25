var React = require('react');
var Checkbox = require('./Checkbox');
var RTList = require('../basic/RTList');

module.exports = React.createClass({
	displayName:'CheckboxGroup',
	getDefaultProps: function (){
		return {
			className: '',
			float: 'none',
			value: ',',
			valueKey: 'value',
			disabled: false
		}
	},
	getInitialState: function(){
		return {
			value: this.props.value
		}
	},
	__onCheckboxChecked: function (checked, checkbox){
		var _value = this.state.value || ',',
			_itemValue = checkbox.props[this.props.valueKey] + ',';
		_value.indexOf(',') == -1
		if(_value.charAt(_value.length-1)!=','){
			_value = _value + ',';
		}
		if(checked){
			_value = _value + _itemValue;
		}else {
			_value = _value.replace(new RegExp(_itemValue, 'gi'), '');
		}

		this.setValue(_value);
	},
	__itemRender: function (item, index, rtlist){
		//console.log('Value: ', item[this.props.valueKey]);
		//console.log(this.state.value);
		return <Checkbox
					disabled={this.props.disabled}
					float={this.props.float}
					{...item}
					onChecked={this.__onCheckboxChecked}
					checked={(this.state.value.indexOf(item[this.props.valueKey])!==-1)} />;
	},
	getValue: function (){
		return this.state.value;
	},
	setValue: function (value){
		this.setState({ value: value }, function (){
			this.props.onChange && this.props.onChange(value, this);
		}.bind(this));
	},
	render: function(){
		return (
			<RTList {...this.props}
				className={'rt-checkbox-group ' + this.props.className}
				itemRender={this.__itemRender}/>
		);
	}
});
