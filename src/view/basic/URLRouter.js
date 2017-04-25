var React = require('react');
var ErrorPage = require('../page/ErrorPage');

module.exports = React.createClass({
	displayName:'URLRouter',
	getInitialState:function(){
		return {
			view: null,
			argv: null
		}
	},
	componentDidMount:function(){
		var _self = this,
			_view = null,
			_routers = this.props.routers || {},
			_mapping = window.RouterMapping.create(_routers);

		Session.setHome(this.props.home);
		Session.setGlobalSearch(this.props.search);
		this._router = new RestfulRouter(function (router){
			router.error(function (req){
				if(_self.props.home && !req.path){
					Session.jump(_self.props.home);
				}else {
					_self.setState({
						view: ErrorPage,
						argv: {
							request: req
						}
					});
				}
			});
			_mapping.each(function (path, mapping){
				(function (path, mapping) {
					router.get(path, function(req){
						mapping.request = req;
						_view = mapping.mappings.index || mapping.view;
						if(_self.state.view === _view){
							if(mapping.mapping=='{*}'){ return; }
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
		});
	},
	render: function(){
		return (
			<div className="rt-url-router" style={{ overflow: 'hidden' }}>
				{this.state.view && <this.state.view {...this.state.argv} />}
				{this.props.children}
			</div>
		);
	}
});
