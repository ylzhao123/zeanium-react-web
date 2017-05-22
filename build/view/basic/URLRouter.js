var React = require('react');
var ErrorPage = require('../page/ErrorPage');

module.exports = React.createClass({
	displayName: 'URLRouter',
	getInitialState: function getInitialState() {
		return {
			view: null,
			argv: null
		};
	},
	componentDidMount: function componentDidMount() {
		var _self = this,
		    _view = null,
		    _routers = this.props.routers || {},
		    _mapping = RouterMapping.create(_routers),
		    _router = new RestfulRouter();

		Session.setHome(this.props.home);
		Session.setGlobalSearch(this.props.search);

		_router.error(function (req) {
			if (_self.props.home && !req.path) {
				Session.jump(_self.props.home);
			} else {
				_self.setState({
					view: ErrorPage,
					argv: {
						request: req
					}
				});
			}
		});
		_mapping.each(function (path, mapping) {
			(function (path, mapping) {
				_router.get(path, function (req) {
					mapping.request = req;
					_view = mapping.mappings.index || mapping.view;
					if (_self.state.view === _view) {
						if (mapping.mapping == '{*}') {
							return;
						}
						_self.setState({
							view: _view,
							argv: mapping
						});
					} else {
						_self.setState({
							view: _view,
							argv: mapping
						});
					}
				});
			})(path, mapping);
		});

		_router.fireHashChange();
		this._router = _router;
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'rt-url-router', style: { overflow: 'hidden' } },
			this.state.view && React.createElement(this.state.view, this.state.argv),
			this.props.children
		);
	}
});