var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var RTItem = require('./RTItem');

module.exports = React.createClass({
	displayName: 'RTFlexItem',
	render: function render() {
		return React.createElement(
			RTItem,
			_extends({}, this.props, { className: 'rt-flex-item ' + this.props.className }),
			this.props.children
		);
	}
});