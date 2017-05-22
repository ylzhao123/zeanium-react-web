var React = require('react');
var Dropdown = require('../basic/Dropdown');
var ListView = require('../data/ListView.js');

module.exports = React.createClass({
	displayName: 'TabFilter',
	getDefaultProps: function getDefaultProps() {
		return {};
	},
	getInitialState: function getInitialState() {
		return {};
	},
	componentDidMount: function componentDidMount() {},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'rt-tab-filter' },
			React.createElement('div', { className: 'keys' }),
			React.createElement('div', { className: 'value' })
		);
	}
});