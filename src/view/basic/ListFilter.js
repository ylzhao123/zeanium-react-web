var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
	displayName:'ListFilter',
	getDefaultProps: function (){
		return {
			className: '',
			items: []
		};
	},
	getInitialState: function (){
		return {
			currIndex: null,
			currView: null,
			active: false,
			hang: false
		};
	},
	componentDidMount: function (){
		this._dom = ReactDOM.findDOMNode(this);
		window.addEventListener('scroll', this.__onScroll, false);
	},
	__onScroll: function (event){
		var _top = this._dom.getBoundingClientRect().top,
			_scrollTop = window.document.body.scrollTop;
		if(this._scrollTop){
			if(Math.abs(this._scrollTop - _scrollTop) < 10){
				this._scrollTop = null;
				this.setState({ hang: false });
			}
		}else {
			if(_top<1){
				this._scrollTop = _scrollTop;
				this.setState({ hang: true });
			}
		}
	},
	fireClick: function (index){
		var _item = this.props.items[index];
		if(_item){
			this.setState({
				currIndex: index,
				currView: _item.view,
				active: true
			});
		}
	},
	close: function (){
		this.setState({
			currView: null,
			active: false,
			hang: false
		});
	},
	render: function(){
		return (
			<div
				data-active={this.state.active}
				data-hang={this.state.hang}
				className={'rt-list-filter ' + this.props.className}
				style={zn.extend({ height: this.props.height },this.props.style)}>
				<div className="filter-background"></div>
				<div className="filter-header">
					{
						this.props.items.map(function (item, index){
							return <div onClick={()=>this.fireClick(index)} className={"filter-item "+(this.state.currIndex==index?'curr':'')} key={index}>
								<span>{item.title}</span>
								<i className="fa fa-angle-down" />
							</div>;
						}.bind(this))
					}
				</div>
				<div className="filter-body" onClick={()=>this.setState({ active: false, currView: null, currIndex: null })}>
					<div className="filter-view">
						{this.state.currView}
					</div>
				</div>
			</div>
		);
	}
});
