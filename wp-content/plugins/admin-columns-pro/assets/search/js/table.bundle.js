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
/******/ 	return __webpack_require__(__webpack_require__.s = "./search/js/table.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../admin-columns/src/js/modules/modal.js":
/*!************************************************!*\
  !*** ../admin-columns/src/js/modules/modal.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _modals = _interopRequireDefault(__webpack_require__(/*! ./modals */ "../admin-columns/src/js/modules/modals.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Modal =
/*#__PURE__*/
function () {
  function Modal(el) {
    _classCallCheck(this, Modal);

    if (!el) {
      return;
    }

    this.el = el;
    this.dialog = el.querySelector('.ac-modal__dialog');
    this.initEvents();
  }

  _createClass(Modal, [{
    key: "initEvents",
    value: function initEvents() {
      var _this = this;

      var self = this;
      document.addEventListener('keydown', function (e) {
        var keyName = event.key;

        if (!_this.isOpen()) {
          return;
        }

        if ('Escape' === keyName) {
          _this.close();
        }
      });
      var dismissButtons = this.el.querySelectorAll('[data-dismiss="modal"], .ac-modal__dialog__close');

      if (dismissButtons.length > 0) {
        dismissButtons.forEach(function (b) {
          b.addEventListener('click', function (e) {
            e.preventDefault();
            self.close();
          });
        });
      }

      this.el.addEventListener('click', function () {
        self.close();
      });
      this.el.querySelector('.ac-modal__dialog').addEventListener('click', function (e) {
        e.stopPropagation();
      });

      if (typeof document.querySelector('body').dataset.ac_modal_init === 'undefined') {
        Modal.initGlobalEvents();
        document.querySelector('body').dataset.ac_modal_init = 1;
      }

      this.el.AC_MODAL = self;
    }
  }, {
    key: "isOpen",
    value: function isOpen() {
      return this.el.classList.contains('-active');
    }
  }, {
    key: "close",
    value: function close() {
      this.onClose();
      this.el.classList.remove('-active');
    }
  }, {
    key: "open",
    value: function open() {
      this.onOpen();
      this.el.removeAttribute('style');
      this.el.classList.add('-active');
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.el.remove();
    }
  }, {
    key: "onClose",
    value: function onClose() {}
  }, {
    key: "onOpen",
    value: function onOpen() {}
  }], [{
    key: "initGlobalEvents",
    value: function initGlobalEvents() {
      jQuery(document).on('click', '[data-ac-open-modal]', function (e) {
        e.preventDefault();
        var target = e.target.dataset.acOpenModal;
        var el = document.querySelector(target);

        if (el && el.AC_MODAL) {
          el.AC_MODAL.open();
        }
      });
      jQuery(document).on('click', '[data-ac-modal]', function (e) {
        e.preventDefault();
        var modal_key = jQuery(this).data('ac-modal');

        if (_modals["default"].init().get(modal_key)) {
          _modals["default"].init().get(modal_key).open();
        }
      });
    }
  }]);

  return Modal;
}();

module.exports = Modal;

/***/ }),

/***/ "../admin-columns/src/js/modules/modals.js":
/*!*************************************************!*\
  !*** ../admin-columns/src/js/modules/modals.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _modal = _interopRequireDefault(__webpack_require__(/*! ./modal */ "../admin-columns/src/js/modules/modal.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Modals =
/*#__PURE__*/
function () {
  function Modals() {
    _classCallCheck(this, Modals);

    this.modals = [];
    this.number = 1;
  }

  _createClass(Modals, [{
    key: "register",
    value: function register(modal) {
      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (!key) {
        key = 'm' + this.number;
      }

      this.modals[key] = modal;
      this.number++;
      return modal;
    }
  }, {
    key: "get",
    value: function get(key) {
      if (this.modals[key]) {
        return this.modals[key];
      }

      return false;
    } // Bind self to global AdminColumns if exist

  }], [{
    key: "init",
    value: function init() {
      if (typeof AdminColumns.Modals === 'undefined') {
        AdminColumns.Modals = new this();
        AdminColumns.Modals._abstract = {
          modal: _modal["default"]
        };
      }

      return AdminColumns.Modals;
    }
  }]);

  return Modals;
}();

exports["default"] = Modals;

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


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./search/js/helpers/date.js":
/*!***********************************!*\
  !*** ./search/js/helpers/date.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDate = formatDate;

function formatDate(format, date) {
  // format 2017-12-31
  var year = date.substr(0, 4);
  var month = date.substr(5, 2);
  var day = date.substr(8, 2);
  return jQuery.datepicker.formatDate(format, new Date(year, month - 1, day));
}

/***/ }),

/***/ "./search/js/helpers/document.js":
/*!***************************************!*\
  !*** ./search/js/helpers/document.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOffset = getOffset;

function getOffset(el) {
  var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: Math.round(rect.top + scrollTop),
    left: Math.round(rect.left + scrollLeft)
  };
}

/***/ }),

/***/ "./search/js/helpers/strings.js":
/*!**************************************!*\
  !*** ./search/js/helpers/strings.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toPixel = toPixel;

function toPixel(number) {
  return number + 'px';
}

/***/ }),

/***/ "./search/js/helpers/url.js":
/*!**********************************!*\
  !*** ./search/js/helpers/url.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeParameterFromUrl = removeParameterFromUrl;

function removeParameterFromUrl(url, parameter) {
  return url.replace(new RegExp('[?&]' + parameter + '=[^&#]*(#.*)?$'), '$1').replace(new RegExp('([?&])' + parameter + '=[^&]*&'), '$1');
}

/***/ }),

/***/ "./search/js/modules/ac-query-builder.js":
/*!***********************************************!*\
  !*** ./search/js/modules/ac-query-builder.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _acSearchQuery = _interopRequireDefault(__webpack_require__(/*! ./ac-search-query */ "./search/js/modules/ac-search-query.js"));

var _filterTypes = _interopRequireDefault(__webpack_require__(/*! ./filter-types */ "./search/js/modules/filter-types.js"));

var _placement = _interopRequireDefault(__webpack_require__(/*! ./placement */ "./search/js/modules/placement.js"));

var _rule = _interopRequireDefault(__webpack_require__(/*! ./rule */ "./search/js/modules/rule.js"));

var _default = _interopRequireDefault(__webpack_require__(/*! ../types/default */ "./search/js/types/default.js"));

var _acTemplates = __webpack_require__(/*! ./ac-templates */ "./search/js/modules/ac-templates.js");

