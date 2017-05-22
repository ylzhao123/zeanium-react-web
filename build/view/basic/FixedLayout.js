var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Layout = require('./Layout');

module.exports = React.createClass({
	displayName: 'FixedLayout',
	getDefaultProps: function getDefaultProps() {
		return {
			begin: 0,
			end: 0,
			hStyle: {},
			bStyle: {},
			fStyle: {},
			className: '',
			direction: 'h',
			unit: 'px'
		};
	},
	__getStyles: function __getStyles() {
		var props = this.props,
		    _unit = props.unit,
		    _begin = props.begin,
		    _end = props.end,
		    _header = {},
		    _body = {},
		    _footer = {};

		if (props.direction == 'h') {
			_header = {
				width: _begin + _unit
			};
			_body = {
				left: _begin + _unit,
				right: _end + _unit
			};
			_footer = {
				width: _end + _unit
			};
		} else {
			_header = {
				height: _begin + _unit
			};
			_body = {
				top: _begin + _unit,
				bottom: _end + _unit
			};
			_footer = {
				height: _end + _unit
			};
		}

		return {
			header: zn.extend(_header, props.hStyle),
			body: zn.extend(_body, props.bStyle),
			footer: zn.extend(_footer, props.fStyle)
		};
	},
	render: function render() {
		var _children = this.props.children;
		if (_children && _children.length === undefined) {
			_children = [_children];
		}
		_children = _children.slice(0);
		var _styles = this.__getStyles(); //h, v
		return React.createElement(
			Layout,
			_extends({}, this.props, { className: "rt-fixed-layout " + this.props.className }),
			React.createElement(
				Layout.Header,
				{ style: _styles.header },
				_children[0]
			),
			React.createElement(
				Layout.Body,
				{ style: _styles.body },
				_children[1]
			),
			React.createElement(
				Layout.Footer,
				{ style: _styles.footer },
				_children[2]
			)
		);
	}
});