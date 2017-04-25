var React = require('react');
var ReactDOM = require('react-dom');

var SliderItem = React.createClass({
    displayName: 'SliderItem',
    getDefaultProps: function () {
        return {
            className: ''
        };
    },
    getInitialState: function () {
        return {

        };
    },
    render: function (){
        return (
            <div className={"slider-item " + this.props.className} style={this.props.style} >
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
            autoPlayInterval: 2000,
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
            step: 0,
            xValue: 0,
            yValue: 0,
            sliding: false,
            currentIndex: 0
		}
	},
    componentDidMount: function (){
        this._touching = false;
        this.__bindEvents();
        if(this.props.autoPlayInterval){
            this.startAutoPlay();
        }
    },
    componentWillUnmount: function (){
        this.stopAutoPlay();
    },
    size: function (){
        return this._container.firstChild.childNodes.length - 2;
    },
    __bindEvents: function (){
        var _container = this._container = ReactDOM.findDOMNode(this);
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
    __fixIndex: function (index){
        if(index < 0){
            return this._size - 1;
        } else if(index > (this._size - 1)){
            return 0;
        }

        return index;
    },
    __startHandler: function (event){
        /*
        if(this._touching || this.state.sliding){
            return false;
        }*/
        this._size = this.size();
        this.stopAutoPlay();
        if(this.state.xValue || this.state.yValue){
            this.__onTransitionEnd();
        }
        this._touching = true;
        this._start = this.__getEventPoint(event);
        this.setState({
            sliding: false
        });
    },
    __moveHandler: function (event){
        if(this._touching){
            var _point = this.__getEventPoint(event);
            var _result = this.props.onMove && this.props.onMove(this._start, _point);
            if(_result!==false){
                var _vx = _point.x - this._start.x,
                    _vy = _point.y - this._start.y,
                    _realX, _realY;

                /*
                if(_vy > this.props.triggerValue){
                    _vy = this.props.triggerValue + (_vy - this.props.triggerValue)/3;
                }*/

                if(!this.props.loop){
                    if(this.state.currentIndex == 0){
                        if(_vx>0){
                            _realX = this.__easing(_vx, this._width);
                        }
                        if(_vy>0){
                            _realY = this.__easing(_vy, this._height);
                        }

                    }else if(this.state.currentIndex == (this._size - 1)) {
                        if(_vx < 0){
                            _realX = -this.__easing(-_vx, this._width);
                        }
                        if(_vy < 0){
                            _realY = -this.__easing(-_vy, this._height);
                        }
                    }
                }

                if(Math.abs(_vx) > 5 && !_realX) {
                    _realX = _vx;
                }

                if(Math.abs(_vy) > 5 && !_realY) {
                    _realY = _vy;
                }

                if(_realX || _realY){
                    event.preventDefault();
                    this.setState({
                        xValue: _realX,
                        yValue: _realY
                    });
                }
            }
        }
    },
    __endHandler: function (event) {
        if(this._touching){
            this._touching = false;
            //return;
            var _able = Math.abs(this.state.xValue) > this.props.triggerValue;

            if(!this.props.loop){
                if((this.state.currentIndex == 0 && this.state.xValue > 0)||(this.state.currentIndex == this._size - 1 && this.state.xValue < 0)){
                    if(_able){
                        this.props.onSlidingEnd && this.props.onSlidingEnd(this.state.currentIndex);
                    }
                    return this.step(0);
                }
            }
            if(_able){
                this.step(this.state.xValue>0?-1:1);
            }else {
                this.step(0);
            }
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
        this._autoPlayIntervalId = setInterval(function (){
            if(this._size>1){
                this.step(1);
            }
        }.bind(this), this.props.autoPlayInterval);
    },
    step: function (value){
        if(this.state.step){
            this.__onTransitionEnd();
        }
        var _update = {
            sliding: true
        };

        if(value){
            _update.step = value;
        }else {
            _update.xValue = 0;
        }

        this.setState(_update);
    },
    __onTransitionEnd: function (){
        this.setState({
            step: 0,
            xValue: 0,
            sliding: false,
            currentIndex: this.__fixIndex(this.state.currentIndex + this.state.step)
        });
        this.startAutoPlay();
    },
    __preChildrenHandler: function (){
        var _children = this.props.children;
        if(!_children.length){
            _children = [_children];
        }

        return _children.slice(-1).concat(_children).concat(_children[0]);
    },
    render: function (){
        var _transitionX = this.state.step?(-this.state.step * 33.333 + '%'):(this.state.xValue + 'px');
        var _children = this.__preChildrenHandler(),
            _currentIndex = this.state.currentIndex,
            _size = _children.length,
            _diff = null;
        if(_size<2){
            return;
        }

        return (
            <div className={'rt-slider '+(this.props.loop?'':'no-loop')} style={this.props.style} >
                <div className={'slider-views '+ (this.state.sliding?'sliding':'')}
                    onTransitionEnd={this.__onTransitionEnd}
                    style={{WebkitTransform: 'translate3d(' + _transitionX + ',0,0)'}}>
                    {
                        _children.map(function (child, index){
                            _diff = index - _currentIndex;
                            return <div key={index} className={(_diff >= 0 && _diff <= 2)?'rs-item':'rs-hidden'}>{child}</div>;
                        })
                    }
                </div>
                <div className='slider-dots'>
                    {
                        Array(_size-2).fill(1).map((value, index) =>{
                            return <i className={'dot ' + (index==_currentIndex?'curr':'')} key={index} />;
                        })
                    }
                </div>
            </div>
        );
    }
});

Slider.Item = SliderItem;

module.exports = Slider;
