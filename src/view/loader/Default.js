var React = require('react');

module.exports = React.createClass({
	displayName:'DefaultLoading',
	getDefaultProps: function (){
		return {
			content: 'Loding......',
			className: ''
		};
	},
	render:function(){
		return (
			<div style={this.props.style} className={'rt-loading rt-loading-default ' + this.props.className}>
				<div className="view"></div>
				<div className="content">{this.props.content}</div>
			</div>
		);
	}
});
