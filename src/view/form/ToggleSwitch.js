var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
	displayName:'ToggleSwitch',
	getDefaultProps: function (){
		return {
			className: '',
			disabled: false
		};
	},
	__onChange: function (event) {
		event.stopPropagation();
		this.props.onChange && this.props.onChange(event.target.checked, event);
	},
	__onInputClick: function (event){
		event.stopPropagation();
	},
	getValue: function () {
		return ReactDOM.findDOMNode(this.refs.input).value;
	},
	setValue: function (value) {
		return ReactDOM.findDOMNode(this.refs.input).value = value, this;
	},
	render: function(){
		console.log(this.props.disabled);
		var _uuid = 'c_toggle_switch_input_' + (new Date()).getTime();
		return (
			<div className={"rt-toggle-switch " + this.props.className + ' ' + (this.props.disabled?'disabled':'')} data-ts-color={this.props.color||'red'}>
				<input ref="input" id={_uuid} disabled={this.props.disabled} type="checkbox" defaultChecked={this.props.value} onClick={this.__onInputClick} onChange={this.__onChange} />
				<label htmlFor={_uuid} className="ts-helper"></label>
			</div>
		);
	}
});
