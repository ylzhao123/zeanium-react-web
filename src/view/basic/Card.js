var React = require('react');

module.exports = React.createClass({
	displayName:'Card',
	getDefaultProps: function (){
		return {
			className: ''
		};
	},
	render:function(){
		return (
			<div className={'rt-card ' + this.props.className} style={zn.extend({ width: this.props.width },this.props.style)}>
				<div className="card-header">
					{this.props.icon && <i className={'icon fa ' + this.props.icon} />}
					{this.props.title && <span className="title">{this.props.title}</span>}
					{this.props.rightRender && <div className="right-content">{this.props.rightRender(this)}</div>}
				</div>
				<div className="card-body">
					{this.props.children}
				</div>
			</div>
		);
	}
});
