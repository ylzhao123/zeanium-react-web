var React = require('react');
var ReactDOM = require('react-dom');
var Node = require('./Node');
var Link = require('./Link');

module.exports = React.createClass({
	displayName:'FlowCanvas',
	getDefaultProps: function (){
		return {
			data: {
				nodes: [],
				links: []
			}
		};
	},
	getInitialState:function(){
		return {
			nodes: this.props.data.nodes||[],
			links: this.props.data.links||[]
		}
	},
	componentDidMount:function(){
		this._dom = ReactDOM.findDOMNode(this);
		this.__initDragDrop(this._dom);
	},
	__initDragDrop: function (target){
        target.ondragover = function(event) {
            event.preventDefault();
			//console.log('drag-over');
            this.props.onDragOver && this.props.onDragOver(event);
            return true;
        }.bind(this);

        target.ondragenter = function(event) {
			//console.log('drag-enter');
			this.props.onDragEnter && this.props.onDragEnter(event);
            return true;
        }.bind(this);

        target.ondrop = function(event) {
			this.props.onDrop && this.props.onDrop(event, JSON.parse(event.dataTransfer.getData("data")||'{}'));
            return false;
        }.bind(this);
	},
	__onNodeDidMount: function (node, nodeProps, nodeState){
		this._nodes[nodeProps.id] = node;
	},
	__onNodeDrag: function (){

	},
	__onNodeDragEnd: function (event, data, node){
		var _data = this.state.nodes[node.props.index];
		_data.x = data.currX;
		_data.y = data.currY;
		this.props.onNodeDragEnd && this.props.onNodeDragEnd(event, data, node);
	},
	__onLinkDidMount: function (link, linkProps){
		var _target = this._nodes[linkProps.target],
			_source = this._nodes[linkProps.source];
		link.setTarget(_target);
		link.setSource(_source);
		link.reset();
		this._links[link._id] = link;
	},
	getData: function (){
		return this.state;
	},
	setData: function (data){
		this.setState({ nodes: data.nodes, links: data.links });
	},
	addLink: function (target, source){
		this.state.links.push({ target: target, source: source });
		this.forceUpdate();
	},
	deleteLink: function (link){
		this.state.links.splice(this.state.links.indexOf(link), 1);
		this.forceUpdate();
	},
	updateNode: function (node){
		this.state.nodes.map(function (item, index){
			if(node===item){
				return node;
			}
			return item;
		});
		this.forceUpdate();
	},
	addNode: function (node){
		this.state.nodes.push(node);
		this.forceUpdate();
	},
	deleteNodeById: function (id){
		this.state.nodes = this.state.nodes.filter(function (node, index) {
			if(node.id !== id){
				return true;
			}else{
				return false;
			}
		});

		this.forceUpdate();
	},
	updateNodeById: function (id, info){
		this.state.nodes.forEach(function (node, index) {
			if(node.id === id){
				zn.extend(node, info);
			}
		});

		this.forceUpdate();
	},
	deleteNode: function (node){
		this.state.nodes.splice(this.state.nodes.indexOf(node), 1);
		this.forceUpdate();
	},
	filterNode: function (filter) {
		this.setState({
			nodes: this.state.nodes.filter(filter||function (){})
		});
	},
	searchNode: function (handler) {
		if(!this.__nodes){
			this.__nodes = this.state.nodes.slice(0);
		}
		this.setState({ nodes: this.__nodes.filter(handler) });
	},
	__onNodeClick: function (event, node, data){
		this.setState({ selectNode: data });
		this.props.onNodeClick && this.props.onNodeClick(event, node, data, this);
	},
	render:function(){
		this._nodes = {};
		this._links = {};
		return (
			<div className="c-flow-canvas" >
				{
					(this.state.nodes||[]).map(function (node, index){
						return <Node key={zn.uuid()}
									index={index}
									selected={this.state.selectNode===node?true:false}
									data={node}
									canvas={this}
									editable={this.props.editable||node.editable}
									draggable={this.props.draggable||node.draggable}
									render={this.props.nodeRender}
									onDidMount={this.__onNodeDidMount}
									onNodeDrag={this.__onNodeDrag}
									onNodeDragEnd={this.__onNodeDragEnd}
									onClick={(event, instance)=>this.__onNodeClick(event, instance, node)}
									{...node}/>;
					}.bind(this))
				}
				{
					this.state.links.map(function (link, index){
						return <Link key={zn.uuid()} data={link} render={this.props.linkRender} {...link} onDidMount={this.__onLinkDidMount} />;
					}.bind(this))
				}
				<Link ref="temp" />
			</div>
		);
	}
});
