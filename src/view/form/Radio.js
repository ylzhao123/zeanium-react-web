var React = require('react');
var RTItem = require('../basic/RTItem');
var RTList = require('../basic/RTList');

var RadioItem = React.createClass({
	displayName:'RadioItem',
	getDefaultProps: function (){
		return {
			className: '',
			float: 'none',
			checked: false,
			disabled: false
		}
	},
	__renderContent: function (){
		var _content = this.props.contentRender && this.props.contentRender(this);
		if(!_content){
			_content = <span>{this.props.text||''}</span>;
		}

		return _content;
	},
	render: function(){
		return (
			<RTItem {...this.props} className={'rt-radio-item ' + this.props.className}>
				<input type='radio' name={this.props.name} value={this.props.value} defaultChecked={this.props.checked} />
				<span className="mark"><i className='icon fa fa-circle' /></span>
				{this.__renderContent()}
			</RTItem>
		);
	}
});

var Radio = React.createClass({
	displayName:'Radio',
	getDefaultProps: function (){
		return {
			className: '',
			float: 'none',
			value: null,
			valueKey: 'value',
			disabled: false
		}
	},
	getInitialState: function(){
		return {
			value: this.props.value
		}
	},
	__onRadioItemClick: function (rtitem, event){
		this.setValue(rtitem.props[this.props.valueKey], function (value){
			this.props.onItemClick && this.props.onItemClick(value, this, event);
		}.bind(this));
	},
	__itemRender: function (item, index, rtlist){
		return <RadioItem
					disabled={this.props.disabled}
					float={this.props.float}
					{...item}
					onClick={this.__onRadioItemClick}
					checked={this.state.value===item[this.props.valueKey]} />;
	},
	getValue: function (){
		return this.state.value;
	},
	setValue: function (value, callback){
		this.setState({
			value: value
		}, function (){
			this.props.onChange && this.props.onChange(value, this);
			callback && callback(value, this);
		}.bind(this));
	},
	render: function(){
		return (
			<RTList {...this.props}
				className={'rt-radio ' + this.props.className}
				itemRender={this.__itemRender}/>
		);
	}
});

module.exports = Radio;
