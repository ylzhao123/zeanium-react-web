require('./Modal.less');
var React = require('react');

var Modal = React.createClass({
	displayName:'Modal',
	getDefaultProps: function (){
		return {
			className: '',
			active: true
		}
	},
	getInitialState: function(){
		return {

		}
	},
	__getSize: function (){
		var _width = this.props.width;
		if(_width){
			return {
				width: _width
			}
		}else {
			return {
				width: '80%'
			}
		}
	},
	render: function(){
		return (
			<div className={'rt-modal ' + this.props.className} data-active={this.props.active}>
				{
					/*<div className="rt-modal-mask"></div>*/
				}
				<div className="rt-modal-view" style={zn.extend({ top: this.props.top },this.__getSize(), this.props.style)}>{this.props.children}</div>
			</div>
		);
	}
});


module.exports = Modal;
