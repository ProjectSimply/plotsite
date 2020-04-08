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
/******/ 	return __webpack_require__(__webpack_require__.s = "./core/js/tools.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./core/js/tools.js":
/*!**************************!*\
  !*** ./core/js/tools.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _synchronisation = _interopRequireDefault(__webpack_require__(/*! ./tools/synchronisation */ "./core/js/tools/synchronisation.js"));

var _export = _interopRequireDefault(__webpack_require__(/*! ./tools/export */ "./core/js/tools/export.js"));

var _import = _interopRequireDefault(__webpack_require__(/*! ./tools/import */ "./core/js/tools/import.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

document.addEventListener("DOMContentLoaded", function () {
  AdminColumns.Tools = {};
  var SyncSection = document.querySelector('.ac-section.-syncronisation');

  if (SyncSection) {
    AdminColumns.Tools.Synchronisation = new _synchronisation["default"](SyncSection);
  }

  var ExportSection = document.querySelector('.ac-section.-export');

  if (ExportSection) {
    AdminColumns.Tools.Export = new _export["default"](ExportSection);
  }

  var ImportSection = document.querySelector('.ac-section.-import');

  if (ImportSection) {
    AdminColumns.Tools.Import = new _import["default"](ImportSection);
  }
});

/***/ }),

/***/ "./core/js/tools/export.js":
/*!*********************************!*\
  !*** ./core/js/tools/export.js ***!
  \*********************************/
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

var Export =
/*#__PURE__*/
function () {
  function Export(element) {
    _classCallCheck(this, Export);

    this.element = element;
    this.Table = new Table(element.querySelector('.ac-table'));
    this.getExportJsonButton().setAttribute('disabled', true);
    this.initEvents();
  }

  _createClass(Export, [{
    key: "doAjaxExportCall",
    value: function doAjaxExportCall() {
      return jQuery.ajax({
        url: ajaxurl,
        method: 'get',
        data: {
          action: 'acp-export-php',
          encoder: 'php-export',
          list_screen_id: this.Table.getSelectedListScreens(),
          response_type: 'string',
          _ajax_nonce: this.element.querySelector('[name="_ajax_nonce"]').value
        }
      });
    }
  }, {
    key: "getExportJsonButton",
    value: function getExportJsonButton() {
      return this.element.querySelector('[data-export="json"]');
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      var _this = this;

      this.Table.element.querySelectorAll('input').forEach(function (el) {
        el.addEventListener('change', function () {
          _this.getExportJsonButton().setAttribute('disabled', true);

          if (_this.Table.getSelectedListScreens().length > 0) {
            _this.getExportJsonButton().removeAttribute('disabled');
          }
        });
      });
    }
  }]);

  return Export;
}();

exports["default"] = Export;

var Table =
/*#__PURE__*/
function () {
  function Table(element) {
    _classCallCheck(this, Table);

    this.element = element;
  }

  _createClass(Table, [{
    key: "getSelectedListScreens",
    value: function getSelectedListScreens() {
      var ids = [];
      this.element.querySelectorAll('[name="list_screen_ids[]"]:checked').forEach(function (el) {
        ids.push(el.value);
      });
      return ids;
    }
  }]);

  return Table;
}();

/***/ }),

/***/ "./core/js/tools/import.js":
/*!*********************************!*\
  !*** ./core/js/tools/import.js ***!
  \*********************************/
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

var Import =
/*#__PURE__*/
function () {
  function Import(element) {
    _classCallCheck(this, Import);

    this.element = element;
    this.disable();
    this.initEvents();
  }

  _createClass(Import, [{
    key: "initEvents",
    value: function initEvents() {
      var _this = this;

      var fileInput = this.element.querySelector('input[type=file]');

      if (fileInput) {
        fileInput.addEventListener('change', function () {
          fileInput.value ? _this.enable() : _this.disable();
        });
      }
    }
  }, {
    key: "disable",
    value: function disable() {
      this.element.querySelectorAll('input[type="submit"]').forEach(function (button) {
        return button.setAttribute('disabled', true);
      });
    }
  }, {
    key: "enable",
    value: function enable() {
      this.element.querySelectorAll('input[type="submit"]').forEach(function (button) {
        return button.removeAttribute('disabled');
      });
    }
  }]);

  return Import;
}();

exports["default"] = Import;

/***/ }),

