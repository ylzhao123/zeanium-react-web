require('./Toast.less');
var React = require('react');
var ReactDOM = require('react-dom');

var Toast = React.createClass({
	displayName:'Toast',
	getDefaultProps: function (){
		return {
			type: '',
			active: false
		}
	},
	getInitialState: function(){
		return {
			active: this.props.active,
			content: this.props.content,
			type: this.props.type
		}
	},
	render: function(){
		return (
			<div className={'rt-toast ' + this.state.type} data-active={this.state.active}>
				<i className="toast-close rt-hover-self-loading fa fa-close" onClick={()=>this.setState({ active: false })} />
				{this.state.content}
			</div>
		);
	}
});

Toast.create = function (){
	var _dom = document.createElement("div");
	document.body.appendChild(_dom);
	return ReactDOM.render(<Toast />, _dom);
}

Toast._toast = Toast.create();

Toast.type = function (argv){
	var _argv = argv || {};
	Toast._toast.setState({
		active: true,
		title: _argv.title,
		type: _argv.type,
		content: _argv.content
	}, function (){
		window.setTimeout(()=>Toast._toast.setState({ active: false }), _argv.delay || 3000);
	});
}

Toast.success = function (){
	Toast.type({
		type: 'success',
		content: arguments[0],
		title: arguments[1],
		delay: arguments[2]
	});
}

Toast.warning = function (){
	Toast.type({
		type: 'warning',
		content: arguments[0],
		title: arguments[1],
		delay: arguments[2]
	});
}

Toast.error = function (){
	Toast.type({
		type: 'danger',
		content: arguments[0],
		title: arguments[1],
		delay: arguments[2]
	});
}

Toast.info = function (){
	Toast.type({
		type: 'info',
		content: arguments[0],
		title: arguments[1],
		delay: arguments[2]
	});
}

Toast.global = true;

module.exports = Toast;
