var React = require('react');

var Bubble = React.createClass({
	displayName:'Bubble',
	getInitialState: function(){
		return {
			active: this.props.active || false,
			direction: 'top'
		}
	},

	render: function(){
		return (
			<div className="rt-bubble">

			</div>
		);
	}
});

module.exports = Bubble;
