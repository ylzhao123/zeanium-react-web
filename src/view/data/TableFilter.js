var React = require('react');
var FilterItem = require('../filter/FilterItem');
var Icon = require('../basic/Icon');

module.exports = React.createClass({
	displayName:'TableFilter',
	getDefaultProps: function () {
		return {
			filterData: {},
			onFilterSearch: function (){}
		};
	},
	getInitialState:function(){
		this._items = {};
		return {

		}
	},
	componentDidMount:function(){
		this.search(this.props.filterData);
	},
	__onFilter: function (){
		this.search(this.props.filterData);
	},
	search: function (data){
		//console.log(data);
		data && this.props.onFilterSearch(data, this);
	},
	__onFilterChange: function (value, item){
		if(this.props.filterData[item.name]){
			this.props.filterData[item.name].opt = value.value;
		} else {
			this.props.filterData[item.name] = {
				key: item.name,
				opt: value.value
			}
		}
	},
	__onFilterItemChange: function (value, input){
		this.props.onFilter && this.props.onFilter(this.validate(), input);
	},
	validate: function (){
		var _value = {};
		zn.each(this._items, function (item, name){
			//if(item.state.opt && item.validate()){
			if(item.state.opt){
				_value[name.split('_')[0]] = {
					opt: item.state.opt,
					value: item.validate()
				};
			}
		});

		return _value;
	},
	__onFilterItemDidMount: function (item){
		this._items[item.props.name] = item;
	},
	__onFilterItemCancle: function (){
		this.props.onFilter && this.props.onFilter(this.validate());
	},
	__itemRender: function (item, index){
		var _content = null;
		switch (item.type) {
			case 'checkbox':
				_content = <Icon icon="fa-filter" />;
				break;
			case 'action':
				item.textAlign = 'center';
				_content = <Icon onClick={this.__onFilter} icon="fa-search" />
				break;
			default:
				if(item.filter){
					var _filter = zn.overwrite(item.filter||{}, { type:'Input', fullWidth: true });
					var _events = {
						onChange: this.__onFilterItemChange
					};
					if(_filter.type=='Input'){
						_events = {
							onEnter: this.__onFilterItemChange
						}
					}

					_content = <FilterItem
									popoverWidth={80}
									opts={['like','=']}
									name={item.name}
									{..._filter}
									onCancle={this.__onFilterItemCancle}
									onDidMount={this.__onFilterItemDidMount}
									{..._events} />;
				}else {
					_content = null;
				}

				break;
		}

		return <td key={index} className={'text-align-'+(item.textAlign||'left')} width={(item.width?item.width:0)}>{_content}</td>
	},
	render:function(){
		return (
			<tr className="table-row editable filter">
				{
					(this.props.items||[]).map(this.__itemRender)
				}
			</tr>
		);
	}
});
