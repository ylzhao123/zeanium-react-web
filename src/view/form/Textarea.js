var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
	displayName:'Textarea',
	getDefaultProps: function (){
		return {
			attrs: {},
			className: ''
		};
	},
	getValue: function () {
		return ReactDOM.findDOMNode(this).value;
	},
	setValue: function (value) {
		return ReactDOM.findDOMNode(this).value = value, this;
	},
	__onChange: function (event){
		this.props.onChange && this.props.onChange(event.target.value, this, event);
	},
	render: function(){
		return (
			<textarea className={"rt-textarea " + this.props.className}
						required={this.props.required}
						placeholder={this.props.placeholder}
						{...this.props.attrs}
						defaultValue={this.props.value}
						disabled={this.props.disabled}
						onChange={this.__onChange}
						name={this.props.name} />
		);
	}
});
