var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('./Modal');

var Popup = React.createClass({
	displayName: 'Popup',
	getInitialState: function getInitialState() {
		return {
			active: this.props.active || false,
			title: null,
			content: null
		};
	},
	close: function close() {
		this.setState({
			active: false,
			title: null,
			content: null
		}, function () {
			this.state.onClose && this.state.onClose();
		}.bind(this));
	},
	render: function render() {
		return React.createElement(
			Modal,
			{ active: this.state.active, top: this.state.top || 100, width: this.state.width },
			React.createElement(
				'div',
				{ className: 'rt-popup ' + (this.state.className || '') },
				React.createElement('i', { className: 'popup-close rt-hover-self-loading fa fa-remove', onClick: this.close }),
				this.state.title && React.createElement(
					'div',
					{ className: 'popup-title' },
					this.state.title
				),
				this.state.content && React.createElement(
					'div',
					{ className: 'popup-content' },
					this.state.content
				)
			)
		);
	}
});

Popup.create = function () {
	var _dom = document.createElement("div");
	_dom.className = "rt-popup-container";
	document.body.appendChild(_dom);
	return ReactDOM.render(React.createElement(Popup, null), _dom);
};

Popup._popup = Popup.create();

Popup.dialog = function (states) {
	return Popup._popup.setState(zn.extend({ active: true }, states)), this;
};

Popup.confirm = function (argv) {
	Alert.show(zn.extend({
		width: 360,
		title: '警告'
	}, argv));
};

Popup.message = function (message) {
	Toast[message.type](message.content);
};

Popup.close = function () {
	return Popup._popup.close(), this;
};

Popup.global = true;

module.exports = window.Popup = Popup;