var React = require('react');
var Dropdown = require('./Dropdown');
var ListView = require('../data/ListView');

module.exports = React.createClass({
	displayName:'DropdownList',
	getDefaultProps: function (){
		return {
			className: '',
			autoFixPosition: true,
			triggerEvent: 'click',
			popoverWidth: 100
		}
	},
	render: function(){
		return (
			<Dropdown {...this.props} className={"rt-dropdown-list " + this.props.className} >
				<div className="dropdown-list-trigger">
					{this.props.children}
				</div>
				<ListView {...this.props} onItemClick={this.__onListItemClick} />
			</Dropdown>
		);
	}
});
