'use strict';

var tempElement = document.createElement('div'),
    tempStyle = tempElement.style;
var rsizeElement = /width|height|top|right|bottom|left|size|margin|padding/i,
    rHasUnit = /[c-x%]/,
    PX = 'px',
    rUpperCameCase = /(?:^|-)([a-z])/g,
    rDeCameCase = /([A-Z])/g;

var cssNumber = {
    'lineHeight': true,
    'zIndex': true,
    'zoom': true
};

var styleHooks = {
    float: 'cssFloat'
};

module.exports = {
    each: function each(target, callback, context) {
        if (target && callback) {
            var length = target.length;
            if (length >= 0) {
                for (var i = 0; i < length; i++) {
                    callback.call(context, target[i], i);
                }
            } else {
                for (var key in target) {
                    if (target.hasOwnProperty(key)) {
                        callback.call(context, target[key], key);
                    }
                }
            }
        }
    },
    getCssText: function getCssText(inStyles) {
        var cssText = [''];
        this.each(inStyles, function (styleValue, styleName) {
            cssText.push(this.getStyleProperty(styleName, true) + ':' + this.getStyleValue(styleName, styleValue));
        }, this);
        return cssText.join(';');
    },
    getStyleValue: function getStyleValue(inName, inValue) {
        var property = this.getStyleProperty(inName);
        var value = inValue;
        if (rsizeElement.test(property)) {
            if (!rHasUnit.test(inValue) && !cssNumber[property]) {
                value += PX;
            }
        }
        return value;
    },
    getStyleProperty: function getStyleProperty(inName, isLowerCase) {
        var property = this.lowerCamelCase(inName);
        if (property in tempStyle) {
            if (isLowerCase) {
                property = this.deCamelCase(inName);
            }
        } else {
            if (isLowerCase) {
                property = env.prefix()[1] + inName;
            } else {
                property = env.prefix()[0] + this.upperCamelCase(inName);
            }
        }
        return styleHooks[inName] || property;
    },
    lowerCamelCase: function lowerCamelCase(inName) {
        var _camelizeString = this.upperCamelCase(inName);
        return _camelizeString.charAt(0).toLowerCase() + _camelizeString.substring(1);
    },
    upperCamelCase: function upperCamelCase(inName) {
        return inName.replace(rUpperCameCase, function (match, group1) {
            return group1.toUpperCase();
        });
    },
    deCamelCase: function deCamelCase(inName) {
        return inName.replace(rDeCameCase, function (match, group1) {
            return '-' + group1.toLowerCase();
        });
    },
    capitalize: function capitalize(inString) {
        return inString.charAt(0).toUpperCase() + inString.slice(1);
    }
};