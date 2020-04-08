/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./core/js/horizontal-scrolling.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./core/js/horizontal-scrolling.js":
/*!*****************************************!*\
  !*** ./core/js/horizontal-scrolling.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

jQuery(document).ready(function ($) {
  var table = document.querySelector('.wp-list-table');

  if (table) {
    AdminColumns.HorizontalScrolling = new HorizontalScrolling(table);
    jQuery('#acp_overflow_list_screen_table-yes').on('click', function () {
      if ($(this).is(':checked')) {
        AdminColumns.HorizontalScrolling.enable();
        AdminColumns.HorizontalScrolling.store();
      } else {
        AdminColumns.HorizontalScrolling.disable();
        AdminColumns.HorizontalScrolling.store();
      }
    });
  }
});
var CONST = {
  BODY_CLASS: 'acp-overflow-table',
  WRAPPER_CLASS: 'acp-hts-wrapper',
  OVERFLOW_CLASS: '-overflow',
  MORE_CLASS: '-more',
  LESS_CLASS: '-less'
};

var HorizontalScrolling =
/*#__PURE__*/
function () {
  function HorizontalScrolling(table) {
    _classCallCheck(this, HorizontalScrolling);

    this.enabled = document.body.classList.contains(CONST.BODY_CLASS);
    this.table = table;
    this.wrapper = new TableWrapper(this.table);
    this.indicator = new ScrollIndicator(this.table, this.wrapper);

    if (this.isEnabled()) {
      this.wrapper.wrap();
      this.wrapper.enable();

      if (ACP_Horizontal_Scrolling.hasOwnProperty('indicator_enabled') && ACP_Horizontal_Scrolling.indicator_enabled) {
        this.indicator.enable();
      }
    }
  }

  _createClass(HorizontalScrolling, [{
    key: "isEnabled",
    value: function isEnabled() {
      return this.enabled;
    }
  }, {
    key: "enable",
    value: function enable() {
      document.body.classList.add(CONST.BODY_CLASS);
      this.enabled = true;
      this.wrapper.wrap();
      this.wrapper.enable();
      this.wrapper.checkWrapperState();
      this.indicator.enable();
    }
  }, {
    key: "disable",
    value: function disable() {
      this.wrapper.disable();
      this.enabled = false;
      this.indicator.disable();
      document.body.classList.remove(CONST.BODY_CLASS);
    }
  }, {
    key: "checkWrapperState",
    value: function checkWrapperState() {
      var total = this.table.scrollWidth;
      var width = this.table.offsetWidth;
      var scrollLeft = this.table.scrollLeft;
      var wrapper = document.querySelector('.acp-table-wrapper');
      wrapper.classList.remove('-overflow', '-more', '-less');

      if (total > width) {
        wrapper.classList.add('-overflow');

        if (scrollLeft + width + 10 < total) {
          wrapper.classList.add('-more');
        }

        if (scrollLeft > 0) {
          wrapper.classList.add('-less');
        }
      }
    }
  }, {
    key: "store",
    value: function store() {
      jQuery.post(ajaxurl, {
        action: 'acp_update_table_option_overflow',
        value: this.isEnabled(),
        layout: AC.layout,
        list_screen: AC.list_screen,
        _ajax_nonce: AC.ajax_nonce
      });
    }
  }]);

  return HorizontalScrolling;
}();

