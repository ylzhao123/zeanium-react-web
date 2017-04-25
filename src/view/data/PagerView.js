var React = require('react');
var Pager = require('./Pager');
var ActivityLayout = require('../basic/ActivityLayout');
var pagerviews = require('./pagerviews.js');
module.exports = React.createClass({
	displayName:'PagerView',
	getDefaultProps: function (){
		return {
			pageIndex: 1,
			pageSize: 10,
			visiblePage: 3
		};
	},
	getInitialState: function(){
		return {
			total: 0,
			current: this.props.pageIndex
		}
	},
	componentDidMount:function(){

	},
	__handlePageChanged: function ( newPage ) {
        this.setState({ current : newPage });
		this.props.data.extend({
			pageIndex: newPage
		});
		this.props.data.refresh();
    },
	__dataHandler: function (data){
		if(data.result[1]){
			var _count = data.result[1][0].count;
			if(this.isMounted()){
				this.setState({
					count: _count,
					total: Math.ceil( _count / this.props.pageSize)
				});
			}
		}

		return data.result[0];
	},
	getValue: function (){
		return this.refs.view.getValue();
	},
	setValue: function (value){
		return this.refs.view.setValue(value), this;
	},
	render: function () {
		var View = pagerviews[this.props.view];
		if(!View||!this.props.data){
			return null;
		}

		this.props.data.extend({
			pageIndex: this.state.current,
			pageSize: this.props.pageSize
		});
		return (
			<ActivityLayout direction="v" end={40} unit="px" barWidth={2}>
				<View {...this.props} onData={this.__onTableData} dataHandler={this.__dataHandler} ref="view" />
				<Pager total={this.state.total}
					count={this.state.count}
	                current={this.state.current}
	                visiblePages={this.props.visiblePage}
	                onPageChanged={this.__handlePageChanged} />
			</ActivityLayout>
		);
	}
});
