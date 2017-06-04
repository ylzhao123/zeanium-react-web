var React = require('react');
module.exports = React.createClass({
	displayName:'Label',
	getInitialState: function (){
		return {
			value: this.props.value
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
			<div className={zn.react.classname('rt-label', this.props.className)} style={this.props.style} dangerouslySetInnerHTML={{__html: this.state.value}} />
		);
	}
});
