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
/******/ 	return __webpack_require__(__webpack_require__.s = "./core/js/table.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./core/js/table.js":
/*!**************************!*\
  !*** ./core/js/table.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _refresher = _interopRequireDefault(__webpack_require__(/*! ./table/refresher */ "./core/js/table/refresher.js"));

var _layoutSwitcher = _interopRequireDefault(__webpack_require__(/*! ./table/layout-switcher */ "./core/js/table/layout-switcher.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

document.addEventListener('AC_Table_Ready', function (e) {
  var table = e.detail.table;
  table.Refresher = new _refresher["default"](table);
  var switcher = document.querySelector('.layout-switcher');

  if (switcher) {
    var layout_switcher = new _layoutSwitcher["default"](switcher);
    layout_switcher.place();
  }
});

/***/ }),

/***/ "./core/js/table/layout-switcher.js":
/*!******************************************!*\
  !*** ./core/js/table/layout-switcher.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LayoutSwitcher =
/*#__PURE__*/
function () {
  function LayoutSwitcher(element) {
    _classCallCheck(this, LayoutSwitcher);

    this.element = element;
  }

  _createClass(LayoutSwitcher, [{
    key: "place",
    value: function place() {
      var _this = this;

      ['.wrap > a.page-title-action', '.wrap h1', '.wrap h2', '.wrap div'].some(function (selector) {
        return _this.tryPlacement(selector);
      });
    }
  }, {
    key: "tryPlacement",
    value: function tryPlacement(selector) {
      var predecessor = document.querySelector(selector);

      if (!predecessor) {
        return false;
      }

      insertAfter(this.element, predecessor);
      this.element.classList.add('-moved');
      return true;
    }
  }]);

  return LayoutSwitcher;
}();

exports["default"] = LayoutSwitcher;

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

/***/ }),

/***/ "./core/js/table/refresher.js":
/*!************************************!*\
  !*** ./core/js/table/refresher.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Refresher =
/*#__PURE__*/
function () {
  function Refresher(table) {
    _classCallCheck(this, Refresher);

    this.table = table;
  }

  _createClass(Refresher, [{
    key: "getRows",
    value: function getRows(ids) {
      return jQuery.ajax({
        url: window.location.href,
        method: 'post',
        data: {
          ac_action: 'get_table_rows',
          ac_ids: ids,
          _ajax_nonce: AC.ajax_nonce
        }
      });
    }
  }, {
    key: "updateRow",
    value: function updateRow(id) {
      var _this = this;

      var ajax = this.getRows([id]);
      ajax.done(function (response) {
        if (response.success) {
          _this.populateRow(id, response.data.table_rows[id]);
        }
      });
    }
  }, {
    key: "populateRow",
    value: function populateRow(id, rowdata) {
      var element = document.createElement('table');
      element.insertAdjacentHTML('beforeend', rowdata);
      this.table.Cells.getByID(126).forEach(function (cell) {
        var td = element.querySelector("td.column-".concat(cell.getName()));
        cell.setValue(td.innerHTML);
      });
    }
  }]);

  return Refresher;
}();

exports["default"] = Refresher;

/***/ })

/******/ });
//# sourceMappingURL=table.js.map