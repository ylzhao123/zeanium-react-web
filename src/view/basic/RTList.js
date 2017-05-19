var React = require('react');
var RTItem = require('./RTItem.js');

module.exports = React.createClass({
	displayName: 'RTList',
	propTypes: {
		textKey: React.PropTypes.string,
		valueKey: React.PropTypes.string
	},
	getDefaultProps: function () {
		return {
			float: 'none',
			className: '',
			autoLoad: true
		};
	},
	getInitialState: function(){
		return {
			loading: false,
			data: []
		}
	},
	componentDidMount: function(){
		var _source = this.props.items || this.props.data;
		this._dataSource = Store.dataSource(_source, {
			autoLoad: this.props.autoLoad,
			onExec: function (){
				var _result = this.props.onLoading && this.props.onLoading();
				if(_result !== false && this.isMounted()){
					this.setState({
						loading: true
					});
				}
			}.bind(this),
			onSuccess: function (data){
				this.__onDataLoaded(this.__dataHandler(data));
				this.props.onData && this.props.onData(data);
			}.bind(this)
		});
	},
	__dataHandler: function (data){
		if(this.props.dataHandler){
			return this.props.dataHandler(data);
		}

		return data.result || data;
	},
	__onDataLoaded: function (data){
		if(!this.isMounted()){
			return false;
		}
		if(data.length==undefined){
			var temp = [];
			for(var key in data){
				temp.push(data[key]);
			}
			data = temp;
		}

		this.state.data = data;
		this.setState({ data: data, loading: false });
		if(this.props.fireIndex != undefined){
			//this.fireClick(this.props.fireIndex);
		}
		this.props.onLoaded && this.props.onLoaded(data, this);
	},
	componentWillReceiveProps: function(nextProps){
		if(nextProps.items!==this.props.items){
			this._dataSource.reset(nextProps.items);
		}
		if(nextProps.data!==this.props.data){
			this._dataSource.reset(nextProps.data);
		}
	},
	request: function (data, argv){
		this._dataSource.reset(data, argv);
	},
	filter: function (handler) {
		var _data = [];
		this.state.data.forEach(function (item, index, array) {
			if(handler(item, index, array) !== false){
				_data.push(item);
			}
		});

		this.setState({ data: _data });
	},
	refresh: function (){
		this._dataSource.refresh();
	},
	fireClick: function (index){
		if(!this.state.data.length || index===undefined){
			return;
		}
		this.__onItemClick(this.state.data[index], index);
	},
	__onItemClick: function (item, index){
		item.onClick && item.onClick(item, index);
		this.props.onClick && this.props.onClick(item, index);
	},
	__itemRender: function (item, index){
		var _content = null, _temp = {};
		if(typeof item !== 'object'){
			_temp[this.props.textKey] = _temp[this.props.valueKey] = item;
			this.state.data[index] = item = _temp;
		}
		if(item&&typeof item == 'object'){
			item._index = index;
		}

		var _temp = this.props.onEachItem && this.props.onEachItem(item, this);

		if(_temp===false){
			return null;
		}
		if(this.props.itemRender){
			_content = this.props.itemRender(item, index, this);
		}

		if(!_content){
			_content = <RTItem {...item}
				onClick={(self, event)=>this.__onItemClick(item, index, self, event)} >
				<span>{this.getItemText(item)}</span>
			</RTItem>;
		}

		return <li key={index}>{_content}</li>;
	},
	getItemText: function (item){
		return item[this.props.textKey];
	},
	getItemValue: function (){
		return item[this.props.valueKey];
	},
	render: function(){
		if(this.state.loading){
			return <div data-loader="arrow-circle" style={{margin:'0 auto',borderColor: '#2c89e8', marginTop: 10}}></div>;
		}
		if(!this.state.data.length){
			var _view = null;
			if(this.props.emptyView){
				_view = <div className='rt-empty-view'>
					<span>亲, 暂无数据!</span>
				</div>;
			}

			return _view;
		}
		return (
			<ul style={this.props.style} className={'rt-list ' + this.props.className} data-float={this.props.float} {...this.props.attrs}>
				{
					this.state.data && this.state.data.map && this.state.data.map(this.__itemRender)
				}
			</ul>
		);
	}
});
