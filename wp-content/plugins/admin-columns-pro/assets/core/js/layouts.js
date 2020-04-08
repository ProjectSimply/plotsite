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
/******/ 	return __webpack_require__(__webpack_require__.s = "./core/js/layouts.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./core/js/layout-settings/roles.js":
/*!******************************************!*\
  !*** ./core/js/layout-settings/roles.js ***!
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

var Roles =
/*#__PURE__*/
function () {
  function Roles(form) {
    _classCallCheck(this, Roles);

    this.Form = form;
    this.init();
  }

  _createClass(Roles, [{
    key: "init",
    value: function init() {
      jQuery(this.Form.querySelector('select.roles')).ac_select2({
        placeholder: acp_layouts.roles,
        theme: 'acs2'
      }).on("select2:select", function () {
        jQuery(this).ac_select2('open');
      }).on("select2:open", function () {
        setTimeout(function () {
          jQuery('.select2-container.select2-container--open .select2-dropdown li[role=group]').each(function () {
            if (jQuery(this).find('li[aria-selected=false]').length > 0) {
              jQuery(this).show();
            } else {
              jQuery(this).hide();
            }
          });
        }, 1);
      });
    }
  }]);

  return Roles;
}();

exports["default"] = Roles;

/***/ }),

/***/ "./core/js/layout-settings/sorting.js":
/*!********************************************!*\
  !*** ./core/js/layout-settings/sorting.js ***!
  \********************************************/
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

var Sorting =
/*#__PURE__*/
function () {
  function Sorting(form) {
    _classCallCheck(this, Sorting);

    this.Form = form;
    this.columns = AdminColumns.Form.columns;
    this.setting = this.Form.querySelector('[data-setting="sorting-preference"]');
    this.select_columns = this.setting.querySelector('[name="settings[sorting]"]');
    this.init();
  }

  _createClass(Sorting, [{
    key: "init",
    value: function init() {
      var _this = this;

      Object.keys(this.columns).forEach(function (k) {
        var column = _this.columns[k];

        if (Sorting.isSortable(column)) {
          var option = document.createElement('option');
          option.value = k;

          if (column.settings.hasOwnProperty('label')) {
            option.innerText = column.el.querySelector('.column_label .toggle').innerText;
          }

          if (option.innerText === '') {
            option.innerText = column.el.querySelector('.column_type .inner').innerText;
          }

          _this.select_columns.appendChild(option);
        }
      });
      var current = this.select_columns.dataset.sorting;
      this.select_columns.querySelectorAll("[value=\"".concat(current, "\"]")).forEach(function (e) {
        return e.selected = true;
      });
    }
  }], [{
    key: "isSortable",
    value: function isSortable(column) {
      var setting = column.el.querySelector('table[data-setting="sort"]');

      if (!setting) {
        return false;
      }

      var selected = setting.querySelectorAll('input[value="on"]:checked');
      return selected.length > 0;
    }
  }]);

  return Sorting;
}();

exports["default"] = Sorting;

/***/ }),

/***/ "./core/js/layout-settings/users.js":
/*!******************************************!*\
  !*** ./core/js/layout-settings/users.js ***!
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

var Users =
/*#__PURE__*/
function () {
  function Users(form) {
    _classCallCheck(this, Users);

    this.Form = form;
    this.init();
  }

  _createClass(Users, [{
    key: "init",
    value: function init() {
      jQuery(this.Form.querySelector('select.users')).ac_select2({
        placeholder: acp_layouts.users,
        multiple: true,
        theme: 'acs2',
        minimumInputLength: 0,
        escapeMarkup: function escapeMarkup(text) {
          return jQuery('<div>' + text + '</div>').text();
        },
        ajax: {
          type: 'POST',
          url: ajaxurl,
          dataType: 'json',
          delay: 350,
          data: function data(params) {
            return {
              action: 'acp_layout_get_users',
              _ajax_nonce: AC._ajax_nonce,
              search: params.term,
              page: params.page
            };
          },
          processResults: function processResults(response) {
            if (response) {
              if (response.success && response.data) {
                return response.data;
              }
            }

            return {
              results: []
            };
          },
          cache: true
        }
      });
    }
  }]);

  return Users;
}();