var TableWrapper =
/*#__PURE__*/
function () {
  function TableWrapper(table) {
    _classCallCheck(this, TableWrapper);

    this.enabled = false;
    this.table = table;
    this.wrapper = null;
    this.initEvents();
  }

  _createClass(TableWrapper, [{
    key: "enable",
    value: function enable() {
      this.enabled = true;
      this.checkWrapperState();
    }
  }, {
    key: "disable",
    value: function disable() {
      this.enabled = false;
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      var _this = this;

      this.table.addEventListener('scroll', function () {
        _this.checkWrapperState();
      });
      window.addEventListener('resize', function () {
        clearTimeout(_this.timeout);
        _this.timeout = setTimeout(function () {
          _this.checkWrapperState();
        }, 100);
      });
    }
  }, {
    key: "wrap",
    value: function wrap() {
      if (this.table.parentElement.classList.contains(CONST.WRAPPER_CLASS)) {
        return;
      }

      this.wrapper = document.createElement('div');
      this.wrapper.classList.add(CONST.WRAPPER_CLASS);
      this.table.parentNode.insertBefore(this.wrapper, this.table);
      this.wrapper.appendChild(this.table);
    }
  }, {
    key: "setOffset",
    value: function setOffset(percentage) {
      var scrollableAreaWidth = this.table.scrollWidth - this.table.offsetWidth;
      var offsetX = scrollableAreaWidth * (percentage / 100);
      this.table.scrollLeft = Math.round(offsetX);
    }
  }, {
    key: "getOffsetPercentage",
    value: function getOffsetPercentage() {
      var scrollableAreaWidth = this.table.scrollWidth - this.table.offsetWidth;
      var offset = this.table.scrollLeft;
      var percentage = offset / scrollableAreaWidth * 100;
      return Math.round(percentage);
    }
  }, {
    key: "checkWrapperState",
    value: function checkWrapperState() {
      if (!this.enabled) {
        return;
      }

      var total = this.table.scrollWidth;
      var width = this.table.offsetWidth;
      var scrollLeft = this.table.scrollLeft;
      this.wrapper.classList.remove(CONST.LESS_CLASS, CONST.MORE_CLASS, CONST.OVERFLOW_CLASS);

      if (total > width) {
        this.wrapper.classList.add(CONST.OVERFLOW_CLASS);

        if (scrollLeft + width + 10 < total) {
          this.wrapper.classList.add(CONST.MORE_CLASS);
        }

        if (scrollLeft > 0) {
          this.wrapper.classList.add(CONST.LESS_CLASS);
        }
      }
    }
  }]);

  return TableWrapper;
}();

