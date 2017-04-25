var React = require('react');
var RTItem = require('../basic/RTItem');

module.exports = React.createClass({
	displayName:'Checkbox',
	getDefaultProps: function (){
		return {
			className: '',
			float: 'none',
			checked: false,
			disabled: false
		}
	},
	getInitialState: function(){
		return {
			checked: this.props.checked
		}
	},
	__onClick: function (rtitem, event){
		this.state.checked = !this.state.checked;
		this.setState({
			checked: this.state.checked
		});

		this.props.onChecked && this.props.onChecked(this.state.checked, this);
		this.props.onClick && this.props.onClick(this, rtitem, event);
		this.props.onChange && this.props.onChange(event, this.state.checked);
	},
	__renderContent: function (){
		var _content = this.props.contentRender && this.props.contentRender(this);
		if(!_content){
			_content = <span>{this.props.text||''}</span>;
		}

		return _content;
	},
	getValue: function (){
		return this.state.checked;
	},
	setValue: function (value){
		this.setState({ checked: value });
	},
	render: function(){
		return (
			<RTItem {...this.props} className={'rt-checkbox ' + this.props.className} checked={this.state.checked} onClick={this.__onClick}>
				<input name={this.props.name} type='checkbox' defaultChecked={this.state.checked} />
				<span className="mark"><i className='icon fa fa-check' /></span>
				{this.__renderContent()}
			</RTItem>
		);
	}
});
