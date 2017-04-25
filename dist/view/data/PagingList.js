'use strict';

var React = require('react');
var DownPuller = require('../basic/DownPuller.js');
module.exports = React.createClass({
	displayName: 'PullRefreshList',
	getDefaultProps: function getDefaultProps() {
		return {
			pageIndex: 1,
			pageSize: 10,
			className: ''
		};
	},
	getInitialState: function getInitialState() {
		return {
			total: 0,
			loading: false,
			loadingMore: false,
			current: this.props.pageIndex,
			data: null
		};
	},
	componentDidMount: function componentDidMount() {
		this.props.data.extend({
			pageIndex: this.state.current,
			pageSize: this.props.pageSize
		});

		this._dataSource = Store.dataSource(this.props.data, {
			autoLoad: true,
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
		if (this.state.current > 1) {
			this.state.data = this.state.data.concat(data);
		} else {
			this.state.data = data;
		}

		this.setState({
			data: this.state.data,
			loading: false,
			loadingMore: false
		}, function () {
			this.props.onLoaded && this.props.onLoaded(data, this);
		}.bind(this));
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (nextProps.data !== this.props.data) {
			this.setState({
				data: null
			});
			this._dataSource.reset(nextProps.data);
		}
	},
	__handlePageChanged: function __handlePageChanged(newPage) {
		this.setState({ current: newPage });
		this.props.data.extend({
			pageIndex: newPage
		});
		this.props.data.refresh();
	},
	__dataHandler: function __dataHandler(data) {
		if (this.props.dataHandler) {
			return this.props.dataHandler(data);
		}
		var _count = data.result[1][0].count;
		if (this.isMounted()) {
			this.setState({
				count: _count,
				total: Math.ceil(_count / this.props.pageSize)
			});
		}

		return data.result[0];
	},
	__onItemRender: function __onItemRender(item, index) {
		var _view = this.props.itemRender && this.props.itemRender(item, index);
		if (_view === false) {
			return null;
		}
		if (!_view) {
			_view = React.createElement(
				'span',
				null,
				item.title
			);
		}

		return React.createElement(
			'li',
			{ className: 'data-list-item', key: index },
			_view
		);
	},
	__renderData: function __renderData() {
		if (this.state.data) {
			return React.createElement(
				'ul',
				{ className: 'data-list' },
				this.state.data.map(this.__onItemRender)
			);
		} else {
			return null;
		}
	},
	__renderLoading: function __renderLoading() {
		return React.createElement(UI.DataLoader, { loader: 'timer', content: '\u52A0\u8F7D\u6570\u636E\u4E2D...' });
	},
	__renderNoData: function __renderNoData() {
		return React.createElement(
			'div',
			{ className: 'rt-no-data' },
			'\u6682\u65E0\u6570\u636E'
		);
	},
	__render: function __render() {
		if (this.state.loading || !this.state.data) {
			return this.__renderLoading();
		}
		if (this.state.data.length) {
			return this.__renderData();
		} else {
			return this.__renderNoData();
		}
	},
	__onDownPullEnd: function __onDownPullEnd() {
		this.__handlePageChanged(1);
	},
	__onUpPullEnd: function __onUpPullEnd() {
		this.loadingMore();
	},
	loadingMore: function loadingMore() {
		this.state.current++;
		this.setState({
			current: this.state.current,
			loadingMore: true
		});
		this.__handlePageChanged(this.state.current);
	},
	__renderFooter: function __renderFooter() {
		var _this = this;

		if (this.state.loadingMore) {
			return React.createElement(
				'div',
				{ className: 'footer' },
				React.createElement('i', { className: 'fa fa-spinner rt-self-loading' }),
				React.createElement(
					'span',
					null,
					'\u6B63\u5728\u52A0\u8F7D\u4E2D...'
				)
			);
		}
		if (this.state.data && this.state.data.length) {
			if (this.state.current < this.state.total) {
				return React.createElement(
					'div',
					{ onClick: function onClick() {
							return _this.loadingMore();
						}, className: 'data-footer' },
					'\u70B9\u51FB\u52A0\u8F7D\u66F4\u591A \u5171 (',
					this.state.current,
					'/',
					this.state.total,
					') \u9875 ',
					this.state.count,
					' \u6761'
				);
			} else {
				return React.createElement(
					'div',
					{ className: 'data-footer' },
					'\u771F\u6CA1\u6570\u636E\u4E86!!! \u5171 (',
					this.state.current,
					'/',
					this.state.total,
					') \u9875 ',
					this.state.count,
					' \u6761'
				);
			}
		}
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: "rt-paging-list " + this.props.className },
			this.__render(),
			this.__renderFooter()
		);
	}
});