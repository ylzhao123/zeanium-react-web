'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Toast = React.createClass({
	displayName: 'Toast',
	getDefaultProps: function getDefaultProps() {
		return {
			type: '',
			active: false
		};
	},
	getInitialState: function getInitialState() {
		return {
			active: this.props.active,
			content: this.props.content,
			type: this.props.type
		};
	},
	render: function render() {
		var _this = this;

		return React.createElement(
			'div',
			{ className: 'rt-toast ' + this.state.type, 'data-active': this.state.active },
			React.createElement('i', { className: 'toast-close rt-hover-self-loading fa fa-close', onClick: function onClick() {
					return _this.setState({ active: false });
				} }),
			this.state.content
		);
	}
});

Toast.create = function () {
	var _dom = document.createElement("div");
	document.body.appendChild(_dom);
	return ReactDOM.render(React.createElement(Toast, null), _dom);
};

Toast._toast = Toast.create();

Toast.type = function (argv) {
	var _argv = argv || {};
	Toast._toast.setState({
		active: true,
		title: _argv.title,
		type: _argv.type,
		content: _argv.content
	}, function () {
		window.setTimeout(function () {
			return Toast._toast.setState({ active: false });
		}, _argv.delay || 3000);
	});
};

Toast.success = function () {
	Toast.type({
		type: 'success',
		content: arguments[0],
		title: arguments[1],
		delay: arguments[2]
	});
};

Toast.warning = function () {
	Toast.type({
		type: 'warning',
		content: arguments[0],
		title: arguments[1],
		delay: arguments[2]
	});
};

Toast.error = function () {
	Toast.type({
		type: 'danger',
		content: arguments[0],
		title: arguments[1],
		delay: arguments[2]
	});
};

Toast.info = function () {
	Toast.type({
		type: 'info',
		content: arguments[0],
		title: arguments[1],
		delay: arguments[2]
	});
};

Toast.global = true;

module.exports = Toast;