var Operators = _interopRequireWildcard(__webpack_require__(/*! ./operators */ "./search/js/modules/operators.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var acSelect2FormatState = function acSelect2FormatState(state) {
  var text = state.text;

  if (state.element) {
    var label = jQuery(state.element).data('label');
    text = jQuery("<span>".concat(label, "</span>"));
  }

  return text;
};

var ACQueryBuilder =
/*#__PURE__*/
function () {
  /**
   *
   * @param element
   * @param query
   */
  function ACQueryBuilder(element, query) {
    _classCallCheck(this, ACQueryBuilder);

    this.el = element;
    this.$el = jQuery(element);
    this.$form = jQuery(AC.table_id).parents('form:first');
    this.filtertypes = _filterTypes["default"];
    this.query = new _acSearchQuery["default"](query);
    this.initialState = '';
    this.setDefaults();
  }

  _createClass(ACQueryBuilder, [{
    key: "setDefaults",
    value: function setDefaults() {
      this.defaults = {
        types: {
          "abstract": _default["default"]
        },
        operators: {
          nullable: ['is_null', 'is_not_null', 'is_empty', 'is_not_empty', 'date_future', 'date_past', 'date_today']
        }
      };
    }
  }, {
    key: "init",
    value: function init() {
      var self = this; // Fire events

      jQuery(document).trigger('ACSearch.registerFilterTypes');
      self.$el.trigger('ACSearch.beforeInit'); // Start init

      self.query.init();

      if (self.query.hasFilters()) {
        self.$el.queryBuilder({
          operators: Operators.getCustomOperators(),
          allow_empty: true,
          filters: self.query.getFilters(),
          conditions: ['AND'],
          allow_groups: false,
          select_placeholder: ac_search.i18n.select,
          inputs_separator: '<span class="ac-s__separator">-</span>',
          templates: {
            rule: _acTemplates.TemplateRule,
            group: _acTemplates.TemplateGroup
          },
          rules: self.query.getRules()
        });
        self.initEvents();
      }

      new _placement["default"]().place();
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      var self = this;
      self.initialState = JSON.stringify(this.getRules());
      /**
       * Init all Rules for the first time
       */

      this.$el.find('.rule-container').each(function () {
        var $rule = jQuery(this);
        var rule = new _rule["default"]($rule, self.query);

        self._bindRuleFilterType(rule);

        self._bindRuleOperator(rule);

        self._bindRuleValue(rule);

        rule.$el.addClass('initial');
        rule.compact();
      });

      if (this.$el.find('.rule-container').length === 0) {
        this.$el.find('.rules-group-body').hide();
      } // Triggers after the rule is populated with form elements


      this.$el.on('afterApplyRuleFlags.queryBuilder', function (e, rule) {
        new _rule["default"](rule.$el).compact();
      });
      this.$el.on('click', '[data-add]', function () {
        self.$el.addClass('init');
        self.$el.find('.rules-group-body').css('display', 'inline-block');
      });
      this.$el.on('beforeAddRule.queryBuilder', function (e) {
        if (!self.$el.hasClass('init')) {
          return;
        }

        if (self.validateForm()) {
          self.compactRules();
        }

        if (self.hasOpenRules()) {
          e.preventDefault();
        }
      });
      this.$el.on('click', '.rule-container [data-confirm]', function () {
        if (!self.validateForm()) {
          return;
        }

        jQuery(this).trigger('confirmRule.acQueryBuilder', [new _rule["default"](jQuery(this).closest('.rule-container'))]);
      });
      this.$el.on('confirmRule.acQueryBuilder', '.rule-container', function (e, rule) {
        rule.compact();
        self.checkChangeState();
      });
      this.$el.on('afterDeleteRule.queryBuilder', function () {
        self.checkChangeState();
      });
      this.$el.on('click', '.rule-container.compact', function () {
        new _rule["default"](jQuery(this)).open();
      });
      this.$form.on('submit', function () {
        if (!self.$el.queryBuilder('validate')) {
          self.$form.trigger('ACSearch.validationFailed');
          return false;
        }

        var rules = self.getRules();
        self.disableFields();

        if (rules.rules.length === 0) {
          return;
        }

        var textarea = jQuery('<textarea name="ac-rules">');
        textarea.val(JSON.stringify(rules)).hide();
        self.$el.append(textarea);

        self._sanitizeFieldNames();
      });
      this.$el.on('afterCreateRuleFilters.queryBuilder', function (e, $rule) {
        self._bindRuleFilterType(new _rule["default"]($rule.$el, self.query));
      });
      this.$el.on('afterCreateRuleOperators.queryBuilder', function (e, $rule) {
        var rule = new _rule["default"]($rule.$el, self.query);

        self._bindRuleOperator(rule);
      });
      this.$el.on('afterCreateRuleInput.queryBuilder', function (e, $rule) {
        var rule = new _rule["default"]($rule.$el, self.query);

        self._bindRuleValue(rule);
      });
    }
    /** {Rule} rule */

  }, {
    key: "_bindRuleFilterType",
    value: function _bindRuleFilterType(rule) {
      var self = this;
      var $select = rule.$el.find('.rule-filter-container select');
      rule.$el.find('.rule-operator-container').hide();
      rule.$el.find('.rule-value-container').hide();
      $select.find('option').each(function () {
        var $option = jQuery(this);
        var filter = self.query.getFilter($option.val());
        $option.data('label', filter.label);
      });
      $select.find('option:first').val('').text('');
      $select.select2({
        width: 200,
        theme: 'acs2',
        minimumResultsForSearch: 10,
        placeholder: ac_search.i18n.select,
        templateResult: acSelect2FormatState,
        templateSelection: acSelect2FormatState
      }); // Select option if there is only one filter available

      if (!$select.val() && $select.find('option').length === 2) {
        var value = $select.find('option:last').val();
        $select.val(value).trigger('change').next('.select2').addClass('single-value');
      }
    }
    /** {Rule} rule */

  }, {
    key: "_bindRuleOperator",
    value: function _bindRuleOperator(rule) {
      var filter = rule.getFilter();
      var $operator_container = rule.$el.find('.rule-operator-container');
      $operator_container.show();
      rule.$el.find('.rule-operator-container select option').each(function () {
        var $option = jQuery(this);
        $option.text(filter.operator_labels[$option.val()]);
      });
      this.filtertypes.getTypes().forEach(function (type) {
        type.transformRuleOperator(rule);
      });
      var $select = rule.$el.find('.rule-operator-container select');
      $select.select2({
        minimumResultsForSearch: -1,
        width: 150,
        theme: 'acs2'
      });

      if ($select.find('option').length === 1) {
        rule.$el.find('.rule-operator-container').addClass('single-value');
        $select.prop('disabled', true).select2('destroy');
        $operator_container.append("<span class=\"single-value__label\">".concat($select.find('option:selected').text(), "</span>"));
      }
    }
    /** {Rule} rule */

  }, {
    key: "_bindRuleValue",
    value: function _bindRuleValue(rule) {
      var $container = rule.$el.find('.rule-value-container');

      if ($container.find('.form-control').length > 1) {
        $container.addClass('range');
        $container.find('.form-control:first').addClass('first');
        $container.find('.form-control:last').addClass('last');
      }

      this.filtertypes.getTypes().forEach(function (type) {
        type.renderInput(rule);
      });
    }
    /**
     * Changes the input field names so it can be used on the backend
     */

  }, {
    key: "_sanitizeFieldNames",
    value: function _sanitizeFieldNames() {
      this.$el.find('li.rule-container').each(function () {
        var $rule = jQuery(this);
        $rule.find('select[name], input[name]').each(function () {
          var $input = jQuery(this);
          var name = $input.attr('name');
          name = name.replace('rule_', 'r');
          name = name.replace(/_/g, '-');
          $input.attr('name', name);
        });
      });
    }
    /**
     * Disable all querybuilder fields so they won't be posted in the form
     */

  }, {
    key: "disableFields",
    value: function disableFields() {
      return this.$el.find('input, select').prop('disabled', true);
    }
    /**
     * Enable all querybuilder fields so they will be posted in the form
     */

  }, {
    key: "enableFields",
    value: function enableFields() {
      return this.$el.find('input, select').prop('disabled', false);
    }
  }, {
    key: "getRules",
    value: function getRules() {
      var rules = this.$el.queryBuilder('getRules');
      var rule_container = jQuery('#ac-s').find('.rule-container');

      if (!rules) {
        return;
      }

      for (var i = 0; i < rules.rules.length; i++) {
        var $rule = jQuery(rule_container[i]);

        if ($rule.data('formatted_value')) {
          rules.rules[i].formatted_value = $rule.data('formatted_value');
        }
      }

      return rules;
    }
  }, {
    key: "compactRules",
    value: function compactRules() {
      this.$el.find('.rule-container').each(function () {
        new _rule["default"](jQuery(this)).compact();
      });
    }
  }, {
    key: "addRule",
    value: function addRule() {
      jQuery('.ac-button__add-filter').trigger('click');
    }
    /**
     * Checks is there are any rules that are closed
     */

  }, {
    key: "hasOpenRules",
    value: function hasOpenRules() {
      return this.$el.find('.rule-container:not(.compact)').length;
    }
    /**
     * @returns bool
     */

  }, {
    key: "validateForm",
    value: function validateForm() {
      return this.$el.queryBuilder('validate');
    }
  }, {
    key: "checkChangeState",
    value: function checkChangeState() {
      var newState = JSON.stringify(this.getRules());
      var $button = jQuery('.ac-search-button');

      if (this.getRules().rules.length === 0) {
        $button.addClass('-no-filters');
      } else {
        $button.removeClass('-no-filters');
      }

      if (newState === this.initialState) {
        $button.removeClass('button-primary');
      } else {
        $button.addClass('button-primary');
      }

      document.dispatchEvent(new CustomEvent('AC_Search_State_Change'));
    }
  }]);

  return ACQueryBuilder;
}();

exports["default"] = ACQueryBuilder;

/***/ }),

