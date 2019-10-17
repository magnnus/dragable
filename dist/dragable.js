/*!
 * @autots/dragable v0.0.2
 * Last Modified @ 2019-10-17 4:14:33 PM
 * Released under the MIT License.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Dragable"] = factory();
	else
		root["AutoTs"] = root["AutoTs"] || {}, root["AutoTs"]["Dragable"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
;
var Dragable = /** @class */ (function () {
    function Dragable(selector, config) {
        var _this = this;
        if (config === void 0) { config = {}; }
        this.selector = selector;
        this.config = config;
        this.dragListener = function (e) {
            _this.draging = true;
            var rect = _this.target.getBoundingClientRect();
            var disX = e.pageX - rect.left;
            var disY = e.pageY - rect.top;
            var move = function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (_this.draging) {
                    var rect_1 = _this.getContainerRect();
                    var clientHeight = rect_1.height;
                    var clientWidth = rect_1.width;
                    var top_1 = e.pageY - disY;
                    var left = e.pageX - disX;
                    if (_this.container !== window) {
                        var rect_2 = _this.container.getBoundingClientRect();
                        top_1 -= rect_2.top;
                        left -= rect_2.left;
                    }
                    if (top_1 < 0) {
                        top_1 = 0;
                    }
                    else if (clientHeight - top_1 < _this.target.offsetHeight) {
                        top_1 = clientHeight - _this.target.offsetHeight;
                    }
                    if (left < 0) {
                        left = 0;
                    }
                    else if (clientWidth - left < _this.target.offsetWidth) {
                        left = clientWidth - _this.target.offsetWidth;
                    }
                    _this.target.style.top = top_1 + 'px';
                    _this.target.style.left = left + 'px';
                    _this.target.style.right = 'auto';
                }
            };
            var stop = function () {
                _this.draging = false;
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', stop);
            };
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', stop);
        };
        // step 1. init target
        if (typeof selector !== 'string') {
            throw new Error('Wrong Type: the selector param must be a String!');
        }
        this.target = document.querySelector(selector);
        if (!this.target) {
            throw new Error("Not Found: the element can't be found with the 'selector' param");
        }
        // step 2. init dragArea
        if (!config.dragArea) {
            this.dragArea = [this.target];
        }
        else if (typeof config.dragArea === 'string') {
            this.dragArea = this.target.querySelectorAll(config.dragArea);
            if (!this.dragArea) {
                throw new Error("Not Found: this 'dragArea' elements can't be found in the 'selector' element");
            }
        }
        else {
            throw new Error('Wrong Type: the dragArea param must be a String');
        }
        // step 3. init container
        if (config.container === window || config.container === document || !config.container) {
            this.container = window;
        }
        else if (typeof config.container === 'string') {
            this.container = document.querySelector(config.container);
            if (!this.container.contains(this.target)) {
                throw new Error("Not Found: the 'selector' element can't be found in the 'container' element");
            }
        }
        else {
            throw new Error('Wrong Type: the container param must be a String or Window / Document object!');
        }
        // step 3. init optional params
        if (!config.zIndex) {
            this.config.zIndex = 999;
        }
        // step 4. init event
        this.init();
    }
    Dragable.prototype.getContainerRect = function () {
        if (this.container === window) {
            return {
                width: window.innerWidth,
                height: window.innerHeight,
            };
        }
        if (this.container instanceof HTMLElement) {
            return {
                width: this.container.offsetWidth,
                height: this.container.offsetHeight,
            };
        }
    };
    Dragable.prototype.init = function () {
        var _this = this;
        if (this.container === window) {
            this.target.style.cssText = "position: fixed; z-index: " + this.config.zIndex;
        }
        else {
            this.target.style.cssText = "position: absolute; z-index: " + this.config.zIndex;
        }
        this.draging = false;
        Array.prototype.slice.call(this.dragArea).forEach(function (el) {
            el.addEventListener('mousedown', _this.dragListener, false);
        });
    };
    Dragable.prototype.destroy = function () {
        var _this = this;
        this.draging = false;
        Array.prototype.slice.call(this.dragArea).forEach(function (el) {
            el.removeEventListener('mousedown', _this.dragListener, false);
        });
    };
    return Dragable;
}());
exports.default = Dragable;
;


/***/ })
/******/ ])["default"];
});