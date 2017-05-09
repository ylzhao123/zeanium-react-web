require('./Button.less');
var React = require('react');
var RTItem = require('../basic/RTItem');

module.exports = React.createClass({
	displayName:'Button',
	getDefaultProps: function (){
		return {
			className: '',
			float: 'none',
			type: 'primary'
		}
	},
	getInitialState: function(){
		return {
			loading: false
		}
	},
	loading: function (value){
		if(this.isMounted()){
			this.setState({ loading: value });
		}
	},
	__renderChildren: function (){
		if(!this.props.children){
			return <span><i className={'btn-icon fa ' + this.props.icon} />{this.props.text}</span>;
		}else {
			return this.props.children;
		}
	},
	__onClick: function (rtitem, event){
		this.props.onClick && this.props.onClick(this.props, this, event);
	},
	render: function(){
		return (
			<RTItem {...this.props}
				attrs={zn.extend({ "data-loading": this.state.loading }, this.props.attrs)}
				className={'rt-button rt-action-ripple ' + this.props.className + ' ' + (this.props.status||this.props.type)}
				onClick={this.__onClick} >
				{this.__renderChildren()}
			</RTItem>
		);
	}
});