/***/ "./search/js/modules/ac-search-query.js":
/*!**********************************************!*\
  !*** ./search/js/modules/ac-search-query.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _filterTypes = _interopRequireDefault(__webpack_require__(/*! ./filter-types.js */ "./search/js/modules/filter-types.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ACSearchQuery =
/*#__PURE__*/
function () {
  function ACSearchQuery(query) {
    _classCallCheck(this, ACSearchQuery);

    this.rules = query.rules;
    this.filters = query.filters;
    this.i18n = query.i18n;
  }

  _createClass(ACSearchQuery, [{
    key: "hasFilters",
    value: function hasFilters() {
      return this.getFilters().length !== 0;
    }
  }, {
    key: "init",
    value: function init() {
      this.transformFilters(this.filters);
      this.checkRules();
    }
  }, {
    key: "checkRules",
    value: function checkRules() {
      var self = this;

      if (!this.rules) {
        return;
      }

      this.rules.rules.forEach(function (rule, index, object) {
        if (!self.getFilter(rule.id)) {
          object.splice(index, 1);
        }
      });
    }
  }, {
    key: "getFilters",
    value: function getFilters() {
      return this.filters;
    }
  }, {
    key: "getFilter",
    value: function getFilter(id) {
      var filters = this.getFilters();

      for (var i = 0; i < filters.length; i++) {
        var filter = filters[i];

        if (id === filter.id) {
          return filter;
        }
      }

      return false;
    }
  }, {
    key: "getRules",
    value: function getRules() {
      if (!this.rules) {
        return [];
      }

      return this.rules;
    }
  }, {
    key: "getRule",
    value: function getRule(index) {
      var rules = this.getRules().rules;

      if (!rules) {
        return false;
      }

      if (!index in rules) {
        return false;
      }

      return rules[index];
    }
  }, {
    key: "transformFilters",
    value: function transformFilters(filters) {
      var result = [];
      filters.forEach(function (filter) {
        _filterTypes["default"].getTypes().forEach(function (type) {
          filter = type.transformFilter(filter);
        });

        result.push(filter);
      });
      return result;
    }
  }]);

  return ACSearchQuery;
}();

exports["default"] = ACSearchQuery;

/***/ }),

/***/ "./search/js/modules/ac-templates.js":
/*!*******************************************!*\
  !*** ./search/js/modules/ac-templates.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplateGroup = exports.TemplateRule = void 0;
var TemplateRule = "\n<li id=\"{{= it.rule_id }}\" class=\"rule-container\">\n  {{? it.settings.display_errors }}\n    <div class=\"error-container\"><i class=\"{{= it.icons.error }}\"></i></div>\n  {{?}}\n  <div class=\"rule-filter-container\"></div>\n  <div class=\"rule-operator-container\"></div>\n  <div class=\"rule-value-container\"></div>\n  <div class=\"rule-header\">\n      <button type=\"button\" data-confirm=\"rule\">\n        <i class=\"dashicons dashicons-yes\"></i>\n      </button>\n      <button type=\"button\" data-delete=\"rule\">\n        <i class=\"dashicons dashicons-no-alt\"></i>\n      </button>\n  </div>\n</li>";
exports.TemplateRule = TemplateRule;
var TemplateGroup = "\n<div id=\"{{= it.group_id }}\" class=\"rules-group-container\">\n  <div class=\"rules-group-header\">\n    <div class=\"group-actions\">\n\t\t<div class=\"ac-button-group\">    \n\t      <button type=\"button\" class=\"button ac-button__add-filter\" data-add=\"rule\">\n\t        {{=ac_search.i18n.add_filter}}\n\t      </button>\n\t      <button type=\"button\" class=\"button ac-button__segments\"></button>\n      \t</div>\n    </div>\n    {{? it.settings.display_errors }}\n      <div class=\"error-container\"><i class=\"{{= it.icons.error }}\"></i></div>\n    {{?}}\n  </div>\n  <div class=rules-group-body>\n    <ul class=rules-list></ul>\n  </div>\n</div>";
exports.TemplateGroup = TemplateGroup;

/***/ }),

/***/ "./search/js/modules/filter-types.js":
/*!*******************************************!*\
  !*** ./search/js/modules/filter-types.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _date = _interopRequireDefault(__webpack_require__(/*! ./../types/date */ "./search/js/types/date.js"));

var _integer = _interopRequireDefault(__webpack_require__(/*! ./../types/integer */ "./search/js/types/integer.js"));

var _ajax = _interopRequireDefault(__webpack_require__(/*! ./../types/ajax */ "./search/js/types/ajax.js"));

var _select2_preload = _interopRequireDefault(__webpack_require__(/*! ./../types/select2_preload */ "./search/js/types/select2_preload.js"));

var _select = _interopRequireDefault(__webpack_require__(/*! ./../types/select */ "./search/js/types/select.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ACFilterTypes =
/*#__PURE__*/
function () {
  function ACFilterTypes() {
    _classCallCheck(this, ACFilterTypes);
  }

  _createClass(ACFilterTypes, null, [{
    key: "addType",
    value: function addType($class) {
      if (!this._types) {
        this._types = new Map();
      }

      this._types.set($class.filter_type, $class);
    }
  }, {
    key: "getType",
    value: function getType($type) {
      if (this._types.has($type)) {
        return this._types.get(type);
      }

      return false;
    }
  }, {
    key: "getTypes",
    value: function getTypes() {
      if (!this._types) {
        return new Map();
      }

      return this._types;
    }
  }]);

  return ACFilterTypes;
}(); // Register default types


ACFilterTypes.addType(_date["default"]);
ACFilterTypes.addType(_integer["default"]);
ACFilterTypes.addType(_ajax["default"]);
ACFilterTypes.addType(_select["default"]);
ACFilterTypes.addType(_select2_preload["default"]);
var _default = ACFilterTypes;
exports["default"] = _default;

/***/ }),

