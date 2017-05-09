'use strict';

require('./Default.less');
var React = require('react');

module.exports = React.createClass({
	displayName: 'DefaultLoading',
	getDefaultProps: function getDefaultProps() {
		return {
			content: 'Loding......',
			className: ''
		};
	},
	render: function render() {
		return React.createElement(
			'div',
			{ style: this.props.style, className: 'rt-loading rt-loading-default ' + this.props.className },
			React.createElement('div', { className: 'view' }),
			React.createElement(
				'div',
				{ className: 'content' },
				this.props.content
			)
		);
	}
});