exports["default"] = Users;

/***/ }),

/***/ "./core/js/layouts.js":
/*!****************************!*\
  !*** ./core/js/layouts.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _sidebox = _interopRequireDefault(__webpack_require__(/*! ./layouts/sidebox */ "./core/js/layouts/sidebox.js"));

var _settings = _interopRequireDefault(__webpack_require__(/*! ./layouts/settings */ "./core/js/layouts/settings.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

document.addEventListener("DOMContentLoaded", function () {
  var layouts = this.querySelector('.sidebox.layouts');

  if (layouts) {
    AdminColumns.OrderSidebox = new _sidebox["default"](layouts); // Order the Column sets menu

    var list = document.querySelector('.layout-selector ul');

    if (list) {
      AdminColumns.OrderSidebox.events.on('ordered', function (order) {
        var temp = document.createElement('div');
        order.forEach(function (key) {
          var item = list.querySelector("[data-screen=\"".concat(key, "\"]"));

          if (item) {
            temp.appendChild(item);
          }
        });
        temp.querySelectorAll('li').forEach(function (el) {
          list.appendChild(el);
        });
      });
    }
  }

  var settings = document.querySelector('.ac-setbox');

  if (settings) {
    AdminColumns.ListScreenSettings = new _settings["default"](document.querySelector('.ac-setbox'));
  }

  var title = document.querySelector('#listscreen_settings input[name="title"]');

  if (title) {
    title.addEventListener('keyup', function (d) {
      document.querySelectorAll(".layout-selector [data-screen=\"".concat(AC.layout, "\"] a")).forEach(function (el) {
        el.innerHTML = title.value;
      });
      document.querySelectorAll(".layouts__items [data-screen=\"".concat(AC.layout, "\"] [data-label]")).forEach(function (el) {
        el.innerHTML = title.value;
      });
    });
  }
});

/***/ }),

/***/ "./core/js/layouts/settings.js":
/*!*************************************!*\
  !*** ./core/js/layouts/settings.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sorting = _interopRequireDefault(__webpack_require__(/*! ../layout-settings/sorting */ "./core/js/layout-settings/sorting.js"));

var _roles = _interopRequireDefault(__webpack_require__(/*! ../layout-settings/roles */ "./core/js/layout-settings/roles.js"));

var _users = _interopRequireDefault(__webpack_require__(/*! ../layout-settings/users */ "./core/js/layout-settings/users.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LayoutSettings =
/*#__PURE__*/
function () {
  function LayoutSettings(el) {
    _classCallCheck(this, LayoutSettings);

    this.element = el;
    this.settings = new Map();
    this.init();
  }

  _createClass(LayoutSettings, [{
    key: "init",
    value: function init() {
      this.settings.set('sorting', new _sorting["default"](this.element));
      this.settings.set('roles', new _roles["default"](this.element));
      this.settings.set('users', new _users["default"](this.element));
    }
  }]);

  return LayoutSettings;
}();

exports["default"] = LayoutSettings;

/***/ }),

/***/ "./core/js/layouts/sidebox.js":
/*!************************************!*\
  !*** ./core/js/layouts/sidebox.js ***!
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

var nanobus = __webpack_require__(/*! nanobus */ "./node_modules/nanobus/index.js");

