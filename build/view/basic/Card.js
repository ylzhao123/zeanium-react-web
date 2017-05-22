var React = require('react');

module.exports = React.createClass({
	displayName: 'Card',
	getDefaultProps: function getDefaultProps() {
		return {
			className: ''
		};
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'rt-card ' + this.props.className, style: zn.extend({ width: this.props.width }, this.props.style) },
			React.createElement(
				'div',
				{ className: 'card-header' },
				this.props.icon && React.createElement('i', { className: 'icon fa ' + this.props.icon }),
				this.props.title && React.createElement(
					'span',
					{ className: 'title' },
					this.props.title
				),
				this.props.rightRender && React.createElement(
					'div',
					{ className: 'right-content' },
					this.props.rightRender(this)
				)
			),
			React.createElement(
				'div',
				{ className: 'card-body' },
				this.props.children
			)
		);
	}
});