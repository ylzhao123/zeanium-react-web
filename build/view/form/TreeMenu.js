var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var ListView = require('../basic/RTList');
var RTItem = require('../basic/RTItem');
var Checkbox = require('./Checkbox');

var TreeMenuItem = React.createClass({
	displayName: 'TreeMenuItem',
	getDefaultProps: function getDefaultProps() {
		return {
			checked: false
		};
	},
	getInitialState: function getInitialState() {
		return {
			active: this.props.active || this.props.parent.props.activeAll,
			selected: false,
			checked: false,
			loading: false
		};
	},
	componentDidMount: function componentDidMount() {
		//this.__onCheckboxChange(this.props.checked);
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (nextProps.checked != this.props.checked) {
			this.__onCheckboxChange(nextProps.checked);
		}
	},
	active: function active(_active) {
		this.setState({
			active: _active
		});
	},
	renderIcon: function renderIcon() {
		return React.createElement(
			'div',
			{ className: 'seps', style: { width: (this.props.parent.props.sep + 1) * 16 } },
			this.__isTreeRow() && React.createElement('i', { className: 'icon fa ' + (!!this.state.active ? 'fa-caret-down' : 'fa-caret-right'), onClick: this.__onIconClick })
		);
	},
	__onIconClick: function __onIconClick(event) {
		event.stopPropagation();
		this.active(!this.state.active);
	},
	__isTreeRow: function __isTreeRow() {
		var _return = this.props.isTreeRow && this.props.isTreeRow(this.props, this);
		if (_return === undefined) {
			_return = !!this.props.data.sons;
		}
		return _return;
	},
	__onClick: function __onClick(event) {
		if (this.state.loading) {
			return;
		}
		this.setState({ selected: true });
		this.props.onClick(this, event);
	},
	__onCheckboxChange: function __onCheckboxChange(value) {
		this.setState({ checked: value });
		this.props.onCheckboxChange && this.props.onCheckboxChange(value, this.props.data);
	},
	renderContent: function renderContent() {
		var _this = this;

		var _content = null;
		if (this.props.parent.props.itemContentRender) {
			_content = this.props.parent.props.itemContentRender(this.props);
		}
		if (!_content) {
			_content = this.props.data[this.props.parent.props.textKey];
		}

		if (this.props.parent.props.enableCheckbox) {
			_content = React.createElement(
				'div',
				{ className: 'content' },
				React.createElement(Checkbox, { checked: this.props.checked, disabled: this.props.parent.props.disabled, onChange: function onChange(event, value) {
						return _this.__onCheckboxChange(value);
					} }),
				_content
			);
		}

		return _content;
	},
	__renderChildren: function __renderChildren() {
		if (this.__isTreeRow() && this.state.active) {
			var _data = this.props.parent.props.data.copyAndExt({ where: { pid: this.props.data.id } });
			var _sep = this.props.parent.props.sep;
			_sep++;
			return React.createElement(TreeMenu, _extends({}, this.props.parent.props, { checked: this.props.parent.props.cascade ? this.state.checked : undefined, parentTreeMenu: this.props.parent, sep: _sep, autoLoad: true, data: _data }));
		}
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'tree-row' },
			React.createElement(
				'div',
				{ className: "row-title " + (this.state.selected ? 'curr' : ''), onClick: this.__onClick },
				this.renderIcon(),
				this.renderContent()
			),
			this.__renderChildren()
		);
	}
});

var TreeMenu = React.createClass({
	getDefaultProps: function getDefaultProps() {
		return {
			sep: 0,
			isTreeRow: null,
			autoLoad: true,
			textKey: 'title',
			valueKey: 'id',
			className: 'c-tree',
			checked: false,
			disabled: false,
			enableCheckbox: false
		};
	},
	displayName: 'TreeMenu',
	getInitialState: function getInitialState() {
		return {
			currIndex: null,
			data: null,
			value: this.props.value || ','
		};
	},
	setValue: function setValue(value) {
		return this.setState({
			value: value
		}), this;
	},
	getValue: function getValue() {
		return this.state.value;
	},
	__onItemClick: function __onItemClick(item, event) {
		if (this._selectedItem === item) {
			return;
		}
		if (this.props.parentTreeMenu) {
			this.props.parentTreeMenu.__onItemClick(item, event);
		} else {
			if (this._selectedItem && this._selectedItem.isMounted()) {
				this._selectedItem.setState({ selected: false });
			}
			this._selectedItem = item;
			this.props.onClick && this.props.onClick(item, event);
		}
	},
	__onItemCheckboxChange: function __onItemCheckboxChange(value, data) {
		if (this.props.parentTreeMenu) {
			this.props.parentTreeMenu.__onItemCheckboxChange(value, data);
		} else {
			if (!data) {
				return;
			}
			var _value = this.state.value || ',',
			    _itemValue = data[this.props.valueKey] + ',';
			if (value) {
				if (_value.indexOf(',' + _itemValue) == -1) {
					_value = _value + _itemValue;
				}
			} else {
				_value = _value.replace(new RegExp(',' + _itemValue, 'gi'), ',');
			}
			//console.log('value: ', _value, 'itemValue: ', _itemValue);
			this.state.value = _value;
			this.setState({
				value: _value
			});
			this.props.onItemCheckboxChange && this.props.onItemCheckboxChange(_value, value, data);
		}
	},
	__itemRender: function __itemRender(item, index) {
		var _content = null;
		if (typeof item == 'string') {
			item = { text: item };
		}
		_content = this.props.itemRender && this.props.itemRender(item, index);
		if (!_content) {
			var _checked = this.props.checked,
			    _itemValue = item[this.props.valueKey] + ',';
			if (!_checked) {
				_checked = this.state.value.indexOf(',' + _itemValue) != -1;
			}
			_content = React.createElement(TreeMenuItem, { key: index, checked: _checked, parent: this, data: item, onClick: this.__onItemClick, onCheckboxChange: this.__onItemCheckboxChange });
		}

		return _content;
	},
	refresh: function refresh() {
		this.refs.listview.refresh();
	},
	render: function render() {
		return React.createElement(ListView, _extends({}, this.props, { ref: 'listview', onClick: null, itemRender: this.__itemRender, onLoaded: this.__onLoaded }));
	}
});

module.exports = TreeMenu;