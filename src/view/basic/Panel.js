var React = require('react');

var Panel = React.createClass({
	displayName:'Panel',
	getDefaultProps: function (){
		return {
			className: 'c-default'
		}
	},
	__onClose: function (){
		this.props.onClose && this.props.onClose();
	},
	render: function(){
		return (
			<div className={"rt-panel  " + this.props.className} style={this.props.style}>
				{this.props.enableClose && <i onClick={this.props.onClose} className="rt-panel-close fa fa-close"></i>}
				{this.props.children}
			</div>
		);
	}
});

Panel.Header = React.createClass({
	displayName:'PanelHeader',
	getDefaultProps: function (){
		return {
			className: ''
		}
	},
	render: function(){
		return <div className={"rt-panel-header " + this.props.className} style={this.props.style} >
			{
				this.props.icon && <i className={"icon fa " + this.props.icon} />
			}
			{
				this.props.title && <span className="title">{this.props.title}</span>
			}
			{this.props.children}
		</div>;
	}
});

Panel.Body = React.createClass({
	displayName:'PanelHeader',
	getDefaultProps: function (){
		return {
			className: ''
		}
	},
	render: function(){
		return <div className={"rt-panel-body " + this.props.className} style={this.props.style} >
			{this.props.children}
		</div>;
	}
});

module.exports = Panel;
