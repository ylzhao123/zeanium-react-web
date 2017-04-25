var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
	displayName:'Timer',
	getDefaultProps: function (){
		return {
			className: ''
		};
	},
	getValue: function () {
		var _date = ReactDOM.findDOMNode(this.refs.date).value,
			_time = ReactDOM.findDOMNode(this.refs.time).value;
		return _date + ' ' + _time;
	},
	setValue: function (value) {
		var _data = value.split(' ');
		ReactDOM.findDOMNode(this.refs.date).value = _data[0];
		ReactDOM.findDOMNode(this.refs.time).value = _data[1];
		return this;
	},
	__onChange: function (event){
		this.props.onChange && this.props.onChange(this.getValue(), this, event);
	},
	render: function(){
		var _data = (this.props.value||'').split(' ');
		return (
			<div className={"rt-timer " + this.props.className}>
				<input type="date" defaultValue={_data[0]} ref="date" className="timer-date" name={this.props.name+'_date'} required={this.props.required} onChange={this.__onChange} />
				<input type="time" defaultValue={_data[1]} ref="time" className="timer-time" name={this.props.name+'_time'} required={this.props.required} onChange={this.__onChange} />
			</div>
		);
	}
});
