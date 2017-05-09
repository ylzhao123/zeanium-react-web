require('./Page.less');
require('./PageFlex.less');
var React = require('react');
var FixedLayout = require('./FixedLayout');
var ButtonGroup = require('./ButtonGroup');

module.exports = React.createClass({
	displayName: 'Page',
	getDefaultProps: function() {
		return {
			className: '',
			height: 45,
			end: 45,
			flex: false,
			canBack: true
		};
	},
	back: function (){
		var _result = this.props.onBack && this.props.onBack();
		if(_result!==false){
			window.history.back();
		}
	},
	render:function(){
		if(this.props.flex){
			return <div className={"rt-page-flex " + this.props.className}>
				<div className="page-header" style={zn.extend({ height: this.props.height }, this.props.hStyle)}>
					{this.props.canBack && <i className="back fa fa-arrow-left" onClick={this.back} />}
					<div className="title">{this.props.title}</div>
					<div className="btns">
						<ButtonGroup className="rt-flex" items={this.props.toolbarItems} onClick={this.props.onToolbarClick} />
					</div>
				</div>
				<div className="page-body" style={zn.extend({ height: this.props.height }, this.props.bStyle)}>
					{this.props.children}
				</div>
				<div className="page-footer" style={zn.extend({ height: this.props.fHeight }, this.props.fStyle)}>

				</div>
			</div>;
		}
		return (
			<FixedLayout className={'rt-page ' + this.props.className}
				direction="v"
				begin={this.props.height}
				end={(this.props.footerView?this.props.end:0)}
				unit="px"
				hStyle={{ height: (this.props.height-3), borderBottom: '1px solid #3d3d3d' }}
				bStyle={zn.extend({borderTop: '1px solid #3d3d3d', width: 'auto'}, this.props.bStyle)} >
				<div className="page-header" style={{ lineHeight: ((this.props.height-5) + 'px') }}>
					{this.props.canBack && <i className="back fa fa-arrow-left" onClick={this.back} />}
					<div className="title">{this.props.title}</div>
					<div className="btns">
						<ButtonGroup className="rt-flex" items={this.props.toolbarItems} onClick={this.props.onToolbarClick} />
					</div>
				</div>
				{this.props.children}
				{(this.props.end&&this.props.footerView)&&this.props.footerView}
			</FixedLayout>
		);
	}
});