/***/ "./core/js/tools/synchronisation.js":
/*!******************************************!*\
  !*** ./core/js/tools/synchronisation.js ***!
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

var Synchronisation =
/*#__PURE__*/
function () {
  function Synchronisation(element) {
    _classCallCheck(this, Synchronisation);

    this.element = element;
    var table = element.querySelector('.ac-table');
    var filter = element.querySelector('.ac-sync-filter');

    if (table) {
      this.Table = new Table(table);
    }

    if (table && this.Table) {
      this.Filter = new Filter(filter, this.Table);
    }

    this.init();
  }

  _createClass(Synchronisation, [{
    key: "getSyncButton",
    value: function getSyncButton() {
      return this.element.querySelector('.button-primary');
    }
  }, {
    key: "checkButtonState",
    value: function checkButtonState() {
      var Button = this.getSyncButton();

      if (!Button || !this.Table) {
        return;
      }

      Button.setAttribute('disabled', true);

      if (this.Table.getSelectedSyncableItems().length > 0) {
        Button.removeAttribute('disabled');
      }
    }
  }, {
    key: "init",
    value: function init() {
      var _this = this;

      var Button = this.getSyncButton();

      if (Button) {
        Button.setAttribute('disabled', true);
        this.checkButtonState();
        this.Table.table.querySelectorAll('input[type=checkbox]').forEach(function (input) {
          input.addEventListener('change', function () {
            return _this.checkButtonState();
          });
        });
      }
    }
  }]);

  return Synchronisation;
}();

exports["default"] = Synchronisation;

var Table =
/*#__PURE__*/
function () {
  function Table(el) {
    _classCallCheck(this, Table);

    this.table = el;
  }

  _createClass(Table, [{
    key: "checkNoResults",
    value: function checkNoResults(className) {
      var row = this.table.querySelector('tfoot');
      row.style.display = 'none';

      if (!this.hasItemsForFilter(className)) {
        row.style.display = 'table-footer-group';
      }
    }
  }, {
    key: "hasItemsForFilter",
    value: function hasItemsForFilter(className) {
      var selector = className ? "tbody tr.".concat(className) : "tbody tr";
      return this.table.querySelectorAll(selector).length > 0;
    }
  }, {
    key: "getSelectedSyncableItems",
    value: function getSelectedSyncableItems() {
      return this.table.querySelectorAll('input[type=checkbox]:checked');
    }
  }, {
    key: "resetSelection",
    value: function resetSelection() {
      this.table.querySelectorAll('input[checkbox]').forEach(function (input) {
        return input.checked = false;
      });
    }
  }, {
    key: "filterRows",
    value: function filterRows(className) {
      if (!className) {
        this.table.querySelectorAll('tbody tr').forEach(function (el) {
          return el.style.display = 'table-row';
        });
        this.checkNoResults(className);
        return;
      }

      this.table.querySelectorAll('tbody tr').forEach(function (el) {
        return el.style.display = 'none';
      });
      this.table.querySelectorAll("tbody tr.".concat(className)).forEach(function (el) {
        return el.style.display = 'table-row';
      });
      this.checkNoResults(className);
    }
  }]);

  return Table;
}();

var Filter =
/*#__PURE__*/
function () {
  function Filter(filter, table) {
    _classCallCheck(this, Filter);

    this.filter = filter;
    this.table = table;
    this.init();
    this.refresh();
  }

  _createClass(Filter, [{
    key: "refresh",
    value: function refresh() {
      var current = this.filter.querySelector('a.current');

      if (current) {
        this.setFilter(current);
      }
    }
  }, {
    key: "setFilter",
    value: function setFilter(link) {
      this.filter.querySelectorAll('a').forEach(function (el) {
        return el.classList.remove('current');
      });
      link.classList.add('current');
      var filterClass = link.dataset.filter ? link.dataset.filter : '';
      this.table.filterRows(filterClass);
    }
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      this.filter.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function (e) {
          e.preventDefault();

          _this2.setFilter(link);
        });
      });
      var firstItem = this.filter.querySelector('li:first-child a');

      if (firstItem && !firstItem.classList.contains('current')) {
        var filter = firstItem.dataset.filter;

        if (this.table.hasItemsForFilter(filter)) {
          this.setFilter(firstItem);
        }
      }
    }
  }]);

  return Filter;
}();

/***/ })

/******/ });
//# sourceMappingURL=tools.js.map