var Sidebox =
/*#__PURE__*/
function () {
  function Sidebox(el) {
    _classCallCheck(this, Sidebox);

    this.el = el;
    this.events = nanobus();
    this.Form = new NewLayoutForm(this.el.querySelector('.new'));
    this.initEvents();
  }

  _createClass(Sidebox, [{
    key: "getListScreen",
    value: function getListScreen() {
      return this.el.dataset.type;
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      var _this = this;

      var button = this.getButton();

      if (button) {
        button.addEventListener('click', function (e) {
          e.preventDefault();

          if (button.classList.contains('open')) {
            _this.cancelNewLayout();
          } else {
            _this.addNewLayout();
          }
        });
      }

      jQuery(this.el).find('.layouts__items').sortable({
        items: '.layouts__item',
        axis: 'y',
        containment: jQuery(this.el).find('.layouts__items'),
        handle: '.cpacicon-move',
        stop: function stop() {
          _this.setNewOrder();
        }
      });
    }
  }, {
    key: "setNewOrder",
    value: function setNewOrder() {
      var _this2 = this;

      this.storeLayoutOrder(this.getOrder()).done(function (response) {
        _this2.events.emit('ordered', _this2.getOrder());
      });
    }
  }, {
    key: "getOrder",
    value: function getOrder() {
      var order = [];
      this.el.querySelectorAll('.layouts__item').forEach(function (layout) {
        order.push(layout.dataset.screen);
      });
      return order;
    }
  }, {
    key: "storeLayoutOrder",
    value: function storeLayoutOrder(order) {
      return jQuery.ajax({
        url: ajaxurl,
        method: 'POST',
        data: {
          _ajax_nonce: AC._ajax_nonce,
          action: 'acp_update_layout_order',
          list_screen: this.getListScreen(),
          order: order
        }
      });
    }
  }, {
    key: "getButton",
    value: function getButton() {
      return this.el.querySelector('a.add-new');
    }
  }, {
    key: "addNewLayout",
    value: function addNewLayout() {
      this.getButton().classList.add('open');
      this.Form.open();
    }
  }, {
    key: "cancelNewLayout",
    value: function cancelNewLayout() {
      this.getButton().classList.remove('open');
      this.Form.close();
    }
  }]);

  return Sidebox;
}();

exports["default"] = Sidebox;

var NewLayoutForm =
/*#__PURE__*/
function () {
  function NewLayoutForm(el) {
    _classCallCheck(this, NewLayoutForm);

    this.el = el;
    this.initEvents();
  }

  _createClass(NewLayoutForm, [{
    key: "open",
    value: function open() {
      jQuery(this.el).slideDown();
    }
  }, {
    key: "close",
    value: function close() {
      jQuery(this.el).slideUp();
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      var _this3 = this;

      // Add new error message
      this.el.querySelector('.new form').addEventListener('submit', function (e) {
        var name = _this3.el.querySelector('.row.name input').value.trim();

        if (!name) {
          e.preventDefault();

          _this3.el.querySelector('.row.name').classList.add('save-error');
        }
      });
    }
  }]);

  return NewLayoutForm;
}();

/***/ }),

/***/ "./node_modules/nanoassert/index.js":
/*!******************************************!*\
  !*** ./node_modules/nanoassert/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

assert.notEqual = notEqual
assert.notOk = notOk
assert.equal = equal
assert.ok = assert

module.exports = assert

function equal (a, b, m) {
  assert(a == b, m) // eslint-disable-line eqeqeq
}

function notEqual (a, b, m) {
  assert(a != b, m) // eslint-disable-line eqeqeq
}

function notOk (t, m) {
  assert(!t, m)
}

function assert (t, m) {
  if (!t) throw new Error(m || 'AssertionError')
}


/***/ }),

/***/ "./node_modules/nanobus/index.js":
/*!***************************************!*\
  !*** ./node_modules/nanobus/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var splice = __webpack_require__(/*! remove-array-items */ "./node_modules/remove-array-items/index.js")
var nanotiming = __webpack_require__(/*! nanotiming */ "./node_modules/nanotiming/browser.js")
var assert = __webpack_require__(/*! assert */ "./node_modules/nanoassert/index.js")

module.exports = Nanobus

function Nanobus (name) {
  if (!(this instanceof Nanobus)) return new Nanobus(name)

  this._name = name || 'nanobus'
  this._starListeners = []
  this._listeners = {}
}

Nanobus.prototype.emit = function (eventName) {
  assert.ok(typeof eventName === 'string' || typeof eventName === 'symbol', 'nanobus.emit: eventName should be type string or symbol')

  var data = []
  for (var i = 1, len = arguments.length; i < len; i++) {
    data.push(arguments[i])
  }

  var emitTiming = nanotiming(this._name + "('" + eventName.toString() + "')")
  var listeners = this._listeners[eventName]
  if (listeners && listeners.length > 0) {
    this._emit(this._listeners[eventName], data)
  }

  if (this._starListeners.length > 0) {
    this._emit(this._starListeners, eventName, data, emitTiming.uuid)
  }
  emitTiming()

  return this
}

