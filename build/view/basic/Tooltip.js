var React = require('react');
var ReactDOM = require('react-dom');

var Tooltip = React.createClass({
	displayName: 'Tooltip',
	getDefaultProps: function getDefaultProps() {
		return {
			active: false,
			hiddenHeight: 5
		};
	},
	getInitialState: function getInitialState() {
		return {
			className: '',
			active: this.props.active,
			content: this.props.content,
			popoverWidth: null,
			popoverHeight: null
		};
	},
	fixPosition: function fixPosition(target) {
		var _popover = ReactDOM.findDOMNode(this);
		var _t = zn.dom.getPosition(target),
		    _popoverWidth = this.state.popoverWidth || _t.width,
		    _popoverHeight = this.state.popoverHeight || _popover.offsetHeight,
		    _left = null,
		    _top = null;
		if (_popoverHeight < this.props.hiddenHeight) {
			this.props.onHidden && this.props.onHidden();
			return;
		}

		if (_t.x + _popoverWidth > document.body.scrollWidth) {
			_left = _t.width - _popoverWidth;
		} else {
			_left = _t.x;
		}

		if (_t.y + _popoverHeight > document.body.scrollHeight) {
			_top = _t.y - _popoverHeight - 3;
		} else {
			_top = _t.y + _t.height + 3;
		}

		_popover.style.top = _top + 'px';
		_popover.style.left = _left + 'px';
		_popover.style.width = _popoverWidth + 'px';
		if (_popover.offsetHeight != _popoverHeight) {
			_popover.style.height = _popoverHeight + 'px';
		}
	},
	render: function render() {
		//<i className="rt-popup-arrow fa fa-close" />
		return React.createElement(
			'div',
			{ className: 'rt-tooltip ' + this.state.className, 'data-active': this.state.active, style: this.props.style, onClick: function onClick(event) {
					return event.stopPropagation();
				} },
			this.state.content
		);
	}
});

Tooltip.create = function () {
	var _dom = document.createElement("div");
	document.body.appendChild(_dom);
	return ReactDOM.render(React.createElement(Tooltip, null), _dom);
};

Tooltip._tooltip = Tooltip.create();

Tooltip.render = function (children, target, popoverWidth) {
	return Tooltip._tooltip.setState({
		active: true,
		content: children,
		popoverWidth: popoverWidth
	}, function () {
		Popover._tooltip.fixPosition(target);
	}), this;
};

Tooltip.close = function () {
	return Tooltip._tooltip.setState({
		active: false
	}), this;
};

Tooltip.global = true;
window.addEventListener('click', function () {
	return Tooltip.close();
}, false);

module.exports = window.Tooltip = Tooltip;