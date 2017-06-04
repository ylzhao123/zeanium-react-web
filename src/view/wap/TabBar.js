var React = require('react');
var TabBarItem = React.createClass({
	displayName:'TabBarItem',
	getDefaultProps: function (){
		return {
			icon: '',
			title: '',
			selected: false
		}
	},
	__onClick: function(){
		this.props.onClick && this.props.onClick();
	},
	render: function(){
		return (
			<li className={ this.props.selected ? 'curr' : ''} onClick={this.__onClick} >
				<div><i className={'icon fa ' + this.props.icon} /></div>
				<div><span className='title'>{this.props.title}</span></div>
			</li>
		);
	}
});

module.exports = React.createClass({
	displayName:'TabBar',
	getDefaultProps: function (){
		return {
			items: [],
			index: 0
		}
	},
	getInitialState: function (){
		return {
			index: null
		};
	},
	componentDidMount: function (){
		this.__onClick(this.props.items[this.props.index]);
	},
	__onClick: function (item){
		if(item){
			this.setState({
				index: item.index
			});
			this.props.onClick && this.props.onClick(item);
		}
	},

	render: function(){
		return (
			<ul className={zn.react.classname('rt-tab-bar')} >
				{
					this.props.items.map(function (item, index){
						item.index = index;
						item.selected = (this.state.index === index);
						return <TabBarItem {...item} key={index} onClick={()=>this.__onClick(item)} />;
					}.bind(this))
				}
			</ul>
		);
	}
});
