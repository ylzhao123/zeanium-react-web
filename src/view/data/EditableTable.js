var React = require('react');
var Table = require('./Table');
var Icon = require('../basic/Icon');
module.exports = React.createClass({
	getDefaultProps: function (){
		return {
			headers: [],
			data: []
		};
	},
	getInitialState: function () {
		return {

		}
	},
	componentDidMount:function(){
		this._tableBody = this.refs.dstable.refs.body;
	},
	getValue: function (){
		return this._tableBody.getData();
	},
	setValue: function (data){
		this._tableBody.setData(data);
	},
	getText: function (){

	},
	__onRowAdd: function (){
		this._tableBody.insertRow({ _editable: true });
	},
	__onRowDelete: function (rowIndex, columnIndex, data, item, value){
		console.log('delete', data);
		this._tableBody.deleteRow(data);
	},
	__onRowAppend: function (rowIndex, columnIndex, data, item, value){
		console.log('append', data);
		this._tableBody.insertRow({ _editable: true }, rowIndex);
	},
	__tableHeaderRender: function (item, index, columnSize){
		if(index == columnSize-1){
			return <div style={{textAlign: 'center'}}>
				<Icon title='Add Row(Insert Last Row)' icon="fa-plus" onClick={this.__onRowAdd} />
			</div>;
		}
	},
	__tableColumnRender: function (rowIndex, columnIndex, data, item, value){
		switch (columnIndex) {
			case this.props.headers.length:
				return <div style={{textAlign: 'center'}}>
					<Icon title="Delete Row(Delete This Row)" icon="fa-minus" onClick={()=>this.__onRowDelete(rowIndex, columnIndex, data, item, value)} />
					{
						/*
							<Icon title="Append Row(Append To This Row Before)" icon="fa-plus" onClick={()=>this.__onRowAppend(rowIndex, columnIndex, data, item, value)} />
						*/
					}
				</div>;
		}
	},
	render: function(){
		return (
			<Table
				ref="dstable"
				singleSelect={false}
				editable={true}
				enableFilter={false}
				checkbox={false}
				showHeader={true}
				items={this.props.headers.concat([{ title: 'Actions', name: 'Actions', type: 'action', width: 50, textAlign: 'center' }])}
				data={this.props.data}
				headerRender={this.__tableHeaderRender}
				columnRender={this.__tableColumnRender}/>
		);
	}
});
