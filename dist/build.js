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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/*!
 * Vue.js v2.3.0
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

var toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return toString.call(v) === '[object RegExp]'
}

/**
 * Convert a value to a string that is actually rendered.
 */
function _toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 */
function noop () {}

/**
 * Always return false.
 */
var no = function () { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      return JSON.stringify(a) === JSON.stringify(b)
    } catch (e) {
      // possible circular reference
      return a === b
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "production" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "production" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

var warn = noop;
var tip = noop;
var formatComponentName;

if (false) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.error("[Vue warn]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var name = typeof vm === 'string'
      ? vm
      : typeof vm === 'function' && vm.options
        ? vm.options.name
        : vm._isVue
          ? vm.$options.name || vm.$options._componentTag
          : vm.name;

    var file = vm._isVue && vm.$options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  var generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

function handleError (err, vm, info) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, info);
  } else {
    if (false) {
      warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    }
    /* istanbul ignore else */
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
}

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    } )); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve, reject) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var arguments$1 = arguments;

    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments$1[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true,
  isSettingProps: false
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (false) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (hasOwn(target, key)) {
    target[key] = val;
    return val
  }
  var ob = (target ).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && typeof key === 'number') {
    target.splice(key, 1);
    return
  }
  var ob = (target ).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (false) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') {
      "production" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        childVal.call(this),
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return Object.create(parentVal || null) }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (false) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (false) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (false) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (false) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (false) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      'Invalid prop: type check failed for prop "' + name + '".' +
      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    valid = typeof value === expectedType.toLowerCase();
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

var mark;
var measure;

