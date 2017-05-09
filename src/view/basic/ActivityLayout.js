require('./ActivityLayout.less');
var React = require('react');
var Layout = require('./Layout');

module.exports = React.createClass({
	displayName:'ActivityLayout',
	getDefaultProps: function (){
		return {
			begin: 0,
			end: 0,
			barWidth: 3,
			hStyle: {},
			bStyle: {},
			fStyle: {},
			className: '',
			direction: 'h',
			unit: 'px'
		};
	},
	componentDidMount: function(){

	},
	getInitialState: function (){
		return {

		};
	},
	__getStyles: function (){
		var props = this.props,
			_unit = props.unit,
			_begin = props.begin,
			_end = props.end,
			_header = {},
			_body = {},
			_footer = {};

		if(props.direction == 'h'){
			_body.width = props.barWidth + _unit;
			if(_begin){
				_header.width = _begin + _unit;
				_body.left = _begin + _unit;
				_footer.left = (_begin + props.barWidth) + _unit;
			}
			if(_end){
				_header.right = (_end + props.barWidth) + _unit;
				_body.right = _end + _unit;
				_footer.width = _end + _unit;
			}
		} else {
			_body.height = props.barWidth + _unit;
			if(_begin){
				_header.height = _begin + _unit;
				_body.top = _begin + _unit;
				_footer.top = (_begin + props.barWidth) + _unit;
			}
			if(_end){
				_header.bottom = (_end + props.barWidth) + _unit;
				_body.bottom = _end + _unit;
				_footer.height = _end + _unit;
			}
		}

		return {
			header: zn.extend(_header, props.hStyle),
			body: zn.extend(_body, props.bStyle),
			footer: zn.extend(_footer, props.fStyle)
		}
	},
	__bodyRender: function (){
		var _render = this.props.bodyRender && this.props.bodyRender(this);
		if(_render){
			return _render;
		} else {
			return <div className="activity-bar"></div>;
		}
	},
	render: function(){
		var _children = this.props.children;
		if(_children&&_children.length === undefined){
			_children = [_children];
		}
		_children = _children.slice(0);
		var _styles = this.__getStyles();   //h, v
		return (
			<Layout {...this.props} className={"rt-activity-layout " + this.props.className}>
				<Layout.Header style={_styles.header}>{_children[0]}</Layout.Header>
				<Layout.Body style={_styles.body}>{this.__bodyRender()}</Layout.Body>
				<Layout.Footer style={_styles.footer}>{_children[1]}</Layout.Footer>
			</Layout>
		);
	}
});