/***/ "./search/js/modules/operators.js":
/*!****************************************!*\
  !*** ./search/js/modules/operators.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCustomOperators = void 0;

var getCustomOperators = function getCustomOperators() {
  return jQuery.fn.queryBuilder.constructor.DEFAULTS.operators.concat([{
    type: 'date_past',
    nb_inputs: 0,
    multiple: false,
    apply_to: ['string']
  }, {
    type: 'date_future',
    nb_inputs: 0,
    multiple: false,
    apply_to: ['string']
  }, {
    type: 'date_today',
    nb_inputs: 0,
    multiple: false,
    apply_to: ['string']
  }, {
    type: 'lt_days_ago',
    nb_inputs: 1,
    multiple: false,
    apply_to: ['number']
  }, {
    type: 'gt_days_ago',
    nb_inputs: 1,
    multiple: false,
    apply_to: ['number']
  }, {
    type: 'within_days',
    nb_inputs: 1,
    multiple: false,
    apply_to: ['number']
  }]);
};

exports.getCustomOperators = getCustomOperators;

/***/ }),

/***/ "./search/js/modules/placement.js":
/*!****************************************!*\
  !*** ./search/js/modules/placement.js ***!
  \****************************************/
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

var Placement =
/*#__PURE__*/
function () {
  function Placement() {
    _classCallCheck(this, Placement);
  }

  _createClass(Placement, [{
    key: "getListScreenType",
    value: function getListScreenType() {
      var meta_type = AC.meta_type;
      var screen_type = meta_type;

      if (meta_type === 'post') {
        if (AC.list_screen === 'wp-media') {
          screen_type = 'media';
        }
      }

      return screen_type;
    }
  }, {
    key: "place",
    value: function place() {
      switch (this.getListScreenType()) {
        case 'media':
          new MediaOverview();
          break;

        case 'term':
          new TermOverview();
          break;

        case 'user':
          new UserOverview();
          break;

        default:
          new PostOverview();
      }

      jQuery('body').addClass('ac-search-enabled');
    }
  }]);

  return Placement;
}();

exports["default"] = Placement;

var MediaOverview = function MediaOverview() {
  _classCallCheck(this, MediaOverview);

  var $search_container = jQuery('<div class="ac-search"></div>');
  var $media_filters = jQuery('.wp-filter');
  $media_filters.addClass('search-active');
  $search_container.append(jQuery('#ac-s'));
  $search_container.append($media_filters.find('select'));
  $search_container.append(jQuery('#post-query-submit'));
  $media_filters.addClass('ac-search-active').append($search_container);
};

var PostOverview = function PostOverview() {
  _classCallCheck(this, PostOverview);

  jQuery('.tablenav.top .actions').each(function () {
    var $container = jQuery(this);
    jQuery('body').addClass('ac-search-post');

    if (!$container.hasClass('bulkactions')) {
      $container.removeClass('alignleft').addClass('ac-search').prependTo('.tablenav.top');
      $container.find('#ac-s').prependTo($container);
    }
  });
};

var TermOverview = function TermOverview() {
  _classCallCheck(this, TermOverview);

  var $search_container = jQuery('<div class="ac-search"></div>');
  var $add = jQuery('.ac-button__add-filter');
  var $button = jQuery('input[name=acp_filter_action]');
  var $filter_container = jQuery('.acp_tax_filters');
  var filter_count = jQuery('.acp-filter').length;
  $search_container.append(jQuery('#ac-s')).insertBefore('.tablenav:first .bulkactions').append($button);
  $filter_container.insertBefore($button);

  if (AdminColumns.Search.getRules().rules.length === 0 && filter_count === 0) {
    $button.addClass('-no-filters');
  }

  $button.on('click', function () {
    jQuery(this).parents('form').attr('method', 'get').submit();
  });
  $add.on('click', function () {
    $button.removeClass('-no-filters');
  });
  document.addEventListener('AC_Search_State_Change', function () {
    if (filter_count > 0) {
      $button.removeClass('-no-filters');
    }
  });
};

var UserOverview = function UserOverview() {
  _classCallCheck(this, UserOverview);

  var $search_container = jQuery('<div class="ac-search"></div>');
  var $add = jQuery('.ac-button__add-filter');
  var $button = jQuery('[name=acp_filter_action]');
  var filter_count = jQuery('.acp-filter').length;
  $search_container.append(jQuery('#ac-s')).append(jQuery('[class*=acp-filter], .alignleft.actions .acp-range')).append($button);

  if (AdminColumns.Search.getRules().rules.length === 0 && filter_count === 0) {
    $button.addClass('-no-filters');
  }

  jQuery('.tablenav:eq(0)').prepend($search_container);
  $add.on('click', function () {
    $button.removeClass('-no-filters');
  });
  document.addEventListener('AC_Search_State_Change', function () {
    if (filter_count > 0) {
      $button.removeClass('-no-filters');
    }
  });
};

/***/ }),

/***/ "./search/js/modules/rule.js":
/*!***********************************!*\
  !*** ./search/js/modules/rule.js ***!
  \***********************************/
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

var Rule =
/*#__PURE__*/
function () {
  function Rule($el, query) {
    _classCallCheck(this, Rule);

    this.$el = $el;
    this.query = query;

    if (!this.query) {
      this.query = AdminColumns.Search.query;
    }
  }

  _createClass(Rule, [{
    key: "getID",
    value: function getID() {
      return this.$el.attr('id');
    }
  }, {
    key: "getIndex",
    value: function getIndex() {
      var id = this.getID();
      return id.replace('ac-s_rule_', '');
    }
  }, {
    key: "getRule",
    value: function getRule() {
      return this.query.getRule(this.getIndex());
    }
  }, {
    key: "getFilterID",
    value: function getFilterID() {
      return this.$el.find('.rule-filter-container select').val();
    }
  }, {
    key: "getFilter",
    value: function getFilter() {
      var id = this.getFilterID();

      if (!id) {
        return false;
      }

      return this.query.getFilter(id);
    }
  }, {
    key: "getOperator",
    value: function getOperator() {
      return this.$el.find('.rule-operator-container select').val();
    }
  }, {
    key: "open",
    value: function open() {
      var $el = this.$el;
      $el.removeClass('compact');
      $el.find('.rule-filter-container, .rule-operator-container, .rule-value-container, .rule-header [data-confirm]').show();

      if (AdminColumns.Search.defaults.operators.nullable.includes(this.getOperator())) {
        $el.find('.rule-value-container').hide();
      }
    }
  }, {
    key: "compact",
    value: function compact() {
      var $el = this.$el;
      this.updateDisplay($el);
      $el.addClass('compact');
      $el.find('.rule-filter-container, .rule-operator-container, .rule-value-container, .rule-header [data-confirm]').hide();
    }
    /**
     * Updates the human readable display for a collapsed filter
     *
     * @param $el
     */

  }, {
    key: "updateDisplay",
    value: function updateDisplay($el) {
      var self = this;

      if (0 === $el.find('.rule-display').length) {
        $el.prepend('<div class="rule-display"></div>');
      }

      var $filter = $el.find('.rule-filter-container select option:selected');
      var $operator = $el.find('.rule-operator-container select option:selected');
      var $value_input = $el.find('.rule-value-container input[name], .rule-value-container select[name]');
      var value = '';

      if (1 === $value_input.length) {
        value = self.alterDisplayValue($value_input.val());

        if ($value_input.is('select')) {
          value = $value_input.find('option:selected').text();
        }
      } else {
        var values = [];
        jQuery.each($value_input, function (k, value) {
          values.push(self.alterDisplayValue(jQuery(value).val()));
        });
        value = values.join(' - ');
      } // No value if nullable


      if (AdminColumns.Search.defaults.operators.nullable.includes($operator.val())) {
        value = '';
      }

      var string = "<span class=\"rule-display__filter\">".concat($filter.data('label'), "</span>\n\t\t\t\t\t\t<span class=\"rule-display__operator\">").concat($operator.text(), "</span>\n\t\t\t\t\t\t<span class=\"rule-display__value\">").concat(value, "</span>");
      $el.find('.rule-display').html(string);
    }
  }, {
    key: "alterDisplayValue",
    value: function alterDisplayValue(value) {
      var filter_type = AdminColumns.Search.filtertypes.getTypes().get(this.getFilter().filter_type);

      if (filter_type && filter_type.hasOwnProperty('ruleDisplayValue')) {
        value = filter_type.ruleDisplayValue(value, this);
      }

      return value;
    }
  }]);

  return Rule;
}();

