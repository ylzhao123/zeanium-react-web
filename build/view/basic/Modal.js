var React = require('react');

var Modal = React.createClass({
	displayName: 'Modal',
	getDefaultProps: function getDefaultProps() {
		return {
			className: '',
			active: true
		};
	},
	getInitialState: function getInitialState() {
		return {};
	},
	__getSize: function __getSize() {
		var _width = this.props.width;
		if (_width) {
			return {
				width: _width
			};
		} else {
			return {
				width: '80%'
			};
		}
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'rt-modal ' + this.props.className, 'data-active': this.props.active },
			React.createElement(
				'div',
				{ className: 'rt-modal-view', style: zn.extend({ top: this.props.top }, this.__getSize(), this.props.style) },
				this.props.children
			)
		);
	}
});

module.exports = Modal;