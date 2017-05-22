var React = require('react');
var ReactDOM = require('react-dom');

var SliderItem = React.createClass({
    displayName: 'SliderItem',
    getDefaultProps: function getDefaultProps() {
        return {};
    },
    getInitialState: function getInitialState() {
        return {};
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'slider-item' },
            this.props.children
        );
    }
});

var Slider = React.createClass({
    displayName: 'Slider',
    getDefaultProps: function getDefaultProps() {
        return {
            loop: true,
            triggerValue: 60,
            onSlidingStart: function onSlidingStart() {},
            onSliding: function onSliding() {},
            onSlidingEnd: function onSlidingEnd() {}
        };
    },
    getInitialState: function getInitialState() {
        return {
            vector: {
                x: 0,
                y: 0
            },
            step: 1,
            xValue: 0,
            yValue: 0,
            sliding: false
        };
    },
    componentDidMount: function componentDidMount() {
        this._touching = false;
        this._size = React.Children.count(this.props.children);
        this.__bindEvents();
    },
    __bindEvents: function __bindEvents() {
        var _container = ReactDOM.findDOMNode(this);
        this._width = _container.clientWidth;
        this._height = _container.clientHeight;

        //touch event
        _container.addEventListener('touchstart', this.__startHandler, false);
        _container.addEventListener('touchmove', this.__moveHandler, false);
        _container.addEventListener("touchend", this.__endHandler, false);
        document.addEventListener('touchmove', function (event) {
            //event.preventDefault();
            event.stopPropagation();
        }, false);

        //mouse event
        _container.addEventListener('mousedown', this.__startHandler, false);
        _container.addEventListener('mousemove', this.__moveHandler, false);
        _container.addEventListener("mouseup", this.__endHandler, false);
        document.addEventListener('mousemove', function (event) {
            //event.preventDefault();
            event.stopPropagation();
        }, false);
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
    __easing: function __easing(value, maxValue) {
        return maxValue / 2.5 * Math.sin(value / maxValue * (Math.PI / 2));
    },
    __startHandler: function __startHandler(event) {
        if (this.state.sliding) {
            return false;
        }
        this.stopAutoPlay();
        if (this.state.xValue || this.state.yValue) {
            this.__onTransitionEnd();
        }
        event.preventDefault(); //如果使用这句话手机端，页面将禁止手滑
        this._touching = true;
        this._start = this.__getEventPoint(event);
        console.log(this._start);
    },
    __moveHandler: function __moveHandler(event) {
        if (this._touching) {
            var _point = this.__getEventPoint(event);
            var _result = this.props.onMove && this.props.onMove(this._start, _point);
            if (_result !== false) {
                var _vx = _point.x - this._start.x,
                    _vy = _point.y - this._start.y,
                    _yValue = _vy;

                if (_vy > this.props.triggerValue) {
                    _vy = this.props.triggerValue + (_vy - this.props.triggerValue) / 3;
                }

                if (this.props.loop) {
                    if (this.state.step == 0) {
                        if (_vx > 0) {
                            _vx = this.__easing(_vx, this._width);
                        }
                        if (_vy > 0) {
                            _vy = this.__easing(_vy, this._height);
                        }
                    } else if (this.state.step == this._size) {
                        if (_vx < 0) {
                            _vx = -this.__easing(-_vx, this._width);
                        }
                        if (_vy < 0) {
                            _vy = -this.__easing(-_vy, this._height);
                        }
                    }
                }

                if (_vx > 0 || _vy > 0) {
                    event.preventDefault();
                    this.setState({
                        xValue: _vx,
                        yValue: _vy
                    });
                }
            }
        }
    },
    __endHandler: function __endHandler(event) {
        var _this = this;

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
                    setTimeout(function () {
                        return _this.setState({
                            yValue: 0,
                            step: 1,
                            loading: false
                        });
                    }, 3000);
                }
            } else {
                /*
                this.setState({
                    yValue: 0,
                    step: 5,
                    loading: true
                });
                setTimeout(()=>this.setState({
                    yValue: 0,
                    step: 1,
                    loading: false
                }), 3000);
                */
            }
        }
    },

    __getContentStyles: function __getContentStyles() {
        var _yValue = this.state.yValue;
        if (_yValue > 0) {
            return {
                transform: 'translateY(' + _yValue + 'px)'
            };
        } else {
            return;
            return {
                transform: 'translateY(' + _yValue / 3 + 'px)'
            };
        }
    },
    stopAutoPlay: function stopAutoPlay() {
        if (!this.props.autoPlayInterval || !this._autoPlayIntervalId) {
            return;
        }
        clearInterval(this._autoPlayIntervalId);
        this._autoPlayIntervalId = 0;
    },
    startAutoPlay: function startAutoPlay() {
        var _this2 = this;

        if (this._autoPlayIntervalId || !this.props.autoPlayInterval) {
            return;
        }
        this._autoPlayIntervalId = setInterval(function () {
            return _this2.step(1);
        }, this.props.autoPlayInterval);
    },
    __onTransitionEnd: function __onTransitionEnd() {},
    render: function render() {
        var _transitionX = 1;
        return React.createElement(
            'div',
            { className: "rt-slider " },
            React.createElement(
                'div',
                { className: "slider-views " + "",
                    onTransitionEnd: this.__onTransitionEnd,
                    style: { WebkitTransform: 'translate3d(' + _transitionX + ',0,0)' } },
                React.Children.map(this.props.children, function (child, index) {
                    return child;
                })
            ),
            React.createElement('div', { className: 'slider-dots' })
        );
    }
});

Slider.Item = SliderItem;

module.exports = Slider;