var React = require('react');

module.exports = React.createClass({
	displayName:'DataLoader',
	getDefaultProps: function (){
		return {
			content: 'Loding......',
			className: ''
		};
	},
	render:function(){
		return (
			<div style={this.props.style} className={'rt-data-loader ' + this.props.className}>
				<div className="loader" data-loader={this.props.loader}></div>
				<div className="content">{this.props.content}</div>
			</div>
		);
	}
});
