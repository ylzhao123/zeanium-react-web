var React = require('react');
var Draggable = window.Draggable;

module.exports = React.createClass({
	displayName: 'Link',
	getDefaultProps: function (){
		return {
			highLightStyle: {
				'stroke': '#f0ad4e',
				'strokeWidth': '3px'
			},
			lineStyle: {
				'stroke': '#E26965',
				'strokeWidth': '3px'
			}
		}
	},
	getInitialState: function(){
		return {
			x1: 0,
			y1: 0,
			x2: 0,
			y2: 0,
			lineStyle: this.props.lineStyle,
			svgStyle: {

			},
			zIndex: 0
		}
	},
	setTarget: function (value){
        if(value){
            this._target = value;
            value.setLink(this._id, this);
        }
    },
    setSource: function (value){
        if(value){
            this._source = value;
            value.setLink(this._id, this);
        }
    },
	componentDidMount:function(){
		this._id = zn.uuid();
		this.highLight(false);
		this.props.onDidMount && this.props.onDidMount(this, this.props);
	},
	reset: function (targetPosition, sourcePosition){
		var _bound = this.__calculateSVGBound(targetPosition, sourcePosition);
		_bound && this.setState({ svgStyle: _bound });
	},
	__getDirection: function (x, y, x1, y1){
        var flag = 0;
        var x = ((x - x1) <= 0) ? x : x1;
        var y = ((y - y1) <= 0) ? y : y1;
        if (x != x1 && y != y1) {
            flag = 1;
        }
        if (x == x1 && y != y1) {
            flag = 2;
        }
        if (x == x1 && y == y1) {
            flag = 3;
        }
        if (x != x1 && y == y1) {
            flag = 4;
        }
        return flag;
    },
	highLight: function (highLight){
		var _lineStyle = {};
		if(highLight){
			_lineStyle = this.props.highLightStyle;
		} else {
			_lineStyle = this.props.lineStyle;
		}
		this._highLight = highLight;
		this.setState({
			lineStyle: _lineStyle
		});
	},
    __calculateSVGBound: function (targetPosition, sourcePosition){
		var _xy1 = targetPosition || (!!this._target&&this._target.getCenterXY());
		var _xy2 = sourcePosition || (!!this._source&&this._source.getCenterXY());
		if(!_xy1 || !_xy2) { return; }
		var _minSize = this.props.minSize || 2,
            _dir = this.__getDirection(_xy1.x, _xy1.y, _xy2.x, _xy2.y);

        var _x = 0, _y = 0, _width = 0, _height = 0;
        var _x1 = 0, _y1 = 0, _x2 = 0, _y2 = 0;
        switch(_dir){
            case 1:
                _x = _xy1.x;
                _y = _xy1.y;
                _width = _xy2.x - _xy1.x;
                _height = _xy2.y - _xy1.y;

				(_width<_minSize)&&(_width = _minSize);
				(_height<_minSize)&&(_height = _minSize);

                _x1 = 0;
                _y1 = 0;
                _x2 = _width;
                _y2 = _height;
                break;
            case 2:
                _x = _xy2.x;
                _y = _xy1.y;
                _width = _xy1.x - _xy2.x;
                _height = _xy2.y - _xy1.y;

				(_width<_minSize)&&(_width = _minSize);
				(_height<_minSize)&&(_height = _minSize);

                _x1 = 0;
                _y1 = _height;
                _x2 = _width;
                _y2 = 0;
                break;
            case 3:
                _x = _xy2.x;
                _y = _xy2.y;
                _width = _xy1.x - _xy2.x;
                _height = _xy1.y - _xy2.y;

				(_width<_minSize)&&(_width = _minSize);
				(_height<_minSize)&&(_height = _minSize);

                _x1 = 0;
                _y1 = 0;
                _x2 = _width;
                _y2 = _height;
                break;
            case 4:
                _x = _xy1.x;
                _y = _xy2.y;
                _width = _xy2.x - _xy1.x;
                _height = _xy1.y - _xy2.y;

				(_width<_minSize)&&(_width = _minSize);
				(_height<_minSize)&&(_height = _minSize);

                _x1 = 0;
                _y1 = _height;
                _x2 = _width;
                _y2 = 0;
                break;
        }

		this.setState({
			x1: _x1,
			y1: _y1,
			x2: _x2,
			y2: _y2
		});

		return {
			left: _x,
			top: _y,
			width: _width,
			height: _height
		};
    },
	render:function(){
		return (
			<svg className="graph-link" version="1.1" xmlns="http://www.w3.org/2000/svg" style={this.state.svgStyle}>
				<defs>
					<marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
					  <path d="M0,0 L0,6 L9,3 z" fill="#f00" />
					</marker>
				</defs>
				<line className="line" x1={this.state.x1} y1={this.state.y1} x2={this.state.x2} y2={this.state.y2} style={this.state.lineStyle}></line>
			</svg>
		);
	}
});
