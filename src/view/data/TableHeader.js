var React = require('react');
var Checkbox = require('../form/Checkbox');
var TableFilter = require('./TableFilter');

module.exports = React.createClass({
	displayName:'TableHeader',
	getInitialState: function(){
		return {

		};
	},
	componentDidMount: function(){

	},
	__onCheckBoxChange: function (event, value, cb){
		this.props.onCheckBoxChange && this.props.onCheckBoxChange(value, this, cb);
	},
	__onColClick: function (item, index){
		this.props.onColClick && this.props.onColClick(item, index);
	},
	__itemRender: function (item, index){
		var _content = this.props.headerRender && this.props.headerRender(item, index, this.props.columnSize);
		if(!_content){
			switch (item.type) {
				case 'checkbox':
					_content = <Checkbox {...item} onChange={this.__onCheckBoxChange} />;
					break;
				default:
					_content = <div onClick={()=>this.__onColClick(item, index)}>
						<span>{item.title||item.name}</span>
						{
							this.props.sort && <i className="sort fa fa-arrows-v" />
						}
					</div>;
					break;
			}
		}

		//width={(item.width?item.width:0)}
		return <th key={index} className={'text-align-'+(item.textAlign||'left')} >{_content}</th>
	},
	render:function(){
		return (
			<thead>
				<tr className="table-row thead">
					{
						(this.props.items||[]).map(this.__itemRender)
					}
				</tr>
				{
					this.props.enableFilter && <TableFilter {...this.props} />
				}
			</thead>
		);
	}
});