exports["default"] = Rule;

/***/ }),

/***/ "./search/js/modules/segments.js":
/*!***************************************!*\
  !*** ./search/js/modules/segments.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _modal = _interopRequireDefault(__webpack_require__(/*! ./segments/modal */ "./search/js/modules/segments/modal.js"));

var _url = __webpack_require__(/*! ../helpers/url */ "./search/js/helpers/url.js");

var _container = _interopRequireDefault(__webpack_require__(/*! ./segments/container */ "./search/js/modules/segments/container.js"));

var _toggleButton = _interopRequireDefault(__webpack_require__(/*! ./segments/toggle-button */ "./search/js/modules/segments/toggle-button.js"));

var _ajax = __webpack_require__(/*! ./segments/ajax */ "./search/js/modules/segments/ajax.js");

var _instructions = _interopRequireDefault(__webpack_require__(/*! ./segments/instructions */ "./search/js/modules/segments/instructions.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Segments =
/*#__PURE__*/
function () {
  function Segments(table, search, sorting) {
    _classCallCheck(this, Segments);

    // Dependencies
    this.Table = table;
    this.Search = search;
    this.Sorting = sorting;
    this.ToggleButton = new _toggleButton["default"](document.querySelector('.ac-button__segments'));
    this.Container = new _container["default"](document.querySelector('.ac-segments'));
    this.Modal = new _modal["default"](document.querySelector('#ac-modal-create-segment'), this); // Variables

    this.segments = new Map(); // Initiation

    AdminColumns.Modals.register(this.Modal, 'create_segment');
    this.initEvents();
  }

  _createClass(Segments, [{
    key: "getCurrentState",
    value: function getCurrentState() {
      return {
        rules: JSON.stringify(this.Search.getRules()),
        sorting: JSON.stringify(this.Sorting)
      };
    }
  }, {
    key: "unsetCurrent",
    value: function unsetCurrent() {
      var url = window.location.href;
      this.Container.setCurrent('');
      history.replaceState({}, '', (0, _url.removeParameterFromUrl)(url, 'ac-segment'));
    }
  }, {
    key: "checkButtonStatus",
    value: function checkButtonStatus() {
      var button = document.querySelector('.ac-segments__create .button');
      var enabled = true;
      var state = this.getCurrentState();
      var rules = JSON.parse(state.rules);

      if (rules.rules.length === 0) {
        enabled = false;
      }

      if (enabled) {
        button.removeAttribute('disabled');
      } else {
        button.setAttribute('disabled', 'disabled');
      }
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      var _this = this;

      this.ToggleButton.events.on('open', function () {
        _this.Container.show();

        _this.Container.moveToElement(_this.ToggleButton.el);
      });
      this.ToggleButton.events.on('close', function () {
        _this.Container.hide();
      });
      this.Container.el.addEventListener('click', function (e) {
        return e.stopPropagation();
      });
      document.addEventListener('click', function () {
        if (_this.ToggleButton.isOpen()) _this.ToggleButton.triggerClose();
      });
      this.Modal.events.on('save', function (data) {
        _this.Modal.setLoading();

        (0, _ajax.saveSegment)(data.name, JSON.stringify(_this.Search.getRules()), _this.Sorting.orderby, _this.Sorting.order).done(function (response) {
          _this.Modal.setLoading(false);

          if (response.success) {
            Segments.pushState(response.data.segment);

            _this.Container.addSegment(response.data.segment);

            _this.Container.setCurrent(response.data.segment.name);

            _this.Modal.finish();
          } else {
            _this.Modal.displayError(response.data.error);
          }
        });
      });
      new _instructions["default"]('.ac-segments__instructions', '#ac-segments-instructions');
    }
  }], [{
    key: "pushState",
    value: function pushState(segment) {
      history.replaceState({}, segment.name, segment.url);
    }
  }]);

  return Segments;
}();

exports["default"] = Segments;

/***/ }),

/***/ "./search/js/modules/segments/ajax.js":
/*!********************************************!*\
  !*** ./search/js/modules/segments/ajax.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveSegment = exports.retrieveSegments = exports.deleteSegment = void 0;

var _this = void 0;

var action = 'acp_search_segment_request';

var deleteSegment = function deleteSegment(name) {
  return jQuery.ajax({
    url: ajaxurl,
    method: 'post',
    data: {
      _ajax_nonce: AC.ajax_nonce,
      action: action,
      list_screen: AC.list_screen,
      layout: AC.layout,
      name: name,
      method: 'delete'
    }
  });
};

exports.deleteSegment = deleteSegment;

var retrieveSegments = function retrieveSegments() {
  return jQuery.ajax({
    url: ajaxurl,
    method: 'post',
    data: {
      _ajax_nonce: AC.ajax_nonce,
      action: action,
      list_screen: AC.list_screen,
      layout: AC.layout,
      name: name,
      method: 'read'
    }
  });
};

exports.retrieveSegments = retrieveSegments;

var saveSegment = function saveSegment(name, rules, orderby, order) {
  return jQuery.ajax({
    url: ajaxurl,
    method: 'post',
    data: {
      _ajax_nonce: AC.ajax_nonce,
      action: action,
      list_screen: AC.list_screen,
      layout: AC.layout,
      name: name,
      method: 'create',
      rules: rules,
      order: order,
      orderby: orderby
    }
  });
};

exports.saveSegment = saveSegment;

var saveCurrent = function saveCurrent(name) {
  return jQuery.ajax({
    url: ajaxurl,
    method: 'post',
    data: {
      _ajax_nonce: AC.ajax_nonce,
      action: action,
      list_screen: AC.list_screen,
      layout: AC.layout,
      name: name,
      method: 'create',
      rules: JSON.stringify(AdminColumns.Search.getRules()),
      order: _this.Sorting.order,
      orderby: _this.Sorting.orderby
    }
  });
};

/***/ }),

