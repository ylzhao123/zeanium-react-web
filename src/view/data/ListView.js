var React = require('react');
var RTItem = require('../basic/RTItem');
var RTList = require('../basic/RTList');

var ListView = React.createClass({
	displayName:'ListView',
	getDefaultProps: function (){
		return {
			className: 'rt-list-view-default',
			itemClassName: 'rt-list-view-item',
			float: 'none',
			disabled: false,
			value: null,
			textKey: 'text',
			valueKey: 'value',
			noborder: true,
			selectMode: 'radio'  //radio, checkbox, none
		}
	},
	getInitialState: function(){
		return {
			value: this.props.value,
			currIndex: null
		}
	},
	componentWillReceiveProps: function(nextProps){
		if(nextProps.value!==this.props.value){
			this.setState({ value: nextProps.value });
		}
	},
	__getItemValue: function (item){
		var _itemValue = item[this.props.valueKey];
		if(_itemValue===undefined){
			_itemValue = item[this.props.textKey];
		}

		return _itemValue;
	},
	__valueHandler: function (item, index){
		if(!item){ return; }
		var _value = this.state.value,
			_itemValue = this.__getItemValue(item);

		switch (this.props.selectMode) {
			case 'radio':
				_value = _itemValue;
				break;
			case 'checkbox':
				_value = _value || ',';
				_itemValue = _itemValue + ',';
				if(_value.indexOf(_itemValue) == -1){
					_value = _value + _itemValue;
				}else {
					_value = _value.replace(new RegExp(_itemValue, 'gi'), '');
				}
				break;
			case 'none':

				break;
		}

		return _value;
	},
	isCurrent: function (item, index){
		var _value = this.state.value,
			_itemValue = this.__getItemValue(item);

		switch (this.props.selectMode) {
			case 'radio':
				if(_itemValue==undefined){
					if(this.state.currIndex==index){return true;}
					return false;
				}
				if(_value == _itemValue){
					return true;
				}
				break;
			case 'checkbox':
				_value = _value || ',';
				if(_value.indexOf(_itemValue)!==-1){
					return true;
				}
				break;
			case 'none':

				break;
		}

		return false;
	},
	__onItemClick: function (item, index, rtitem, event){
		this.setState({
			value: this.__valueHandler(item, index),
			currIndex: index
		}, function (){
			var _obj = {
				value: this.state.value,
				self: this,
				rtitem: rtitem,
				item: item,
				index: index,
				event: event
			};
			this.props.onClick && this.props.onClick(_obj);
			this.props.onItemClick && this.props.onItemClick(this.state.value, rtitem, this, item, event);
		}.bind(this));
	},
	__itemRender: function (item, index, rtlist){
		var _content = <span>{item[this.props.textKey]}</span>;
		if(this.props.itemRender){
			_content = this.props.itemRender(item, index, this);
		}
		return <RTItem
					className={this.props.itemClassName}
					disabled={this.props.disabled}
					float={this.props.float}
					{...item}
					checked={this.isCurrent(item, index)}
					onClick={(self, event)=>this.__onItemClick(item, index, self, event)} >
					{_content}
		</RTItem>;
	},
	getValue: function (){
		return this.state.value;
	},
	setValue: function (value, callback){
		this.setState({ value: value }, callback);
	},
	render: function(){
		return (
			<RTList
				{...this.props}
				className={'rt-list-view ' + (this.props.noborder?'noborder':'') + ' ' + this.props.className}
				itemRender={this.__itemRender} />
		);
	}
});

module.exports = ListView;
