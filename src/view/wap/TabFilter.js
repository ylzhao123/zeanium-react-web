require('./TabFilter.less');
var React = require('react');
var Dropdown = require('../basic/Dropdown');
var ListView = require('../data/ListView.js');

module.exports = React.createClass({
	displayName:'TabFilter',
	getDefaultProps: function (){
		return {

		}
	},
	getInitialState: function(){
		return {

		}
	},
	componentDidMount: function (){

	},
	render: function(){
		return (
			<div className="rt-tab-filter">
				<div className="keys">

				</div>
				<div className="value">

				</div>
			</div>
		);
	}
});
