var React = require('react');
var ListView = require('../basic/RTList');
var RTItem = require('../basic/RTItem');
var Checkbox = require('./Checkbox');

var TreeMenuItem = React.createClass({
	displayName: 'TreeMenuItem',
	getDefaultProps: function (){
		return {
			checked: false
		}
	},
	getInitialState: function(){
		return {
			active: this.props.active||this.props.parent.props.activeAll,
			selected: false,
			checked: false,
			loading: false
		};
	},
	componentDidMount: function (){
		//this.__onCheckboxChange(this.props.checked);
	},
	componentWillReceiveProps: function (nextProps){
		if(nextProps.checked!=this.props.checked){
			this.__onCheckboxChange(nextProps.checked);
		}
	},
	active: function(active){
		this.setState({
			active: active
		});
	},
	renderIcon: function (){
		return <div className="seps" style={{width: ((this.props.parent.props.sep + 1) * 16)}}>
			{this.__isTreeRow() && <i className={'icon fa ' + (!!this.state.active?'fa-caret-down':'fa-caret-right')} onClick={this.__onIconClick} />}
		</div>;
	},
	__onIconClick: function (event){
		event.stopPropagation();
		this.active(!this.state.active);
	},
	__isTreeRow: function (){
		var _return = this.props.isTreeRow && this.props.isTreeRow(this.props, this);
		if(_return === undefined) {
			_return = !!this.props.data.sons;
		}
		return _return;
	},
	__onClick: function (event){
		if(this.state.loading){
			return;
		}
		this.setState({ selected: true });
		this.props.onClick(this, event);
	},
	__onCheckboxChange: function (value){
		this.setState({ checked: value });
		this.props.onCheckboxChange && this.props.onCheckboxChange(value, this.props.data);
	},
	renderContent: function (){
		var _content = null;
		if(this.props.parent.props.itemContentRender){
			_content = this.props.parent.props.itemContentRender(this.props);
		}
		if(!_content){
			_content = this.props.data[this.props.parent.props.textKey];
		}

		if(this.props.parent.props.enableCheckbox){
			_content = <div className="content">
				<Checkbox checked={this.props.checked} disabled={this.props.parent.props.disabled} onChange={(event, value)=>this.__onCheckboxChange(value)} />
				{_content}
			</div>;
		}

		return _content;
	},
	__renderChildren: function (){
		if(this.__isTreeRow() && this.state.active){
			var _data = this.props.parent.props.data.copyAndExt({ where: { pid: this.props.data.id } });
			var _sep = this.props.parent.props.sep;
			_sep++;
			return <TreeMenu {...this.props.parent.props} checked={(this.props.parent.props.cascade ? this.state.checked : undefined)} parentTreeMenu={this.props.parent} sep={_sep} autoLoad={true} data={_data} />;
		}
	},
	render:function(){
		return (
			<div className="tree-row">
				<div className={"row-title " + (this.state.selected?'curr':'')} onClick={this.__onClick}>{this.renderIcon()}{this.renderContent()}</div>
				{this.__renderChildren()}
			</div>
		);
	}
});

var TreeMenu = React.createClass({
	getDefaultProps: function () {
		return {
			sep: 0,
			isTreeRow: null,
			autoLoad: true,
			textKey: 'title',
			valueKey: 'id',
			className: 'c-tree',
			checked: false,
			disabled: false,
			enableCheckbox: false
		};
	},
	displayName: 'TreeMenu',
	getInitialState: function(){
		return {
			currIndex: null,
			data: null,
			value: this.props.value || ','
		}
	},
	setValue: function (value){
		return this.setState({
			value: value
		}), this;
	},
	getValue: function (){
		return this.state.value;
	},
	__onItemClick: function (item, event){
		if(this._selectedItem === item){
			return;
		}
		if(this.props.parentTreeMenu){
			this.props.parentTreeMenu.__onItemClick(item, event);
		} else {
			if(this._selectedItem&&this._selectedItem.isMounted()){
				this._selectedItem.setState({ selected: false });
			}
			this._selectedItem = item;
			this.props.onClick && this.props.onClick(item, event);
		}
	},
	__onItemCheckboxChange: function (value, data){
		if(this.props.parentTreeMenu){
			this.props.parentTreeMenu.__onItemCheckboxChange(value, data);
		} else {
			if(!data){ return; }
			var _value = this.state.value || ',',
				_itemValue = (data[this.props.valueKey]) + ',';
			if(value){
				if(_value.indexOf(',' + _itemValue) == -1) {
					_value = _value + _itemValue;
				}
			}else {
				_value = _value.replace(new RegExp(',' + _itemValue, 'gi'), ',');
			}
			//console.log('value: ', _value, 'itemValue: ', _itemValue);
			this.state.value = _value;
			this.setState({
				value: _value
			});
			this.props.onItemCheckboxChange && this.props.onItemCheckboxChange(_value, value, data);
		}
	},
	__itemRender: function (item, index){
		var _content = null;
		if(typeof item=='string'){
			item = { text: item };
		}
		_content = this.props.itemRender && this.props.itemRender(item, index);
		if(!_content){
			var _checked = this.props.checked,
				_itemValue = (item[this.props.valueKey]) + ',';
			if(!_checked){
				_checked = this.state.value.indexOf(',' + _itemValue)!=-1;
			}
			_content = <TreeMenuItem key={index} checked={_checked} parent={this} data={item} onClick={this.__onItemClick} onCheckboxChange={this.__onItemCheckboxChange} />;
		}

		return _content;
	},
	refresh: function (){
		this.refs.listview.refresh();
	},
	render:function(){
		return (
			<ListView {...this.props} ref='listview' onClick={null} itemRender={this.__itemRender} onLoaded={this.__onLoaded} />
		);
	}
});

module.exports = TreeMenu;
