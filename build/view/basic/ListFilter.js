var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
	displayName: 'ListFilter',
	getDefaultProps: function getDefaultProps() {
		return {
			className: '',
			items: []
		};
	},
	getInitialState: function getInitialState() {
		return {
			currIndex: null,
			currView: null,
			active: false,
			hang: false
		};
	},
	componentDidMount: function componentDidMount() {
		this._dom = ReactDOM.findDOMNode(this);
		window.addEventListener('scroll', this.__onScroll, false);
	},
	__onScroll: function __onScroll(event) {
		var _top = this._dom.getBoundingClientRect().top,
		    _scrollTop = window.document.body.scrollTop;
		if (this._scrollTop) {
			if (Math.abs(this._scrollTop - _scrollTop) < 10) {
				this._scrollTop = null;
				this.setState({ hang: false });
			}
		} else {
			if (_top < 1) {
				this._scrollTop = _scrollTop;
				this.setState({ hang: true });
			}
		}
	},
	fireClick: function fireClick(index) {
		var _item = this.props.items[index];
		if (_item) {
			this.setState({
				currIndex: index,
				currView: _item.view,
				active: true
			});
		}
	},
	close: function close() {
		this.setState({
			currView: null,
			active: false,
			hang: false
		});
	},
	render: function render() {
		var _this2 = this;

		return React.createElement(
			'div',
			{
				'data-active': this.state.active,
				'data-hang': this.state.hang,
				className: 'rt-list-filter ' + this.props.className,
				style: zn.extend({ height: this.props.height }, this.props.style) },
			React.createElement('div', { className: 'filter-background' }),
			React.createElement(
				'div',
				{ className: 'filter-header' },
				this.props.items.map(function (item, index) {
					var _this = this;

					return React.createElement(
						'div',
						{ onClick: function onClick() {
								return _this.fireClick(index);
							}, className: "filter-item " + (this.state.currIndex == index ? 'curr' : ''), key: index },
						React.createElement(
							'span',
							null,
							item.title
						),
						React.createElement('i', { className: 'fa fa-angle-down' })
					);
				}.bind(this))
			),
			React.createElement(
				'div',
				{ className: 'filter-body', onClick: function onClick() {
						return _this2.setState({ active: false, currView: null, currIndex: null });
					} },
				React.createElement(
					'div',
					{ className: 'filter-view' },
					this.state.currView
				)
			)
		);
	}
});