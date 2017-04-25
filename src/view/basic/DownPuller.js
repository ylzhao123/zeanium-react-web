var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
    displayName:'DownPuller',
	getDefaultProps: function (){
		return {
            className: '',
            maxHeight: 60,
            onDownPull: function (self){
                setTimeout(()=>self.reset(), 1000);
            },
            onUpPull: function (self){
                setTimeout(()=>self.reset(), 1000);
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
            yValue: 0,
            loading: false
		}
	},
    componentDidMount: function (){
        this._touching = false;
        this.__bindEvents();
    },
    __bindEvents: function (){
        var _container = ReactDOM.findDOMNode(this);
        this._container = _container;
        //touch event
        _container.addEventListener('touchstart', this.__startHandler, false);
        _container.addEventListener('touchmove', this.__moveHandler, false);
        _container.addEventListener("touchend", this.__endHandler, false);
        document.addEventListener('touchmove', function(event){
            event.stopPropagation();
        }, false);

        //mouse event
        _container.addEventListener('mousedown', this.__startHandler, false);
        _container.addEventListener('mousemove', this.__moveHandler, false);
        _container.addEventListener("mouseup", this.__endHandler, false);
        document.addEventListener('mousemove', function(event){
            event.stopPropagation();
        }, false);

    },
    __startHandler: function (event){
        if(this.state.loading){
            return false;
        }
        if(this.__getScrollTop()==0){
            this._touching = true;
            this._start = this.__getEventPoint(event);
        }else {
            event.preventDefault();  //如果使用这句话手机端，页面将禁止手滑
        }
    },
    __moveHandler: function (event){
        if(this._touching){
            var _point = this.__getEventPoint(event);
            var _result = this.props.onMove && this.props.onMove(this._start, _point);
            if(_result!==false){
                var _vx = _point.x - this._start.x,
                    _vy = _point.y - this._start.y,
                    _yValue = _vy;
                console.log(_yValue, this.__getScrollTop());
                if(_yValue<0){
                    //event.preventDefault();
                    //return false;
                }
                if((_yValue > 0 && this.__getScrollTop()==0)){
                    event.preventDefault();
                    this.state.step = 2;
                    if(_vy > this.props.maxHeight){
                        this.state.step = 3;
                        _yValue = this.props.maxHeight + (_vy - this.props.maxHeight)/3;
                    }

                    this.setState({
                        yValue: _yValue,
                        step: this.state.step
                    });
                }else {
                    //event.preventDefault();
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
                    this.props.onDownPullEnd&&this.props.onDownPullEnd(this);
                }
            }else {
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
    reset: function (){
        this.setState({
            yValue: 0,
            step: 1,
            loading: false
        });
    },
    __getScrollTop: function (){
        return this._container.parentNode.scrollTop;
    },
    __getClientHeight: function (){
        return this._container.parentNode.clientHeight;
    },
    __getScrollHeight: function (){
        return Math.max(document.body.scrollHeight, this._container.parentNode.scrollHeight);
    },
    __ifHandlerDown: function (){
        var _v1 = this.__getScrollTop() + this.__getClientHeight(),
            _v2 = this.__getScrollHeight();

        return _v1 >= _v2;
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
    __getContentStyles: function (){
        var _yValue = this.state.yValue;
        if(_yValue > 0){
            return {
                transform: 'translateY('+_yValue+'px)'
            };
        }else {
            return {
                transform: 'translateY(' + (_yValue/3) + 'px)'
            };
        }
    },
    __downRender: function (){
        switch (this.state.step) {
            case 2:
                return (
                    <div className="tip down-refresh">
                        <i className="fa fa-angle-down"/>
                        <span>下拉刷新</span>
                    </div>
                );
            case 3:
                return (
                    <div className="tip down-refresh">
                        <i className="fa fa-angle-up"/>
                        <span>释放加载</span>
                    </div>
                );
            case 4:
                return (
                    <div className="tip down-refresh">
                        <i className="fa fa-spinner rt-self-loading"/>
                        <span>正在加载中...</span>
                    </div>
                );
        }

        return null;
    },
    render: function (){
        return (
            <div className={"rt-down-puller " + this.props.className}>
                {this.__downRender()}
                <div className="content" style={this.__getContentStyles()}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});
