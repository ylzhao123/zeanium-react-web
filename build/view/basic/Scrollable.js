var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
	displayName: 'Scrollable',
	getDefaultProps: function getDefaultProps() {
		return {
			className: ''
		};
	},
	getInitialState: function getInitialState() {
		return {
			loading: false
		};
	},
	componentDidMount: function componentDidMount() {
		this._scroll = new IScroll(ReactDOM.findDOMNode(this), {
			probeType: 3,
			useTransition: true,
			hScrollbar: false,
			vScrollbar: false
		});
	},
	__renderChildren: function __renderChildren() {
		if (!this.props.children) {
			return null;
		} else {
			return this.props.children;
		}
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'rt-scrollable' },
			this.__renderChildren()
		);
	}
});