/***/ "./search/js/modules/segments/container.js":
/*!*************************************************!*\
  !*** ./search/js/modules/segments/container.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _strings = __webpack_require__(/*! ../../helpers/strings */ "./search/js/helpers/strings.js");

var _document = __webpack_require__(/*! ../../helpers/document */ "./search/js/helpers/document.js");

var _ajax = __webpack_require__(/*! ./ajax */ "./search/js/modules/segments/ajax.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SegmentContainer =
/*#__PURE__*/
function () {
  function SegmentContainer(el) {
    _classCallCheck(this, SegmentContainer);

    this.el = el;
    this.current = null;
    this.addNewButton = el.querySelector('.ac-segments__create button');
    this.init();
    this.refreshSegments();
  }

  _createClass(SegmentContainer, [{
    key: "init",
    value: function init() {
      this.addNewButton.addEventListener('click', function () {
        AdminColumns.Modals.get('create_segment').open();
      });
    }
  }, {
    key: "show",
    value: function show() {
      this.el.classList.add('-active');
    }
  }, {
    key: "hide",
    value: function hide() {
      this.el.classList.remove('-active');
    }
  }, {
    key: "moveToElement",
    value: function moveToElement(el) {
      var offset = (0, _document.getOffset)(el);
      this.el.style.left = (0, _strings.toPixel)(offset.left + Math.round(el.offsetWidth / 2));
      this.el.style.top = (0, _strings.toPixel)(offset.top);
    }
  }, {
    key: "removeSegment",
    value: function removeSegment(name) {
      var row = this.el.querySelector(".ac-segments__list [data-name=\"".concat(name, "\"]"));

      if (row) {
        row.remove();
      }
    }
  }, {
    key: "addSegment",
    value: function addSegment(segment) {
      var element = document.createElement("div");
      element.classList.add('ac-segment');
      element.dataset.name = segment.name;
      element.innerHTML = "<a class=\"ac-segment__label\" href=\"".concat(segment.url, "\">").concat(segment.name, "</a>\n\t\t\t\t\t\t<button class=\"ac-segment__delete\"><span class=\"dashicons dashicons-no-alt\"></span></button>");
      this.el.querySelector('.ac-segments__list').insertAdjacentElement('beforeend', element);
      this.initSegmentEvents(element);
      return element;
    }
  }, {
    key: "setCurrent",
    value: function setCurrent(label) {
      this.current = label;
      var segments = document.querySelectorAll('.ac-segments__list .ac-segment');

      for (var i = 0; i < segments.length; i++) {
        var segment = segments[i];
        segment.classList.remove('-current');

        if (segment.dataset.name === this.current) {
          segment.classList.add('-current');
        }
      }
    }
  }, {
    key: "initSegmentEvents",
    value: function initSegmentEvents(segment) {
      var _this = this;

      var name = segment.dataset.name;
      segment.querySelector('.ac-segment__delete').addEventListener('click', function (e) {
        e.preventDefault();
        (0, _ajax.deleteSegment)(name).done(function (response) {
          if (response.success) {
            _this.removeSegment(name);
          }
        });
      });
    }
  }, {
    key: "refreshSegments",
    value: function refreshSegments() {
      var _this2 = this;

      (0, _ajax.retrieveSegments)().done(function (response) {
        response.data.forEach(function (segment) {
          _this2.addSegment(segment);
        });

        _this2.setCurrent(_this2.el.dataset.initial);
      });
    }
  }]);

  return SegmentContainer;
}();

exports["default"] = SegmentContainer;

/***/ }),

/***/ "./search/js/modules/segments/instructions.js":
/*!****************************************************!*\
  !*** ./search/js/modules/segments/instructions.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Instructions = function Instructions(element_selector, info_selector) {
  _classCallCheck(this, Instructions);

  // create pointer
  var el = jQuery(element_selector);
  var info = jQuery(info_selector);
  var timeout = null;
  el.pointer({
    content: info.html(),
    position: {
      edge: 'left',
      align: 'middle'
    },
    pointerClass: 'ac-wp-pointer wp-pointer wp-pointer-left noclick -nodismiss',
    pointerWidth: 250
  });
  el.hover(function () {
    el.pointer('open');
    clearTimeout(timeout);
  }, function () {
    timeout = setTimeout(function () {
      el.pointer('close');
    }, 500);
  });
};

exports["default"] = Instructions;

/***/ }),

/***/ "./search/js/modules/segments/modal.js":
/*!*********************************************!*\
  !*** ./search/js/modules/segments/modal.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _modal = _interopRequireDefault(__webpack_require__(/*! ../../../../../admin-columns/src/js/modules/modal */ "../admin-columns/src/js/modules/modal.js"));

var _segments = _interopRequireDefault(__webpack_require__(/*! ../segments */ "./search/js/modules/segments.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var nanobus = __webpack_require__(/*! nanobus */ "./node_modules/nanobus/index.js");

var SegmentModal =
/*#__PURE__*/
function (_Modal) {
  _inherits(SegmentModal, _Modal);

  /**
   *
   * @param {HTMLElement} el
   * @param {Segments} segments
   */
  function SegmentModal(el, segments) {
    var _this;

    _classCallCheck(this, SegmentModal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SegmentModal).call(this, el));
    _this.segments = segments;
    _this.form = document.getElementById('frm_create_segment');
    _this.formelements = _this.form.elements;
    _this.events = nanobus();

    _this.initFormEvents();

    return _this;
  }

  _createClass(SegmentModal, [{
    key: "initFormEvents",
    value: function initFormEvents() {
      var self = this;
      this.form.addEventListener('submit', function (e) {
        e.preventDefault();
        self.save();
      });
      this.form.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          self.form.dispatchEvent(new Event('submit'));
        }
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this.displayError('');
      this.formelements['segment_name'].value = '';
      return this;
    }
  }, {
    key: "onOpen",
    value: function onOpen() {
      this.reset();
      var elements = this.form.elements;
      setTimeout(function () {
        elements['segment_name'].focus();
      }, 100);
    }
  }, {
    key: "finish",
    value: function finish() {
      this.reset();
      this.close();
    }
  }, {
    key: "save",
    value: function save() {
      var self = this;
      var name = this.formelements['segment_name'].value;
      this.events.emit('save', {
        name: name
      });
    }
  }, {
    key: "setLoading",
    value: function setLoading() {
      var on = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var loading = this.el.querySelector('.ac-modal__loading');

      if (on) {
        loading.style.display = 'inline-block';
      } else {
        loading.style.display = 'none';
      }
    }
  }, {
    key: "displayError",
    value: function displayError(msg) {
      this.el.querySelector('.ac-modal__error').textContent = msg;
    }
  }]);

  return SegmentModal;
}(_modal["default"]);

exports["default"] = SegmentModal;

/***/ }),

/***/ "./search/js/modules/segments/toggle-button.js":
/*!*****************************************************!*\
  !*** ./search/js/modules/segments/toggle-button.js ***!
  \*****************************************************/
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

