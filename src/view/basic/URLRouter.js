var React = require('react');
var ErrorPage = require('../page/ErrorPage');

var Router = React.createClass({
	displayName: 'Router',
	getInitialState: function (){
		return {

		};
	},
	componentDidMount: function (){

	},
	pop: function (){

	},
	push: function (){

	},
	render: function () {
		return (
			<div className={"rt-router "}>
				{this.props.children}
			</div>
		);
	}
});

var URLRouter = React.createClass({
	displayName:'URLRouter',
	getDefaultProps: function (){
		return {
			animate: false
		}
	},
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
			_mapping = RouterMapping.create(_routers),
			_router = new RestfulRouter();

		this._historys = [];
		Session.setHome(this.props.home);
		Session.setGlobalSearch(this.props.search);

		_router.error(function (req){
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
				_router.get(path, function(req){
					mapping.request = req;
					_view = mapping.mappings.index || mapping.view;
					_self._historys.push(mapping);
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

		_router.fireHashChange();
		this._router = _router;
	},
	render: function(){
		var View = null,
			routers = this.props.routers;
		if(this.props.animate){
			return (
				<div className={zn.react.classname("rt-url-router", this.props.className)} >
					<Router view={View} argv={this.state.argv} ref={path}></Router>
					<Router view={View} argv={this.state.argv} ref={path}></Router>
					<Router view={View} argv={this.state.argv} ref={path}></Router>
				</div>
			);
		}else {
			return (
				<div className={zn.react.classname("rt-url-router", this.props.className)} >
					{this.state.view && <this.state.view {...this.state.argv} />}
				</div>
			);
		}
	}
});

URLRouter.Router = Router;

module.exports = URLRouter;
