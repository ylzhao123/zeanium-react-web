var React = require('react');
var DownPuller = require('../basic/DownPuller.js');
module.exports = React.createClass({
	displayName:'PullRefreshList',
	getDefaultProps: function (){
		return {
			pageIndex: 1,
			pageSize: 10,
			className: ''
		};
	},
	getInitialState: function(){
		return {
			total: 0,
			loading: false,
			loadingMore: false,
			current: this.props.pageIndex,
			data: null
		}
	},
	componentDidMount: function(){
		this.props.data.extend({
			pageIndex: this.state.current,
			pageSize: this.props.pageSize
		});

		this._dataSource = Store.dataSource(this.props.data, {
			autoLoad: true,
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
		if(this.state.current > 1){
			this.state.data = this.state.data.concat(data);
		}else {
			this.state.data = data;
		}

		this.setState({
			data: this.state.data,
			loading: false,
			loadingMore: false
		}, function (){
			this.props.onLoaded && this.props.onLoaded(data, this);
		}.bind(this));
	},
	componentWillReceiveProps: function(nextProps){
		if(nextProps.data!==this.props.data){
			this.setState({
				data: null
			});
			this._dataSource.reset(nextProps.data);
		}
	},
	__handlePageChanged: function (newPage) {
        this.setState({ current : newPage });
		this.props.data.extend({
			pageIndex: newPage
		});
		this.props.data.refresh();
    },
	__dataHandler: function (data){
		if(this.props.dataHandler){
			return this.props.dataHandler(data);
		}
		var _count = data.result[1][0].count;
		if(this.isMounted()){
			this.setState({
				count: _count,
				total: Math.ceil( _count / this.props.pageSize)
			});
		}

		return data.result[0];
	},
	__onItemRender: function (item, index){
		var _view = this.props.itemRender && this.props.itemRender(item, index);
		if(_view===false){
			return null;
		}
		if(!_view){
			_view = <span>{item.title}</span>;
		}

		return <li className="data-list-item" key={index}>{_view}</li>;
	},
	__renderData: function (){
		if(this.state.data){
			return (<ul className="data-list">
				{
					this.state.data.map(this.__onItemRender)
				}
			</ul>);
		}else {
			return null;
		}
	},
	__renderLoading: function (){
		return <UI.DataLoader loader="timer" content="加载数据中..." />;
	},
	__renderNoData: function (){
		return <div className="rt-no-data">暂无数据</div>
	},
	__render: function (){
		if(this.state.loading || !this.state.data){
			return this.__renderLoading();
		}
		if(this.state.data.length){
			return this.__renderData();
		}else {
			return this.__renderNoData();
		}
	},
	__onDownPullEnd: function (){
		this.__handlePageChanged(1);
	},
	__onUpPullEnd: function (){
		this.loadingMore();
	},
	loadingMore: function (){
		this.state.current++;
		this.setState({
			current: this.state.current,
			loadingMore: true
		});
		this.__handlePageChanged(this.state.current);
	},
	__renderFooter: function (){
		if(this.state.loadingMore){
			return <div className="footer">
				<i className="fa fa-spinner rt-self-loading" />
				<span>正在加载中...</span>
			</div>;
		}
		if(this.state.data&&this.state.data.length){
			if(this.state.current<this.state.total){
				return <div onClick={()=>this.loadingMore()} className="data-footer">点击加载更多 共 ({this.state.current}/{this.state.total}) 页 {this.state.count} 条</div>;
			}else {
				return <div className="data-footer">共 ({this.state.current}/{this.state.total}) 页 {this.state.count} 条</div>;
			}
		}
	},
	render: function () {
		return (
			<div className={"rt-paging-list " + this.props.className }>
				{this.__render()}
				{this.__renderFooter()}
			</div>
		);
	}
});