if (false) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (false) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      "referenced during render. Make sure to declare reactive data " +
      "properties in the data option.",
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function () {
  var node = new VNode();
  node.text = '';
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      for (var i = 0; i < fns.length; i++) {
        fns[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      "production" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (false) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (isDef(last) && isDef(last.text)) {
        (last).text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isDef(c.text) && isDef(last) && isDef(last.text)) {
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + ((nestedIndex)) + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "production" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            reject(
               false
                ? ("timeout (" + (res.timeout) + "ms)")
                : null
            );
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && isDef(c.componentOptions)) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        this$1.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (false) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args);
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
        child.data && child.data.slot != null) {
      var name = child.data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot;
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns
) {
  var res = {};
  for (var i = 0; i < fns.length; i++) {
    res[fns[i][0]] = fns[i][1];
  }
  return res
}

/*  */

var activeInstance = null;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // remove reference to DOM nodes (prevents leak)
    vm.$options._parentElm = vm.$options._refElm = null;
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (false) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (false) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure((name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure((name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render
  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    if (false) {
      observerState.isSettingProps = true;
    }
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    if (false) {
      observerState.isSettingProps = false;
    }
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  queue.length = activatedChildren.length = 0;
  has = {};
  if (false) {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (false) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdateHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdateHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i >= 0 && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(Math.max(i, index) + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  false
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "production" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  if (this.user) {
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    }
  } else {
    value = this.getter.call(vm, vm);
  }
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  popTarget();
  this.cleanupDeps();
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch) { initWatch(vm, opts.watch); }
}

var isReservedProp = {
  key: 1,
  ref: 1,
  slot: 1
};

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (false) {
      if (isReservedProp[key] || config.isReservedAttr(key)) {
        warn(
          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (vm.$parent && !observerState.isSettingProps) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "production" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var i = keys.length;
  while (i--) {
    if (props && hasOwn(props, keys[i])) {
      "production" !== 'production' && warn(
        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(keys[i])) {
      proxy(vm, "_data", keys[i]);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (false) {
      if (getter === undefined) {
        warn(
          ("No getter function has been defined for computed property \"" + key + "\"."),
          vm
        );
        getter = noop;
      }
    }
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (false) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    if (false) {
      if (methods[key] == null) {
        warn(
          "method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
    }
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (vm, key, handler) {
  var options;
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  vm.$watch(key, handler, options);
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (false) {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (false) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    // isArray here
    var isArray = Array.isArray(inject);
    var result = Object.create(null);
    var keys = isArray
      ? inject
      : hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = isArray ? key : inject[key];
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
    }
    return result
  }
}

/*  */

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    data: data,
    props: props,
    children: children,
    parent: context,
    listeners: data.on || {},
    injections: resolveInject(Ctor.options.inject, context),
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (false) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  if (isUndef(Ctor.cid)) {
    Ctor = resolveAsyncComponent(Ctor, baseCtor, context);
    if (Ctor === undefined) {
      // return nothing if this is indeed an async component
      // wait for the callback to trigger parent update.
      return
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  data = data || {};

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners
    data = {};
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
  );
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "production" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
      typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (vnode !== undefined) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (Array.isArray(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && isUndef(child.ns)) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      extend(props, bindObject);
    }
    return scopedSlotFn(props) || fallback
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes && "production" !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (Array.isArray(keyCodes)) {
    return keyCodes.indexOf(eventKeyCode) === -1
  } else {
    return keyCodes !== eventKeyCode
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp
) {
  if (value) {
    if (!isObject(value)) {
      "production" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      for (var key in value) {
        if (key === 'class' || key === 'style') {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];
        }
      }
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var tree = this._staticTrees[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (false) {
        vnode = vm.$options.renderError
          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
          : vm._vnode;
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (false) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = _toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
}

/*  */

var uid$1 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$1++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (false) {
      startTag = "vue-perf-init:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (false) {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (false) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(((vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (false) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (false) {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (false) {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (cache, current, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        if (cachedNode !== current) {
          pruneCacheEntry(cachedNode);
        }
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, this._vnode, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, this._vnode, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (false) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Vue$3.version = '2.3.0';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return genClassFromData(data)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function genClassFromData (data) {
  var dynamicClass = data.class;
  var staticClass = data.staticClass;
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (isUndef(value)) {
    return ''
  }
  if (typeof value === 'string') {
    return value
  }
  var res = '';
  if (Array.isArray(value)) {
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (isDef(value[i])) {
        if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
          res += stringified + ' ';
        }
      }
    }
    return res.slice(0, -1)
  }
  if (isObject(value)) {
    for (var key in value) {
      if (value[key]) { res += key + ' '; }
    }
    return res.slice(0, -1)
  }
  /* istanbul ignore next */
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "production" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
        refs[key].push(ref);
      } else {
        refs[key] = [ref];
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key &&
    a.tag === b.tag &&
    a.isComment === b.isComment &&
    isDef(a.data) === isDef(b.data) &&
    sameInputType(a, b)
  )
}

// Some browsers do not support dynamically changing type for <input>
// so they need to be treated as different nodes
function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (false) {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (false) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref) {
    if (isDef(parent)) {
      if (isDef(ref)) {
        if (ref.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
        i !== vnode.context &&
        isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (false) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }
    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
        isTrue(oldVnode.isStatic) &&
        vnode.key === oldVnode.key &&
        (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.elm = oldVnode.elm;
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }
    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (false) {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if (false) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (isDef(vnode.tag)) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (false) {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (isDef(vnode.parent)) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    false
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }
  // check capture modifier
  if (modifiers && modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers && modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }
  var events;
  if (modifiers && modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }
  var newHandler = { value: value, modifiers: modifiers };
  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

function getAndRemoveAttr (el, name) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var modelRs = parseModel(value);
  if (modelRs.idx === null) {
    return (value + "=" + assignment)
  } else {
    return "var $$exp = " + (modelRs.exp) + ", $$idx = " + (modelRs.idx) + ";" +
      "if (!Array.isArray($$exp)){" +
        value + "=" + assignment + "}" +
      "else{$$exp.splice($$idx, 1, " + assignment + ")}"
  }
}

/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;

function parseModel (val) {
  str = val;
  len = str.length;
  index$1 = expressionPos = expressionEndPos = 0;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    return {
      exp: val,
      idx: null
    }
  }

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.substring(0, expressionPos),
    idx: val.substring(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (false) {
    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (tag === 'input' && dynamicType) {
      warn$1(
        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
        "v-model does not support dynamic input types. Use v-if branches instead."
      );
    }
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (false) {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
      "?_i(" + value + "," + valueBinding + ")>-1" + (
        trueValueBinding === 'true'
          ? (":(" + value + ")")
          : (":_q(" + value + "," + trueValueBinding + ")")
      )
  );
  addHandler(el, CHECKBOX_RADIO_TOKEN,
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;
  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number || type === 'number') {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  var event;
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    // Chrome fires microtasks in between click/change, leads to #4521
    event = isChrome ? 'click' : 'change';
    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  if (once$$1) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function (ev) {
      var res = arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, handler, capture, _target);
      }
    };
  }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = cur == null ? '' : String(cur);
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (
  elm,
  vnode,
  checkVal
) {
  return (!elm.composing && (
    vnode.tag === 'option' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
  return document.activeElement !== elm && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if ((isDef(modifiers) && modifiers.number) || elm.type === 'number') {
    return toNumber(value) !== toNumber(newVal)
  }
  if (isDef(modifiers) && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var prefixes = ['Webkit', 'Moz', 'ms'];

var testEl;
var normalize = cached(function (prop) {
  testEl = testEl || document.createElement('div');
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in testEl.style)) {
    return prop
  }
  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefixed = prefixes[i] + upper;
    if (prefixed in testEl.style) {
      return prefixed
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
      isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likley wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    el.setAttribute('class', cur.trim());
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout;

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
  addClass(el, cls);
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var ref = (data);
  var css = ref.css;
  var type = ref.type;
  var enterClass = ref.enterClass;
  var enterToClass = ref.enterToClass;
  var enterActiveClass = ref.enterActiveClass;
  var appearClass = ref.appearClass;
  var appearToClass = ref.appearToClass;
  var appearActiveClass = ref.appearActiveClass;
  var beforeEnter = ref.beforeEnter;
  var enter = ref.enter;
  var afterEnter = ref.afterEnter;
  var enterCancelled = ref.enterCancelled;
  var beforeAppear = ref.beforeAppear;
  var appear = ref.appear;
  var afterAppear = ref.afterAppear;
  var appearCancelled = ref.appearCancelled;
  var duration = ref.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (false) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
          pendingNode.tag === vnode.tag &&
          pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb) || el.nodeType !== 1) {
    return
  }

  var ref = (data);
  var css = ref.css;
  var type = ref.type;
  var leaveClass = ref.leaveClass;
  var leaveToClass = ref.leaveToClass;
  var leaveActiveClass = ref.leaveActiveClass;
  var beforeLeave = ref.beforeLeave;
  var leave = ref.leave;
  var afterLeave = ref.afterLeave;
  var leaveCancelled = ref.leaveCancelled;
  var delayLeave = ref.delayLeave;
  var duration = ref.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (false) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model$1 = {
  inserted: function inserted (el, binding, vnode) {
    if (vnode.tag === 'select') {
      var cb = function () {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
    } else if (vnode.tag === 'textarea' || el.type === 'text' || el.type === 'password') {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var needReset = el.multiple
        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
      if (needReset) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "production" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  for (var i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false
    }
  }
  return true
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition && !isIE9) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    if (transition && !isIE9) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model$1,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag; });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (false) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (false) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (false) {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var body = document.body;
    var f = body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      if (this._hasMove != null) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (false) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if (false) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

// check whether current browser encodes a char inside attribute values
function shouldDecode (content, encoded) {
  var div = document.createElement('div');
  div.innerHTML = "<div a=\"" + content + "\">";
  return div.innerHTML.indexOf(encoded) > 0
}

// #3663
// IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/*  */

var decoder;

function decode (html) {
  decoder = decoder || document.createElement('div');
  decoder.innerHTML = html;
  return decoder.textContent
}

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var singleAttrIdentifier = /([^\s"'<>/=]+)/;
var singleAttrAssign = /(?:=)/;
var singleAttrValues = [
  // attr value double quotes
  /"([^"]*)"+/.source,
  // attr value, single quotes
  /'([^']*)'+/.source,
  // attr value, no quotes
  /([^\s"'=<>`]+)/.source
];
var attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
);

// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
var startTagOpen = new RegExp('^<' + qnameCapture);
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          continue
        }
      }

      var text = (void 0), rest$1 = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest$1 = html.slice(textEnd);
        while (
          !endTag.test(rest$1) &&
          !startTagOpen.test(rest$1) &&
          !comment.test(rest$1) &&
          !conditionalComment.test(rest$1)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest$1.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest$1 = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var endTagLength = 0;
      var rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest.length;
      html = rest;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (false) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      attrs[i] = {
        name: args[1],
        value: decodeAttr(
          value,
          options.shouldDecodeNewlines
        )
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (false) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});

function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+')
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;
  platformGetTagNamespace = options.getTagNamespace || no;
  platformMustUseProp = options.mustUseProp || no;
  platformIsPreTag = options.isPreTag || no;
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  transforms = pluckModuleFunction(options.modules, 'transformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function endPre (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = {
        type: 1,
        tag: tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        parent: currentParent,
        children: []
      };
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "production" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        preTransforms[i](element, options);
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else {
        processFor(element);
        processIf(element);
        processOnce(element);
        processKey(element);

        // determine whether this is a plain element after
        // removing structural attributes
        element.plain = !element.key && !attrs.length;

        processRef(element);
        processSlot(element);
        processComponent(element);
        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
          transforms[i$1](element, options);
        }
        processAttrs(element);
      }

      function checkRootConstraints (el) {
        if (false) {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (false) {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        endPre(element);
      }
      // apply post-transforms
      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
        postTransforms[i$2](element, options);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      endPre(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (false) {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
          currentParent.tag === 'textarea' &&
          currentParent.attrsMap.placeholder === text) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var expression;
        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: expression,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if (false) {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) {
      "production" !== 'production' && warn$2(
        ("Invalid v-for expression: " + exp)
      );
      return
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim();
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      el.alias = iteratorMatch[1].trim();
      el.iterator1 = iteratorMatch[2].trim();
      if (iteratorMatch[3]) {
        el.iterator2 = iteratorMatch[3].trim();
      }
    } else {
      el.alias = alias;
    }
  }
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (false) {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (false) {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (false) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    }
    if (el.tag === 'template') {
      el.slotScope = getAndRemoveAttr(el, 'scope');
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || platformMustUseProp(el.tag, el.attrsMap.type, name)) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if (false) {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (false) {
        var expression = parseText(value, delimiters);
        if (expression) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      false
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      walkThroughConditionsBlocks(node.ifConditions, isInFor);
    }
  }
}

function walkThroughConditionsBlocks (conditionBlocks, isInFor) {
  for (var i = 1, len = conditionBlocks.length; i < len; i++) {
    markStaticRoots(conditionBlocks[i].block, isInFor);
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  native,
  warn
) {
  var res = native ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    var handler = events[name];
    // #5330: warn click.right, since right clicks do not actually fire click events.
    if (false
      ) {
      warn(
        "Use \"contextmenu\" instead of \"click.right\" since right clicks " +
        "do not actually fire \"click\" events."
      );
    }
    res += "\"" + name + "\":" + (genHandler(name, handler)) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    return isMethodPath || isFunctionExpression
      ? handler.value
      : ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var alias = keyCodes[key];
  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  bind: bind$1,
  cloak: noop
};

/*  */

// configurable state
var warn$3;
var transforms$1;
var dataGenFns;
var platformDirectives$1;
var isPlatformReservedTag$1;
var staticRenderFns;
var onceCount;
var currentOptions;

function generate (
  ast,
  options
) {
  // save previous staticRenderFns so generate calls can be nested
  var prevStaticRenderFns = staticRenderFns;
  var currentStaticRenderFns = staticRenderFns = [];
  var prevOnceCount = onceCount;
  onceCount = 0;
  currentOptions = options;
  warn$3 = options.warn || baseWarn;
  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
  dataGenFns = pluckModuleFunction(options.modules, 'genData');
  platformDirectives$1 = options.directives || {};
  isPlatformReservedTag$1 = options.isReservedTag || no;
  var code = ast ? genElement(ast) : '_c("div")';
  staticRenderFns = prevStaticRenderFns;
  onceCount = prevOnceCount;
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: currentStaticRenderFns
  }
}

function genElement (el) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el)
  } else if (el.for && !el.forProcessed) {
    return genFor(el)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el);
    } else {
      var data = el.plain ? undefined : genData(el);

      var children = el.inlineTemplate ? null : genChildren(el, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < transforms$1.length; i++) {
      code = transforms$1[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el) {
  el.staticProcessed = true;
  staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
  return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "production" !== 'production' && warn$3(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el)
    }
    return ("_o(" + (genElement(el)) + "," + (onceCount++) + (key ? ("," + key) : "") + ")")
  } else {
    return genStatic(el)
  }
}

function genIf (el) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice())
}

function genIfConditions (conditions) {
  if (!conditions.length) {
    return '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return el.once ? genOnce(el) : genElement(el)
  }
}

function genFor (el) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (
    false
  ) {
    warn$3(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genElement(el)) +
    '})'
}

function genData (el) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < dataGenFns.length; i++) {
    data += dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, warn$3)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, warn$3)) + ",";
  }
  // slot target
  if (el.slotTarget) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  return data
}

function genDirectives (el) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, warn$3);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el) {
  var ast = el.children[0];
  if (false) {
    warn$3('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, currentOptions);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (slots) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) { return genScopedSlot(key, slots[key]); }).join(',')) + "])")
}

function genScopedSlot (key, el) {
  return "[" + key + ",function(" + (String(el.attrsMap.scope)) + "){" +
    "return " + (el.tag === 'template'
      ? genChildren(el) || 'void 0'
      : genElement(el)) + "}]"
}

function genChildren (el, checkSkip) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
        el$1.for &&
        el$1.tag !== 'template' &&
        el$1.tag !== 'slot') {
      return genElement(el$1)
    }
    var normalizationType = checkSkip ? getNormalizationType(children) : 0;
    return ("[" + (children.map(genNode).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (children) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function maybeComponent (el) {
  return !isPlatformReservedTag$1(el.tag)
}

function genNode (node) {
  if (node.type === 1) {
    return genElement(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genSlot (el) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (componentName, el) {
  var children = el.inlineTemplate ? null : genChildren(el, true);
  return ("_c(" + componentName + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// check valid identifier for v-for
var identRE = /[A-Za-z_$][\w$]*/;

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (ident, type, text, errors) {
  if (typeof ident === 'string' && !identRE.test(ident)) {
    errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
      );
    } else {
      errors.push(("invalid expression: " + (text.trim())));
    }
  }
}

/*  */

function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  optimize(ast, options);
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
}

function makeFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompiler (baseOptions) {
  var functionCompileCache = Object.create(null);

  function compile (
    template,
    options
  ) {
    var finalOptions = Object.create(baseOptions);
    var errors = [];
    var tips = [];
    finalOptions.warn = function (msg, tip$$1) {
      (tip$$1 ? tips : errors).push(msg);
    };

    if (options) {
      // merge custom modules
      if (options.modules) {
        finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
      }
      // merge custom directives
      if (options.directives) {
        finalOptions.directives = extend(
          Object.create(baseOptions.directives),
          options.directives
        );
      }
      // copy other options
      for (var key in options) {
        if (key !== 'modules' && key !== 'directives') {
          finalOptions[key] = options[key];
        }
      }
    }

    var compiled = baseCompile(template, finalOptions);
    if (false) {
      errors.push.apply(errors, detectErrors(compiled.ast));
    }
    compiled.errors = errors;
    compiled.tips = tips;
    return compiled
  }

  function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = options || {};

    /* istanbul ignore if */
    if (false) {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (functionCompileCache[key]) {
      return functionCompileCache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (false) {
      if (compiled.errors && compiled.errors.length) {
        warn(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = makeFunction(compiled.render, fnGenErrors);
    var l = compiled.staticRenderFns.length;
    res.staticRenderFns = new Array(l);
    for (var i = 0; i < l; i++) {
      res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i], fnGenErrors);
    }

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (false) {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (functionCompileCache[key] = res)
  }

  return {
    compile: compile,
    compileToFunctions: compileToFunctions
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (false) {
    var expression = parseText(staticClass, options.delimiters);
    if (expression) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData$1
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (false) {
      var expression = parseText(staticStyle, options.delimiters);
      if (expression) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$2 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$2
};

var modules$1 = [
  klass$1,
  style$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "production" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (false) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (false) {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (false) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        delimiters: options.delimiters
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (false) {
        mark('compile end');
        measure(((this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

/* harmony default export */ __webpack_exports__["default"] = (Vue$3);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(20)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(19)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(18)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(6),
  /* template */
  __webpack_require__(15),
  /* scopeId */
  "data-v-d877a75c",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App_vue__);



new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
  el: '#app',
  render: function render(h) {
    return h(__WEBPACK_IMPORTED_MODULE_1__App_vue___default.a);
  }
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_FAB_vue__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_FAB_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src_FAB_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_color__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_color___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_color__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




var teamUrl = 'https://github.com/PygmySlowLoris';
var repoUrl = 'https://github.com/PygmySlowLoris/vue-fab';

var defaultProps = {
    hex: '#194d33',
    hsl: {
        h: 150,
        s: 0.5,
        l: 0.2,
        a: 1
    },
    hsv: {
        h: 150,
        s: 0.66,
        v: 0.30,
        a: 1
    },
    rgba: {
        r: 25,
        g: 77,
        b: 51,
        a: 1
    },
    a: 1
};

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'app',
    components: {
        fab: __WEBPACK_IMPORTED_MODULE_0__src_FAB_vue___default.a,
        'chrome-picker': __WEBPACK_IMPORTED_MODULE_1_vue_color__["Chrome"]
    },
    data: function data() {
        return {
            repoUrl: repoUrl,
            teamUrl: teamUrl,
            positions: ['bottom-right', 'bottom-left', 'top-right', 'top-left'],
            position: 'bottom-right',
            colors: defaultProps,
            firstIcon: 'cached',
            secondIcon: 'add_alert'

        };
    },

    methods: {
        alert: function (_alert) {
            function alert() {
                return _alert.apply(this, arguments);
            }

            alert.toString = function () {
                return _alert.toString();
            };

            return alert;
        }(function () {
            alert('You have clicked me :)');
        })
    }
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_clickaway__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_clickaway___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_clickaway__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_ripple_directive__ = __webpack_require__(16);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    mixins: [__WEBPACK_IMPORTED_MODULE_0_vue_clickaway__["mixin"]],
    directives: { Ripple: __WEBPACK_IMPORTED_MODULE_1_vue_ripple_directive__["a" /* default */] },
    data: function data() {
        return {
            toggle: false,
            pos: {}
        };
    },

    props: {
        bgColor: {
            default: '#333333'
        },
        position: {
            default: 'bottom-right'
        },
        zIndex: {
            default: '999'
        },
        rippleShow: {
            default: true
        },
        rippleColor: {
            default: 'light'
        },
        actions: {}
    },
    computed: {
        listPos: function listPos() {

            if (this.position === 'top-right' || this.position === 'top-left') {
                return {
                    top: '-20px',
                    paddingTop: '20px'
                };
            }
            return {
                bottom: '-20px',
                paddingBottom: '20px'
            };
        },
        transitionEnter: function transitionEnter() {
            var animation = this.animation;
            return animation.enter;
        },
        transitionLeave: function transitionLeave() {
            var animation = this.animation;
            return animation.leave;
        },
        animation: function animation() {
            if (this.position === 'top-right' || this.position === 'top-left') {
                return {
                    enter: 'animated fadeInDown',
                    leave: 'animated fadeOutUp'
                };
            } else if (this.position === 'bottom-right' || this.position === 'bottom-left') {
                return {
                    enter: 'animated fadeInUp',
                    leave: 'animated fadeOutDown'
                };
            } else {
                return {
                    enter: 'animated fadeInUp',
                    leave: 'animated fadeOutDown'
                };
            }
        }
    },
    methods: {
        toParent: function toParent(name) {
            this.$emit(name);
            this.toggle = false;
        },
        away: function away() {
            this.toggle = false;
        },
        setPosition: function setPosition() {
            this.pos = {};
            switch (this.position) {
                case 'bottom-right':
                    this.pos.right = '5vw';
                    this.pos.bottom = '4vh';
                    break;
                case 'bottom-left':
                    this.pos.left = '5vw';
                    this.pos.bottom = '4vh';
                    break;
                case 'top-left':
                    this.pos.left = '5vw';
                    this.pos.top = '4vh';
                    break;
                case 'top-right':
                    this.pos.right = '5vw';
                    this.pos.top = '4vh';
                    break;
                default:
                    this.pos.right = '5vw';
                    this.pos.bottom = '4vh';
            }
        },
        moveTransition: function moveTransition() {
            var wrapper = document.getElementById(this.position + '-wrapper');
            var el = document.getElementById(this.position + '-action');

            if (this.position === 'top-right' || this.position === 'top-left') {
                wrapper.appendChild(el);
            } else {
                wrapper.insertBefore(el, wrapper.childNodes[0]);
            }
        }
    },
    watch: {
        position: function position(val) {
            var _this = this;

            this.setPosition();

            this.$nextTick(function () {
                _this.moveTransition();
            });
        }
    },
    mounted: function mounted() {
        this.moveTransition();
    },
    created: function created() {
        this.setPosition();
    }
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".fab-wrapper[data-v-1073f3cf]{position:fixed;z-index:999}.fab[data-v-1073f3cf]{border-radius:100px;width:65px;position:relative;overflow:hidden;height:65px;display:flex;align-items:center;box-shadow:0 10px 20px rgba(0,0,0,.19),0 6px 6px rgba(0,0,0,.23);z-index:2}.fab .material-icons[data-v-1073f3cf]{color:#fff;transition:all .4s;margin:0 auto}.fab .material-icons.rotate[data-v-1073f3cf]{-webkit-transform:rotate(315deg);transform:rotate(315deg)}.fab-list[data-v-1073f3cf]{position:relative;z-index:1;margin:2vh .5vw}.fab-list li[data-v-1073f3cf]{width:50px;height:50px;margin-top:2vh;display:flex;align-items:center;border-radius:100px;box-shadow:0 10px 20px rgba(0,0,0,.19),0 6px 6px rgba(0,0,0,.23)}.fab-list li .material-icons[data-v-1073f3cf]{color:#fff;margin:0 auto}.pointer[data-v-1073f3cf]{cursor:pointer}ul[data-v-1073f3cf]{list-style-type:none;padding:0!important}.fab-wrapper .actions-container[data-v-1073f3cf]{overflow:hidden;z-index:0;position:relative}.material-icons.md-18[data-v-1073f3cf]{font-size:18px}.material-icons.md-24[data-v-1073f3cf]{font-size:24px}.material-icons.md-36[data-v-1073f3cf]{font-size:36px}.material-icons.md-48[data-v-1073f3cf]{font-size:48px}.material-icons.md-dark[data-v-1073f3cf]{color:rgba(0,0,0,.54)}.material-icons.md-dark.md-inactive[data-v-1073f3cf]{color:rgba(0,0,0,.26)}.material-icons.md-light[data-v-1073f3cf]{color:#fff}.material-icons.md-light.md-inactive[data-v-1073f3cf]{color:hsla(0,0%,100%,.3)}@media screen and (max-width:768px){.fab-list[data-v-1073f3cf]{margin:2vh 1.8vw}.fab-list li[data-v-1073f3cf]{width:40px;height:40px}.fab-list li i[data-v-1073f3cf]{font-size:24px!important}.fab[data-v-1073f3cf]{width:55px;height:55px}.fab i[data-v-1073f3cf]{font-size:34px!important}}", ""]);

// exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "#app[data-v-d877a75c]{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;color:#2c3e50}.pointer[data-v-d877a75c]{cursor:pointer}h1[data-v-d877a75c],h2[data-v-d877a75c]{font-weight:400}hr[data-v-d877a75c]{background-color:transparent;border:none;display:block;height:inherit;margin:1.5rem 0;border-top:1px dashed}li[data-v-d877a75c]{display:inline-block;margin:0 10px}a[data-v-d877a75c]{color:#0b99b9;text-decoration:underline}.text-medium-grey[data-v-d877a75c]{color:#333}.text-light-grey[data-v-d877a75c]{color:#888}.box.formated[data-v-d877a75c]{position:relative;padding:0}.box.formated .heading[data-v-d877a75c]{font-size:1rem;text-transform:capitalize;padding:.8rem 1.5rem;background-color:#fafafa}.box.formated .content[data-v-d877a75c]{padding:1rem 2rem}i.top-left[data-v-d877a75c]{position:absolute;left:1.5rem;top:.8rem}.vertical-separator[data-v-d877a75c]{display:flex;justify-content:space-around}.vertical-separator .line[data-v-d877a75c]{border-right:1px solid #ccc}", ""]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Vue = __webpack_require__(0);
Vue = 'default' in Vue ? Vue['default'] : Vue;

var version = '2.1.0';

var compatible = (/^2\./).test(Vue.version);
if (!compatible) {
  Vue.util.warn('VueClickaway ' + version + ' only supports Vue 2.x, and does not support Vue ' + Vue.version);
}



// @SECTION: implementation

var HANDLER = '_vue_clickaway_handler';

function bind(el, binding) {
  unbind(el);

  var callback = binding.value;
  if (typeof callback !== 'function') {
    if (false) {
      Vue.util.warn(
        'v-' + binding.name + '="' +
        binding.expression + '" expects a function value, ' +
        'got ' + callback
      );
    }
    return;
  }

  // @NOTE: Vue binds directives in microtasks, while UI events are dispatched
  //        in macrotasks. This causes the listener to be set up before
  //        the "origin" click event (the event that lead to the binding of
  //        the directive) arrives at the document root. To work around that,
  //        we ignore events until the end of the "initial" macrotask.
  // @REFERENCE: https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
  // @REFERENCE: https://github.com/simplesmiler/vue-clickaway/issues/8
  var initialMacrotaskEnded = false;
  setTimeout(function() {
    initialMacrotaskEnded = true;
  }, 0);

  el[HANDLER] = function(ev) {
    // @NOTE: IE 5.0+
    // @REFERENCE: https://developer.mozilla.org/en/docs/Web/API/Node/contains
    if (initialMacrotaskEnded && !el.contains(ev.target)) {
      return callback(ev);
    }
  };

  document.documentElement.addEventListener('click', el[HANDLER], false);
}

function unbind(el) {
  document.documentElement.removeEventListener('click', el[HANDLER], false);
  delete el[HANDLER];
}

var directive = {
  bind: bind,
  update: function(el, binding) {
    if (binding.value === binding.oldValue) return;
    bind(el, binding);
  },
  unbind: unbind,
};

var mixin = {
  directives: { onClickaway: directive },
};

exports.version = version;
exports.directive = directive;
exports.mixin = mixin;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.VueColor=t():e.VueColor=t()}(this,function(){return function(e){function t(r){if(o[r])return o[r].exports;var a=o[r]={exports:{},id:r,loaded:!1};return e[r].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}([function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var a=o(37),i=r(a),n=o(38),s=r(n),l=o(41),c=r(l),u=o(42),h=r(u),d=o(39),f=r(d),p=o(40),_=r(p),v=o(36),g=r(v),b=o(6),x=r(b),m=o(8),w=r(m),C=o(4),y=r(C),k=o(5),F=r(k),A=o(7),R=r(A),S=o(3),M=r(S),E={version:"2.0.9",Compact:i.default,Material:s.default,Slider:c.default,Swatches:h.default,Photoshop:f.default,Sketch:_.default,Chrome:g.default,Alpha:x.default,Checkboard:w.default,EditableInput:y.default,Hue:F.default,Saturation:R.default,ColorMixin:M.default};e.exports=E},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var o=this[t];o[2]?e.push("@media "+o[2]+"{"+o[1]+"}"):e.push(o[1])}return e.join("")},e.i=function(t,o){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},a=0;a<this.length;a++){var i=this[a][0];"number"==typeof i&&(r[i]=!0)}for(a=0;a<t.length;a++){var n=t[a];"number"==typeof n[0]&&r[n[0]]||(o&&!n[2]?n[2]=o:o&&(n[2]="("+n[2]+") and ("+o+")"),e.push(n))}},e}},function(e,t,o){function r(e,t){for(var o=0;o<e.length;o++){var r=e[o],a=h[r.id];if(a){a.refs++;for(var i=0;i<a.parts.length;i++)a.parts[i](r.parts[i]);for(;i<r.parts.length;i++)a.parts.push(l(r.parts[i],t))}else{for(var n=[],i=0;i<r.parts.length;i++)n.push(l(r.parts[i],t));h[r.id]={id:r.id,refs:1,parts:n}}}}function a(e){for(var t=[],o={},r=0;r<e.length;r++){var a=e[r],i=a[0],n=a[1],s=a[2],l=a[3],c={css:n,media:s,sourceMap:l};o[i]?o[i].parts.push(c):t.push(o[i]={id:i,parts:[c]})}return t}function i(e,t){var o=p(),r=g[g.length-1];if("top"===e.insertAt)r?r.nextSibling?o.insertBefore(t,r.nextSibling):o.appendChild(t):o.insertBefore(t,o.firstChild),g.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");o.appendChild(t)}}function n(e){e.parentNode.removeChild(e);var t=g.indexOf(e);t>=0&&g.splice(t,1)}function s(e){var t=document.createElement("style");return t.type="text/css",i(e,t),t}function l(e,t){var o,r,a;if(t.singleton){var i=v++;o=_||(_=s(t)),r=c.bind(null,o,i,!1),a=c.bind(null,o,i,!0)}else o=s(t),r=u.bind(null,o),a=function(){n(o)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else a()}}function c(e,t,o,r){var a=o?"":r.css;if(e.styleSheet)e.styleSheet.cssText=b(t,a);else{var i=document.createTextNode(a),n=e.childNodes;n[t]&&e.removeChild(n[t]),n.length?e.insertBefore(i,n[t]):e.appendChild(i)}}function u(e,t){var o=t.css,r=t.media,a=t.sourceMap;if(r&&e.setAttribute("media",r),a&&(o+="\n/*# sourceURL="+a.sources[0]+" */",o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}var h={},d=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},f=d(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),p=d(function(){return document.head||document.getElementsByTagName("head")[0]}),_=null,v=0,g=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=f()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var o=a(e);return r(o,t),function(e){for(var i=[],n=0;n<o.length;n++){var s=o[n],l=h[s.id];l.refs--,i.push(l)}if(e){var c=a(e);r(c,t)}for(var n=0;n<i.length;n++){var l=i[n];if(0===l.refs){for(var u=0;u<l.parts.length;u++)l.parts[u]();delete h[l.id]}}}};var b=function(){var e=[];return function(t,o){return e[t]=o,e.filter(Boolean).join("\n")}}()},function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var o,r=e&&e.a;o=e&&e.hsl?(0,n.default)(e.hsl):e&&e.hex&&e.hex.length>0?(0,n.default)(e.hex):(0,n.default)(e),o&&o.setAlpha(r||1);var a=o.toHsl(),i=o.toHsv();return 0===a.s&&(a.h=e.h||t||0,i.h=e.h||t||0),{hsl:a,hex:o.toHexString().toUpperCase(),rgba:o.toRgb(),hsv:i,oldHue:e.h||t||a.h,source:e.source,a:e.a||o.getAlpha()}}Object.defineProperty(t,"__esModule",{value:!0});var i=o(35),n=r(i);t.default={props:["value"],data:function(){return{val:a(this.value)}},computed:{colors:{get:function(){return this.val},set:function(e){this.val=e,this.$emit("input",e)}}},watch:{value:function(e){this.val=a(e)}},methods:{colorChange:function(e,t){this.oldHue=this.colors.hsl.h,this.colors=a(e,t||this.oldHue)},isValidHex:function(e){return(0,n.default)(e).isValid()},simpleCheckForValidColor:function(e){for(var t=["r","g","b","a","h","s","a","v"],o=0,r=0,a=0;a<t.length;a++){var i=t[a];e[i]&&(o++,isNaN(e[i])||r++)}if(o===r)return e}}}},function(e,t,o){var r,a;o(56),r=o(18);var i=o(44);a=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(a=r=r.default),"function"==typeof a&&(a=a.options),a.render=i.render,a.staticRenderFns=i.staticRenderFns,e.exports=r},function(e,t,o){var r,a;o(57),r=o(19);var i=o(45);a=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(a=r=r.default),"function"==typeof a&&(a=a.options),a.render=i.render,a.staticRenderFns=i.staticRenderFns,e.exports=r},function(e,t,o){var r,a;o(65),r=o(16);var i=o(53);a=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(a=r=r.default),"function"==typeof a&&(a=a.options),a.render=i.render,a.staticRenderFns=i.staticRenderFns,e.exports=r},function(e,t,o){var r,a;o(58),r=o(20);var i=o(46);a=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(a=r=r.default),"function"==typeof a&&(a=a.options),a.render=i.render,a.staticRenderFns=i.staticRenderFns,e.exports=r},function(e,t,o){var r,a;o(66),r=o(17);var i=o(54);a=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(a=r=r.default),"function"==typeof a&&(a=a.options),a.render=i.render,a.staticRenderFns=i.staticRenderFns,e.exports=r},function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=o(3),i=r(a),n=o(4),s=r(n),l=o(7),c=r(l),u=o(5),h=r(u),d=o(6),f=r(d);t.default={name:"Chrome",mixins:[i.default],props:{},components:{saturation:c.default,hue:h.default,alpha:f.default,"ed-in":s.default},data:function(){return{fields:["hex","rgba","hsla"],fieldsIndex:0,highlight:!1}},computed:{activeColor:function(){var e=this.colors.rgba;return"rgba("+[e.r,e.g,e.b,e.a].join(",")+")"}},methods:{handlePreset:function(e){this.colorChange({hex:e,source:"hex"})},childChange:function(e){this.colorChange(e)},inputChange:function(e){e&&(e.hex?this.isValidHex(e.hex)&&this.colorChange({hex:e.hex,source:"hex"}):(e.r||e.g||e.b||e.a)&&this.colorChange({r:e.r||this.colors.rgba.r,g:e.g||this.colors.rgba.g,b:e.b||this.colors.rgba.b,a:e.a||this.colors.rgba.a,source:"rgba"}))},toggleViews:function(){return this.fieldsIndex>=2?void(this.fieldsIndex=0):void this.fieldsIndex++},showHighlight:function(){this.highlight=!0},hideHighlight:function(){this.highlight=!1}}}},function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=o(3),i=r(a),n=o(4),s=r(n),l=["#4D4D4D","#999999","#FFFFFF","#F44E3B","#FE9200","#FCDC00","#DBDF00","#A4DD00","#68CCCA","#73D8FF","#AEA1FF","#FDA1FF","#333333","#808080","#CCCCCC","#D33115","#E27300","#FCC400","#B0BC00","#68BC00","#16A5A5","#009CE0","#7B64FF","#FA28FF","#000000","#666666","#B3B3B3","#9F0500","#C45100","#FB9E00","#808900","#194D33","#0C797D","#0062B1","#653294","#AB149E"];t.default={name:"Compact",mixins:[i.default],props:{},components:{"ed-in":s.default},computed:{pick:function(){return this.colors.hex}},data:function(){return{defaultColors:l}},methods:{handlerClick:function(e){this.colorChange({hex:e,source:"hex"})},onChange:function(e){e&&(e.hex?this.isValidHex(e.hex)&&this.colorChange({hex:e.hex,source:"hex"}):(e.r||e.g||e.b)&&this.colorChange({r:e.r||this.colors.rgba.r,g:e.g||this.colors.rgba.g,b:e.b||this.colors.rgba.b,a:e.a||this.colors.rgba.a,source:"rgba"}))}}}},function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=o(4),i=r(a),n=o(3),s=r(n);t.default={name:"Material",mixins:[s.default],components:{"ed-in":i.default},methods:{onChange:function(e){e&&(e.hex?this.isValidHex(e.hex)&&this.colorChange({hex:e.hex,source:"hex"}):(e.r||e.g||e.b)&&this.colorChange({r:e.r||this.colors.rgba.r,g:e.g||this.colors.rgba.g,b:e.b||this.colors.rgba.b,a:e.a||this.colors.rgba.a,source:"rgba"}))}}}},function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=o(3),i=r(a),n=o(4),s=r(n),l=o(7),c=r(l),u=o(5),h=r(u),d=o(6),f=r(d);t.default={name:"Photoshop",mixins:[i.default],props:{head:{type:String,default:"Color Picker"}},components:{saturation:c.default,hue:h.default,alpha:f.default,"ed-in":s.default},data:function(){return{currentColor:"#FFF"}},created:function(){this.currentColor=this.colors.hex},methods:{childChange:function(e){this.colorChange(e)},inputChange:function(e){e&&(e["#"]?this.isValidHex(e["#"])&&this.colorChange({hex:e["#"],source:"hex"}):(e.r||e.g||e.b||e.a)&&this.colorChange({r:e.r||this.colors.rgba.r,g:e.g||this.colors.rgba.g,b:e.b||this.colors.rgba.b,a:e.a||this.colors.rgba.a,source:"rgba"}))},handleAccept:function(){this.$emit("ok")},handleCancel:function(){this.$emit("cancel")}}}},function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=o(3),i=r(a),n=o(4),s=r(n),l=o(7),c=r(l),u=o(5),h=r(u),d=o(6),f=r(d),p=["#D0021B","#F5A623","#F8E71C","#8B572A","#7ED321","#417505","#BD10E0","#9013FE","#4A90E2","#50E3C2","#B8E986","#000000","#4A4A4A","#9B9B9B","#FFFFFF"];t.default={name:"Sketch",mixins:[i.default],components:{saturation:c.default,hue:h.default,alpha:f.default,"ed-in":s.default},data:function(){return{presetColors:p}},computed:{activeColor:function(){var e=this.colors.rgba;return"rgba("+[e.r,e.g,e.b,e.a].join(",")+")"}},methods:{handlePreset:function(e){this.colorChange({hex:e,source:"hex"})},childChange:function(e){this.colorChange(e)},inputChange:function(e){e&&(e.hex?this.isValidHex(e.hex)&&this.colorChange({hex:e.hex,source:"hex"}):(e.r||e.g||e.b||e.a)&&this.colorChange({r:e.r||this.colors.rgba.r,g:e.g||this.colors.rgba.g,b:e.b||this.colors.rgba.b,a:e.a||this.colors.rgba.a,source:"rgba"}))}}}},function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=o(3),i=r(a),n=o(5),s=r(n);t.default={name:"Slider",mixins:[i.default],props:{direction:String},components:{hue:s.default},computed:{activeOffset:function(){return Math.round(100*this.colors.hsl.s)/100===.5?Math.round(100*this.colors.hsl.l)/100:0}},data:function(){return{swatches:[".80",".65",".50",".35",".20"]}},methods:{hueChange:function(e){this.colorChange(e)},handleSwClick:function(e,t){this.colorChange({h:this.colors.hsl.h,s:.5,l:t,source:"hsl"})}}}},function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=o(34),i=r(a),n=o(3),s=r(n),l=["red","pink","purple","deepPurple","indigo","blue","lightBlue","cyan","teal","green","lightGreen","lime","yellow","amber","orange","deepOrange","brown","blueGrey"],c=["900","700","500","300","100"],u=function(){var e=[];return l.forEach(function(t){var o=[];c.forEach(function(e){o.push(i.default[t][e].toUpperCase())}),e.push(o)}),e}();t.default={name:"Swatches",mixins:[s.default],computed:{pick:function(){return this.colors.hex}},data:function(){return{defaultColors:u}},methods:{handlerClick:function(e){this.colorChange({hex:e,source:"hex"})}}}},function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=o(8),i=r(a);t.default={name:"Alpha",props:{value:Object,onChange:Function},components:{checkboard:i.default},computed:{colors:function(){return this.value},gradientColor:function(){var e=this.colors.rgba,t=[e.r,e.g,e.b].join(",");return"linear-gradient(to right, rgba("+t+", 0) 0%, rgba("+t+", 1) 100%)"}},methods:{handleChange:function(e,t){!t&&e.preventDefault();var o,r=this.$refs.container,a=r.clientWidth,i=r.getBoundingClientRect().left+window.pageXOffset,n=e.pageX||(e.touches?e.touches[0].pageX:0),s=n-i;o=s<0?0:s>a?1:Math.round(100*s/a)/100,this.colors.a!==o&&this.$emit("change",{h:this.colors.hsl.h,s:this.colors.hsl.s,l:this.colors.hsl.l,a:o,source:"rgba"})},handleMouseDown:function(e){this.handleChange(e,!0),window.addEventListener("mousemove",this.handleChange),window.addEventListener("mouseup",this.handleMouseUp)},handleMouseUp:function(){this.unbindEventListeners()},unbindEventListeners:function(){window.removeEventListener("mousemove",this.handleChange),window.removeEventListener("mouseup",this.handleMouseUp)}}}},function(e,t){"use strict";function o(e,t,o){if("undefined"==typeof document)return null;var r=document.createElement("canvas");r.width=r.height=2*o;var a=r.getContext("2d");return a?(a.fillStyle=e,a.fillRect(0,0,r.width,r.height),a.fillStyle=t,a.fillRect(0,0,o,o),a.translate(o,o),a.fillRect(0,0,o,o),r.toDataURL()):null}function r(e,t,r){var i=e+","+t+","+r;if(a[i])return a[i];var n=o(e,t,r);return a[i]=n,n}Object.defineProperty(t,"__esModule",{value:!0});var a={};t.default={name:"Checkboard",props:{size:{type:[Number,String],default:8},white:{type:String,default:"#fff"},grey:{type:String,default:"#e6e6e6"}},computed:{bgStyle:function(){return"url("+r(this.white,this.grey,this.size)+") center left"}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"editableInput",props:{label:String,value:[String,Number],max:Number,arrowOffset:{type:Number,default:1}},computed:{val:function(){return this.value}},filters:{maxFilter:{read:function(e){return this.max&&e>this.max?this.max:e},write:function(e,t){return e}}},methods:{update:function(e){this.handleChange(e.target.value)},handleChange:function(e){var t={};t[this.label]=e,this.$emit("change",t)},handleBlur:function(e){console.log(e)},handleKeyDown:function(e){var t=this.val,o=Number(t);if(o){var r=this.arrowOffset||1;38===e.keyCode&&(t=o+r,this.handleChange(t),e.preventDefault()),40===e.keyCode&&(t=o-r,this.handleChange(t),e.preventDefault())}},handleDrag:function(e){console.log(e)},handleMouseDown:function(e){console.log(e)}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"Hue",props:{value:Object,direction:{type:String,default:"horizontal"}},computed:{colors:function(){return this.value},directionClass:function(){return{"vue-color__c-hue--horizontal":"horizontal"===this.direction,"vue-color__c-hue--vertical":"vertical"===this.direction}},pointerTop:function(){return"vertical"===this.direction?-(100*this.colors.hsl.h/360)+100+"%":0},pointerLeft:function(){return"vertical"===this.direction?0:100*this.colors.hsl.h/360+"%"}},methods:{handleChange:function(e,t){!t&&e.preventDefault();var o,r,a=this.$refs.container,i=a.clientWidth,n=a.clientHeight,s=a.getBoundingClientRect().left+window.pageXOffset,l=a.getBoundingClientRect().top+window.pageYOffset,c=e.pageX||(e.touches?e.touches[0].pageX:0),u=e.pageY||(e.touches?e.touches[0].pageY:0),h=c-s,d=u-l;"vertical"===this.direction?(d<0?o=359:d>n?o=0:(r=-(100*d/n)+100,o=360*r/100),this.colors.hsl.h!==o&&this.$emit("change",{h:o,s:this.colors.hsl.s,l:this.colors.hsl.l,a:this.colors.hsl.a,source:"hsl"})):(h<0?o=0:h>i?o=359:(r=100*h/i,o=360*r/100),this.colors.hsl.h!==o&&this.$emit("change",{h:o,s:this.colors.hsl.s,l:this.colors.hsl.l,a:this.colors.hsl.a,source:"hsl"}))},handleMouseDown:function(e){this.handleChange(e,!0),window.addEventListener("mousemove",this.handleChange),window.addEventListener("mouseup",this.handleMouseUp)},handleMouseUp:function(e){this.unbindEventListeners()},unbindEventListeners:function(){window.removeEventListener("mousemove",this.handleChange),window.removeEventListener("mouseup",this.handleMouseUp)}}}},function(e,t,o){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=o(33),i=r(a);t.default={name:"Saturation",props:{value:Object},computed:{colors:function(){return this.value},bgColor:function(){return"hsl("+this.colors.hsl.h+", 100%, 50%)"},pointerTop:function(){return-(100*this.colors.hsv.v)+100+"%"},pointerLeft:function(){return 100*this.colors.hsv.s+"%"}},methods:{throttle:(0,i.default)(function(e,t){e(t)},20,{leading:!0,trailing:!1}),handleChange:function(e,t){!t&&e.preventDefault();var o=this.$refs.container,r=o.clientWidth,a=o.clientHeight,i=o.getBoundingClientRect().left+window.pageXOffset,n=o.getBoundingClientRect().top+window.pageYOffset,s=e.pageX||(e.touches?e.touches[0].pageX:0),l=e.pageY||(e.touches?e.touches[0].pageY:0),c=s-i,u=l-n;c<0?c=0:c>r?c=r:u<0?u=0:u>a&&(u=a);var h=100*c/r,d=-(100*u/a)+100;this.throttle(this.onChange,{h:this.colors.hsl.h,s:h,v:d>0?d:.01,a:this.colors.hsl.a,source:"hsva"})},onChange:function(e){this.$emit("change",e)},handleMouseDown:function(e){window.addEventListener("mousemove",this.handleChange),window.addEventListener("mouseup",this.handleChange),window.addEventListener("mouseup",this.handleMouseUp)},handleMouseUp:function(e){this.unbindEventListeners()},unbindEventListeners:function(){window.removeEventListener("mousemove",this.handleChange),window.removeEventListener("mouseup",this.handleChange),window.removeEventListener("mouseup",this.handleMouseUp)}}}},function(e,t,o){t=e.exports=o(1)(),t.push([e.id,".vue-color__compact{padding-top:5px;padding-left:5px;width:240px;border-radius:2px;box-shadow:0 2px 10px rgba(0,0,0,.12),0 2px 5px rgba(0,0,0,.16);background-color:#fff}.vue-color__compact__colors{overflow:hidden;padding:0;margin:0}.vue-color__compact__color-item{list-style:none;width:15px;height:15px;float:left;margin-right:5px;margin-bottom:5px;position:relative;cursor:pointer}.vue-color__compact__color-item--white{box-shadow:inset 0 0 0 1px #ddd}.vue-color__compact__color-item--white .vue-color__compact__dot{background:#000}.vue-color__compact__dot{position:absolute;top:5px;right:5px;bottom:5px;left:5px;border-radius:50%;opacity:1;background:#fff}.vue-color__compact__fields{display:flex;padding-bottom:6px;padding-right:5px;position:relative}.vue-color__compact__fields .vue-color__editable-input__input{width:70%;padding-left:30%;background:none;font-size:12px;color:#333;height:16px}.vue-color__compact__fields .vue-color__editable-input__label{position:absolute;top:3px;left:0;line-height:16px;text-transform:uppercase;font-size:12px;color:#999}.vue-color__compact__pick-color{position:absolute;top:6px;left:5px;height:9px;width:9px}.vue-color__compact__col-3{flex:1}.vue_color__compact__col-hex{flex:2}.vue_color__compact__col-hex .vue-color__editable-input__input{width:80%;padding-left:20%}.vue_color__compact__col-hex .vue-color__editable-input__label{display:none}",""])},function(e,t,o){t=e.exports=o(1)(),t.push([e.id,".vue-color__editable-input{position:relative}.vue-color__editable-input__input{padding:0;border:0;outline:none}.vue-color__editable-input__label{text-transform:capitalize}",""])},function(e,t,o){t=e.exports=o(1)(),t.push([e.id,".vue-color__c-hue{position:absolute;top:0;right:0;bottom:0;left:0;border-radius:2px}.vue-color__c-hue--horizontal{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.vue-color__c-hue--vertical{background:linear-gradient(0deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.vue-color__c-hue__container{cursor:pointer;margin:0 2px;position:relative;height:100%}.vue-color__c-hue__pointer{z-index:2;position:absolute}.vue-color__c-hue__picker{cursor:pointer;margin-top:1px;width:4px;border-radius:1px;height:8px;box-shadow:0 0 2px rgba(0,0,0,.6);background:#fff;transform:translateX(-2px)}",""])},function(e,t,o){t=e.exports=o(1)(),t.push([e.id,".vue-color__saturation,.vue-color__saturation--black,.vue-color__saturation--white{cursor:pointer;position:absolute;top:0;left:0;right:0;bottom:0}.vue-color__saturation--white{background:linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.vue-color__saturation--black{background:linear-gradient(0deg,#000,transparent)}.vue-color__saturation--pointer{cursor:pointer;position:absolute}.vue-color__saturation--circle{cursor:head;width:4px;height:4px;box-shadow:0 0 0 1.5px #fff,inset 0 0 1px 1px rgba(0,0,0,.3),0 0 1px 2px rgba(0,0,0,.4);border-radius:50%;transform:translate(-2px,-2px)}",""])},function(e,t,o){t=e.exports=o(1)(),t.push([e.id,".vue-color__material{width:98px;height:98px;padding:16px;font-family:Roboto;position:relative;border-radius:2px;box-shadow:0 2px 10px rgba(0,0,0,.12),0 2px 5px rgba(0,0,0,.16);background-color:#fff}.vue-color__material .vue-color__editable-input__input{width:100%;margin-top:12px;font-size:15px;color:#333;height:30px}.vue-color__material .vue-color__editable-input__label{position:absolute;top:0;left:0;font-size:11px;color:#999;text-transform:capitalize}.vue-color__material__hex{border-bottom-width:2px;border-bottom-style:solid}.vue-color__material__split{display:flex;margin-right:-10px;padding-top:11px}.vue-color__material__third{flex:1;padding-right:10px}",""])},function(e,t,o){t=e.exports=o(1)(),t.push([e.id,".vue-color__slider{position:relative;width:410px}.vue-color__slider__hue-warp{height:12px;position:relative}.vue-color__slider__hue-warp .vue-color__c-hue__picker{width:14px;height:14px;border-radius:6px;transform:translate(-7px,-2px);background-color:#f8f8f8;box-shadow:0 1px 4px 0 rgba(0,0,0,.37)}.vue-color__slider__swatches{display:flex;margin-top:20px}.vue-color__slider__swatch{margin-right:1px;flex:1;width:20%}.vue-color__slider__swatch:first-child{margin-right:1px}.vue-color__slider__swatch:first-child .vue-color__slider__swatch-picker{border-radius:2px 0 0 2px}.vue-color__slider__swatch:last-child{margin-right:0}.vue-color__slider__swatch:last-child .vue-color__slider__swatch-picker{border-radius:0 2px 2px 0}.vue-color__slider__swatch-picker{cursor:pointer;height:12px}.vue-color__slider__swatch-picker--active{transform:scaleY(1.8);border-radius:3.6px/2px}",""])},function(e,t,o){t=e.exports=o(1)(),t.push([e.id,".vue-color__swatches{width:320px;height:240px;overflow-y:scroll;background-color:#fff;box-shadow:0 2px 10px rgba(0,0,0,.12),0 2px 5px rgba(0,0,0,.16)}.vue-color__swatches__box{padding:16px 0 6px 16px;overflow:hidden}.vue-color__swatches__color-group{padding-bottom:10px;width:40px;float:left;margin-right:10px}.vue-color__swatches__color-it{width:40px;height:24px;cursor:pointer;background:#880e4f;margin-bottom:1px;overflow:hidden;border-radius:2px 2px 0 0}.vue-color__swatches__pick{fill:#fff;margin-left:8px;display:block}",""])},function(e,t,o){t=e.exports=o(1)(),t.push([e.id,'.vue-color__photoshop{background:#dcdcdc;border-radius:4px;box-shadow:0 0 0 1px rgba(0,0,0,.25),0 8px 16px rgba(0,0,0,.15);box-sizing:initial;width:513px;font-family:Roboto}.vue-color__photoshop__head{background-image:linear-gradient(-180deg,#f0f0f0,#d4d4d4);border-bottom:1px solid #b1b1b1;box-shadow:inset 0 1px 0 0 hsla(0,0%,100%,.2),inset 0 -1px 0 0 rgba(0,0,0,.02);height:23px;line-height:24px;border-radius:4px 4px 0 0;font-size:13px;color:#4d4d4d;text-align:center}.vue-color__photoshop__body{padding:15px;display:flex}.vue-color__photoshop__saturation-wrap{width:256px;height:256px;position:relative;border:2px solid #b3b3b3;border-bottom:2px solid #f0f0f0;overflow:hidden}.vue-color__photoshop__saturation-wrap .vue-color__saturation--circle{width:12px;height:12px}.vue-color__photoshop__hue-wrap{position:relative;height:256px;width:19px;margin-left:10px;border:2px solid #b3b3b3;border-bottom:2px solid #f0f0f0}.vue-color__photoshop__hue-pointer{position:relative}.vue-color__photoshop__hue-pointer--left,.vue-color__photoshop__hue-pointer--right{position:absolute;width:0;height:0;border-style:solid;border-width:5px 0 5px 8px;border-color:transparent transparent transparent #555}.vue-color__photoshop__hue-pointer--left:after,.vue-color__photoshop__hue-pointer--right:after{content:"";width:0;height:0;border-style:solid;border-width:4px 0 4px 6px;border-color:transparent transparent transparent #fff;position:absolute;top:1px;left:1px;transform:translate(-8px,-5px)}.vue-color__photoshop__hue-pointer--left{transform:translate(-13px,-4px)}.vue-color__photoshop__hue-pointer--right{transform:translate(20px,-4px) rotate(180deg)}.vue-color__photoshop__controls{width:180px;margin-left:10px;display:flex}.vue-color__photoshop__actions{margin-left:20px;flex:1}.vue-color__photoshop__ac-btn{cursor:pointer;background-image:linear-gradient(-180deg,#fff,#e6e6e6);border:1px solid #878787;border-radius:2px;height:20px;box-shadow:0 1px 0 0 #eaeaea;font-size:14px;color:#000;line-height:20px;text-align:center;margin-bottom:10px}.vue-color__photoshop__previews{width:60px}.vue-color__photoshop__previews__swatches{border:1px solid #b3b3b3;border-bottom:1px solid #f0f0f0;margin-bottom:2px;margin-top:1px}.vue-color__photoshop__previews__pr-color{height:34px;box-shadow:inset 1px 0 0 #000,inset -1px 0 0 #000,inset 0 1px 0 #000}.vue-color__photoshop__previews__label{font-size:14px;color:#000;text-align:center}.vue-color__photoshop__fields{padding-top:5px;padding-bottom:9px;width:80px;position:relative}.vue-color__photoshop__fields .vue-color__editable-input__input{margin-left:40%;width:40%;height:18px;border:1px solid #888;box-shadow:inset 0 1px 1px rgba(0,0,0,.1),0 1px 0 0 #ececec;margin-bottom:5px;font-size:13px;padding-left:3px;margin-right:10px}.vue-color__photoshop__fields .vue-color__editable-input__label{top:0;left:0;width:34px;text-transform:uppercase;font-size:13px;height:18px;line-height:22px;position:absolute}.vue-color__photoshop__fields__divider{height:5px}.vue-color__photoshop__fields__hex .vue-color__editable-input__input{margin-left:20%;width:80%;height:18px;border:1px solid #888;box-shadow:inset 0 1px 1px rgba(0,0,0,.1),0 1px 0 0 #ececec;margin-bottom:6px;font-size:13px;padding-left:3px}.vue-color__photoshop__fields__hex .vue-color__editable-input__label{position:absolute;top:0;left:0;width:14px;text-transform:uppercase;font-size:13px;height:18px;line-height:22px}',""])},function(e,t,o){t=e.exports=o(1)(),t.push([e.id,".vue-color__sketch{position:relative;width:200px;padding:10px 10px 0;box-sizing:initial;background:#fff;border-radius:4px;box-shadow:0 0 0 1px rgba(0,0,0,.15),0 8px 16px rgba(0,0,0,.15)}.vue-color__sketch__saturation-wrap{width:100%;padding-bottom:75%;position:relative;overflow:hidden}.vue-color__sketch__controls{display:flex}.vue-color__sketch__sliders{padding:4px 0;flex:1}.vue-color__sketch__sliders .vue-color__c-alpha__gradient,.vue-color__sketch__sliders .vue-color__c-hue{border-radius:2px}.vue-color__sketch__hue-wrap{position:relative;height:10px}.vue-color__sketch__alpha-wrap{position:relative;height:10px;margin-top:4px;overflow:hidden}.vue-color__sketch__color-wrap{width:24px;height:24px;position:relative;margin-top:4px;margin-left:4px;border-radius:3px}.vue-color__sketch__active-color{position:absolute;top:0;left:0;right:0;bottom:0;border-radius:2px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.15),inset 0 0 4px rgba(0,0,0,.25);z-index:2}.vue-color__sketch__field{display:flex;padding-top:4px}.vue-color__sketch__field .vue-color__editable-input__input{width:80%;padding:4px 10% 3px;border:none;box-shadow:inset 0 0 0 1px #ccc;font-size:11px}.vue-color__sketch__field .vue-color__editable-input__label{display:block;text-align:center;font-size:11px;color:#222;padding-top:3px;padding-bottom:4px;text-transform:capitalize}.vue-color__sketch__field--single{flex:1;padding-left:6px}.vue-color__sketch__field--double{flex:2}.vue-color__sketch__presets{margin-right:-10px;margin-left:-10px;padding-left:10px;padding-top:10px;border-top:1px solid #eee}.vue-color__sketch__presets-color{border-radius:3px;overflow:hidden;position:relative;display:inline-block;margin:0 10px 10px 0;vertical-align:top;cursor:pointer;width:16px;height:16px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.15)}",""])},function(e,t,o){t=e.exports=o(1)(),t.push([e.id,".vue-color__chrome{background:#fff;border-radius:2px;box-shadow:0 0 2px rgba(0,0,0,.3),0 4px 8px rgba(0,0,0,.3);box-sizing:initial;width:225px;font-family:Menlo;background-color:#fff}.vue-color__chrome__controls{display:flex}.vue-color__chrome__color-wrap{width:32px}.vue-color__chrome__active-color{margin-top:6px;width:16px;height:16px;border-radius:8px;position:relative;overflow:hidden}.vue-color__chrome__sliders{flex:1}.vue-color__chrome__sliders .vue-color__c-alpha__gradient,.vue-color__chrome__sliders .vue-color__c-hue{border-radius:2px}.vue-color__chrome__sliders .vue-color__c-alpha__picker,.vue-color__chrome__sliders .vue-color__c-hue__picker{width:12px;height:12px;border-radius:6px;transform:translate(-6px,-2px);background-color:#f8f8f8;box-shadow:0 1px 4px 0 rgba(0,0,0,.37)}.vue-color__chrome__fields-wrap{padding-top:16px;display:flex}.vue-color__chrome__fields{display:flex;margin-left:-6px;flex:1}.vue-color__chrome__field{padding-left:6px;width:100%}.vue-color__chrome__toggle-btn{width:32px;text-align:right;position:relative}.vue-color__chrome__icon{margin-right:-4px;margin-top:12px;cursor:pointer;position:relative;z-index:2}.vue-color__chrome__icon-highlight{position:absolute;width:24px;height:28px;background:#eee;border-radius:4px;top:10px;left:12px}.vue-color__chrome__hue-wrap{margin-bottom:8px}.vue-color__chrome__alpha-wrap,.vue-color__chrome__hue-wrap{position:relative;height:10px}.vue-color__chrome__chrome-body{padding:16px 16px 12px;background-color:#fff}.vue-color__chrome__saturation-wrap{width:100%;padding-bottom:55%;position:relative;border-radius:2px 2px 0 0;overflow:hidden}.vue-color__chrome__saturation-wrap .vue-color__saturation--circle{width:12px;height:12px}.vue-color__chrome__fields .vue-color__editable-input__input{font-size:11px;color:#333;width:100%;border-rradius:2px;border:none;box-shadow:inset 0 0 0 1px #dadada;height:21px;text-align:center}.vue-color__chrome__fields .vue-color__editable-input__label{text-transform:uppercase;font-size:11px;line-height:11px;color:#969696;text-align:center;display:block;margin-top:12px}",""])},function(e,t,o){t=e.exports=o(1)(),t.push([e.id,".vue-color__c-alpha,.vue-color__c-alpha__checkboard-wrap{position:absolute;top:0;right:0;bottom:0;left:0}.vue-color__c-alpha__checkboard-wrap{overflow:hidden}.vue-color__c-alpha__gradient{position:absolute;top:0;right:0;bottom:0;left:0}.vue-color__c-alpha__container{cursor:pointer;position:relative;z-index:2;height:100%;margin:0 3px}.vue-color__c-alpha__pointer{z-index:2;position:absolute}.vue-color__c-alpha__picker{cursor:pointer;width:4px;border-radius:1px;height:8px;box-shadow:0 0 2px rgba(0,0,0,.6);background:#fff;margin-top:1px;transform:translateX(-2px)}",""])},function(e,t,o){t=e.exports=o(1)(),t.push([e.id,".vue-color__c-checkerboard{position:absolute;top:0;right:0;bottom:0;left:0}",""])},function(e,t){(function(t){function o(e,t,o){function r(t){var o=_,r=v;return _=v=void 0,k=t,b=e.apply(r,o)}function i(e){return k=e,x=setTimeout(u,t),F?r(e):b}function n(e){var o=e-m,r=e-k,a=t-o;return A?C(a,g-r):a}function c(e){var o=e-m,r=e-k;return void 0===m||o>=t||o<0||A&&r>=g}function u(){var e=y();return c(e)?h(e):void(x=setTimeout(u,n(e)))}function h(e){return x=void 0,R&&_?r(e):(_=v=void 0,b)}function d(){void 0!==x&&clearTimeout(x),k=0,_=m=v=x=void 0}function f(){return void 0===x?b:h(y())}function p(){var e=y(),o=c(e);if(_=arguments,v=this,m=e,o){if(void 0===x)return i(m);if(A)return x=setTimeout(u,t),r(m)}return void 0===x&&(x=setTimeout(u,t)),
b}var _,v,g,b,x,m,k=0,F=!1,A=!1,R=!0;if("function"!=typeof e)throw new TypeError(l);return t=s(t)||0,a(o)&&(F=!!o.leading,A="maxWait"in o,g=A?w(s(o.maxWait)||0,t):g,R="trailing"in o?!!o.trailing:R),p.cancel=d,p.flush=f,p}function r(e,t,r){var i=!0,n=!0;if("function"!=typeof e)throw new TypeError(l);return a(r)&&(i="leading"in r?!!r.leading:i,n="trailing"in r?!!r.trailing:n),o(e,t,{leading:i,maxWait:t,trailing:n})}function a(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function i(e){return!!e&&"object"==typeof e}function n(e){return"symbol"==typeof e||i(e)&&m.call(e)==u}function s(e){if("number"==typeof e)return e;if(n(e))return c;if(a(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=a(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(h,"");var o=f.test(e);return o||p.test(e)?_(e.slice(2),o?2:8):d.test(e)?c:+e}var l="Expected a function",c=NaN,u="[object Symbol]",h=/^\s+|\s+$/g,d=/^[-+]0x[0-9a-f]+$/i,f=/^0b[01]+$/i,p=/^0o[0-7]+$/i,_=parseInt,v="object"==typeof t&&t&&t.Object===Object&&t,g="object"==typeof self&&self&&self.Object===Object&&self,b=v||g||Function("return this")(),x=Object.prototype,m=x.toString,w=Math.max,C=Math.min,y=function(){return b.Date.now()};e.exports=r}).call(t,function(){return this}())},function(e,t,o){var r,a,i;!function(o,n){a=[],r=n,i="function"==typeof r?r.apply(t,a):r,!(void 0!==i&&(e.exports=i))}(this,function(){return{red:{50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",a100:"#ff8a80",a200:"#ff5252",a400:"#ff1744",a700:"#d50000"},pink:{50:"#fce4ec",100:"#f8bbd0",200:"#f48fb1",300:"#f06292",400:"#ec407a",500:"#e91e63",600:"#d81b60",700:"#c2185b",800:"#ad1457",900:"#880e4f",a100:"#ff80ab",a200:"#ff4081",a400:"#f50057",a700:"#c51162"},purple:{50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",a100:"#ea80fc",a200:"#e040fb",a400:"#d500f9",a700:"#aa00ff"},deepPurple:{50:"#ede7f6",100:"#d1c4e9",200:"#b39ddb",300:"#9575cd",400:"#7e57c2",500:"#673ab7",600:"#5e35b1",700:"#512da8",800:"#4527a0",900:"#311b92",a100:"#b388ff",a200:"#7c4dff",a400:"#651fff",a700:"#6200ea"},indigo:{50:"#e8eaf6",100:"#c5cae9",200:"#9fa8da",300:"#7986cb",400:"#5c6bc0",500:"#3f51b5",600:"#3949ab",700:"#303f9f",800:"#283593",900:"#1a237e",a100:"#8c9eff",a200:"#536dfe",a400:"#3d5afe",a700:"#304ffe"},blue:{50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",a100:"#82b1ff",a200:"#448aff",a400:"#2979ff",a700:"#2962ff"},lightBlue:{50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",a100:"#80d8ff",a200:"#40c4ff",a400:"#00b0ff",a700:"#0091ea"},cyan:{50:"#e0f7fa",100:"#b2ebf2",200:"#80deea",300:"#4dd0e1",400:"#26c6da",500:"#00bcd4",600:"#00acc1",700:"#0097a7",800:"#00838f",900:"#006064",a100:"#84ffff",a200:"#18ffff",a400:"#00e5ff",a700:"#00b8d4"},teal:{50:"#e0f2f1",100:"#b2dfdb",200:"#80cbc4",300:"#4db6ac",400:"#26a69a",500:"#009688",600:"#00897b",700:"#00796b",800:"#00695c",900:"#004d40",a100:"#a7ffeb",a200:"#64ffda",a400:"#1de9b6",a700:"#00bfa5"},green:{50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",a100:"#b9f6ca",a200:"#69f0ae",a400:"#00e676",a700:"#00c853"},lightGreen:{50:"#f1f8e9",100:"#dcedc8",200:"#c5e1a5",300:"#aed581",400:"#9ccc65",500:"#8bc34a",600:"#7cb342",700:"#689f38",800:"#558b2f",900:"#33691e",a100:"#ccff90",a200:"#b2ff59",a400:"#76ff03",a700:"#64dd17"},lime:{50:"#f9fbe7",100:"#f0f4c3",200:"#e6ee9c",300:"#dce775",400:"#d4e157",500:"#cddc39",600:"#c0ca33",700:"#afb42b",800:"#9e9d24",900:"#827717",a100:"#f4ff81",a200:"#eeff41",a400:"#c6ff00",a700:"#aeea00"},yellow:{50:"#fffde7",100:"#fff9c4",200:"#fff59d",300:"#fff176",400:"#ffee58",500:"#ffeb3b",600:"#fdd835",700:"#fbc02d",800:"#f9a825",900:"#f57f17",a100:"#ffff8d",a200:"#ffff00",a400:"#ffea00",a700:"#ffd600"},amber:{50:"#fff8e1",100:"#ffecb3",200:"#ffe082",300:"#ffd54f",400:"#ffca28",500:"#ffc107",600:"#ffb300",700:"#ffa000",800:"#ff8f00",900:"#ff6f00",a100:"#ffe57f",a200:"#ffd740",a400:"#ffc400",a700:"#ffab00"},orange:{50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",a100:"#ffd180",a200:"#ffab40",a400:"#ff9100",a700:"#ff6d00"},deepOrange:{50:"#fbe9e7",100:"#ffccbc",200:"#ffab91",300:"#ff8a65",400:"#ff7043",500:"#ff5722",600:"#f4511e",700:"#e64a19",800:"#d84315",900:"#bf360c",a100:"#ff9e80",a200:"#ff6e40",a400:"#ff3d00",a700:"#dd2c00"},brown:{50:"#efebe9",100:"#d7ccc8",200:"#bcaaa4",300:"#a1887f",400:"#8d6e63",500:"#795548",600:"#6d4c41",700:"#5d4037",800:"#4e342e",900:"#3e2723"},grey:{50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121"},blueGrey:{50:"#eceff1",100:"#cfd8dc",200:"#b0bec5",300:"#90a4ae",400:"#78909c",500:"#607d8b",600:"#546e7a",700:"#455a64",800:"#37474f",900:"#263238"},darkText:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.54)",disabled:"rgba(0, 0, 0, 0.38)",dividers:"rgba(0, 0, 0, 0.12)"},lightText:{primary:"rgba(255, 255, 255, 1)",secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",dividers:"rgba(255, 255, 255, 0.12)"},darkIcons:{active:"rgba(0, 0, 0, 0.54)",inactive:"rgba(0, 0, 0, 0.38)"},lightIcons:{active:"rgba(255, 255, 255, 1)",inactive:"rgba(255, 255, 255, 0.5)"},white:"#ffffff",black:"#000000"}})},function(e,t,o){var r;!function(a){function i(e,t){if(e=e?e:"",t=t||{},e instanceof i)return e;if(!(this instanceof i))return new i(e,t);var o=n(e);this._originalInput=e,this._r=o.r,this._g=o.g,this._b=o.b,this._a=o.a,this._roundA=X(100*this._a)/100,this._format=t.format||o.format,this._gradientType=t.gradientType,this._r<1&&(this._r=X(this._r)),this._g<1&&(this._g=X(this._g)),this._b<1&&(this._b=X(this._b)),this._ok=o.ok,this._tc_id=V++}function n(e){var t={r:0,g:0,b:0},o=1,r=null,a=null,i=null,n=!1,l=!1;return"string"==typeof e&&(e=P(e)),"object"==typeof e&&(N(e.r)&&N(e.g)&&N(e.b)?(t=s(e.r,e.g,e.b),n=!0,l="%"===String(e.r).substr(-1)?"prgb":"rgb"):N(e.h)&&N(e.s)&&N(e.v)?(r=B(e.s),a=B(e.v),t=h(e.h,r,a),n=!0,l="hsv"):N(e.h)&&N(e.s)&&N(e.l)&&(r=B(e.s),i=B(e.l),t=c(e.h,r,i),n=!0,l="hsl"),e.hasOwnProperty("a")&&(o=e.a)),o=M(o),{ok:n,format:e.format||l,r:q(255,Y(t.r,0)),g:q(255,Y(t.g,0)),b:q(255,Y(t.b,0)),a:o}}function s(e,t,o){return{r:255*E(e,255),g:255*E(t,255),b:255*E(o,255)}}function l(e,t,o){e=E(e,255),t=E(t,255),o=E(o,255);var r,a,i=Y(e,t,o),n=q(e,t,o),s=(i+n)/2;if(i==n)r=a=0;else{var l=i-n;switch(a=s>.5?l/(2-i-n):l/(i+n),i){case e:r=(t-o)/l+(t<o?6:0);break;case t:r=(o-e)/l+2;break;case o:r=(e-t)/l+4}r/=6}return{h:r,s:a,l:s}}function c(e,t,o){function r(e,t,o){return o<0&&(o+=1),o>1&&(o-=1),o<1/6?e+6*(t-e)*o:o<.5?t:o<2/3?e+(t-e)*(2/3-o)*6:e}var a,i,n;if(e=E(e,360),t=E(t,100),o=E(o,100),0===t)a=i=n=o;else{var s=o<.5?o*(1+t):o+t-o*t,l=2*o-s;a=r(l,s,e+1/3),i=r(l,s,e),n=r(l,s,e-1/3)}return{r:255*a,g:255*i,b:255*n}}function u(e,t,o){e=E(e,255),t=E(t,255),o=E(o,255);var r,a,i=Y(e,t,o),n=q(e,t,o),s=i,l=i-n;if(a=0===i?0:l/i,i==n)r=0;else{switch(i){case e:r=(t-o)/l+(t<o?6:0);break;case t:r=(o-e)/l+2;break;case o:r=(e-t)/l+4}r/=6}return{h:r,s:a,v:s}}function h(e,t,o){e=6*E(e,360),t=E(t,100),o=E(o,100);var r=a.floor(e),i=e-r,n=o*(1-t),s=o*(1-i*t),l=o*(1-(1-i)*t),c=r%6,u=[o,s,n,n,l,o][c],h=[l,o,o,s,n,n][c],d=[n,n,l,o,o,s][c];return{r:255*u,g:255*h,b:255*d}}function d(e,t,o,r){var a=[z(X(e).toString(16)),z(X(t).toString(16)),z(X(o).toString(16))];return r&&a[0].charAt(0)==a[0].charAt(1)&&a[1].charAt(0)==a[1].charAt(1)&&a[2].charAt(0)==a[2].charAt(1)?a[0].charAt(0)+a[1].charAt(0)+a[2].charAt(0):a.join("")}function f(e,t,o,r,a){var i=[z(X(e).toString(16)),z(X(t).toString(16)),z(X(o).toString(16)),z(D(r))];return a&&i[0].charAt(0)==i[0].charAt(1)&&i[1].charAt(0)==i[1].charAt(1)&&i[2].charAt(0)==i[2].charAt(1)&&i[3].charAt(0)==i[3].charAt(1)?i[0].charAt(0)+i[1].charAt(0)+i[2].charAt(0)+i[3].charAt(0):i.join("")}function p(e,t,o,r){var a=[z(D(r)),z(X(e).toString(16)),z(X(t).toString(16)),z(X(o).toString(16))];return a.join("")}function _(e,t){t=0===t?0:t||10;var o=i(e).toHsl();return o.s-=t/100,o.s=j(o.s),i(o)}function v(e,t){t=0===t?0:t||10;var o=i(e).toHsl();return o.s+=t/100,o.s=j(o.s),i(o)}function g(e){return i(e).desaturate(100)}function b(e,t){t=0===t?0:t||10;var o=i(e).toHsl();return o.l+=t/100,o.l=j(o.l),i(o)}function x(e,t){t=0===t?0:t||10;var o=i(e).toRgb();return o.r=Y(0,q(255,o.r-X(255*-(t/100)))),o.g=Y(0,q(255,o.g-X(255*-(t/100)))),o.b=Y(0,q(255,o.b-X(255*-(t/100)))),i(o)}function m(e,t){t=0===t?0:t||10;var o=i(e).toHsl();return o.l-=t/100,o.l=j(o.l),i(o)}function w(e,t){var o=i(e).toHsl(),r=(o.h+t)%360;return o.h=r<0?360+r:r,i(o)}function C(e){var t=i(e).toHsl();return t.h=(t.h+180)%360,i(t)}function y(e){var t=i(e).toHsl(),o=t.h;return[i(e),i({h:(o+120)%360,s:t.s,l:t.l}),i({h:(o+240)%360,s:t.s,l:t.l})]}function k(e){var t=i(e).toHsl(),o=t.h;return[i(e),i({h:(o+90)%360,s:t.s,l:t.l}),i({h:(o+180)%360,s:t.s,l:t.l}),i({h:(o+270)%360,s:t.s,l:t.l})]}function F(e){var t=i(e).toHsl(),o=t.h;return[i(e),i({h:(o+72)%360,s:t.s,l:t.l}),i({h:(o+216)%360,s:t.s,l:t.l})]}function A(e,t,o){t=t||6,o=o||30;var r=i(e).toHsl(),a=360/o,n=[i(e)];for(r.h=(r.h-(a*t>>1)+720)%360;--t;)r.h=(r.h+a)%360,n.push(i(r));return n}function R(e,t){t=t||6;for(var o=i(e).toHsv(),r=o.h,a=o.s,n=o.v,s=[],l=1/t;t--;)s.push(i({h:r,s:a,v:n})),n=(n+l)%1;return s}function S(e){var t={};for(var o in e)e.hasOwnProperty(o)&&(t[e[o]]=o);return t}function M(e){return e=parseFloat(e),(isNaN(e)||e<0||e>1)&&(e=1),e}function E(e,t){H(e)&&(e="100%");var o=O(e);return e=q(t,Y(0,parseFloat(e))),o&&(e=parseInt(e*t,10)/100),a.abs(e-t)<1e-6?1:e%t/parseFloat(t)}function j(e){return q(1,Y(0,e))}function L(e){return parseInt(e,16)}function H(e){return"string"==typeof e&&e.indexOf(".")!=-1&&1===parseFloat(e)}function O(e){return"string"==typeof e&&e.indexOf("%")!=-1}function z(e){return 1==e.length?"0"+e:""+e}function B(e){return e<=1&&(e=100*e+"%"),e}function D(e){return a.round(255*parseFloat(e)).toString(16)}function $(e){return L(e)/255}function N(e){return!!Z.CSS_UNIT.exec(e)}function P(e){e=e.replace(T,"").replace(U,"").toLowerCase();var t=!1;if(G[e])e=G[e],t=!0;else if("transparent"==e)return{r:0,g:0,b:0,a:0,format:"name"};var o;return(o=Z.rgb.exec(e))?{r:o[1],g:o[2],b:o[3]}:(o=Z.rgba.exec(e))?{r:o[1],g:o[2],b:o[3],a:o[4]}:(o=Z.hsl.exec(e))?{h:o[1],s:o[2],l:o[3]}:(o=Z.hsla.exec(e))?{h:o[1],s:o[2],l:o[3],a:o[4]}:(o=Z.hsv.exec(e))?{h:o[1],s:o[2],v:o[3]}:(o=Z.hsva.exec(e))?{h:o[1],s:o[2],v:o[3],a:o[4]}:(o=Z.hex8.exec(e))?{r:L(o[1]),g:L(o[2]),b:L(o[3]),a:$(o[4]),format:t?"name":"hex8"}:(o=Z.hex6.exec(e))?{r:L(o[1]),g:L(o[2]),b:L(o[3]),format:t?"name":"hex"}:(o=Z.hex4.exec(e))?{r:L(o[1]+""+o[1]),g:L(o[2]+""+o[2]),b:L(o[3]+""+o[3]),a:$(o[4]+""+o[4]),format:t?"name":"hex8"}:!!(o=Z.hex3.exec(e))&&{r:L(o[1]+""+o[1]),g:L(o[2]+""+o[2]),b:L(o[3]+""+o[3]),format:t?"name":"hex"}}function I(e){var t,o;return e=e||{level:"AA",size:"small"},t=(e.level||"AA").toUpperCase(),o=(e.size||"small").toLowerCase(),"AA"!==t&&"AAA"!==t&&(t="AA"),"small"!==o&&"large"!==o&&(o="small"),{level:t,size:o}}var T=/^\s+/,U=/\s+$/,V=0,X=a.round,q=a.min,Y=a.max,W=a.random;i.prototype={isDark:function(){return this.getBrightness()<128},isLight:function(){return!this.isDark()},isValid:function(){return this._ok},getOriginalInput:function(){return this._originalInput},getFormat:function(){return this._format},getAlpha:function(){return this._a},getBrightness:function(){var e=this.toRgb();return(299*e.r+587*e.g+114*e.b)/1e3},getLuminance:function(){var e,t,o,r,i,n,s=this.toRgb();return e=s.r/255,t=s.g/255,o=s.b/255,r=e<=.03928?e/12.92:a.pow((e+.055)/1.055,2.4),i=t<=.03928?t/12.92:a.pow((t+.055)/1.055,2.4),n=o<=.03928?o/12.92:a.pow((o+.055)/1.055,2.4),.2126*r+.7152*i+.0722*n},setAlpha:function(e){return this._a=M(e),this._roundA=X(100*this._a)/100,this},toHsv:function(){var e=u(this._r,this._g,this._b);return{h:360*e.h,s:e.s,v:e.v,a:this._a}},toHsvString:function(){var e=u(this._r,this._g,this._b),t=X(360*e.h),o=X(100*e.s),r=X(100*e.v);return 1==this._a?"hsv("+t+", "+o+"%, "+r+"%)":"hsva("+t+", "+o+"%, "+r+"%, "+this._roundA+")"},toHsl:function(){var e=l(this._r,this._g,this._b);return{h:360*e.h,s:e.s,l:e.l,a:this._a}},toHslString:function(){var e=l(this._r,this._g,this._b),t=X(360*e.h),o=X(100*e.s),r=X(100*e.l);return 1==this._a?"hsl("+t+", "+o+"%, "+r+"%)":"hsla("+t+", "+o+"%, "+r+"%, "+this._roundA+")"},toHex:function(e){return d(this._r,this._g,this._b,e)},toHexString:function(e){return"#"+this.toHex(e)},toHex8:function(e){return f(this._r,this._g,this._b,this._a,e)},toHex8String:function(e){return"#"+this.toHex8(e)},toRgb:function(){return{r:X(this._r),g:X(this._g),b:X(this._b),a:this._a}},toRgbString:function(){return 1==this._a?"rgb("+X(this._r)+", "+X(this._g)+", "+X(this._b)+")":"rgba("+X(this._r)+", "+X(this._g)+", "+X(this._b)+", "+this._roundA+")"},toPercentageRgb:function(){return{r:X(100*E(this._r,255))+"%",g:X(100*E(this._g,255))+"%",b:X(100*E(this._b,255))+"%",a:this._a}},toPercentageRgbString:function(){return 1==this._a?"rgb("+X(100*E(this._r,255))+"%, "+X(100*E(this._g,255))+"%, "+X(100*E(this._b,255))+"%)":"rgba("+X(100*E(this._r,255))+"%, "+X(100*E(this._g,255))+"%, "+X(100*E(this._b,255))+"%, "+this._roundA+")"},toName:function(){return 0===this._a?"transparent":!(this._a<1)&&(K[d(this._r,this._g,this._b,!0)]||!1)},toFilter:function(e){var t="#"+p(this._r,this._g,this._b,this._a),o=t,r=this._gradientType?"GradientType = 1, ":"";if(e){var a=i(e);o="#"+p(a._r,a._g,a._b,a._a)}return"progid:DXImageTransform.Microsoft.gradient("+r+"startColorstr="+t+",endColorstr="+o+")"},toString:function(e){var t=!!e;e=e||this._format;var o=!1,r=this._a<1&&this._a>=0,a=!t&&r&&("hex"===e||"hex6"===e||"hex3"===e||"hex4"===e||"hex8"===e||"name"===e);return a?"name"===e&&0===this._a?this.toName():this.toRgbString():("rgb"===e&&(o=this.toRgbString()),"prgb"===e&&(o=this.toPercentageRgbString()),"hex"!==e&&"hex6"!==e||(o=this.toHexString()),"hex3"===e&&(o=this.toHexString(!0)),"hex4"===e&&(o=this.toHex8String(!0)),"hex8"===e&&(o=this.toHex8String()),"name"===e&&(o=this.toName()),"hsl"===e&&(o=this.toHslString()),"hsv"===e&&(o=this.toHsvString()),o||this.toHexString())},clone:function(){return i(this.toString())},_applyModification:function(e,t){var o=e.apply(null,[this].concat([].slice.call(t)));return this._r=o._r,this._g=o._g,this._b=o._b,this.setAlpha(o._a),this},lighten:function(){return this._applyModification(b,arguments)},brighten:function(){return this._applyModification(x,arguments)},darken:function(){return this._applyModification(m,arguments)},desaturate:function(){return this._applyModification(_,arguments)},saturate:function(){return this._applyModification(v,arguments)},greyscale:function(){return this._applyModification(g,arguments)},spin:function(){return this._applyModification(w,arguments)},_applyCombination:function(e,t){return e.apply(null,[this].concat([].slice.call(t)))},analogous:function(){return this._applyCombination(A,arguments)},complement:function(){return this._applyCombination(C,arguments)},monochromatic:function(){return this._applyCombination(R,arguments)},splitcomplement:function(){return this._applyCombination(F,arguments)},triad:function(){return this._applyCombination(y,arguments)},tetrad:function(){return this._applyCombination(k,arguments)}},i.fromRatio=function(e,t){if("object"==typeof e){var o={};for(var r in e)e.hasOwnProperty(r)&&("a"===r?o[r]=e[r]:o[r]=B(e[r]));e=o}return i(e,t)},i.equals=function(e,t){return!(!e||!t)&&i(e).toRgbString()==i(t).toRgbString()},i.random=function(){return i.fromRatio({r:W(),g:W(),b:W()})},i.mix=function(e,t,o){o=0===o?0:o||50;var r=i(e).toRgb(),a=i(t).toRgb(),n=o/100,s={r:(a.r-r.r)*n+r.r,g:(a.g-r.g)*n+r.g,b:(a.b-r.b)*n+r.b,a:(a.a-r.a)*n+r.a};return i(s)},i.readability=function(e,t){var o=i(e),r=i(t);return(a.max(o.getLuminance(),r.getLuminance())+.05)/(a.min(o.getLuminance(),r.getLuminance())+.05)},i.isReadable=function(e,t,o){var r,a,n=i.readability(e,t);switch(a=!1,r=I(o),r.level+r.size){case"AAsmall":case"AAAlarge":a=n>=4.5;break;case"AAlarge":a=n>=3;break;case"AAAsmall":a=n>=7}return a},i.mostReadable=function(e,t,o){var r,a,n,s,l=null,c=0;o=o||{},a=o.includeFallbackColors,n=o.level,s=o.size;for(var u=0;u<t.length;u++)r=i.readability(e,t[u]),r>c&&(c=r,l=i(t[u]));return i.isReadable(e,l,{level:n,size:s})||!a?l:(o.includeFallbackColors=!1,i.mostReadable(e,["#fff","#000"],o))};var G=i.names={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",burntsienna:"ea7e5d",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkgrey:"a9a9a9",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",grey:"808080",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgreen:"90ee90",lightgrey:"d3d3d3",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"663399",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"},K=i.hexNames=S(G),Z=function(){var e="[-\\+]?\\d+%?",t="[-\\+]?\\d*\\.\\d+%?",o="(?:"+t+")|(?:"+e+")",r="[\\s|\\(]+("+o+")[,|\\s]+("+o+")[,|\\s]+("+o+")\\s*\\)?",a="[\\s|\\(]+("+o+")[,|\\s]+("+o+")[,|\\s]+("+o+")[,|\\s]+("+o+")\\s*\\)?";return{CSS_UNIT:new RegExp(o),rgb:new RegExp("rgb"+r),rgba:new RegExp("rgba"+a),hsl:new RegExp("hsl"+r),hsla:new RegExp("hsla"+a),hsv:new RegExp("hsv"+r),hsva:new RegExp("hsva"+a),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/}}();"undefined"!=typeof e&&e.exports?e.exports=i:(r=function(){return i}.call(t,o,t,e),!(void 0!==r&&(e.exports=r)))}(Math)},function(e,t,o){var r,a;o(64),r=o(9);var i=o(52);a=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(a=r=r.default),"function"==typeof a&&(a=a.options),a.render=i.render,a.staticRenderFns=i.staticRenderFns,e.exports=r},function(e,t,o){var r,a;o(55),r=o(10);var i=o(43);a=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(a=r=r.default),"function"==typeof a&&(a=a.options),a.render=i.render,a.staticRenderFns=i.staticRenderFns,e.exports=r},function(e,t,o){var r,a;o(59),r=o(11);var i=o(47);a=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(a=r=r.default),"function"==typeof a&&(a=a.options),a.render=i.render,a.staticRenderFns=i.staticRenderFns,e.exports=r},function(e,t,o){var r,a;o(62),r=o(12);var i=o(50);a=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(a=r=r.default),"function"==typeof a&&(a=a.options),a.render=i.render,a.staticRenderFns=i.staticRenderFns,e.exports=r},function(e,t,o){var r,a;o(63),r=o(13);var i=o(51);a=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(a=r=r.default),"function"==typeof a&&(a=a.options),a.render=i.render,a.staticRenderFns=i.staticRenderFns,e.exports=r},function(e,t,o){var r,a;o(60),r=o(14);var i=o(48);a=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(a=r=r.default),"function"==typeof a&&(a=a.options),a.render=i.render,a.staticRenderFns=i.staticRenderFns,e.exports=r},function(e,t,o){var r,a;o(61),r=o(15);var i=o(49);a=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(a=r=r.default),"function"==typeof a&&(a=a.options),a.render=i.render,a.staticRenderFns=i.staticRenderFns,e.exports=r},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"vue-color__compact"},[o("ul",{staticClass:"vue-color__compact__colors"},e._l(e.defaultColors,function(t){return o("li",{staticClass:"vue-color__compact__color-item",class:{"vue-color__compact__color-item--white":"#FFFFFF"===t},style:{background:t},on:{click:function(o){e.handlerClick(t)}}},[o("div",{directives:[{name:"show",rawName:"v-show",value:t===e.pick,expression:"c === pick"}],staticClass:"vue-color__compact__dot"})])}))])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"vue-color__editable-input"},[o("input",{directives:[{name:"model",rawName:"v-model",value:e.val,expression:"val"}],staticClass:"vue-color__editable-input__input",domProps:{value:e.val},on:{keydown:e.handleKeyDown,input:[function(t){t.target.composing||(e.val=t.target.value)},e.update]}}),e._v(" "),o("span",{staticClass:"vue-color__editable-input__label"},[e._v(e._s(e.label))])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{class:["vue-color__c-hue",e.directionClass]},[o("div",{ref:"container",staticClass:"vue-color__c-hue__container",on:{mousedown:e.handleMouseDown,touchmove:e.handleChange,touchstart:e.handleChange}},[o("div",{staticClass:"vue-color__c-hue__pointer",style:{top:e.pointerTop,left:e.pointerLeft}},[o("div",{staticClass:"vue-color__c-hue__picker"})])])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{ref:"container",staticClass:"vue-color__saturation",style:{background:e.bgColor},on:{mousedown:e.handleMouseDown}},[o("div",{staticClass:"vue-color__saturation--white"}),e._v(" "),o("div",{staticClass:"vue-color__saturation--black"}),e._v(" "),o("div",{staticClass:"vue-color__saturation--pointer",style:{top:e.pointerTop,left:e.pointerLeft}},[o("div",{staticClass:"vue-color__saturation--circle"})])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"vue-color__material"},[o("ed-in",{staticClass:"vue-color__material__hex",style:{borderColor:e.colors.hex},attrs:{label:"hex"},on:{change:e.onChange},model:{value:e.colors.hex,callback:function(t){e.colors.hex=t},expression:"colors.hex"}}),e._v(" "),o("div",{staticClass:"vue-color__material__split"},[o("div",{staticClass:"vue-color__material__third"},[o("ed-in",{attrs:{label:"r"},on:{change:e.onChange},model:{value:e.colors.rgba.r,callback:function(t){e.colors.rgba.r=t},expression:"colors.rgba.r"}})],1),e._v(" "),o("div",{staticClass:"vue-color__material__third"},[o("ed-in",{attrs:{label:"g"},on:{change:e.onChange},model:{value:e.colors.rgba.g,callback:function(t){e.colors.rgba.g=t},expression:"colors.rgba.g"}})],1),e._v(" "),o("div",{staticClass:"vue-color__material__third"},[o("ed-in",{attrs:{label:"b"},on:{change:e.onChange},model:{value:e.colors.rgba.b,callback:function(t){e.colors.rgba.b=t},expression:"colors.rgba.b"}})],1)])],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"vue-color__slider"},[o("div",{staticClass:"vue-color__slider__hue-warp"},[o("hue",{on:{change:e.hueChange},model:{value:e.colors,callback:function(t){e.colors=t},expression:"colors"}})],1),e._v(" "),o("div",{staticClass:"vue-color__slider__swatches"},e._l(e.swatches,function(t,r){return o("div",{staticClass:"vue-color__slider__swatch",attrs:{"data-index":r},on:{click:function(o){e.handleSwClick(r,t)}}},[o("div",{staticClass:"vue-color__slider__swatch-picker",class:{"vue-color__slider__swatch-picker--active":t==e.activeOffset},style:{background:"hsl("+e.colors.hsl.h+", 50%, "+100*t+"%)"}})])}))])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"vue-color__swatches",attrs:{"data-pick":e.pick}},[o("div",{staticClass:"vue-color__swatches__box"},e._l(e.defaultColors,function(t){return o("div",{staticClass:"vue-color__swatches__color-group"},e._l(t,function(t){return o("div",{staticClass:"vue-color__swatches__color-it",style:{background:t},attrs:{"data-color":t},on:{click:function(o){e.handlerClick(t)}}},[o("div",{directives:[{name:"show",rawName:"v-show",value:t==e.pick,expression:"c == pick"}],staticClass:"vue-color__swatches__pick"},[o("svg",{staticStyle:{width:"24px",height:"24px"},attrs:{viewBox:"0 0 24 24"}},[o("path",{attrs:{d:"M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"}})])])])}))}))])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"vue-color__photoshop"},[o("div",{staticClass:"vue-color__photoshop__head"},[e._v(e._s(e.head))]),e._v(" "),o("div",{staticClass:"vue-color__photoshop__body"},[o("div",{staticClass:"vue-color__photoshop__saturation-wrap"},[o("saturation",{on:{change:e.childChange},model:{value:e.colors,callback:function(t){e.colors=t},expression:"colors"}})],1),e._v(" "),o("div",{staticClass:"vue-color__photoshop__hue-wrap"},[o("hue",{attrs:{direction:"vertical"},on:{change:e.childChange},model:{value:e.colors,callback:function(t){e.colors=t},expression:"colors"}},[o("div",{staticClass:"vue-color__photoshop__hue-pointer"},[o("i",{staticClass:"vue-color__photoshop__hue-pointer--left"}),o("i",{staticClass:"vue-color__photoshop__hue-pointer--right"})])])],1),e._v(" "),o("div",{staticClass:"vue-color__photoshop__controls"},[o("div",{staticClass:"vue-color__photoshop__previews"},[o("div",{staticClass:"vue-color__photoshop__previews__label"},[e._v("new")]),e._v(" "),o("div",{staticClass:"vue-color__photoshop__previews__swatches"},[o("div",{staticClass:"vue-color__photoshop__previews__pr-color",style:{background:e.colors.hex}}),e._v(" "),o("div",{staticClass:"vue-color__photoshop__previews__pr-color",style:{background:e.currentColor}})]),e._v(" "),o("div",{staticClass:"vue-color__photoshop__previews__label"},[e._v("current")])]),e._v(" "),o("div",{staticClass:"vue-color__photoshop__actions"},[o("div",{staticClass:"vue-color__photoshop__ac-btn",on:{click:e.handleAccept}},[e._v("OK")]),e._v(" "),o("div",{staticClass:"vue-color__photoshop__ac-btn",on:{click:e.handleCancel}},[e._v("Cancel")]),e._v(" "),o("div",{staticClass:"vue-color__photoshop__fields"},[o("ed-in",{attrs:{label:"h"},on:{change:e.inputChange},model:{value:e.colors.hsl.h,callback:function(t){e.colors.hsl.h=t},expression:"colors.hsl.h"}}),e._v(" "),o("ed-in",{attrs:{label:"s"},on:{change:e.inputChange},model:{value:e.colors.hsl.s,callback:function(t){e.colors.hsl.s=t},expression:"colors.hsl.s"}}),e._v(" "),o("ed-in",{attrs:{label:"v"},on:{change:e.inputChange},model:{value:e.colors.hsl.l,callback:function(t){e.colors.hsl.l=t},expression:"colors.hsl.l"}}),e._v(" "),o("div",{staticClass:"vue-color__photoshop__fields__divider"}),e._v(" "),o("ed-in",{attrs:{label:"r"},on:{change:e.inputChange},model:{value:e.colors.rgba.r,callback:function(t){e.colors.rgba.r=t},expression:"colors.rgba.r"}}),e._v(" "),o("ed-in",{attrs:{label:"g"},on:{change:e.inputChange},model:{value:e.colors.rgba.g,callback:function(t){e.colors.rgba.g=t},expression:"colors.rgba.g"}}),e._v(" "),o("ed-in",{attrs:{label:"b"},on:{change:e.inputChange},model:{value:e.colors.rgba.b,callback:function(t){e.colors.rgba.b=t},expression:"colors.rgba.b"}}),e._v(" "),o("div",{staticClass:"vue-color__photoshop__fields__divider"}),e._v(" "),o("ed-in",{staticClass:"vue-color__photoshop__fields__hex",attrs:{label:"#"},on:{change:e.inputChange},model:{value:e.colors.hex,callback:function(t){e.colors.hex=t},expression:"colors.hex"}})],1)])])])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"vue-color__sketch"},[o("div",{staticClass:"vue-color__sketch__saturation-wrap"},[o("saturation",{on:{change:e.childChange},model:{value:e.colors,callback:function(t){e.colors=t},expression:"colors"}})],1),e._v(" "),o("div",{staticClass:"vue-color__sketch__controls"},[o("div",{staticClass:"vue-color__sketch__sliders"},[o("div",{staticClass:"vue-color__sketch__hue-wrap"},[o("hue",{on:{change:e.childChange},model:{value:e.colors,callback:function(t){e.colors=t},expression:"colors"}})],1),e._v(" "),o("div",{staticClass:"vue-color__sketch__alpha-wrap"},[o("alpha",{on:{change:e.childChange},model:{value:e.colors,callback:function(t){e.colors=t},expression:"colors"}})],1)]),e._v(" "),o("div",{staticClass:"vue-color__sketch__color-wrap"},[o("div",{staticClass:"vue-color__sketch__active-color",style:{background:e.activeColor}})])]),e._v(" "),o("div",{staticClass:"vue-color__sketch__field"},[o("div",{staticClass:"vue-color__sketch__field--double"},[o("ed-in",{attrs:{label:"hex"},on:{change:e.inputChange},model:{value:e.colors.hex,callback:function(t){e.colors.hex=t},expression:"colors.hex"}})],1),e._v(" "),o("div",{staticClass:"vue-color__sketch__field--single"},[o("ed-in",{attrs:{label:"r"},on:{change:e.inputChange},model:{value:e.colors.rgba.r,callback:function(t){e.colors.rgba.r=t},expression:"colors.rgba.r"}})],1),e._v(" "),o("div",{staticClass:"vue-color__sketch__field--single"},[o("ed-in",{attrs:{label:"g"},on:{change:e.inputChange},model:{value:e.colors.rgba.g,callback:function(t){e.colors.rgba.g=t},expression:"colors.rgba.g"}})],1),e._v(" "),o("div",{staticClass:"vue-color__sketch__field--single"},[o("ed-in",{attrs:{label:"b"},on:{change:e.inputChange},model:{value:e.colors.rgba.b,callback:function(t){e.colors.rgba.b=t},expression:"colors.rgba.b"}})],1),e._v(" "),o("div",{staticClass:"vue-color__sketch__field--single"},[o("ed-in",{attrs:{label:"a","arrow-offset":.01,max:1},on:{change:e.inputChange},model:{value:e.colors.a,callback:function(t){e.colors.a=t},expression:"colors.a"}})],1)]),e._v(" "),o("div",{
staticClass:"vue-color__sketch__presets"},e._l(e.presetColors,function(t){return o("div",{staticClass:"vue-color__sketch__presets-color",style:{background:t},on:{click:function(o){e.handlePreset(t)}}})}))])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"vue-color__chrome"},[o("div",{staticClass:"vue-color__chrome__saturation-wrap"},[o("saturation",{on:{change:e.childChange},model:{value:e.colors,callback:function(t){e.colors=t},expression:"colors"}})],1),e._v(" "),o("div",{staticClass:"vue-color__chrome__chrome-body"},[o("div",{staticClass:"vue-color__chrome__controls"},[o("div",{staticClass:"vue-color__chrome__color-wrap"},[o("div",{staticClass:"vue-color__chrome__active-color",style:{background:e.activeColor}})]),e._v(" "),o("div",{staticClass:"vue-color__chrome__sliders"},[o("div",{staticClass:"vue-color__chrome__hue-wrap"},[o("hue",{on:{change:e.childChange},model:{value:e.colors,callback:function(t){e.colors=t},expression:"colors"}})],1),e._v(" "),o("div",{staticClass:"vue-color__chrome__alpha-wrap"},[o("alpha",{on:{change:e.childChange},model:{value:e.colors,callback:function(t){e.colors=t},expression:"colors"}})],1)])]),e._v(" "),o("div",{staticClass:"vue-color__chrome__fields-wrap"},[o("div",{directives:[{name:"show",rawName:"v-show",value:0===e.fieldsIndex,expression:"fieldsIndex === 0"}],staticClass:"vue-color__chrome__fields"},[o("div",{staticClass:"vue-color__chrome__field"},[o("ed-in",{attrs:{label:"hex"},on:{change:e.inputChange},model:{value:e.colors.hex,callback:function(t){e.colors.hex=t},expression:"colors.hex"}})],1)]),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:1===e.fieldsIndex,expression:"fieldsIndex === 1"}],staticClass:"vue-color__chrome__fields"},[o("div",{staticClass:"vue-color__chrome__field"},[o("ed-in",{attrs:{label:"r"},on:{change:e.inputChange},model:{value:e.colors.rgba.r,callback:function(t){e.colors.rgba.r=t},expression:"colors.rgba.r"}})],1),e._v(" "),o("div",{staticClass:"vue-color__chrome__field"},[o("ed-in",{attrs:{label:"g"},on:{change:e.inputChange},model:{value:e.colors.rgba.g,callback:function(t){e.colors.rgba.g=t},expression:"colors.rgba.g"}})],1),e._v(" "),o("div",{staticClass:"vue-color__chrome__field"},[o("ed-in",{attrs:{label:"b"},on:{change:e.inputChange},model:{value:e.colors.rgba.b,callback:function(t){e.colors.rgba.b=t},expression:"colors.rgba.b"}})],1),e._v(" "),o("div",{staticClass:"vue-color__chrome__field"},[o("ed-in",{attrs:{label:"a","arrow-offset":.01,max:1},on:{change:e.inputChange},model:{value:e.colors.a,callback:function(t){e.colors.a=t},expression:"colors.a"}})],1)]),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:2===e.fieldsIndex,expression:"fieldsIndex === 2"}],staticClass:"vue-color__chrome__fields"},[o("div",{staticClass:"vue-color__chrome__field"},[o("ed-in",{attrs:{label:"h"},on:{change:e.inputChange},model:{value:e.colors.hsl.h,callback:function(t){e.colors.hsl.h=t},expression:"colors.hsl.h"}})],1),e._v(" "),o("div",{staticClass:"vue-color__chrome__field"},[o("ed-in",{attrs:{label:"s"},on:{change:e.inputChange},model:{value:e.colors.hsl.s,callback:function(t){e.colors.hsl.s=t},expression:"colors.hsl.s"}})],1),e._v(" "),o("div",{staticClass:"vue-color__chrome__field"},[o("ed-in",{attrs:{label:"l"},on:{change:e.inputChange},model:{value:e.colors.hsl.l,callback:function(t){e.colors.hsl.l=t},expression:"colors.hsl.l"}})],1),e._v(" "),o("div",{staticClass:"vue-color__chrome__field"},[o("ed-in",{attrs:{label:"a","arrow-offset":.01,max:1},on:{change:e.inputChange},model:{value:e.colors.a,callback:function(t){e.colors.a=t},expression:"colors.a"}})],1)]),e._v(" "),o("div",{staticClass:"vue-color__chrome__toggle-btn",on:{click:e.toggleViews}},[o("div",{staticClass:"vue-color__chrome__icon"},[o("svg",{staticStyle:{width:"24px",height:"24px"},attrs:{viewBox:"0 0 24 24"},on:{mouseover:e.showHighlight,mouseenter:e.showHighlight,mouseout:e.hideHighlight}},[o("path",{attrs:{fill:"#333",d:"M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"}})])]),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:e.highlight,expression:"highlight"}],staticClass:"vue-color__chrome__icon-highlight"})])])])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"vue-color__c-alpha"},[o("div",{staticClass:"vue-color__c-alpha__checkboard-wrap"},[o("checkboard")],1),e._v(" "),o("div",{staticClass:"vue-color__c-alpha__gradient",style:{background:e.gradientColor}}),e._v(" "),o("div",{ref:"container",staticClass:"vue-color__c-alpha__container",on:{mousedown:e.handleMouseDown,touchmove:e.handleChange,touchstart:e.handleChange}},[o("div",{staticClass:"vue-color__c-alpha__pointer",style:{left:100*e.colors.a+"%"}},[o("div",{staticClass:"vue-color__c-alpha__picker"})])])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"vue-color__c-checkerboard",style:{background:e.bgStyle}})},staticRenderFns:[]}},function(e,t,o){var r=o(21);"string"==typeof r&&(r=[[e.id,r,""]]);o(2)(r,{});r.locals&&(e.exports=r.locals)},function(e,t,o){var r=o(22);"string"==typeof r&&(r=[[e.id,r,""]]);o(2)(r,{});r.locals&&(e.exports=r.locals)},function(e,t,o){var r=o(23);"string"==typeof r&&(r=[[e.id,r,""]]);o(2)(r,{});r.locals&&(e.exports=r.locals)},function(e,t,o){var r=o(24);"string"==typeof r&&(r=[[e.id,r,""]]);o(2)(r,{});r.locals&&(e.exports=r.locals)},function(e,t,o){var r=o(25);"string"==typeof r&&(r=[[e.id,r,""]]);o(2)(r,{});r.locals&&(e.exports=r.locals)},function(e,t,o){var r=o(26);"string"==typeof r&&(r=[[e.id,r,""]]);o(2)(r,{});r.locals&&(e.exports=r.locals)},function(e,t,o){var r=o(27);"string"==typeof r&&(r=[[e.id,r,""]]);o(2)(r,{});r.locals&&(e.exports=r.locals)},function(e,t,o){var r=o(28);"string"==typeof r&&(r=[[e.id,r,""]]);o(2)(r,{});r.locals&&(e.exports=r.locals)},function(e,t,o){var r=o(29);"string"==typeof r&&(r=[[e.id,r,""]]);o(2)(r,{});r.locals&&(e.exports=r.locals)},function(e,t,o){var r=o(30);"string"==typeof r&&(r=[[e.id,r,""]]);o(2)(r,{});r.locals&&(e.exports=r.locals)},function(e,t,o){var r=o(31);"string"==typeof r&&(r=[[e.id,r,""]]);o(2)(r,{});r.locals&&(e.exports=r.locals)},function(e,t,o){var r=o(32);"string"==typeof r&&(r=[[e.id,r,""]]);o(2)(r,{});r.locals&&(e.exports=r.locals)}])});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(17)

