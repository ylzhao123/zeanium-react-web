var React = require('react');

var Bubble = React.createClass({
	displayName: 'Bubble',
	getInitialState: function getInitialState() {
		return {
			active: this.props.active || false,
			direction: 'top'
		};
	},

	render: function render() {
		return React.createElement('div', { className: 'rt-bubble' });
	}
});

module.exports = Bubble;