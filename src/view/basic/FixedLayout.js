var React = require('react');
var Layout = require('./Layout');

module.exports = React.createClass({
	displayName:'FixedLayout',
	getDefaultProps: function (){
		return {
			begin: 0,
			end: 0,
			hStyle: {},
			bStyle: {},
			fStyle: {},
			className: '',
			direction: 'h',
			unit: 'px'
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
			_header = {
				width: _begin + _unit
			};
			_body = {
				left: _begin + _unit,
				right: _end + _unit
			};
			_footer = {
				width: _end + _unit
			}
		} else {
			_header = {
				height: _begin + _unit
			};
			_body = {
				top: _begin + _unit,
				bottom: _end + _unit
			};
			_footer = {
				height: _end + _unit
			}
		}

		return {
			header: zn.extend(_header, props.hStyle),
			body: zn.extend(_body, props.bStyle),
			footer: zn.extend(_footer, props.fStyle)
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
			<Layout {...this.props} className={"rt-fixed-layout " + this.props.className}>
				<Layout.Header style={_styles.header}>{_children[0]}</Layout.Header>
				<Layout.Body style={_styles.body}>{_children[1]}</Layout.Body>
				<Layout.Footer style={_styles.footer}>{_children[2]}</Layout.Footer>
			</Layout>
		);
	}
});
