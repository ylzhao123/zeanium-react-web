var React = require('react');

module.exports = React.createClass({
	displayName:'TableColgroup',
	render: function(){
		return (
			<colgroup>
				{
					(this.props.items||[]).map(function (item, index) {
						return <col key={index} style={{width:item.width}} />;
					})
				}
			</colgroup>
		);
	}
});
