var React = require('react');
var TableHeader = require('./TableHeader');
var TableBody = require('./TableBody');
var TableColgroup = require('./TableColgroup');

module.exports = React.createClass({
	displayName:'Table',
	getDefaultProps: function (){
		return {
			items: [],
			fixed: false,
			className: ''
		};
	},
	getInitialState: function(){
		return {

		}
	},
	componentDidMount:function(){

	},
	__onHeaderCheckBoxChange: function (value){
		this.refs.body.checkedAll(value);
	},
	__onBodyCheckBoxChange: function (value, row, checkbox){
		this.props.onBodyCheckBoxChange && this.props.onBodyCheckBoxChange(value, row, checkbox, this);
	},
	__onFilter: function (data, filter){
		if(Object.keys(data).length){
			var _where = this.props.data._data.where || {};
			zn.each(data, function (value, key){
				if(value.value!==null){
					_where[key+'&'+value.opt] = value.value;
				}else {
					_where[key+'&'+value.opt] = null;
					delete _where[key+'&'+value.opt];
				}
			}.bind(this));
			this.props.data._data.where = _where;
			this.props.data.exec();
		}
	},
	getCheckedItems: function (filter){
		return this.refs.body.getCheckedItems(filter);
	},
	setData: function (data, argv){
		this.refs.body.setData(data, argv);
	},
	insertRow: function (data, argv){
		this.refs.body.insertRow(data);
	},
	refresh: function (){
		this.refs.body.refresh();
	},
	getValue: function (){
		return this.refs.body.getValue();
	},
	setValue: function (value){
		this.refs.body.setValue(value);
	},
	render: function(){
		var _items = this.props.items.slice(0);
		if(this.props.checkbox&&_items.length&&_items[0].type!='checkbox'){
			_items.unshift({
				type: 'checkbox',
				textAlign: 'center',
				width: this.props.checkbox
			});
		}
		this._columnSize = _items.length;
		return (
			<table style={this.props.style} className={"rt-table " + this.props.className} data-fixed={this.props.fixed} cellPadding="0" cellSpacing="0">
				<TableColgroup {...this.props} items={_items} />
				{this.props.showHeader && <TableHeader
					ref="header"
					{...this.props}
					items={_items}
					columnSize={this._columnSize}
					onCheckBoxChange={this.__onHeaderCheckBoxChange}
					onFilter={this.__onFilter}/>}
				<TableBody
					ref="body"
					{...this.props}
					items={_items}
					columnSize={this._columnSize}
					onCheckBoxChange={this.__onBodyCheckBoxChange}/>
			</table>
		);
	}
});