Nanobus.prototype.on = Nanobus.prototype.addListener = function (eventName, listener) {
  assert.ok(typeof eventName === 'string' || typeof eventName === 'symbol', 'nanobus.on: eventName should be type string or symbol')
  assert.equal(typeof listener, 'function', 'nanobus.on: listener should be type function')

  if (eventName === '*') {
    this._starListeners.push(listener)
  } else {
    if (!this._listeners[eventName]) this._listeners[eventName] = []
    this._listeners[eventName].push(listener)
  }
  return this
}

Nanobus.prototype.prependListener = function (eventName, listener) {
  assert.ok(typeof eventName === 'string' || typeof eventName === 'symbol', 'nanobus.prependListener: eventName should be type string or symbol')
  assert.equal(typeof listener, 'function', 'nanobus.prependListener: listener should be type function')

  if (eventName === '*') {
    this._starListeners.unshift(listener)
  } else {
    if (!this._listeners[eventName]) this._listeners[eventName] = []
    this._listeners[eventName].unshift(listener)
  }
  return this
}

Nanobus.prototype.once = function (eventName, listener) {
  assert.ok(typeof eventName === 'string' || typeof eventName === 'symbol', 'nanobus.once: eventName should be type string or symbol')
  assert.equal(typeof listener, 'function', 'nanobus.once: listener should be type function')

  var self = this
  this.on(eventName, once)
  function once () {
    listener.apply(self, arguments)
    self.removeListener(eventName, once)
  }
  return this
}

Nanobus.prototype.prependOnceListener = function (eventName, listener) {
  assert.ok(typeof eventName === 'string' || typeof eventName === 'symbol', 'nanobus.prependOnceListener: eventName should be type string or symbol')
  assert.equal(typeof listener, 'function', 'nanobus.prependOnceListener: listener should be type function')

  var self = this
  this.prependListener(eventName, once)
  function once () {
    listener.apply(self, arguments)
    self.removeListener(eventName, once)
  }
  return this
}

Nanobus.prototype.removeListener = function (eventName, listener) {
  assert.ok(typeof eventName === 'string' || typeof eventName === 'symbol', 'nanobus.removeListener: eventName should be type string or symbol')
  assert.equal(typeof listener, 'function', 'nanobus.removeListener: listener should be type function')

  if (eventName === '*') {
    this._starListeners = this._starListeners.slice()
    return remove(this._starListeners, listener)
  } else {
    if (typeof this._listeners[eventName] !== 'undefined') {
      this._listeners[eventName] = this._listeners[eventName].slice()
    }

    return remove(this._listeners[eventName], listener)
  }

  function remove (arr, listener) {
    if (!arr) return
    var index = arr.indexOf(listener)
    if (index !== -1) {
      splice(arr, index, 1)
      return true
    }
  }
}

Nanobus.prototype.removeAllListeners = function (eventName) {
  if (eventName) {
    if (eventName === '*') {
      this._starListeners = []
    } else {
      this._listeners[eventName] = []
    }
  } else {
    this._starListeners = []
    this._listeners = {}
  }
  return this
}

Nanobus.prototype.listeners = function (eventName) {
  var listeners = eventName !== '*'
    ? this._listeners[eventName]
    : this._starListeners

  var ret = []
  if (listeners) {
    var ilength = listeners.length
    for (var i = 0; i < ilength; i++) ret.push(listeners[i])
  }
  return ret
}

Nanobus.prototype._emit = function (arr, eventName, data, uuid) {
  if (typeof arr === 'undefined') return
  if (arr.length === 0) return
  if (data === undefined) {
    data = eventName
    eventName = null
  }

  if (eventName) {
    if (uuid !== undefined) {
      data = [eventName].concat(data, uuid)
    } else {
      data = [eventName].concat(data)
    }
  }

  var length = arr.length
  for (var i = 0; i < length; i++) {
    var listener = arr[i]
    listener.apply(listener, data)
  }
}


