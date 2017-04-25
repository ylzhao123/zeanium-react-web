var React = require('react');
var ReactDOM = require('react-dom');

var ProgressRing = React.createClass({
	displayName:'ProgressRing',
	getDefaultProps: function (){
		return {
			full: true,
			className: '',
			trackColor: '#f0f0f0',
			valueColor: '#6ec84e',
			value: 20,
			duration: 1500
		}
	},
	getInitialState: function(){
		return {
			leftStyle: {},
			rightStyle: {},
			coverStyle: {}
		}
	},
	componentDidMount: function (){
		ReactDOM.findDOMNode(this.refs.cover).getBoundingClientRect();
		this.setState({
			leftStyle: this.__leftStyle(),
			rightStyle: this.__rightStyle(),
			coverStyle: this.__coverStyle()
		});
	},
	getValue: function (){
		return this.props.value;
	},
	__leftStyle: function (){
		var _value = this.props.value,
			_duration = this.props.duration;

		return {
			transform: 'rotate(' + _value * 3.6 + 'deg)',
            OTransform: 'rotate(' + _value * 3.6 + 'deg)',
            msTransform: 'rotate(' + _value * 3.6 + 'deg)',
            MozTransform: 'rotate(' + _value * 3.6 + 'deg)',
            WebkitTransform: 'rotate(' + _value * 3.6 + 'deg)',
            Transition: 'transform ' + _duration + 'ms linear',
            OTransition: '-o-transform ' + _duration + 'ms linear',
            msTransition: '-ms-transform ' + _duration + 'ms linear',
            MozTransition: '-moz-transform ' + _duration + 'ms linear',
            WebkitTransition: '-webkit-transform ' + _duration + 'ms linear'
		}
	},
	__rightStyle: function (){
		if(this.props.value>50){
			return {
				opacity: 1,
                animation: 'toggle ' + (this.props.duration * 50 / this.props.value) + 'ms',
                animationTimingFunction: 'step-end'
			};
		}else {
			return {};
		}
	},
	__coverStyle: function (){
		if(this.props.value>50){
			return {
				opacity: 0,
                animation: 'toggle ' + (this.props.duration * 50 / this.props.value) + 'ms',
                animationTimingFunction: 'step-start'
			};
		}else {
			return {};
		}
	},
	render: function(){
		return (
			<div className={"rt-progress-ring " + this.props.className} data-full={this.props.full} >
				<div className="progress-track" style={{ borderColor: this.props.trackColor }}></div>
				<div className="progress-left" style={zn.extend({ borderColor: this.props.valueColor }, this.state.leftStyle)}></div>
				<div className="progress-right" style={zn.extend({ borderColor: this.props.valueColor }, this.state.rightStyle)}></div>
				<div className="progress-cover" ref="cover" style={zn.extend({ borderColor: this.props.trackColor }, this.state.coverStyle)}></div>
				<div className="progress-text">
					<span className="progress-num">{this.props.value}</span>
					<span className="progress-percent">%</span>
				</div>
			</div>
		);
	}
});

module.exports = ProgressRing;
