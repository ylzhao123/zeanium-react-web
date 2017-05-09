require('./FilterItem.less');
var React = require('react');
var RTFlexItem = require('../basic/RTFlexItem');
var Dropdown = require('../basic/Dropdown');
var ListView = require('../data/ListView.js');
var inputs = require('../form/inputs.js');

//console.log(inputs);

var OPTS = {
	'=': { text: '等于', value: '=', icon: 'fa-exchange' },
	'>': { text: '大于', value: '>', icon: 'fa-angle-left' },
	'<': { text: '小于', value: '<', icon: 'fa-angle-right' },
	'like': { text: '相似', value: 'like', icon: 'fa-percent' },
	'cancle': { text: '取消', value: 'cancle', icon: 'fa-remove' }
};

module.exports = React.createClass({
	displayName:'FilterItem',
	getDefaultProps: function (){
		return {
			disabled: true,
			className: '',
			opts: []
		}
	},
	getInitialState: function(){
		return {
			opt: this.props.opt,
			disabled: this.props.disabled,
			optIcon: 'fa-filter',
			value: this.props.value,
			status: 'default'
		}
	},
	componentDidMount: function (){
		if(this.props.value!=undefined){
			this.refs.input.setValue(this.props.value);
		}
		this.props.onDidMount && this.props.onDidMount(this);
	},
	validate: function (){
		var _value = this.refs.input.getValue();
		if(this.props.required && !_value){
			this.setState({
				status: 'danger'
			});
			return false;
		}else {
			this.setState({
				status: 'success'
			});
		}

		return _value;
	},
	__onListItemClick: function (value, listitem, list){
		if(value=='cancle'){
			this.refs.input.setValue('', '');
			this.setState({
				value: '',
				optIcon: 'fa-filter',
				disabled: true
			}, function (){
				this.props.onCancle && this.props.onCancle(value, listitem, list, this);
			}.bind(this));
		}else {
			this.setState({
				opt: value,
				optIcon: listitem.props.icon,
				disabled: false
			});
		}
		Popover.close('_click');
	},
	__getData: function (){
		var _temps = [];
		this.props.opts.forEach(function (opt, index){
			if(OPTS[opt]){
				_temps.push(OPTS[opt]);
			}
		});

		_temps.push(OPTS['cancle']);

		return _temps;
	},
	__listItemRender: function (item, index){
		return <span><i style={{width: 16, height: 16}} className={'fa ' + item.icon} />{item.text}</span>;
	},
	__popoverRender: function (){
		return <ListView itemRender={this.__listItemRender} data={this.__getData()} value={this.state.opt} onItemClick={this.__onListItemClick} style={{border:'none',backgroundColor:'#FFF'}} />;
	},
	render: function(){
		var Input = inputs[this.props.type];
		return (
			<RTFlexItem
				{...this.props}
				className={'rt-filter-item ' + this.props.className + ' '+ this.state.status + ' ' +(this.props.fullWidth?'full':'')} >
				<Dropdown
					className="filter-dropdown"
					popoverRender={this.__popoverRender}
					popoverWidth={this.props.popoverWidth} >
					<i className={"filter-icon fa " + this.state.optIcon} />
				</Dropdown>
				{Input && <Input ref="input" {...this.props} disabled={this.state.disabled} value={this.state.value} className="filter-input" />}
			</RTFlexItem>
		);
	}
});
