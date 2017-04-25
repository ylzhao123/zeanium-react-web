var React = require('react');
var ReactDOM = require('react-dom');

var SliderItem = React.createClass({
    displayName: 'SliderItem',
    getDefaultProps: function () {
        return {

        };
    },
    getInitialState: function () {
        return {

        };
    },
    render: function (){
        return (
            <div className="slider-item" >
                {this.props.children}
            </div>
        );
    }
});

var Slider = React.createClass({
    displayName:'Slider',
	getDefaultProps: function (){
		return {
            loop: true,
            triggerValue: 60,
            onSlidingStart: function (){

            },
            onSliding: function (){

            },
            onSlidingEnd: function (){

            }
		}
	},
	getInitialState: function(){
		return {
            vector: {
                x: 0,
                y: 0
            },
            step: 1,
            xValue: 0,
            yValue: 0,
            sliding: false
		}
	},
    componentDidMount: function (){
        this._touching = false;
        this._size = React.Children.count(this.props.children);
        this.__bindEvents();
    },
    __bindEvents: function (){
        var _container = ReactDOM.findDOMNode(this);
        this._width = _container.clientWidth;
        this._height = _container.clientHeight;

        //touch event
        _container.addEventListener('touchstart', this.__startHandler, false);
        _container.addEventListener('touchmove', this.__moveHandler, false);
        _container.addEventListener("touchend", this.__endHandler, false);
        document.addEventListener('touchmove', function(event){
            //event.preventDefault();
            event.stopPropagation();
        }, false);

        //mouse event
        _container.addEventListener('mousedown', this.__startHandler, false);
        _container.addEventListener('mousemove', this.__moveHandler, false);
        _container.addEventListener("mouseup", this.__endHandler, false);
        document.addEventListener('mousemove', function(event){
            //event.preventDefault();
            event.stopPropagation();
        }, false);

    },
    __getEventPoint: function (event){
        var _x = event.pageX,
            _y = event.pageY;
        if(event.targetTouches){
            _x = event.targetTouches[0].pageX;
            _y = event.targetTouches[0].pageY;
        }

        return {
            x: _x,
            y: _y
        }
    },
    __easing: function (value, maxValue){
        return (maxValue / 2.5) * Math.sin(value / maxValue * (Math.PI / 2));
    },
    __startHandler: function (event){
        if(this.state.sliding){
            return false;
        }
        this.stopAutoPlay();
        if(this.state.xValue || this.state.yValue){
            this.__onTransitionEnd();
        }
        event.preventDefault();  //如果使用这句话手机端，页面将禁止手滑
        this._touching = true;
        this._start = this.__getEventPoint(event);
        console.log(this._start);
    },
    __moveHandler: function (event){
        if(this._touching){
            var _point = this.__getEventPoint(event);
            var _result = this.props.onMove && this.props.onMove(this._start, _point);
            if(_result!==false){
                var _vx = _point.x - this._start.x,
                    _vy = _point.y - this._start.y,
                    _yValue = _vy;

                if(_vy > this.props.triggerValue){
                    _vy = this.props.triggerValue + (_vy - this.props.triggerValue)/3;
                }

                if(this.props.loop){
                    if(this.state.step == 0){
                        if(_vx>0){
                            _vx = this.__easing(_vx, this._width);
                        }
                        if(_vy>0){
                            _vy = this.__easing(_vy, this._height);
                        }
                    }else if(this.state.step == this._size) {
                        if(_vx<0){
                            _vx = -this.__easing(-_vx, this._width);
                        }
                        if(_vy<0){
                            _vy = -this.__easing(-_vy, this._height);
                        }
                    }
                }

                if(_vx>0||_vy>0){
                    event.preventDefault();
                    this.setState({
                        xValue: _vx,
                        yValue: _vy
                    });
                }
            }
        }
    },
    __endHandler: function (event) {
        if(this._touching){
            this._touching = false;
            if(this.state.yValue>0){
                if(this.state.yValue < this.props.maxHeight){
                    this.setState({
                        yValue: 0,
                        step: 1
                    });
                }else if(this.state.yValue > this.props.maxHeight) {
                    this.setState({
                        yValue: this.props.maxHeight,
                        step: 4,
                        loading: true
                    });
                    setTimeout(()=>this.setState({
                        yValue: 0,
                        step: 1,
                        loading: false
                    }), 3000);
                }
            }else {
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

    __getContentStyles: function (){
        var _yValue = this.state.yValue;
        if(_yValue > 0){
            return {
                transform: 'translateY('+_yValue+'px)'
            };
        }else {
            return;
            return {
                transform: 'translateY(' + (_yValue/3) + 'px)'
            };
        }
    },
    stopAutoPlay: function (){
        if(!this.props.autoPlayInterval||!this._autoPlayIntervalId){
            return;
        }
        clearInterval(this._autoPlayIntervalId);
        this._autoPlayIntervalId = 0;
    },
    startAutoPlay: function (){
        if(this._autoPlayIntervalId || !this.props.autoPlayInterval){
            return;
        }
        this._autoPlayIntervalId = setInterval(()=>this.step(1), this.props.autoPlayInterval);
    },
    __onTransitionEnd: function (){

    },
    render: function (){
        var _transitionX = 1;
        return (
            <div className={"rt-slider "}>
                <div className={"slider-views "+""}
                    onTransitionEnd={this.__onTransitionEnd}
                    style={{WebkitTransform: 'translate3d(' + _transitionX + ',0,0)'}}>
                    {
                        React.Children.map(this.props.children, function (child, index){
                            return child;
                        })
                    }
                </div>
                <div className="slider-dots">

                </div>
            </div>
        );
    }
});

Slider.Item = SliderItem;

module.exports = Slider;
