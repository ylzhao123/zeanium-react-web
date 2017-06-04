var React = require('react');

module.exports = React.createClass({
	displayName:'Search',
	getDefaultProps: function (){
		return {
			value: '',
			realtime: false
		}
	},
	getInitialState: function(){
		return {
			value: this.props.value,
			searching: false
		}
	},
	__onClick: function (rtitem, event){
		this.props.onClick && this.props.onClick(this.props, this, event);
	},
	__onInputFoucs: function (){
		this.setState({
			focus: true
		});
	},
	__onInputBlur: function (){
		this.setState({
			focus: false
		});
	},
	__onInputChange: function (event){
		var _value = event.target.value;
		this.state.value = _value
		this.forceUpdate();
		this.props.onChange && this.props.onChange(_value);
		if(this.props.realtime){
			this.props.onSearch && this.props.onSearch(_value);
		}
	},
	__onIconClick: function (){
		if(!this.props.realtime){
			this.props.onSearch && this.props.onSearch(this.state.value);
		}
	},
	searching: function (value){
		this.setState({
			searching: value
		});
	},
	render: function(){
		return (
			<div className={zn.react.classname("rt-search", this.props.className, this.state.focus?'foucs':'')}>
				<i onClick={this.__onIconClick} className={"search-icon fa " + (this.state.searching?"searching":"fa-search")} />
				<input {...this.props}
					value={this.state.value}
					onFocus={this.__onInputFoucs}
					onBlur={this.__onInputBlur}
					onChange={this.__onInputChange}
					className="search-input"
					type="search"
					name="value" />
			</div>
		);
	}
});
