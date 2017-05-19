var React = require('react');
var ReactDOM = require('react-dom');
var Popover = require('./Popover');

var Dropdown = React.createClass({
	displayName:'Dropdown',
	getDefaultProps: function (){
		return {
			disabled: false,
			className: '',
			autoFixPosition: true,
			triggerEvent: 'click'
		}
	},
	componentDidMount: function (){
		ReactDOM.findDOMNode(this).addEventListener(this.props.triggerEvent, this.__eventHandler, false);
	},
	__eventHandler: function (event){
		if(this.props.disabled){
			return;
		}
		event.stopPropagation();
		//event.preventDefault();
		Popover.render({
			name: '_' + this.props.triggerEvent,
			content: this.__popoverContentRender(),
			popoverWidth: this.props.popoverWidth
		}, function (popover, argv){
			if(this.props.autoFixPosition){
				popover.fixPosition(this.getParent(event.target));
			}
		}.bind(this));
	},
	__popoverContentRender: function (){
		var _content = this._children[1];
		if(!_content){
			_content = this.props.popoverRender && this.props.popoverRender();
		}

		return _content;
	},
	getParent: function (target){
		if(target.classList.contains('rt-dropdown')){
			return target;
		}else {
			return this.getParent(target.parentNode);
		}
	},
	render: function(){
		var _children = this.props.children;
		if(_children&&_children.length === undefined){
			_children = [_children];
		}
		if(!_children){
			return null;
		}

		_children = _children.slice(0);
		this._children = _children;

		return (
			<div className={'rt-dropdown ' + this.props.className} style={this.props.style}>
				{_children[0]}
			</div>
		);
	}
});


module.exports = Dropdown;
