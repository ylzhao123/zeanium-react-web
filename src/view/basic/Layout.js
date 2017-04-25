var React = require('react');

var Layout = React.createClass({
	displayName:'Layout',
	getDefaultProps: function (){
		return {
			className: '',
			direction: 'h'
		};
	},
	render: function(){
		return (
			<div className={'rt-layout ' + this.props.className} data-direction={this.props.direction} style={this.props.style}>
				{this.props.children}
			</div>
		);
	}
});

Layout.Header = React.createClass({
	displayName: 'LayoutHeader',
	getDefaultProps: function (){
		return {
			className: ''
		};
	},
	render: function(){
		return (
			<div className={'rt-layout-header ' + this.props.className} style={this.props.style}>
				{this.props.children}
			</div>
		);
	}
});

Layout.Body = React.createClass({
	displayName: 'LayoutBody',
	getDefaultProps: function (){
		return {
			className: ''
		};
	},
	render: function(){
		return (
			<div className={'rt-layout-body ' + this.props.className} style={this.props.style}>
				{this.props.children}
			</div>
		);
	}
});

Layout.Footer = React.createClass({
	displayName: 'LayoutFooter',
	getDefaultProps: function (){
		return {
			className: ''
		};
	},
	render: function(){
		return (
			<div className={'rt-layout-footer ' + this.props.className} style={this.props.style}>
				{this.props.children}
			</div>
		);
	}
});

module.exports = Layout;
