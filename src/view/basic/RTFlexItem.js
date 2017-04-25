var React = require('react');
var RTItem = require('./RTItem');

module.exports = React.createClass({
	displayName:'RTFlexItem',
	render: function(){
		return (
			<RTItem {...this.props} className={'rt-flex-item ' + this.props.className} >
				{this.props.children}
			</RTItem>
		);
	}
});
