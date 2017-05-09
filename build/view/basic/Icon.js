'use strict';

require('./Icon.less');
var React = require('react');

module.exports = React.createClass({
	displayName: 'Icon',
	getDefaultProps: function getDefaultProps() {
		return {
			className: '',
			spin: false,
			icon: 'fa-code'
		};
	},
	__onClick: function __onClick() {
		this.props.onClick && this.props.onClick(this);
	},
	render: function render() {
		return React.createElement('i', { onClick: this.__onClick, className: "rt-icon fa " + this.props.icon + ' ' + this.props.className, 'data-spin': this.props.spin });
	}
});