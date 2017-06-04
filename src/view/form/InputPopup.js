var React = require('react');

module.exports = React.createClass({
	displayName:'InputPopup',
	getInitialState: function (){
		return {
			value: null
		};
	},
	getValue: function () {
		return this.state.value;
	},
	setValue: function (value) {
		return this.setState({
			value: value
		}), this;
	},
	render: function(){
		return (
			<div className="rt-input-popup">

			</div>
		);
	}
});