var ToggleButton =
/*#__PURE__*/
function () {
  function ToggleButton(el) {
    _classCallCheck(this, ToggleButton);

    this.el = el;
    this.events = nanobus();
    this.init();
  }

  _createClass(ToggleButton, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.el.addEventListener('click', function (e) {
        e.stopPropagation();

        if (_this.isOpen()) {
          _this.triggerClose();
        } else {
          _this.triggerOpen();
        }
      });
    }
  }, {
    key: "isOpen",
    value: function isOpen() {
      return this.el.classList.contains('-open');
    }
  }, {
    key: "triggerOpen",
    value: function triggerOpen() {
      this.el.classList.add('-open');
      this.events.emit('open');
    }
  }, {
    key: "triggerClose",
    value: function triggerClose() {
      this.el.classList.remove('-open');
      this.events.emit('close');
    }
  }]);

  return ToggleButton;
}();

exports["default"] = ToggleButton;

/***/ }),

/***/ "./search/js/table.js":
/*!****************************!*\
  !*** ./search/js/table.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _acQueryBuilder = _interopRequireDefault(__webpack_require__(/*! ./modules/ac-query-builder.js */ "./search/js/modules/ac-query-builder.js"));

var _segments = _interopRequireDefault(__webpack_require__(/*! ./modules/segments.js */ "./search/js/modules/segments.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

global.AdminColumns = typeof AdminColumns !== "undefined" ? AdminColumns : {};
jQuery(document).ready(function () {
  if (jQuery('#ac-s').length && ac_search.filters.length) {
    AdminColumns.Search = new _acQueryBuilder["default"]('#ac-s', ac_search);
    AdminColumns.Search.init();

    if (document.querySelector('.ac-segments')) {
      AdminColumns.Segments = new _segments["default"](AdminColumns.Table, AdminColumns.Search, ACP_Sorting);
    }

    jQuery('[name="acp_filter_action"], #post-query-submit').addClass('ac-search-button');
  } // If Search is disabled, segments can't work


  if (!document.getElementById('ac-s') && AdminColumns.Table && AdminColumns.Table.Actions) {
    jQuery('.ac-table-button.-segments').remove();
    AdminColumns.Table.Actions.refresh();
  }

  jQuery(document).on('wheel', '.ui-datepicker-year', function (e) {
    e.preventDefault();

    if (e.originalEvent.deltaY > 1) {
      jQuery(this).find('option:selected').next().prop('selected', true).trigger('change');
    }

    if (e.originalEvent.deltaY < -1) {
      jQuery(this).find('option:selected').prev().prop('selected', true).trigger('change');
    }
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./search/js/types/ajax.js":
/*!*********************************!*\
  !*** ./search/js/types/ajax.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default2 = _interopRequireDefault(__webpack_require__(/*! ./default */ "./search/js/types/default.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = Object.assign({}, _default2["default"], {
  filter_type: 'select2_ajax',
  renderInput: function renderInput(rule) {
    if (rule.getFilter().filter_type !== this.filter_type) {
      return;
    }

    var rule_request = rule.getRule();
    var filter = rule.getFilter();
    var $select = rule.$el.find('.rule-value-container select');
    var $rule_container = $select.closest('.rule-container');

    if (rule_request && rule_request.formatted_value) {
      $select.append(jQuery('<option/>', {
        value: rule_request.value,
        text: rule_request.formatted_value,
        selected: true
      })).trigger('change');
      $rule_container.data('formatted_value', rule_request.formatted_value);
      AdminColumns.Search.validateForm();
    }

    $select.ac_select2({
      width: 200,
      theme: 'acs2',
      escapeMarkup: function escapeMarkup(markup) {
        return markup;
      },
      ajax: {
        method: 'post',
        url: ajaxurl,
        dataType: 'json',
        delay: 500,
        data: function data(params) {
          return {
            action: 'acp_search_comparison_request',
            method: 'get_options',
            layout: AC.layout,
            searchterm: params.term,
            page: params.page ? params.page : 1,
            column: filter.id,
            list_screen: AC.list_screen,
            item_id: 47,
            _ajax_nonce: AC.ajax_nonce
          };
        },
        processResults: function processResults(response) {
          return response.data;
        }
      }
    });
    $select.on('select2:select', function () {
      $rule_container.data('formatted_value', $select.find('option:selected').text());
      $rule_container.find('[data-confirm]').trigger('click').hide();
      jQuery(this).closest('[data-confirm]').trigger('click').hide();
    });
  },
  transformFilter: function transformFilter(filter) {
    if (filter.use_ajax && filter.use_pagination) {
      filter.filter_type = this.filter_type;
      filter.input = 'select';
    }

    return filter;
  }
});

exports["default"] = _default;

/***/ }),

/***/ "./search/js/types/date.js":
/*!*********************************!*\
  !*** ./search/js/types/date.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default2 = _interopRequireDefault(__webpack_require__(/*! ./default */ "./search/js/types/default.js"));

var _date = __webpack_require__(/*! ../helpers/date */ "./search/js/helpers/date.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var i18n = {
  DAYS_AGO: ac_search.i18n.days_ago,
  DAYS: ac_search.i18n.days
};

var _default = Object.assign({}, _default2["default"], {
  filter_type: 'date',
  renderDatePickerInputs: function renderDatePickerInputs(rule) {
    var $el1 = rule.$el.find('.rule-value-container input:first');
    var $el2 = rule.$el.find('.rule-value-container input:eq(1)');
    $el1.css({
      position: 'relative',
      'z-index': 1000
    }).on('keydown', function (e) {
      var keyCode = e.keyCode || e.which;

      if (keyCode === 9) {
        e.preventDefault();
      }
    }).attr('autocomplete', 'off').datepicker({
      dateFormat: 'yy-mm-dd',
      changeYear: true,
      yearRange: "c-60:c+10",
      beforeShow: function beforeShow() {
        jQuery('body').addClass('ac-jqui');
        jQuery('#ui-datepicker-div .ui-datepicker-year').hide();
      },
      onClose: function onClose(selectedDate) {
        $el2.datepicker("option", "minDate", selectedDate).focus();
      }
    });
    $el2.css({
      position: 'relative',
      'z-index': 1000
    }).attr('autocomplete', 'off').datepicker({
      dateFormat: 'yy-mm-dd',
      changeYear: true,
      yearRange: "c-60:c+10",
      beforeShow: function beforeShow() {
        jQuery('body').addClass('ac-jqui');
      },
      onClose: function onClose(selectedDate) {
        $el1.datepicker("option", "maxDate", selectedDate);
      }
    });
    this.setAfterLabel(rule, '');
  },
  getAfterLabel: function getAfterLabel(rule) {
    return rule.$el.find('.rule-value-container .rule-value-after-label').html();
  },
  setAfterLabel: function setAfterLabel(rule, label) {
    if (!rule.$el) {
      return;
    }

    if (rule.$el.find('.rule-value-container .rule-value-after-label').length === 0) {
      rule.$el.find('.rule-value-container').append("<span class=\"rule-value-after-label\"></span>");
    }

    rule.$el.find('.rule-value-container .rule-value-after-label').html(label);
  },
  renderNumericInputs: function renderNumericInputs(rule) {
    rule.$el.find('.rule-value-container input').attr('type', 'number').datepicker('destroy');
  },

  /**
   * @param {Rule} rule
   */
  renderInput: function renderInput(rule) {
    var _this = this;

    if (this.filter_type !== rule.getFilter().filter_type) {
      return;
    }

    var $el2 = rule.$el.find('.rule-value-container input:eq(1)');

    if ($el2.is(':visible')) {
      rule.$el.find('.rule-value-container').addClass('between').find('.ac-s__separator').text('-');
    }

    var operatorSelect = rule.$el.find('.rule-operator-container select');
    operatorSelect.on('change', function () {
      _this.determineRenderInputs(rule);
    });
    this.determineRenderInputs(rule);
    rule.$el.addClass("rule-container--date");
  },
  determineAfterLabel: function determineAfterLabel(rule) {
    switch (rule.getOperator()) {
      case 'lt_days_ago':
      case 'gt_days_ago':
        this.setAfterLabel(rule, i18n.DAYS_AGO);
        break;

      case 'within_days':
        this.setAfterLabel(rule, i18n.DAYS);
        break;

      default:
        this.setAfterLabel(rule, '');
    }
  },
  determineRenderInputs: function determineRenderInputs(rule) {
    switch (rule.getOperator()) {
      case 'lt_days_ago':
      case 'gt_days_ago':
      case 'within_days':
        this.renderNumericInputs(rule);
        break;

      default:
        this.renderDatePickerInputs(rule);
    }

    this.determineAfterLabel(rule);
  },
  transformFilter: function transformFilter(filter) {
    if (filter.type === 'date' || filter.type === 'datetime') {
      filter.filter_type = this.filter_type;
    }

    return filter;
  },
  ruleDisplayValue: function ruleDisplayValue(value, rule) {
    if (!value) {
      return value;
    }

    switch (rule.getOperator()) {
      case 'lt_days_ago':
      case 'gt_days_ago':
      case 'within_days':
        return value + ' ' + this.getAfterLabel(rule);

      default:
        return (0, _date.formatDate)('d M yy', value);
    }
  }
});

