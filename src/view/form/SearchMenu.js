var React = require('react');
var Dropdown = require('../basic/Dropdown');
var FixedLayout = require('../basic/FixedLayout');
var ListView = require('../data/ListView');

module.exports = React.createClass({
	displayName: 'SearchMenu',
	getDefaultProps: function (){
		return {
			className: '',
			autoFixPosition: true,
			triggerEvent: 'click',
			popoverWidth: null
		}
	},
	getInitialState: function (){
		return {
			value: this.props.value||'',
			text: this.props.text||''
		}
	},
	getValue: function () {
		return this.state.value;
	},
	setValue: function (value, text) {
		this.setState({
			value: value,
			text: text
		}, function (){
			this.props.onChange && this.props.onChange(value, text, this);
		});
	},
	__textRender: function (){
		return this.state.text||this.props.placeholder;
	},
	__onListItemClick: function (value, rtlistitem, rtlist, item){
		this.setValue(value, item[rtlist.props.textKey]);
		Popover.closeAll();
	},
	__popoverRender: function (){
		return <div>
			<div></div>
			<ListView {...this.props}
				className="rt-list-view-popover"
				value={this.state.value}
				onItemClick={this.__onListItemClick} />
		</div>;
	},
	render: function(){
		return (
			<Dropdown {...this.props} popoverRender={this.__popoverRender} className={"rt-search-menu " + this.props.className} >
				<div className="menu-view">
					<div className className="text">{this.__textRender()}</div>
					<span className="trigger"><i className="fa fa-angle-down" /></span>
				</div>
			</Dropdown>
		);
	}
});
