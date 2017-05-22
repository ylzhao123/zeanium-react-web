var React = require('react');

module.exports = React.createClass({
	displayName: 'DataLoader',
	getDefaultProps: function getDefaultProps() {
		return {
			content: 'Loding......',
			className: ''
		};
	},
	render: function render() {
		return React.createElement(
			'div',
			{ style: this.props.style, className: 'rt-data-loader ' + this.props.className },
			React.createElement('div', { className: 'loader', 'data-loader': this.props.loader }),
			React.createElement(
				'div',
				{ className: 'content' },
				this.props.content
			)
		);
	}
});