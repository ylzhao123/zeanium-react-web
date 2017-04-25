var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
	displayName: 'RichEditor',
	getDefaultProps: function (){
		return {
			className: ''
		};
	},
	componentDidMount: function (){
		this._editor = KindEditor.create(ReactDOM.findDOMNode(this), {
			autoHeightMode : true,
			afterCreate : function() {
				this.loadPlugin('autoheight');
			}
		});
		this.setValue(this.props.value);
	},
	getValue: function () {
		return this._editor.html();
	},
	setValue: function (value) {
		if(value!==undefined){
			return this._editor.html(value);
		}
	},
	render: function(){
		return (
			<textarea className={"rt-rich-editor " + this.props.className} style={this.props.style} name={this.props.name} />
		);
	}
});