var Component = __webpack_require__(2)(
  /* script */
  __webpack_require__(7),
  /* template */
  __webpack_require__(14),
  /* scopeId */
  "data-v-1073f3cf",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "on-clickaway",
      rawName: "v-on-clickaway",
      value: (_vm.away),
      expression: "away"
    }],
    staticClass: "fab-wrapper",
    style: ([_vm.pos, {
      zIndex: _vm.zIndex
    }]),
    attrs: {
      "id": _vm.position + '-wrapper'
    }
  }, [_c('div', {
    staticClass: "actions-container",
    style: (_vm.listPos),
    attrs: {
      "id": _vm.position + '-action'
    }
  }, [_c('transition', {
    attrs: {
      "name": "fab-actions-appear",
      "enter-active-class": _vm.transitionEnter,
      "leave-active-class": _vm.transitionLeave
    }
  }, [_c('ul', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.toggle),
      expression: "toggle"
    }],
    staticClass: "fab-list"
  }, _vm._l((_vm.actions), function(action) {
    return _c('li', {
      staticClass: "pointer",
      style: ({
        'background-color': _vm.bgColor
      }),
      on: {
        "click": function($event) {
          _vm.toParent(action.name)
        }
      }
    }, [_c('i', {
      staticClass: "material-icons"
    }, [_vm._v(_vm._s(action.icon))])])
  }))])], 1), _vm._v(" "), (_vm.rippleShow) ? [_c('div', {
    directives: [{
      name: "ripple",
      rawName: "v-ripple",
      value: (_vm.rippleColor == 'light' ? 'rgba(255, 255, 255, 0.35)' : ''),
      expression: "rippleColor == 'light' ? 'rgba(255, 255, 255, 0.35)' : ''"
    }],
    staticClass: "fab pointer",
    style: ({
      'background-color': _vm.bgColor
    }),
    on: {
      "click": function($event) {
        _vm.toggle = !_vm.toggle
      }
    }
  }, [_c('i', {
    staticClass: "material-icons md-36",
    class: {
      rotate: _vm.toggle
    }
  }, [_vm._v("add")])])] : [_c('div', {
    staticClass: "fab pointer",
    style: ({
      'background-color': _vm.bgColor,
      'z-index': _vm.zIndex
    }),
    on: {
      "click": function($event) {
        _vm.toggle = !_vm.toggle
      }
    }
  }, [_c('i', {
    staticClass: "material-icons md-36",
    class: {
      rotate: _vm.toggle
    }
  }, [_vm._v("add")])])]], 2)
},staticRenderFns: []}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('link', {
    attrs: {
      "rel": "stylesheet",
      "href": "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.1/css/bulma.min.css"
    }
  }), _vm._v(" "), _c('link', {
    attrs: {
      "href": "https://fonts.googleapis.com/icon?family=Material+Icons",
      "rel": "stylesheet"
    }
  }), _vm._v(" "), _c('a', {
    attrs: {
      "href": _vm.repoUrl
    }
  }, [_c('img', {
    staticStyle: {
      "position": "absolute",
      "top": "0",
      "right": "0",
      "border": "0"
    },
    attrs: {
      "src": "https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67",
      "alt": "Fork me on GitHub",
      "data-canonical-src": "https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
    }
  })]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('section', {
    staticClass: "section",
    staticStyle: {
      "padding-top": ".5rem"
    }
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-8 is-offset-2"
  }, [_c('div', {
    staticClass: "box formated"
  }, [_vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "content"
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column"
  }, [_c('div', {
    staticClass: "field is-pulled-left"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("Color")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('chrome-picker', {
    model: {
      value: (_vm.colors),
      callback: function($$v) {
        _vm.colors = $$v
      },
      expression: "colors"
    }
  })], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "column"
  }, [_c('div', {
    staticClass: "field"
  }, [_c('label', {
    staticClass: "label is-pulled-left"
  }, [_vm._v("Position")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('span', {
    staticClass: "select"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.position),
      expression: "position"
    }],
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.position = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, _vm._l((_vm.positions), function(pos) {
    return _c('option', [_vm._v(_vm._s(pos))])
  }))])]), _vm._v(" "), _c('label', {
    staticClass: "label is-pulled-left"
  }, [_vm._v("First Icon")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.firstIcon),
      expression: "firstIcon"
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.firstIcon)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.firstIcon = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('label', {
    staticClass: "label is-pulled-left"
  }, [_vm._v("Second Icon")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.secondIcon),
      expression: "secondIcon"
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.secondIcon)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.secondIcon = $event.target.value
      }
    }
  })])])])]), _vm._v(" "), _c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column has-text-centered"
  }, [_c('a', {
    attrs: {
      "href": _vm.repoUrl
    }
  }, [_vm._v("Installation & Code usage")])])])])])])])])]), _vm._v(" "), _c('footer', {
    staticClass: "footer"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "content has-text-centered"
  }, [_c('p', [_c('strong', [_vm._v("Floating Action Button Vue Directive")]), _vm._v(" by "), _c('a', {
    attrs: {
      "href": _vm.teamUrl
    }
  }, [_vm._v("Pygmy Team")]), _vm._v(".\n                ")]), _vm._v(" "), _vm._m(2)])])]), _vm._v(" "), _c('fab', {
    attrs: {
      "position": _vm.position,
      "bg-color": _vm.colors.hex,
      "actions": [{
        name: 'alertMe',
        icon: _vm.firstIcon
      }, {
        name: 'alertMe',
        icon: _vm.secondIcon
      }]
    },
    on: {
      "alertMe": _vm.alert
    }
  })], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "hero"
  }, [_c('div', {
    staticClass: "hero-body",
    staticStyle: {
      "padding": "1rem 0"
    }
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-8 is-offset-3",
    staticStyle: {
      "display": "flex",
      "align-items": "center"
    }
  }, [_c('div', {
    staticClass: "is-pulled-left"
  }, [_c('img', {
    attrs: {
      "width": "350px",
      "src": __webpack_require__(10)
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "is-pulled-left",
    staticStyle: {
      "text-align": "left"
    }
  }, [_c('h1', {
    staticClass: "title text-medium-grey",
    staticStyle: {
      "margin-bottom": ".5rem"
    }
  }, [_vm._v("\n                                Floating Action Button\n                            ")]), _vm._v(" "), _c('hr', {
    staticClass: "is-marginless"
  }), _vm._v(" "), _c('h2', {
    staticClass: "subtitle text-light-grey",
    staticStyle: {
      "margin-top": ".5rem"
    }
  }, [_vm._v("\n                                A Vue Component\n                            ")])])])])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "heading"
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column"
  }, [_c('i', {
    staticClass: "material-icons top-left"
  }, [_vm._v("code")]), _vm._v(" "), _c('span', {
    staticClass: "is-pulled-right"
  }, [_c('b', [_vm._v("Example")])])])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', [_c('small', [_vm._v("Used dependencies for this demo: "), _c('a', {
    attrs: {
      "href": "http://bulma.io"
    }
  }, [_vm._v("bulma")]), _vm._v(" | "), _c('a', {
    attrs: {
      "href": "https://github.com/xiaokaike/vue-color"
    }
  }, [_vm._v("vue-color")])])])
}]}

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'ripple',
    bind (el, binding) {
        el.addEventListener('click', (event) => {
            rippler(event, el, binding.value);
        });

        let bg = binding.value || 'rgba(0, 0, 0, 0.35)';

        function rippler(event, el) {
            let target = el;

            // Get necessary variables
            let rect        = target.getBoundingClientRect(),
                left        = rect.left,
                top         = rect.top,
                width       = target.offsetWidth,
                height      = target.offsetHeight,
                dx          = event.clientX - left,
                dy          = event.clientY - top,
                maxX        = Math.max(dx, width - dx),
                maxY        = Math.max(dy, height - dy),
                style       = window.getComputedStyle(target),
                radius      = Math.sqrt((maxX * maxX) + (maxY * maxY));

            // Create the ripple and its container
            let ripple = document.createElement("div"),
                rippleContainer = document.createElement("div");

            //Styles for ripple
            ripple.style.marginTop= '0px';
            ripple.style.marginLeft= '0px';
            ripple.style.width= '1px';
            ripple.style.height= '1px';
            ripple.style.transition= 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            ripple.style.borderRadius= '50%';
            ripple.style.pointerEvents= 'none';
            ripple.style.position= 'relative';
            ripple.style.zIndex= '9999';
            ripple.style.backgroundColor  = bg;
            
            //Styles for rippleContainer
            rippleContainer.style.position= 'absolute';
            rippleContainer.style.left = '0';
            rippleContainer.style.top = '0';
            rippleContainer.style.height = '0';
            rippleContainer.style.width = '0';
            rippleContainer.style.pointerEvents = 'none';
            rippleContainer.style.overflow = 'hidden';
            
            rippleContainer.appendChild(ripple);
            document.body.appendChild(rippleContainer);

            ripple.style.marginLeft   = dx + "px";
            ripple.style.marginTop    = dy + "px";

            rippleContainer.style.left    = left + (((window.pageXOffset || document.scrollLeft) - (document.clientLeft || 0)) || 0) + "px";
            rippleContainer.style.top     = top + (((window.pageYOffset || document.scrollTop) - (document.clientTop || 0)) || 0) + "px";
            rippleContainer.style.width   = width + "px";
            rippleContainer.style.height  = height + "px";
            rippleContainer.style.borderTopLeftRadius  = style.borderTopLeftRadius;
            rippleContainer.style.borderTopRightRadius  = style.borderTopRightRadius;
            rippleContainer.style.borderBottomLeftRadius  = style.borderBottomLeftRadius;
            rippleContainer.style.borderBottomRightRadius  = style.borderBottomRightRadius;

            setTimeout(function() {

                ripple.style.width  = radius * 2 + "px";
                ripple.style.height = radius * 2 + "px";
                ripple.style.marginLeft   = dx - radius + "px";
                ripple.style.marginTop    = dy - radius + "px";
            }, 0);

            setTimeout(function() {
                ripple.style.backgroundColor = "rgba(0, 0, 0, 0)";
            }, 250);

            setTimeout(function() {
                ripple.remove();
                rippleContainer.remove();
            }, 650);
        }
    }
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("348b9324", content, true);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("108b9cc6", content, true);

/***/ }),
/* 19 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 20 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);
//# sourceMappingURL=build.js.map