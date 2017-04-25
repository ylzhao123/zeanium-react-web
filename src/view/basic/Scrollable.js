var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
	displayName: 'Scrollable',
	getDefaultProps: function (){
		return {
			className: ''
		}
	},
	getInitialState: function(){
		return {
			loading: false
		}
	},
	componentDidMount: function(){
		this._scroll = new IScroll(ReactDOM.findDOMNode(this), {
			probeType: 3,
			useTransition: true,
	        hScrollbar: false,
	        vScrollbar: false
		});
	},
	__renderChildren: function (){
		if(!this.props.children){
			return null;
		}else {
			return this.props.children;
		}
	},
	render: function(){
		return (
			<div className="rt-scrollable">
				{this.__renderChildren()}
			</div>
		);
	}
});