var ScrollIndicator =
/*#__PURE__*/
function () {
  function ScrollIndicator(table, wrapper) {
    _classCallCheck(this, ScrollIndicator);

    this.table = table;
    this.wrapper = wrapper;
    this.initialX = 0;
    this.xOffset = 0;
    this.maxX = 0;
    this.tempX = 0;
    this.active = false;
    this.create();
    this.updateDraggerWidth();
    this.updateWidth();
  }

  _createClass(ScrollIndicator, [{
    key: "disable",
    value: function disable() {
      this.element.style.display = 'none';
    }
  }, {
    key: "enable",
    value: function enable() {
      this.element.style.display = 'block';
    }
  }, {
    key: "hide",
    value: function hide() {
      this.element.classList.add('-hidden');
    }
  }, {
    key: "show",
    value: function show() {
      this.element.classList.remove('-hidden');
    }
  }, {
    key: "create",
    value: function create() {
      var _this2 = this;

      var element = document.createElement('div');
      var dragger = document.createElement('div');
      element.classList.add('acp-scrolling-indicator');
      element.classList.add('-start');
      element.classList.add('-hidden');
      dragger.classList.add('acp-scrolling-indicator__dragger');
      element.appendChild(dragger);
      document.body.appendChild(element);
      this.element = element;
      this.dragger = dragger;
      setTimeout(function () {
        _this2.maxX = element.clientWidth - dragger.offsetWidth;
      });
      this.initEvents();
      this.disable();
      this.updateYPosition();
    }
  }, {
    key: "updateWidth",
    value: function updateWidth() {
      this.element.style.width = this.table.offsetWidth - 2 + 'px';
    }
  }, {
    key: "updateYPosition",
    value: function updateYPosition() {
      var tableBottom = this.table.getBoundingClientRect().bottom;
      var bottom = window.innerHeight - tableBottom;

      if (bottom > this.element.offsetHeight) {
        this.element.style.top = window.innerHeight - bottom + 'px';
      } else {
        this.element.style.top = 'inherit';
      }
    }
  }, {
    key: "updateDraggerWidth",
    value: function updateDraggerWidth() {
      var percentage = Math.round(this.table.offsetWidth / this.table.scrollWidth * 100);

      if (percentage === 100) {
        this.element.classList.add('-fits');
      } else {
        this.element.classList.remove('-fits');
      }

      this.dragger.style.width = "".concat(percentage, "%");
      this.maxX = this.element.clientWidth - this.dragger.offsetWidth;
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      var _this3 = this;

      document.addEventListener('scroll', function () {
        _this3.updateYPosition();

        _this3.updateWidth();
      });
      window.addEventListener("touchmove", function (e) {
        return _this3.drag(e);
      }, false);
      window.addEventListener("mousemove", function (e) {
        return _this3.drag(e);
      }, false);
      window.addEventListener('mouseup', function (e) {
        return _this3.dragEnd(e);
      });
      this.dragger.addEventListener("touchstart", function (e) {
        return _this3.dragStart(e);
      });
      this.dragger.addEventListener("touchend", function (e) {
        return _this3.dragEnd(e);
      });
      this.dragger.addEventListener("mousedown", function (e) {
        return _this3.dragStart(e);
      });
      this.dragger.addEventListener("mouseup", function (e) {
        return _this3.dragEnd(e);
      });
      this.table.addEventListener('scroll', function () {
        _this3.updateIndicator();
      });
      window.addEventListener('resize', function () {
        clearTimeout(_this3.timeout);
        _this3.timeout = setTimeout(function () {
          _this3.updateWidth();

          _this3.updateDraggerWidth();
        }, 100);
      }); // Screen Option fix

      document.querySelectorAll('#show-settings-link').forEach(function (el) {
        el.addEventListener('click', function () {
          return _this3.refreshPosition(300);
        });
      });
      document.addEventListener('click', function () {
        return _this3.refreshPosition();
      });
      setTimeout(function () {
        _this3.refreshPosition(300);
      }, 100);
      document.querySelectorAll('table .check-column input[type=checkbox]').forEach(function (el) {
        el.addEventListener('change', function () {
          return _this3.refreshPosition();
        });
      });
    }
  }, {
    key: "refreshPosition",
    value: function refreshPosition() {
      var _this4 = this;

      var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
      setTimeout(function () {
        _this4.show();

        _this4.updateYPosition();
      }, delay);
    }
  }, {
    key: "updateIndicator",
    value: function updateIndicator() {
      if (this.active) {
        return;
      }

      var percentage = this.wrapper.getOffsetPercentage() / 100;
      var offset = Math.round(this.maxX * percentage);
      this.xOffset = offset;
      this.setTranslate(offset);
    }
  }, {
    key: "getCurrentOffset",
    value: function getCurrentOffset() {
      return this.xOffset;
    }
  }, {
    key: "dragStart",
    value: function dragStart(e) {
      this.initialX = DragHelper.getX(e);
      this.active = true;
    }
  }, {
    key: "dragEnd",
    value: function dragEnd() {
      if (!this.active) {
        return;
      }

      this.initialX = false;
      this.active = false;
      this.xOffset = this.tempX;
      AdminColumns.HorizontalScrolling.wrapper.setOffset(this.percentage);
    }
  }, {
    key: "drag",
    value: function drag(e) {
      if (this.active) {
        e.preventDefault();
        var movementX = DragHelper.getX(e) - this.initialX;
        var newXpos = this.getCurrentOffset() + movementX;
        if (newXpos < 0) newXpos = 0;
        if (newXpos > this.maxX) newXpos = this.maxX;
        this.tempX = newXpos;
        this.percentage = newXpos / this.maxX * 100;
        this.setTranslate(newXpos);
        AdminColumns.HorizontalScrolling.wrapper.setOffset(this.percentage);
      }
    }
  }, {
    key: "setTranslate",
    value: function setTranslate(xPos) {
      if (xPos === 0) {
        this.element.classList.add('-start');
      } else {
        this.element.classList.remove('-start');
      }

      this.dragger.style.left = "".concat(xPos, "px");
    }
  }]);

  return ScrollIndicator;
}();

var DragHelper =
/*#__PURE__*/
function () {
  function DragHelper() {
    _classCallCheck(this, DragHelper);
  }

  _createClass(DragHelper, null, [{
    key: "getX",
    value: function getX(e) {
      if (e.type === "touchmove") {
        return e.touches[0].clientX;
      } else {
        return e.clientX;
      }
    }
  }, {
    key: "getY",
    value: function getY(e) {
      if (e.type === "touchmove") {
        return e.touches[0].clientY;
      } else {
        return e.clientY;
      }
    }
  }]);

  return DragHelper;
}();

/***/ })

/******/ });
//# sourceMappingURL=horizontal-scrolling.js.map