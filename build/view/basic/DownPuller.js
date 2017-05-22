var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
    displayName: 'DownPuller',
    getDefaultProps: function getDefaultProps() {
        return {
            className: '',
            maxHeight: 60,
            onDownPull: function onDownPull(self) {
                setTimeout(function () {
                    return self.reset();
                }, 1000);
            },
            onUpPull: function onUpPull(self) {
                setTimeout(function () {
                    return self.reset();
                }, 1000);
            }
        };
    },
    getInitialState: function getInitialState() {
        return {
            vector: {
                x: 0,
                y: 0
            },
            step: 1,
            yValue: 0,
            loading: false
        };
    },
    componentDidMount: function componentDidMount() {
        this._touching = false;
        this.__bindEvents();
    },
    __bindEvents: function __bindEvents() {
        var _container = ReactDOM.findDOMNode(this);
        this._container = _container;
        //touch event
        _container.addEventListener('touchstart', this.__startHandler, false);
        _container.addEventListener('touchmove', this.__moveHandler, false);
        _container.addEventListener("touchend", this.__endHandler, false);
        document.addEventListener('touchmove', function (event) {
            event.stopPropagation();
        }, false);

        //mouse event
        _container.addEventListener('mousedown', this.__startHandler, false);
        _container.addEventListener('mousemove', this.__moveHandler, false);
        _container.addEventListener("mouseup", this.__endHandler, false);
        document.addEventListener('mousemove', function (event) {
            event.stopPropagation();
        }, false);
    },
    __startHandler: function __startHandler(event) {
        if (this.state.loading) {
            return false;
        }
        if (this.__getScrollTop() == 0) {
            this._touching = true;
            this._start = this.__getEventPoint(event);
        } else {
            event.preventDefault(); //如果使用这句话手机端，页面将禁止手滑
        }
    },
    __moveHandler: function __moveHandler(event) {
        if (this._touching) {
            var _point = this.__getEventPoint(event);
            var _result = this.props.onMove && this.props.onMove(this._start, _point);
            if (_result !== false) {
                var _vx = _point.x - this._start.x,
                    _vy = _point.y - this._start.y,
                    _yValue = _vy;
                console.log(_yValue, this.__getScrollTop());
                if (_yValue < 0) {
                    //event.preventDefault();
                    //return false;
                }
                if (_yValue > 0 && this.__getScrollTop() == 0) {
                    event.preventDefault();
                    this.state.step = 2;
                    if (_vy > this.props.maxHeight) {
                        this.state.step = 3;
                        _yValue = this.props.maxHeight + (_vy - this.props.maxHeight) / 3;
                    }

                    this.setState({
                        yValue: _yValue,
                        step: this.state.step
                    });
                } else {
                    //event.preventDefault();
                }
            }
        }
    },
    __endHandler: function __endHandler(event) {
        if (this._touching) {
            this._touching = false;
            if (this.state.yValue > 0) {
                if (this.state.yValue < this.props.maxHeight) {
                    this.setState({
                        yValue: 0,
                        step: 1
                    });
                } else if (this.state.yValue > this.props.maxHeight) {
                    this.setState({
                        yValue: this.props.maxHeight,
                        step: 4,
                        loading: true
                    });
                    this.props.onDownPullEnd && this.props.onDownPullEnd(this);
                }
            } else {
                /*
                if(this.__ifHandlerDown()){
                    this.setState({
                        yValue: 0,
                        step: 5,
                        loading: true
                    });
                    this.props.onUpPullEnd&&this.props.onUpPullEnd(this);
                }*/
            }
        }
    },
    reset: function reset() {
        this.setState({
            yValue: 0,
            step: 1,
            loading: false
        });
    },
    __getScrollTop: function __getScrollTop() {
        return this._container.parentNode.scrollTop;
    },
    __getClientHeight: function __getClientHeight() {
        return this._container.parentNode.clientHeight;
    },
    __getScrollHeight: function __getScrollHeight() {
        return Math.max(document.body.scrollHeight, this._container.parentNode.scrollHeight);
    },
    __ifHandlerDown: function __ifHandlerDown() {
        var _v1 = this.__getScrollTop() + this.__getClientHeight(),
            _v2 = this.__getScrollHeight();

        return _v1 >= _v2;
    },
    __getEventPoint: function __getEventPoint(event) {
        var _x = event.pageX,
            _y = event.pageY;
        if (event.targetTouches) {
            _x = event.targetTouches[0].pageX;
            _y = event.targetTouches[0].pageY;
        }

        return {
            x: _x,
            y: _y
        };
    },
    __getContentStyles: function __getContentStyles() {
        var _yValue = this.state.yValue;
        if (_yValue > 0) {
            return {
                transform: 'translateY(' + _yValue + 'px)'
            };
        } else {
            return {
                transform: 'translateY(' + _yValue / 3 + 'px)'
            };
        }
    },
    __downRender: function __downRender() {
        switch (this.state.step) {
            case 2:
                return React.createElement(
                    'div',
                    { className: 'tip down-refresh' },
                    React.createElement('i', { className: 'fa fa-angle-down' }),
                    React.createElement(
                        'span',
                        null,
                        '\u4E0B\u62C9\u5237\u65B0'
                    )
                );
            case 3:
                return React.createElement(
                    'div',
                    { className: 'tip down-refresh' },
                    React.createElement('i', { className: 'fa fa-angle-up' }),
                    React.createElement(
                        'span',
                        null,
                        '\u91CA\u653E\u52A0\u8F7D'
                    )
                );
            case 4:
                return React.createElement(
                    'div',
                    { className: 'tip down-refresh' },
                    React.createElement('i', { className: 'fa fa-spinner rt-self-loading' }),
                    React.createElement(
                        'span',
                        null,
                        '\u6B63\u5728\u52A0\u8F7D\u4E2D...'
                    )
                );
        }

        return null;
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: "rt-down-puller " + this.props.className },
            this.__downRender(),
            React.createElement(
                'div',
                { className: 'content', style: this.__getContentStyles() },
                this.props.children
            )
        );
    }
});