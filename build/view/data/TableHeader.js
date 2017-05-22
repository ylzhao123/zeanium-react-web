var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Checkbox = require('../form/Checkbox');
var TableFilter = require('./TableFilter');

module.exports = React.createClass({
	displayName: 'TableHeader',
	getInitialState: function getInitialState() {
		return {};
	},
	componentDidMount: function componentDidMount() {},
	__onCheckBoxChange: function __onCheckBoxChange(event, value, cb) {
		this.props.onCheckBoxChange && this.props.onCheckBoxChange(value, this, cb);
	},
	__onColClick: function __onColClick(item, index) {
		this.props.onColClick && this.props.onColClick(item, index);
	},
	__itemRender: function __itemRender(item, index) {
		var _this = this;

		var _content = this.props.headerRender && this.props.headerRender(item, index, this.props.columnSize);
		if (!_content) {
			switch (item.type) {
				case 'checkbox':
					_content = React.createElement(Checkbox, _extends({}, item, { onChange: this.__onCheckBoxChange }));
					break;
				default:
					_content = React.createElement(
						'div',
						{ onClick: function onClick() {
								return _this.__onColClick(item, index);
							} },
						React.createElement(
							'span',
							null,
							item.title || item.name
						),
						this.props.sort && React.createElement('i', { className: 'sort fa fa-arrows-v' })
					);
					break;
			}
		}

		//width={(item.width?item.width:0)}
		return React.createElement(
			'th',
			{ key: index, className: 'text-align-' + (item.textAlign || 'left') },
			_content
		);
	},
	render: function render() {
		return React.createElement(
			'thead',
			null,
			React.createElement(
				'tr',
				{ className: 'table-row thead' },
				(this.props.items || []).map(this.__itemRender)
			),
			this.props.enableFilter && React.createElement(TableFilter, this.props)
		);
	}
});