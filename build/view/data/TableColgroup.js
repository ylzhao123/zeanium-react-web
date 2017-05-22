var React = require('react');

module.exports = React.createClass({
	displayName: 'TableColgroup',
	render: function render() {
		return React.createElement(
			'colgroup',
			null,
			(this.props.items || []).map(function (item, index) {
				return React.createElement('col', { key: index, style: { width: item.width } });
			})
		);
	}
});