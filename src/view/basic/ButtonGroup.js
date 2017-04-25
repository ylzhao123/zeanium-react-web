var React = require('react');
var Button = require('./Button');
var RTList = require('./RTList');

module.exports = React.createClass({
	displayName:'ButtonGroup',
	getDefaultProps: function (){
		return {
			className: '',
			float: 'none',
			disabled: false
		}
	},
	__onItemClick: function (props, btn, event){
		this.props.onClick && this.props.onClick(props, btn, this, event);
	},
	__itemRender: function (item, index, rtlist){
		return <Button
					disabled={this.props.disabled}
					float={this.props.float}
					onClick={this.__onItemClick}
					{...item} />;
	},
	render: function(){
		return (
			<RTList {...this.props}
				className={'rt-button-group ' + this.props.className}
				itemRender={this.__itemRender}/>
		);
	}
});
