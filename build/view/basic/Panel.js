var React = require('react');

var Panel = React.createClass({
	displayName: 'Panel',
	getDefaultProps: function getDefaultProps() {
		return {
			className: 'c-default'
		};
	},
	__onClose: function __onClose() {
		this.props.onClose && this.props.onClose();
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: "rt-panel  " + this.props.className, style: this.props.style },
			this.props.enableClose && React.createElement('i', { onClick: this.props.onClose, className: 'rt-panel-close fa fa-close' }),
			this.props.children
		);
	}
});

Panel.Header = React.createClass({
	displayName: 'PanelHeader',
	getDefaultProps: function getDefaultProps() {
		return {
			className: ''
		};
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: "rt-panel-header " + this.props.className, style: this.props.style },
			this.props.icon && React.createElement('i', { className: "icon fa " + this.props.icon }),
			this.props.title && React.createElement(
				'span',
				{ className: 'title' },
				this.props.title
			),
			this.props.children
		);
	}
});

Panel.Body = React.createClass({
	displayName: 'PanelHeader',
	getDefaultProps: function getDefaultProps() {
		return {
			className: ''
		};
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: "rt-panel-body " + this.props.className, style: this.props.style },
			this.props.children
		);
	}
});

module.exports = Panel;