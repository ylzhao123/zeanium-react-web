var React = require('react');
var Table = require('./Table');
var Icon = require('../basic/Icon');
module.exports = React.createClass({
	displayName: 'exports',

	getDefaultProps: function getDefaultProps() {
		return {
			headers: [],
			data: []
		};
	},
	getInitialState: function getInitialState() {
		return {};
	},
	componentDidMount: function componentDidMount() {
		this._tableBody = this.refs.dstable.refs.body;
	},
	getValue: function getValue() {
		return this._tableBody.getData();
	},
	setValue: function setValue(data) {
		this._tableBody.setData(data);
	},
	getText: function getText() {},
	__onRowAdd: function __onRowAdd() {
		this._tableBody.insertRow({ _editable: true });
	},
	__onRowDelete: function __onRowDelete(rowIndex, columnIndex, data, item, value) {
		console.log('delete', data);
		this._tableBody.deleteRow(data);
	},
	__onRowAppend: function __onRowAppend(rowIndex, columnIndex, data, item, value) {
		console.log('append', data);
		this._tableBody.insertRow({ _editable: true }, rowIndex);
	},
	__tableHeaderRender: function __tableHeaderRender(item, index, columnSize) {
		if (index == columnSize - 1) {
			return React.createElement(
				'div',
				{ style: { textAlign: 'center' } },
				React.createElement(Icon, { title: 'Add Row(Insert Last Row)', icon: 'fa-plus', onClick: this.__onRowAdd })
			);
		}
	},
	__tableColumnRender: function __tableColumnRender(rowIndex, columnIndex, data, item, value) {
		var _this = this;

		switch (columnIndex) {
			case this.props.headers.length:
				return React.createElement(
					'div',
					{ style: { textAlign: 'center' } },
					React.createElement(Icon, { title: 'Delete Row(Delete This Row)', icon: 'fa-minus', onClick: function onClick() {
							return _this.__onRowDelete(rowIndex, columnIndex, data, item, value);
						} })
				);
		}
	},
	render: function render() {
		return React.createElement(Table, {
			ref: 'dstable',
			singleSelect: false,
			editable: true,
			enableFilter: false,
			checkbox: false,
			showHeader: true,
			items: this.props.headers.concat([{ title: 'Actions', name: 'Actions', type: 'action', width: 50, textAlign: 'center' }]),
			data: this.props.data,
			headerRender: this.__tableHeaderRender,
			columnRender: this.__tableColumnRender });
	}
});