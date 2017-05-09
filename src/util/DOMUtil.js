var StyleUtil = require('./StyleUtil');

module.exports = {
    hasClass: function (target, className) {
        return target.classList.contains(className);
    },
    addClass: function (target) {
        var classList = target.classList;
        arguments.shift();
        return classList.add.apply(classList, arguments);
    },
    removeClass: function (target) {
        var classList = target.classList;
        arguments.shift();
        return classList.remove.apply(classList, arguments);
    },
    toggleClass: function (target, inClassName) {
        return  target.classList.toggle(inClassName);
    },
    setStyle: function (target, inName, inValue) {
        var property = StyleUtil.getStyleProperty(inName);
        target.style[property] = StyleUtil.getStyleValue(inName,inValue);
    },
    getStyle: function (target, inName, isInline) {
        var element = target,
            property = StyleUtil.getStyleProperty(inName),
            styles = isInline ? target.style : (window.getComputedStyle?getComputedStyle(element, null):element.currentStyle);

        return styles[property] || '';
    },
    removeStyle: function (target, inName) {
        var property = StyleUtil.getStyleProperty(inName,true);
        target.style.removeProperty(property);
    },
    hasStyle: function (target, inName) {
        //todo:height/line-height
        //fix bug
        var cssText = target.style.cssText;
        return cssText.indexOf(inName + ':') > -1;
    },
    setStyles: function (target, inStyles) {
        target.style.cssText += StyleUtil.getCssText(inStyles);
    },
    getPosition: function (target){
        var _target = target,
            _x = 0, _y = 0, _w = 0, _h = 0;

        if(_target.getBoundingClientRect){
            var _bounding = _target.getBoundingClientRect();
            _x = _bounding.left + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft) - document.documentElement.clientLeft;
            _y = _bounding.top + Math.max(document.documentElement.scrollTop, document.body.scrollTop) - document.documentElement.clientTop;
            _w = _bounding.width;
            _h = _bounding.height;
        } else {
            while (_target != document.body) {
                if(!_target){ break; }
                _x += _target.offsetLeft;
                _y += _target.offsetTop;
                _target = _target.offsetParent;
            }
            _w = _target.offsetWidth;
            _h = _target.offsetHeight;
        }

        /*
        while (_target != document.body) {
            if(!_target){ break; }
            _x += _target.offsetLeft + _target.scrollLeft || 0;
            _y += _target.offsetTop + _target.scrollTop || 0;
            _target = _target.offsetParent;
        }
        _w = target.offsetWidth;
        _h = target.offsetHeight;*/

        return {
            x: _x,
            y: _y,
            width: _w,
            height: _h
        }
    },
    on: function(target, event, handler){
        if (target.addEventListener) {
            target.addEventListener(event, handler, false);
        } else if (element.attachEvent) {
            target.attachEvent('on' + event, handler);
        } else {
            target['on' + event] = handler;
        }
    },
    off:function(target, event, handler){
        if (target.removeEventListener) {
            target.removeEventListener(event, handler, false);
        } else if (target.detachEvent) {
            target.detachEvent('on' + event, handler);
        } else {
            target['on' + event] = null;
        }
    }
}