/***/ }),

/***/ "./node_modules/nanoscheduler/index.js":
/*!*********************************************!*\
  !*** ./node_modules/nanoscheduler/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assert = __webpack_require__(/*! assert */ "./node_modules/nanoassert/index.js")

var hasWindow = typeof window !== 'undefined'

function createScheduler () {
  var scheduler
  if (hasWindow) {
    if (!window._nanoScheduler) window._nanoScheduler = new NanoScheduler(true)
    scheduler = window._nanoScheduler
  } else {
    scheduler = new NanoScheduler()
  }
  return scheduler
}

function NanoScheduler (hasWindow) {
  this.hasWindow = hasWindow
  this.hasIdle = this.hasWindow && window.requestIdleCallback
  this.method = this.hasIdle ? window.requestIdleCallback.bind(window) : this.setTimeout
  this.scheduled = false
  this.queue = []
}

NanoScheduler.prototype.push = function (cb) {
  assert.equal(typeof cb, 'function', 'nanoscheduler.push: cb should be type function')

  this.queue.push(cb)
  this.schedule()
}

NanoScheduler.prototype.schedule = function () {
  if (this.scheduled) return

  this.scheduled = true
  var self = this
  this.method(function (idleDeadline) {
    var cb
    while (self.queue.length && idleDeadline.timeRemaining() > 0) {
      cb = self.queue.shift()
      cb(idleDeadline)
    }
    self.scheduled = false
    if (self.queue.length) self.schedule()
  })
}

NanoScheduler.prototype.setTimeout = function (cb) {
  setTimeout(cb, 0, {
    timeRemaining: function () {
      return 1
    }
  })
}

module.exports = createScheduler


/***/ }),

/***/ "./node_modules/nanotiming/browser.js":
/*!********************************************!*\
  !*** ./node_modules/nanotiming/browser.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var scheduler = __webpack_require__(/*! nanoscheduler */ "./node_modules/nanoscheduler/index.js")()
var assert = __webpack_require__(/*! assert */ "./node_modules/nanoassert/index.js")

var perf
nanotiming.disabled = true
try {
  perf = window.performance
  nanotiming.disabled = window.localStorage.DISABLE_NANOTIMING === 'true' || !perf.mark
} catch (e) { }

module.exports = nanotiming

function nanotiming (name) {
  assert.equal(typeof name, 'string', 'nanotiming: name should be type string')

  if (nanotiming.disabled) return noop

  var uuid = (perf.now() * 10000).toFixed() % Number.MAX_SAFE_INTEGER
  var startName = 'start-' + uuid + '-' + name
  perf.mark(startName)

  function end (cb) {
    var endName = 'end-' + uuid + '-' + name
    perf.mark(endName)

    scheduler.push(function () {
      var err = null
      try {
        var measureName = name + ' [' + uuid + ']'
        perf.measure(measureName, startName, endName)
        perf.clearMarks(startName)
        perf.clearMarks(endName)
      } catch (e) { err = e }
      if (cb) cb(err, name)
    })
  }

  end.uuid = uuid
  return end
}

function noop (cb) {
  if (cb) {
    scheduler.push(function () {
      cb(new Error('nanotiming: performance API unavailable'))
    })
  }
}


/***/ }),

/***/ "./node_modules/remove-array-items/index.js":
/*!**************************************************!*\
  !*** ./node_modules/remove-array-items/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Remove a range of items from an array
 *
 * @function removeItems
 * @param {Array<*>} arr The target array
 * @param {number} startIdx The index to begin removing from (inclusive)
 * @param {number} removeCount How many items to remove
 */
module.exports = function removeItems (arr, startIdx, removeCount) {
  var i, length = arr.length

  if (startIdx >= length || removeCount === 0) {
    return
  }

  removeCount = (startIdx + removeCount > length ? length - startIdx : removeCount)

  var len = length - removeCount

  for (i = startIdx; i < len; ++i) {
    arr[i] = arr[i + removeCount]
  }

  arr.length = len
}


/***/ })

/******/ });
//# sourceMappingURL=layouts.js.map