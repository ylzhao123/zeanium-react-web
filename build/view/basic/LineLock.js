var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
    displayName: 'Button',
    getDefaultProps: function getDefaultProps() {
        return {
            width: 300,
            height: 300,
            size: 3,
            delay: 300
        };
    },
    getInitialState: function getInitialState() {
        return {
            step: 1,
            value: this.props.value,
            boolValue: false,
            arrayValue: null
        };
    },
    componentDidMount: function componentDidMount() {
        this._canvas = ReactDOM.findDOMNode(this.refs.canvas);
        this._ctx = this._canvas.getContext('2d');
        this._touching = false;
        this.createPoints();
        this.__bindEvents();
    },
    drawPointCircle: function drawPointCircle(x, y) {
        this._ctx.strokeStyle = '#CFE6FF';
        this._ctx.lineWidth = 2;
        this._ctx.beginPath();
        this._ctx.arc(x, y, this._radius, 0, Math.PI * 2, true);
        this._ctx.closePath();
        this._ctx.stroke();
    },
    drawSelectedPoints: function drawSelectedPoints() {
        var _ctx = this._ctx,
            _radius = this._radius;
        this._selectedPoints.forEach(function (point) {
            _ctx.fillStyle = '#CFE6FF';
            _ctx.beginPath();
            _ctx.arc(point.x, point.y, _radius / 2, 0, Math.PI * 2, true);
            _ctx.closePath();
            _ctx.fill();
        });

        return this;
    },
    drawSelectedPointsStatus: function drawSelectedPointsStatus(status) {
        var _ctx = this._ctx,
            _radius = this._radius;
        this._selectedPoints.forEach(function (point) {
            _ctx.strokeStyle = status;
            _ctx.beginPath();
            _ctx.arc(point.x, point.y, _radius, 0, Math.PI * 2, true);
            _ctx.closePath();
            _ctx.stroke();
        });

        return this;
    },
    drawSelectedPointsLines: function drawSelectedPointsLines(point) {
        var _ctx = this._ctx;
        _ctx.beginPath();
        _ctx.lineWidth = 3;
        this._selectedPoints.forEach(function (_point, _index) {
            if (_index == 0) {
                _ctx.moveTo(_point.x, _point.y);
            } else {
                _ctx.lineTo(_point.x, _point.y);
            }
        });
        _ctx.lineTo(point.x, point.y);
        _ctx.stroke();
        _ctx.closePath();

        return this;
    },
    createPoints: function createPoints() {
        var _size = this.props.size,
            _count = 0,
            _point = {};
        this._radius = this._canvas.width / (4 * _size + 2);
        this._selectedPoints = [];
        this._releasePoints = [];
        this._points = [];
        for (var i = 0; i < _size; i++) {
            for (var j = 0; j < _size; j++) {
                _count++;
                _point = {
                    x: j * this._radius * 4 + 3 * this._radius,
                    y: i * this._radius * 4 + 3 * this._radius,
                    index: _count
                };
                this._points.push(_point);
                this._releasePoints.push(_point);
            }
        }

        this.resetCanvas();
    },
    resetCanvas: function resetCanvas() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._points.forEach(function (value) {
            this.drawPointCircle(value.x, value.y);
        }.bind(this));
    },
    update: function update(point) {
        this.resetCanvas();
        this.drawSelectedPoints();
        this.drawSelectedPointsLines(point);

        var _point = point,
            _points = this._releasePoints,
            _temp = null;
        for (var i = 0, _len = _points.length; i < _len; i++) {
            _temp = _points[i];
            if (this.__isMatchPoint(_point, _temp)) {
                this._selectedPoints.push(_temp);
                this._releasePoints.splice(i, 1);
                this.drawSelectedPoints();
                break;
            }
        }
    },
    __bindEvents: function __bindEvents() {
        var _canvas = this._canvas;
        //touch event
        _canvas.addEventListener('touchstart', this.__startHandler, false);
        _canvas.addEventListener('touchmove', this.__moveHandler, false);
        _canvas.addEventListener("touchend", this.__endHandler, false);
        //document.addEventListener('touchmove', function(e){e.preventDefault();}, false);

        //mouse event
        _canvas.addEventListener('mousedown', this.__startHandler, false);
        _canvas.addEventListener('mousemove', this.__moveHandler, false);
        _canvas.addEventListener("mouseup", this.__endHandler, false);
        // document.addEventListener('mousemove', function(e){e.preventDefault();}, false);
    },
    __getEventPoint: function __getEventPoint(event) {
        var _rect = event.currentTarget.getBoundingClientRect(),
            _clientX = event.clientX,
            _clientY = event.clientY;

        if (_clientX === undefined || _clientY === undefined) {
            _clientX = event.touches[0].clientX;
            _clientY = event.touches[0].clientY;
        }

        return {
            x: _clientX - _rect.left,
            y: _clientY - _rect.top
        };
    },
    __isMatchPoint: function __isMatchPoint(currPoint, point) {
        return Math.abs(currPoint.x - point.x) < this._radius && Math.abs(currPoint.y - point.y) < this._radius;
    },
    __startHandler: function __startHandler(event) {
        event.preventDefault();
        var _point = this.__getEventPoint(event),
            _points = this._points,
            _temp = null;
        for (var i = 0, _len = _points.length; i < _len; i++) {
            _temp = _points[i];
            if (this.__isMatchPoint(_point, _temp)) {
                this._touching = true;
                this._selectedPoints.push(_temp);
                this._releasePoints.splice(i, 1);
                this.drawSelectedPoints();
                break;
            }
        }
    },
    __moveHandler: function __moveHandler(event) {
        if (this._touching) {
            this.update(this.__getEventPoint(event));
        }
    },
    __endHandler: function __endHandler(event) {
        var _this = this;

        if (this._touching) {
            this._touching = false;
            this.validate();
            setTimeout(function () {
                return _this.createPoints();
            }, this.props.delay);
        }
    },
    validate: function validate() {
        var _value = this._selectedPoints.map(function (point, index) {
            return point.index;
        });
        var _obj = {
            boolValue: false
        };
        if (this.state.value) {
            if (this.state.value === _value.join('&')) {
                this.drawSelectedPointsStatus('#2CFF26');
                _obj.boolValue = true;
                _obj.value = _value.join('&');
                _obj.arrayValue = _value;
            } else {
                this.drawSelectedPointsStatus('red');
            }
        } else {
            this.drawSelectedPointsStatus('#2CFF26');
            _obj.value = _value.join('&');
            _obj.arrayValue = _value;
        }
        this.setState(_obj);
        this.props.onChange && this.props.onChange(_obj);
    },
    reset: function reset() {
        this.setState({
            boolValue: false,
            arrayValue: null,
            value: null
        });
        this.createPoints();
        this.props.onChange && this.props.onChange({
            boolValue: false,
            arrayValue: null,
            value: null
        });
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'rt-line-lock' },
            React.createElement('canvas', { ref: 'canvas', width: this.props.width, height: this.props.height })
        );
    }
});