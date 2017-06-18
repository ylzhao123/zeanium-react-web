var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('./Modal');
var ButtonGroup = require('./ButtonGroup');

var Alert = React.createClass({
	displayName: 'Alert',
	getInitialState: function getInitialState() {
		return {
			active: this.props.active || false,
			className: '',
			onConfirm: null,
			onCancle: null
		};
	},
	__onBtnsClick: function __onBtnsClick(props) {
		switch (props.type) {
			case 'primary':
				if ((this.state.onConfirm && this.state.onConfirm(this)) !== false) {
					Alert.close();
				}
				break;
			case 'danger':
				if ((this.state.onCancle && this.state.onCancle()) !== false) {
					Alert.close();
				}
				break;
		}
	},
	render: function render() {
		return React.createElement(
			Modal,
			{ active: this.state.active, top: this.state.top || 100, width: this.state.width },
			React.createElement(
				'div',
				{ className: zn.react.classname('rt-alert', this.state.className) },
				this.state.title && React.createElement(
					'div',
					{ className: 'rt-alert-title' },
					this.state.title
				),
				this.state.content && React.createElement(
					'div',
					{ className: 'rt-alert-content' },
					this.state.content
				),
				React.createElement(ButtonGroup, {
					className: 'rt-alert-btns rt-flex equally',
					items: [{ text: this.state.ok || '确定', type: 'primary' }, { text: this.state.cancel || '取消', type: 'danger' }],
					onClick: this.__onBtnsClick })
			)
		);
		return React.createElement(
			Modal,
			{ active: this.state.active, top: this.state.top || 100, width: this.state.width },
			React.createElement(
				'div',
				{ className: 'rt-alert ' + (this.state.className || '') },
				this.state.title && React.createElement(
					'div',
					{ className: 'rt-alert-title' },
					this.state.title
				),
				this.state.content && React.createElement(
					'div',
					{ className: 'rt-alert-content' },
					this.state.content
				),
				React.createElement(ButtonGroup, {
					className: 'rt-alert-btns rt-flex equally',
					items: [{ text: this.state.ok || '确定', type: 'primary' }, { text: this.state.cancel || '取消', type: 'danger' }],
					onClick: this.__onBtnsClick })
			)
		);
	}
});

Alert.create = function () {
	var _dom = document.createElement("div");
	_dom.className = "rt-alert-container";
	document.body.appendChild(_dom);
	return ReactDOM.render(React.createElement(Alert, null), _dom);
};

Alert._alert = Alert.create();

Alert.show = function (states) {
	return Alert._alert.setState(zn.extend({ active: true }, states)), this;
};

Alert.close = function () {
	return Alert._alert.setState({
		active: false,
		content: null,
		title: null
	}), this;
};

Alert.global = true;

module.exports = Alert;