exports["default"] = _default;

/***/ }),

/***/ "./search/js/types/default.js":
/*!************************************!*\
  !*** ./search/js/types/default.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var defaultType = {
  filter_type: '',

  /**
   * @param {Rule} rule
   * */
  renderInput: function renderInput(rule) {},
  transformFilter: function transformFilter(filter) {
    return filter;
  },

  /** @param {Rule} rule */
  transformRuleOperator: function transformRuleOperator(rule) {},
  ruleDisplayValue: function ruleDisplayValue(value, rule) {
    return value;
  }
};
var _default = defaultType;
exports["default"] = _default;

/***/ }),

/***/ "./search/js/types/integer.js":
/*!************************************!*\
  !*** ./search/js/types/integer.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default2 = _interopRequireDefault(__webpack_require__(/*! ./default */ "./search/js/types/default.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = Object.assign({}, _default2["default"], {
  filter_type: 'integer',

  /** @param {Rule} rule */
  renderInput: function renderInput(rule) {
    var $el1 = rule.$el.find('.rule-value-container input:first');
    var $el2 = rule.$el.find('.rule-value-container input:eq(1)');
    $el1.on('blur change', function () {
      var minvalue = parseInt(jQuery(this).val());
      var maxvalue = parseInt($el2.val());

      if (maxvalue < minvalue) {
        $el2.val(minvalue);
      }
    });
    $el2.on('change', function () {
      var maxvalue = parseInt(jQuery(this).val());
      var minvalue = parseInt($el1.val());

      if (minvalue > maxvalue) {
        $el1.val(maxvalue);
      }
    });
  },
  transformFilter: function transformFilter(filter) {
    if (filter.type === 'integer') {
      filter.filter_type = this.filter_type;
    }

    if (filter.type === 'double') {
      filter.filter_type = this.filter_type;
      filter.validation = {
        step: 0.01
      };
    }

    return filter;
  }
});

exports["default"] = _default;

/***/ }),

/***/ "./search/js/types/select.js":
/*!***********************************!*\
  !*** ./search/js/types/select.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default2 = _interopRequireDefault(__webpack_require__(/*! ./default */ "./search/js/types/default.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _default = Object.assign({}, _default2["default"], {
  filter_type: 'select',

  /** @param {Rule} rule */
  renderInput: function renderInput(rule) {
    var filter = rule.getFilter();

    if (filter.input !== 'select' || filter.use_ajax) {
      return;
    }

    var settings = {
      width: 150,
      theme: 'acs2'
    };

    if (Object.keys(filter.values).length < 10) {
      settings.minimumResultsForSearch = -1;
    }

    rule.$el.find('.rule-value-container select').select2(settings);
  },
  transformFilter: function transformFilter(filter) {
    if (_typeof(filter.values) === 'object') {
      filter.input = 'select';
    }

    return filter;
  }
});

exports["default"] = _default;

/***/ }),

/***/ "./search/js/types/select2_preload.js":
/*!********************************************!*\
  !*** ./search/js/types/select2_preload.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default2 = _interopRequireDefault(__webpack_require__(/*! ./default */ "./search/js/types/default.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = Object.assign({}, _default2["default"], {
  filter_type: 'select2_preload',
  renderInput: function renderInput(rule) {
    if (rule.getFilter().filter_type !== this.filter_type) {
      return;
    }

    var self = this;
    var filter = rule.getFilter();
    var rule_request = rule.getRule();
    var $select = rule.$el.find('.rule-value-container select');
    $select.prop('disabled', true).after('<span class="spinner"></span>');

    if (filter.ajax_options) {
      this.renderSelect2(rule, filter.ajax_options);
    } else {
      this.getPreloadedOptions(filter).done(function (response) {
        filter.ajax_options = response.data.results;
        self.renderSelect2(rule, response.data.results);
      });
    }

    if (rule_request) {
      $select.append(jQuery('<option/>', {
        value: rule_request.value,
        text: rule_request.formatted_value,
        selected: true
      })).trigger('change');
      AdminColumns.Search.validateForm();
    }
  },
  renderSelect2: function renderSelect2(rule, options) {
    var $select = rule.$el.find('.rule-value-container select');
    var $rule_container = $select.closest('.rule-container');
    $select.prop('disabled', false);
    $rule_container.find('.spinner').remove();
    $select.ac_select2({
      width: 200,
      theme: 'acs2',
      data: options,
      minimumResultsForSearch: 10
    }).trigger('change');
    $rule_container.data('formatted_value', $select.find('option:selected').text());
    $select.on('select2:select', function () {
      $rule_container.data('formatted_value', $select.find('option:selected').text());
      $rule_container.find('[data-confirm]').trigger('click').hide();
      jQuery(this).closest('[data-confirm]').trigger('click').hide();
    });
  },
  getPreloadedOptions: function getPreloadedOptions(filter) {
    return jQuery.ajax({
      url: ajaxurl,
      dataType: 'json',
      method: 'post',
      data: {
        action: 'acp_search_comparison_request',
        method: 'get_options',
        layout: AC.layout,
        column: filter.id,
        list_screen: AC.list_screen,
        item_id: 47,
        _ajax_nonce: AC.ajax_nonce
      }
    });
  },
  transformFilter: function transformFilter(filter) {
    if (filter.use_ajax && !filter.use_pagination) {
      filter.filter_type = this.filter_type;
      filter.input = 'select';
    }

    return filter;
  }
});

exports["default"] = _default;

/***/ })

/******/ });
//# sourceMappingURL=table.bundle.js.map