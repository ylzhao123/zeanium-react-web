'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var React = require('react');
var RTItem = require('./RTItem.js');

module.exports = React.createClass({
	displayName: 'RTList',
	propTypes: {
		textKey: React.PropTypes.string,
		valueKey: React.PropTypes.string
	},
	getDefaultProps: function getDefaultProps() {
		return {
			float: 'none',
			className: '',
			autoLoad: true
		};
	},
	getInitialState: function getInitialState() {
		return {
			loading: false,
			data: []
		};
	},
	componentDidMount: function componentDidMount() {
		var _source = this.props.items || this.props.data;
		this._dataSource = Store.dataSource(_source, {
			autoLoad: this.props.autoLoad,
			onExec: function () {
				var _result = this.props.onLoading && this.props.onLoading();
				if (_result !== false && this.isMounted()) {
					this.setState({
						loading: true
					});
				}
			}.bind(this),
			onSuccess: function (data) {
				this.__onDataLoaded(this.__dataHandler(data));
				this.props.onData && this.props.onData(data);
			}.bind(this)
		});
	},
	__dataHandler: function __dataHandler(data) {
		if (this.props.dataHandler) {
			return this.props.dataHandler(data);
		}

		return data.result || data;
	},
	__onDataLoaded: function __onDataLoaded(data) {
		if (!this.isMounted()) {
			return false;
		}
		if (data.length == undefined) {
			var temp = [];
			for (var key in data) {
				temp.push(data[key]);
			}
			data = temp;
		}

		this.state.data = data;
		this.setState({ data: data, loading: false });
		if (this.props.fireIndex != undefined) {
			//this.fireClick(this.props.fireIndex);
		}
		this.props.onLoaded && this.props.onLoaded(data, this);
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (nextProps.items !== this.props.items) {
			this._dataSource.reset(nextProps.items);
		}
		if (nextProps.data !== this.props.data) {
			this._dataSource.reset(nextProps.data);
		}
	},
	request: function request(data, argv) {
		this._dataSource.reset(data, argv);
	},
	filter: function filter(handler) {
		var _data = [];
		this.state.data.forEach(function (item, index, array) {
			if (handler(item, index, array) !== false) {
				_data.push(item);
			}
		});

		this.setState({ data: _data });
	},
	refresh: function refresh() {
		this._dataSource.refresh();
	},
	fireClick: function fireClick(index) {
		if (!this.state.data.length || index === undefined) {
			return;
		}
		this.__onItemClick(this.state.data[index], index);
	},
	__onItemClick: function __onItemClick(item, index) {
		item.onClick && item.onClick(item, index);
		this.props.onClick && this.props.onClick(item, index);
	},
	__itemRender: function __itemRender(item, index) {
		var _this = this;

		var _content = null,
		    _temp = {};
		if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) !== 'object') {
			_temp[this.props.textKey] = _temp[this.props.valueKey] = item;
			this.state.data[index] = item = _temp;
		}
		if (item && (typeof item === 'undefined' ? 'undefined' : _typeof(item)) == 'object') {
			item._index = index;
		}

		var _temp = this.props.onEachItem && this.props.onEachItem(item, this);

		if (_temp === false) {
			return null;
		}
		if (this.props.itemRender) {
			_content = this.props.itemRender(item, index, this);
		}

		if (!_content) {
			_content = React.createElement(
				RTItem,
				_extends({}, item, {
					onClick: function onClick(self, event) {
						return _this.__onItemClick(item, index, self, event);
					} }),
				React.createElement(
					'span',
					null,
					this.getItemText(item)
				)
			);
		}

		return React.createElement(
			'li',
			{ key: index },
			_content
		);
	},
	getItemText: function getItemText(item) {
		return item[this.props.textKey];
	},
	getItemValue: function getItemValue() {
		return item[this.props.valueKey];
	},
	render: function render() {
		if (this.state.loading) {
			return React.createElement('div', { 'data-loader': 'arrow-circle', style: { margin: '0 auto', borderColor: '#2c89e8', marginTop: 10 } });
		}
		if (!this.state.data.length) {
			var _view = null;
			if (this.props.emptyView) {
				_view = React.createElement(
					'div',
					{ className: 'rt-empty-view' },
					React.createElement(
						'span',
						null,
						'\u4EB2, \u6682\u65E0\u6570\u636E!'
					)
				);
			}

			return _view;
		}
		return React.createElement(
			'ul',
			_extends({ style: this.props.style, className: 'rt-list ' + this.props.className, 'data-float': this.props.float }, this.props.attrs),
			this.state.data && this.state.data.map && this.state.data.map(this.__itemRender)
		);
	}
});