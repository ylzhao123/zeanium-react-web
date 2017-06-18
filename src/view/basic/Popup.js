var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('./Modal');

var Popup = React.createClass({
	displayName:'Popup',
	getInitialState: function(){
		return {
			active: this.props.active || false,
			title: null,
			content: null
		}
	},
	close: function (){
		this.setState({
			active: false,
			title: null,
			content: null
		}, function (){
			this.state.onClose && this.state.onClose();
		}.bind(this))
	},
	render: function(){
		return (
			<Modal active={this.state.active} top={this.state.top||100} width={this.state.width}>
				<div className={'rt-popup ' + (this.state.className||'')} >
					<i className="popup-close rt-hover-self-loading fa fa-remove" onClick={this.close} />
					{this.state.title && <div className="popup-title">{this.state.title}</div>}
					{this.state.content && <div className="popup-content">{this.state.content}</div>}
				</div>
			</Modal>
		);
	}
});

Popup.create = function (){
	var _dom = document.createElement("div");
	_dom.className = "rt-popup-container";
	document.body.appendChild(_dom);
	return ReactDOM.render(<Popup />, _dom);
}

Popup._popup = Popup.create();

Popup.dialog = function (states) {
	return Popup._popup.setState(zn.extend({ active: true },states)), this;
}

Popup.confirm = function (argv){
	Alert.show(zn.extend({
		width: 360,
		title: '警告'
	}, argv));
}

Popup.message = function (message){
	Toast[message.type](message.content);
}

Popup.close = function (){
	return Popup._popup.close(), this;
}

Popup.global = true;

module.exports = window.Popup = Popup;
