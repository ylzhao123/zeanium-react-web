var React = require('react');

module.exports = React.createClass({
	displayName: 'Link',
	getDefaultProps: function getDefaultProps() {
		return {
			highLightStyle: {
				'stroke': '#f0ad4e',
				'strokeWidth': '3px'
			},
			lineStyle: {
				'stroke': '#E26965',
				'strokeWidth': '3px'
			}
		};
	},
	getInitialState: function getInitialState() {
		return {
			x1: 0,
			y1: 0,
			x2: 0,
			y2: 0,
			lineStyle: this.props.lineStyle,
			svgStyle: {},
			zIndex: 0
		};
	},
	componentDidMount: function componentDidMount() {
		this._id = zn.uuid();
		this.highLight(false);
		this.props.onDidMount && this.props.onDidMount(this, this.props);
	},
	setTarget: function setTarget(value) {
		if (value) {
			this._target = value;
			value.setLink(this._id, this);
		}
	},
	setSource: function setSource(value) {
		if (value) {
			this._source = value;
			value.setLink(this._id, this);
		}
	},
	getId: function getId() {
		return this._id;
	},
	reset: function reset(targetPosition, sourcePosition) {
		var _bound = this.__calculateSVGBound(targetPosition, sourcePosition);
		_bound && this.setState({ svgStyle: _bound });
	},
	__getDirection: function __getDirection(x, y, x1, y1) {
		var flag = 0;
		var x = x - x1 <= 0 ? x : x1;
		var y = y - y1 <= 0 ? y : y1;
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
	highLight: function highLight(_highLight) {
		var _lineStyle = {};
		if (_highLight) {
			_lineStyle = this.props.highLightStyle;
		} else {
			_lineStyle = this.props.lineStyle;
		}
		this._highLight = _highLight;
		this.setState({
			lineStyle: _lineStyle
		});
	},
	__calculateSVGBound: function __calculateSVGBound(targetPosition, sourcePosition) {
		var _xy1 = targetPosition || !!this._target && this._target.getCenterXY();
		var _xy2 = sourcePosition || !!this._source && this._source.getCenterXY();
		if (!_xy1 || !_xy2) {
			return;
		}
		var _minSize = this.props.minSize || 2,
		    _dir = this.__getDirection(_xy1.x, _xy1.y, _xy2.x, _xy2.y);

		var _x = 0,
		    _y = 0,
		    _width = 0,
		    _height = 0;
		var _x1 = 0,
		    _y1 = 0,
		    _x2 = 0,
		    _y2 = 0;
		switch (_dir) {
			case 1:
				_x = _xy1.x;
				_y = _xy1.y;
				_width = _xy2.x - _xy1.x;
				_height = _xy2.y - _xy1.y;

				_width < _minSize && (_width = _minSize);
				_height < _minSize && (_height = _minSize);

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

				_width < _minSize && (_width = _minSize);
				_height < _minSize && (_height = _minSize);

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

				_width < _minSize && (_width = _minSize);
				_height < _minSize && (_height = _minSize);

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

				_width < _minSize && (_width = _minSize);
				_height < _minSize && (_height = _minSize);

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

		//console.log(this.drawLineArrow(_x1, _y1, _x2, _y2));

		return {
			left: _x,
			top: _y,
			width: _width,
			height: _height
		};
	},
	drawLineArrow: function drawLineArrow(x1, y1, x2, y2) {
		var path;
		var slopy, cosy, siny;
		var Par = 10.0;
		var x3, y3;
		slopy = Math.atan2(y1 - y2, x1 - x2);
		cosy = Math.cos(slopy);
		siny = Math.sin(slopy);

		path = "M" + x1 + "," + y1 + " L" + x2 + "," + y2;

		x3 = (Number(x1) + Number(x2)) / 2;
		y3 = (Number(y1) + Number(y2)) / 2;

		path += " M" + x3 + "," + y3;

		path += " L" + (Number(x3) + Number(Par * cosy - Par / 2.0 * siny)) + "," + (Number(y3) + Number(Par * siny + Par / 2.0 * cosy));

		path += " M" + (Number(x3) + Number(Par * cosy + Par / 2.0 * siny) + "," + (Number(y3) - Number(Par / 2.0 * cosy - Par * siny)));
		path += " L" + x3 + "," + y3;

		return path;
	},
	render: function render() {
		return React.createElement(
			'svg',
			{ className: 'rt-graph-link', version: '1.1', xmlns: 'http://www.w3.org/2000/svg', style: this.state.svgStyle },
			React.createElement(
				'defs',
				null,
				React.createElement(
					'marker',
					{ id: 'markerArrow', markerWidth: '10', markerHeight: '10', refX: '0', refY: '3', orient: 'auto', markerUnits: 'strokeWidth' },
					React.createElement('path', { d: 'M0,0 L0,6 L9,3 z', fill: '#f00' })
				)
			),
			React.createElement('line', { className: 'line', 'marker-mid': 'url(#markerArrow)', x1: this.state.x1, y1: this.state.y1, x2: this.state.x2, y2: this.state.y2, style: this.state.lineStyle })
		);
	}
});