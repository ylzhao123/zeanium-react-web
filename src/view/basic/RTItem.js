var React = require('react');

module.exports = React.createClass({
	displayName:'RTItem',
	getDefaultProps: function (){
		return {
			className: '',
			checked: false,
			disabled: false,
			toggle: false
		}
	},
	getInitialState: function(){
		return {
			checked: this.props.checked
		}
	},
	__onClick: function (event){
		if(this.props.disabled){
			return;
		}

		if(this.props.toggle){
			this.setState({
				checked: !this.state.checked
			});
		}

		event.stopPropagation();
		//event.preventDefault();
		this.props.onClick && this.props.onClick(this, event);
	},
	render: function(){
		return (
			<div className={'rt-item ' + this.props.className} style={this.props.style}
					data-checked={this.props.checked}
					data-disabled={this.props.disabled}
					data-float={this.props.float}
					{...this.props.attrs}
					onClick={this.__onClick}>
				{this.props.children}
			</div>
		);
	}
});
