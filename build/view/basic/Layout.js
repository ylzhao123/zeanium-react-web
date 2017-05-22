var React = require('react');

var Layout = React.createClass({
	displayName: 'Layout',
	getDefaultProps: function getDefaultProps() {
		return {
			className: '',
			direction: 'h'
		};
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'rt-layout ' + this.props.className, 'data-direction': this.props.direction, style: this.props.style },
			this.props.children
		);
	}
});

Layout.Header = React.createClass({
	displayName: 'LayoutHeader',
	getDefaultProps: function getDefaultProps() {
		return {
			className: ''
		};
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'rt-layout-header ' + this.props.className, style: this.props.style },
			this.props.children
		);
	}
});

Layout.Body = React.createClass({
	displayName: 'LayoutBody',
	getDefaultProps: function getDefaultProps() {
		return {
			className: ''
		};
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'rt-layout-body ' + this.props.className, style: this.props.style },
			this.props.children
		);
	}
});

Layout.Footer = React.createClass({
	displayName: 'LayoutFooter',
	getDefaultProps: function getDefaultProps() {
		return {
			className: ''
		};
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'rt-layout-footer ' + this.props.className, style: this.props.style },
			this.props.children
		);
	}
});

module.exports = Layout;