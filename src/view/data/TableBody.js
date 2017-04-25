var React = require('react');
var TableRow = require('./TableRow');
var Loading = require('../loader/DataLoader');

module.exports = React.createClass({
	displayName:'TableBody',
	getDefaultProps: function (){
		return {
			singleSelect: true,
			value: [],
			valueKey: 'id'
		};
	},
	getInitialState:function(){
		return {
			curr: null,
			data: null,
			loading: false,
			value: this.props.value,
			values: []
		}
	},
	componentDidMount:function(){
		this._dataSource = Store.dataSource(this.props.data, {
			autoLoad: this.props.autoLoad||true,
			onExec: ()=>this.setState({loading: true}),
			onSuccess: function (data){
				this.__onDataLoaded(this.dataHandler(data));
				this.props.onData && this.props.onData(data);
			}.bind(this)
		});
	},
	componentWillUnmount: function (){

	},
	dataHandler: function (data){
		if(this.props.dataHandler){
			return this.props.dataHandler(data);
		}

		return data.result || data;
	},
	componentWillReceiveProps: function(nextProps){
		if(nextProps.data!==this.props.data){
			this._dataSource.reset(nextProps.data);
		}
	},
	request: function (data, argv){
		this._dataSource.reset(data, argv);
	},
	refresh: function (){
		this._dataSource.refresh();
	},
	setData: function (data, argv){
		this._dataSource.reset(data, argv);
	},
	getData: function (){
		return this.state.data;
	},
	setValue: function (value){
		if(this.props.editable){
			return this.setData(value);
		}else {
			return this.setState({
				value: value
			});
		}
	},
	getValue: function (){
		if(this.props.editable){
			return this.getData();
		}else {
			return this.state.value;
		}
	},
	insertRow: function (row, index){
		if(index===undefined){
			this.state.data.push(row);
		} else {
			this.state.data.splice(index, 0, row);
		}
		this.forceUpdate();
	},
	deleteRow: function (row){
		this.state.data.splice(this.state.data.indexOf(row), 1);
		this.forceUpdate();
	},
	filter: function (filter) {
		this.setState({
			data: this.state.data.filter(filter||function (){})
		});
	},
	search: function (handler) {
		if(!this._data){
			this._data = this.state.data.slice(0);
		}
		this.setState({ data: this._data.filter(handler) });
	},
	checkedAll: function (value){
		if(value){
			this.setState({
				value: this.state.values
			});
		}else {
			this.setState({
				value: []
			});
		}
	},
	__onDataLoaded: function (data){
		if(!this.isMounted()){
			return false;
		}
		this.setState({ data: data, loading: false });
		if(this.props.fireIndex != undefined){
			this.fireClick(this.props.fireIndex);
		}
		this.props.onLoaded && this.props.onLoaded(data, this);
	},
	fireClick: function (index){

	},
	getSelectedRow: function (){
		return this.state.curr;
	},
	__onTableRowClick: function (event, data, row) {
		if(this.props.singleSelect){
			if(this.state.curr){
				this.state.curr.selected(false);
			}
			row.selected(true);
			this.state.curr = row;
		}
		this.props.onTableRowClick && this.props.onTableRowClick(event, data, row, this);
	},
	__onRowCheckBoxChange: function (value, row, checkbox){
		var _value = row.props.data[this.props.valueKey];
		if (!!value) {
			this.state.value.push(_value);
		} else {
			this.state.value.splice(this.state.value.indexOf(_value), 1);
		}
		this.props.onCheckBoxChange && this.props.onCheckBoxChange(value, row, checkbox, this);
	},
	render: function(){
		if(this.state.loading){
			return <tbody>
				<tr>
					<td style={{position:'absolute', width: '100%'}}>
						<Loading loader="arrow-circle" content="Loading ......" />
					</td>
				</tr>
			</tbody>;
		}
		this.state.values = [];
		return (
			<tbody style={this.props.tbodyStyle}>
				{
					this.state.data && this.state.data.map && this.state.data.map(function (item, index){
						var _value = item[this.props.valueKey];
						this.state.values.push(_value);
						return (typeof item === 'object')?<TableRow
									index={index}
									key={index + '_' + zn.uuid()}
									data={item}
									items={this.props.items}
									checked={this.state.value.indexOf(_value)!=-1}
									editable={this.props.editable !== undefined ? this.props.editable: item._editable}
									checkbox={this.props.checkbox}
									rowRender={this.props.rowRender}
									columnRender={this.props.columnRender}
									draggable={!!this.props.onRowDragStart}
									onDragStart={(event)=>{
										this.props.onRowDragStart(event, item, index);
									}}
									onCheckBoxChange={this.__onRowCheckBoxChange}
									onDidMount={this.__onRowDidMount}
									onRowClick={this.__onTableRowClick}
									/>:null;
					}.bind(this))
				}
			</tbody>
		);
	}
});
