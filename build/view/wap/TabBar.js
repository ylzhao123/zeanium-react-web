var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var TabBarItem = React.createClass({
	displayName: 'TabBarItem',
	getDefaultProps: function getDefaultProps() {
		return {
			icon: '',
			title: '',
			selected: false
		};
	},
	__onClick: function __onClick() {
		this.props.onClick && this.props.onClick();
	},
	render: function render() {
		return React.createElement(
			'li',
			{ className: this.props.selected ? 'curr' : '', onClick: this.__onClick },
			React.createElement(
				'div',
				null,
				React.createElement('i', { className: 'icon fa ' + this.props.icon })
			),
			React.createElement(
				'div',
				null,
				React.createElement(
					'span',
					{ className: 'title' },
					this.props.title
				)
			)
		);
	}
});

module.exports = React.createClass({
	displayName: 'TabBar',
	getDefaultProps: function getDefaultProps() {
		return {
			items: [],
			index: 0
		};
	},
	getInitialState: function getInitialState() {
		return {
			index: null
		};
	},
	componentDidMount: function componentDidMount() {
		this.__onClick(this.props.items[this.props.index]);
	},
	__onClick: function __onClick(item) {
		if (item) {
			this.setState({
				index: item.index
			});
			this.props.onClick && this.props.onClick(item);
		}
	},

	render: function render() {
		return React.createElement(
			'ul',
			{ className: zn.react.classname('rt-tab-bar') },
			this.props.items.map(function (item, index) {
				var _this = this;

				item.index = index;
				item.selected = this.state.index === index;
				return React.createElement(TabBarItem, _extends({}, item, { key: index, onClick: function onClick() {
						return _this.__onClick(item);
					} }));
			}.bind(this))
		);
	}
});