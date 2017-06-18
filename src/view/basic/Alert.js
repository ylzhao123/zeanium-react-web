var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('./Modal');
var ButtonGroup = require('./ButtonGroup');

var Alert = React.createClass({
	displayName:'Alert',
	getInitialState: function(){
		return {
			active: this.props.active || false,
			className: '',
			onConfirm: null,
			onCancle: null
		}
	},
	__onBtnsClick: function (props){
		switch (props.type) {
			case 'primary':
				if((this.state.onConfirm && this.state.onConfirm(this))!==false){
					Alert.close();
				}
				break;
			case 'danger':
				if((this.state.onCancle && this.state.onCancle())!==false){
					Alert.close();
				}
				break;
		}
	},
	render: function(){
		return (
			<Modal active={this.state.active} top={this.state.top||100} width={this.state.width}>
				<div className={zn.react.classname('rt-alert', this.state.className)} >
					{this.state.title && <div className="rt-alert-title">{this.state.title}</div>}
					{this.state.content && <div className="rt-alert-content">{this.state.content}</div>}
					<ButtonGroup
						className="rt-alert-btns rt-flex equally"
						items={[
							{text: this.state.ok || '确定', type: 'primary'},
							{text: this.state.cancel || '取消', type: 'danger'}
						]}
						onClick={this.__onBtnsClick} />
					{
						/*
						<div className="rt-alert-loading">
							<div>Loading</div>
						</div>
						*/
					}
				</div>
			</Modal>
		);
		return (
			<Modal active={this.state.active} top={this.state.top||100} width={this.state.width}>
				<div className={'rt-alert ' + (this.state.className||'')} >
					{this.state.title && <div className="rt-alert-title">{this.state.title}</div>}
					{this.state.content && <div className="rt-alert-content">{this.state.content}</div>}
					<ButtonGroup
						className="rt-alert-btns rt-flex equally"
						items={[
							{text: this.state.ok || '确定', type: 'primary'},
							{text: this.state.cancel || '取消', type: 'danger'}
						]}
						onClick={this.__onBtnsClick} />
					{
						/*
						<div className="rt-alert-loading">
							<div>Loading</div>
						</div>
						*/
					}
				</div>
			</Modal>
		);
	}
});

Alert.create = function (){
	var _dom = document.createElement("div");
	_dom.className = "rt-alert-container";
	document.body.appendChild(_dom);
	return ReactDOM.render(<Alert />, _dom);
}

Alert._alert = Alert.create();


Alert.show = function (states) {
	return Alert._alert.setState(zn.extend({ active: true },states)), this;
}

Alert.close = function (){
	return Alert._alert.setState({
		active: false,
		content: null,
		title: null
	}), this;
}

Alert.global = true;

module.exports = Alert;
