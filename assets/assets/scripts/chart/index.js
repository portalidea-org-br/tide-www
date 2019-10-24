(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;
},{}],2:[function(require,module,exports){
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;
},{}],3:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = _interopRequireDefault;
},{}],4:[function(require,module,exports){
function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
}

module.exports = _interopRequireWildcard;
},{}],5:[function(require,module,exports){
function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;
},{}],6:[function(require,module,exports){
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;
},{}],7:[function(require,module,exports){
var arrayWithoutHoles = require("./arrayWithoutHoles");

var iterableToArray = require("./iterableToArray");

var nonIterableSpread = require("./nonIterableSpread");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;
},{"./arrayWithoutHoles":1,"./iterableToArray":5,"./nonIterableSpread":6}],8:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = require("./runtime");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

},{"./runtime":9}],9:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);

},{}],10:[function(require,module,exports){
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":8}],11:[function(require,module,exports){
/**
 * Simple, lightweight, usable local autocomplete library for modern browsers
 * Because there weren’t enough autocomplete scripts in the world? Because I’m completely insane and have NIH syndrome? Probably both. :P
 * @author Lea Verou http://leaverou.github.io/awesomplete
 * MIT license
 */

(function () {

var _ = function (input, o) {
	var me = this;

    // Keep track of number of instances for unique IDs
    _.count = (_.count || 0) + 1;
    this.count = _.count;

	// Setup

	this.isOpened = false;

	this.input = $(input);
	this.input.setAttribute("autocomplete", "off");
	this.input.setAttribute("aria-expanded", "false");
	this.input.setAttribute("aria-owns", "awesomplete_list_" + this.count);
	this.input.setAttribute("role", "combobox");

	// store constructor options in case we need to distinguish
	// between default and customized behavior later on
	this.options = o = o || {};

	configure(this, {
		minChars: 2,
		maxItems: 10,
		autoFirst: false,
		data: _.DATA,
		filter: _.FILTER_CONTAINS,
		sort: o.sort === false ? false : _.SORT_BYLENGTH,
		container: _.CONTAINER,
		item: _.ITEM,
		replace: _.REPLACE,
		tabSelect: false
	}, o);

	this.index = -1;

	// Create necessary elements

	this.container = this.container(input);

	this.ul = $.create("ul", {
		hidden: "hidden",
        role: "listbox",
        id: "awesomplete_list_" + this.count,
		inside: this.container
	});

	this.status = $.create("span", {
		className: "visually-hidden",
		role: "status",
		"aria-live": "assertive",
        "aria-atomic": true,
        inside: this.container,
        textContent: this.minChars != 0 ? ("Type " + this.minChars + " or more characters for results.") : "Begin typing for results."
	});

	// Bind events

	this._events = {
		input: {
			"input": this.evaluate.bind(this),
			"blur": this.close.bind(this, { reason: "blur" }),
			"keydown": function(evt) {
				var c = evt.keyCode;

				// If the dropdown `ul` is in view, then act on keydown for the following keys:
				// Enter / Esc / Up / Down
				if(me.opened) {
					if (c === 13 && me.selected) { // Enter
						evt.preventDefault();
						me.select(undefined, undefined, evt);
					}
					else if (c === 9 && me.selected && me.tabSelect) {
						me.select(undefined, undefined, evt);
					}
					else if (c === 27) { // Esc
						me.close({ reason: "esc" });
					}
					else if (c === 38 || c === 40) { // Down/Up arrow
						evt.preventDefault();
						me[c === 38? "previous" : "next"]();
					}
				}
			}
		},
		form: {
			"submit": this.close.bind(this, { reason: "submit" })
		},
		ul: {
			// Prevent the default mousedowm, which ensures the input is not blurred.
			// The actual selection will happen on click. This also ensures dragging the
			// cursor away from the list item will cancel the selection
			"mousedown": function(evt) {
				evt.preventDefault();
			},
			// The click event is fired even if the corresponding mousedown event has called preventDefault
			"click": function(evt) {
				var li = evt.target;

				if (li !== this) {

					while (li && !/li/i.test(li.nodeName)) {
						li = li.parentNode;
					}

					if (li && evt.button === 0) {  // Only select on left click
						evt.preventDefault();
						me.select(li, evt.target, evt);
					}
				}
			}
		}
	};

	$.bind(this.input, this._events.input);
	$.bind(this.input.form, this._events.form);
	$.bind(this.ul, this._events.ul);

	if (this.input.hasAttribute("list")) {
		this.list = "#" + this.input.getAttribute("list");
		this.input.removeAttribute("list");
	}
	else {
		this.list = this.input.getAttribute("data-list") || o.list || [];
	}

	_.all.push(this);
};

_.prototype = {
	set list(list) {
		if (Array.isArray(list)) {
			this._list = list;
		}
		else if (typeof list === "string" && list.indexOf(",") > -1) {
				this._list = list.split(/\s*,\s*/);
		}
		else { // Element or CSS selector
			list = $(list);

			if (list && list.children) {
				var items = [];
				slice.apply(list.children).forEach(function (el) {
					if (!el.disabled) {
						var text = el.textContent.trim();
						var value = el.value || text;
						var label = el.label || text;
						if (value !== "") {
							items.push({ label: label, value: value });
						}
					}
				});
				this._list = items;
			}
		}

		if (document.activeElement === this.input) {
			this.evaluate();
		}
	},

	get selected() {
		return this.index > -1;
	},

	get opened() {
		return this.isOpened;
	},

	close: function (o) {
		if (!this.opened) {
			return;
		}

		this.input.setAttribute("aria-expanded", "false");
		this.ul.setAttribute("hidden", "");
		this.isOpened = false;
		this.index = -1;

		this.status.setAttribute("hidden", "");

		$.fire(this.input, "awesomplete-close", o || {});
	},

	open: function () {
		this.input.setAttribute("aria-expanded", "true");
		this.ul.removeAttribute("hidden");
		this.isOpened = true;

		this.status.removeAttribute("hidden");

		if (this.autoFirst && this.index === -1) {
			this.goto(0);
		}

		$.fire(this.input, "awesomplete-open");
	},

	destroy: function() {
		//remove events from the input and its form
		$.unbind(this.input, this._events.input);
		$.unbind(this.input.form, this._events.form);

		// cleanup container if it was created by Awesomplete but leave it alone otherwise
		if (!this.options.container) {
			//move the input out of the awesomplete container and remove the container and its children
			var parentNode = this.container.parentNode;

			parentNode.insertBefore(this.input, this.container);
			parentNode.removeChild(this.container);
		}

		//remove autocomplete and aria-autocomplete attributes
		this.input.removeAttribute("autocomplete");
		this.input.removeAttribute("aria-autocomplete");

		//remove this awesomeplete instance from the global array of instances
		var indexOfAwesomplete = _.all.indexOf(this);

		if (indexOfAwesomplete !== -1) {
			_.all.splice(indexOfAwesomplete, 1);
		}
	},

	next: function () {
		var count = this.ul.children.length;
		this.goto(this.index < count - 1 ? this.index + 1 : (count ? 0 : -1) );
	},

	previous: function () {
		var count = this.ul.children.length;
		var pos = this.index - 1;

		this.goto(this.selected && pos !== -1 ? pos : count - 1);
	},

	// Should not be used, highlights specific item without any checks!
	goto: function (i) {
		var lis = this.ul.children;

		if (this.selected) {
			lis[this.index].setAttribute("aria-selected", "false");
		}

		this.index = i;

		if (i > -1 && lis.length > 0) {
			lis[i].setAttribute("aria-selected", "true");

			this.status.textContent = lis[i].textContent + ", list item " + (i + 1) + " of " + lis.length;

            this.input.setAttribute("aria-activedescendant", this.ul.id + "_item_" + this.index);

			// scroll to highlighted element in case parent's height is fixed
			this.ul.scrollTop = lis[i].offsetTop - this.ul.clientHeight + lis[i].clientHeight;

			$.fire(this.input, "awesomplete-highlight", {
				text: this.suggestions[this.index]
			});
		}
	},

	select: function (selected, origin, originalEvent) {
		if (selected) {
			this.index = $.siblingIndex(selected);
		} else {
			selected = this.ul.children[this.index];
		}

		if (selected) {
			var suggestion = this.suggestions[this.index];

			var allowed = $.fire(this.input, "awesomplete-select", {
				text: suggestion,
				origin: origin || selected,
				originalEvent: originalEvent
			});

			if (allowed) {
				this.replace(suggestion);
				this.close({ reason: "select" });
				$.fire(this.input, "awesomplete-selectcomplete", {
					text: suggestion,
					originalEvent: originalEvent
				});
			}
		}
	},

	evaluate: function() {
		var me = this;
		var value = this.input.value;

		if (value.length >= this.minChars && this._list && this._list.length > 0) {
			this.index = -1;
			// Populate list with options that match
			this.ul.innerHTML = "";

			this.suggestions = this._list
				.map(function(item) {
					return new Suggestion(me.data(item, value));
				})
				.filter(function(item) {
					return me.filter(item, value);
				});

			if (this.sort !== false) {
				this.suggestions = this.suggestions.sort(this.sort);
			}

			this.suggestions = this.suggestions.slice(0, this.maxItems);

			this.suggestions.forEach(function(text, index) {
					me.ul.appendChild(me.item(text, value, index));
				});

			if (this.ul.children.length === 0) {

                this.status.textContent = "No results found";

				this.close({ reason: "nomatches" });

			} else {
				this.open();

                this.status.textContent = this.ul.children.length + " results found";
			}
		}
		else {
			this.close({ reason: "nomatches" });

                this.status.textContent = "No results found";
		}
	}
};

// Static methods/properties

_.all = [];

_.FILTER_CONTAINS = function (text, input) {
	return RegExp($.regExpEscape(input.trim()), "i").test(text);
};

_.FILTER_STARTSWITH = function (text, input) {
	return RegExp("^" + $.regExpEscape(input.trim()), "i").test(text);
};

_.SORT_BYLENGTH = function (a, b) {
	if (a.length !== b.length) {
		return a.length - b.length;
	}

	return a < b? -1 : 1;
};

_.CONTAINER = function (input) {
	return $.create("div", {
		className: "awesomplete",
		around: input
	});
}

_.ITEM = function (text, input, item_id) {
	var html = input.trim() === "" ? text : text.replace(RegExp($.regExpEscape(input.trim()), "gi"), "<mark>$&</mark>");
	return $.create("li", {
		innerHTML: html,
		"role": "option",
		"aria-selected": "false",
		"id": "awesomplete_list_" + this.count + "_item_" + item_id
	});
};

_.REPLACE = function (text) {
	this.input.value = text.value;
};

_.DATA = function (item/*, input*/) { return item; };

// Private functions

function Suggestion(data) {
	var o = Array.isArray(data)
	  ? { label: data[0], value: data[1] }
	  : typeof data === "object" && "label" in data && "value" in data ? data : { label: data, value: data };

	this.label = o.label || o.value;
	this.value = o.value;
}
Object.defineProperty(Suggestion.prototype = Object.create(String.prototype), "length", {
	get: function() { return this.label.length; }
});
Suggestion.prototype.toString = Suggestion.prototype.valueOf = function () {
	return "" + this.label;
};

function configure(instance, properties, o) {
	for (var i in properties) {
		var initial = properties[i],
		    attrValue = instance.input.getAttribute("data-" + i.toLowerCase());

		if (typeof initial === "number") {
			instance[i] = parseInt(attrValue);
		}
		else if (initial === false) { // Boolean options must be false by default anyway
			instance[i] = attrValue !== null;
		}
		else if (initial instanceof Function) {
			instance[i] = null;
		}
		else {
			instance[i] = attrValue;
		}

		if (!instance[i] && instance[i] !== 0) {
			instance[i] = (i in o)? o[i] : initial;
		}
	}
}

// Helpers

var slice = Array.prototype.slice;

function $(expr, con) {
	return typeof expr === "string"? (con || document).querySelector(expr) : expr || null;
}

function $$(expr, con) {
	return slice.call((con || document).querySelectorAll(expr));
}

$.create = function(tag, o) {
	var element = document.createElement(tag);

	for (var i in o) {
		var val = o[i];

		if (i === "inside") {
			$(val).appendChild(element);
		}
		else if (i === "around") {
			var ref = $(val);
			ref.parentNode.insertBefore(element, ref);
			element.appendChild(ref);

			if (ref.getAttribute("autofocus") != null) {
				ref.focus();
			}
		}
		else if (i in element) {
			element[i] = val;
		}
		else {
			element.setAttribute(i, val);
		}
	}

	return element;
};

$.bind = function(element, o) {
	if (element) {
		for (var event in o) {
			var callback = o[event];

			event.split(/\s+/).forEach(function (event) {
				element.addEventListener(event, callback);
			});
		}
	}
};

$.unbind = function(element, o) {
	if (element) {
		for (var event in o) {
			var callback = o[event];

			event.split(/\s+/).forEach(function(event) {
				element.removeEventListener(event, callback);
			});
		}
	}
};

$.fire = function(target, type, properties) {
	var evt = document.createEvent("HTMLEvents");

	evt.initEvent(type, true, true );

	for (var j in properties) {
		evt[j] = properties[j];
	}

	return target.dispatchEvent(evt);
};

$.regExpEscape = function (s) {
	return s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
};

$.siblingIndex = function (el) {
	/* eslint-disable no-cond-assign */
	for (var i = 0; el = el.previousElementSibling; i++);
	return i;
};

// Initialization

function init() {
	$$("input.awesomplete").forEach(function (input) {
		new _(input);
	});
}

// Make sure to export Awesomplete on self when in a browser
if (typeof self !== "undefined") {
	self.Awesomplete = _;
}

// Are we in a browser? Check for Document constructor
if (typeof Document !== "undefined") {
	// DOM already loaded?
	if (document.readyState !== "loading") {
		init();
	}
	else {
		// Wait for it
		document.addEventListener("DOMContentLoaded", init);
	}
}

_.$ = $;
_.$$ = $$;

// Expose Awesomplete as a CJS module
if (typeof module === "object" && module.exports) {
	module.exports = _;
}

return _;

}());

},{}],12:[function(require,module,exports){
module.exports = require('./lib/axios');
},{"./lib/axios":14}],13:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var buildURL = require('./../helpers/buildURL');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = require('./../helpers/cookies');

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

},{"../core/createError":20,"./../core/settle":24,"./../helpers/buildURL":28,"./../helpers/cookies":30,"./../helpers/isURLSameOrigin":32,"./../helpers/parseHeaders":34,"./../utils":36}],14:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./cancel/Cancel":15,"./cancel/CancelToken":16,"./cancel/isCancel":17,"./core/Axios":18,"./core/mergeConfig":23,"./defaults":26,"./helpers/bind":27,"./helpers/spread":35,"./utils":36}],15:[function(require,module,exports){
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

},{}],16:[function(require,module,exports){
'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./Cancel":15}],17:[function(require,module,exports){
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],18:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get';

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

},{"../helpers/buildURL":28,"./../utils":36,"./InterceptorManager":19,"./dispatchRequest":21,"./mergeConfig":23}],19:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":36}],20:[function(require,module,exports){
'use strict';

var enhanceError = require('./enhanceError');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

},{"./enhanceError":22}],21:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');
var isAbsoluteURL = require('./../helpers/isAbsoluteURL');
var combineURLs = require('./../helpers/combineURLs');

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"../cancel/isCancel":17,"../defaults":26,"./../helpers/combineURLs":29,"./../helpers/isAbsoluteURL":31,"./../utils":36,"./transformData":25}],22:[function(require,module,exports){
'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

},{}],23:[function(require,module,exports){
'use strict';

var utils = require('../utils');

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach([
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',
    'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',
    'socketPath'
  ], function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};

},{"../utils":36}],24:[function(require,module,exports){
'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

},{"./createError":20}],25:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

},{"./../utils":36}],26:[function(require,module,exports){
(function (process){
'use strict';

var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  // Only Node.JS has a process variable that is of [[Class]] process
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

}).call(this,require('_process'))
},{"./adapters/http":13,"./adapters/xhr":13,"./helpers/normalizeHeaderName":33,"./utils":36,"_process":44}],27:[function(require,module,exports){
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],28:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":36}],29:[function(require,module,exports){
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],30:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

},{"./../utils":36}],31:[function(require,module,exports){
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

},{}],32:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

},{"./../utils":36}],33:[function(require,module,exports){
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":36}],34:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

},{"./../utils":36}],35:[function(require,module,exports){
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],36:[function(require,module,exports){
'use strict';

var bind = require('./helpers/bind');
var isBuffer = require('is-buffer');

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};

},{"./helpers/bind":27,"is-buffer":37}],37:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

module.exports = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

},{}],38:[function(require,module,exports){
(function (setImmediate){
/*
WHAT: SublimeText-like Fuzzy Search

USAGE:
  fuzzysort.single('fs', 'Fuzzy Search') // {score: -16}
  fuzzysort.single('test', 'test') // {score: 0}
  fuzzysort.single('doesnt exist', 'target') // null

  fuzzysort.go('mr', ['Monitor.cpp', 'MeshRenderer.cpp'])
  // [{score: -18, target: "MeshRenderer.cpp"}, {score: -6009, target: "Monitor.cpp"}]

  fuzzysort.highlight(fuzzysort.single('fs', 'Fuzzy Search'), '<b>', '</b>')
  // <b>F</b>uzzy <b>S</b>earch
*/

// UMD (Universal Module Definition) for fuzzysort
;(function(root, UMD) {
  if(typeof define === 'function' && define.amd) define([], UMD)
  else if(typeof module === 'object' && module.exports) module.exports = UMD()
  else root.fuzzysort = UMD()
})(this, function UMD() { function fuzzysortNew(instanceOptions) {

  var fuzzysort = {

    single: function(search, target, options) {
      if(!search) return null
      if(!isObj(search)) search = fuzzysort.getPreparedSearch(search)

      if(!target) return null
      if(!isObj(target)) target = fuzzysort.getPrepared(target)

      var allowTypo = options && options.allowTypo!==undefined ? options.allowTypo
        : instanceOptions && instanceOptions.allowTypo!==undefined ? instanceOptions.allowTypo
        : true
      var algorithm = allowTypo ? fuzzysort.algorithm : fuzzysort.algorithmNoTypo
      return algorithm(search, target, search[0])
      // var threshold = options && options.threshold || instanceOptions && instanceOptions.threshold || -9007199254740991
      // var result = algorithm(search, target, search[0])
      // if(result === null) return null
      // if(result.score < threshold) return null
      // return result
    },

    go: function(search, targets, options) {
      if(!search) return noResults
      search = fuzzysort.prepareSearch(search)
      var searchLowerCode = search[0]

      var threshold = options && options.threshold || instanceOptions && instanceOptions.threshold || -9007199254740991
      var limit = options && options.limit || instanceOptions && instanceOptions.limit || 9007199254740991
      var allowTypo = options && options.allowTypo!==undefined ? options.allowTypo
        : instanceOptions && instanceOptions.allowTypo!==undefined ? instanceOptions.allowTypo
        : true
      var algorithm = allowTypo ? fuzzysort.algorithm : fuzzysort.algorithmNoTypo
      var resultsLen = 0; var limitedCount = 0
      var targetsLen = targets.length

      // This code is copy/pasted 3 times for performance reasons [options.keys, options.key, no keys]

      // options.keys
      if(options && options.keys) {
        var scoreFn = options.scoreFn || defaultScoreFn
        var keys = options.keys
        var keysLen = keys.length
        for(var i = targetsLen - 1; i >= 0; --i) { var obj = targets[i]
          var objResults = new Array(keysLen)
          for (var keyI = keysLen - 1; keyI >= 0; --keyI) {
            var key = keys[keyI]
            var target = getValue(obj, key)
            if(!target) { objResults[keyI] = null; continue }
            if(!isObj(target)) target = fuzzysort.getPrepared(target)

            objResults[keyI] = algorithm(search, target, searchLowerCode)
          }
          objResults.obj = obj // before scoreFn so scoreFn can use it
          var score = scoreFn(objResults)
          if(score === null) continue
          if(score < threshold) continue
          objResults.score = score
          if(resultsLen < limit) { q.add(objResults); ++resultsLen }
          else {
            ++limitedCount
            if(score > q.peek().score) q.replaceTop(objResults)
          }
        }

      // options.key
      } else if(options && options.key) {
        var key = options.key
        for(var i = targetsLen - 1; i >= 0; --i) { var obj = targets[i]
          var target = getValue(obj, key)
          if(!target) continue
          if(!isObj(target)) target = fuzzysort.getPrepared(target)

          var result = algorithm(search, target, searchLowerCode)
          if(result === null) continue
          if(result.score < threshold) continue

          // have to clone result so duplicate targets from different obj can each reference the correct obj
          result = {target:result.target, _targetLowerCodes:null, _nextBeginningIndexes:null, score:result.score, indexes:result.indexes, obj:obj} // hidden

          if(resultsLen < limit) { q.add(result); ++resultsLen }
          else {
            ++limitedCount
            if(result.score > q.peek().score) q.replaceTop(result)
          }
        }

      // no keys
      } else {
        for(var i = targetsLen - 1; i >= 0; --i) { var target = targets[i]
          if(!target) continue
          if(!isObj(target)) target = fuzzysort.getPrepared(target)

          var result = algorithm(search, target, searchLowerCode)
          if(result === null) continue
          if(result.score < threshold) continue
          if(resultsLen < limit) { q.add(result); ++resultsLen }
          else {
            ++limitedCount
            if(result.score > q.peek().score) q.replaceTop(result)
          }
        }
      }

      if(resultsLen === 0) return noResults
      var results = new Array(resultsLen)
      for(var i = resultsLen - 1; i >= 0; --i) results[i] = q.poll()
      results.total = resultsLen + limitedCount
      return results
    },

    goAsync: function(search, targets, options) {
      var canceled = false
      var p = new Promise(function(resolve, reject) {
        if(!search) return resolve(noResults)
        search = fuzzysort.prepareSearch(search)
        var searchLowerCode = search[0]

        var q = fastpriorityqueue()
        var iCurrent = targets.length - 1
        var threshold = options && options.threshold || instanceOptions && instanceOptions.threshold || -9007199254740991
        var limit = options && options.limit || instanceOptions && instanceOptions.limit || 9007199254740991
        var allowTypo = options && options.allowTypo!==undefined ? options.allowTypo
          : instanceOptions && instanceOptions.allowTypo!==undefined ? instanceOptions.allowTypo
          : true
        var algorithm = allowTypo ? fuzzysort.algorithm : fuzzysort.algorithmNoTypo
        var resultsLen = 0; var limitedCount = 0
        function step() {
          if(canceled) return reject('canceled')

          var startMs = Date.now()

          // This code is copy/pasted 3 times for performance reasons [options.keys, options.key, no keys]

          // options.keys
          if(options && options.keys) {
            var scoreFn = options.scoreFn || defaultScoreFn
            var keys = options.keys
            var keysLen = keys.length
            for(; iCurrent >= 0; --iCurrent) { var obj = targets[iCurrent]
              var objResults = new Array(keysLen)
              for (var keyI = keysLen - 1; keyI >= 0; --keyI) {
                var key = keys[keyI]
                var target = getValue(obj, key)
                if(!target) { objResults[keyI] = null; continue }
                if(!isObj(target)) target = fuzzysort.getPrepared(target)

                objResults[keyI] = algorithm(search, target, searchLowerCode)
              }
              objResults.obj = obj // before scoreFn so scoreFn can use it
              var score = scoreFn(objResults)
              if(score === null) continue
              if(score < threshold) continue
              objResults.score = score
              if(resultsLen < limit) { q.add(objResults); ++resultsLen }
              else {
                ++limitedCount
                if(score > q.peek().score) q.replaceTop(objResults)
              }

              if(iCurrent%1000/*itemsPerCheck*/ === 0) {
                if(Date.now() - startMs >= 10/*asyncInterval*/) {
                  isNode?setImmediate(step):setTimeout(step)
                  return
                }
              }
            }

          // options.key
          } else if(options && options.key) {
            var key = options.key
            for(; iCurrent >= 0; --iCurrent) { var obj = targets[iCurrent]
              var target = getValue(obj, key)
              if(!target) continue
              if(!isObj(target)) target = fuzzysort.getPrepared(target)

              var result = algorithm(search, target, searchLowerCode)
              if(result === null) continue
              if(result.score < threshold) continue

              // have to clone result so duplicate targets from different obj can each reference the correct obj
              result = {target:result.target, _targetLowerCodes:null, _nextBeginningIndexes:null, score:result.score, indexes:result.indexes, obj:obj} // hidden

              if(resultsLen < limit) { q.add(result); ++resultsLen }
              else {
                ++limitedCount
                if(result.score > q.peek().score) q.replaceTop(result)
              }

              if(iCurrent%1000/*itemsPerCheck*/ === 0) {
                if(Date.now() - startMs >= 10/*asyncInterval*/) {
                  isNode?setImmediate(step):setTimeout(step)
                  return
                }
              }
            }

          // no keys
          } else {
            for(; iCurrent >= 0; --iCurrent) { var target = targets[iCurrent]
              if(!target) continue
              if(!isObj(target)) target = fuzzysort.getPrepared(target)

              var result = algorithm(search, target, searchLowerCode)
              if(result === null) continue
              if(result.score < threshold) continue
              if(resultsLen < limit) { q.add(result); ++resultsLen }
              else {
                ++limitedCount
                if(result.score > q.peek().score) q.replaceTop(result)
              }

              if(iCurrent%1000/*itemsPerCheck*/ === 0) {
                if(Date.now() - startMs >= 10/*asyncInterval*/) {
                  isNode?setImmediate(step):setTimeout(step)
                  return
                }
              }
            }
          }

          if(resultsLen === 0) return resolve(noResults)
          var results = new Array(resultsLen)
          for(var i = resultsLen - 1; i >= 0; --i) results[i] = q.poll()
          results.total = resultsLen + limitedCount
          resolve(results)
        }

        isNode?setImmediate(step):step()
      })
      p.cancel = function() { canceled = true }
      return p
    },

    highlight: function(result, hOpen, hClose) {
      if(result === null) return null
      if(hOpen === undefined) hOpen = '<b>'
      if(hClose === undefined) hClose = '</b>'
      var highlighted = ''
      var matchesIndex = 0
      var opened = false
      var target = result.target
      var targetLen = target.length
      var matchesBest = result.indexes
      for(var i = 0; i < targetLen; ++i) { var char = target[i]
        if(matchesBest[matchesIndex] === i) {
          ++matchesIndex
          if(!opened) { opened = true
            highlighted += hOpen
          }

          if(matchesIndex === matchesBest.length) {
            highlighted += char + hClose + target.substr(i+1)
            break
          }
        } else {
          if(opened) { opened = false
            highlighted += hClose
          }
        }
        highlighted += char
      }

      return highlighted
    },

    prepare: function(target) {
      if(!target) return
      return {target:target, _targetLowerCodes:fuzzysort.prepareLowerCodes(target), _nextBeginningIndexes:null, score:null, indexes:null, obj:null} // hidden
    },
    prepareSlow: function(target) {
      if(!target) return
      return {target:target, _targetLowerCodes:fuzzysort.prepareLowerCodes(target), _nextBeginningIndexes:fuzzysort.prepareNextBeginningIndexes(target), score:null, indexes:null, obj:null} // hidden
    },
    prepareSearch: function(search) {
      if(!search) return
      return fuzzysort.prepareLowerCodes(search)
    },



    // Below this point is only internal code
    // Below this point is only internal code
    // Below this point is only internal code
    // Below this point is only internal code



    getPrepared: function(target) {
      if(target.length > 999) return fuzzysort.prepare(target) // don't cache huge targets
      var targetPrepared = preparedCache.get(target)
      if(targetPrepared !== undefined) return targetPrepared
      targetPrepared = fuzzysort.prepare(target)
      preparedCache.set(target, targetPrepared)
      return targetPrepared
    },
    getPreparedSearch: function(search) {
      if(search.length > 999) return fuzzysort.prepareSearch(search) // don't cache huge searches
      var searchPrepared = preparedSearchCache.get(search)
      if(searchPrepared !== undefined) return searchPrepared
      searchPrepared = fuzzysort.prepareSearch(search)
      preparedSearchCache.set(search, searchPrepared)
      return searchPrepared
    },

    algorithm: function(searchLowerCodes, prepared, searchLowerCode) {
      var targetLowerCodes = prepared._targetLowerCodes
      var searchLen = searchLowerCodes.length
      var targetLen = targetLowerCodes.length
      var searchI = 0 // where we at
      var targetI = 0 // where you at
      var typoSimpleI = 0
      var matchesSimpleLen = 0

      // very basic fuzzy match; to remove non-matching targets ASAP!
      // walk through target. find sequential matches.
      // if all chars aren't found then exit
      for(;;) {
        var isMatch = searchLowerCode === targetLowerCodes[targetI]
        if(isMatch) {
          matchesSimple[matchesSimpleLen++] = targetI
          ++searchI; if(searchI === searchLen) break
          searchLowerCode = searchLowerCodes[typoSimpleI===0?searchI : (typoSimpleI===searchI?searchI+1 : (typoSimpleI===searchI-1?searchI-1 : searchI))]
        }

        ++targetI; if(targetI >= targetLen) { // Failed to find searchI
          // Check for typo or exit
          // we go as far as possible before trying to transpose
          // then we transpose backwards until we reach the beginning
          for(;;) {
            if(searchI <= 1) return null // not allowed to transpose first char
            if(typoSimpleI === 0) { // we haven't tried to transpose yet
              --searchI
              var searchLowerCodeNew = searchLowerCodes[searchI]
              if(searchLowerCode === searchLowerCodeNew) continue // doesn't make sense to transpose a repeat char
              typoSimpleI = searchI
            } else {
              if(typoSimpleI === 1) return null // reached the end of the line for transposing
              --typoSimpleI
              searchI = typoSimpleI
              searchLowerCode = searchLowerCodes[searchI + 1]
              var searchLowerCodeNew = searchLowerCodes[searchI]
              if(searchLowerCode === searchLowerCodeNew) continue // doesn't make sense to transpose a repeat char
            }
            matchesSimpleLen = searchI
            targetI = matchesSimple[matchesSimpleLen - 1] + 1
            break
          }
        }
      }

      var searchI = 0
      var typoStrictI = 0
      var successStrict = false
      var matchesStrictLen = 0

      var nextBeginningIndexes = prepared._nextBeginningIndexes
      if(nextBeginningIndexes === null) nextBeginningIndexes = prepared._nextBeginningIndexes = fuzzysort.prepareNextBeginningIndexes(prepared.target)
      var firstPossibleI = targetI = matchesSimple[0]===0 ? 0 : nextBeginningIndexes[matchesSimple[0]-1]

      // Our target string successfully matched all characters in sequence!
      // Let's try a more advanced and strict test to improve the score
      // only count it as a match if it's consecutive or a beginning character!
      if(targetI !== targetLen) for(;;) {
        if(targetI >= targetLen) {
          // We failed to find a good spot for this search char, go back to the previous search char and force it forward
          if(searchI <= 0) { // We failed to push chars forward for a better match
            // transpose, starting from the beginning
            ++typoStrictI; if(typoStrictI > searchLen-2) break
            if(searchLowerCodes[typoStrictI] === searchLowerCodes[typoStrictI+1]) continue // doesn't make sense to transpose a repeat char
            targetI = firstPossibleI
            continue
          }

          --searchI
          var lastMatch = matchesStrict[--matchesStrictLen]
          targetI = nextBeginningIndexes[lastMatch]

        } else {
          var isMatch = searchLowerCodes[typoStrictI===0?searchI : (typoStrictI===searchI?searchI+1 : (typoStrictI===searchI-1?searchI-1 : searchI))] === targetLowerCodes[targetI]
          if(isMatch) {
            matchesStrict[matchesStrictLen++] = targetI
            ++searchI; if(searchI === searchLen) { successStrict = true; break }
            ++targetI
          } else {
            targetI = nextBeginningIndexes[targetI]
          }
        }
      }

      { // tally up the score & keep track of matches for highlighting later
        if(successStrict) { var matchesBest = matchesStrict; var matchesBestLen = matchesStrictLen }
        else { var matchesBest = matchesSimple; var matchesBestLen = matchesSimpleLen }
        var score = 0
        var lastTargetI = -1
        for(var i = 0; i < searchLen; ++i) { var targetI = matchesBest[i]
          // score only goes down if they're not consecutive
          if(lastTargetI !== targetI - 1) score -= targetI
          lastTargetI = targetI
        }
        if(!successStrict) {
          score *= 1000
          if(typoSimpleI !== 0) score += -20/*typoPenalty*/
        } else {
          if(typoStrictI !== 0) score += -20/*typoPenalty*/
        }
        score -= targetLen - searchLen
        prepared.score = score
        prepared.indexes = new Array(matchesBestLen); for(var i = matchesBestLen - 1; i >= 0; --i) prepared.indexes[i] = matchesBest[i]

        return prepared
      }
    },

    algorithmNoTypo: function(searchLowerCodes, prepared, searchLowerCode) {
      var targetLowerCodes = prepared._targetLowerCodes
      var searchLen = searchLowerCodes.length
      var targetLen = targetLowerCodes.length
      var searchI = 0 // where we at
      var targetI = 0 // where you at
      var matchesSimpleLen = 0

      // very basic fuzzy match; to remove non-matching targets ASAP!
      // walk through target. find sequential matches.
      // if all chars aren't found then exit
      for(;;) {
        var isMatch = searchLowerCode === targetLowerCodes[targetI]
        if(isMatch) {
          matchesSimple[matchesSimpleLen++] = targetI
          ++searchI; if(searchI === searchLen) break
          searchLowerCode = searchLowerCodes[searchI]
        }
        ++targetI; if(targetI >= targetLen) return null // Failed to find searchI
      }

      var searchI = 0
      var successStrict = false
      var matchesStrictLen = 0

      var nextBeginningIndexes = prepared._nextBeginningIndexes
      if(nextBeginningIndexes === null) nextBeginningIndexes = prepared._nextBeginningIndexes = fuzzysort.prepareNextBeginningIndexes(prepared.target)
      var firstPossibleI = targetI = matchesSimple[0]===0 ? 0 : nextBeginningIndexes[matchesSimple[0]-1]

      // Our target string successfully matched all characters in sequence!
      // Let's try a more advanced and strict test to improve the score
      // only count it as a match if it's consecutive or a beginning character!
      if(targetI !== targetLen) for(;;) {
        if(targetI >= targetLen) {
          // We failed to find a good spot for this search char, go back to the previous search char and force it forward
          if(searchI <= 0) break // We failed to push chars forward for a better match

          --searchI
          var lastMatch = matchesStrict[--matchesStrictLen]
          targetI = nextBeginningIndexes[lastMatch]

        } else {
          var isMatch = searchLowerCodes[searchI] === targetLowerCodes[targetI]
          if(isMatch) {
            matchesStrict[matchesStrictLen++] = targetI
            ++searchI; if(searchI === searchLen) { successStrict = true; break }
            ++targetI
          } else {
            targetI = nextBeginningIndexes[targetI]
          }
        }
      }

      { // tally up the score & keep track of matches for highlighting later
        if(successStrict) { var matchesBest = matchesStrict; var matchesBestLen = matchesStrictLen }
        else { var matchesBest = matchesSimple; var matchesBestLen = matchesSimpleLen }
        var score = 0
        var lastTargetI = -1
        for(var i = 0; i < searchLen; ++i) { var targetI = matchesBest[i]
          // score only goes down if they're not consecutive
          if(lastTargetI !== targetI - 1) score -= targetI
          lastTargetI = targetI
        }
        if(!successStrict) score *= 1000
        score -= targetLen - searchLen
        prepared.score = score
        prepared.indexes = new Array(matchesBestLen); for(var i = matchesBestLen - 1; i >= 0; --i) prepared.indexes[i] = matchesBest[i]

        return prepared
      }
    },

    prepareLowerCodes: function(str) {
      var strLen = str.length
      var lowerCodes = [] // new Array(strLen)    sparse array is too slow
      var lower = str.toLowerCase()
      for(var i = 0; i < strLen; ++i) lowerCodes[i] = lower.charCodeAt(i)
      return lowerCodes
    },
    prepareBeginningIndexes: function(target) {
      var targetLen = target.length
      var beginningIndexes = []; var beginningIndexesLen = 0
      var wasUpper = false
      var wasAlphanum = false
      for(var i = 0; i < targetLen; ++i) {
        var targetCode = target.charCodeAt(i)
        var isUpper = targetCode>=65&&targetCode<=90
        var isAlphanum = isUpper || targetCode>=97&&targetCode<=122 || targetCode>=48&&targetCode<=57
        var isBeginning = isUpper && !wasUpper || !wasAlphanum || !isAlphanum
        wasUpper = isUpper
        wasAlphanum = isAlphanum
        if(isBeginning) beginningIndexes[beginningIndexesLen++] = i
      }
      return beginningIndexes
    },
    prepareNextBeginningIndexes: function(target) {
      var targetLen = target.length
      var beginningIndexes = fuzzysort.prepareBeginningIndexes(target)
      var nextBeginningIndexes = [] // new Array(targetLen)     sparse array is too slow
      var lastIsBeginning = beginningIndexes[0]
      var lastIsBeginningI = 0
      for(var i = 0; i < targetLen; ++i) {
        if(lastIsBeginning > i) {
          nextBeginningIndexes[i] = lastIsBeginning
        } else {
          lastIsBeginning = beginningIndexes[++lastIsBeginningI]
          nextBeginningIndexes[i] = lastIsBeginning===undefined ? targetLen : lastIsBeginning
        }
      }
      return nextBeginningIndexes
    },

    cleanup: cleanup,
    new: fuzzysortNew,
  }
  return fuzzysort
} // fuzzysortNew

// This stuff is outside fuzzysortNew, because it's shared with instances of fuzzysort.new()
var isNode = typeof require !== 'undefined' && typeof window === 'undefined'
// var MAX_INT = Number.MAX_SAFE_INTEGER
// var MIN_INT = Number.MIN_VALUE
var preparedCache = new Map()
var preparedSearchCache = new Map()
var noResults = []; noResults.total = 0
var matchesSimple = []; var matchesStrict = []
function cleanup() { preparedCache.clear(); preparedSearchCache.clear(); matchesSimple = []; matchesStrict = [] }
function defaultScoreFn(a) {
  var max = -9007199254740991
  for (var i = a.length - 1; i >= 0; --i) {
    var result = a[i]; if(result === null) continue
    var score = result.score
    if(score > max) max = score
  }
  if(max === -9007199254740991) return null
  return max
}

// prop = 'key'              2.5ms optimized for this case, seems to be about as fast as direct obj[prop]
// prop = 'key1.key2'        10ms
// prop = ['key1', 'key2']   27ms
function getValue(obj, prop) {
  var tmp = obj[prop]; if(tmp !== undefined) return tmp
  var segs = prop
  if(!Array.isArray(prop)) segs = prop.split('.')
  var len = segs.length
  var i = -1
  while (obj && (++i < len)) obj = obj[segs[i]]
  return obj
}

function isObj(x) { return typeof x === 'object' } // faster as a function

// Hacked version of https://github.com/lemire/FastPriorityQueue.js
var fastpriorityqueue=function(){var r=[],o=0,e={};function n(){for(var e=0,n=r[e],c=1;c<o;){var f=c+1;e=c,f<o&&r[f].score<r[c].score&&(e=f),r[e-1>>1]=r[e],c=1+(e<<1)}for(var a=e-1>>1;e>0&&n.score<r[a].score;a=(e=a)-1>>1)r[e]=r[a];r[e]=n}return e.add=function(e){var n=o;r[o++]=e;for(var c=n-1>>1;n>0&&e.score<r[c].score;c=(n=c)-1>>1)r[n]=r[c];r[n]=e},e.poll=function(){if(0!==o){var e=r[0];return r[0]=r[--o],n(),e}},e.peek=function(e){if(0!==o)return r[0]},e.replaceTop=function(o){r[0]=o,n()},e};
var q = fastpriorityqueue() // reuse this, except for async, it needs to make its own

return fuzzysortNew()
}) // UMD

// TODO: (performance) wasm version!?

// TODO: (performance) layout memory in an optimal way to go fast by avoiding cache misses

// TODO: (performance) preparedCache is a memory leak

// TODO: (like sublime) backslash === forwardslash

// TODO: (performance) i have no idea how well optizmied the allowing typos algorithm is

}).call(this,require("timers").setImmediate)
},{"timers":45}],39:[function(require,module,exports){
/*
 Highcharts JS v7.0.0 (2018-12-11)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(O,J){"object"===typeof module&&module.exports?module.exports=O.document?J(O):J:"function"===typeof define&&define.amd?define(function(){return J(O)}):O.Highcharts=J(O)})("undefined"!==typeof window?window:this,function(O){var J=function(){var a="undefined"===typeof O?window:O,y=a.document,G=a.navigator&&a.navigator.userAgent||"",E=y&&y.createElementNS&&!!y.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,h=/(edge|msie|trident)/i.test(G)&&!a.opera,d=-1!==G.indexOf("Firefox"),
r=-1!==G.indexOf("Chrome"),u=d&&4>parseInt(G.split("Firefox/")[1],10);return a.Highcharts?a.Highcharts.error(16,!0):{product:"Highcharts",version:"7.0.0",deg2rad:2*Math.PI/360,doc:y,hasBidiBug:u,hasTouch:y&&void 0!==y.documentElement.ontouchstart,isMS:h,isWebKit:-1!==G.indexOf("AppleWebKit"),isFirefox:d,isChrome:r,isSafari:!r&&-1!==G.indexOf("Safari"),isTouchDevice:/(Mobile|Android|Windows Phone)/.test(G),SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:E,win:a,marginNames:["plotTop",
"marginRight","marginBottom","plotLeft"],noop:function(){},charts:[]}}();(function(a){a.timers=[];var y=a.charts,G=a.doc,E=a.win;a.error=function(h,d,r){var u=a.isNumber(h)?"Highcharts error #"+h+": www.highcharts.com/errors/"+h:h;r&&a.fireEvent(r,"displayError",{code:h});if(d)throw Error(u);E.console&&console.log(u)};a.Fx=function(a,d,r){this.options=d;this.elem=a;this.prop=r};a.Fx.prototype={dSetter:function(){var a=this.paths[0],d=this.paths[1],r=[],u=this.now,v=a.length,w;if(1===u)r=this.toD;
else if(v===d.length&&1>u)for(;v--;)w=parseFloat(a[v]),r[v]=isNaN(w)?d[v]:u*parseFloat(d[v]-w)+w;else r=d;this.elem.attr("d",r,null,!0)},update:function(){var a=this.elem,d=this.prop,r=this.now,u=this.options.step;if(this[d+"Setter"])this[d+"Setter"]();else a.attr?a.element&&a.attr(d,r,null,!0):a.style[d]=r+this.unit;u&&u.call(a,r,this)},run:function(h,d,r){var u=this,v=u.options,w=function(a){return w.stopped?!1:u.step(a)},n=E.requestAnimationFrame||function(a){setTimeout(a,13)},g=function(){for(var c=
0;c<a.timers.length;c++)a.timers[c]()||a.timers.splice(c--,1);a.timers.length&&n(g)};h!==d||this.elem["forceAnimate:"+this.prop]?(this.startTime=+new Date,this.start=h,this.end=d,this.unit=r,this.now=this.start,this.pos=0,w.elem=this.elem,w.prop=this.prop,w()&&1===a.timers.push(w)&&n(g)):(delete v.curAnim[this.prop],v.complete&&0===Object.keys(v.curAnim).length&&v.complete.call(this.elem))},step:function(h){var d=+new Date,r,u=this.options,v=this.elem,w=u.complete,n=u.duration,g=u.curAnim;v.attr&&
!v.element?h=!1:h||d>=n+this.startTime?(this.now=this.end,this.pos=1,this.update(),r=g[this.prop]=!0,a.objectEach(g,function(a){!0!==a&&(r=!1)}),r&&w&&w.call(v),h=!1):(this.pos=u.easing((d-this.startTime)/n),this.now=this.start+(this.end-this.start)*this.pos,this.update(),h=!0);return h},initPath:function(h,d,r){function u(a){var b,k;for(f=a.length;f--;)b="M"===a[f]||"L"===a[f],k=/[a-zA-Z]/.test(a[f+3]),b&&k&&a.splice(f+1,0,a[f+1],a[f+2],a[f+1],a[f+2])}function v(a,l){for(;a.length<b;){a[0]=l[b-a.length];
var k=a.slice(0,p);[].splice.apply(a,[0,0].concat(k));x&&(k=a.slice(a.length-p),[].splice.apply(a,[a.length,0].concat(k)),f--)}a[0]="M"}function w(a,f){for(var k=(b-a.length)/p;0<k&&k--;)l=a.slice().splice(a.length/t-p,p*t),l[0]=f[b-p-k*p],m&&(l[p-6]=l[p-2],l[p-5]=l[p-1]),[].splice.apply(a,[a.length/t,0].concat(l)),x&&k--}d=d||"";var n,g=h.startX,c=h.endX,m=-1<d.indexOf("C"),p=m?7:3,b,l,f;d=d.split(" ");r=r.slice();var x=h.isArea,t=x?2:1,H;m&&(u(d),u(r));if(g&&c){for(f=0;f<g.length;f++)if(g[f]===
c[0]){n=f;break}else if(g[0]===c[c.length-g.length+f]){n=f;H=!0;break}void 0===n&&(d=[])}d.length&&a.isNumber(n)&&(b=r.length+n*t*p,H?(v(d,r),w(r,d)):(v(r,d),w(d,r)));return[d,r]},fillSetter:function(){a.Fx.prototype.strokeSetter.apply(this,arguments)},strokeSetter:function(){this.elem.attr(this.prop,a.color(this.start).tweenTo(a.color(this.end),this.pos),null,!0)}};a.merge=function(){var h,d=arguments,r,u={},v=function(d,n){"object"!==typeof d&&(d={});a.objectEach(n,function(g,c){!a.isObject(g,!0)||
a.isClass(g)||a.isDOMElement(g)?d[c]=n[c]:d[c]=v(d[c]||{},g)});return d};!0===d[0]&&(u=d[1],d=Array.prototype.slice.call(d,2));r=d.length;for(h=0;h<r;h++)u=v(u,d[h]);return u};a.pInt=function(a,d){return parseInt(a,d||10)};a.isString=function(a){return"string"===typeof a};a.isArray=function(a){a=Object.prototype.toString.call(a);return"[object Array]"===a||"[object Array Iterator]"===a};a.isObject=function(h,d){return!!h&&"object"===typeof h&&(!d||!a.isArray(h))};a.isDOMElement=function(h){return a.isObject(h)&&
"number"===typeof h.nodeType};a.isClass=function(h){var d=h&&h.constructor;return!(!a.isObject(h,!0)||a.isDOMElement(h)||!d||!d.name||"Object"===d.name)};a.isNumber=function(a){return"number"===typeof a&&!isNaN(a)&&Infinity>a&&-Infinity<a};a.erase=function(a,d){for(var h=a.length;h--;)if(a[h]===d){a.splice(h,1);break}};a.defined=function(a){return void 0!==a&&null!==a};a.attr=function(h,d,r){var u;a.isString(d)?a.defined(r)?h.setAttribute(d,r):h&&h.getAttribute&&((u=h.getAttribute(d))||"class"!==
d||(u=h.getAttribute(d+"Name"))):a.defined(d)&&a.isObject(d)&&a.objectEach(d,function(a,d){h.setAttribute(d,a)});return u};a.splat=function(h){return a.isArray(h)?h:[h]};a.syncTimeout=function(a,d,r){if(d)return setTimeout(a,d,r);a.call(0,r)};a.clearTimeout=function(h){a.defined(h)&&clearTimeout(h)};a.extend=function(a,d){var h;a||(a={});for(h in d)a[h]=d[h];return a};a.pick=function(){var a=arguments,d,r,u=a.length;for(d=0;d<u;d++)if(r=a[d],void 0!==r&&null!==r)return r};a.css=function(h,d){a.isMS&&
!a.svg&&d&&void 0!==d.opacity&&(d.filter="alpha(opacity\x3d"+100*d.opacity+")");a.extend(h.style,d)};a.createElement=function(h,d,r,u,v){h=G.createElement(h);var w=a.css;d&&a.extend(h,d);v&&w(h,{padding:0,border:"none",margin:0});r&&w(h,r);u&&u.appendChild(h);return h};a.extendClass=function(h,d){var r=function(){};r.prototype=new h;a.extend(r.prototype,d);return r};a.pad=function(a,d,r){return Array((d||2)+1-String(a).replace("-","").length).join(r||0)+a};a.relativeLength=function(a,d,r){return/%$/.test(a)?
d*parseFloat(a)/100+(r||0):parseFloat(a)};a.wrap=function(a,d,r){var h=a[d];a[d]=function(){var a=Array.prototype.slice.call(arguments),d=arguments,n=this;n.proceed=function(){h.apply(n,arguments.length?arguments:d)};a.unshift(h);a=r.apply(this,a);n.proceed=null;return a}};a.datePropsToTimestamps=function(h){a.objectEach(h,function(d,r){a.isObject(d)&&"function"===typeof d.getTime?h[r]=d.getTime():(a.isObject(d)||a.isArray(d))&&a.datePropsToTimestamps(d)})};a.formatSingle=function(h,d,r){var u=/\.([0-9])/,
v=a.defaultOptions.lang;/f$/.test(h)?(r=(r=h.match(u))?r[1]:-1,null!==d&&(d=a.numberFormat(d,r,v.decimalPoint,-1<h.indexOf(",")?v.thousandsSep:""))):d=(r||a.time).dateFormat(h,d);return d};a.format=function(h,d,r){for(var u="{",v=!1,w,n,g,c,m=[],p;h;){u=h.indexOf(u);if(-1===u)break;w=h.slice(0,u);if(v){w=w.split(":");n=w.shift().split(".");c=n.length;p=d;for(g=0;g<c;g++)p&&(p=p[n[g]]);w.length&&(p=a.formatSingle(w.join(":"),p,r));m.push(p)}else m.push(w);h=h.slice(u+1);u=(v=!v)?"}":"{"}m.push(h);
return m.join("")};a.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/Math.LN10))};a.normalizeTickInterval=function(h,d,r,u,v){var w,n=h;r=a.pick(r,1);w=h/r;d||(d=v?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===u&&(1===r?d=d.filter(function(a){return 0===a%1}):.1>=r&&(d=[1/r])));for(u=0;u<d.length&&!(n=d[u],v&&n*r>=h||!v&&w<=(d[u]+(d[u+1]||d[u]))/2);u++);return n=a.correctFloat(n*r,-Math.round(Math.log(.001)/Math.LN10))};a.stableSort=function(a,d){var h=a.length,u,v;for(v=0;v<
h;v++)a[v].safeI=v;a.sort(function(a,n){u=d(a,n);return 0===u?a.safeI-n.safeI:u});for(v=0;v<h;v++)delete a[v].safeI};a.arrayMin=function(a){for(var d=a.length,h=a[0];d--;)a[d]<h&&(h=a[d]);return h};a.arrayMax=function(a){for(var d=a.length,h=a[0];d--;)a[d]>h&&(h=a[d]);return h};a.destroyObjectProperties=function(h,d){a.objectEach(h,function(a,u){a&&a!==d&&a.destroy&&a.destroy();delete h[u]})};a.discardElement=function(h){var d=a.garbageBin;d||(d=a.createElement("div"));h&&d.appendChild(h);d.innerHTML=
""};a.correctFloat=function(a,d){return parseFloat(a.toPrecision(d||14))};a.setAnimation=function(h,d){d.renderer.globalAnimation=a.pick(h,d.options.chart.animation,!0)};a.animObject=function(h){return a.isObject(h)?a.merge(h):{duration:h?500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,year:314496E5};a.numberFormat=function(h,d,r,u){h=+h||0;d=+d;var v=a.defaultOptions.lang,w=(h.toString().split(".")[1]||"").split("e")[0].length,n,g,c=h.toString().split("e");
-1===d?d=Math.min(w,20):a.isNumber(d)?d&&c[1]&&0>c[1]&&(n=d+ +c[1],0<=n?(c[0]=(+c[0]).toExponential(n).split("e")[0],d=n):(c[0]=c[0].split(".")[0]||0,h=20>d?(c[0]*Math.pow(10,c[1])).toFixed(d):0,c[1]=0)):d=2;g=(Math.abs(c[1]?c[0]:h)+Math.pow(10,-Math.max(d,w)-1)).toFixed(d);w=String(a.pInt(g));n=3<w.length?w.length%3:0;r=a.pick(r,v.decimalPoint);u=a.pick(u,v.thousandsSep);h=(0>h?"-":"")+(n?w.substr(0,n)+u:"");h+=w.substr(n).replace(/(\d{3})(?=\d)/g,"$1"+u);d&&(h+=r+g.slice(-d));c[1]&&0!==+h&&(h+=
"e"+c[1]);return h};Math.easeInOutSine=function(a){return-.5*(Math.cos(Math.PI*a)-1)};a.getStyle=function(h,d,r){if("width"===d)return Math.max(0,Math.min(h.offsetWidth,h.scrollWidth,h.getBoundingClientRect?Math.floor(h.getBoundingClientRect().width):Infinity)-a.getStyle(h,"padding-left")-a.getStyle(h,"padding-right"));if("height"===d)return Math.max(0,Math.min(h.offsetHeight,h.scrollHeight)-a.getStyle(h,"padding-top")-a.getStyle(h,"padding-bottom"));E.getComputedStyle||a.error(27,!0);if(h=E.getComputedStyle(h,
void 0))h=h.getPropertyValue(d),a.pick(r,"opacity"!==d)&&(h=a.pInt(h));return h};a.inArray=function(a,d,r){return d.indexOf(a,r)};a.find=Array.prototype.find?function(a,d){return a.find(d)}:function(a,d){var h,u=a.length;for(h=0;h<u;h++)if(d(a[h],h))return a[h]};a.keys=Object.keys;a.offset=function(a){var d=G.documentElement;a=a.parentElement||a.parentNode?a.getBoundingClientRect():{top:0,left:0};return{top:a.top+(E.pageYOffset||d.scrollTop)-(d.clientTop||0),left:a.left+(E.pageXOffset||d.scrollLeft)-
(d.clientLeft||0)}};a.stop=function(h,d){for(var r=a.timers.length;r--;)a.timers[r].elem!==h||d&&d!==a.timers[r].prop||(a.timers[r].stopped=!0)};a.objectEach=function(a,d,r){for(var h in a)a.hasOwnProperty(h)&&d.call(r||a[h],a[h],h,a)};a.objectEach({map:"map",each:"forEach",grep:"filter",reduce:"reduce",some:"some"},function(h,d){a[d]=function(a){return Array.prototype[h].apply(a,[].slice.call(arguments,1))}});a.addEvent=function(h,d,r,u){var v,w=h.addEventListener||a.addEventListenerPolyfill;v="function"===
typeof h&&h.prototype?h.prototype.protoEvents=h.prototype.protoEvents||{}:h.hcEvents=h.hcEvents||{};a.Point&&h instanceof a.Point&&h.series&&h.series.chart&&(h.series.chart.runTrackerClick=!0);w&&w.call(h,d,r,!1);v[d]||(v[d]=[]);v[d].push(r);u&&a.isNumber(u.order)&&(r.order=u.order,v[d].sort(function(a,g){return a.order-g.order}));return function(){a.removeEvent(h,d,r)}};a.removeEvent=function(h,d,r){function u(g,c){var m=h.removeEventListener||a.removeEventListenerPolyfill;m&&m.call(h,g,c,!1)}function v(g){var c,
m;h.nodeName&&(d?(c={},c[d]=!0):c=g,a.objectEach(c,function(a,b){if(g[b])for(m=g[b].length;m--;)u(b,g[b][m])}))}var w,n;["protoEvents","hcEvents"].forEach(function(a){var c=h[a];c&&(d?(w=c[d]||[],r?(n=w.indexOf(r),-1<n&&(w.splice(n,1),c[d]=w),u(d,r)):(v(c),c[d]=[])):(v(c),h[a]={}))})};a.fireEvent=function(h,d,r,u){var v,w,n,g,c;r=r||{};G.createEvent&&(h.dispatchEvent||h.fireEvent)?(v=G.createEvent("Events"),v.initEvent(d,!0,!0),a.extend(v,r),h.dispatchEvent?h.dispatchEvent(v):h.fireEvent(d,v)):["protoEvents",
"hcEvents"].forEach(function(m){if(h[m])for(w=h[m][d]||[],n=w.length,r.target||a.extend(r,{preventDefault:function(){r.defaultPrevented=!0},target:h,type:d}),g=0;g<n;g++)(c=w[g])&&!1===c.call(h,r)&&r.preventDefault()});u&&!r.defaultPrevented&&u.call(h,r)};a.animate=function(h,d,r){var u,v="",w,n,g;a.isObject(r)||(g=arguments,r={duration:g[2],easing:g[3],complete:g[4]});a.isNumber(r.duration)||(r.duration=400);r.easing="function"===typeof r.easing?r.easing:Math[r.easing]||Math.easeInOutSine;r.curAnim=
a.merge(d);a.objectEach(d,function(c,g){a.stop(h,g);n=new a.Fx(h,r,g);w=null;"d"===g?(n.paths=n.initPath(h,h.d,d.d),n.toD=d.d,u=0,w=1):h.attr?u=h.attr(g):(u=parseFloat(a.getStyle(h,g))||0,"opacity"!==g&&(v="px"));w||(w=c);w&&w.match&&w.match("px")&&(w=w.replace(/px/g,""));n.run(u,w,v)})};a.seriesType=function(h,d,r,u,v){var w=a.getOptions(),n=a.seriesTypes;w.plotOptions[h]=a.merge(w.plotOptions[d],r);n[h]=a.extendClass(n[d]||function(){},u);n[h].prototype.type=h;v&&(n[h].prototype.pointClass=a.extendClass(a.Point,
v));return n[h]};a.uniqueKey=function(){var a=Math.random().toString(36).substring(2,9),d=0;return function(){return"highcharts-"+a+"-"+d++}}();a.isFunction=function(a){return"function"===typeof a};E.jQuery&&(E.jQuery.fn.highcharts=function(){var h=[].slice.call(arguments);if(this[0])return h[0]?(new (a[a.isString(h[0])?h.shift():"Chart"])(this[0],h[0],h[1]),this):y[a.attr(this[0],"data-highcharts-chart")]})})(J);(function(a){var y=a.isNumber,G=a.merge,E=a.pInt;a.Color=function(h){if(!(this instanceof
a.Color))return new a.Color(h);this.init(h)};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return[E(a[1]),E(a[2]),E(a[3]),parseFloat(a[4],10)]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,parse:function(a){return[E(a[1]),E(a[2]),E(a[3]),1]}}],names:{white:"#ffffff",black:"#000000"},init:function(h){var d,r,u,v;if((this.input=h=this.names[h&&h.toLowerCase?h.toLowerCase():
""]||h)&&h.stops)this.stops=h.stops.map(function(d){return new a.Color(d[1])});else if(h&&h.charAt&&"#"===h.charAt()&&(d=h.length,h=parseInt(h.substr(1),16),7===d?r=[(h&16711680)>>16,(h&65280)>>8,h&255,1]:4===d&&(r=[(h&3840)>>4|(h&3840)>>8,(h&240)>>4|h&240,(h&15)<<4|h&15,1])),!r)for(u=this.parsers.length;u--&&!r;)v=this.parsers[u],(d=v.regex.exec(h))&&(r=v.parse(d));this.rgba=r||[]},get:function(a){var d=this.input,h=this.rgba,u;this.stops?(u=G(d),u.stops=[].concat(u.stops),this.stops.forEach(function(d,
h){u.stops[h]=[u.stops[h][0],d.get(a)]})):u=h&&y(h[0])?"rgb"===a||!a&&1===h[3]?"rgb("+h[0]+","+h[1]+","+h[2]+")":"a"===a?h[3]:"rgba("+h.join(",")+")":d;return u},brighten:function(a){var d,h=this.rgba;if(this.stops)this.stops.forEach(function(d){d.brighten(a)});else if(y(a)&&0!==a)for(d=0;3>d;d++)h[d]+=E(255*a),0>h[d]&&(h[d]=0),255<h[d]&&(h[d]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this},tweenTo:function(a,d){var h=this.rgba,u=a.rgba;u.length&&h&&h.length?(a=1!==u[3]||1!==
h[3],d=(a?"rgba(":"rgb(")+Math.round(u[0]+(h[0]-u[0])*(1-d))+","+Math.round(u[1]+(h[1]-u[1])*(1-d))+","+Math.round(u[2]+(h[2]-u[2])*(1-d))+(a?","+(u[3]+(h[3]-u[3])*(1-d)):"")+")"):d=a.input||"none";return d}};a.color=function(h){return new a.Color(h)}})(J);(function(a){var y,G,E=a.addEvent,h=a.animate,d=a.attr,r=a.charts,u=a.color,v=a.css,w=a.createElement,n=a.defined,g=a.deg2rad,c=a.destroyObjectProperties,m=a.doc,p=a.extend,b=a.erase,l=a.hasTouch,f=a.isArray,x=a.isFirefox,t=a.isMS,H=a.isObject,
F=a.isString,z=a.isWebKit,k=a.merge,A=a.noop,D=a.objectEach,C=a.pick,e=a.pInt,q=a.removeEvent,L=a.splat,I=a.stop,R=a.svg,K=a.SVG_NS,M=a.symbolSizes,S=a.win;y=a.SVGElement=function(){return this};p(y.prototype,{opacity:1,SVG_NS:K,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "),init:function(a,e){this.element="span"===e?w(e):m.createElementNS(this.SVG_NS,e);this.renderer=a},animate:function(e,q,
b){q=a.animObject(C(q,this.renderer.globalAnimation,!0));0!==q.duration?(b&&(q.complete=b),h(this,e,q)):(this.attr(e,null,b),q.step&&q.step.call(this));return this},complexColor:function(e,q,b){var B=this.renderer,l,c,p,g,A,K,m,N,x,d,t,I=[],L;a.fireEvent(this.renderer,"complexColor",{args:arguments},function(){e.radialGradient?c="radialGradient":e.linearGradient&&(c="linearGradient");c&&(p=e[c],A=B.gradients,m=e.stops,d=b.radialReference,f(p)&&(e[c]=p={x1:p[0],y1:p[1],x2:p[2],y2:p[3],gradientUnits:"userSpaceOnUse"}),
"radialGradient"===c&&d&&!n(p.gradientUnits)&&(g=p,p=k(p,B.getRadialAttr(d,g),{gradientUnits:"userSpaceOnUse"})),D(p,function(a,e){"id"!==e&&I.push(e,a)}),D(m,function(a){I.push(a)}),I=I.join(","),A[I]?t=A[I].attr("id"):(p.id=t=a.uniqueKey(),A[I]=K=B.createElement(c).attr(p).add(B.defs),K.radAttr=g,K.stops=[],m.forEach(function(e){0===e[1].indexOf("rgba")?(l=a.color(e[1]),N=l.get("rgb"),x=l.get("a")):(N=e[1],x=1);e=B.createElement("stop").attr({offset:e[0],"stop-color":N,"stop-opacity":x}).add(K);
K.stops.push(e)})),L="url("+B.url+"#"+t+")",b.setAttribute(q,L),b.gradient=I,e.toString=function(){return L})})},applyTextOutline:function(e){var B=this.element,q,f,k,l,c;-1!==e.indexOf("contrast")&&(e=e.replace(/contrast/g,this.renderer.getContrast(B.style.fill)));e=e.split(" ");f=e[e.length-1];if((k=e[0])&&"none"!==k&&a.svg){this.fakeTS=!0;e=[].slice.call(B.getElementsByTagName("tspan"));this.ySetter=this.xSetter;k=k.replace(/(^[\d\.]+)(.*?)$/g,function(a,e,B){return 2*e+B});for(c=e.length;c--;)q=
e[c],"highcharts-text-outline"===q.getAttribute("class")&&b(e,B.removeChild(q));l=B.firstChild;e.forEach(function(a,e){0===e&&(a.setAttribute("x",B.getAttribute("x")),e=B.getAttribute("y"),a.setAttribute("y",e||0),null===e&&B.setAttribute("y",0));a=a.cloneNode(1);d(a,{"class":"highcharts-text-outline",fill:f,stroke:f,"stroke-width":k,"stroke-linejoin":"round"});B.insertBefore(a,l)})}},symbolCustomAttribs:"x y width height r start end innerR anchorX anchorY rounded".split(" "),attr:function(e,q,b,
f){var B,k=this.element,l,c=this,p,g,A=this.symbolCustomAttribs;"string"===typeof e&&void 0!==q&&(B=e,e={},e[B]=q);"string"===typeof e?c=(this[e+"Getter"]||this._defaultGetter).call(this,e,k):(D(e,function(B,q){p=!1;f||I(this,q);this.symbolName&&-1!==a.inArray(q,A)&&(l||(this.symbolAttr(e),l=!0),p=!0);!this.rotation||"x"!==q&&"y"!==q||(this.doTransform=!0);p||(g=this[q+"Setter"]||this._defaultSetter,g.call(this,B,q,k),!this.styledMode&&this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(q)&&
this.updateShadows(q,B,g))},this),this.afterSetters());b&&b.call(this);return c},afterSetters:function(){this.doTransform&&(this.updateTransform(),this.doTransform=!1)},updateShadows:function(a,e,q){for(var B=this.shadows,b=B.length;b--;)q.call(B[b],"height"===a?Math.max(e-(B[b].cutHeight||0),0):"d"===a?this.d:e,a,B[b])},addClass:function(a,e){var B=this.attr("class")||"";-1===B.indexOf(a)&&(e||(a=(B+(B?" ":"")+a).replace("  "," ")),this.attr("class",a));return this},hasClass:function(a){return-1!==
(this.attr("class")||"").split(" ").indexOf(a)},removeClass:function(a){return this.attr("class",(this.attr("class")||"").replace(a,""))},symbolAttr:function(a){var e=this;"x y r start end width height innerR anchorX anchorY".split(" ").forEach(function(B){e[B]=C(a[B],e[B])});e.attr({d:e.renderer.symbols[e.symbolName](e.x,e.y,e.width,e.height,e)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,e){var B;e=e||a.strokeWidth||0;B=Math.round(e)%
2/2;a.x=Math.floor(a.x||this.x||0)+B;a.y=Math.floor(a.y||this.y||0)+B;a.width=Math.floor((a.width||this.width||0)-2*B);a.height=Math.floor((a.height||this.height||0)-2*B);n(a.strokeWidth)&&(a.strokeWidth=e);return a},css:function(a){var B=this.styles,q={},b=this.element,k,f="",l,c=!B,g=["textOutline","textOverflow","width"];a&&a.color&&(a.fill=a.color);B&&D(a,function(a,e){a!==B[e]&&(q[e]=a,c=!0)});c&&(B&&(a=p(B,q)),a&&(null===a.width||"auto"===a.width?delete this.textWidth:"text"===b.nodeName.toLowerCase()&&
a.width&&(k=this.textWidth=e(a.width))),this.styles=a,k&&!R&&this.renderer.forExport&&delete a.width,b.namespaceURI===this.SVG_NS?(l=function(a,e){return"-"+e.toLowerCase()},D(a,function(a,e){-1===g.indexOf(e)&&(f+=e.replace(/([A-Z])/g,l)+":"+a+";")}),f&&d(b,"style",f)):v(b,a),this.added&&("text"===this.element.nodeName&&this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline)));return this},getStyle:function(a){return S.getComputedStyle(this.element||this,"").getPropertyValue(a)},
strokeWidth:function(){if(!this.renderer.styledMode)return this["stroke-width"]||0;var a=this.getStyle("stroke-width"),q;a.indexOf("px")===a.length-2?a=e(a):(q=m.createElementNS(K,"rect"),d(q,{width:a,"stroke-width":0}),this.element.parentNode.appendChild(q),a=q.getBBox().width,q.parentNode.removeChild(q));return a},on:function(a,e){var q=this,B=q.element;l&&"click"===a?(B.ontouchstart=function(a){q.touchEventFired=Date.now();a.preventDefault();e.call(B,a)},B.onclick=function(a){(-1===S.navigator.userAgent.indexOf("Android")||
1100<Date.now()-(q.touchEventFired||0))&&e.call(B,a)}):B["on"+a]=e;return this},setRadialReference:function(a){var e=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;e&&e.radAttr&&e.animate(this.renderer.getRadialAttr(a,e.radAttr));return this},translate:function(a,e){return this.attr({translateX:a,translateY:e})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,e=this.translateY||0,q=this.scaleX,
b=this.scaleY,f=this.inverted,k=this.rotation,l=this.matrix,c=this.element;f&&(a+=this.width,e+=this.height);a=["translate("+a+","+e+")"];n(l)&&a.push("matrix("+l.join(",")+")");f?a.push("rotate(90) scale(-1,1)"):k&&a.push("rotate("+k+" "+C(this.rotationOriginX,c.getAttribute("x"),0)+" "+C(this.rotationOriginY,c.getAttribute("y")||0)+")");(n(q)||n(b))&&a.push("scale("+C(q,1)+" "+C(b,1)+")");a.length&&c.setAttribute("transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);
return this},align:function(a,e,q){var B,f,k,l,c={};f=this.renderer;k=f.alignedObjects;var p,g;if(a){if(this.alignOptions=a,this.alignByTranslate=e,!q||F(q))this.alignTo=B=q||"renderer",b(k,this),k.push(this),q=null}else a=this.alignOptions,e=this.alignByTranslate,B=this.alignTo;q=C(q,f[B],f);B=a.align;f=a.verticalAlign;k=(q.x||0)+(a.x||0);l=(q.y||0)+(a.y||0);"right"===B?p=1:"center"===B&&(p=2);p&&(k+=(q.width-(a.width||0))/p);c[e?"translateX":"x"]=Math.round(k);"bottom"===f?g=1:"middle"===f&&(g=
2);g&&(l+=(q.height-(a.height||0))/g);c[e?"translateY":"y"]=Math.round(l);this[this.placed?"animate":"attr"](c);this.placed=!0;this.alignAttr=c;return this},getBBox:function(a,e){var q,B=this.renderer,b,f=this.element,k=this.styles,l,c=this.textStr,A,K=B.cache,m=B.cacheKeys,x=f.namespaceURI===this.SVG_NS,d;e=C(e,this.rotation);b=e*g;l=B.styledMode?f&&y.prototype.getStyle.call(f,"font-size"):k&&k.fontSize;n(c)&&(d=c.toString(),-1===d.indexOf("\x3c")&&(d=d.replace(/[0-9]/g,"0")),d+=["",e||0,l,this.textWidth,
k&&k.textOverflow].join());d&&!a&&(q=K[d]);if(!q){if(x||B.forExport){try{(A=this.fakeTS&&function(a){[].forEach.call(f.querySelectorAll(".highcharts-text-outline"),function(e){e.style.display=a})})&&A("none"),q=f.getBBox?p({},f.getBBox()):{width:f.offsetWidth,height:f.offsetHeight},A&&A("")}catch(W){}if(!q||0>q.width)q={width:0,height:0}}else q=this.htmlGetBBox();B.isSVG&&(a=q.width,B=q.height,x&&(q.height=B={"11px,17":14,"13px,20":16}[k&&k.fontSize+","+Math.round(B)]||B),e&&(q.width=Math.abs(B*Math.sin(b))+
Math.abs(a*Math.cos(b)),q.height=Math.abs(B*Math.cos(b))+Math.abs(a*Math.sin(b))));if(d&&0<q.height){for(;250<m.length;)delete K[m.shift()];K[d]||m.push(d);K[d]=q}}return q},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var e=this;e.animate({opacity:0},{duration:a||150,complete:function(){e.attr({y:-9999})}})},add:function(a){var e=this.renderer,q=this.element,B;a&&(this.parentGroup=a);this.parentInverted=
a&&a.inverted;void 0!==this.textStr&&e.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)B=this.zIndexSetter();B||(a?a.element:e.box).appendChild(q);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var e=a.parentNode;e&&e.removeChild(a)},destroy:function(){var a=this,e=a.element||{},q=a.renderer,f=q.isSVG&&"SPAN"===e.nodeName&&a.parentGroup,k=e.ownerSVGElement,l=a.clipPath;e.onclick=e.onmouseout=e.onmouseover=e.onmousemove=e.point=null;I(a);l&&k&&([].forEach.call(k.querySelectorAll("[clip-path],[CLIP-PATH]"),
function(a){var e=a.getAttribute("clip-path"),q=l.element.id;(-1<e.indexOf("(#"+q+")")||-1<e.indexOf('("#'+q+'")'))&&a.removeAttribute("clip-path")}),a.clipPath=l.destroy());if(a.stops){for(k=0;k<a.stops.length;k++)a.stops[k]=a.stops[k].destroy();a.stops=null}a.safeRemoveChild(e);for(q.styledMode||a.destroyShadows();f&&f.div&&0===f.div.childNodes.length;)e=f.parentGroup,a.safeRemoveChild(f.div),delete f.div,f=e;a.alignTo&&b(q.alignedObjects,a);D(a,function(e,q){delete a[q]});return null},shadow:function(a,
e,q){var b=[],f,B,k=this.element,l,c,p,g;if(!a)this.destroyShadows();else if(!this.shadows){c=C(a.width,3);p=(a.opacity||.15)/c;g=this.parentInverted?"(-1,-1)":"("+C(a.offsetX,1)+", "+C(a.offsetY,1)+")";for(f=1;f<=c;f++)B=k.cloneNode(0),l=2*c+1-2*f,d(B,{stroke:a.color||"#000000","stroke-opacity":p*f,"stroke-width":l,transform:"translate"+g,fill:"none"}),B.setAttribute("class",(B.getAttribute("class")||"")+" highcharts-shadow"),q&&(d(B,"height",Math.max(d(B,"height")-l,0)),B.cutHeight=l),e?e.element.appendChild(B):
k.parentNode&&k.parentNode.insertBefore(B,k),b.push(B);this.shadows=b}return this},destroyShadows:function(){(this.shadows||[]).forEach(function(a){this.safeRemoveChild(a)},this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=C(this[a+"Value"],this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,e,q){a&&
a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a="M 0 0");this[e]!==a&&(q.setAttribute(e,a),this[e]=a)},dashstyleSetter:function(a){var q,f=this["stroke-width"];"inherit"===f&&(f=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(q=a.length;q--;)a[q]=e(a[q])*f;a=a.join(",").replace(/NaN/g,
"none");this.element.setAttribute("stroke-dasharray",a)}},alignSetter:function(a){this.alignValue=a;this.element.setAttribute("text-anchor",{left:"start",center:"middle",right:"end"}[a])},opacitySetter:function(a,e,q){this[e]=a;q.setAttribute(e,a)},titleSetter:function(a){var e=this.element.getElementsByTagName("title")[0];e||(e=m.createElementNS(this.SVG_NS,"title"),this.element.appendChild(e));e.firstChild&&e.removeChild(e.firstChild);e.appendChild(m.createTextNode(String(C(a),"").replace(/<[^>]*>/g,
"").replace(/&lt;/g,"\x3c").replace(/&gt;/g,"\x3e")))},textSetter:function(a){a!==this.textStr&&(delete this.bBox,this.textStr=a,this.added&&this.renderer.buildText(this))},fillSetter:function(a,e,q){"string"===typeof a?q.setAttribute(e,a):a&&this.complexColor(a,e,q)},visibilitySetter:function(a,e,q){"inherit"===a?q.removeAttribute(e):this[e]!==a&&q.setAttribute(e,a);this[e]=a},zIndexSetter:function(a,q){var f=this.renderer,b=this.parentGroup,k=(b||f).element||f.box,l,c=this.element,B,p,f=k===f.box;
l=this.added;var g;n(a)?(c.setAttribute("data-z-index",a),a=+a,this[q]===a&&(l=!1)):n(this[q])&&c.removeAttribute("data-z-index");this[q]=a;if(l){(a=this.zIndex)&&b&&(b.handleZ=!0);q=k.childNodes;for(g=q.length-1;0<=g&&!B;g--)if(b=q[g],l=b.getAttribute("data-z-index"),p=!n(l),b!==c)if(0>a&&p&&!f&&!g)k.insertBefore(c,q[g]),B=!0;else if(e(l)<=a||p&&(!n(a)||0<=a))k.insertBefore(c,q[g+1]||null),B=!0;B||(k.insertBefore(c,q[f?3:0]||null),B=!0)}return B},_defaultSetter:function(a,e,q){q.setAttribute(e,a)}});
y.prototype.yGetter=y.prototype.xGetter;y.prototype.translateXSetter=y.prototype.translateYSetter=y.prototype.rotationSetter=y.prototype.verticalAlignSetter=y.prototype.rotationOriginXSetter=y.prototype.rotationOriginYSetter=y.prototype.scaleXSetter=y.prototype.scaleYSetter=y.prototype.matrixSetter=function(a,e){this[e]=a;this.doTransform=!0};y.prototype["stroke-widthSetter"]=y.prototype.strokeSetter=function(a,e,q){this[e]=a;this.stroke&&this["stroke-width"]?(y.prototype.fillSetter.call(this,this.stroke,
"stroke",q),q.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===e&&0===a&&this.hasStroke&&(q.removeAttribute("stroke"),this.hasStroke=!1)};G=a.SVGRenderer=function(){this.init.apply(this,arguments)};p(G.prototype,{Element:y,SVG_NS:K,init:function(a,e,q,f,b,k,l){var c;c=this.createElement("svg").attr({version:"1.1","class":"highcharts-root"});l||c.css(this.getStyle(f));f=c.element;a.appendChild(f);d(a,"dir","ltr");-1===a.innerHTML.indexOf("xmlns")&&d(f,"xmlns",this.SVG_NS);
this.isSVG=!0;this.box=f;this.boxWrapper=c;this.alignedObjects=[];this.url=(x||z)&&m.getElementsByTagName("base").length?S.location.href.split("#")[0].replace(/<[^>]*>/g,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(m.createTextNode("Created with Highcharts 7.0.0"));this.defs=this.createElement("defs").add();this.allowHTML=k;this.forExport=b;this.styledMode=l;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(e,
q,!1);var B;x&&a.getBoundingClientRect&&(e=function(){v(a,{left:0,top:0});B=a.getBoundingClientRect();v(a,{left:Math.ceil(B.left)-B.left+"px",top:Math.ceil(B.top)-B.top+"px"})},e(),this.unSubPixelFix=E(S,"resize",e))},definition:function(a){function e(a,f){var b;L(a).forEach(function(a){var k=q.createElement(a.tagName),l={};D(a,function(a,e){"tagName"!==e&&"children"!==e&&"textContent"!==e&&(l[e]=a)});k.attr(l);k.add(f||q.defs);a.textContent&&k.element.appendChild(m.createTextNode(a.textContent));
e(a.children||[],k);b=k});return b}var q=this;return e(a)},getStyle:function(a){return this.style=p({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',fontSize:"12px"},a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();c(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());this.unSubPixelFix&&
this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var e=new this.Element;e.init(this,a);return e},draw:A,getRadialAttr:function(a,e){return{cx:a[0]-a[2]/2+e.cx*a[2],cy:a[1]-a[2]/2+e.cy*a[2],r:e.r*a[2]}},truncate:function(a,e,q,f,b,k,l){var c=this,p=a.rotation,B,g=f?1:0,A=(q||f).length,K=A,d=[],x=function(a){e.firstChild&&e.removeChild(e.firstChild);a&&e.appendChild(m.createTextNode(a))},n=function(k,p){p=p||k;if(void 0===d[p])if(e.getSubStringLength)try{d[p]=b+e.getSubStringLength(0,
f?p+1:p)}catch(X){}else c.getSpanWidth&&(x(l(q||f,k)),d[p]=b+c.getSpanWidth(a,e));return d[p]},t,I;a.rotation=0;t=n(e.textContent.length);if(I=b+t>k){for(;g<=A;)K=Math.ceil((g+A)/2),f&&(B=l(f,K)),t=n(K,B&&B.length-1),g===A?g=A+1:t>k?A=K-1:g=K;0===A?x(""):q&&A===q.length-1||x(B||l(q||f,K))}f&&f.splice(0,K);a.actualWidth=t;a.rotation=p;return I},escapes:{"\x26":"\x26amp;","\x3c":"\x26lt;","\x3e":"\x26gt;","'":"\x26#39;",'"':"\x26quot;"},buildText:function(a){var q=a.element,f=this,k=f.forExport,b=C(a.textStr,
"").toString(),l=-1!==b.indexOf("\x3c"),c=q.childNodes,p,g=d(q,"x"),B=a.styles,A=a.textWidth,x=B&&B.lineHeight,n=B&&B.textOutline,t=B&&"ellipsis"===B.textOverflow,I=B&&"nowrap"===B.whiteSpace,L=B&&B.fontSize,z,H,h=c.length,B=A&&!a.added&&this.box,F=function(a){var b;f.styledMode||(b=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:L||f.style.fontSize||12);return x?e(x):f.fontMetrics(b,a.getAttribute("style")?a:q).h},M=function(a,e){D(f.escapes,function(q,f){e&&-1!==e.indexOf(q)||(a=a.toString().replace(new RegExp(q,
"g"),f))});return a},w=function(a,e){var q;q=a.indexOf("\x3c");a=a.substring(q,a.indexOf("\x3e")-q);q=a.indexOf(e+"\x3d");if(-1!==q&&(q=q+e.length+1,e=a.charAt(q),'"'===e||"'"===e))return a=a.substring(q+1),a.substring(0,a.indexOf(e))};z=[b,t,I,x,n,L,A].join();if(z!==a.textCache){for(a.textCache=z;h--;)q.removeChild(c[h]);l||n||t||A||-1!==b.indexOf(" ")?(B&&B.appendChild(q),l?(b=f.styledMode?b.replace(/<(b|strong)>/g,'\x3cspan class\x3d"highcharts-strong"\x3e').replace(/<(i|em)>/g,'\x3cspan class\x3d"highcharts-emphasized"\x3e'):
b.replace(/<(b|strong)>/g,'\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,'\x3cspan style\x3d"font-style:italic"\x3e'),b=b.replace(/<a/g,"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,"\x3c/span\x3e").split(/<br.*?>/g)):b=[b],b=b.filter(function(a){return""!==a}),b.forEach(function(e,b){var l,c=0,B=0;e=e.replace(/^\s+|\s+$/g,"").replace(/<span/g,"|||\x3cspan").replace(/<\/span>/g,"\x3c/span\x3e|||");l=e.split("|||");l.forEach(function(e){if(""!==e||1===l.length){var x={},n=m.createElementNS(f.SVG_NS,
"tspan"),D,C;(D=w(e,"class"))&&d(n,"class",D);if(D=w(e,"style"))D=D.replace(/(;| |^)color([ :])/,"$1fill$2"),d(n,"style",D);(C=w(e,"href"))&&!k&&(d(n,"onclick",'location.href\x3d"'+C+'"'),d(n,"class","highcharts-anchor"),f.styledMode||v(n,{cursor:"pointer"}));e=M(e.replace(/<[a-zA-Z\/](.|\n)*?>/g,"")||" ");if(" "!==e){n.appendChild(m.createTextNode(e));c?x.dx=0:b&&null!==g&&(x.x=g);d(n,x);q.appendChild(n);!c&&H&&(!R&&k&&v(n,{display:"block"}),d(n,"dy",F(n)));if(A){var z=e.replace(/([^\^])-/g,"$1- ").split(" "),
x=!I&&(1<l.length||b||1<z.length);C=0;var h=F(n);if(t)p=f.truncate(a,n,e,void 0,0,Math.max(0,A-parseInt(L||12,10)),function(a,e){return a.substring(0,e)+"\u2026"});else if(x)for(;z.length;)z.length&&!I&&0<C&&(n=m.createElementNS(K,"tspan"),d(n,{dy:h,x:g}),D&&d(n,"style",D),n.appendChild(m.createTextNode(z.join(" ").replace(/- /g,"-"))),q.appendChild(n)),f.truncate(a,n,null,z,0===C?B:0,A,function(a,e){return z.slice(0,e).join(" ").replace(/- /g,"-")}),B=a.actualWidth,C++}c++}}});H=H||q.childNodes.length}),
t&&p&&a.attr("title",M(a.textStr,["\x26lt;","\x26gt;"])),B&&B.removeChild(q),n&&a.applyTextOutline&&a.applyTextOutline(n)):q.appendChild(m.createTextNode(M(b)))}},getContrast:function(a){a=u(a).rgba;a[0]*=1;a[1]*=1.2;a[2]*=.5;return 459<a[0]+a[1]+a[2]?"#000000":"#FFFFFF"},button:function(a,e,q,f,b,l,c,g,A){var B=this.label(a,e,q,A,null,null,null,null,"button"),K=0,n=this.styledMode;B.attr(k({padding:8,r:2},b));if(!n){var m,x,d,I;b=k({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,style:{color:"#333333",
cursor:"pointer",fontWeight:"normal"}},b);m=b.style;delete b.style;l=k(b,{fill:"#e6e6e6"},l);x=l.style;delete l.style;c=k(b,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},c);d=c.style;delete c.style;g=k(b,{style:{color:"#cccccc"}},g);I=g.style;delete g.style}E(B.element,t?"mouseover":"mouseenter",function(){3!==K&&B.setState(1)});E(B.element,t?"mouseout":"mouseleave",function(){3!==K&&B.setState(K)});B.setState=function(a){1!==a&&(B.state=K=a);B.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+
["normal","hover","pressed","disabled"][a||0]);n||B.attr([b,l,c,g][a||0]).css([m,x,d,I][a||0])};n||B.attr(b).css(p({cursor:"default"},m));return B.on("click",function(a){3!==K&&f.call(B,a)})},crispLine:function(a,e){a[1]===a[4]&&(a[1]=a[4]=Math.round(a[1])-e%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+e%2/2);return a},path:function(a){var e=this.styledMode?{}:{fill:"none"};f(a)?e.d=a:H(a)&&p(e,a);return this.createElement("path").attr(e)},circle:function(a,e,q){a=H(a)?a:void 0===a?{}:{x:a,y:e,r:q};
e=this.createElement("circle");e.xSetter=e.ySetter=function(a,e,q){q.setAttribute("c"+e,a)};return e.attr(a)},arc:function(a,e,q,b,f,k){H(a)?(b=a,e=b.y,q=b.r,a=b.x):b={innerR:b,start:f,end:k};a=this.symbol("arc",a,e,q,q,b);a.r=q;return a},rect:function(a,e,q,b,f,k){f=H(a)?a.r:f;var l=this.createElement("rect");a=H(a)?a:void 0===a?{}:{x:a,y:e,width:Math.max(q,0),height:Math.max(b,0)};this.styledMode||(void 0!==k&&(a.strokeWidth=k,a=l.crisp(a)),a.fill="none");f&&(a.r=f);l.rSetter=function(a,e,q){d(q,
{rx:a,ry:a})};return l.attr(a)},setSize:function(a,e,q){var b=this.alignedObjects,f=b.length;this.width=a;this.height=e;for(this.boxWrapper.animate({width:a,height:e},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")})},duration:C(q,!0)?void 0:0});f--;)b[f].align()},g:function(a){var e=this.createElement("g");return a?e.attr({"class":"highcharts-"+a}):e},image:function(a,e,q,b,f,k){var l={preserveAspectRatio:"none"},c,g=function(a,e){a.setAttributeNS?a.setAttributeNS("http://www.w3.org/1999/xlink",
"href",e):a.setAttribute("hc-svg-href",e)},A=function(e){g(c.element,a);k.call(c,e)};1<arguments.length&&p(l,{x:e,y:q,width:b,height:f});c=this.createElement("image").attr(l);k?(g(c.element,"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d"),l=new S.Image,E(l,"load",A),l.src=a,l.complete&&A({})):g(c.element,a);return c},symbol:function(a,e,q,b,f,k){var l=this,c,g=/^url\((.*?)\)$/,A=g.test(a),K=!A&&(this.symbols[a]?a:"circle"),B=K&&this.symbols[K],x=n(e)&&B&&B.call(this.symbols,
Math.round(e),Math.round(q),b,f,k),d,t;B?(c=this.path(x),l.styledMode||c.attr("fill","none"),p(c,{symbolName:K,x:e,y:q,width:b,height:f}),k&&p(c,k)):A&&(d=a.match(g)[1],c=this.image(d),c.imgwidth=C(M[d]&&M[d].width,k&&k.width),c.imgheight=C(M[d]&&M[d].height,k&&k.height),t=function(){c.attr({width:c.width,height:c.height})},["width","height"].forEach(function(a){c[a+"Setter"]=function(a,e){var q={},b=this["img"+e],f="width"===e?"translateX":"translateY";this[e]=a;n(b)&&(this.element&&this.element.setAttribute(e,
b),this.alignByTranslate||(q[f]=((this[e]||0)-b)/2,this.attr(q)))}}),n(e)&&c.attr({x:e,y:q}),c.isImg=!0,n(c.imgwidth)&&n(c.imgheight)?t():(c.attr({width:0,height:0}),w("img",{onload:function(){var a=r[l.chartIndex];0===this.width&&(v(this,{position:"absolute",top:"-999em"}),m.body.appendChild(this));M[d]={width:this.width,height:this.height};c.imgwidth=this.width;c.imgheight=this.height;c.element&&t();this.parentNode&&this.parentNode.removeChild(this);l.imgCount--;if(!l.imgCount&&a&&a.onload)a.onload()},
src:d}),this.imgCount++));return c},symbols:{circle:function(a,e,q,b){return this.arc(a+q/2,e+b/2,q/2,b/2,{start:0,end:2*Math.PI,open:!1})},square:function(a,e,q,b){return["M",a,e,"L",a+q,e,a+q,e+b,a,e+b,"Z"]},triangle:function(a,e,q,b){return["M",a+q/2,e,"L",a+q,e+b,a,e+b,"Z"]},"triangle-down":function(a,e,q,b){return["M",a,e,"L",a+q,e,a+q/2,e+b,"Z"]},diamond:function(a,e,q,b){return["M",a+q/2,e,"L",a+q,e+b/2,a+q/2,e+b,a,e+b/2,"Z"]},arc:function(a,e,q,b,f){var k=f.start,c=f.r||q,l=f.r||b||q,p=f.end-
.001;q=f.innerR;b=C(f.open,.001>Math.abs(f.end-f.start-2*Math.PI));var g=Math.cos(k),A=Math.sin(k),K=Math.cos(p),p=Math.sin(p);f=.001>f.end-k-Math.PI?0:1;c=["M",a+c*g,e+l*A,"A",c,l,0,f,1,a+c*K,e+l*p];n(q)&&c.push(b?"M":"L",a+q*K,e+q*p,"A",q,q,0,f,0,a+q*g,e+q*A);c.push(b?"":"Z");return c},callout:function(a,e,q,b,f){var k=Math.min(f&&f.r||0,q,b),c=k+6,l=f&&f.anchorX;f=f&&f.anchorY;var p;p=["M",a+k,e,"L",a+q-k,e,"C",a+q,e,a+q,e,a+q,e+k,"L",a+q,e+b-k,"C",a+q,e+b,a+q,e+b,a+q-k,e+b,"L",a+k,e+b,"C",a,e+
b,a,e+b,a,e+b-k,"L",a,e+k,"C",a,e,a,e,a+k,e];l&&l>q?f>e+c&&f<e+b-c?p.splice(13,3,"L",a+q,f-6,a+q+6,f,a+q,f+6,a+q,e+b-k):p.splice(13,3,"L",a+q,b/2,l,f,a+q,b/2,a+q,e+b-k):l&&0>l?f>e+c&&f<e+b-c?p.splice(33,3,"L",a,f+6,a-6,f,a,f-6,a,e+k):p.splice(33,3,"L",a,b/2,l,f,a,b/2,a,e+k):f&&f>b&&l>a+c&&l<a+q-c?p.splice(23,3,"L",l+6,e+b,l,e+b+6,l-6,e+b,a+k,e+b):f&&0>f&&l>a+c&&l<a+q-c&&p.splice(3,3,"L",l-6,e,l,e-6,l+6,e,q-k,e);return p}},clipRect:function(e,q,b,f){var k=a.uniqueKey(),l=this.createElement("clipPath").attr({id:k}).add(this.defs);
e=this.rect(e,q,b,f,0).add(l);e.id=k;e.clipPath=l;e.count=0;return e},text:function(a,e,q,b){var f={};if(b&&(this.allowHTML||!this.forExport))return this.html(a,e,q);f.x=Math.round(e||0);q&&(f.y=Math.round(q));n(a)&&(f.text=a);a=this.createElement("text").attr(f);b||(a.xSetter=function(a,e,q){var b=q.getElementsByTagName("tspan"),f,k=q.getAttribute(e),l;for(l=0;l<b.length;l++)f=b[l],f.getAttribute(e)===k&&f.setAttribute(e,a);q.setAttribute(e,a)});return a},fontMetrics:function(a,q){a=this.styledMode?
q&&y.prototype.getStyle.call(q,"font-size"):a||q&&q.style&&q.style.fontSize||this.style&&this.style.fontSize;a=/px/.test(a)?e(a):/em/.test(a)?parseFloat(a)*(q?this.fontMetrics(null,q.parentNode).f:16):12;q=24>a?a+3:Math.round(1.2*a);return{h:q,b:Math.round(.8*q),f:a}},rotCorr:function(a,e,q){var b=a;e&&q&&(b=Math.max(b*Math.cos(e*g),4));return{x:-a/3*Math.sin(e*g),y:b}},label:function(e,b,f,l,c,g,A,K,d){var m=this,x=m.styledMode,t=m.g("button"!==d&&"label"),I=t.text=m.text("",0,0,A).attr({zIndex:1}),
D,L,B=0,C=3,z=0,H,h,F,M,R,w={},r,u,S=/^url\((.*?)\)$/.test(l),v=x||S,N=function(){return x?D.strokeWidth()%2/2:(r?parseInt(r,10):0)%2/2},P,T,E;d&&t.addClass("highcharts-"+d);P=function(){var a=I.element.style,e={};L=(void 0===H||void 0===h||R)&&n(I.textStr)&&I.getBBox();t.width=(H||L.width||0)+2*C+z;t.height=(h||L.height||0)+2*C;u=C+Math.min(m.fontMetrics(a&&a.fontSize,I).b,L?L.height:Infinity);v&&(D||(t.box=D=m.symbols[l]||S?m.symbol(l):m.rect(),D.addClass(("button"===d?"":"highcharts-label-box")+
(d?" highcharts-"+d+"-box":"")),D.add(t),a=N(),e.x=a,e.y=(K?-u:0)+a),e.width=Math.round(t.width),e.height=Math.round(t.height),D.attr(p(e,w)),w={})};T=function(){var a=z+C,e;e=K?0:u;n(H)&&L&&("center"===R||"right"===R)&&(a+={center:.5,right:1}[R]*(H-L.width));if(a!==I.x||e!==I.y)I.attr("x",a),I.hasBoxWidthChanged&&(L=I.getBBox(!0),P()),void 0!==e&&I.attr("y",e);I.x=a;I.y=e};E=function(a,e){D?D.attr(a,e):w[a]=e};t.onAdd=function(){I.add(t);t.attr({text:e||0===e?e:"",x:b,y:f});D&&n(c)&&t.attr({anchorX:c,
anchorY:g})};t.widthSetter=function(e){H=a.isNumber(e)?e:null};t.heightSetter=function(a){h=a};t["text-alignSetter"]=function(a){R=a};t.paddingSetter=function(a){n(a)&&a!==C&&(C=t.padding=a,T())};t.paddingLeftSetter=function(a){n(a)&&a!==z&&(z=a,T())};t.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==B&&(B=a,L&&t.attr({x:F}))};t.textSetter=function(a){void 0!==a&&I.textSetter(a);P();T()};t["stroke-widthSetter"]=function(a,e){a&&(v=!0);r=this["stroke-width"]=a;E(e,a)};x?t.rSetter=function(a,
e){E(e,a)}:t.strokeSetter=t.fillSetter=t.rSetter=function(a,e){"r"!==e&&("fill"===e&&a&&(v=!0),t[e]=a);E(e,a)};t.anchorXSetter=function(a,e){c=t.anchorX=a;E(e,Math.round(a)-N()-F)};t.anchorYSetter=function(a,e){g=t.anchorY=a;E(e,a-M)};t.xSetter=function(a){t.x=a;B&&(a-=B*((H||L.width)+2*C),t["forceAnimate:x"]=!0);F=Math.round(a);t.attr("translateX",F)};t.ySetter=function(a){M=t.y=Math.round(a);t.attr("translateY",M)};var Q=t.css;A={css:function(a){if(a){var e={};a=k(a);t.textProps.forEach(function(q){void 0!==
a[q]&&(e[q]=a[q],delete a[q])});I.css(e);"width"in e&&P();"fontSize"in e&&(P(),T())}return Q.call(t,a)},getBBox:function(){return{width:L.width+2*C,height:L.height+2*C,x:L.x-C,y:L.y-C}},destroy:function(){q(t.element,"mouseenter");q(t.element,"mouseleave");I&&(I=I.destroy());D&&(D=D.destroy());y.prototype.destroy.call(t);t=m=P=T=E=null}};x||(A.shadow=function(a){a&&(P(),D&&D.shadow(a));return t});return p(t,A)}});a.Renderer=G})(J);(function(a){var y=a.attr,G=a.createElement,E=a.css,h=a.defined,d=
a.extend,r=a.isFirefox,u=a.isMS,v=a.isWebKit,w=a.pick,n=a.pInt,g=a.SVGRenderer,c=a.win,m=a.wrap;d(a.SVGElement.prototype,{htmlCss:function(a){var b="SPAN"===this.element.tagName&&a&&"width"in a,l=w(b&&a.width,void 0),f;b&&(delete a.width,this.textWidth=l,f=!0);a&&"ellipsis"===a.textOverflow&&(a.whiteSpace="nowrap",a.overflow="hidden");this.styles=d(this.styles,a);E(this.element,a);f&&this.htmlUpdateTransform();return this},htmlGetBBox:function(){var a=this.element;return{x:a.offsetLeft,y:a.offsetTop,
width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,b=this.element,l=this.translateX||0,f=this.translateY||0,c=this.x||0,g=this.y||0,m=this.textAlign||"left",d={left:0,center:.5,right:1}[m],z=this.styles,k=z&&z.whiteSpace;E(b,{marginLeft:l,marginTop:f});!a.styledMode&&this.shadows&&this.shadows.forEach(function(a){E(a,{marginLeft:l+1,marginTop:f+1})});this.inverted&&b.childNodes.forEach(function(e){a.invertChild(e,b)});if("SPAN"===b.tagName){var z=
this.rotation,A=this.textWidth&&n(this.textWidth),D=[z,m,b.innerHTML,this.textWidth,this.textAlign].join(),C;(C=A!==this.oldTextWidth)&&!(C=A>this.oldTextWidth)&&((C=this.textPxLength)||(E(b,{width:"",whiteSpace:k||"nowrap"}),C=b.offsetWidth),C=C>A);C&&(/[ \-]/.test(b.textContent||b.innerText)||"ellipsis"===b.style.textOverflow)?(E(b,{width:A+"px",display:"block",whiteSpace:k||"normal"}),this.oldTextWidth=A,this.hasBoxWidthChanged=!0):this.hasBoxWidthChanged=!1;D!==this.cTT&&(k=a.fontMetrics(b.style.fontSize,
b).b,!h(z)||z===(this.oldRotation||0)&&m===this.oldAlign||this.setSpanRotation(z,d,k),this.getSpanCorrection(!h(z)&&this.textPxLength||b.offsetWidth,k,d,z,m));E(b,{left:c+(this.xCorr||0)+"px",top:g+(this.yCorr||0)+"px"});this.cTT=D;this.oldRotation=z;this.oldAlign=m}}else this.alignOnAdd=!0},setSpanRotation:function(a,b,l){var f={},c=this.renderer.getTransformKey();f[c]=f.transform="rotate("+a+"deg)";f[c+(r?"Origin":"-origin")]=f.transformOrigin=100*b+"% "+l+"px";E(this.element,f)},getSpanCorrection:function(a,
b,l){this.xCorr=-a*l;this.yCorr=-b}});d(g.prototype,{getTransformKey:function(){return u&&!/Edge/.test(c.navigator.userAgent)?"-ms-transform":v?"-webkit-transform":r?"MozTransform":c.opera?"-o-transform":""},html:function(c,b,l){var f=this.createElement("span"),g=f.element,p=f.renderer,n=p.isSVG,h=function(a,b){["opacity","visibility"].forEach(function(f){m(a,f+"Setter",function(a,e,q,f){a.call(this,e,q,f);b[q]=e})});a.addedSetters=!0},z=a.charts[p.chartIndex],z=z&&z.styledMode;f.textSetter=function(a){a!==
g.innerHTML&&delete this.bBox;this.textStr=a;g.innerHTML=w(a,"");f.doTransform=!0};n&&h(f,f.element.style);f.xSetter=f.ySetter=f.alignSetter=f.rotationSetter=function(a,b){"align"===b&&(b="textAlign");f[b]=a;f.doTransform=!0};f.afterSetters=function(){this.doTransform&&(this.htmlUpdateTransform(),this.doTransform=!1)};f.attr({text:c,x:Math.round(b),y:Math.round(l)}).css({position:"absolute"});z||f.css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize});g.style.whiteSpace="nowrap";f.css=
f.htmlCss;n&&(f.add=function(a){var b,l=p.box.parentNode,c=[];if(this.parentGroup=a){if(b=a.div,!b){for(;a;)c.push(a),a=a.parentGroup;c.reverse().forEach(function(a){function e(e,q){a[q]=e;"translateX"===q?k.left=e+"px":k.top=e+"px";a.doTransform=!0}var k,g=y(a.element,"class");g&&(g={className:g});b=a.div=a.div||G("div",g,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,pointerEvents:a.styles&&a.styles.pointerEvents},b||l);k=b.style;
d(a,{classSetter:function(a){return function(e){this.element.setAttribute("class",e);a.className=e}}(b),on:function(){c[0].div&&f.on.apply({element:c[0].div},arguments);return a},translateXSetter:e,translateYSetter:e});a.addedSetters||h(a,k)})}}else b=l;b.appendChild(g);f.added=!0;f.alignOnAdd&&f.htmlUpdateTransform();return f});return f}})})(J);(function(a){var y=a.defined,G=a.extend,E=a.merge,h=a.pick,d=a.timeUnits,r=a.win;a.Time=function(a){this.update(a,!1)};a.Time.prototype={defaultOptions:{},
update:function(a){var d=h(a&&a.useUTC,!0),w=this;this.options=a=E(!0,this.options||{},a);this.Date=a.Date||r.Date;this.timezoneOffset=(this.useUTC=d)&&a.timezoneOffset;this.getTimezoneOffset=this.timezoneOffsetFunction();(this.variableTimezone=!(d&&!a.getTimezoneOffset&&!a.timezone))||this.timezoneOffset?(this.get=function(a,g){var c=g.getTime(),m=c-w.getTimezoneOffset(g);g.setTime(m);a=g["getUTC"+a]();g.setTime(c);return a},this.set=function(a,g,c){var m;if("Milliseconds"===a||"Seconds"===a||"Minutes"===
a&&0===g.getTimezoneOffset()%60)g["set"+a](c);else m=w.getTimezoneOffset(g),m=g.getTime()-m,g.setTime(m),g["setUTC"+a](c),a=w.getTimezoneOffset(g),m=g.getTime()+a,g.setTime(m)}):d?(this.get=function(a,g){return g["getUTC"+a]()},this.set=function(a,g,c){return g["setUTC"+a](c)}):(this.get=function(a,g){return g["get"+a]()},this.set=function(a,g,c){return g["set"+a](c)})},makeTime:function(d,r,w,n,g,c){var m,p,b;this.useUTC?(m=this.Date.UTC.apply(0,arguments),p=this.getTimezoneOffset(m),m+=p,b=this.getTimezoneOffset(m),
p!==b?m+=b-p:p-36E5!==this.getTimezoneOffset(m-36E5)||a.isSafari||(m-=36E5)):m=(new this.Date(d,r,h(w,1),h(n,0),h(g,0),h(c,0))).getTime();return m},timezoneOffsetFunction:function(){var d=this,h=this.options,w=r.moment;if(!this.useUTC)return function(a){return 6E4*(new Date(a)).getTimezoneOffset()};if(h.timezone){if(w)return function(a){return 6E4*-w.tz(a,h.timezone).utcOffset()};a.error(25)}return this.useUTC&&h.getTimezoneOffset?function(a){return 6E4*h.getTimezoneOffset(a)}:function(){return 6E4*
(d.timezoneOffset||0)}},dateFormat:function(d,h,w){if(!a.defined(h)||isNaN(h))return a.defaultOptions.lang.invalidDate||"";d=a.pick(d,"%Y-%m-%d %H:%M:%S");var n=this,g=new this.Date(h),c=this.get("Hours",g),m=this.get("Day",g),p=this.get("Date",g),b=this.get("Month",g),l=this.get("FullYear",g),f=a.defaultOptions.lang,x=f.weekdays,t=f.shortWeekdays,H=a.pad,g=a.extend({a:t?t[m]:x[m].substr(0,3),A:x[m],d:H(p),e:H(p,2," "),w:m,b:f.shortMonths[b],B:f.months[b],m:H(b+1),o:b+1,y:l.toString().substr(2,2),
Y:l,H:H(c),k:c,I:H(c%12||12),l:c%12||12,M:H(n.get("Minutes",g)),p:12>c?"AM":"PM",P:12>c?"am":"pm",S:H(g.getSeconds()),L:H(Math.floor(h%1E3),3)},a.dateFormats);a.objectEach(g,function(a,b){for(;-1!==d.indexOf("%"+b);)d=d.replace("%"+b,"function"===typeof a?a.call(n,h):a)});return w?d.substr(0,1).toUpperCase()+d.substr(1):d},resolveDTLFormat:function(d){return a.isObject(d,!0)?d:(d=a.splat(d),{main:d[0],from:d[1],to:d[2]})},getTimeTicks:function(a,r,w,n){var g=this,c=[],m,p={},b;m=new g.Date(r);var l=
a.unitRange,f=a.count||1,x;n=h(n,1);if(y(r)){g.set("Milliseconds",m,l>=d.second?0:f*Math.floor(g.get("Milliseconds",m)/f));l>=d.second&&g.set("Seconds",m,l>=d.minute?0:f*Math.floor(g.get("Seconds",m)/f));l>=d.minute&&g.set("Minutes",m,l>=d.hour?0:f*Math.floor(g.get("Minutes",m)/f));l>=d.hour&&g.set("Hours",m,l>=d.day?0:f*Math.floor(g.get("Hours",m)/f));l>=d.day&&g.set("Date",m,l>=d.month?1:Math.max(1,f*Math.floor(g.get("Date",m)/f)));l>=d.month&&(g.set("Month",m,l>=d.year?0:f*Math.floor(g.get("Month",
m)/f)),b=g.get("FullYear",m));l>=d.year&&g.set("FullYear",m,b-b%f);l===d.week&&(b=g.get("Day",m),g.set("Date",m,g.get("Date",m)-b+n+(b<n?-7:0)));b=g.get("FullYear",m);n=g.get("Month",m);var t=g.get("Date",m),H=g.get("Hours",m);r=m.getTime();g.variableTimezone&&(x=w-r>4*d.month||g.getTimezoneOffset(r)!==g.getTimezoneOffset(w));r=m.getTime();for(m=1;r<w;)c.push(r),r=l===d.year?g.makeTime(b+m*f,0):l===d.month?g.makeTime(b,n+m*f):!x||l!==d.day&&l!==d.week?x&&l===d.hour&&1<f?g.makeTime(b,n,t,H+m*f):r+
l*f:g.makeTime(b,n,t+m*f*(l===d.day?1:7)),m++;c.push(r);l<=d.hour&&1E4>c.length&&c.forEach(function(a){0===a%18E5&&"000000000"===g.dateFormat("%H%M%S%L",a)&&(p[a]="day")})}c.info=G(a,{higherRanks:p,totalRange:l*f});return c}}})(J);(function(a){var y=a.color,G=a.merge;a.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),
shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{},time:a.Time.prototype.defaultOptions,chart:{styledMode:!1,borderRadius:0,colorCount:10,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:6},position:{align:"right",
x:-10,y:10}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",plotBorderColor:"#cccccc"},title:{text:"Chart title",align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",alignColumns:!0,layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},
itemStyle:{color:"#333333",cursor:"pointer",fontSize:"12px",fontWeight:"bold",textOverflow:"ellipsis"},itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,
animation:a.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,headerFormat:'\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
backgroundColor:y("#f7f7f7").setOpacity(.85).get(),borderWidth:1,shadow:!0,style:{color:"#333333",cursor:"default",fontSize:"12px",pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,href:"https://www.highcharts.com?credits",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};a.setOptions=function(y){a.defaultOptions=G(!0,a.defaultOptions,y);a.time.update(G(a.defaultOptions.global,a.defaultOptions.time),
!1);return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};a.defaultPlotOptions=a.defaultOptions.plotOptions;a.time=new a.Time(G(a.defaultOptions.global,a.defaultOptions.time));a.dateFormat=function(y,h,d){return a.time.dateFormat(y,h,d)}})(J);(function(a){var y=a.correctFloat,G=a.defined,E=a.destroyObjectProperties,h=a.fireEvent,d=a.isNumber,r=a.merge,u=a.pick,v=a.deg2rad;a.Tick=function(a,d,g,c,m){this.axis=a;this.pos=d;this.type=g||"";this.isNewLabel=this.isNew=!0;this.parameters=
m||{};this.tickmarkOffset=this.parameters.tickmarkOffset;this.options=this.parameters.options;g||c||this.addLabel()};a.Tick.prototype={addLabel:function(){var d=this,n=d.axis,g=n.options,c=n.chart,m=n.categories,p=n.names,b=d.pos,l=u(d.options&&d.options.labels,g.labels),f=n.tickPositions,x=b===f[0],t=b===f[f.length-1],m=this.parameters.category||(m?u(m[b],p[b],b):b),h=d.label,f=f.info,F,z,k,A;n.isDatetimeAxis&&f&&(z=c.time.resolveDTLFormat(g.dateTimeLabelFormats[!g.grid&&f.higherRanks[b]||f.unitName]),
F=z.main);d.isFirst=x;d.isLast=t;d.formatCtx={axis:n,chart:c,isFirst:x,isLast:t,dateTimeLabelFormat:F,tickPositionInfo:f,value:n.isLog?y(n.lin2log(m)):m,pos:b};g=n.labelFormatter.call(d.formatCtx,this.formatCtx);if(A=z&&z.list)d.shortenLabel=function(){for(k=0;k<A.length;k++)if(h.attr({text:n.labelFormatter.call(a.extend(d.formatCtx,{dateTimeLabelFormat:A[k]}))}),h.getBBox().width<n.getSlotWidth(d)-2*u(l.padding,5))return;h.attr({text:""})};if(G(h))h&&h.textStr!==g&&(!h.textWidth||l.style&&l.style.width||
h.styles.width||h.css({width:null}),h.attr({text:g}));else{if(d.label=h=G(g)&&l.enabled?c.renderer.text(g,0,0,l.useHTML).add(n.labelGroup):null)c.styledMode||h.css(r(l.style)),h.textPxLength=h.getBBox().width;d.rotation=0}},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var d=this.axis,g=d.options.labels,c=a.x,m=d.chart.chartWidth,p=d.chart.spacing,b=u(d.labelLeft,Math.min(d.pos,p[3])),p=u(d.labelRight,Math.max(d.isRadial?
0:d.pos+d.len,m-p[1])),l=this.label,f=this.rotation,x={left:0,center:.5,right:1}[d.labelAlign||l.attr("align")],t=l.getBBox().width,h=d.getSlotWidth(this),F=h,z=1,k,A={};if(f||"justify"!==u(g.overflow,"justify"))0>f&&c-x*t<b?k=Math.round(c/Math.cos(f*v)-b):0<f&&c+x*t>p&&(k=Math.round((m-c)/Math.cos(f*v)));else if(m=c+(1-x)*t,c-x*t<b?F=a.x+F*(1-x)-b:m>p&&(F=p-a.x+F*x,z=-1),F=Math.min(h,F),F<h&&"center"===d.labelAlign&&(a.x+=z*(h-F-x*(h-Math.min(t,F)))),t>F||d.autoRotation&&(l.styles||{}).width)k=F;
k&&(this.shortenLabel?this.shortenLabel():(A.width=Math.floor(k),(g.style||{}).textOverflow||(A.textOverflow="ellipsis"),l.css(A)))},getPosition:function(d,n,g,c){var m=this.axis,p=m.chart,b=c&&p.oldChartHeight||p.chartHeight;d={x:d?a.correctFloat(m.translate(n+g,null,null,c)+m.transB):m.left+m.offset+(m.opposite?(c&&p.oldChartWidth||p.chartWidth)-m.right-m.left:0),y:d?b-m.bottom+m.offset-(m.opposite?m.height:0):a.correctFloat(b-m.translate(n+g,null,null,c)-m.transB)};h(this,"afterGetPosition",{pos:d});
return d},getLabelPosition:function(a,d,g,c,m,p,b,l){var f=this.axis,x=f.transA,t=f.reversed,n=f.staggerLines,F=f.tickRotCorr||{x:0,y:0},z=m.y,k=c||f.reserveSpaceDefault?0:-f.labelOffset*("center"===f.labelAlign?.5:1),A={};G(z)||(z=0===f.side?g.rotation?-8:-g.getBBox().height:2===f.side?F.y+8:Math.cos(g.rotation*v)*(F.y-g.getBBox(!1,0).height/2));a=a+m.x+k+F.x-(p&&c?p*x*(t?-1:1):0);d=d+z-(p&&!c?p*x*(t?1:-1):0);n&&(g=b/(l||1)%n,f.opposite&&(g=n-g-1),d+=f.labelOffset/n*g);A.x=a;A.y=Math.round(d);h(this,
"afterGetLabelPosition",{pos:A});return A},getMarkPath:function(a,d,g,c,m,p){return p.crispLine(["M",a,d,"L",a+(m?0:-g),d+(m?g:0)],c)},renderGridLine:function(a,d,g){var c=this.axis,m=c.options,p=this.gridLine,b={},l=this.pos,f=this.type,x=u(this.tickmarkOffset,c.tickmarkOffset),t=c.chart.renderer,n=f?f+"Grid":"grid",h=m[n+"LineWidth"],z=m[n+"LineColor"],m=m[n+"LineDashStyle"];p||(c.chart.styledMode||(b.stroke=z,b["stroke-width"]=h,m&&(b.dashstyle=m)),f||(b.zIndex=1),a&&(d=0),this.gridLine=p=t.path().attr(b).addClass("highcharts-"+
(f?f+"-":"")+"grid-line").add(c.gridGroup));if(p&&(g=c.getPlotLinePath(l+x,p.strokeWidth()*g,a,"pass")))p[a||this.isNew?"attr":"animate"]({d:g,opacity:d})},renderMark:function(a,d,g){var c=this.axis,m=c.options,p=c.chart.renderer,b=this.type,l=b?b+"Tick":"tick",f=c.tickSize(l),x=this.mark,t=!x,n=a.x;a=a.y;var h=u(m[l+"Width"],!b&&c.isXAxis?1:0),m=m[l+"Color"];f&&(c.opposite&&(f[0]=-f[0]),t&&(this.mark=x=p.path().addClass("highcharts-"+(b?b+"-":"")+"tick").add(c.axisGroup),c.chart.styledMode||x.attr({stroke:m,
"stroke-width":h})),x[t?"attr":"animate"]({d:this.getMarkPath(n,a,f[0],x.strokeWidth()*g,c.horiz,p),opacity:d}))},renderLabel:function(a,n,g,c){var m=this.axis,p=m.horiz,b=m.options,l=this.label,f=b.labels,x=f.step,m=u(this.tickmarkOffset,m.tickmarkOffset),t=!0,h=a.x;a=a.y;l&&d(h)&&(l.xy=a=this.getLabelPosition(h,a,l,p,f,m,c,x),this.isFirst&&!this.isLast&&!u(b.showFirstLabel,1)||this.isLast&&!this.isFirst&&!u(b.showLastLabel,1)?t=!1:!p||f.step||f.rotation||n||0===g||this.handleOverflow(a),x&&c%x&&
(t=!1),t&&d(a.y)?(a.opacity=g,l[this.isNewLabel?"attr":"animate"](a),this.isNewLabel=!1):(l.attr("y",-9999),this.isNewLabel=!0))},render:function(d,n,g){var c=this.axis,m=c.horiz,p=this.pos,b=u(this.tickmarkOffset,c.tickmarkOffset),p=this.getPosition(m,p,b,n),b=p.x,l=p.y,c=m&&b===c.pos+c.len||!m&&l===c.pos?-1:1;g=u(g,1);this.isActive=!0;this.renderGridLine(n,g,c);this.renderMark(p,g,c);this.renderLabel(p,n,g,d);this.isNew=!1;a.fireEvent(this,"afterRender")},destroy:function(){E(this,this.axis)}}})(J);
var V=function(a){var y=a.addEvent,G=a.animObject,E=a.arrayMax,h=a.arrayMin,d=a.color,r=a.correctFloat,u=a.defaultOptions,v=a.defined,w=a.deg2rad,n=a.destroyObjectProperties,g=a.extend,c=a.fireEvent,m=a.format,p=a.getMagnitude,b=a.isArray,l=a.isNumber,f=a.isString,x=a.merge,t=a.normalizeTickInterval,H=a.objectEach,F=a.pick,z=a.removeEvent,k=a.splat,A=a.syncTimeout,D=a.Tick,C=function(){this.init.apply(this,arguments)};a.extend(C.prototype,{defaultOptions:{dateTimeLabelFormats:{millisecond:{main:"%H:%M:%S.%L",
range:!1},second:{main:"%H:%M:%S",range:!1},minute:{main:"%H:%M",range:!1},hour:{main:"%H:%M",range:!1},day:{main:"%e. %b"},week:{main:"%e. %b"},month:{main:"%b '%y"},year:{main:"%Y"}},endOnTick:!1,labels:{enabled:!0,indentation:10,x:0,style:{color:"#666666",cursor:"default",fontSize:"11px"}},maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",minPadding:.01,startOfWeek:1,startOnTick:!1,tickLength:10,tickPixelInterval:100,tickmarkPlacement:"between",tickPosition:"outside",title:{align:"middle",
style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,maxPadding:.05,minPadding:.05,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},startOnTick:!0,title:{rotation:270,text:"Values"},stackLabels:{allowOverlap:!1,enabled:!1,formatter:function(){return a.numberFormat(this.total,-1)},style:{color:"#000000",fontSize:"11px",fontWeight:"bold",
textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},title:{rotation:0}},init:function(a,q){var e=q.isX,b=this;b.chart=a;b.horiz=a.inverted&&!b.isZAxis?!e:e;b.isXAxis=e;b.coll=b.coll||(e?"xAxis":"yAxis");c(this,"init",{userOptions:q});b.opposite=
q.opposite;b.side=q.side||(b.horiz?b.opposite?0:2:b.opposite?1:3);b.setOptions(q);var f=this.options,l=f.type;b.labelFormatter=f.labels.formatter||b.defaultLabelFormatter;b.userOptions=q;b.minPixelPadding=0;b.reversed=f.reversed;b.visible=!1!==f.visible;b.zoomEnabled=!1!==f.zoomEnabled;b.hasNames="category"===l||!0===f.categories;b.categories=f.categories||b.hasNames;b.names||(b.names=[],b.names.keys={});b.plotLinesAndBandsGroups={};b.isLog="logarithmic"===l;b.isDatetimeAxis="datetime"===l;b.positiveValuesOnly=
b.isLog&&!b.allowNegativeLog;b.isLinked=v(f.linkedTo);b.ticks={};b.labelEdge=[];b.minorTicks={};b.plotLinesAndBands=[];b.alternateBands={};b.len=0;b.minRange=b.userMinRange=f.minRange||f.maxZoom;b.range=f.range;b.offset=f.offset||0;b.stacks={};b.oldStacks={};b.stacksTouched=0;b.max=null;b.min=null;b.crosshair=F(f.crosshair,k(a.options.tooltip.crosshairs)[e?0:1],!1);q=b.options.events;-1===a.axes.indexOf(b)&&(e?a.axes.splice(a.xAxis.length,0,b):a.axes.push(b),a[b.coll].push(b));b.series=b.series||
[];a.inverted&&!b.isZAxis&&e&&void 0===b.reversed&&(b.reversed=!0);H(q,function(a,e){y(b,e,a)});b.lin2log=f.linearToLogConverter||b.lin2log;b.isLog&&(b.val2lin=b.log2lin,b.lin2val=b.lin2log);c(this,"afterInit")},setOptions:function(a){this.options=x(this.defaultOptions,"yAxis"===this.coll&&this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],x(u[this.coll],a));c(this,"afterSetOptions",{userOptions:a})},
defaultLabelFormatter:function(){var e=this.axis,q=this.value,b=e.chart.time,f=e.categories,l=this.dateTimeLabelFormat,c=u.lang,k=c.numericSymbols,c=c.numericSymbolMagnitude||1E3,g=k&&k.length,d,p=e.options.labels.format,e=e.isLog?Math.abs(q):e.tickInterval;if(p)d=m(p,this,b);else if(f)d=q;else if(l)d=b.dateFormat(l,q);else if(g&&1E3<=e)for(;g--&&void 0===d;)b=Math.pow(c,g+1),e>=b&&0===10*q%b&&null!==k[g]&&0!==q&&(d=a.numberFormat(q/b,-1)+k[g]);void 0===d&&(d=1E4<=Math.abs(q)?a.numberFormat(q,-1):
a.numberFormat(q,-1,void 0,""));return d},getSeriesExtremes:function(){var a=this,q=a.chart;c(this,"getSeriesExtremes",null,function(){a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();a.series.forEach(function(e){if(e.visible||!q.options.chart.ignoreHiddenSeries){var b=e.options,f=b.threshold,c;a.hasVisibleSeries=!0;a.positiveValuesOnly&&0>=f&&(f=null);if(a.isXAxis)b=e.xData,b.length&&(e=h(b),c=E(b),l(e)||e instanceof Date||(b=b.filter(l),
e=h(b),c=E(b)),b.length&&(a.dataMin=Math.min(F(a.dataMin,b[0],e),e),a.dataMax=Math.max(F(a.dataMax,b[0],c),c)));else if(e.getExtremes(),c=e.dataMax,e=e.dataMin,v(e)&&v(c)&&(a.dataMin=Math.min(F(a.dataMin,e),e),a.dataMax=Math.max(F(a.dataMax,c),c)),v(f)&&(a.threshold=f),!b.softThreshold||a.positiveValuesOnly)a.softThreshold=!1}})});c(this,"afterGetSeriesExtremes")},translate:function(a,q,b,f,c,k){var e=this.linkedParent||this,d=1,g=0,p=f?e.oldTransA:e.transA;f=f?e.oldMin:e.min;var A=e.minPixelPadding;
c=(e.isOrdinal||e.isBroken||e.isLog&&c)&&e.lin2val;p||(p=e.transA);b&&(d*=-1,g=e.len);e.reversed&&(d*=-1,g-=d*(e.sector||e.len));q?(a=(a*d+g-A)/p+f,c&&(a=e.lin2val(a))):(c&&(a=e.val2lin(a)),a=l(f)?d*(a-f)*p+g+d*A+(l(k)?p*k:0):void 0);return a},toPixels:function(a,q){return this.translate(a,!1,!this.horiz,null,!0)+(q?0:this.pos)},toValue:function(a,q){return this.translate(a-(q?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,q,b,f,c){var e=this.chart,k=this.left,d=this.top,g,p,A=b&&
e.oldChartHeight||e.chartHeight,t=b&&e.oldChartWidth||e.chartWidth,m;g=this.transB;var x=function(a,e,q){if("pass"!==f&&a<e||a>q)f?a=Math.min(Math.max(e,a),q):m=!0;return a};c=F(c,this.translate(a,null,null,b));c=Math.min(Math.max(-1E5,c),1E5);a=b=Math.round(c+g);g=p=Math.round(A-c-g);l(c)?this.horiz?(g=d,p=A-this.bottom,a=b=x(a,k,k+this.width)):(a=k,b=t-this.right,g=p=x(g,d,d+this.height)):(m=!0,f=!1);return m&&!f?null:e.renderer.crispLine(["M",a,g,"L",b,p],q||1)},getLinearTickPositions:function(a,
q,b){var e,f=r(Math.floor(q/a)*a);b=r(Math.ceil(b/a)*a);var c=[],k;r(f+a)===f&&(k=20);if(this.single)return[q];for(q=f;q<=b;){c.push(q);q=r(q+a,k);if(q===e)break;e=q}return c},getMinorTickInterval:function(){var a=this.options;return!0===a.minorTicks?F(a.minorTickInterval,"auto"):!1===a.minorTicks?null:a.minorTickInterval},getMinorTickPositions:function(){var a=this,q=a.options,b=a.tickPositions,f=a.minorTickInterval,c=[],k=a.pointRangePadding||0,l=a.min-k,k=a.max+k,g=k-l;if(g&&g/f<a.len/3)if(a.isLog)this.paddedTicks.forEach(function(e,
q,b){q&&c.push.apply(c,a.getLogTickPositions(f,b[q-1],b[q],!0))});else if(a.isDatetimeAxis&&"auto"===this.getMinorTickInterval())c=c.concat(a.getTimeTicks(a.normalizeTimeTickInterval(f),l,k,q.startOfWeek));else for(q=l+(b[0]-l)%f;q<=k&&q!==c[0];q+=f)c.push(q);0!==c.length&&a.trimTicks(c);return c},adjustForMinRange:function(){var a=this.options,q=this.min,b=this.max,f,c,k,l,g,d,p,A;this.isXAxis&&void 0===this.minRange&&!this.isLog&&(v(a.min)||v(a.max)?this.minRange=null:(this.series.forEach(function(a){d=
a.xData;for(l=p=a.xIncrement?1:d.length-1;0<l;l--)if(g=d[l]-d[l-1],void 0===k||g<k)k=g}),this.minRange=Math.min(5*k,this.dataMax-this.dataMin)));b-q<this.minRange&&(c=this.dataMax-this.dataMin>=this.minRange,A=this.minRange,f=(A-b+q)/2,f=[q-f,F(a.min,q-f)],c&&(f[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),q=E(f),b=[q+A,F(a.max,q+A)],c&&(b[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),b=h(b),b-q<A&&(f[0]=b-A,f[1]=F(a.min,b-A),q=E(f)));this.min=q;this.max=b},getClosest:function(){var a;
this.categories?a=1:this.series.forEach(function(e){var q=e.closestPointRange,b=e.visible||!e.chart.options.chart.ignoreHiddenSeries;!e.noSharedTooltip&&v(q)&&b&&(a=v(a)?Math.min(a,q):q)});return a},nameToX:function(a){var e=b(this.categories),f=e?this.categories:this.names,c=a.options.x,k;a.series.requireSorting=!1;v(c)||(c=!1===this.options.uniqueNames?a.series.autoIncrement():e?f.indexOf(a.name):F(f.keys[a.name],-1));-1===c?e||(k=f.length):k=c;void 0!==k&&(this.names[k]=a.name,this.names.keys[a.name]=
k);return k},updateNames:function(){var a=this,q=this.names;0<q.length&&(Object.keys(q.keys).forEach(function(a){delete q.keys[a]}),q.length=0,this.minRange=this.userMinRange,(this.series||[]).forEach(function(e){e.xIncrement=null;if(!e.points||e.isDirtyData)a.max=Math.max(a.max,e.xData.length-1),e.processData(),e.generatePoints();e.data.forEach(function(q,b){var f;q&&q.options&&void 0!==q.name&&(f=a.nameToX(q),void 0!==f&&f!==q.x&&(q.x=f,e.xData[b]=f))})}))},setAxisTranslation:function(a){var e=
this,b=e.max-e.min,k=e.axisPointRange||0,l,g=0,d=0,p=e.linkedParent,A=!!e.categories,t=e.transA,m=e.isXAxis;if(m||A||k)l=e.getClosest(),p?(g=p.minPointOffset,d=p.pointRangePadding):e.series.forEach(function(a){var b=A?1:m?F(a.options.pointRange,l,0):e.axisPointRange||0;a=a.options.pointPlacement;k=Math.max(k,b);e.single||(g=Math.max(g,f(a)?0:b/2),d=Math.max(d,"on"===a?0:b))}),p=e.ordinalSlope&&l?e.ordinalSlope/l:1,e.minPointOffset=g*=p,e.pointRangePadding=d*=p,e.pointRange=Math.min(k,b),m&&(e.closestPointRange=
l);a&&(e.oldTransA=t);e.translationSlope=e.transA=t=e.staticScale||e.len/(b+d||1);e.transB=e.horiz?e.left:e.bottom;e.minPixelPadding=t*g;c(this,"afterSetAxisTranslation")},minFromRange:function(){return this.max-this.range},setTickInterval:function(e){var b=this,f=b.chart,k=b.options,g=b.isLog,d=b.isDatetimeAxis,A=b.isXAxis,m=b.isLinked,x=k.maxPadding,n=k.minPadding,D,h=k.tickInterval,C=k.tickPixelInterval,z=b.categories,H=l(b.threshold)?b.threshold:null,w=b.softThreshold,u,y,E;d||z||m||this.getTickAmount();
y=F(b.userMin,k.min);E=F(b.userMax,k.max);m?(b.linkedParent=f[b.coll][k.linkedTo],D=b.linkedParent.getExtremes(),b.min=F(D.min,D.dataMin),b.max=F(D.max,D.dataMax),k.type!==b.linkedParent.options.type&&a.error(11,1,f)):(!w&&v(H)&&(b.dataMin>=H?(D=H,n=0):b.dataMax<=H&&(u=H,x=0)),b.min=F(y,D,b.dataMin),b.max=F(E,u,b.dataMax));g&&(b.positiveValuesOnly&&!e&&0>=Math.min(b.min,F(b.dataMin,b.min))&&a.error(10,1,f),b.min=r(b.log2lin(b.min),15),b.max=r(b.log2lin(b.max),15));b.range&&v(b.max)&&(b.userMin=b.min=
y=Math.max(b.dataMin,b.minFromRange()),b.userMax=E=b.max,b.range=null);c(b,"foundExtremes");b.beforePadding&&b.beforePadding();b.adjustForMinRange();!(z||b.axisPointRange||b.usePercentage||m)&&v(b.min)&&v(b.max)&&(f=b.max-b.min)&&(!v(y)&&n&&(b.min-=f*n),!v(E)&&x&&(b.max+=f*x));l(k.softMin)&&!l(b.userMin)&&(b.min=Math.min(b.min,k.softMin));l(k.softMax)&&!l(b.userMax)&&(b.max=Math.max(b.max,k.softMax));l(k.floor)&&(b.min=Math.min(Math.max(b.min,k.floor),Number.MAX_VALUE));l(k.ceiling)&&(b.max=Math.max(Math.min(b.max,
k.ceiling),F(b.userMax,-Number.MAX_VALUE)));w&&v(b.dataMin)&&(H=H||0,!v(y)&&b.min<H&&b.dataMin>=H?b.min=H:!v(E)&&b.max>H&&b.dataMax<=H&&(b.max=H));b.tickInterval=b.min===b.max||void 0===b.min||void 0===b.max?1:m&&!h&&C===b.linkedParent.options.tickPixelInterval?h=b.linkedParent.tickInterval:F(h,this.tickAmount?(b.max-b.min)/Math.max(this.tickAmount-1,1):void 0,z?1:(b.max-b.min)*C/Math.max(b.len,C));A&&!e&&b.series.forEach(function(a){a.processData(b.min!==b.oldMin||b.max!==b.oldMax)});b.setAxisTranslation(!0);
b.beforeSetTickPositions&&b.beforeSetTickPositions();b.postProcessTickInterval&&(b.tickInterval=b.postProcessTickInterval(b.tickInterval));b.pointRange&&!h&&(b.tickInterval=Math.max(b.pointRange,b.tickInterval));e=F(k.minTickInterval,b.isDatetimeAxis&&b.closestPointRange);!h&&b.tickInterval<e&&(b.tickInterval=e);d||g||h||(b.tickInterval=t(b.tickInterval,null,p(b.tickInterval),F(k.allowDecimals,!(.5<b.tickInterval&&5>b.tickInterval&&1E3<b.max&&9999>b.max)),!!this.tickAmount));this.tickAmount||(b.tickInterval=
b.unsquish());this.setTickPositions()},setTickPositions:function(){var e=this.options,b,f=e.tickPositions;b=this.getMinorTickInterval();var k=e.tickPositioner,l=e.startOnTick,g=e.endOnTick;this.tickmarkOffset=this.categories&&"between"===e.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval="auto"===b&&this.tickInterval?this.tickInterval/5:b;this.single=this.min===this.max&&v(this.min)&&!this.tickAmount&&(parseInt(this.min,10)===this.min||!1!==e.allowDecimals);this.tickPositions=
b=f&&f.slice();!b&&(!this.ordinalPositions&&(this.max-this.min)/this.tickInterval>Math.max(2*this.len,200)?(b=[this.min,this.max],a.error(19,!1,this.chart)):b=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,e.units),this.min,this.max,e.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),b.length>this.len&&(b=[b[0],
b.pop()],b[0]===b[1]&&(b.length=1)),this.tickPositions=b,k&&(k=k.apply(this,[this.min,this.max])))&&(this.tickPositions=b=k);this.paddedTicks=b.slice(0);this.trimTicks(b,l,g);this.isLinked||(this.single&&2>b.length&&(this.min-=.5,this.max+=.5),f||k||this.adjustTickAmount());c(this,"afterSetTickPositions")},trimTicks:function(a,b,f){var e=a[0],k=a[a.length-1],q=this.minPointOffset||0;if(!this.isLinked){if(b&&-Infinity!==e)this.min=e;else for(;this.min-q>a[0];)a.shift();if(f)this.max=k;else for(;this.max+
q<a[a.length-1];)a.pop();0===a.length&&v(e)&&!this.options.tickPositions&&a.push((k+e)/2)}},alignToOthers:function(){var a={},b,f=this.options;!1===this.chart.options.chart.alignTicks||!1===f.alignTicks||!1===f.startOnTick||!1===f.endOnTick||this.isLog||this.chart[this.coll].forEach(function(e){var f=e.options,f=[e.horiz?f.left:f.top,f.width,f.height,f.pane].join();e.series.length&&(a[f]?b=!0:a[f]=1)});return b},getTickAmount:function(){var a=this.options,b=a.tickAmount,f=a.tickPixelInterval;!v(a.tickInterval)&&
this.len<f&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(b=2);!b&&this.alignToOthers()&&(b=Math.ceil(this.len/f)+1);4>b&&(this.finalTickAmt=b,b=5);this.tickAmount=b},adjustTickAmount:function(){var a=this.tickInterval,b=this.tickPositions,f=this.tickAmount,k=this.finalTickAmt,c=b&&b.length,l=F(this.threshold,this.softThreshold?0:null);if(this.hasData()){if(c<f){for(;b.length<f;)b.length%2||this.min===l?b.push(r(b[b.length-1]+a)):b.unshift(r(b[0]-a));this.transA*=(c-1)/(f-1);this.min=
b[0];this.max=b[b.length-1]}else c>f&&(this.tickInterval*=2,this.setTickPositions());if(v(k)){for(a=f=b.length;a--;)(3===k&&1===a%2||2>=k&&0<a&&a<f-1)&&b.splice(a,1);this.finalTickAmt=void 0}}},setScale:function(){var a,b;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();b=this.len!==this.oldAxisLength;this.series.forEach(function(e){if(e.isDirtyData||e.isDirty||e.xAxis.isDirty)a=!0});b||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==
this.oldUserMax||this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=b||this.min!==this.oldMin||this.max!==this.oldMax)):this.cleanStacks&&this.cleanStacks();c(this,"afterSetScale")},setExtremes:function(a,b,f,k,l){var e=this,q=e.chart;f=F(f,!0);e.series.forEach(function(a){delete a.kdTree});l=g(l,{min:a,max:b});c(e,"setExtremes",l,function(){e.userMin=
a;e.userMax=b;e.eventArgs=l;f&&q.redraw(k)})},zoom:function(a,b){var e=this.dataMin,f=this.dataMax,k=this.options,c=Math.min(e,F(k.min,e)),k=Math.max(f,F(k.max,f));if(a!==this.min||b!==this.max)this.allowZoomOutside||(v(e)&&(a<c&&(a=c),a>k&&(a=k)),v(f)&&(b<c&&(b=c),b>k&&(b=k))),this.displayBtn=void 0!==a||void 0!==b,this.setExtremes(a,b,!1,void 0,{trigger:"zoom"});return!0},setAxisSize:function(){var e=this.chart,b=this.options,f=b.offsets||[0,0,0,0],k=this.horiz,c=this.width=Math.round(a.relativeLength(F(b.width,
e.plotWidth-f[3]+f[1]),e.plotWidth)),l=this.height=Math.round(a.relativeLength(F(b.height,e.plotHeight-f[0]+f[2]),e.plotHeight)),g=this.top=Math.round(a.relativeLength(F(b.top,e.plotTop+f[0]),e.plotHeight,e.plotTop)),b=this.left=Math.round(a.relativeLength(F(b.left,e.plotLeft+f[3]),e.plotWidth,e.plotLeft));this.bottom=e.chartHeight-l-g;this.right=e.chartWidth-c-b;this.len=Math.max(k?c:l,0);this.pos=k?b:g},getExtremes:function(){var a=this.isLog;return{min:a?r(this.lin2log(this.min)):this.min,max:a?
r(this.lin2log(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var e=this.isLog,b=e?this.lin2log(this.min):this.min,e=e?this.lin2log(this.max):this.max;null===a||-Infinity===a?a=b:Infinity===a?a=e:b>a?a=b:e<a&&(a=e);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){a=(F(a,0)-90*this.side+720)%360;return 15<a&&165>a?"right":195<a&&345>a?"left":"center"},tickSize:function(a){var e=this.options,b=e[a+"Length"],
f=F(e[a+"Width"],"tick"===a&&this.isXAxis?1:0);if(f&&b)return"inside"===e[a+"Position"]&&(b=-b),[b,f]},labelMetrics:function(){var a=this.tickPositions&&this.tickPositions[0]||0;return this.chart.renderer.fontMetrics(this.options.labels.style&&this.options.labels.style.fontSize,this.ticks[a]&&this.ticks[a].label)},unsquish:function(){var a=this.options.labels,b=this.horiz,f=this.tickInterval,k=f,c=this.len/(((this.categories?1:0)+this.max-this.min)/f),l,g=a.rotation,d=this.labelMetrics(),p,A=Number.MAX_VALUE,
t,m=function(a){a/=c||1;a=1<a?Math.ceil(a):1;return r(a*f)};b?(t=!a.staggerLines&&!a.step&&(v(g)?[g]:c<F(a.autoRotationLimit,80)&&a.autoRotation))&&t.forEach(function(a){var e;if(a===g||a&&-90<=a&&90>=a)p=m(Math.abs(d.h/Math.sin(w*a))),e=p+Math.abs(a/360),e<A&&(A=e,l=a,k=p)}):a.step||(k=m(d.h));this.autoRotation=t;this.labelRotation=F(l,g);return k},getSlotWidth:function(a){var e=this.chart,b=this.horiz,f=this.options.labels,k=Math.max(this.tickPositions.length-(this.categories?0:1),1),c=e.margin[3];
return a&&a.slotWidth||b&&2>(f.step||0)&&!f.rotation&&(this.staggerLines||1)*this.len/k||!b&&(f.style&&parseInt(f.style.width,10)||c&&c-e.spacing[3]||.33*e.chartWidth)},renderUnsquish:function(){var a=this.chart,b=a.renderer,k=this.tickPositions,c=this.ticks,l=this.options.labels,g=l&&l.style||{},d=this.horiz,p=this.getSlotWidth(),A=Math.max(1,Math.round(p-2*(l.padding||5))),t={},m=this.labelMetrics(),x=l.style&&l.style.textOverflow,n,D,h=0,C;f(l.rotation)||(t.rotation=l.rotation||0);k.forEach(function(a){(a=
c[a])&&a.label&&a.label.textPxLength>h&&(h=a.label.textPxLength)});this.maxLabelLength=h;if(this.autoRotation)h>A&&h>m.h?t.rotation=this.labelRotation:this.labelRotation=0;else if(p&&(n=A,!x))for(D="clip",A=k.length;!d&&A--;)if(C=k[A],C=c[C].label)C.styles&&"ellipsis"===C.styles.textOverflow?C.css({textOverflow:"clip"}):C.textPxLength>p&&C.css({width:p+"px"}),C.getBBox().height>this.len/k.length-(m.h-m.f)&&(C.specificTextOverflow="ellipsis");t.rotation&&(n=h>.5*a.chartHeight?.33*a.chartHeight:h,x||
(D="ellipsis"));if(this.labelAlign=l.align||this.autoLabelAlign(this.labelRotation))t.align=this.labelAlign;k.forEach(function(a){var b=(a=c[a])&&a.label,e=g.width,f={};b&&(b.attr(t),a.shortenLabel?a.shortenLabel():n&&!e&&"nowrap"!==g.whiteSpace&&(n<b.textPxLength||"SPAN"===b.element.tagName)?(f.width=n,x||(f.textOverflow=b.specificTextOverflow||D),b.css(f)):b.styles&&b.styles.width&&!f.width&&!e&&b.css({width:null}),delete b.specificTextOverflow,a.rotation=t.rotation)},this);this.tickRotCorr=b.rotCorr(m.b,
this.labelRotation||0,0!==this.side)},hasData:function(){return this.hasVisibleSeries||v(this.min)&&v(this.max)&&this.tickPositions&&0<this.tickPositions.length},addTitle:function(a){var b=this.chart.renderer,e=this.horiz,f=this.opposite,k=this.options.title,c,l=this.chart.styledMode;this.axisTitle||((c=k.textAlign)||(c=(e?{low:"left",middle:"center",high:"right"}:{low:f?"right":"left",middle:"center",high:f?"left":"right"})[k.align]),this.axisTitle=b.text(k.text,0,0,k.useHTML).attr({zIndex:7,rotation:k.rotation||
0,align:c}).addClass("highcharts-axis-title"),l||this.axisTitle.css(x(k.style)),this.axisTitle.add(this.axisGroup),this.axisTitle.isNew=!0);l||k.style.width||this.isRadial||this.axisTitle.css({width:this.len});this.axisTitle[a?"show":"hide"](!0)},generateTick:function(a){var b=this.ticks;b[a]?b[a].addLabel():b[a]=new D(this,a)},getOffset:function(){var a=this,b=a.chart,f=b.renderer,k=a.options,l=a.tickPositions,g=a.ticks,d=a.horiz,p=a.side,A=b.inverted&&!a.isZAxis?[1,0,3,2][p]:p,t,m,x=0,n,D=0,h=k.title,
C=k.labels,z=0,r=b.axisOffset,b=b.clipOffset,w=[-1,1,1,-1][p],u=k.className,y=a.axisParent;t=a.hasData();a.showAxis=m=t||F(k.showEmpty,!0);a.staggerLines=a.horiz&&C.staggerLines;a.axisGroup||(a.gridGroup=f.g("grid").attr({zIndex:k.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(u||"")).add(y),a.axisGroup=f.g("axis").attr({zIndex:k.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(u||"")).add(y),a.labelGroup=f.g("axis-labels").attr({zIndex:C.zIndex||7}).addClass("highcharts-"+
a.coll.toLowerCase()+"-labels "+(u||"")).add(y));t||a.isLinked?(l.forEach(function(b,e){a.generateTick(b,e)}),a.renderUnsquish(),a.reserveSpaceDefault=0===p||2===p||{1:"left",3:"right"}[p]===a.labelAlign,F(C.reserveSpace,"center"===a.labelAlign?!0:null,a.reserveSpaceDefault)&&l.forEach(function(a){z=Math.max(g[a].getLabelSize(),z)}),a.staggerLines&&(z*=a.staggerLines),a.labelOffset=z*(a.opposite?-1:1)):H(g,function(a,b){a.destroy();delete g[b]});h&&h.text&&!1!==h.enabled&&(a.addTitle(m),m&&!1!==h.reserveSpace&&
(a.titleOffset=x=a.axisTitle.getBBox()[d?"height":"width"],n=h.offset,D=v(n)?0:F(h.margin,d?5:10)));a.renderLine();a.offset=w*F(k.offset,r[p]);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};f=0===p?-a.labelMetrics().h:2===p?a.tickRotCorr.y:0;D=Math.abs(z)+D;z&&(D=D-f+w*(d?F(C.y,a.tickRotCorr.y+8*w):C.x));a.axisTitleMargin=F(n,D);a.getMaxLabelDimensions&&(a.maxLabelDimensions=a.getMaxLabelDimensions(g,l));d=this.tickSize("tick");r[p]=Math.max(r[p],a.axisTitleMargin+x+w*a.offset,D,t&&l.length&&d?d[0]+w*a.offset:
0);k=k.offset?0:2*Math.floor(a.axisLine.strokeWidth()/2);b[A]=Math.max(b[A],k);c(this,"afterGetOffset")},getLinePath:function(a){var b=this.chart,e=this.opposite,f=this.offset,k=this.horiz,c=this.left+(e?this.width:0)+f,f=b.chartHeight-this.bottom-(e?this.height:0)+f;e&&(a*=-1);return b.renderer.crispLine(["M",k?this.left:c,k?f:this.top,"L",k?b.chartWidth-this.right:c,k?f:b.chartHeight-this.bottom],a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
this.chart.styledMode||this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))},getTitlePosition:function(){var a=this.horiz,b=this.left,f=this.top,k=this.len,c=this.options.title,l=a?b:f,g=this.opposite,d=this.offset,p=c.x||0,A=c.y||0,t=this.axisTitle,m=this.chart.renderer.fontMetrics(c.style&&c.style.fontSize,t),t=Math.max(t.getBBox(null,0).height-m.h-1,0),k={low:l+(a?0:k),middle:l+k/2,high:l+(a?k:0)}[c.align],b=(a?f+this.height:b)+(a?1:-1)*(g?-1:1)*this.axisTitleMargin+
[-t,t,m.f,-t][this.side];return{x:a?k+p:b+(g?this.width:0)+d+p,y:a?b+A-(g?this.height:0)+d:k+A}},renderMinorTick:function(a){var b=this.chart.hasRendered&&l(this.oldMin),e=this.minorTicks;e[a]||(e[a]=new D(this,a,"minor"));b&&e[a].isNew&&e[a].render(null,!0);e[a].render(null,!1,1)},renderTick:function(a,b){var e=this.isLinked,f=this.ticks,k=this.chart.hasRendered&&l(this.oldMin);if(!e||a>=this.min&&a<=this.max)f[a]||(f[a]=new D(this,a)),k&&f[a].isNew&&f[a].render(b,!0,-1),f[a].render(b)},render:function(){var b=
this,f=b.chart,k=b.options,g=b.isLog,d=b.isLinked,p=b.tickPositions,t=b.axisTitle,m=b.ticks,x=b.minorTicks,n=b.alternateBands,h=k.stackLabels,C=k.alternateGridColor,z=b.tickmarkOffset,F=b.axisLine,r=b.showAxis,w=G(f.renderer.globalAnimation),u,v;b.labelEdge.length=0;b.overlap=!1;[m,x,n].forEach(function(a){H(a,function(a){a.isActive=!1})});if(b.hasData()||d)b.minorTickInterval&&!b.categories&&b.getMinorTickPositions().forEach(function(a){b.renderMinorTick(a)}),p.length&&(p.forEach(function(a,e){b.renderTick(a,
e)}),z&&(0===b.min||b.single)&&(m[-1]||(m[-1]=new D(b,-1,null,!0)),m[-1].render(-1))),C&&p.forEach(function(e,k){v=void 0!==p[k+1]?p[k+1]+z:b.max-z;0===k%2&&e<b.max&&v<=b.max+(f.polar?-z:z)&&(n[e]||(n[e]=new a.PlotLineOrBand(b)),u=e+z,n[e].options={from:g?b.lin2log(u):u,to:g?b.lin2log(v):v,color:C},n[e].render(),n[e].isActive=!0)}),b._addedPlotLB||((k.plotLines||[]).concat(k.plotBands||[]).forEach(function(a){b.addPlotBandOrLine(a)}),b._addedPlotLB=!0);[m,x,n].forEach(function(a){var b,e=[],k=w.duration;
H(a,function(a,b){a.isActive||(a.render(b,!1,0),a.isActive=!1,e.push(b))});A(function(){for(b=e.length;b--;)a[e[b]]&&!a[e[b]].isActive&&(a[e[b]].destroy(),delete a[e[b]])},a!==n&&f.hasRendered&&k?k:0)});F&&(F[F.isPlaced?"animate":"attr"]({d:this.getLinePath(F.strokeWidth())}),F.isPlaced=!0,F[r?"show":"hide"](!0));t&&r&&(k=b.getTitlePosition(),l(k.y)?(t[t.isNew?"attr":"animate"](k),t.isNew=!1):(t.attr("y",-9999),t.isNew=!0));h&&h.enabled&&b.renderStackTotals();b.isDirty=!1;c(this,"afterRender")},redraw:function(){this.visible&&
(this.render(),this.plotLinesAndBands.forEach(function(a){a.render()}));this.series.forEach(function(a){a.isDirty=!0})},keepProps:"extKey hcEvents names series userMax userMin".split(" "),destroy:function(a){var b=this,e=b.stacks,f=b.plotLinesAndBands,k;c(this,"destroy",{keepEvents:a});a||z(b);H(e,function(a,b){n(a);e[b]=null});[b.ticks,b.minorTicks,b.alternateBands].forEach(function(a){n(a)});if(f)for(a=f.length;a--;)f[a].destroy();"stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function(a){b[a]&&
(b[a]=b[a].destroy())});for(k in b.plotLinesAndBandsGroups)b.plotLinesAndBandsGroups[k]=b.plotLinesAndBandsGroups[k].destroy();H(b,function(a,e){-1===b.keepProps.indexOf(e)&&delete b[e]})},drawCrosshair:function(a,b){var e,f=this.crosshair,k=F(f.snap,!0),l,g=this.cross;c(this,"drawCrosshair",{e:a,point:b});a||(a=this.cross&&this.cross.e);if(this.crosshair&&!1!==(v(b)||!k)){k?v(b)&&(l=F(b.crosshairPos,this.isXAxis?b.plotX:this.len-b.plotY)):l=a&&(this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos);
v(l)&&(e=this.getPlotLinePath(b&&(this.isXAxis?b.x:F(b.stackY,b.y)),null,null,null,l)||null);if(!v(e)){this.hideCrosshair();return}k=this.categories&&!this.isRadial;g||(this.cross=g=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+(k?"category ":"thin ")+f.className).attr({zIndex:F(f.zIndex,2)}).add(),this.chart.styledMode||(g.attr({stroke:f.color||(k?d("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":F(f.width,1)}).css({"pointer-events":"none"}),f.dashStyle&&
g.attr({dashstyle:f.dashStyle})));g.show().attr({d:e});k&&!f.width&&g.attr({"stroke-width":this.transA});this.cross.e=a}else this.hideCrosshair();c(this,"afterDrawCrosshair",{e:a,point:b})},hideCrosshair:function(){this.cross&&this.cross.hide()}});return a.Axis=C}(J);(function(a){var y=a.Axis,G=a.getMagnitude,E=a.normalizeTickInterval,h=a.timeUnits;y.prototype.getTimeTicks=function(){return this.chart.time.getTimeTicks.apply(this.chart.time,arguments)};y.prototype.normalizeTimeTickInterval=function(a,
r){var d=r||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],["year",null]];r=d[d.length-1];var v=h[r[0]],w=r[1],n;for(n=0;n<d.length&&!(r=d[n],v=h[r[0]],w=r[1],d[n+1]&&a<=(v*w[w.length-1]+h[d[n+1][0]])/2);n++);v===h.year&&a<5*v&&(w=[1,2,5]);a=E(a/v,w,"year"===r[0]?Math.max(G(a/v),1):1);return{unitRange:v,count:a,unitName:r[0]}}})(J);(function(a){var y=a.Axis,G=a.getMagnitude,
E=a.normalizeTickInterval,h=a.pick;y.prototype.getLogTickPositions=function(a,r,u,v){var d=this.options,n=this.len,g=[];v||(this._minorAutoInterval=null);if(.5<=a)a=Math.round(a),g=this.getLinearTickPositions(a,r,u);else if(.08<=a)for(var n=Math.floor(r),c,m,p,b,l,d=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];n<u+1&&!l;n++)for(m=d.length,c=0;c<m&&!l;c++)p=this.log2lin(this.lin2log(n)*d[c]),p>r&&(!v||b<=u)&&void 0!==b&&g.push(b),b>u&&(l=!0),b=p;else r=this.lin2log(r),u=this.lin2log(u),a=v?this.getMinorTickInterval():
d.tickInterval,a=h("auto"===a?null:a,this._minorAutoInterval,d.tickPixelInterval/(v?5:1)*(u-r)/((v?n/this.tickPositions.length:n)||1)),a=E(a,null,G(a)),g=this.getLinearTickPositions(a,r,u).map(this.log2lin),v||(this._minorAutoInterval=a/5);v||(this.tickInterval=a);return g};y.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};y.prototype.lin2log=function(a){return Math.pow(10,a)}})(J);(function(a,y){var G=a.arrayMax,E=a.arrayMin,h=a.defined,d=a.destroyObjectProperties,r=a.erase,u=a.merge,
v=a.pick;a.PlotLineOrBand=function(a,d){this.axis=a;d&&(this.options=d,this.id=d.id)};a.PlotLineOrBand.prototype={render:function(){a.fireEvent(this,"render");var d=this,n=d.axis,g=n.horiz,c=d.options,m=c.label,p=d.label,b=c.to,l=c.from,f=c.value,x=h(l)&&h(b),t=h(f),H=d.svgElem,F=!H,z=[],k=c.color,A=v(c.zIndex,0),D=c.events,z={"class":"highcharts-plot-"+(x?"band ":"line ")+(c.className||"")},C={},e=n.chart.renderer,q=x?"bands":"lines";n.isLog&&(l=n.log2lin(l),b=n.log2lin(b),f=n.log2lin(f));n.chart.styledMode||
(t?(z.stroke=k,z["stroke-width"]=c.width,c.dashStyle&&(z.dashstyle=c.dashStyle)):x&&(k&&(z.fill=k),c.borderWidth&&(z.stroke=c.borderColor,z["stroke-width"]=c.borderWidth)));C.zIndex=A;q+="-"+A;(k=n.plotLinesAndBandsGroups[q])||(n.plotLinesAndBandsGroups[q]=k=e.g("plot-"+q).attr(C).add());F&&(d.svgElem=H=e.path().attr(z).add(k));if(t)z=n.getPlotLinePath(f,H.strokeWidth());else if(x)z=n.getPlotBandPath(l,b,c);else return;F&&z&&z.length?(H.attr({d:z}),D&&a.objectEach(D,function(a,b){H.on(b,function(a){D[b].apply(d,
[a])})})):H&&(z?(H.show(),H.animate({d:z})):(H.hide(),p&&(d.label=p=p.destroy())));m&&h(m.text)&&z&&z.length&&0<n.width&&0<n.height&&!z.isFlat?(m=u({align:g&&x&&"center",x:g?!x&&4:10,verticalAlign:!g&&x&&"middle",y:g?x?16:10:x?6:-4,rotation:g&&!x&&90},m),this.renderLabel(m,z,x,A)):p&&p.hide();return d},renderLabel:function(a,d,g,c){var m=this.label,p=this.axis.chart.renderer;m||(m={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(g?"band":"line")+"-label "+(a.className||
"")},m.zIndex=c,this.label=m=p.text(a.text,0,0,a.useHTML).attr(m).add(),this.axis.chart.styledMode||m.css(a.style));c=d.xBounds||[d[1],d[4],g?d[6]:d[1]];d=d.yBounds||[d[2],d[5],g?d[7]:d[2]];g=E(c);p=E(d);m.align(a,!1,{x:g,y:p,width:G(c)-g,height:G(d)-p});m.show()},destroy:function(){r(this.axis.plotLinesAndBands,this);delete this.axis;d(this)}};a.extend(y.prototype,{getPlotBandPath:function(a,d){var g=this.getPlotLinePath(d,null,null,!0),c=this.getPlotLinePath(a,null,null,!0),m=[],p=this.horiz,b=
1,l;a=a<this.min&&d<this.min||a>this.max&&d>this.max;if(c&&g)for(a&&(l=c.toString()===g.toString(),b=0),a=0;a<c.length;a+=6)p&&g[a+1]===c[a+1]?(g[a+1]+=b,g[a+4]+=b):p||g[a+2]!==c[a+2]||(g[a+2]+=b,g[a+5]+=b),m.push("M",c[a+1],c[a+2],"L",c[a+4],c[a+5],g[a+4],g[a+5],g[a+1],g[a+2],"z"),m.isFlat=l;return m},addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(d,n){var g=(new a.PlotLineOrBand(this,
d)).render(),c=this.userOptions;g&&(n&&(c[n]=c[n]||[],c[n].push(d)),this.plotLinesAndBands.push(g));return g},removePlotBandOrLine:function(a){for(var d=this.plotLinesAndBands,g=this.options,c=this.userOptions,m=d.length;m--;)d[m].id===a&&d[m].destroy();[g.plotLines||[],c.plotLines||[],g.plotBands||[],c.plotBands||[]].forEach(function(c){for(m=c.length;m--;)c[m].id===a&&r(c,c[m])})},removePlotBand:function(a){this.removePlotBandOrLine(a)},removePlotLine:function(a){this.removePlotBandOrLine(a)}})})(J,
V);(function(a){var y=a.doc,G=a.extend,E=a.format,h=a.isNumber,d=a.merge,r=a.pick,u=a.splat,v=a.syncTimeout,w=a.timeUnits;a.Tooltip=function(){this.init.apply(this,arguments)};a.Tooltip.prototype={init:function(a,d){this.chart=a;this.options=d;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=d.split&&!a.inverted;this.shared=d.shared||this.split;this.outside=d.outside&&!this.split},cleanSplit:function(a){this.chart.series.forEach(function(d){var c=d&&d.tt;c&&(!c.isActive||a?d.tt=c.destroy():
c.isActive=!1)})},applyFilter:function(){var a=this.chart;a.renderer.definition({tagName:"filter",id:"drop-shadow-"+a.index,opacity:.5,children:[{tagName:"feGaussianBlur",in:"SourceAlpha",stdDeviation:1},{tagName:"feOffset",dx:1,dy:1},{tagName:"feComponentTransfer",children:[{tagName:"feFuncA",type:"linear",slope:.3}]},{tagName:"feMerge",children:[{tagName:"feMergeNode"},{tagName:"feMergeNode",in:"SourceGraphic"}]}]});a.renderer.definition({tagName:"style",textContent:".highcharts-tooltip-"+a.index+
"{filter:url(#drop-shadow-"+a.index+")}"})},getLabel:function(){var d=this.chart.renderer,g=this.chart.styledMode,c=this.options,m;this.label||(this.outside&&(this.container=m=a.doc.createElement("div"),m.className="highcharts-tooltip-container",a.css(m,{position:"absolute",top:"1px",pointerEvents:c.style&&c.style.pointerEvents}),a.doc.body.appendChild(m),this.renderer=d=new a.Renderer(m,0,0)),this.split?this.label=d.g("tooltip"):(this.label=d.label("",0,0,c.shape||"callout",null,null,c.useHTML,null,
"tooltip").attr({padding:c.padding,r:c.borderRadius}),g||this.label.attr({fill:c.backgroundColor,"stroke-width":c.borderWidth}).css(c.style).shadow(c.shadow)),g&&(this.applyFilter(),this.label.addClass("highcharts-tooltip-"+this.chart.index)),this.outside&&(this.label.attr({x:this.distance,y:this.distance}),this.label.xSetter=function(a){m.style.left=a+"px"},this.label.ySetter=function(a){m.style.top=a+"px"}),this.label.attr({zIndex:8}).add());return this.label},update:function(a){this.destroy();
d(!0,this.chart.options.tooltip.userOptions,a);this.init(this.chart,d(!0,this.options,a))},destroy:function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());this.renderer&&(this.renderer=this.renderer.destroy(),a.discardElement(this.container));a.clearTimeout(this.hideTimer);a.clearTimeout(this.tooltipTimeout)},move:function(d,g,c,m){var p=this,b=p.now,l=!1!==p.options.animation&&!p.isHidden&&(1<Math.abs(d-b.x)||1<Math.abs(g-
b.y)),f=p.followPointer||1<p.len;G(b,{x:l?(2*b.x+d)/3:d,y:l?(b.y+g)/2:g,anchorX:f?void 0:l?(2*b.anchorX+c)/3:c,anchorY:f?void 0:l?(b.anchorY+m)/2:m});p.getLabel().attr(b);l&&(a.clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){p&&p.move(d,g,c,m)},32))},hide:function(d){var g=this;a.clearTimeout(this.hideTimer);d=r(d,this.options.hideDelay,500);this.isHidden||(this.hideTimer=v(function(){g.getLabel()[d?"fadeOut":"hide"]();g.isHidden=!0},d))},getAnchor:function(a,d){var c=
this.chart,g=c.pointer,p=c.inverted,b=c.plotTop,l=c.plotLeft,f=0,x=0,t,h;a=u(a);this.followPointer&&d?(void 0===d.chartX&&(d=g.normalize(d)),a=[d.chartX-c.plotLeft,d.chartY-b]):a[0].tooltipPos?a=a[0].tooltipPos:(a.forEach(function(a){t=a.series.yAxis;h=a.series.xAxis;f+=a.plotX+(!p&&h?h.left-l:0);x+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!p&&t?t.top-b:0)}),f/=a.length,x/=a.length,a=[p?c.plotWidth-x:f,this.shared&&!p&&1<a.length&&d?d.chartY-b:p?c.plotHeight-f:x]);return a.map(Math.round)},getPosition:function(a,
d,c){var g=this.chart,p=this.distance,b={},l=g.inverted&&c.h||0,f,x=this.outside,t=x?y.documentElement.clientWidth-2*p:g.chartWidth,h=x?Math.max(y.body.scrollHeight,y.documentElement.scrollHeight,y.body.offsetHeight,y.documentElement.offsetHeight,y.documentElement.clientHeight):g.chartHeight,n=g.pointer.chartPosition,z=["y",h,d,(x?n.top-p:0)+c.plotY+g.plotTop,x?0:g.plotTop,x?h:g.plotTop+g.plotHeight],k=["x",t,a,(x?n.left-p:0)+c.plotX+g.plotLeft,x?0:g.plotLeft,x?t:g.plotLeft+g.plotWidth],A=!this.followPointer&&
r(c.ttBelow,!g.inverted===!!c.negative),D=function(a,e,f,k,c,d){var g=f<k-p,q=k+p+f<e,t=k-p-f;k+=p;if(A&&q)b[a]=k;else if(!A&&g)b[a]=t;else if(g)b[a]=Math.min(d-f,0>t-l?t:t-l);else if(q)b[a]=Math.max(c,k+l+f>e?k:k+l);else return!1},C=function(a,e,f,k){var c;k<p||k>e-p?c=!1:b[a]=k<f/2?1:k>e-f/2?e-f-2:k-f/2;return c},e=function(a){var b=z;z=k;k=b;f=a},q=function(){!1!==D.apply(0,z)?!1!==C.apply(0,k)||f||(e(!0),q()):f?b.x=b.y=0:(e(!0),q())};(g.inverted||1<this.len)&&e();q();return b},defaultFormatter:function(a){var d=
this.points||u(this),c;c=[a.tooltipFooterHeaderFormatter(d[0])];c=c.concat(a.bodyFormatter(d));c.push(a.tooltipFooterHeaderFormatter(d[0],!0));return c},refresh:function(d,g){var c,m=this.options,p,b=d,l,f={},x=[];c=m.formatter||this.defaultFormatter;var f=this.shared,t,h=this.chart.styledMode;m.enabled&&(a.clearTimeout(this.hideTimer),this.followPointer=u(b)[0].series.tooltipOptions.followPointer,l=this.getAnchor(b,g),g=l[0],p=l[1],!f||b.series&&b.series.noSharedTooltip?f=b.getLabelConfig():(b.forEach(function(a){a.setState("hover");
x.push(a.getLabelConfig())}),f={x:b[0].category,y:b[0].y},f.points=x,b=b[0]),this.len=x.length,f=c.call(f,this),t=b.series,this.distance=r(t.tooltipOptions.distance,16),!1===f?this.hide():(c=this.getLabel(),this.isHidden&&c.attr({opacity:1}).show(),this.split?this.renderSplit(f,u(d)):(m.style.width&&!h||c.css({width:this.chart.spacingBox.width}),c.attr({text:f&&f.join?f.join(""):f}),c.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+r(b.colorIndex,t.colorIndex)),h||c.attr({stroke:m.borderColor||
b.color||t.color||"#666666"}),this.updatePosition({plotX:g,plotY:p,negative:b.negative,ttBelow:b.ttBelow,h:l[2]||0})),this.isHidden=!1))},renderSplit:function(d,g){var c=this,m=[],p=this.chart,b=p.renderer,l=!0,f=this.options,x=0,t,h=this.getLabel(),n=p.plotTop;a.isString(d)&&(d=[!1,d]);d.slice(0,g.length+1).forEach(function(a,k){if(!1!==a&&""!==a){k=g[k-1]||{isHeader:!0,plotX:g[0].plotX,plotY:p.plotHeight};var d=k.series||c,D=d.tt,C=k.series||{},e="highcharts-color-"+r(k.colorIndex,C.colorIndex,
"none");D||(D={padding:f.padding,r:f.borderRadius},p.styledMode||(D.fill=f.backgroundColor,D.stroke=f.borderColor||k.color||C.color||"#333333",D["stroke-width"]=f.borderWidth),d.tt=D=b.label(null,null,null,(k.isHeader?f.headerShape:f.shape)||"callout",null,null,f.useHTML).addClass("highcharts-tooltip-box "+e).attr(D).add(h));D.isActive=!0;D.attr({text:a});p.styledMode||D.css(f.style).shadow(f.shadow);a=D.getBBox();C=a.width+D.strokeWidth();k.isHeader?(x=a.height,p.xAxis[0].opposite&&(t=!0,n-=x),C=
Math.max(0,Math.min(k.plotX+p.plotLeft-C/2,p.chartWidth+(p.scrollablePixels?p.scrollablePixels-p.marginRight:0)-C))):C=k.plotX+p.plotLeft-r(f.distance,16)-C;0>C&&(l=!1);a=(k.series&&k.series.yAxis&&k.series.yAxis.pos)+(k.plotY||0);a-=n;k.isHeader&&(a=t?-x:p.plotHeight+x);m.push({target:a,rank:k.isHeader?1:0,size:d.tt.getBBox().height+1,point:k,x:C,tt:D})}});this.cleanSplit();f.positioner&&m.forEach(function(a){var b=f.positioner.call(c,a.tt.getBBox().width,a.size,a.point);a.x=b.x;a.align=0;a.target=
b.y;a.rank=r(b.rank,a.rank)});a.distribute(m,p.plotHeight+x);m.forEach(function(a){var b=a.point,c=b.series;a.tt.attr({visibility:void 0===a.pos?"hidden":"inherit",x:l||b.isHeader||f.positioner?a.x:b.plotX+p.plotLeft+r(f.distance,16),y:a.pos+n,anchorX:b.isHeader?b.plotX+p.plotLeft:b.plotX+c.xAxis.pos,anchorY:b.isHeader?p.plotTop+p.plotHeight/2:b.plotY+c.yAxis.pos})})},updatePosition:function(a){var d=this.chart,c=this.getLabel(),m=(this.options.positioner||this.getPosition).call(this,c.width,c.height,
a),p=a.plotX+d.plotLeft;a=a.plotY+d.plotTop;var b;this.outside&&(b=(this.options.borderWidth||0)+2*this.distance,this.renderer.setSize(c.width+b,c.height+b,!1),p+=d.pointer.chartPosition.left-m.x,a+=d.pointer.chartPosition.top-m.y);this.move(Math.round(m.x),Math.round(m.y||0),p,a)},getDateFormat:function(a,d,c,m){var g=this.chart.time,b=g.dateFormat("%m-%d %H:%M:%S.%L",d),l,f,x={millisecond:15,second:12,minute:9,hour:6,day:3},t="millisecond";for(f in w){if(a===w.week&&+g.dateFormat("%w",d)===c&&"00:00:00.000"===
b.substr(6)){f="week";break}if(w[f]>a){f=t;break}if(x[f]&&b.substr(x[f])!=="01-01 00:00:00.000".substr(x[f]))break;"week"!==f&&(t=f)}f&&(l=g.resolveDTLFormat(m[f]).main);return l},getXDateFormat:function(a,d,c){d=d.dateTimeLabelFormats;var g=c&&c.closestPointRange;return(g?this.getDateFormat(g,a.x,c.options.startOfWeek,d):d.day)||d.year},tooltipFooterHeaderFormatter:function(a,d){d=d?"footer":"header";var c=a.series,g=c.tooltipOptions,p=g.xDateFormat,b=c.xAxis,l=b&&"datetime"===b.options.type&&h(a.key),
f=g[d+"Format"];l&&!p&&(p=this.getXDateFormat(a,g,b));l&&p&&(a.point&&a.point.tooltipDateKeys||["key"]).forEach(function(a){f=f.replace("{point."+a+"}","{point."+a+":"+p+"}")});c.chart.styledMode&&(f=this.styledModeFormat(f));return E(f,{point:a,series:c},this.chart.time)},bodyFormatter:function(a){return a.map(function(a){var c=a.series.tooltipOptions;return(c[(a.point.formatPrefix||"point")+"Formatter"]||a.point.tooltipFormatter).call(a.point,c[(a.point.formatPrefix||"point")+"Format"]||"")})},
styledModeFormat:function(a){return a.replace('style\x3d"font-size: 10px"','class\x3d"highcharts-header"').replace(/style="color:{(point|series)\.color}"/g,'class\x3d"highcharts-color-{$1.colorIndex}"')}}})(J);(function(a){var y=a.addEvent,G=a.attr,E=a.charts,h=a.color,d=a.css,r=a.defined,u=a.extend,v=a.find,w=a.fireEvent,n=a.isNumber,g=a.isObject,c=a.offset,m=a.pick,p=a.splat,b=a.Tooltip;a.Pointer=function(a,b){this.init(a,b)};a.Pointer.prototype={init:function(a,f){this.options=f;this.chart=a;this.runChartClick=
f.chart.events&&!!f.chart.events.click;this.pinchDown=[];this.lastValidTouch={};b&&(a.tooltip=new b(a,f.tooltip),this.followTouchMove=m(f.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(a){var b=this.chart,c=b.options.chart,l=c.zoomType||"",b=b.inverted;/touch/.test(a.type)&&(l=m(c.pinchType,l));this.zoomX=a=/x/.test(l);this.zoomY=l=/y/.test(l);this.zoomHor=a&&!b||l&&b;this.zoomVert=l&&!b||a&&b;this.hasZoom=a||l},normalize:function(a,b){var f;f=a.touches?a.touches.length?a.touches.item(0):
a.changedTouches[0]:a;b||(this.chartPosition=b=c(this.chart.container));return u(a,{chartX:Math.round(f.pageX-b.left),chartY:Math.round(f.pageY-b.top)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};this.chart.axes.forEach(function(f){b[f.isXAxis?"xAxis":"yAxis"].push({axis:f,value:f.toValue(a[f.horiz?"chartX":"chartY"])})});return b},findNearestKDPoint:function(a,b,c){var f;a.forEach(function(a){var l=!(a.noSharedTooltip&&b)&&0>a.options.findNearestPointBy.indexOf("y");a=a.searchPoint(c,
l);if((l=g(a,!0))&&!(l=!g(f,!0)))var l=f.distX-a.distX,d=f.dist-a.dist,k=(a.series.group&&a.series.group.zIndex)-(f.series.group&&f.series.group.zIndex),l=0<(0!==l&&b?l:0!==d?d:0!==k?k:f.series.index>a.series.index?-1:1);l&&(f=a)});return f},getPointFromEvent:function(a){a=a.target;for(var b;a&&!b;)b=a.point,a=a.parentNode;return b},getChartCoordinatesFromPoint:function(a,b){var f=a.series,c=f.xAxis,f=f.yAxis,l=m(a.clientX,a.plotX),d=a.shapeArgs;if(c&&f)return b?{chartX:c.len+c.pos-l,chartY:f.len+
f.pos-a.plotY}:{chartX:l+c.pos,chartY:a.plotY+f.pos};if(d&&d.x&&d.y)return{chartX:d.x,chartY:d.y}},getHoverData:function(a,b,c,d,p,h,n){var f,l=[],t=n&&n.isBoosting;d=!(!d||!a);n=b&&!b.stickyTracking?[b]:c.filter(function(a){return a.visible&&!(!p&&a.directTouch)&&m(a.options.enableMouseTracking,!0)&&a.stickyTracking});b=(f=d?a:this.findNearestKDPoint(n,p,h))&&f.series;f&&(p&&!b.noSharedTooltip?(n=c.filter(function(a){return a.visible&&!(!p&&a.directTouch)&&m(a.options.enableMouseTracking,!0)&&!a.noSharedTooltip}),
n.forEach(function(a){var b=v(a.points,function(a){return a.x===f.x&&!a.isNull});g(b)&&(t&&(b=a.getPoint(b)),l.push(b))})):l.push(f));return{hoverPoint:f,hoverSeries:b,hoverPoints:l}},runPointActions:function(b,f){var c=this.chart,d=c.tooltip&&c.tooltip.options.enabled?c.tooltip:void 0,l=d?d.shared:!1,g=f||c.hoverPoint,p=g&&g.series||c.hoverSeries,p=this.getHoverData(g,p,c.series,"touchmove"!==b.type&&(!!f||p&&p.directTouch&&this.isDirectTouch),l,b,{isBoosting:c.isBoosting}),k,g=p.hoverPoint;k=p.hoverPoints;
f=(p=p.hoverSeries)&&p.tooltipOptions.followPointer;l=l&&p&&!p.noSharedTooltip;if(g&&(g!==c.hoverPoint||d&&d.isHidden)){(c.hoverPoints||[]).forEach(function(a){-1===k.indexOf(a)&&a.setState()});(k||[]).forEach(function(a){a.setState("hover")});if(c.hoverSeries!==p)p.onMouseOver();c.hoverPoint&&c.hoverPoint.firePointEvent("mouseOut");if(!g.series)return;g.firePointEvent("mouseOver");c.hoverPoints=k;c.hoverPoint=g;d&&d.refresh(l?k:g,b)}else f&&d&&!d.isHidden&&(g=d.getAnchor([{}],b),d.updatePosition({plotX:g[0],
plotY:g[1]}));this.unDocMouseMove||(this.unDocMouseMove=y(c.container.ownerDocument,"mousemove",function(b){var f=E[a.hoverChartIndex];if(f)f.pointer.onDocumentMouseMove(b)}));c.axes.forEach(function(f){var c=m(f.crosshair.snap,!0),d=c?a.find(k,function(a){return a.series[f.coll]===f}):void 0;d||!c?f.drawCrosshair(b,d):f.hideCrosshair()})},reset:function(a,b){var f=this.chart,c=f.hoverSeries,d=f.hoverPoint,l=f.hoverPoints,g=f.tooltip,k=g&&g.shared?l:d;a&&k&&p(k).forEach(function(b){b.series.isCartesian&&
void 0===b.plotX&&(a=!1)});if(a)g&&k&&(g.refresh(k),g.shared&&l?l.forEach(function(a){a.setState(a.state,!0);a.series.isCartesian&&(a.series.xAxis.crosshair&&a.series.xAxis.drawCrosshair(null,a),a.series.yAxis.crosshair&&a.series.yAxis.drawCrosshair(null,a))}):d&&(d.setState(d.state,!0),f.axes.forEach(function(a){a.crosshair&&a.drawCrosshair(null,d)})));else{if(d)d.onMouseOut();l&&l.forEach(function(a){a.setState()});if(c)c.onMouseOut();g&&g.hide(b);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());
f.axes.forEach(function(a){a.hideCrosshair()});this.hoverX=f.hoverPoints=f.hoverPoint=null}},scaleGroups:function(a,b){var f=this.chart,c;f.series.forEach(function(d){c=a||d.getPlotBox();d.xAxis&&d.xAxis.zoomEnabled&&d.group&&(d.group.attr(c),d.markerGroup&&(d.markerGroup.attr(c),d.markerGroup.clip(b?f.clipRect:null)),d.dataLabelsGroup&&d.dataLabelsGroup.attr(c))});f.clipRect.attr(b||f.clipBox)},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=
a.chartX;b.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,c=b.options.chart,d=a.chartX,l=a.chartY,g=this.zoomHor,p=this.zoomVert,k=b.plotLeft,m=b.plotTop,D=b.plotWidth,C=b.plotHeight,e,q=this.selectionMarker,n=this.mouseDownX,r=this.mouseDownY,u=c.panKey&&a[c.panKey+"Key"];q&&q.touch||(d<k?d=k:d>k+D&&(d=k+D),l<m?l=m:l>m+C&&(l=m+C),this.hasDragged=Math.sqrt(Math.pow(n-d,2)+Math.pow(r-l,2)),10<this.hasDragged&&(e=b.isInsidePlot(n-k,r-m),b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&
e&&!u&&!q&&(this.selectionMarker=q=b.renderer.rect(k,m,g?1:D,p?1:C,0).attr({"class":"highcharts-selection-marker",zIndex:7}).add(),b.styledMode||q.attr({fill:c.selectionMarkerFill||h("#335cad").setOpacity(.25).get()})),q&&g&&(d-=n,q.attr({width:Math.abs(d),x:(0<d?0:d)+n})),q&&p&&(d=l-r,q.attr({height:Math.abs(d),y:(0<d?0:d)+r})),e&&!q&&c.panning&&b.pan(a,c.panning)))},drop:function(a){var b=this,c=this.chart,l=this.hasPinched;if(this.selectionMarker){var g={originalEvent:a,xAxis:[],yAxis:[]},p=this.selectionMarker,
m=p.attr?p.attr("x"):p.x,k=p.attr?p.attr("y"):p.y,A=p.attr?p.attr("width"):p.width,D=p.attr?p.attr("height"):p.height,h;if(this.hasDragged||l)c.axes.forEach(function(e){if(e.zoomEnabled&&r(e.min)&&(l||b[{xAxis:"zoomX",yAxis:"zoomY"}[e.coll]])){var f=e.horiz,c="touchend"===a.type?e.minPixelPadding:0,d=e.toValue((f?m:k)+c),f=e.toValue((f?m+A:k+D)-c);g[e.coll].push({axis:e,min:Math.min(d,f),max:Math.max(d,f)});h=!0}}),h&&w(c,"selection",g,function(a){c.zoom(u(a,l?{animation:!1}:null))});n(c.index)&&
(this.selectionMarker=this.selectionMarker.destroy());l&&this.scaleGroups()}c&&n(c.index)&&(d(c.container,{cursor:c._cursor}),c.cancelClick=10<this.hasDragged,c.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[])},onContainerMouseDown:function(a){a=this.normalize(a);2!==a.button&&(this.zoomOption(a),a.preventDefault&&a.preventDefault(),this.dragStart(a))},onDocumentMouseUp:function(b){E[a.hoverChartIndex]&&E[a.hoverChartIndex].pointer.drop(b)},onDocumentMouseMove:function(a){var b=this.chart,
c=this.chartPosition;a=this.normalize(a,c);!c||this.inClass(a.target,"highcharts-tracker")||b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)||this.reset()},onContainerMouseLeave:function(b){var f=E[a.hoverChartIndex];f&&(b.relatedTarget||b.toElement)&&(f.pointer.reset(),f.pointer.chartPosition=null)},onContainerMouseMove:function(b){var f=this.chart;r(a.hoverChartIndex)&&E[a.hoverChartIndex]&&E[a.hoverChartIndex].mouseIsDown||(a.hoverChartIndex=f.index);b=this.normalize(b);b.returnValue=!1;
"mousedown"===f.mouseIsDown&&this.drag(b);!this.inClass(b.target,"highcharts-tracker")&&!f.isInsidePlot(b.chartX-f.plotLeft,b.chartY-f.plotTop)||f.openMenu||this.runPointActions(b)},inClass:function(a,b){for(var f;a;){if(f=G(a,"class")){if(-1!==f.indexOf(b))return!0;if(-1!==f.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;this.isDirectTouch=!1;if(!(!b||!a||b.stickyTracking||this.inClass(a,"highcharts-tooltip")||
this.inClass(a,"highcharts-series-"+b.index)&&this.inClass(a,"highcharts-tracker")))b.onMouseOut()},onContainerClick:function(a){var b=this.chart,c=b.hoverPoint,d=b.plotLeft,l=b.plotTop;a=this.normalize(a);b.cancelClick||(c&&this.inClass(a.target,"highcharts-tracker")?(w(c.series,"click",u(a,{point:c})),b.hoverPoint&&c.firePointEvent("click",a)):(u(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-d,a.chartY-l)&&w(b,"click",a)))},setDOMEvents:function(){var b=this,f=b.chart.container,c=f.ownerDocument;
f.onmousedown=function(a){b.onContainerMouseDown(a)};f.onmousemove=function(a){b.onContainerMouseMove(a)};f.onclick=function(a){b.onContainerClick(a)};this.unbindContainerMouseLeave=y(f,"mouseleave",b.onContainerMouseLeave);a.unbindDocumentMouseUp||(a.unbindDocumentMouseUp=y(c,"mouseup",b.onDocumentMouseUp));a.hasTouch&&(f.ontouchstart=function(a){b.onContainerTouchStart(a)},f.ontouchmove=function(a){b.onContainerTouchMove(a)},a.unbindDocumentTouchEnd||(a.unbindDocumentTouchEnd=y(c,"touchend",b.onDocumentTouchEnd)))},
destroy:function(){var b=this;b.unDocMouseMove&&b.unDocMouseMove();this.unbindContainerMouseLeave();a.chartCount||(a.unbindDocumentMouseUp&&(a.unbindDocumentMouseUp=a.unbindDocumentMouseUp()),a.unbindDocumentTouchEnd&&(a.unbindDocumentTouchEnd=a.unbindDocumentTouchEnd()));clearInterval(b.tooltipTimeout);a.objectEach(b,function(a,c){b[c]=null})}}})(J);(function(a){var y=a.charts,G=a.extend,E=a.noop,h=a.pick;G(a.Pointer.prototype,{pinchTranslate:function(a,h,u,v,w,n){this.zoomHor&&this.pinchTranslateDirection(!0,
a,h,u,v,w,n);this.zoomVert&&this.pinchTranslateDirection(!1,a,h,u,v,w,n)},pinchTranslateDirection:function(a,h,u,v,w,n,g,c){var d=this.chart,p=a?"x":"y",b=a?"X":"Y",l="chart"+b,f=a?"width":"height",x=d["plot"+(a?"Left":"Top")],t,r,F=c||1,z=d.inverted,k=d.bounds[a?"h":"v"],A=1===h.length,D=h[0][l],C=u[0][l],e=!A&&h[1][l],q=!A&&u[1][l],L;u=function(){!A&&20<Math.abs(D-e)&&(F=c||Math.abs(C-q)/Math.abs(D-e));r=(x-C)/F+D;t=d["plot"+(a?"Width":"Height")]/F};u();h=r;h<k.min?(h=k.min,L=!0):h+t>k.max&&(h=
k.max-t,L=!0);L?(C-=.8*(C-g[p][0]),A||(q-=.8*(q-g[p][1])),u()):g[p]=[C,q];z||(n[p]=r-x,n[f]=t);n=z?1/F:F;w[f]=t;w[p]=h;v[z?a?"scaleY":"scaleX":"scale"+b]=F;v["translate"+b]=n*x+(C-n*D)},pinch:function(a){var d=this,u=d.chart,v=d.pinchDown,w=a.touches,n=w.length,g=d.lastValidTouch,c=d.hasZoom,m=d.selectionMarker,p={},b=1===n&&(d.inClass(a.target,"highcharts-tracker")&&u.runTrackerClick||d.runChartClick),l={};1<n&&(d.initiated=!0);c&&d.initiated&&!b&&a.preventDefault();[].map.call(w,function(a){return d.normalize(a)});
"touchstart"===a.type?([].forEach.call(w,function(a,b){v[b]={chartX:a.chartX,chartY:a.chartY}}),g.x=[v[0].chartX,v[1]&&v[1].chartX],g.y=[v[0].chartY,v[1]&&v[1].chartY],u.axes.forEach(function(a){if(a.zoomEnabled){var b=u.bounds[a.horiz?"h":"v"],f=a.minPixelPadding,c=a.toPixels(h(a.options.min,a.dataMin)),d=a.toPixels(h(a.options.max,a.dataMax)),l=Math.max(c,d);b.min=Math.min(a.pos,Math.min(c,d)-f);b.max=Math.max(a.pos+a.len,l+f)}}),d.res=!0):d.followTouchMove&&1===n?this.runPointActions(d.normalize(a)):
v.length&&(m||(d.selectionMarker=m=G({destroy:E,touch:!0},u.plotBox)),d.pinchTranslate(v,w,p,m,l,g),d.hasPinched=c,d.scaleGroups(p,l),d.res&&(d.res=!1,this.reset(!1,0)))},touch:function(d,r){var u=this.chart,v,w;if(u.index!==a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});a.hoverChartIndex=u.index;1===d.touches.length?(d=this.normalize(d),(w=u.isInsidePlot(d.chartX-u.plotLeft,d.chartY-u.plotTop))&&!u.openMenu?(r&&this.runPointActions(d),"touchmove"===d.type&&(r=this.pinchDown,v=r[0]?
4<=Math.sqrt(Math.pow(r[0].chartX-d.chartX,2)+Math.pow(r[0].chartY-d.chartY,2)):!1),h(v,!0)&&this.pinch(d)):r&&this.reset()):2===d.touches.length&&this.pinch(d)},onContainerTouchStart:function(a){this.zoomOption(a);this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(d){y[a.hoverChartIndex]&&y[a.hoverChartIndex].pointer.drop(d)}})})(J);(function(a){var y=a.addEvent,G=a.charts,E=a.css,h=a.doc,d=a.extend,r=a.noop,u=a.Pointer,v=a.removeEvent,w=a.win,n=a.wrap;
if(!a.hasTouch&&(w.PointerEvent||w.MSPointerEvent)){var g={},c=!!w.PointerEvent,m=function(){var b=[];b.item=function(a){return this[a]};a.objectEach(g,function(a){b.push({pageX:a.pageX,pageY:a.pageY,target:a.target})});return b},p=function(b,c,f,d){"touch"!==b.pointerType&&b.pointerType!==b.MSPOINTER_TYPE_TOUCH||!G[a.hoverChartIndex]||(d(b),d=G[a.hoverChartIndex].pointer,d[c]({type:f,target:b.currentTarget,preventDefault:r,touches:m()}))};d(u.prototype,{onContainerPointerDown:function(a){p(a,"onContainerTouchStart",
"touchstart",function(a){g[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},onContainerPointerMove:function(a){p(a,"onContainerTouchMove","touchmove",function(a){g[a.pointerId]={pageX:a.pageX,pageY:a.pageY};g[a.pointerId].target||(g[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){p(a,"onDocumentTouchEnd","touchend",function(a){delete g[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,c?"pointerdown":"MSPointerDown",this.onContainerPointerDown);
a(this.chart.container,c?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(h,c?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});n(u.prototype,"init",function(a,c,f){a.call(this,c,f);this.hasZoom&&E(c.container,{"-ms-touch-action":"none","touch-action":"none"})});n(u.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(y)});n(u.prototype,"destroy",function(a){this.batchMSEvents(v);a.call(this)})}})(J);(function(a){var y=a.addEvent,
G=a.css,E=a.discardElement,h=a.defined,d=a.fireEvent,r=a.isFirefox,u=a.marginNames,v=a.merge,w=a.pick,n=a.setAnimation,g=a.stableSort,c=a.win,m=a.wrap;a.Legend=function(a,b){this.init(a,b)};a.Legend.prototype={init:function(a,b){this.chart=a;this.setOptions(b);b.enabled&&(this.render(),y(this.chart,"endResize",function(){this.legend.positionCheckboxes()}),this.proximate?this.unchartrender=y(this.chart,"render",function(){this.legend.proximatePositions();this.legend.positionItems()}):this.unchartrender&&
this.unchartrender())},setOptions:function(a){var b=w(a.padding,8);this.options=a;this.chart.styledMode||(this.itemStyle=a.itemStyle,this.itemHiddenStyle=v(this.itemStyle,a.itemHiddenStyle));this.itemMarginTop=a.itemMarginTop||0;this.padding=b;this.initialItemY=b-5;this.symbolWidth=w(a.symbolWidth,16);this.pages=[];this.proximate="proximate"===a.layout&&!this.chart.inverted},update:function(a,b){var c=this.chart;this.setOptions(v(!0,this.options,a));this.destroy();c.isDirtyLegend=c.isDirtyBox=!0;
w(b,!0)&&c.redraw();d(this,"afterUpdate")},colorizeItem:function(a,b){a.legendGroup[b?"removeClass":"addClass"]("highcharts-legend-item-hidden");if(!this.chart.styledMode){var c=this.options,f=a.legendItem,g=a.legendLine,p=a.legendSymbol,m=this.itemHiddenStyle.color,c=b?c.itemStyle.color:m,h=b?a.color||m:m,n=a.options&&a.options.marker,k={fill:h};f&&f.css({fill:c,color:c});g&&g.attr({stroke:h});p&&(n&&p.isMarker&&(k=a.pointAttribs(),b||(k.stroke=k.fill=m)),p.attr(k))}d(this,"afterColorizeItem",{item:a,
visible:b})},positionItems:function(){this.allItems.forEach(this.positionItem,this);this.chart.isResizing||this.positionCheckboxes()},positionItem:function(a){var b=this.options,c=b.symbolPadding,b=!b.rtl,f=a._legendItemPos,d=f[0],f=f[1],g=a.checkbox;if((a=a.legendGroup)&&a.element)a[h(a.translateY)?"animate":"attr"]({translateX:b?d:this.legendWidth-d-2*c-4,translateY:f});g&&(g.x=d,g.y=f)},destroyItem:function(a){var b=a.checkbox;["legendItem","legendLine","legendSymbol","legendGroup"].forEach(function(b){a[b]&&
(a[b]=a[b].destroy())});b&&E(a.checkbox)},destroy:function(){function a(a){this[a]&&(this[a]=this[a].destroy())}this.getAllItems().forEach(function(b){["legendItem","legendGroup"].forEach(a,b)});"clipRect up down pager nav box title group".split(" ").forEach(a,this);this.display=null},positionCheckboxes:function(){var a=this.group&&this.group.alignAttr,b,c=this.clipHeight||this.legendHeight,f=this.titleHeight;a&&(b=a.translateY,this.allItems.forEach(function(d){var g=d.checkbox,l;g&&(l=b+f+g.y+(this.scrollOffset||
0)+3,G(g,{left:a.translateX+d.checkboxOffset+g.x-20+"px",top:l+"px",display:this.proximate||l>b-6&&l<b+c-6?"":"none"}))},this))},renderTitle:function(){var a=this.options,b=this.padding,c=a.title,f=0;c.text&&(this.title||(this.title=this.chart.renderer.label(c.text,b-3,b-4,null,null,null,a.useHTML,null,"legend-title").attr({zIndex:1}),this.chart.styledMode||this.title.css(c.style),this.title.add(this.group)),a=this.title.getBBox(),f=a.height,this.offsetWidth=a.width,this.contentGroup.attr({translateY:f}));
this.titleHeight=f},setText:function(c){var b=this.options;c.legendItem.attr({text:b.labelFormat?a.format(b.labelFormat,c,this.chart.time):b.labelFormatter.call(c)})},renderItem:function(a){var b=this.chart,c=b.renderer,f=this.options,d=this.symbolWidth,g=f.symbolPadding,p=this.itemStyle,m=this.itemHiddenStyle,h="horizontal"===f.layout?w(f.itemDistance,20):0,k=!f.rtl,A=a.legendItem,D=!a.series,n=!D&&a.series.drawLegendSymbol?a.series:a,e=n.options,e=this.createCheckboxForItem&&e&&e.showCheckbox,h=
d+g+h+(e?20:0),q=f.useHTML,r=a.options.className;A||(a.legendGroup=c.g("legend-item").addClass("highcharts-"+n.type+"-series highcharts-color-"+a.colorIndex+(r?" "+r:"")+(D?" highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),a.legendItem=A=c.text("",k?d+g:-g,this.baseline||0,q),b.styledMode||A.css(v(a.visible?p:m)),A.attr({align:k?"left":"right",zIndex:2}).add(a.legendGroup),this.baseline||(this.fontMetrics=c.fontMetrics(b.styledMode?12:p.fontSize,A),this.baseline=this.fontMetrics.f+
3+this.itemMarginTop,A.attr("y",this.baseline)),this.symbolHeight=f.symbolHeight||this.fontMetrics.f,n.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,A,q),e&&this.createCheckboxForItem(a));this.colorizeItem(a,a.visible);!b.styledMode&&p.width||A.css({width:(f.itemWidth||f.width||b.spacingBox.width)-h});this.setText(a);b=A.getBBox();a.itemWidth=a.checkboxOffset=f.itemWidth||a.legendItemWidth||b.width+h;this.maxItemWidth=Math.max(this.maxItemWidth,a.itemWidth);this.totalItemWidth+=
a.itemWidth;this.itemHeight=a.itemHeight=Math.round(a.legendItemHeight||b.height||this.symbolHeight)},layoutItem:function(a){var b=this.options,c=this.padding,f="horizontal"===b.layout,d=a.itemHeight,g=b.itemMarginBottom||0,p=this.itemMarginTop,m=f?w(b.itemDistance,20):0,h=b.width,k=h||this.chart.spacingBox.width-2*c-b.x,b=b.alignColumns&&this.totalItemWidth>k?this.maxItemWidth:a.itemWidth;f&&this.itemX-c+b>k&&(this.itemX=c,this.itemY+=p+this.lastLineHeight+g,this.lastLineHeight=0);this.lastItemY=
p+this.itemY+g;this.lastLineHeight=Math.max(d,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];f?this.itemX+=b:(this.itemY+=p+d+g,this.lastLineHeight=d);this.offsetWidth=h||Math.max((f?this.itemX-c-(a.checkbox?0:m):b)+c,this.offsetWidth)},getAllItems:function(){var a=[];this.chart.series.forEach(function(b){var c=b&&b.options;b&&w(c.showInLegend,h(c.linkedTo)?!1:void 0,!0)&&(a=a.concat(b.legendItems||("point"===c.legendType?b.data:b)))});d(this,"afterGetAllItems",{allItems:a});return a},
getAlignment:function(){var a=this.options;return this.proximate?a.align.charAt(0)+"tv":a.floating?"":a.align.charAt(0)+a.verticalAlign.charAt(0)+a.layout.charAt(0)},adjustMargins:function(a,b){var c=this.chart,f=this.options,d=this.getAlignment();d&&[/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/].forEach(function(g,l){g.test(d)&&!h(a[l])&&(c[u[l]]=Math.max(c[u[l]],c.legend[(l+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][l]*f[l%2?"x":"y"]+w(f.margin,12)+b[l]+(0===l&&void 0!==c.options.title.margin?
c.titleOffset+c.options.title.margin:0)))})},proximatePositions:function(){var c=this.chart,b=[],d="left"===this.options.align;this.allItems.forEach(function(f){var g,l;g=d;f.xAxis&&f.points&&(f.xAxis.options.reversed&&(g=!g),g=a.find(g?f.points:f.points.slice(0).reverse(),function(b){return a.isNumber(b.plotY)}),l=f.legendGroup.getBBox().height,b.push({target:f.visible?(g?g.plotY:f.xAxis.height)-.3*l:c.plotHeight,size:l,item:f}))},this);a.distribute(b,c.plotHeight);b.forEach(function(a){a.item._legendItemPos[1]=
c.plotTop-c.spacing[0]+a.pos})},render:function(){var a=this.chart,b=a.renderer,c=this.group,f,d,m,h=this.box,n=this.options,z=this.padding;this.itemX=z;this.itemY=this.initialItemY;this.lastItemY=this.offsetWidth=0;c||(this.group=c=b.g("legend").attr({zIndex:7}).add(),this.contentGroup=b.g().attr({zIndex:1}).add(c),this.scrollGroup=b.g().add(this.contentGroup));this.renderTitle();f=this.getAllItems();g(f,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||
0)});n.reversed&&f.reverse();this.allItems=f;this.display=d=!!f.length;this.itemHeight=this.totalItemWidth=this.maxItemWidth=this.lastLineHeight=0;f.forEach(this.renderItem,this);f.forEach(this.layoutItem,this);f=(n.width||this.offsetWidth)+z;m=this.lastItemY+this.lastLineHeight+this.titleHeight;m=this.handleOverflow(m);m+=z;h||(this.box=h=b.rect().addClass("highcharts-legend-box").attr({r:n.borderRadius}).add(c),h.isNew=!0);a.styledMode||h.attr({stroke:n.borderColor,"stroke-width":n.borderWidth||
0,fill:n.backgroundColor||"none"}).shadow(n.shadow);0<f&&0<m&&(h[h.isNew?"attr":"animate"](h.crisp.call({},{x:0,y:0,width:f,height:m},h.strokeWidth())),h.isNew=!1);h[d?"show":"hide"]();a.styledMode&&"none"===c.getStyle("display")&&(f=m=0);this.legendWidth=f;this.legendHeight=m;d&&(b=a.spacingBox,/(lth|ct|rth)/.test(this.getAlignment())&&(b=v(b,{y:b.y+a.titleOffset+a.options.title.margin})),c.align(v(n,{width:f,height:m,verticalAlign:this.proximate?"top":n.verticalAlign}),!0,b));this.proximate||this.positionItems()},
handleOverflow:function(a){var b=this,c=this.chart,f=c.renderer,d=this.options,g=d.y,m=this.padding,g=c.spacingBox.height+("top"===d.verticalAlign?-g:g)-m,p=d.maxHeight,h,k=this.clipRect,A=d.navigation,D=w(A.animation,!0),n=A.arrowSize||12,e=this.nav,q=this.pages,r,u=this.allItems,v=function(a){"number"===typeof a?k.attr({height:a}):k&&(b.clipRect=k.destroy(),b.contentGroup.clip());b.contentGroup.div&&(b.contentGroup.div.style.clip=a?"rect("+m+"px,9999px,"+(m+a)+"px,0)":"auto")};"horizontal"!==d.layout||
"middle"===d.verticalAlign||d.floating||(g/=2);p&&(g=Math.min(g,p));q.length=0;a>g&&!1!==A.enabled?(this.clipHeight=h=Math.max(g-20-this.titleHeight-m,0),this.currentPage=w(this.currentPage,1),this.fullHeight=a,u.forEach(function(a,b){var e=a._legendItemPos[1],c=Math.round(a.legendItem.getBBox().height),f=q.length;if(!f||e-q[f-1]>h&&(r||e)!==q[f-1])q.push(r||e),f++;a.pageIx=f-1;r&&(u[b-1].pageIx=f-1);b===u.length-1&&e+c-q[f-1]>h&&e!==r&&(q.push(e),a.pageIx=f);e!==r&&(r=e)}),k||(k=b.clipRect=f.clipRect(0,
m,9999,0),b.contentGroup.clip(k)),v(h),e||(this.nav=e=f.g().attr({zIndex:1}).add(this.group),this.up=f.symbol("triangle",0,0,n,n).on("click",function(){b.scroll(-1,D)}).add(e),this.pager=f.text("",15,10).addClass("highcharts-legend-navigation"),c.styledMode||this.pager.css(A.style),this.pager.add(e),this.down=f.symbol("triangle-down",0,0,n,n).on("click",function(){b.scroll(1,D)}).add(e)),b.scroll(0),a=g):e&&(v(),this.nav=e.destroy(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a},
scroll:function(a,b){var c=this.pages,f=c.length;a=this.currentPage+a;var d=this.clipHeight,g=this.options.navigation,m=this.pager,p=this.padding;a>f&&(a=f);0<a&&(void 0!==b&&n(b,this.chart),this.nav.attr({translateX:p,translateY:d+this.padding+7+this.titleHeight,visibility:"visible"}),this.up.attr({"class":1===a?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),m.attr({text:a+"/"+f}),this.down.attr({x:18+this.pager.getBBox().width,"class":a===f?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"}),
this.chart.styledMode||(this.up.attr({fill:1===a?g.inactiveColor:g.activeColor}).css({cursor:1===a?"default":"pointer"}),this.down.attr({fill:a===f?g.inactiveColor:g.activeColor}).css({cursor:a===f?"default":"pointer"})),this.scrollOffset=-c[a-1]+this.initialItemY,this.scrollGroup.animate({translateY:this.scrollOffset}),this.currentPage=a,this.positionCheckboxes())}};a.LegendSymbolMixin={drawRectangle:function(a,b){var c=a.symbolHeight,f=a.options.squareSymbol;b.legendSymbol=this.chart.renderer.rect(f?
(a.symbolWidth-c)/2:0,a.baseline-c+1,f?c:a.symbolWidth,c,w(a.options.symbolRadius,c/2)).addClass("highcharts-point").attr({zIndex:3}).add(b.legendGroup)},drawLineMarker:function(a){var b=this.options,c=b.marker,f=a.symbolWidth,d=a.symbolHeight,g=d/2,m=this.chart.renderer,p=this.legendGroup;a=a.baseline-Math.round(.3*a.fontMetrics.b);var h={};this.chart.styledMode||(h={"stroke-width":b.lineWidth||0},b.dashStyle&&(h.dashstyle=b.dashStyle));this.legendLine=m.path(["M",0,a,"L",f,a]).addClass("highcharts-graph").attr(h).add(p);
c&&!1!==c.enabled&&f&&(b=Math.min(w(c.radius,g),g),0===this.symbol.indexOf("url")&&(c=v(c,{width:d,height:d}),b=0),this.legendSymbol=c=m.symbol(this.symbol,f/2-b,a-b,2*b,2*b,c).addClass("highcharts-point").add(p),c.isMarker=!0)}};(/Trident\/7\.0/.test(c.navigator.userAgent)||r)&&m(a.Legend.prototype,"positionItem",function(a,b){var c=this,f=function(){b._legendItemPos&&a.call(c,b)};f();c.bubbleLegend||setTimeout(f)})})(J);(function(a){var y=a.addEvent,G=a.animate,E=a.animObject,h=a.attr,d=a.doc,r=
a.Axis,u=a.createElement,v=a.defaultOptions,w=a.discardElement,n=a.charts,g=a.css,c=a.defined,m=a.extend,p=a.find,b=a.fireEvent,l=a.isNumber,f=a.isObject,x=a.isString,t=a.Legend,H=a.marginNames,F=a.merge,z=a.objectEach,k=a.Pointer,A=a.pick,D=a.pInt,C=a.removeEvent,e=a.seriesTypes,q=a.splat,L=a.syncTimeout,I=a.win,R=a.Chart=function(){this.getArgs.apply(this,arguments)};a.chart=function(a,b,e){return new R(a,b,e)};m(R.prototype,{callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(x(a[0])||
a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(e,c){var f,k,d=e.series,g=e.plotOptions||{};b(this,"init",{args:arguments},function(){e.series=null;f=F(v,e);for(k in f.plotOptions)f.plotOptions[k].tooltip=g[k]&&F(g[k].tooltip)||void 0;f.tooltip.userOptions=e.chart&&e.chart.forExport&&e.tooltip.userOptions||e.tooltip;f.series=e.series=d;this.userOptions=e;var q=f.chart,l=q.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.labelCollectors=[];this.callback=
c;this.isResizing=0;this.options=f;this.axes=[];this.series=[];this.time=e.time&&Object.keys(e.time).length?new a.Time(e.time):a.time;this.styledMode=q.styledMode;this.hasCartesianSeries=q.showAxes;var m=this;m.index=n.length;n.push(m);a.chartCount++;l&&z(l,function(a,b){y(m,b,a)});m.xAxis=[];m.yAxis=[];m.pointCount=m.colorCounter=m.symbolCounter=0;b(m,"afterInit");m.firstRender()})},initSeries:function(b){var c=this.options.chart;(c=e[b.type||c.type||c.defaultSeriesType])||a.error(17,!0,this);c=
new c;c.init(this,b);return c},orderSeries:function(a){var b=this.series;for(a=a||0;a<b.length;a++)b[a]&&(b[a].index=a,b[a].name=b[a].getName())},isInsidePlot:function(a,b,e){var c=e?b:a;a=e?a:b;return 0<=c&&c<=this.plotWidth&&0<=a&&a<=this.plotHeight},redraw:function(e){b(this,"beforeRedraw");var c=this.axes,f=this.series,k=this.pointer,d=this.legend,g=this.userOptions.legend,q=this.isDirtyLegend,l,p,A=this.hasCartesianSeries,h=this.isDirtyBox,D,t=this.renderer,n=t.isHidden(),C=[];this.setResponsive&&
this.setResponsive(!1);a.setAnimation(e,this);n&&this.temporaryDisplay();this.layOutTitles();for(e=f.length;e--;)if(D=f[e],D.options.stacking&&(l=!0,D.isDirty)){p=!0;break}if(p)for(e=f.length;e--;)D=f[e],D.options.stacking&&(D.isDirty=!0);f.forEach(function(a){a.isDirty&&("point"===a.options.legendType?(a.updateTotals&&a.updateTotals(),q=!0):g&&(g.labelFormatter||g.labelFormat)&&(q=!0));a.isDirtyData&&b(a,"updatedData")});q&&d&&d.options.enabled&&(d.render(),this.isDirtyLegend=!1);l&&this.getStacks();
A&&c.forEach(function(a){a.updateNames();a.updateYNames&&a.updateYNames();a.setScale()});this.getMargins();A&&(c.forEach(function(a){a.isDirty&&(h=!0)}),c.forEach(function(a){var e=a.min+","+a.max;a.extKey!==e&&(a.extKey=e,C.push(function(){b(a,"afterSetExtremes",m(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(h||l)&&a.redraw()}));h&&this.drawChartBox();b(this,"predraw");f.forEach(function(a){(h||a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1});k&&k.reset(!0);t.draw();b(this,"redraw");
b(this,"render");n&&this.temporaryDisplay(!0);C.forEach(function(a){a.call()})},get:function(a){function b(b){return b.id===a||b.options&&b.options.id===a}var e,c=this.series,f;e=p(this.axes,b)||p(this.series,b);for(f=0;!e&&f<c.length;f++)e=p(c[f].points||[],b);return e},getAxes:function(){var a=this,e=this.options,c=e.xAxis=q(e.xAxis||{}),e=e.yAxis=q(e.yAxis||{});b(this,"getAxes");c.forEach(function(a,b){a.index=b;a.isX=!0});e.forEach(function(a,b){a.index=b});c.concat(e).forEach(function(b){new r(a,
b)});b(this,"afterGetAxes")},getSelectedPoints:function(){var a=[];this.series.forEach(function(b){a=a.concat((b.data||[]).filter(function(a){return a.selected}))});return a},getSelectedSeries:function(){return this.series.filter(function(a){return a.selected})},setTitle:function(a,b,e){var c=this,f=c.options,k=c.styledMode,d;d=f.title=F(!k&&{style:{color:"#333333",fontSize:f.isStock?"16px":"18px"}},f.title,a);f=f.subtitle=F(!k&&{style:{color:"#666666"}},f.subtitle,b);[["title",a,d],["subtitle",b,
f]].forEach(function(a,b){var e=a[0],f=c[e],d=a[1];a=a[2];f&&d&&(c[e]=f=f.destroy());a&&!f&&(c[e]=c.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+e,zIndex:a.zIndex||4}).add(),c[e].update=function(a){c.setTitle(!b&&a,b&&a)},k||c[e].css(a.style))});c.layOutTitles(e)},layOutTitles:function(a){var b=0,e,c=this.renderer,f=this.spacingBox;["title","subtitle"].forEach(function(a){var e=this[a],k=this.options[a];a="title"===a?-3:k.verticalAlign?0:b+2;var d;e&&(this.styledMode||
(d=k.style.fontSize),d=c.fontMetrics(d,e).b,e.css({width:(k.width||f.width+k.widthAdjust)+"px"}).align(m({y:a+d},k),!1,"spacingBox"),k.floating||k.verticalAlign||(b=Math.ceil(b+e.getBBox(k.useHTML).height)))},this);e=this.titleOffset!==b;this.titleOffset=b;!this.isDirtyBox&&e&&(this.isDirtyBox=this.isDirtyLegend=e,this.hasRendered&&A(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var b=this.options.chart,e=b.width,b=b.height,f=this.renderTo;c(e)||(this.containerWidth=a.getStyle(f,
"width"));c(b)||(this.containerHeight=a.getStyle(f,"height"));this.chartWidth=Math.max(0,e||this.containerWidth||600);this.chartHeight=Math.max(0,a.relativeLength(b,this.chartWidth)||(1<this.containerHeight?this.containerHeight:400))},temporaryDisplay:function(b){var e=this.renderTo;if(b)for(;e&&e.style;)e.hcOrigStyle&&(a.css(e,e.hcOrigStyle),delete e.hcOrigStyle),e.hcOrigDetached&&(d.body.removeChild(e),e.hcOrigDetached=!1),e=e.parentNode;else for(;e&&e.style;){d.body.contains(e)||e.parentNode||
(e.hcOrigDetached=!0,d.body.appendChild(e));if("none"===a.getStyle(e,"display",!1)||e.hcOricDetached)e.hcOrigStyle={display:e.style.display,height:e.style.height,overflow:e.style.overflow},b={display:"block",overflow:"hidden"},e!==this.renderTo&&(b.height=0),a.css(e,b),e.offsetWidth||e.style.setProperty("display","block","important");e=e.parentNode;if(e===d.body)break}},setClassName:function(a){this.container.className="highcharts-container "+(a||"")},getContainer:function(){var e,c=this.options,
f=c.chart,k,q;e=this.renderTo;var p=a.uniqueKey(),A,t;e||(this.renderTo=e=f.renderTo);x(e)&&(this.renderTo=e=d.getElementById(e));e||a.error(13,!0,this);k=D(h(e,"data-highcharts-chart"));l(k)&&n[k]&&n[k].hasRendered&&n[k].destroy();h(e,"data-highcharts-chart",this.index);e.innerHTML="";f.skipClone||e.offsetWidth||this.temporaryDisplay();this.getChartSize();k=this.chartWidth;q=this.chartHeight;g(e,{overflow:"hidden"});this.styledMode||(A=m({position:"relative",overflow:"hidden",width:k+"px",height:q+
"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},f.style));this.container=e=u("div",{id:p},A,e);this._cursor=e.style.cursor;this.renderer=new (a[f.renderer]||a.Renderer)(e,k,q,null,f.forExport,c.exporting&&c.exporting.allowHTML,this.styledMode);this.setClassName(f.className);if(this.styledMode)for(t in c.defs)this.renderer.definition(c.defs[t]);else this.renderer.setStyle(f.style);this.renderer.chartIndex=this.index;b(this,"afterGetContainer")},getMargins:function(a){var e=
this.spacing,f=this.margin,k=this.titleOffset;this.resetMargins();k&&!c(f[0])&&(this.plotTop=Math.max(this.plotTop,k+this.options.title.margin+e[0]));this.legend&&this.legend.display&&this.legend.adjustMargins(f,e);b(this,"getMargins");a||this.getAxisMargins()},getAxisMargins:function(){var a=this,b=a.axisOffset=[0,0,0,0],e=a.margin;a.hasCartesianSeries&&a.axes.forEach(function(a){a.visible&&a.getOffset()});H.forEach(function(f,k){c(e[k])||(a[f]+=b[k])});a.setChartSize()},reflow:function(b){var e=
this,f=e.options.chart,k=e.renderTo,g=c(f.width)&&c(f.height),q=f.width||a.getStyle(k,"width"),f=f.height||a.getStyle(k,"height"),k=b?b.target:I;if(!g&&!e.isPrinting&&q&&f&&(k===I||k===d)){if(q!==e.containerWidth||f!==e.containerHeight)a.clearTimeout(e.reflowTimeout),e.reflowTimeout=L(function(){e.container&&e.setSize(void 0,void 0,!1)},b?100:0);e.containerWidth=q;e.containerHeight=f}},setReflow:function(a){var b=this;!1===a||this.unbindReflow?!1===a&&this.unbindReflow&&(this.unbindReflow=this.unbindReflow()):
(this.unbindReflow=y(I,"resize",function(a){b.reflow(a)}),y(this,"destroy",this.unbindReflow))},setSize:function(e,c,f){var k=this,d=k.renderer,q;k.isResizing+=1;a.setAnimation(f,k);k.oldChartHeight=k.chartHeight;k.oldChartWidth=k.chartWidth;void 0!==e&&(k.options.chart.width=e);void 0!==c&&(k.options.chart.height=c);k.getChartSize();k.styledMode||(q=d.globalAnimation,(q?G:g)(k.container,{width:k.chartWidth+"px",height:k.chartHeight+"px"},q));k.setChartSize(!0);d.setSize(k.chartWidth,k.chartHeight,
f);k.axes.forEach(function(a){a.isDirty=!0;a.setScale()});k.isDirtyLegend=!0;k.isDirtyBox=!0;k.layOutTitles();k.getMargins();k.redraw(f);k.oldChartHeight=null;b(k,"resize");L(function(){k&&b(k,"endResize",null,function(){--k.isResizing})},E(q).duration)},setChartSize:function(a){var e=this.inverted,c=this.renderer,f=this.chartWidth,k=this.chartHeight,d=this.options.chart,g=this.spacing,q=this.clipOffset,l,m,p,A;this.plotLeft=l=Math.round(this.plotLeft);this.plotTop=m=Math.round(this.plotTop);this.plotWidth=
p=Math.max(0,Math.round(f-l-this.marginRight));this.plotHeight=A=Math.max(0,Math.round(k-m-this.marginBottom));this.plotSizeX=e?A:p;this.plotSizeY=e?p:A;this.plotBorderWidth=d.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:g[3],y:g[0],width:f-g[3]-g[1],height:k-g[0]-g[2]};this.plotBox=c.plotBox={x:l,y:m,width:p,height:A};f=2*Math.floor(this.plotBorderWidth/2);e=Math.ceil(Math.max(f,q[3])/2);c=Math.ceil(Math.max(f,q[0])/2);this.clipBox={x:e,y:c,width:Math.floor(this.plotSizeX-Math.max(f,q[1])/
2-e),height:Math.max(0,Math.floor(this.plotSizeY-Math.max(f,q[2])/2-c))};a||this.axes.forEach(function(a){a.setAxisSize();a.setAxisTranslation()});b(this,"afterSetChartSize",{skipAxes:a})},resetMargins:function(){b(this,"resetMargins");var a=this,e=a.options.chart;["margin","spacing"].forEach(function(b){var c=e[b],k=f(c)?c:[c,c,c,c];["Top","Right","Bottom","Left"].forEach(function(c,f){a[b][f]=A(e[b+c],k[f])})});H.forEach(function(b,e){a[b]=A(a.margin[e],a.spacing[e])});a.axisOffset=[0,0,0,0];a.clipOffset=
[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,e=this.renderer,c=this.chartWidth,f=this.chartHeight,k=this.chartBackground,d=this.plotBackground,g=this.plotBorder,q,l=this.styledMode,m=this.plotBGImage,p=a.backgroundColor,A=a.plotBackgroundColor,h=a.plotBackgroundImage,D,t=this.plotLeft,n=this.plotTop,C=this.plotWidth,x=this.plotHeight,r=this.plotBox,z=this.clipRect,u=this.clipBox,v="animate";k||(this.chartBackground=k=e.rect().addClass("highcharts-background").add(),v="attr");if(l)q=
D=k.strokeWidth();else{q=a.borderWidth||0;D=q+(a.shadow?8:0);p={fill:p||"none"};if(q||k["stroke-width"])p.stroke=a.borderColor,p["stroke-width"]=q;k.attr(p).shadow(a.shadow)}k[v]({x:D/2,y:D/2,width:c-D-q%2,height:f-D-q%2,r:a.borderRadius});v="animate";d||(v="attr",this.plotBackground=d=e.rect().addClass("highcharts-plot-background").add());d[v](r);l||(d.attr({fill:A||"none"}).shadow(a.plotShadow),h&&(m?m.animate(r):this.plotBGImage=e.image(h,t,n,C,x).add()));z?z.animate({width:u.width,height:u.height}):
this.clipRect=e.clipRect(u);v="animate";g||(v="attr",this.plotBorder=g=e.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());l||g.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||0,fill:"none"});g[v](g.crisp({x:t,y:n,width:C,height:x},-g.strokeWidth()));this.isDirtyBox=!1;b(this,"afterDrawChartBox")},propFromSeries:function(){var a=this,b=a.options.chart,c,f=a.options.series,k,d;["inverted","angular","polar"].forEach(function(g){c=e[b.type||b.defaultSeriesType];d=b[g]||
c&&c.prototype[g];for(k=f&&f.length;!d&&k--;)(c=e[f[k].type])&&c.prototype[g]&&(d=!0);a[g]=d})},linkSeries:function(){var a=this,e=a.series;e.forEach(function(a){a.linkedSeries.length=0});e.forEach(function(b){var e=b.options.linkedTo;x(e)&&(e=":previous"===e?a.series[b.index-1]:a.get(e))&&e.linkedParent!==b&&(e.linkedSeries.push(b),b.linkedParent=e,b.visible=A(b.options.visible,e.options.visible,b.visible))});b(this,"afterLinkSeries")},renderSeries:function(){this.series.forEach(function(a){a.translate();
a.render()})},renderLabels:function(){var a=this,b=a.options.labels;b.items&&b.items.forEach(function(e){var c=m(b.style,e.style),f=D(c.left)+a.plotLeft,k=D(c.top)+a.plotTop+12;delete c.left;delete c.top;a.renderer.text(e.html,f,k).attr({zIndex:2}).css(c).add()})},render:function(){var a=this.axes,b=this.renderer,e=this.options,c,f,k;this.setTitle();this.legend=new t(this,e.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();e=this.plotWidth;c=this.plotHeight=Math.max(this.plotHeight-
21,0);a.forEach(function(a){a.setScale()});this.getAxisMargins();f=1.1<e/this.plotWidth;k=1.05<c/this.plotHeight;if(f||k)a.forEach(function(a){(a.horiz&&f||!a.horiz&&k)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&a.forEach(function(a){a.visible&&a.render()});this.seriesGroup||(this.seriesGroup=b.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0},
addCredits:function(a){var b=this;a=F(!0,this.options.credits,a);a.enabled&&!this.credits&&(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&(I.location.href=a.href)}).attr({align:a.position.align,zIndex:8}),b.styledMode||this.credits.css(a.style),this.credits.add().align(a.position),this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a)})},destroy:function(){var e=this,c=e.axes,f=e.series,k=e.container,
d,g=k&&k.parentNode;b(e,"destroy");e.renderer.forExport?a.erase(n,e):n[e.index]=void 0;a.chartCount--;e.renderTo.removeAttribute("data-highcharts-chart");C(e);for(d=c.length;d--;)c[d]=c[d].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(d=f.length;d--;)f[d]=f[d].destroy();"title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function(a){var b=e[a];
b&&b.destroy&&(e[a]=b.destroy())});k&&(k.innerHTML="",C(k),g&&w(k));z(e,function(a,b){delete e[b]})},firstRender:function(){var a=this,e=a.options;if(!a.isReadyToRender||a.isReadyToRender()){a.getContainer();a.resetMargins();a.setChartSize();a.propFromSeries();a.getAxes();(e.series||[]).forEach(function(b){a.initSeries(b)});a.linkSeries();b(a,"beforeRender");k&&(a.pointer=new k(a,e));a.render();if(!a.renderer.imgCount&&a.onload)a.onload();a.temporaryDisplay(!0)}},onload:function(){[this.callback].concat(this.callbacks).forEach(function(a){a&&
void 0!==this.index&&a.apply(this,[this])},this);b(this,"load");b(this,"render");c(this.index)&&this.setReflow(this.options.chart.reflow);this.onload=null}})})(J);(function(a){var y=a.addEvent,G=a.Chart;y(G,"afterSetChartSize",function(y){var h=this.options.chart.scrollablePlotArea;(h=h&&h.minWidth)&&!this.renderer.forExport&&(this.scrollablePixels=h=Math.max(0,h-this.chartWidth))&&(this.plotWidth+=h,this.clipBox.width+=h,y.skipAxes||this.axes.forEach(function(d){1===d.side?d.getPlotLinePath=function(){var h=
this.right,u;this.right=h-d.chart.scrollablePixels;u=a.Axis.prototype.getPlotLinePath.apply(this,arguments);this.right=h;return u}:(d.setAxisSize(),d.setAxisTranslation())}))});y(G,"render",function(){this.scrollablePixels?(this.setUpScrolling&&this.setUpScrolling(),this.applyFixed()):this.fixedDiv&&this.applyFixed()});G.prototype.setUpScrolling=function(){this.scrollingContainer=a.createElement("div",{className:"highcharts-scrolling"},{overflowX:"auto",WebkitOverflowScrolling:"touch"},this.renderTo);
this.innerContainer=a.createElement("div",{className:"highcharts-inner-container"},null,this.scrollingContainer);this.innerContainer.appendChild(this.container);this.setUpScrolling=null};G.prototype.applyFixed=function(){var y=this.container,h,d,r=!this.fixedDiv;r&&(this.fixedDiv=a.createElement("div",{className:"highcharts-fixed"},{position:"absolute",overflow:"hidden",pointerEvents:"none",zIndex:2},null,!0),this.renderTo.insertBefore(this.fixedDiv,this.renderTo.firstChild),this.fixedRenderer=h=
new a.Renderer(this.fixedDiv,0,0),this.scrollableMask=h.path().attr({fill:a.color(this.options.chart.backgroundColor||"#fff").setOpacity(.85).get(),zIndex:-1}).addClass("highcharts-scrollable-mask").add(),[this.inverted?".highcharts-xaxis":".highcharts-yaxis",this.inverted?".highcharts-xaxis-labels":".highcharts-yaxis-labels",".highcharts-contextbutton",".highcharts-credits",".highcharts-legend",".highcharts-subtitle",".highcharts-title",".highcharts-legend-checkbox"].forEach(function(a){[].forEach.call(y.querySelectorAll(a),
function(a){(a.namespaceURI===h.SVG_NS?h.box:h.box.parentNode).appendChild(a);a.style.pointerEvents="auto"})}));this.fixedRenderer.setSize(this.chartWidth,this.chartHeight);d=this.chartWidth+this.scrollablePixels;a.stop(this.container);this.container.style.width=d+"px";this.renderer.boxWrapper.attr({width:d,height:this.chartHeight,viewBox:[0,0,d,this.chartHeight].join(" ")});this.chartBackground.attr({width:d});r&&(d=this.options.chart.scrollablePlotArea,d.scrollPositionX&&(this.scrollingContainer.scrollLeft=
this.scrollablePixels*d.scrollPositionX));r=this.axisOffset;d=this.plotTop-r[0]-1;var r=this.plotTop+this.plotHeight+r[2],u=this.plotLeft+this.plotWidth-this.scrollablePixels;this.scrollableMask.attr({d:this.scrollablePixels?["M",0,d,"L",this.plotLeft-1,d,"L",this.plotLeft-1,r,"L",0,r,"Z","M",u,d,"L",this.chartWidth,d,"L",this.chartWidth,r,"L",u,r,"Z"]:["M",0,0]})}})(J);(function(a){var y,G=a.extend,E=a.erase,h=a.fireEvent,d=a.format,r=a.isArray,u=a.isNumber,v=a.pick,w=a.uniqueKey,n=a.defined,g=a.removeEvent;
a.Point=y=function(){};a.Point.prototype={init:function(a,d,g){var b;b=a.chart.options.chart.colorCount;var c=a.chart.styledMode;this.series=a;c||(this.color=a.color);this.applyOptions(d,g);this.id=n(this.id)?this.id:w();a.options.colorByPoint?(c||(b=a.options.colors||a.chart.options.colors,this.color=this.color||b[a.colorCounter],b=b.length),d=a.colorCounter,a.colorCounter++,a.colorCounter===b&&(a.colorCounter=0)):d=a.colorIndex;this.colorIndex=v(this.colorIndex,d);a.chart.pointCount++;h(this,"afterInit");
return this},applyOptions:function(a,d){var c=this.series,b=c.options.pointValKey||c.pointValKey;a=y.prototype.optionsToObject.call(this,a);G(this,a);this.options=this.options?G(this.options,a):a;a.group&&delete this.group;a.dataLabels&&delete this.dataLabels;b&&(this.y=this[b]);this.isNull=v(this.isValid&&!this.isValid(),null===this.x||!u(this.y,!0));this.selected&&(this.state="select");"name"in this&&void 0===d&&c.xAxis&&c.xAxis.hasNames&&(this.x=c.xAxis.nameToX(this));void 0===this.x&&c&&(this.x=
void 0===d?c.autoIncrement(this):d);return this},setNestedProperty:function(c,d,g){g.split(".").reduce(function(b,c,f,g){b[c]=g.length-1===f?d:a.isObject(b[c],!0)?b[c]:{};return b[c]},c);return c},optionsToObject:function(c){var d={},g=this.series,b=g.options.keys,l=b||g.pointArrayMap||["y"],f=l.length,h=0,t=0;if(u(c)||null===c)d[l[0]]=c;else if(r(c))for(!b&&c.length>f&&(g=typeof c[0],"string"===g?d.name=c[0]:"number"===g&&(d.x=c[0]),h++);t<f;)b&&void 0===c[h]||(0<l[t].indexOf(".")?a.Point.prototype.setNestedProperty(d,
c[h],l[t]):d[l[t]]=c[h]),h++,t++;else"object"===typeof c&&(d=c,c.dataLabels&&(g._hasPointLabels=!0),c.marker&&(g._hasPointMarkers=!0));return d},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":"")+(this.isNull?" highcharts-null-point":"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?" "+this.zone.className.replace("highcharts-negative",
""):"")},getZone:function(){var a=this.series,d=a.zones,a=a.zoneAxis||"y",g=0,b;for(b=d[g];this[a]>=b.value;)b=d[++g];this.nonZonedColor||(this.nonZonedColor=this.color);this.color=b&&b.color&&!this.options.color?b.color:this.nonZonedColor;return b},destroy:function(){var a=this.series.chart,d=a.hoverPoints,h;a.pointCount--;d&&(this.setState(),E(d,this),d.length||(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel||this.dataLabels)g(this),this.destroyElements();
this.legendItem&&a.legend.destroyItem(this);for(h in this)this[h]=null},destroyElements:function(){for(var a=["graphic","dataLabel","dataLabelUpper","connector","shadowGroup"],d,g=6;g--;)d=a[g],this[d]&&(this[d]=this[d].destroy());this.dataLabels&&(this.dataLabels.forEach(function(a){a.element&&a.destroy()}),delete this.dataLabels);this.connectors&&(this.connectors.forEach(function(a){a.element&&a.destroy()}),delete this.connectors)},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,
colorIndex:this.colorIndex,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var c=this.series,g=c.tooltipOptions,b=v(g.valueDecimals,""),l=g.valuePrefix||"",f=g.valueSuffix||"";c.chart.styledMode&&(a=c.chart.tooltip.styledModeFormat(a));(c.pointArrayMap||["y"]).forEach(function(c){c="{point."+c;if(l||f)a=a.replace(RegExp(c+"}","g"),l+c+"}"+f);a=a.replace(RegExp(c+"}","g"),c+":,."+b+"f}")});return d(a,
{point:this,series:this.series},c.chart.time)},firePointEvent:function(a,d,g){var b=this,c=this.series.options;(c.point.events[a]||b.options&&b.options.events&&b.options.events[a])&&this.importEvents();"click"===a&&c.allowPointSelect&&(g=function(a){b.select&&b.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});h(this,a,d,g)},visible:!0}})(J);(function(a){var y=a.addEvent,G=a.animObject,E=a.arrayMax,h=a.arrayMin,d=a.correctFloat,r=a.defaultOptions,u=a.defaultPlotOptions,v=a.defined,w=a.erase,n=a.extend,
g=a.fireEvent,c=a.isArray,m=a.isNumber,p=a.isString,b=a.merge,l=a.objectEach,f=a.pick,x=a.removeEvent,t=a.splat,H=a.SVGElement,F=a.syncTimeout,z=a.win;a.Series=a.seriesType("line",null,{lineWidth:2,allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{lineWidth:0,lineColor:"#ffffff",enabledThreshold:2,radius:4,states:{normal:{animation:!0},hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",lineWidth:2}}},
point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,-1)},style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textOutline:"1px contrast"},verticalAlign:"bottom",x:0,y:0,padding:5},cropThreshold:300,pointRange:0,softThreshold:!0,states:{normal:{animation:!0},hover:{animation:{duration:50},lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"},{isCartesian:!0,pointClass:a.Point,
sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],coll:"series",init:function(a,b){g(this,"init",{options:b});var c=this,k,e=a.series,d;c.chart=a;c.options=b=c.setOptions(b);c.linkedSeries=[];c.bindAxes();n(c,{name:b.name,state:"",visible:!1!==b.visible,selected:!0===b.selected});k=b.events;l(k,function(a,b){y(c,b,a)});if(k&&k.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;c.getColor();c.getSymbol();
c.parallelArrays.forEach(function(a){c[a+"Data"]=[]});c.setData(b.data,!1);c.isCartesian&&(a.hasCartesianSeries=!0);e.length&&(d=e[e.length-1]);c._i=f(d&&d._i,-1)+1;a.orderSeries(this.insert(e));g(this,"afterInit")},insert:function(a){var b=this.options.index,c;if(m(b)){for(c=a.length;c--;)if(b>=f(a[c].options.index,a[c]._i)){a.splice(c+1,0,this);break}-1===c&&a.unshift(this);c+=1}else a.push(this);return f(c,a.length-1)},bindAxes:function(){var b=this,c=b.options,f=b.chart,d;(b.axisTypes||[]).forEach(function(e){f[e].forEach(function(a){d=
a.options;if(c[e]===d.index||void 0!==c[e]&&c[e]===d.id||void 0===c[e]&&0===d.index)b.insert(a.series),b[e]=a,a.isDirty=!0});b[e]||b.optionalAxis===e||a.error(18,!0,f)})},updateParallelArrays:function(a,b){var c=a.series,f=arguments,e=m(b)?function(e){var f="y"===e&&c.toYData?c.toYData(a):a[e];c[e+"Data"][b]=f}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(f,2))};c.parallelArrays.forEach(e)},autoIncrement:function(){var a=this.options,b=this.xIncrement,c,d=a.pointIntervalUnit,
e=this.chart.time,b=f(b,a.pointStart,0);this.pointInterval=c=f(this.pointInterval,a.pointInterval,1);d&&(a=new e.Date(b),"day"===d?e.set("Date",a,e.get("Date",a)+c):"month"===d?e.set("Month",a,e.get("Month",a)+c):"year"===d&&e.set("FullYear",a,e.get("FullYear",a)+c),c=a.getTime()-b);this.xIncrement=b+c;return b},setOptions:function(a){var c=this.chart,d=c.options,k=d.plotOptions,e=(c.userOptions||{}).plotOptions||{},q=k[this.type],l=c.styledMode;this.userOptions=a;c=b(q,k.series,a);this.tooltipOptions=
b(r.tooltip,r.plotOptions.series&&r.plotOptions.series.tooltip,r.plotOptions[this.type].tooltip,d.tooltip.userOptions,k.series&&k.series.tooltip,k[this.type].tooltip,a.tooltip);this.stickyTracking=f(a.stickyTracking,e[this.type]&&e[this.type].stickyTracking,e.series&&e.series.stickyTracking,this.tooltipOptions.shared&&!this.noSharedTooltip?!0:c.stickyTracking);null===q.marker&&delete c.marker;this.zoneAxis=c.zoneAxis;a=this.zones=(c.zones||[]).slice();!c.negativeColor&&!c.negativeFillColor||c.zones||
(d={value:c[this.zoneAxis+"Threshold"]||c.threshold||0,className:"highcharts-negative"},l||(d.color=c.negativeColor,d.fillColor=c.negativeFillColor),a.push(d));a.length&&v(a[a.length-1].value)&&a.push(l?{}:{color:this.color,fillColor:this.fillColor});g(this,"afterSetOptions",{options:c});return c},getName:function(){return this.name||"Series "+(this.index+1)},getCyclic:function(a,b,c){var d,e=this.chart,k=this.userOptions,g=a+"Index",l=a+"Counter",m=c?c.length:f(e.options.chart[a+"Count"],e[a+"Count"]);
b||(d=f(k[g],k["_"+g]),v(d)||(e.series.length||(e[l]=0),k["_"+g]=d=e[l]%m,e[l]+=1),c&&(b=c[d]));void 0!==d&&(this[g]=d);this[a]=b},getColor:function(){this.chart.styledMode?this.getCyclic("color"):this.options.colorByPoint?this.options.color=null:this.getCyclic("color",this.options.color||u[this.type].color,this.chart.options.colors)},getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols)},drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,updateData:function(b){var c=
this.options,f=this.points,d=[],e,k,g,l=this.requireSorting;this.xIncrement=null;b.forEach(function(b){var k,q,h;k=a.defined(b)&&this.pointClass.prototype.optionsToObject.call({series:this},b)||{};h=k.x;if((k=k.id)||m(h))k&&(q=(q=this.chart.get(k))&&q.x),void 0===q&&m(h)&&(q=this.xData.indexOf(h,g)),-1===q||void 0===q||f[q].touched?d.push(b):b!==c.data[q]?(f[q].update(b,!1,null,!1),f[q].touched=!0,l&&(g=q+1)):f[q]&&(f[q].touched=!0),e=!0},this);if(e)for(b=f.length;b--;)k=f[b],k.touched||k.remove(!1),
k.touched=!1;else if(b.length===f.length)b.forEach(function(a,b){f[b].update&&a!==c.data[b]&&f[b].update(a,!1,null,!1)});else return!1;d.forEach(function(a){this.addPoint(a,!1)},this);return!0},setData:function(b,d,g,l){var e=this,k=e.points,h=k&&k.length||0,A,t=e.options,n=e.chart,D=null,C=e.xAxis,x=t.turboThreshold,r=this.xData,z=this.yData,u=(A=e.pointArrayMap)&&A.length,v;b=b||[];A=b.length;d=f(d,!0);!1!==l&&A&&h&&!e.cropped&&!e.hasGroupedData&&e.visible&&!e.isSeriesBoosting&&(v=this.updateData(b));
if(!v){e.xIncrement=null;e.colorCounter=0;this.parallelArrays.forEach(function(a){e[a+"Data"].length=0});if(x&&A>x){for(g=0;null===D&&g<A;)D=b[g],g++;if(m(D))for(g=0;g<A;g++)r[g]=this.autoIncrement(),z[g]=b[g];else if(c(D))if(u)for(g=0;g<A;g++)D=b[g],r[g]=D[0],z[g]=D.slice(1,u+1);else for(g=0;g<A;g++)D=b[g],r[g]=D[0],z[g]=D[1];else a.error(12,!1,n)}else for(g=0;g<A;g++)void 0!==b[g]&&(D={series:e},e.pointClass.prototype.applyOptions.apply(D,[b[g]]),e.updateParallelArrays(D,g));z&&p(z[0])&&a.error(14,
!0,n);e.data=[];e.options.data=e.userOptions.data=b;for(g=h;g--;)k[g]&&k[g].destroy&&k[g].destroy();C&&(C.minRange=C.userMinRange);e.isDirty=n.isDirtyBox=!0;e.isDirtyData=!!k;g=!1}"point"===t.legendType&&(this.processData(),this.generatePoints());d&&n.redraw(g)},processData:function(b){var c=this.xData,f=this.yData,d=c.length,e;e=0;var k,g,l=this.xAxis,m,h=this.options;m=h.cropThreshold;var p=this.getExtremesFromAll||h.getExtremesFromAll,t=this.isCartesian,h=l&&l.val2lin,n=l&&l.isLog,x=this.requireSorting,
r,z;if(t&&!this.isDirty&&!l.isDirty&&!this.yAxis.isDirty&&!b)return!1;l&&(b=l.getExtremes(),r=b.min,z=b.max);t&&this.sorted&&!p&&(!m||d>m||this.forceCrop)&&(c[d-1]<r||c[0]>z?(c=[],f=[]):this.yData&&(c[0]<r||c[d-1]>z)&&(e=this.cropData(this.xData,this.yData,r,z),c=e.xData,f=e.yData,e=e.start,k=!0));for(m=c.length||1;--m;)d=n?h(c[m])-h(c[m-1]):c[m]-c[m-1],0<d&&(void 0===g||d<g)?g=d:0>d&&x&&(a.error(15,!1,this.chart),x=!1);this.cropped=k;this.cropStart=e;this.processedXData=c;this.processedYData=f;this.closestPointRange=
g},cropData:function(a,b,c,d,e){var k=a.length,g=0,l=k,m;e=f(e,this.cropShoulder,1);for(m=0;m<k;m++)if(a[m]>=c){g=Math.max(0,m-e);break}for(c=m;c<k;c++)if(a[c]>d){l=c+e;break}return{xData:a.slice(g,l),yData:b.slice(g,l),start:g,end:l}},generatePoints:function(){var a=this.options,b=a.data,c=this.data,f,e=this.processedXData,d=this.processedYData,g=this.pointClass,l=e.length,m=this.cropStart||0,h,p=this.hasGroupedData,a=a.keys,x,r=[],z;c||p||(c=[],c.length=b.length,c=this.data=c);a&&p&&(this.options.keys=
!1);for(z=0;z<l;z++)h=m+z,p?(x=(new g).init(this,[e[z]].concat(t(d[z]))),x.dataGroup=this.groupMap[z],x.dataGroup.options&&(x.options=x.dataGroup.options,n(x,x.dataGroup.options))):(x=c[h])||void 0===b[h]||(c[h]=x=(new g).init(this,b[h],e[z])),x&&(x.index=h,r[z]=x);this.options.keys=a;if(c&&(l!==(f=c.length)||p))for(z=0;z<f;z++)z!==m||p||(z+=l),c[z]&&(c[z].destroyElements(),c[z].plotX=void 0);this.data=c;this.points=r},getExtremes:function(a){var b=this.yAxis,f=this.processedXData,d,e=[],k=0;d=this.xAxis.getExtremes();
var g=d.min,l=d.max,p,t,n=this.requireSorting?1:0,x,z;a=a||this.stackedYData||this.processedYData||[];d=a.length;for(z=0;z<d;z++)if(t=f[z],x=a[z],p=(m(x,!0)||c(x))&&(!b.positiveValuesOnly||x.length||0<x),t=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(f[z+n]||t)>=g&&(f[z-n]||t)<=l,p&&t)if(p=x.length)for(;p--;)"number"===typeof x[p]&&(e[k++]=x[p]);else e[k++]=x;this.dataMin=h(e);this.dataMax=E(e)},translate:function(){this.processedXData||this.processData();this.generatePoints();
var a=this.options,b=a.stacking,c=this.xAxis,l=c.categories,e=this.yAxis,q=this.points,h=q.length,p=!!this.modifyValue,t=a.pointPlacement,n="between"===t||m(t),x=a.threshold,z=a.startFromThreshold?x:0,r,u,F,H,w=Number.MAX_VALUE;"between"===t&&(t=.5);m(t)&&(t*=f(a.pointRange||c.pointRange));for(a=0;a<h;a++){var y=q[a],E=y.x,G=y.y;u=y.low;var J=b&&e.stacks[(this.negStacks&&G<(z?0:x)?"-":"")+this.stackKey],U;e.positiveValuesOnly&&null!==G&&0>=G&&(y.isNull=!0);y.plotX=r=d(Math.min(Math.max(-1E5,c.translate(E,
0,0,0,1,t,"flags"===this.type)),1E5));b&&this.visible&&!y.isNull&&J&&J[E]&&(H=this.getStackIndicator(H,E,this.index),U=J[E],G=U.points[H.key],u=G[0],G=G[1],u===z&&H.key===J[E].base&&(u=f(m(x)&&x,e.min)),e.positiveValuesOnly&&0>=u&&(u=null),y.total=y.stackTotal=U.total,y.percentage=U.total&&y.y/U.total*100,y.stackY=G,U.setOffset(this.pointXOffset||0,this.barW||0));y.yBottom=v(u)?Math.min(Math.max(-1E5,e.translate(u,0,1,0,1)),1E5):null;p&&(G=this.modifyValue(G,y));y.plotY=u="number"===typeof G&&Infinity!==
G?Math.min(Math.max(-1E5,e.translate(G,0,1,0,1)),1E5):void 0;y.isInside=void 0!==u&&0<=u&&u<=e.len&&0<=r&&r<=c.len;y.clientX=n?d(c.translate(E,0,0,0,1,t)):r;y.negative=y.y<(x||0);y.category=l&&void 0!==l[y.x]?l[y.x]:y.x;y.isNull||(void 0!==F&&(w=Math.min(w,Math.abs(r-F))),F=r);y.zone=this.zones.length&&y.getZone()}this.closestPointRangePx=w;g(this,"afterTranslate")},getValidPoints:function(a,b){var c=this.chart;return(a||this.points||[]).filter(function(a){return b&&!c.isInsidePlot(a.plotX,a.plotY,
c.inverted)?!1:!a.isNull})},setClip:function(a){var b=this.chart,c=this.options,f=b.renderer,e=b.inverted,d=this.clipBox,k=d||b.clipBox,g=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,k.height,c.xAxis,c.yAxis].join(),l=b[g],m=b[g+"m"];l||(a&&(k.width=0,e&&(k.x=b.plotSizeX),b[g+"m"]=m=f.clipRect(e?b.plotSizeX+99:-99,e?-b.plotLeft:-b.plotTop,99,e?b.chartWidth:b.chartHeight)),b[g]=l=f.clipRect(k),l.count={length:0});a&&!l.count[this.index]&&(l.count[this.index]=!0,l.count.length+=1);!1!==
c.clip&&(this.group.clip(a||d?l:b.clipRect),this.markerGroup.clip(m),this.sharedClipKey=g);a||(l.count[this.index]&&(delete l.count[this.index],--l.count.length),0===l.count.length&&g&&b[g]&&(d||(b[g]=b[g].destroy()),b[g+"m"]&&(b[g+"m"]=b[g+"m"].destroy())))},animate:function(a){var b=this.chart,c=G(this.options.animation),f;a?this.setClip(c):(f=this.sharedClipKey,(a=b[f])&&a.animate({width:b.plotSizeX,x:0},c),b[f+"m"]&&b[f+"m"].animate({width:b.plotSizeX+99,x:0},c),this.animate=null)},afterAnimate:function(){this.setClip();
g(this,"afterAnimate");this.finishedAnimating=!0},drawPoints:function(){var a=this.points,b=this.chart,c,d,e,g,l=this.options.marker,m,h,p,t=this[this.specialGroup]||this.markerGroup;c=this.xAxis;var n,x=f(l.enabled,!c||c.isRadial?!0:null,this.closestPointRangePx>=l.enabledThreshold*l.radius);if(!1!==l.enabled||this._hasPointMarkers)for(c=0;c<a.length;c++)d=a[c],g=d.graphic,m=d.marker||{},h=!!d.marker,e=x&&void 0===m.enabled||m.enabled,p=!1!==d.isInside,e&&!d.isNull?(e=f(m.symbol,this.symbol),n=this.markerAttribs(d,
d.selected&&"select"),g?g[p?"show":"hide"](!0).animate(n):p&&(0<n.width||d.hasImage)&&(d.graphic=g=b.renderer.symbol(e,n.x,n.y,n.width,n.height,h?m:l).add(t)),g&&!b.styledMode&&g.attr(this.pointAttribs(d,d.selected&&"select")),g&&g.addClass(d.getClassName(),!0)):g&&(d.graphic=g.destroy())},markerAttribs:function(a,b){var c=this.options.marker,d=a.marker||{},e=d.symbol||c.symbol,k=f(d.radius,c.radius);b&&(c=c.states[b],b=d.states&&d.states[b],k=f(b&&b.radius,c&&c.radius,k+(c&&c.radiusPlus||0)));a.hasImage=
e&&0===e.indexOf("url");a.hasImage&&(k=0);a={x:Math.floor(a.plotX)-k,y:a.plotY-k};k&&(a.width=a.height=2*k);return a},pointAttribs:function(a,b){var c=this.options.marker,d=a&&a.options,e=d&&d.marker||{},g=this.color,k=d&&d.color,l=a&&a.color,d=f(e.lineWidth,c.lineWidth);a=a&&a.zone&&a.zone.color;g=k||a||l||g;a=e.fillColor||c.fillColor||g;g=e.lineColor||c.lineColor||g;b&&(c=c.states[b],b=e.states&&e.states[b]||{},d=f(b.lineWidth,c.lineWidth,d+f(b.lineWidthPlus,c.lineWidthPlus,0)),a=b.fillColor||c.fillColor||
a,g=b.lineColor||c.lineColor||g);return{stroke:g,"stroke-width":d,fill:a}},destroy:function(){var b=this,c=b.chart,f=/AppleWebKit\/533/.test(z.navigator.userAgent),d,e,q=b.data||[],m,h;g(b,"destroy");x(b);(b.axisTypes||[]).forEach(function(a){(h=b[a])&&h.series&&(w(h.series,b),h.isDirty=h.forceRedraw=!0)});b.legendItem&&b.chart.legend.destroyItem(b);for(e=q.length;e--;)(m=q[e])&&m.destroy&&m.destroy();b.points=null;a.clearTimeout(b.animationTimeout);l(b,function(a,b){a instanceof H&&!a.survive&&(d=
f&&"group"===b?"hide":"destroy",a[d]())});c.hoverSeries===b&&(c.hoverSeries=null);w(c.series,b);c.orderSeries();l(b,function(a,e){delete b[e]})},getGraphPath:function(a,b,c){var f=this,e=f.options,d=e.step,g,k=[],l=[],m;a=a||f.points;(g=a.reversed)&&a.reverse();(d={right:1,center:2}[d]||d&&3)&&g&&(d=4-d);!e.connectNulls||b||c||(a=this.getValidPoints(a));a.forEach(function(g,q){var h=g.plotX,p=g.plotY,t=a[q-1];(g.leftCliff||t&&t.rightCliff)&&!c&&(m=!0);g.isNull&&!v(b)&&0<q?m=!e.connectNulls:g.isNull&&
!b?m=!0:(0===q||m?q=["M",g.plotX,g.plotY]:f.getPointSpline?q=f.getPointSpline(a,g,q):d?(q=1===d?["L",t.plotX,p]:2===d?["L",(t.plotX+h)/2,t.plotY,"L",(t.plotX+h)/2,p]:["L",h,t.plotY],q.push("L",h,p)):q=["L",h,p],l.push(g.x),d&&(l.push(g.x),2===d&&l.push(g.x)),k.push.apply(k,q),m=!1)});k.xMap=l;return f.graphPath=k},drawGraph:function(){var a=this,b=this.options,c=(this.gappedPath||this.getGraphPath).call(this),f=this.chart.styledMode,e=[["graph","highcharts-graph"]];f||e[0].push(b.lineColor||this.color,
b.dashStyle);e=a.getZonesGraphs(e);e.forEach(function(e,d){var g=e[0],k=a[g];k?(k.endX=a.preventGraphAnimation?null:c.xMap,k.animate({d:c})):c.length&&(a[g]=a.chart.renderer.path(c).addClass(e[1]).attr({zIndex:1}).add(a.group),f||(k={stroke:e[2],"stroke-width":b.lineWidth,fill:a.fillGraph&&a.color||"none"},e[3]?k.dashstyle=e[3]:"square"!==b.linecap&&(k["stroke-linecap"]=k["stroke-linejoin"]="round"),k=a[g].attr(k).shadow(2>d&&b.shadow)));k&&(k.startX=c.xMap,k.isArea=c.isArea)})},getZonesGraphs:function(a){this.zones.forEach(function(b,
c){c=["zone-graph-"+c,"highcharts-graph highcharts-zone-graph-"+c+" "+(b.className||"")];this.chart.styledMode||c.push(b.color||this.color,b.dashStyle||this.options.dashStyle);a.push(c)},this);return a},applyZones:function(){var a=this,b=this.chart,c=b.renderer,d=this.zones,e,g,l=this.clips||[],m,h=this.graph,p=this.area,t=Math.max(b.chartWidth,b.chartHeight),n=this[(this.zoneAxis||"y")+"Axis"],x,z,r=b.inverted,u,v,F,H,w=!1;d.length&&(h||p)&&n&&void 0!==n.min&&(z=n.reversed,u=n.horiz,h&&!this.showLine&&
h.hide(),p&&p.hide(),x=n.getExtremes(),d.forEach(function(d,k){e=z?u?b.plotWidth:0:u?0:n.toPixels(x.min)||0;e=Math.min(Math.max(f(g,e),0),t);g=Math.min(Math.max(Math.round(n.toPixels(f(d.value,x.max),!0)||0),0),t);w&&(e=g=n.toPixels(x.max));v=Math.abs(e-g);F=Math.min(e,g);H=Math.max(e,g);n.isXAxis?(m={x:r?H:F,y:0,width:v,height:t},u||(m.x=b.plotHeight-m.x)):(m={x:0,y:r?H:F,width:t,height:v},u&&(m.y=b.plotWidth-m.y));r&&c.isVML&&(m=n.isXAxis?{x:0,y:z?F:H,height:m.width,width:b.chartWidth}:{x:m.y-b.plotLeft-
b.spacingBox.x,y:0,width:m.height,height:b.chartHeight});l[k]?l[k].animate(m):(l[k]=c.clipRect(m),h&&a["zone-graph-"+k].clip(l[k]),p&&a["zone-area-"+k].clip(l[k]));w=d.value>x.max;a.resetZones&&0===g&&(g=void 0)}),this.clips=l)},invertGroups:function(a){function b(){["group","markerGroup"].forEach(function(b){c[b]&&(f.renderer.isVML&&c[b].attr({width:c.yAxis.len,height:c.xAxis.len}),c[b].width=c.yAxis.len,c[b].height=c.xAxis.len,c[b].invert(a))})}var c=this,f=c.chart,e;c.xAxis&&(e=y(f,"resize",b),
y(c,"destroy",e),b(a),c.invertGroups=b)},plotGroup:function(a,b,c,f,e){var d=this[a],g=!d;g&&(this[a]=d=this.chart.renderer.g().attr({zIndex:f||.1}).add(e));d.addClass("highcharts-"+b+" highcharts-series-"+this.index+" highcharts-"+this.type+"-series "+(v(this.colorIndex)?"highcharts-color-"+this.colorIndex+" ":"")+(this.options.className||"")+(d.hasClass("highcharts-tracker")?" highcharts-tracker":""),!0);d.attr({visibility:c})[g?"attr":"animate"](this.getPlotBox());return d},getPlotBox:function(){var a=
this.chart,b=this.xAxis,c=this.yAxis;a.inverted&&(b=c,c=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,c,f=a.options,e=!!a.animate&&b.renderer.isSVG&&G(f.animation).duration,d=a.visible?"inherit":"hidden",l=f.zIndex,m=a.hasRendered,h=b.seriesGroup,p=b.inverted;c=a.plotGroup("group","series",d,l,h);a.markerGroup=a.plotGroup("markerGroup","markers",d,l,h);e&&a.animate(!0);c.inverted=a.isCartesian?p:!1;a.drawGraph&&
(a.drawGraph(),a.applyZones());a.drawDataLabels&&a.drawDataLabels();a.visible&&a.drawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(p);!1===f.clip||a.sharedClipKey||m||c.clip(b.clipRect);e&&a.animate();m||(a.animationTimeout=F(function(){a.afterAnimate()},e));a.isDirty=!1;a.hasRendered=!0;g(a,"afterRender")},redraw:function(){var a=this.chart,b=this.isDirty||this.isDirtyData,c=this.group,d=this.xAxis,e=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,
height:a.plotHeight}),c.animate({translateX:f(d&&d.left,a.plotLeft),translateY:f(e&&e.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree},kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var c=this.xAxis,f=this.yAxis,e=this.chart.inverted;return this.searchKDTree({clientX:e?c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:e?f.len-a.chartX+f.pos:a.chartY-f.pos},b)},buildKDTree:function(){function a(c,e,f){var d,g;if(g=c&&c.length)return d=b.kdAxisArray[e%f],c.sort(function(a,
b){return a[d]-b[d]}),g=Math.floor(g/2),{point:c[g],left:a(c.slice(0,g),e+1,f),right:a(c.slice(g+1),e+1,f)}}this.buildingKdTree=!0;var b=this,c=-1<b.options.findNearestPointBy.indexOf("y")?2:1;delete b.kdTree;F(function(){b.kdTree=a(b.getValidPoints(null,!b.directTouch),c,c);b.buildingKdTree=!1},b.options.kdNow?0:1)},searchKDTree:function(a,b){function c(a,b,k,l){var m=b.point,h=f.kdAxisArray[k%l],q,p,t=m;p=v(a[e])&&v(m[e])?Math.pow(a[e]-m[e],2):null;q=v(a[d])&&v(m[d])?Math.pow(a[d]-m[d],2):null;
q=(p||0)+(q||0);m.dist=v(q)?Math.sqrt(q):Number.MAX_VALUE;m.distX=v(p)?Math.sqrt(p):Number.MAX_VALUE;h=a[h]-m[h];q=0>h?"left":"right";p=0>h?"right":"left";b[q]&&(q=c(a,b[q],k+1,l),t=q[g]<t[g]?q:m);b[p]&&Math.sqrt(h*h)<t[g]&&(a=c(a,b[p],k+1,l),t=a[g]<t[g]?a:t);return t}var f=this,e=this.kdAxisArray[0],d=this.kdAxisArray[1],g=b?"distX":"dist";b=-1<f.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||this.buildingKdTree||this.buildKDTree();if(this.kdTree)return c(a,this.kdTree,b,b)}})})(J);(function(a){var y=
a.Axis,G=a.Chart,E=a.correctFloat,h=a.defined,d=a.destroyObjectProperties,r=a.format,u=a.objectEach,v=a.pick,w=a.Series;a.StackItem=function(a,d,c,m,h){var b=a.chart.inverted;this.axis=a;this.isNegative=c;this.options=d;this.x=m;this.total=null;this.points={};this.stack=h;this.rightCliff=this.leftCliff=0;this.alignOptions={align:d.align||(b?c?"left":"right":"center"),verticalAlign:d.verticalAlign||(b?"middle":c?"bottom":"top"),y:v(d.y,b?4:c?14:-6),x:v(d.x,b?c?-6:6:0)};this.textAlign=d.textAlign||
(b?c?"right":"left":"center")};a.StackItem.prototype={destroy:function(){d(this,this.axis)},render:function(a){var d=this.axis.chart,c=this.options,m=c.format,m=m?r(m,this,d.time):c.formatter.call(this);this.label?this.label.attr({text:m,visibility:"hidden"}):this.label=d.renderer.text(m,null,null,c.useHTML).css(c.style).attr({align:this.textAlign,rotation:c.rotation,visibility:"hidden"}).add(a);this.label.labelrank=d.plotHeight},setOffset:function(a,d){var c=this.axis,g=c.chart,p=c.translate(c.usePercentage?
100:this.total,0,0,0,1),b=c.translate(0),b=h(p)&&Math.abs(p-b);a=g.xAxis[0].translate(this.x)+a;c=h(p)&&this.getStackBox(g,this,a,p,d,b,c);(d=this.label)&&c&&(d.align(this.alignOptions,null,c),c=d.alignAttr,d[!1===this.options.crop||g.isInsidePlot(c.x,c.y)?"show":"hide"](!0))},getStackBox:function(a,d,c,m,h,b,l){var f=d.axis.reversed,g=a.inverted;a=l.height+l.pos-(g?a.plotLeft:a.plotTop);d=d.isNegative&&!f||!d.isNegative&&f;return{x:g?d?m:m-b:c,y:g?a-c-h:d?a-m-b:a-m,width:g?b:h,height:g?h:b}}};G.prototype.getStacks=
function(){var a=this;a.yAxis.forEach(function(a){a.stacks&&a.hasVisibleSeries&&(a.oldStacks=a.stacks)});a.series.forEach(function(d){!d.options.stacking||!0!==d.visible&&!1!==a.options.chart.ignoreHiddenSeries||(d.stackKey=d.type+v(d.options.stack,""))})};y.prototype.buildStacks=function(){var a=this.series,d=v(this.options.reversedStacks,!0),c=a.length,m;if(!this.isXAxis){this.usePercentage=!1;for(m=c;m--;)a[d?m:c-m-1].setStackedPoints();for(m=0;m<c;m++)a[m].modifyStacks()}};y.prototype.renderStackTotals=
function(){var a=this.chart,d=a.renderer,c=this.stacks,m=this.stackTotalGroup;m||(this.stackTotalGroup=m=d.g("stack-labels").attr({visibility:"visible",zIndex:6}).add());m.translate(a.plotLeft,a.plotTop);u(c,function(a){u(a,function(a){a.render(m)})})};y.prototype.resetStacks=function(){var a=this,d=a.stacks;a.isXAxis||u(d,function(c){u(c,function(d,g){d.touched<a.stacksTouched?(d.destroy(),delete c[g]):(d.total=null,d.cumulative=null)})})};y.prototype.cleanStacks=function(){var a;this.isXAxis||(this.oldStacks&&
(a=this.stacks=this.oldStacks),u(a,function(a){u(a,function(a){a.cumulative=a.total})}))};w.prototype.setStackedPoints=function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var d=this.processedXData,g=this.processedYData,c=[],m=g.length,p=this.options,b=p.threshold,l=v(p.startFromThreshold&&b,0),f=p.stack,p=p.stacking,x=this.stackKey,t="-"+x,r=this.negStacks,u=this.yAxis,z=u.stacks,k=u.oldStacks,A,D,C,e,q,w,y;u.stacksTouched+=1;for(q=0;q<m;q++)w=
d[q],y=g[q],A=this.getStackIndicator(A,w,this.index),e=A.key,C=(D=r&&y<(l?0:b))?t:x,z[C]||(z[C]={}),z[C][w]||(k[C]&&k[C][w]?(z[C][w]=k[C][w],z[C][w].total=null):z[C][w]=new a.StackItem(u,u.options.stackLabels,D,w,f)),C=z[C][w],null!==y?(C.points[e]=C.points[this.index]=[v(C.cumulative,l)],h(C.cumulative)||(C.base=e),C.touched=u.stacksTouched,0<A.index&&!1===this.singleStacks&&(C.points[e][0]=C.points[this.index+","+w+",0"][0])):C.points[e]=C.points[this.index]=null,"percent"===p?(D=D?x:t,r&&z[D]&&
z[D][w]?(D=z[D][w],C.total=D.total=Math.max(D.total,C.total)+Math.abs(y)||0):C.total=E(C.total+(Math.abs(y)||0))):C.total=E(C.total+(y||0)),C.cumulative=v(C.cumulative,l)+(y||0),null!==y&&(C.points[e].push(C.cumulative),c[q]=C.cumulative);"percent"===p&&(u.usePercentage=!0);this.stackedYData=c;u.oldStacks={}}};w.prototype.modifyStacks=function(){var a=this,d=a.stackKey,c=a.yAxis.stacks,m=a.processedXData,h,b=a.options.stacking;a[b+"Stacker"]&&[d,"-"+d].forEach(function(d){for(var f=m.length,g,l;f--;)if(g=
m[f],h=a.getStackIndicator(h,g,a.index,d),l=(g=c[d]&&c[d][g])&&g.points[h.key])a[b+"Stacker"](l,g,f)})};w.prototype.percentStacker=function(a,d,c){d=d.total?100/d.total:0;a[0]=E(a[0]*d);a[1]=E(a[1]*d);this.stackedYData[c]=a[1]};w.prototype.getStackIndicator=function(a,d,c,m){!h(a)||a.x!==d||m&&a.key!==m?a={x:d,index:0,key:m}:a.index++;a.key=[c,d,a.index].join();return a}})(J);(function(a){var y=a.addEvent,G=a.animate,E=a.Axis,h=a.Chart,d=a.createElement,r=a.css,u=a.defined,v=a.erase,w=a.extend,n=
a.fireEvent,g=a.isNumber,c=a.isObject,m=a.isArray,p=a.merge,b=a.objectEach,l=a.pick,f=a.Point,x=a.Series,t=a.seriesTypes,H=a.setAnimation,F=a.splat;a.cleanRecursively=function(d,f){var g=0,k=0;b(d,function(b,e){c(d[e],!0)&&f[e]?a.cleanRecursively(d[e],f[e])&&delete d[e]:c(d[e])||d[e]!==f[e]||(delete d[e],k++);g++});return g===k};w(h.prototype,{addSeries:function(a,b,c){var d,f=this;a&&(b=l(b,!0),n(f,"addSeries",{options:a},function(){d=f.initSeries(a);f.isDirtyLegend=!0;f.linkSeries();n(f,"afterAddSeries");
b&&f.redraw(c)}));return d},addAxis:function(a,b,c,d){var f=b?"xAxis":"yAxis",e=this.options;a=p(a,{index:this[f].length,isX:b});b=new E(this,a);e[f]=F(e[f]||{});e[f].push(a);l(c,!0)&&this.redraw(d);return b},showLoading:function(a){var b=this,c=b.options,f=b.loadingDiv,g=c.loading,e=function(){f&&r(f,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})};f||(b.loadingDiv=f=d("div",{className:"highcharts-loading highcharts-loading-hidden"},null,b.container),b.loadingSpan=
d("span",{className:"highcharts-loading-inner"},null,f),y(b,"redraw",e));f.className="highcharts-loading";b.loadingSpan.innerHTML=a||c.lang.loading;b.styledMode||(r(f,w(g.style,{zIndex:10})),r(b.loadingSpan,g.labelStyle),b.loadingShown||(r(f,{opacity:0,display:""}),G(f,{opacity:g.style.opacity||.5},{duration:g.showDuration||0})));b.loadingShown=!0;e()},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&(b.className="highcharts-loading highcharts-loading-hidden",this.styledMode||G(b,{opacity:0},
{duration:a.loading.hideDuration||100,complete:function(){r(b,{display:"none"})}}));this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
collectionsWithUpdate:"xAxis yAxis zAxis series colorAxis pane".split(" "),update:function(c,d,f,m){var k=this,e={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle"},h,t,x,r=[];n(k,"update",{options:c});a.cleanRecursively(c,k.options);if(h=c.chart){p(!0,k.options.chart,h);"className"in h&&k.setClassName(h.className);"reflow"in h&&k.setReflow(h.reflow);if("inverted"in h||"polar"in h||"type"in h)k.propFromSeries(),t=!0;"alignTicks"in h&&(t=!0);b(h,function(a,b){-1!==k.propsRequireUpdateSeries.indexOf("chart."+
b)&&(x=!0);-1!==k.propsRequireDirtyBox.indexOf(b)&&(k.isDirtyBox=!0)});!k.styledMode&&"style"in h&&k.renderer.setStyle(h.style)}!k.styledMode&&c.colors&&(this.options.colors=c.colors);c.plotOptions&&p(!0,this.options.plotOptions,c.plotOptions);b(c,function(a,b){if(k[b]&&"function"===typeof k[b].update)k[b].update(a,!1);else if("function"===typeof k[e[b]])k[e[b]](a);"chart"!==b&&-1!==k.propsRequireUpdateSeries.indexOf(b)&&(x=!0)});this.collectionsWithUpdate.forEach(function(a){var b;c[a]&&("series"===
a&&(b=[],k[a].forEach(function(a,c){a.options.isInternal||b.push(l(a.options.index,c))})),F(c[a]).forEach(function(c,e){(e=u(c.id)&&k.get(c.id)||k[a][b?b[e]:e])&&e.coll===a&&(e.update(c,!1),f&&(e.touched=!0));if(!e&&f)if("series"===a)k.addSeries(c,!1).touched=!0;else if("xAxis"===a||"yAxis"===a)k.addAxis(c,"xAxis"===a,!1).touched=!0}),f&&k[a].forEach(function(a){a.touched||a.options.isInternal?delete a.touched:r.push(a)}))});r.forEach(function(a){a.remove&&a.remove(!1)});t&&k.axes.forEach(function(a){a.update({},
!1)});x&&k.series.forEach(function(a){a.update({},!1)});c.loading&&p(!0,k.options.loading,c.loading);t=h&&h.width;h=h&&h.height;g(t)&&t!==k.chartWidth||g(h)&&h!==k.chartHeight?k.setSize(t,h,m):l(d,!0)&&k.redraw(m);n(k,"afterUpdate",{options:c})},setSubtitle:function(a){this.setTitle(void 0,a)}});w(f.prototype,{update:function(a,b,d,f){function g(){e.applyOptions(a);null===e.y&&h&&(e.graphic=h.destroy());c(a,!0)&&(h&&h.element&&a&&a.marker&&void 0!==a.marker.symbol&&(e.graphic=h.destroy()),a&&a.dataLabels&&
e.dataLabel&&(e.dataLabel=e.dataLabel.destroy()),e.connector&&(e.connector=e.connector.destroy()));m=e.index;k.updateParallelArrays(e,m);t.data[m]=c(t.data[m],!0)||c(a,!0)?e.options:l(a,t.data[m]);k.isDirty=k.isDirtyData=!0;!k.fixedBox&&k.hasCartesianSeries&&(p.isDirtyBox=!0);"point"===t.legendType&&(p.isDirtyLegend=!0);b&&p.redraw(d)}var e=this,k=e.series,h=e.graphic,m,p=k.chart,t=k.options;b=l(b,!0);!1===f?g():e.firePointEvent("update",{options:a},g)},remove:function(a,b){this.series.removePoint(this.series.data.indexOf(this),
a,b)}});w(x.prototype,{addPoint:function(a,b,c,d){var f=this.options,e=this.data,g=this.chart,k=this.xAxis,k=k&&k.hasNames&&k.names,h=f.data,m,p,t=this.xData,n,x;b=l(b,!0);m={series:this};this.pointClass.prototype.applyOptions.apply(m,[a]);x=m.x;n=t.length;if(this.requireSorting&&x<t[n-1])for(p=!0;n&&t[n-1]>x;)n--;this.updateParallelArrays(m,"splice",n,0,0);this.updateParallelArrays(m,n);k&&m.name&&(k[x]=m.name);h.splice(n,0,a);p&&(this.data.splice(n,0,null),this.processData());"point"===f.legendType&&
this.generatePoints();c&&(e[0]&&e[0].remove?e[0].remove(!1):(e.shift(),this.updateParallelArrays(m,"shift"),h.shift()));this.isDirtyData=this.isDirty=!0;b&&g.redraw(d)},removePoint:function(a,b,c){var d=this,f=d.data,e=f[a],g=d.points,k=d.chart,h=function(){g&&g.length===f.length&&g.splice(a,1);f.splice(a,1);d.options.data.splice(a,1);d.updateParallelArrays(e||{series:d},"splice",a,1);e&&e.destroy();d.isDirty=!0;d.isDirtyData=!0;b&&k.redraw()};H(c,k);b=l(b,!0);e?e.firePointEvent("remove",null,h):
h()},remove:function(a,b,c){function d(){f.destroy();f.remove=null;e.isDirtyLegend=e.isDirtyBox=!0;e.linkSeries();l(a,!0)&&e.redraw(b)}var f=this,e=f.chart;!1!==c?n(f,"remove",null,d):d()},update:function(b,c){a.cleanRecursively(b,this.userOptions);var d=this,f=d.chart,g=d.userOptions,e=d.oldType||d.type,k=b.type||g.type||f.options.chart.type,h=t[e].prototype,m,x=["group","markerGroup","dataLabelsGroup"],r=["navigatorSeries","baseSeries"],u=d.finishedAnimating&&{animation:!1},z=["data","name","turboThreshold"],
v=Object.keys(b),F=0<v.length;v.forEach(function(a){-1===z.indexOf(a)&&(F=!1)});if(F)b.data&&this.setData(b.data,!1),b.name&&this.setName(b.name,!1);else{r=x.concat(r);r.forEach(function(a){r[a]=d[a];delete d[a]});b=p(g,u,{index:d.index,pointStart:l(g.pointStart,d.xData[0])},{data:d.options.data},b);d.remove(!1,null,!1);for(m in h)d[m]=void 0;t[k||e]?w(d,t[k||e].prototype):a.error(17,!0,f);r.forEach(function(a){d[a]=r[a]});d.init(f,b);b.zIndex!==g.zIndex&&x.forEach(function(a){d[a]&&d[a].attr({zIndex:b.zIndex})});
d.oldType=e;f.linkSeries()}n(this,"afterUpdate");l(c,!0)&&f.redraw(F?void 0:!1)},setName:function(a){this.name=this.options.name=this.userOptions.name=a;this.chart.isDirtyLegend=!0}});w(E.prototype,{update:function(a,c){var d=this.chart,f=a&&a.events||{};a=p(this.userOptions,a);d.options[this.coll].indexOf&&(d.options[this.coll][d.options[this.coll].indexOf(this.userOptions)]=a);b(d.options[this.coll].events,function(a,b){"undefined"===typeof f[b]&&(f[b]=void 0)});this.destroy(!0);this.init(d,w(a,
{events:f}));d.isDirtyBox=!0;l(c,!0)&&d.redraw()},remove:function(a){for(var b=this.chart,c=this.coll,d=this.series,f=d.length;f--;)d[f]&&d[f].remove(!1);v(b.axes,this);v(b[c],this);m(b.options[c])?b.options[c].splice(this.options.index,1):delete b.options[c];b[c].forEach(function(a,b){a.options.index=a.userOptions.index=b});this.destroy();b.isDirtyBox=!0;l(a,!0)&&b.redraw()},setTitle:function(a,b){this.update({title:a},b)},setCategories:function(a,b){this.update({categories:a},b)}})})(J);(function(a){var y=
a.color,G=a.pick,E=a.Series,h=a.seriesType;h("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,getStackPoints:function(d){var h=[],u=[],v=this.xAxis,w=this.yAxis,n=w.stacks[this.stackKey],g={},c=this.index,m=w.series,p=m.length,b,l=G(w.options.reversedStacks,!0)?1:-1,f;d=d||this.points;if(this.options.stacking){for(f=0;f<d.length;f++)d[f].leftNull=d[f].rightNull=null,g[d[f].x]=d[f];a.objectEach(n,function(a,b){null!==a.total&&u.push(b)});u.sort(function(a,b){return a-b});b=m.map(function(a){return a.visible});
u.forEach(function(a,d){var m=0,t,x;if(g[a]&&!g[a].isNull)h.push(g[a]),[-1,1].forEach(function(k){var h=1===k?"rightNull":"leftNull",m=0,r=n[u[d+k]];if(r)for(f=c;0<=f&&f<p;)t=r.points[f],t||(f===c?g[a][h]=!0:b[f]&&(x=n[a].points[f])&&(m-=x[1]-x[0])),f+=l;g[a][1===k?"rightCliff":"leftCliff"]=m});else{for(f=c;0<=f&&f<p;){if(t=n[a].points[f]){m=t[1];break}f+=l}m=w.translate(m,0,1,0,1);h.push({isNull:!0,plotX:v.translate(a,0,0,0,1),x:a,plotY:m,yBottom:m})}})}return h},getGraphPath:function(a){var d=E.prototype.getGraphPath,
h=this.options,v=h.stacking,w=this.yAxis,n,g,c=[],m=[],p=this.index,b,l=w.stacks[this.stackKey],f=h.threshold,x=w.getThreshold(h.threshold),t,h=h.connectNulls||"percent"===v,H=function(d,g,k){var h=a[d];d=v&&l[h.x].points[p];var t=h[k+"Null"]||0;k=h[k+"Cliff"]||0;var n,e,h=!0;k||t?(n=(t?d[0]:d[1])+k,e=d[0]+k,h=!!t):!v&&a[g]&&a[g].isNull&&(n=e=f);void 0!==n&&(m.push({plotX:b,plotY:null===n?x:w.getThreshold(n),isNull:h,isCliff:!0}),c.push({plotX:b,plotY:null===e?x:w.getThreshold(e),doCurve:!1}))};a=
a||this.points;v&&(a=this.getStackPoints(a));for(n=0;n<a.length;n++)if(g=a[n].isNull,b=G(a[n].rectPlotX,a[n].plotX),t=G(a[n].yBottom,x),!g||h)h||H(n,n-1,"left"),g&&!v&&h||(m.push(a[n]),c.push({x:n,plotX:b,plotY:t})),h||H(n,n+1,"right");n=d.call(this,m,!0,!0);c.reversed=!0;g=d.call(this,c,!0,!0);g.length&&(g[0]="L");g=n.concat(g);d=d.call(this,m,!1,h);g.xMap=n.xMap;this.areaPath=g;return d},drawGraph:function(){this.areaPath=[];E.prototype.drawGraph.apply(this);var a=this,h=this.areaPath,u=this.options,
v=[["area","highcharts-area",this.color,u.fillColor]];this.zones.forEach(function(d,h){v.push(["zone-area-"+h,"highcharts-area highcharts-zone-area-"+h+" "+d.className,d.color||a.color,d.fillColor||u.fillColor])});v.forEach(function(d){var n=d[0],g=a[n];g?(g.endX=a.preventGraphAnimation?null:h.xMap,g.animate({d:h})):(g={zIndex:0},a.chart.styledMode||(g.fill=G(d[3],y(d[2]).setOpacity(G(u.fillOpacity,.75)).get())),g=a[n]=a.chart.renderer.path(h).addClass(d[1]).attr(g).add(a.group),g.isArea=!0);g.startX=
h.xMap;g.shiftUnit=u.step?2:1})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(J);(function(a){var y=a.pick;a=a.seriesType;a("spline","line",{},{getPointSpline:function(a,E,h){var d=E.plotX,r=E.plotY,u=a[h-1];h=a[h+1];var v,w,n,g;if(u&&!u.isNull&&!1!==u.doCurve&&!E.isCliff&&h&&!h.isNull&&!1!==h.doCurve&&!E.isCliff){a=u.plotY;n=h.plotX;h=h.plotY;var c=0;v=(1.5*d+u.plotX)/2.5;w=(1.5*r+a)/2.5;n=(1.5*d+n)/2.5;g=(1.5*r+h)/2.5;n!==v&&(c=(g-w)*(n-d)/(n-v)+r-g);w+=c;g+=c;w>a&&w>r?(w=Math.max(a,r),
g=2*r-w):w<a&&w<r&&(w=Math.min(a,r),g=2*r-w);g>h&&g>r?(g=Math.max(h,r),w=2*r-g):g<h&&g<r&&(g=Math.min(h,r),w=2*r-g);E.rightContX=n;E.rightContY=g}E=["C",y(u.rightContX,u.plotX),y(u.rightContY,u.plotY),y(v,d),y(w,r),d,r];u.rightContX=u.rightContY=null;return E}})})(J);(function(a){var y=a.seriesTypes.area.prototype,G=a.seriesType;G("areaspline","spline",a.defaultPlotOptions.area,{getStackPoints:y.getStackPoints,getGraphPath:y.getGraphPath,drawGraph:y.drawGraph,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})})(J);
(function(a){var y=a.animObject,G=a.color,E=a.extend,h=a.defined,d=a.isNumber,r=a.merge,u=a.pick,v=a.Series,w=a.seriesType,n=a.svg;w("column","line",{borderRadius:0,crisp:!0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1},select:{color:"#cccccc",borderColor:"#000000"}},dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,borderColor:"#ffffff"},
{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){v.prototype.init.apply(this,arguments);var a=this,c=a.chart;c.hasRendered&&c.series.forEach(function(c){c.type===a.type&&(c.isDirty=!0)})},getColumnMetrics:function(){var a=this,c=a.options,d=a.xAxis,h=a.yAxis,b=d.options.reversedStacks,b=d.reversed&&!b||!d.reversed&&b,l,f={},n=0;!1===c.grouping?n=1:a.chart.series.forEach(function(b){var c=b.options,d=b.yAxis,g;b.type!==a.type||!b.visible&&a.chart.options.chart.ignoreHiddenSeries||
h.len!==d.len||h.pos!==d.pos||(c.stacking?(l=b.stackKey,void 0===f[l]&&(f[l]=n++),g=f[l]):!1!==c.grouping&&(g=n++),b.columnIndex=g)});var t=Math.min(Math.abs(d.transA)*(d.ordinalSlope||c.pointRange||d.closestPointRange||d.tickInterval||1),d.len),r=t*c.groupPadding,v=(t-2*r)/(n||1),c=Math.min(c.maxPointWidth||d.len,u(c.pointWidth,v*(1-2*c.pointPadding)));a.columnMetrics={width:c,offset:(v-c)/2+(r+((a.columnIndex||0)+(b?1:0))*v-t/2)*(b?-1:1)};return a.columnMetrics},crispCol:function(a,c,d,h){var b=
this.chart,g=this.borderWidth,f=-(g%2?.5:0),g=g%2?.5:1;b.inverted&&b.renderer.isVML&&(g+=1);this.options.crisp&&(d=Math.round(a+d)+f,a=Math.round(a)+f,d-=a);h=Math.round(c+h)+g;f=.5>=Math.abs(c)&&.5<h;c=Math.round(c)+g;h-=c;f&&h&&(--c,h+=1);return{x:a,y:c,width:d,height:h}},translate:function(){var a=this,c=a.chart,d=a.options,p=a.dense=2>a.closestPointRange*a.xAxis.transA,p=a.borderWidth=u(d.borderWidth,p?0:1),b=a.yAxis,l=d.threshold,f=a.translatedThreshold=b.getThreshold(l),n=u(d.minPointLength,
5),t=a.getColumnMetrics(),r=t.width,F=a.barW=Math.max(r,1+2*p),z=a.pointXOffset=t.offset;c.inverted&&(f-=.5);d.pointPadding&&(F=Math.ceil(F));v.prototype.translate.apply(a);a.points.forEach(function(d){var g=u(d.yBottom,f),k=999+Math.abs(g),m=r,k=Math.min(Math.max(-k,d.plotY),b.len+k),e=d.plotX+z,q=F,p=Math.min(k,g),t,x=Math.max(k,g)-p;n&&Math.abs(x)<n&&(x=n,t=!b.reversed&&!d.negative||b.reversed&&d.negative,d.y===l&&a.dataMax<=l&&b.min<l&&(t=!t),p=Math.abs(p-f)>n?g-n:f-(t?n:0));h(d.options.pointWidth)&&
(m=q=Math.ceil(d.options.pointWidth),e-=Math.round((m-r)/2));d.barX=e;d.pointWidth=m;d.tooltipPos=c.inverted?[b.len+b.pos-c.plotLeft-k,a.xAxis.len-e-q/2,x]:[e+q/2,k+b.pos-c.plotTop,x];d.shapeType=d.shapeType||"rect";d.shapeArgs=a.crispCol.apply(a,d.isNull?[e,f,q,0]:[e,p,q,x])})},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},pointAttribs:function(a,c){var d=this.options,g,b=this.pointAttrToOptions||
{};g=b.stroke||"borderColor";var l=b["stroke-width"]||"borderWidth",f=a&&a.color||this.color,h=a&&a[g]||d[g]||this.color||f,t=a&&a[l]||d[l]||this[l]||0,b=d.dashStyle;a&&this.zones.length&&(f=a.getZone(),f=a.options.color||f&&f.color||this.color);c&&(a=r(d.states[c],a.options.states&&a.options.states[c]||{}),c=a.brightness,f=a.color||void 0!==c&&G(f).brighten(a.brightness).get()||f,h=a[g]||h,t=a[l]||t,b=a.dashStyle||b);g={fill:f,stroke:h,"stroke-width":t};b&&(g.dashstyle=b);return g},drawPoints:function(){var a=
this,c=this.chart,h=a.options,p=c.renderer,b=h.animationLimit||250,l;a.points.forEach(function(f){var g=f.graphic,m=g&&c.pointCount<b?"animate":"attr";if(d(f.plotY)&&null!==f.y){l=f.shapeArgs;if(g)g[m](r(l));else f.graphic=g=p[f.shapeType](l).add(f.group||a.group);h.borderRadius&&g.attr({r:h.borderRadius});c.styledMode||g[m](a.pointAttribs(f,f.selected&&"select")).shadow(h.shadow,null,h.stacking&&!h.borderRadius);g.addClass(f.getClassName(),!0)}else g&&(f.graphic=g.destroy())})},animate:function(a){var c=
this,d=this.yAxis,g=c.options,b=this.chart.inverted,h={},f=b?"translateX":"translateY",x;n&&(a?(h.scaleY=.001,a=Math.min(d.pos+d.len,Math.max(d.pos,d.toPixels(g.threshold))),b?h.translateX=a-d.len:h.translateY=a,c.group.attr(h)):(x=c.group.attr(f),c.group.animate({scaleY:1},E(y(c.options.animation),{step:function(a,b){h[f]=x+b.pos*(d.pos-x);c.group.attr(h)}})),c.animate=null))},remove:function(){var a=this,c=a.chart;c.hasRendered&&c.series.forEach(function(c){c.type===a.type&&(c.isDirty=!0)});v.prototype.remove.apply(a,
arguments)}})})(J);(function(a){a=a.seriesType;a("bar","column",null,{inverted:!0})})(J);(function(a){var y=a.Series;a=a.seriesType;a("scatter","line",{lineWidth:0,findNearestPointBy:"xy",marker:{enabled:!0},tooltip:{headerFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 10px"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},{sorted:!1,requireSorting:!1,
noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,drawGraph:function(){this.options.lineWidth&&y.prototype.drawGraph.call(this)}})})(J);(function(a){var y=a.deg2rad,G=a.isNumber,E=a.pick,h=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,r=this.chart,u=2*(a.slicedOffset||0),v=r.plotWidth-2*u,r=r.plotHeight-2*u,w=a.center,w=[E(w[0],"50%"),E(w[1],"50%"),a.size||"100%",a.innerSize||0],n=Math.min(v,r),g,c;for(g=0;4>g;++g)c=
w[g],a=2>g||2===g&&/%$/.test(c),w[g]=h(c,[v,r,n,w[2]][g])+(a?u:0);w[3]>w[2]&&(w[3]=w[2]);return w},getStartAndEndRadians:function(a,h){a=G(a)?a:0;h=G(h)&&h>a&&360>h-a?h:a+360;return{start:y*(a+-90),end:y*(h+-90)}}}})(J);(function(a){var y=a.addEvent,G=a.CenteredSeriesMixin,E=a.defined,h=a.extend,d=G.getStartAndEndRadians,r=a.noop,u=a.pick,v=a.Point,w=a.Series,n=a.seriesType,g=a.setAnimation;n("pie","line",{center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{allowOverlap:!0,connectorPadding:5,distance:30,
enabled:!0,formatter:function(){return this.point.isNull?void 0:this.point.name},softConnector:!0,x:0,connectorShape:"fixedOffset",crookDistance:"70%"},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,states:{hover:{brightness:.1}}},{isCartesian:!1,requireSorting:!1,directTouch:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:a.seriesTypes.column.prototype.pointAttribs,
animate:function(a){var c=this,d=c.points,b=c.startAngleRad;a||(d.forEach(function(a){var d=a.graphic,g=a.shapeArgs;d&&(d.attr({r:a.startR||c.center[3]/2,start:b,end:b}),d.animate({r:g.r,start:g.start,end:g.end},c.options.animation))}),c.animate=null)},updateTotals:function(){var a,d=0,g=this.points,b=g.length,h,f=this.options.ignoreHiddenPoint;for(a=0;a<b;a++)h=g[a],d+=f&&!h.visible?0:h.isNull?0:h.y;this.total=d;for(a=0;a<b;a++)h=g[a],h.percentage=0<d&&(h.visible||!f)?h.y/d*100:0,h.total=d},generatePoints:function(){w.prototype.generatePoints.call(this);
this.updateTotals()},getX:function(a,d,g){var b=this.center,c=this.radii?this.radii[g.index]:b[2]/2;return b[0]+(d?-1:1)*Math.cos(Math.asin(Math.max(Math.min((a-b[1])/(c+g.labelDistance),1),-1)))*(c+g.labelDistance)+(0<g.labelDistance?(d?-1:1)*this.options.dataLabels.padding:0)},translate:function(a){this.generatePoints();var c=0,g=this.options,b=g.slicedOffset,h=b+(g.borderWidth||0),f,n,t=d(g.startAngle,g.endAngle),r=this.startAngleRad=t.start,t=(this.endAngleRad=t.end)-r,v=this.points,z,k,A=g.dataLabels.distance,
g=g.ignoreHiddenPoint,w,C=v.length,e;a||(this.center=a=this.getCenter());for(w=0;w<C;w++){e=v[w];e.labelDistance=u(e.options.dataLabels&&e.options.dataLabels.distance,A);this.maxLabelDistance=Math.max(this.maxLabelDistance||0,e.labelDistance);f=r+c*t;if(!g||e.visible)c+=e.percentage/100;n=r+c*t;e.shapeType="arc";e.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:Math.round(1E3*f)/1E3,end:Math.round(1E3*n)/1E3};n=(n+f)/2;n>1.5*Math.PI?n-=2*Math.PI:n<-Math.PI/2&&(n+=2*Math.PI);e.slicedTranslation=
{translateX:Math.round(Math.cos(n)*b),translateY:Math.round(Math.sin(n)*b)};z=Math.cos(n)*a[2]/2;k=Math.sin(n)*a[2]/2;e.tooltipPos=[a[0]+.7*z,a[1]+.7*k];e.half=n<-Math.PI/2||n>Math.PI/2?1:0;e.angle=n;f=Math.min(h,e.labelDistance/5);e.labelPosition={natural:{x:a[0]+z+Math.cos(n)*e.labelDistance,y:a[1]+k+Math.sin(n)*e.labelDistance},final:{},alignment:0>e.labelDistance?"center":e.half?"right":"left",connectorPosition:{breakAt:{x:a[0]+z+Math.cos(n)*f,y:a[1]+k+Math.sin(n)*f},touchingSliceAt:{x:a[0]+z,
y:a[1]+k}}}}},drawGraph:null,drawPoints:function(){var a=this,d=a.chart,g=d.renderer,b,l,f,n,t=a.options.shadow;!t||a.shadowGroup||d.styledMode||(a.shadowGroup=g.g("shadow").add(a.group));a.points.forEach(function(c){l=c.graphic;if(c.isNull)l&&(c.graphic=l.destroy());else{n=c.shapeArgs;b=c.getTranslate();if(!d.styledMode){var m=c.shadowGroup;t&&!m&&(m=c.shadowGroup=g.g("shadow").add(a.shadowGroup));m&&m.attr(b);f=a.pointAttribs(c,c.selected&&"select")}l?(l.setRadialReference(a.center),d.styledMode||
l.attr(f),l.animate(h(n,b))):(c.graphic=l=g[c.shapeType](n).setRadialReference(a.center).attr(b).add(a.group),d.styledMode||l.attr(f).attr({"stroke-linejoin":"round"}).shadow(t,m));l.attr({visibility:c.visible?"inherit":"hidden"});l.addClass(c.getClassName())}})},searchPoint:r,sortByAngle:function(a,d){a.sort(function(a,b){return void 0!==a.angle&&(b.angle-a.angle)*d})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,getCenter:G.getCenter,getSymbol:r},{init:function(){v.prototype.init.apply(this,
arguments);var a=this,d;a.name=u(a.name,"Slice");d=function(c){a.slice("select"===c.type)};y(a,"select",d);y(a,"unselect",d);return a},isValid:function(){return a.isNumber(this.y,!0)&&0<=this.y},setVisible:function(a,d){var c=this,b=c.series,g=b.chart,f=b.options.ignoreHiddenPoint;d=u(d,f);a!==c.visible&&(c.visible=c.options.visible=a=void 0===a?!c.visible:a,b.options.data[b.data.indexOf(c)]=c.options,["graphic","dataLabel","connector","shadowGroup"].forEach(function(b){if(c[b])c[b][a?"show":"hide"](!0)}),
c.legendItem&&g.legend.colorizeItem(c,a),a||"hover"!==c.state||c.setState(""),f&&(b.isDirty=!0),d&&g.redraw())},slice:function(a,d,h){var b=this.series;g(h,b.chart);u(d,!0);this.sliced=this.options.sliced=E(a)?a:!this.sliced;b.options.data[b.data.indexOf(this)]=this.options;this.graphic.animate(this.getTranslate());this.shadowGroup&&this.shadowGroup.animate(this.getTranslate())},getTranslate:function(){return this.sliced?this.slicedTranslation:{translateX:0,translateY:0}},haloPath:function(a){var c=
this.shapeArgs;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(c.x,c.y,c.r+a,c.r+a,{innerR:this.shapeArgs.r-1,start:c.start,end:c.end})},connectorShapes:{fixedOffset:function(a,d,g){var b=d.breakAt;d=d.touchingSliceAt;return["M",a.x,a.y].concat(g.softConnector?["C",a.x+("left"===a.alignment?-5:5),a.y,2*b.x-d.x,2*b.y-d.y,b.x,b.y]:["L",b.x,b.y]).concat(["L",d.x,d.y])},straight:function(a,d){d=d.touchingSliceAt;return["M",a.x,a.y,"L",d.x,d.y]},crookedLine:function(c,d,g){d=
d.touchingSliceAt;var b=this.series,h=b.center[0],f=b.chart.plotWidth,m=b.chart.plotLeft,b=c.alignment,t=this.shapeArgs.r;g=a.relativeLength(g.crookDistance,1);g="left"===b?h+t+(f+m-h-t)*(1-g):m+(h-t)*g;h=["L",g,c.y];if("left"===b?g>c.x||g<d.x:g<c.x||g>d.x)h=[];return["M",c.x,c.y].concat(h).concat(["L",d.x,d.y])}},getConnectorPath:function(){var a=this.labelPosition,d=this.series.options.dataLabels,g=d.connectorShape,b=this.connectorShapes;b[g]&&(g=b[g]);return g.call(this,{x:a.final.x,y:a.final.y,
alignment:a.alignment},a.connectorPosition,d)}})})(J);(function(a){var y=a.addEvent,G=a.arrayMax,E=a.defined,h=a.extend,d=a.format,r=a.merge,u=a.noop,v=a.pick,w=a.relativeLength,n=a.Series,g=a.seriesTypes,c=a.stableSort,m=a.isArray,p=a.splat;a.distribute=function(b,d,f){function g(a,b){return a.target-b.target}var h,l=!0,m=b,p=[],k;k=0;var n=m.reducedLen||d;for(h=b.length;h--;)k+=b[h].size;if(k>n){c(b,function(a,b){return(b.rank||0)-(a.rank||0)});for(k=h=0;k<=n;)k+=b[h].size,h++;p=b.splice(h-1,b.length)}c(b,
g);for(b=b.map(function(a){return{size:a.size,targets:[a.target],align:v(a.align,.5)}});l;){for(h=b.length;h--;)l=b[h],k=(Math.min.apply(0,l.targets)+Math.max.apply(0,l.targets))/2,l.pos=Math.min(Math.max(0,k-l.size*l.align),d-l.size);h=b.length;for(l=!1;h--;)0<h&&b[h-1].pos+b[h-1].size>b[h].pos&&(b[h-1].size+=b[h].size,b[h-1].targets=b[h-1].targets.concat(b[h].targets),b[h-1].align=.5,b[h-1].pos+b[h-1].size>d&&(b[h-1].pos=d-b[h-1].size),b.splice(h,1),l=!0)}m.push.apply(m,p);h=0;b.some(function(b){var c=
0;if(b.targets.some(function(){m[h].pos=b.pos+c;if(Math.abs(m[h].pos-m[h].target)>f)return m.slice(0,h+1).forEach(function(a){delete a.pos}),m.reducedLen=(m.reducedLen||d)-.1*d,m.reducedLen>.1*d&&a.distribute(m,d,f),!0;c+=m[h].size;h++}))return!0});c(m,g)};n.prototype.drawDataLabels=function(){function b(a,b){var d=b.filter;return d?(b=d.operator,a=a[d.property],d=d.value,"\x3e"===b&&a>d||"\x3c"===b&&a<d||"\x3e\x3d"===b&&a>=d||"\x3c\x3d"===b&&a<=d||"\x3d\x3d"===b&&a==d||"\x3d\x3d\x3d"===b&&a===d?
!0:!1):!0}function c(a,b){var d=[],c;if(m(a)&&!m(b))d=a.map(function(a){return r(a,b)});else if(m(b)&&!m(a))d=b.map(function(b){return r(a,b)});else if(m(a)||m(b))for(c=Math.max(a.length,b.length);c--;)d[c]=r(a[c],b[c]);else d=r(a,b);return d}var f=this,g=f.chart,h=f.options,n=h.dataLabels,u=f.points,z,k=f.hasRendered||0,A,w=v(n.defer,!!h.animation),C=g.renderer,n=c(c(g.options.plotOptions&&g.options.plotOptions.series&&g.options.plotOptions.series.dataLabels,g.options.plotOptions&&g.options.plotOptions[f.type]&&
g.options.plotOptions[f.type].dataLabels),n);a.fireEvent(this,"drawDataLabels");if(m(n)||n.enabled||f._hasPointLabels)A=f.plotGroup("dataLabelsGroup","data-labels",w&&!k?"hidden":"visible",n.zIndex||6),w&&(A.attr({opacity:+k}),k||y(f,"afterAnimate",function(){f.visible&&A.show(!0);A[h.animation?"animate":"attr"]({opacity:1},{duration:200})})),u.forEach(function(e){z=p(c(n,e.dlOptions||e.options&&e.options.dataLabels));z.forEach(function(c,k){var l=c.enabled&&!e.isNull&&b(e,c),m,q,t,p,n=e.dataLabels?
e.dataLabels[k]:e.dataLabel,r=e.connectors?e.connectors[k]:e.connector,u=!n;l&&(m=e.getLabelConfig(),q=c[e.formatPrefix+"Format"]||c.format,m=E(q)?d(q,m,g.time):(c[e.formatPrefix+"Formatter"]||c.formatter).call(m,c),q=c.style,t=c.rotation,g.styledMode||(q.color=v(c.color,q.color,f.color,"#000000"),"contrast"===q.color&&(e.contrastColor=C.getContrast(e.color||f.color),q.color=c.inside||0>v(c.distance,e.labelDistance)||h.stacking?e.contrastColor:"#000000"),h.cursor&&(q.cursor=h.cursor)),p={r:c.borderRadius||
0,rotation:t,padding:c.padding,zIndex:1},g.styledMode||(p.fill=c.backgroundColor,p.stroke=c.borderColor,p["stroke-width"]=c.borderWidth),a.objectEach(p,function(a,b){void 0===a&&delete p[b]}));!n||l&&E(m)?l&&E(m)&&(n?p.text=m:(e.dataLabels=e.dataLabels||[],n=e.dataLabels[k]=t?C.text(m,0,-9999).addClass("highcharts-data-label"):C.label(m,0,-9999,c.shape,null,null,c.useHTML,null,"data-label"),k||(e.dataLabel=n),n.addClass(" highcharts-data-label-color-"+e.colorIndex+" "+(c.className||"")+(c.useHTML?
" highcharts-tracker":""))),n.options=c,n.attr(p),g.styledMode||n.css(q).shadow(c.shadow),n.added||n.add(A),f.alignDataLabel(e,n,c,null,u)):(e.dataLabel=e.dataLabel&&e.dataLabel.destroy(),e.dataLabels&&(1===e.dataLabels.length?delete e.dataLabels:delete e.dataLabels[k]),k||delete e.dataLabel,r&&(e.connector=e.connector.destroy(),e.connectors&&(1===e.connectors.length?delete e.connectors:delete e.connectors[k])))})});a.fireEvent(this,"afterDrawDataLabels")};n.prototype.alignDataLabel=function(a,c,
d,g,m){var b=this.chart,f=this.isCartesian&&b.inverted,l=v(a.dlBox&&a.dlBox.centerX,a.plotX,-9999),k=v(a.plotY,-9999),n=c.getBBox(),p,t=d.rotation,e=d.align,q=this.visible&&(a.series.forceDL||b.isInsidePlot(l,Math.round(k),f)||g&&b.isInsidePlot(l,f?g.x+1:g.y+g.height-1,f)),r="justify"===v(d.overflow,"justify");if(q&&(p=b.renderer.fontMetrics(b.styledMode?void 0:d.style.fontSize,c).b,g=h({x:f?this.yAxis.len-k:l,y:Math.round(f?this.xAxis.len-l:k),width:0,height:0},g),h(d,{width:n.width,height:n.height}),
t?(r=!1,l=b.renderer.rotCorr(p,t),l={x:g.x+d.x+g.width/2+l.x,y:g.y+d.y+{top:0,middle:.5,bottom:1}[d.verticalAlign]*g.height},c[m?"attr":"animate"](l).attr({align:e}),k=(t+720)%360,k=180<k&&360>k,"left"===e?l.y-=k?n.height:0:"center"===e?(l.x-=n.width/2,l.y-=n.height/2):"right"===e&&(l.x-=n.width,l.y-=k?0:n.height),c.placed=!0,c.alignAttr=l):(c.align(d,null,g),l=c.alignAttr),r&&0<=g.height?a.isLabelJustified=this.justifyDataLabel(c,d,l,n,g,m):v(d.crop,!0)&&(q=b.isInsidePlot(l.x,l.y)&&b.isInsidePlot(l.x+
n.width,l.y+n.height)),d.shape&&!t))c[m?"attr":"animate"]({anchorX:f?b.plotWidth-a.plotY:a.plotX,anchorY:f?b.plotHeight-a.plotX:a.plotY});q||(c.attr({y:-9999}),c.placed=!1)};n.prototype.justifyDataLabel=function(a,c,d,g,h,m){var b=this.chart,f=c.align,k=c.verticalAlign,l,n,p=a.box?0:a.padding||0;l=d.x+p;0>l&&("right"===f?c.align="left":c.x=-l,n=!0);l=d.x+g.width-p;l>b.plotWidth&&("left"===f?c.align="right":c.x=b.plotWidth-l,n=!0);l=d.y+p;0>l&&("bottom"===k?c.verticalAlign="top":c.y=-l,n=!0);l=d.y+
g.height-p;l>b.plotHeight&&("top"===k?c.verticalAlign="bottom":c.y=b.plotHeight-l,n=!0);n&&(a.placed=!m,a.align(c,null,h));return n};g.pie&&(g.pie.prototype.dataLabelPositioners={radialDistributionY:function(a){return a.top+a.distributeBox.pos},radialDistributionX:function(a,c,d,g){return a.getX(d<c.top+2||d>c.bottom-2?g:d,c.half,c)},justify:function(a,c,d){return d[0]+(a.half?-1:1)*(c+a.labelDistance)},alignToPlotEdges:function(a,c,d,g){a=a.getBBox().width;return c?a+g:d-a-g},alignToConnectors:function(a,
c,d,g){var b=0,f;a.forEach(function(a){f=a.dataLabel.getBBox().width;f>b&&(b=f)});return c?b+g:d-b-g}},g.pie.prototype.drawDataLabels=function(){var b=this,c=b.data,d,g=b.chart,h=b.options.dataLabels,m=h.connectorPadding,p=v(h.connectorWidth,1),r=g.plotWidth,k=g.plotHeight,u=g.plotLeft,w=Math.round(g.chartWidth/3),y,e=b.center,q=e[2]/2,L=e[1],I,J,K,M,S=[[],[]],B,N,P,T,Q=[0,0,0,0],O=b.dataLabelPositioners;b.visible&&(h.enabled||b._hasPointLabels)&&(c.forEach(function(a){a.dataLabel&&a.visible&&a.dataLabel.shortened&&
(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),a.dataLabel.shortened=!1)}),n.prototype.drawDataLabels.apply(b),c.forEach(function(a){a.dataLabel&&(a.visible?(S[a.half].push(a),a.dataLabel._pos=null,!E(h.style.width)&&!E(a.options.dataLabels&&a.options.dataLabels.style&&a.options.dataLabels.style.width)&&a.dataLabel.getBBox().width>w&&(a.dataLabel.css({width:.7*w}),a.dataLabel.shortened=!0)):(a.dataLabel=a.dataLabel.destroy(),a.dataLabels&&1===a.dataLabels.length&&delete a.dataLabels))}),
S.forEach(function(c,f){var l,n,p=c.length,t=[],x;if(p)for(b.sortByAngle(c,f-.5),0<b.maxLabelDistance&&(l=Math.max(0,L-q-b.maxLabelDistance),n=Math.min(L+q+b.maxLabelDistance,g.plotHeight),c.forEach(function(a){0<a.labelDistance&&a.dataLabel&&(a.top=Math.max(0,L-q-a.labelDistance),a.bottom=Math.min(L+q+a.labelDistance,g.plotHeight),x=a.dataLabel.getBBox().height||21,a.distributeBox={target:a.labelPosition.natural.y-a.top+x/2,size:x,rank:a.y},t.push(a.distributeBox))}),l=n+x-l,a.distribute(t,l,l/5)),
T=0;T<p;T++){d=c[T];K=d.labelPosition;I=d.dataLabel;P=!1===d.visible?"hidden":"inherit";N=l=K.natural.y;t&&E(d.distributeBox)&&(void 0===d.distributeBox.pos?P="hidden":(M=d.distributeBox.size,N=O.radialDistributionY(d)));delete d.positionIndex;if(h.justify)B=O.justify(d,q,e);else switch(h.alignTo){case "connectors":B=O.alignToConnectors(c,f,r,u);break;case "plotEdges":B=O.alignToPlotEdges(I,f,r,u);break;default:B=O.radialDistributionX(b,d,N,l)}I._attr={visibility:P,align:K.alignment};I._pos={x:B+
h.x+({left:m,right:-m}[K.alignment]||0),y:N+h.y-10};K.final.x=B;K.final.y=N;v(h.crop,!0)&&(J=I.getBBox().width,l=null,B-J<m&&1===f?(l=Math.round(J-B+m),Q[3]=Math.max(l,Q[3])):B+J>r-m&&0===f&&(l=Math.round(B+J-r+m),Q[1]=Math.max(l,Q[1])),0>N-M/2?Q[0]=Math.max(Math.round(-N+M/2),Q[0]):N+M/2>k&&(Q[2]=Math.max(Math.round(N+M/2-k),Q[2])),I.sideOverflow=l)}}),0===G(Q)||this.verifyDataLabelOverflow(Q))&&(this.placeDataLabels(),p&&this.points.forEach(function(a){var c;y=a.connector;if((I=a.dataLabel)&&I._pos&&
a.visible&&0<a.labelDistance){P=I._attr.visibility;if(c=!y)a.connector=y=g.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-"+a.colorIndex+(a.className?" "+a.className:"")).add(b.dataLabelsGroup),g.styledMode||y.attr({"stroke-width":p,stroke:h.connectorColor||a.color||"#666666"});y[c?"attr":"animate"]({d:a.getConnectorPath()});y.attr("visibility",P)}else y&&(a.connector=y.destroy())}))},g.pie.prototype.placeDataLabels=function(){this.points.forEach(function(a){var b=a.dataLabel;
b&&a.visible&&((a=b._pos)?(b.sideOverflow&&(b._attr.width=b.getBBox().width-b.sideOverflow,b.css({width:b._attr.width+"px",textOverflow:(this.options.dataLabels.style||{}).textOverflow||"ellipsis"}),b.shortened=!0),b.attr(b._attr),b[b.moved?"animate":"attr"](a),b.moved=!0):b&&b.attr({y:-9999}))},this)},g.pie.prototype.alignDataLabel=u,g.pie.prototype.verifyDataLabelOverflow=function(a){var b=this.center,c=this.options,d=c.center,g=c.minSize||80,h,m=null!==c.size;m||(null!==d[0]?h=Math.max(b[2]-Math.max(a[1],
a[3]),g):(h=Math.max(b[2]-a[1]-a[3],g),b[0]+=(a[3]-a[1])/2),null!==d[1]?h=Math.max(Math.min(h,b[2]-Math.max(a[0],a[2])),g):(h=Math.max(Math.min(h,b[2]-a[0]-a[2]),g),b[1]+=(a[0]-a[2])/2),h<b[2]?(b[2]=h,b[3]=Math.min(w(c.innerSize||0,h),h),this.translate(b),this.drawDataLabels&&this.drawDataLabels()):m=!0);return m});g.column&&(g.column.prototype.alignDataLabel=function(a,c,d,g,h){var b=this.chart.inverted,f=a.series,l=a.dlBox||a.shapeArgs,k=v(a.below,a.plotY>v(this.translatedThreshold,f.yAxis.len)),
m=v(d.inside,!!this.options.stacking);l&&(g=r(l),0>g.y&&(g.height+=g.y,g.y=0),l=g.y+g.height-f.yAxis.len,0<l&&(g.height-=l),b&&(g={x:f.yAxis.len-g.y-g.height,y:f.xAxis.len-g.x-g.width,width:g.height,height:g.width}),m||(b?(g.x+=k?0:g.width,g.width=0):(g.y+=k?g.height:0,g.height=0)));d.align=v(d.align,!b||m?"center":k?"right":"left");d.verticalAlign=v(d.verticalAlign,b||m?"middle":k?"top":"bottom");n.prototype.alignDataLabel.call(this,a,c,d,g,h);a.isLabelJustified&&a.contrastColor&&c.css({color:a.contrastColor})})})(J);
(function(a){var y=a.Chart,G=a.isArray,E=a.objectEach,h=a.pick,d=a.addEvent,r=a.fireEvent;d(y,"render",function(){var a=[];(this.labelCollectors||[]).forEach(function(d){a=a.concat(d())});(this.yAxis||[]).forEach(function(d){d.options.stackLabels&&!d.options.stackLabels.allowOverlap&&E(d.stacks,function(d){E(d,function(d){a.push(d.label)})})});(this.series||[]).forEach(function(d){var r=d.options.dataLabels;d.visible&&(!1!==r.enabled||d._hasPointLabels)&&d.points.forEach(function(d){d.visible&&(G(d.dataLabels)?
d.dataLabels:d.dataLabel?[d.dataLabel]:[]).forEach(function(g){var c=g.options;g.labelrank=h(c.labelrank,d.labelrank,d.shapeArgs&&d.shapeArgs.height);c.allowOverlap||a.push(g)})})});this.hideOverlappingLabels(a)});y.prototype.hideOverlappingLabels=function(a){var d=this,h=a.length,n=d.renderer,g,c,m,p,b,l,f=function(a,b,d,c,f,g,h,l){return!(f>a+d||f+h<a||g>b+c||g+l<b)};m=function(a){var b,d,c,f=a.box?0:a.padding||0;c=0;if(a&&(!a.alignAttr||a.placed))return b=a.alignAttr||{x:a.attr("x"),y:a.attr("y")},
d=a.parentGroup,a.width||(c=a.getBBox(),a.width=c.width,a.height=c.height,c=n.fontMetrics(null,a.element).h),{x:b.x+(d.translateX||0)+f,y:b.y+(d.translateY||0)+f-c,width:a.width-2*f,height:a.height-2*f}};for(c=0;c<h;c++)if(g=a[c])g.oldOpacity=g.opacity,g.newOpacity=1,g.absoluteBox=m(g);a.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(c=0;c<h;c++)for(l=(m=a[c])&&m.absoluteBox,g=c+1;g<h;++g)if(b=(p=a[g])&&p.absoluteBox,l&&b&&m!==p&&0!==m.newOpacity&&0!==p.newOpacity&&(b=f(l.x,l.y,
l.width,l.height,b.x,b.y,b.width,b.height)))(m.labelrank<p.labelrank?m:p).newOpacity=0;a.forEach(function(a){var b,c;a&&(c=a.newOpacity,a.oldOpacity!==c&&(a.alignAttr&&a.placed?(c?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=c,a[a.isOld?"animate":"attr"](a.alignAttr,null,b),r(d,"afterHideOverlappingLabels")):a.attr({opacity:c})),a.isOld=!0)})}})(J);(function(a){var y=a.addEvent,G=a.Chart,E=a.createElement,h=a.css,d=a.defaultOptions,r=a.defaultPlotOptions,u=a.extend,v=a.fireEvent,w=a.hasTouch,
n=a.isObject,g=a.Legend,c=a.merge,m=a.pick,p=a.Point,b=a.Series,l=a.seriesTypes,f=a.svg,x;x=a.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart,d=b.pointer,c=function(a){var b=d.getPointFromEvent(a);void 0!==b&&(d.isDirectTouch=!0,b.onMouseOver(a))};a.points.forEach(function(a){a.graphic&&(a.graphic.element.point=a);a.dataLabel&&(a.dataLabel.div?a.dataLabel.div.point=a:a.dataLabel.element.point=a)});a._hasTracking||(a.trackerGroups.forEach(function(f){if(a[f]){a[f].addClass("highcharts-tracker").on("mouseover",
c).on("mouseout",function(a){d.onTrackerMouseOut(a)});if(w)a[f].on("touchstart",c);!b.styledMode&&a.options.cursor&&a[f].css(h).css({cursor:a.options.cursor})}}),a._hasTracking=!0);v(this,"afterDrawTracker")},drawTrackerGraph:function(){var a=this,b=a.options,d=b.trackByArea,c=[].concat(d?a.areaPath:a.graphPath),g=c.length,h=a.chart,l=h.pointer,m=h.renderer,e=h.options.tooltip.snap,q=a.tracker,p,n=function(){if(h.hoverSeries!==a)a.onMouseOver()},r="rgba(192,192,192,"+(f?.0001:.002)+")";if(g&&!d)for(p=
g+1;p--;)"M"===c[p]&&c.splice(p+1,0,c[p+1]-e,c[p+2],"L"),(p&&"M"===c[p]||p===g)&&c.splice(p,0,"L",c[p-2]+e,c[p-1]);q?q.attr({d:c}):a.graph&&(a.tracker=m.path(c).attr({visibility:a.visible?"visible":"hidden",zIndex:2}).addClass(d?"highcharts-tracker-area":"highcharts-tracker-line").add(a.group),h.styledMode||a.tracker.attr({"stroke-linejoin":"round",stroke:r,fill:d?r:"none","stroke-width":a.graph.strokeWidth()+(d?0:2*e)}),[a.tracker,a.markerGroup].forEach(function(a){a.addClass("highcharts-tracker").on("mouseover",
n).on("mouseout",function(a){l.onTrackerMouseOut(a)});b.cursor&&!h.styledMode&&a.css({cursor:b.cursor});if(w)a.on("touchstart",n)}));v(this,"afterDrawTracker")}};l.column&&(l.column.prototype.drawTracker=x.drawTrackerPoint);l.pie&&(l.pie.prototype.drawTracker=x.drawTrackerPoint);l.scatter&&(l.scatter.prototype.drawTracker=x.drawTrackerPoint);u(g.prototype,{setItemEvents:function(a,b,d){var f=this,g=f.chart.renderer.boxWrapper,h="highcharts-legend-"+(a instanceof p?"point":"series")+"-active",l=f.chart.styledMode;
(d?b:a.legendGroup).on("mouseover",function(){a.setState("hover");g.addClass(h);l||b.css(f.options.itemHoverStyle)}).on("mouseout",function(){f.styledMode||b.css(c(a.visible?f.itemStyle:f.itemHiddenStyle));g.removeClass(h);a.setState()}).on("click",function(b){var d=function(){a.setVisible&&a.setVisible()};g.removeClass(h);b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,d):v(a,"legendItemClick",b,d)})},createCheckboxForItem:function(a){a.checkbox=E("input",{type:"checkbox",
className:"highcharts-legend-checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);y(a.checkbox,"click",function(b){v(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})}});u(G.prototype,{showResetZoom:function(){function a(){b.zoomOut()}var b=this,c=d.lang,f=b.options.chart.resetZoomButton,g=f.theme,h=g.states,l="chart"===f.relativeTo?null:"plotBox";v(this,"beforeShowResetZoom",null,function(){b.resetZoomButton=
b.renderer.button(c.resetZoom,null,null,a,g,h&&h.hover).attr({align:f.position.align,title:c.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(f.position,!1,l)})},zoomOut:function(){v(this,"selection",{resetSelection:!0},this.zoom)},zoom:function(a){var b,d=this.pointer,c=!1,f;!a||a.resetSelection?(this.axes.forEach(function(a){b=a.zoom()}),d.initiated=!1):a.xAxis.concat(a.yAxis).forEach(function(a){var f=a.axis;d[f.isXAxis?"zoomX":"zoomY"]&&(b=f.zoom(a.min,a.max),f.displayBtn&&(c=!0))});
f=this.resetZoomButton;c&&!f?this.showResetZoom():!c&&n(f)&&(this.resetZoomButton=f.destroy());b&&this.redraw(m(this.options.chart.animation,a&&a.animation,100>this.pointCount))},pan:function(a,b){var c=this,d=c.hoverPoints,f;d&&d.forEach(function(a){a.setState()});("xy"===b?[1,0]:[1]).forEach(function(b){b=c[b?"xAxis":"yAxis"][0];var d=b.horiz,g=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",e=c[d],h=(b.pointRange||0)/2,k=b.reversed&&!c.inverted||!b.reversed&&c.inverted?-1:1,l=b.getExtremes(),
m=b.toValue(e-g,!0)+h*k,k=b.toValue(e+b.len-g,!0)-h*k,p=k<m,e=p?k:m,m=p?m:k,k=Math.min(l.dataMin,h?l.min:b.toValue(b.toPixels(l.min)-b.minPixelPadding)),h=Math.max(l.dataMax,h?l.max:b.toValue(b.toPixels(l.max)+b.minPixelPadding)),p=k-e;0<p&&(m+=p,e=k);p=m-h;0<p&&(m=h,e-=p);b.series.length&&e!==l.min&&m!==l.max&&(b.setExtremes(e,m,!1,!1,{trigger:"pan"}),f=!0);c[d]=g});f&&c.redraw(!1);h(c.container,{cursor:"move"})}});u(p.prototype,{select:function(a,b){var c=this,d=c.series,f=d.chart;a=m(a,!c.selected);
c.firePointEvent(a?"select":"unselect",{accumulate:b},function(){c.selected=c.options.selected=a;d.options.data[d.data.indexOf(c)]=c.options;c.setState(a&&"select");b||f.getSelectedPoints().forEach(function(a){a.selected&&a!==c&&(a.selected=a.options.selected=!1,d.options.data[d.data.indexOf(a)]=a.options,a.setState(""),a.firePointEvent("unselect"))})})},onMouseOver:function(a){var b=this.series.chart,c=b.pointer;a=a?c.normalize(a):c.getChartCoordinatesFromPoint(this,b.inverted);c.runPointActions(a,
this)},onMouseOut:function(){var a=this.series.chart;this.firePointEvent("mouseOut");(a.hoverPoints||[]).forEach(function(a){a.setState()});a.hoverPoints=a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var b=this,d=c(b.series.options.point,b.options).events;b.events=d;a.objectEach(d,function(a,c){y(b,c,a)});this.hasImportedEvents=!0}},setState:function(a,b){var c=Math.floor(this.plotX),d=this.plotY,f=this.series,g=f.options.states[a||"normal"]||{},h=r[f.type].marker&&f.options.marker,
l=h&&!1===h.enabled,e=h&&h.states&&h.states[a||"normal"]||{},p=!1===e.enabled,n=f.stateMarkerGraphic,t=this.marker||{},w=f.chart,x=f.halo,y,E=h&&f.markerAttribs;a=a||"";if(!(a===this.state&&!b||this.selected&&"select"!==a||!1===g.enabled||a&&(p||l&&!1===e.enabled)||a&&t.states&&t.states[a]&&!1===t.states[a].enabled)){E&&(y=f.markerAttribs(this,a));if(this.graphic)this.state&&this.graphic.removeClass("highcharts-point-"+this.state),a&&this.graphic.addClass("highcharts-point-"+a),w.styledMode||this.graphic.animate(f.pointAttribs(this,
a),m(w.options.chart.animation,g.animation)),y&&this.graphic.animate(y,m(w.options.chart.animation,e.animation,h.animation)),n&&n.hide();else{if(a&&e){h=t.symbol||f.symbol;n&&n.currentSymbol!==h&&(n=n.destroy());if(n)n[b?"animate":"attr"]({x:y.x,y:y.y});else h&&(f.stateMarkerGraphic=n=w.renderer.symbol(h,y.x,y.y,y.width,y.height).add(f.markerGroup),n.currentSymbol=h);!w.styledMode&&n&&n.attr(f.pointAttribs(this,a))}n&&(n[a&&w.isInsidePlot(c,d,w.inverted)?"show":"hide"](),n.element.point=this)}(c=
g.halo)&&c.size?(x||(f.halo=x=w.renderer.path().add((this.graphic||n).parentGroup)),x.show()[b?"animate":"attr"]({d:this.haloPath(c.size)}),x.attr({"class":"highcharts-halo highcharts-color-"+m(this.colorIndex,f.colorIndex)+(this.className?" "+this.className:""),zIndex:-1}),x.point=this,w.styledMode||x.attr(u({fill:this.color||f.color,"fill-opacity":c.opacity},c.attributes))):x&&x.point&&x.point.haloPath&&x.animate({d:x.point.haloPath(0)},null,x.hide);this.state=a;v(this,"afterSetState")}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-
a,this.plotY-a,2*a,2*a)}});u(b.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&v(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;b.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&v(this,"mouseOut");!c||this.stickyTracking||c.shared&&!this.noSharedTooltip||c.hide();this.setState()},setState:function(a){var b=this,
c=b.options,d=b.graph,f=c.states,g=c.lineWidth,c=0;a=a||"";if(b.state!==a&&([b.group,b.markerGroup,b.dataLabelsGroup].forEach(function(c){c&&(b.state&&c.removeClass("highcharts-series-"+b.state),a&&c.addClass("highcharts-series-"+a))}),b.state=a,!(b.chart.styledMode||f[a]&&!1===f[a].enabled)&&(a&&(g=f[a].lineWidth||g+(f[a].lineWidthPlus||0)),d&&!d.dashstyle)))for(g={"stroke-width":g},d.animate(g,m(f[a||"normal"]&&f[a||"normal"].animation,b.chart.options.chart.animation));b["zone-graph-"+c];)b["zone-graph-"+
c].attr(g),c+=1},setVisible:function(a,b){var c=this,d=c.chart,f=c.legendItem,g,h=d.options.chart.ignoreHiddenSeries,l=c.visible;g=(c.visible=a=c.options.visible=c.userOptions.visible=void 0===a?!l:a)?"show":"hide";["group","dataLabelsGroup","markerGroup","tracker","tt"].forEach(function(a){if(c[a])c[a][g]()});if(d.hoverSeries===c||(d.hoverPoint&&d.hoverPoint.series)===c)c.onMouseOut();f&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&d.series.forEach(function(a){a.options.stacking&&
a.visible&&(a.isDirty=!0)});c.linkedSeries.forEach(function(b){b.setVisible(a,!1)});h&&(d.isDirtyBox=!0);v(c,g);!1!==b&&d.redraw()},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=this.options.selected=void 0===a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);v(this,a?"select":"unselect")},drawTracker:x.drawTrackerGraph})})(J);(function(a){var y=a.Chart,G=a.isArray,E=a.isObject,h=a.pick,d=a.splat;y.prototype.setResponsive=function(d){var h=
this.options.responsive,r=[],w=this.currentResponsive;h&&h.rules&&h.rules.forEach(function(g){void 0===g._id&&(g._id=a.uniqueKey());this.matchResponsiveRule(g,r,d)},this);var n=a.merge.apply(0,r.map(function(d){return a.find(h.rules,function(a){return a._id===d}).chartOptions})),r=r.toString()||void 0;r!==(w&&w.ruleIds)&&(w&&this.update(w.undoOptions,d),r?(this.currentResponsive={ruleIds:r,mergedOptions:n,undoOptions:this.currentOptions(n)},this.update(n,d)):this.currentResponsive=void 0)};y.prototype.matchResponsiveRule=
function(a,d){var r=a.condition;(r.callback||function(){return this.chartWidth<=h(r.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=h(r.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=h(r.minWidth,0)&&this.chartHeight>=h(r.minHeight,0)}).call(this)&&d.push(a._id)};y.prototype.currentOptions=function(h){function r(h,n,g,c){var m;a.objectEach(h,function(a,b){if(!c&&-1<["series","xAxis","yAxis"].indexOf(b))for(a=d(a),g[b]=[],m=0;m<a.length;m++)n[b][m]&&(g[b][m]={},r(a[m],n[b][m],g[b][m],c+1));else E(a)?
(g[b]=G(a)?[]:{},r(a,n[b]||{},g[b],c+1)):g[b]=n[b]||null})}var v={};r(h,this.options,v,0);return v}})(J);return J});

},{}],40:[function(require,module,exports){
/*
 Highcharts JS v7.0.0 (2018-12-11)
 Exporting module

 (c) 2010-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(l){"object"===typeof module&&module.exports?module.exports=l:"function"===typeof define&&define.amd?define(function(){return l}):l("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(l){(function(g){var y=g.defaultOptions,z=g.doc,l=g.Chart,q=g.addEvent,I=g.removeEvent,C=g.fireEvent,t=g.createElement,D=g.discardElement,r=g.css,p=g.merge,u=g.pick,E=g.objectEach,x=g.extend,J=g.isTouchDevice,A=g.win,G=A.navigator.userAgent,F=g.SVGRenderer,H=g.Renderer.prototype.symbols,K=/Edge\/|Trident\/|MSIE /.test(G),
L=/firefox/i.test(G);x(y.lang,{printChart:"Print chart",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",contextButtonTitle:"Chart context menu"});y.navigation||(y.navigation={});p(!0,y.navigation,{buttonOptions:{theme:{},symbolSize:14,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,verticalAlign:"top",width:24}});p(!0,y.navigation,{menuStyle:{border:"1px solid #999999",background:"#ffffff",
padding:"5px 0"},menuItemStyle:{padding:"0.5em 1em",color:"#333333",background:"none",fontSize:J?"14px":"11px",transition:"background 250ms, color 250ms"},menuItemHoverStyle:{background:"#335cad",color:"#ffffff"},buttonOptions:{symbolFill:"#666666",symbolStroke:"#666666",symbolStrokeWidth:3,theme:{padding:5}}});y.exporting={type:"image/png",url:"https://export.highcharts.com/",printMaxWidth:780,scale:2,buttons:{contextButton:{className:"highcharts-contextbutton",menuClassName:"highcharts-contextmenu",
symbol:"menu",titleKey:"contextButtonTitle",menuItems:"printChart separator downloadPNG downloadJPEG downloadPDF downloadSVG".split(" ")}},menuItemDefinitions:{printChart:{textKey:"printChart",onclick:function(){this.print()}},separator:{separator:!0},downloadPNG:{textKey:"downloadPNG",onclick:function(){this.exportChart()}},downloadJPEG:{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})}},downloadPDF:{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})}},
downloadSVG:{textKey:"downloadSVG",onclick:function(){this.exportChart({type:"image/svg+xml"})}}}};g.post=function(b,a,d){var c=t("form",p({method:"post",action:b,enctype:"multipart/form-data"},d),{display:"none"},z.body);E(a,function(a,b){t("input",{type:"hidden",name:b,value:a},null,c)});c.submit();D(c)};x(l.prototype,{sanitizeSVG:function(b,a){if(a&&a.exporting&&a.exporting.allowHTML){var d=b.match(/<\/svg>(.*?$)/);d&&d[1]&&(d='\x3cforeignObject x\x3d"0" y\x3d"0" width\x3d"'+a.chart.width+'" height\x3d"'+
a.chart.height+'"\x3e\x3cbody xmlns\x3d"http://www.w3.org/1999/xhtml"\x3e'+d[1]+"\x3c/body\x3e\x3c/foreignObject\x3e",b=b.replace("\x3c/svg\x3e",d+"\x3c/svg\x3e"))}b=b.replace(/zIndex="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\(("|&quot;)(\S+)("|&quot;)\)/g,"url($2)").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'\x3csvg xmlns:xlink\x3d"http://www.w3.org/1999/xlink" ').replace(/ (|NS[0-9]+\:)href=/g," xlink:href\x3d").replace(/\n/," ").replace(/<\/svg>.*?$/,
"\x3c/svg\x3e").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g,'$1\x3d"rgb($2)" $1-opacity\x3d"$3"').replace(/&nbsp;/g,"\u00a0").replace(/&shy;/g,"\u00ad");this.ieSanitizeSVG&&(b=this.ieSanitizeSVG(b));return b},getChartHTML:function(){this.styledMode&&this.inlineStyles();return this.container.innerHTML},getSVG:function(b){var a,d,c,w,m,h=p(this.options,b);d=t("div",null,{position:"absolute",top:"-9999em",width:this.chartWidth+"px",height:this.chartHeight+"px"},z.body);c=
this.renderTo.style.width;m=this.renderTo.style.height;c=h.exporting.sourceWidth||h.chart.width||/px$/.test(c)&&parseInt(c,10)||(h.isGantt?800:600);m=h.exporting.sourceHeight||h.chart.height||/px$/.test(m)&&parseInt(m,10)||400;x(h.chart,{animation:!1,renderTo:d,forExport:!0,renderer:"SVGRenderer",width:c,height:m});h.exporting.enabled=!1;delete h.data;h.series=[];this.series.forEach(function(a){w=p(a.userOptions,{animation:!1,enableMouseTracking:!1,showCheckbox:!1,visible:a.visible});w.isInternal||
h.series.push(w)});this.axes.forEach(function(a){a.userOptions.internalKey||(a.userOptions.internalKey=g.uniqueKey())});a=new g.Chart(h,this.callback);b&&["xAxis","yAxis","series"].forEach(function(c){var d={};b[c]&&(d[c]=b[c],a.update(d))});this.axes.forEach(function(b){var c=g.find(a.axes,function(a){return a.options.internalKey===b.userOptions.internalKey}),d=b.getExtremes(),e=d.userMin,d=d.userMax;c&&(void 0!==e&&e!==c.min||void 0!==d&&d!==c.max)&&c.setExtremes(e,d,!0,!1)});c=a.getChartHTML();
C(this,"getSVG",{chartCopy:a});c=this.sanitizeSVG(c,h);h=null;a.destroy();D(d);return c},getSVGForExport:function(b,a){var d=this.options.exporting;return this.getSVG(p({chart:{borderRadius:0}},d.chartOptions,a,{exporting:{sourceWidth:b&&b.sourceWidth||d.sourceWidth,sourceHeight:b&&b.sourceHeight||d.sourceHeight}}))},getFilename:function(){var b=this.userOptions.title&&this.userOptions.title.text,a=this.options.exporting.filename;if(a)return a;"string"===typeof b&&(a=b.toLowerCase().replace(/<\/?[^>]+(>|$)/g,
"").replace(/[\s_]+/g,"-").replace(/[^a-z0-9\-]/g,"").replace(/^[\-]+/g,"").replace(/[\-]+/g,"-").substr(0,24).replace(/[\-]+$/g,""));if(!a||5>a.length)a="chart";return a},exportChart:function(b,a){a=this.getSVGForExport(b,a);b=p(this.options.exporting,b);g.post(b.url,{filename:b.filename||this.getFilename(),type:b.type,width:b.width||0,scale:b.scale,svg:a},b.formAttributes)},print:function(){function b(b){(a.fixedDiv?[a.fixedDiv,a.scrollingContainer]:[a.container]).forEach(function(a){b.appendChild(a)})}
var a=this,d=[],c=z.body,g=c.childNodes,m=a.options.exporting.printMaxWidth,h,e;if(!a.isPrinting){a.isPrinting=!0;a.pointer.reset(null,0);C(a,"beforePrint");if(e=m&&a.chartWidth>m)h=[a.options.chart.width,void 0,!1],a.setSize(m,void 0,!1);g.forEach(function(a,b){1===a.nodeType&&(d[b]=a.style.display,a.style.display="none")});b(c);setTimeout(function(){A.focus();A.print();setTimeout(function(){b(a.renderTo);g.forEach(function(a,b){1===a.nodeType&&(a.style.display=d[b])});a.isPrinting=!1;e&&a.setSize.apply(a,
h);C(a,"afterPrint")},1E3)},1)}},contextMenu:function(b,a,d,c,w,m,h){var e=this,n=e.options.navigation,k=e.chartWidth,v=e.chartHeight,l="cache-"+b,f=e[l],B=Math.max(w,m),p;f||(e.exportContextMenu=e[l]=f=t("div",{className:b},{position:"absolute",zIndex:1E3,padding:B+"px",pointerEvents:"auto"},e.fixedDiv||e.container),p=t("div",{className:"highcharts-menu"},null,f),e.styledMode||r(p,x({MozBoxShadow:"3px 3px 10px #888",WebkitBoxShadow:"3px 3px 10px #888",boxShadow:"3px 3px 10px #888"},n.menuStyle)),
f.hideMenu=function(){r(f,{display:"none"});h&&h.setState(0);e.openMenu=!1;g.clearTimeout(f.hideTimer)},e.exportEvents.push(q(f,"mouseleave",function(){f.hideTimer=setTimeout(f.hideMenu,500)}),q(f,"mouseenter",function(){g.clearTimeout(f.hideTimer)}),q(z,"mouseup",function(a){e.pointer.inClass(a.target,b)||f.hideMenu()}),q(f,"click",function(){e.openMenu&&f.hideMenu()})),a.forEach(function(a){"string"===typeof a&&(a=e.options.exporting.menuItemDefinitions[a]);if(g.isObject(a,!0)){var b;a.separator?
b=t("hr",null,null,p):(b=t("div",{className:"highcharts-menu-item",onclick:function(b){b&&b.stopPropagation();f.hideMenu();a.onclick&&a.onclick.apply(e,arguments)},innerHTML:a.text||e.options.lang[a.textKey]},null,p),e.styledMode||(b.onmouseover=function(){r(this,n.menuItemHoverStyle)},b.onmouseout=function(){r(this,n.menuItemStyle)},r(b,x({cursor:"pointer"},n.menuItemStyle))));e.exportDivElements.push(b)}}),e.exportDivElements.push(p,f),e.exportMenuWidth=f.offsetWidth,e.exportMenuHeight=f.offsetHeight);
a={display:"block"};d+e.exportMenuWidth>k?a.right=k-d-w-B+"px":a.left=d-B+"px";c+m+e.exportMenuHeight>v&&"top"!==h.alignOptions.verticalAlign?a.bottom=v-c-B+"px":a.top=c+m-B+"px";r(f,a);e.openMenu=!0},addButton:function(b){var a=this,d=a.renderer,c=p(a.options.navigation.buttonOptions,b),g=c.onclick,m=c.menuItems,h,e,n=c.symbolSize||12;a.btnCount||(a.btnCount=0);a.exportDivElements||(a.exportDivElements=[],a.exportSVGElements=[]);if(!1!==c.enabled){var k=c.theme,v=k.states,l=v&&v.hover,v=v&&v.select,
f;a.styledMode||(k.fill=u(k.fill,"#ffffff"),k.stroke=u(k.stroke,"none"));delete k.states;g?f=function(b){b&&b.stopPropagation();g.call(a,b)}:m&&(f=function(b){b&&b.stopPropagation();a.contextMenu(e.menuClassName,m,e.translateX,e.translateY,e.width,e.height,e);e.setState(2)});c.text&&c.symbol?k.paddingLeft=u(k.paddingLeft,25):c.text||x(k,{width:c.width,height:c.height,padding:0});a.styledMode||(k["stroke-linecap"]="round",k.fill=u(k.fill,"#ffffff"),k.stroke=u(k.stroke,"none"));e=d.button(c.text,0,
0,f,k,l,v).addClass(b.className).attr({title:u(a.options.lang[c._titleKey||c.titleKey],"")});e.menuClassName=b.menuClassName||"highcharts-menu-"+a.btnCount++;c.symbol&&(h=d.symbol(c.symbol,c.symbolX-n/2,c.symbolY-n/2,n,n,{width:n,height:n}).addClass("highcharts-button-symbol").attr({zIndex:1}).add(e),a.styledMode||h.attr({stroke:c.symbolStroke,fill:c.symbolFill,"stroke-width":c.symbolStrokeWidth||1}));e.add(a.exportingGroup).align(x(c,{width:e.width,x:u(c.x,a.buttonOffset)}),!0,"spacingBox");a.buttonOffset+=
(e.width+c.buttonSpacing)*("right"===c.align?-1:1);a.exportSVGElements.push(e,h)}},destroyExport:function(b){var a=b?b.target:this;b=a.exportSVGElements;var d=a.exportDivElements,c=a.exportEvents,l;b&&(b.forEach(function(b,c){b&&(b.onclick=b.ontouchstart=null,l="cache-"+b.menuClassName,a[l]&&delete a[l],a.exportSVGElements[c]=b.destroy())}),b.length=0);a.exportingGroup&&(a.exportingGroup.destroy(),delete a.exportingGroup);d&&(d.forEach(function(b,c){g.clearTimeout(b.hideTimer);I(b,"mouseleave");a.exportDivElements[c]=
b.onmouseout=b.onmouseover=b.ontouchstart=b.onclick=null;D(b)}),d.length=0);c&&(c.forEach(function(a){a()}),c.length=0)}});F.prototype.inlineToAttributes="fill stroke strokeLinecap strokeLinejoin strokeWidth textAnchor x y".split(" ");F.prototype.inlineBlacklist=[/-/,/^(clipPath|cssText|d|height|width)$/,/^font$/,/[lL]ogical(Width|Height)$/,/perspective/,/TapHighlightColor/,/^transition/,/^length$/];F.prototype.unstyledElements=["clipPath","defs","desc"];l.prototype.inlineStyles=function(){function b(a){return a.replace(/([A-Z])/g,
function(a,b){return"-"+b.toLowerCase()})}function a(d){function m(a,f){q=t=!1;if(l){for(r=l.length;r--&&!t;)t=l[r].test(f);q=!t}"transform"===f&&"none"===a&&(q=!0);for(r=g.length;r--&&!q;)q=g[r].test(f)||"function"===typeof a;q||v[f]===a&&"svg"!==d.nodeName||e[d.nodeName][f]===a||(-1!==c.indexOf(f)?d.setAttribute(b(f),a):u+=b(f)+":"+a+";")}var f,v,u="",w,q,t,r;if(1===d.nodeType&&-1===h.indexOf(d.nodeName)){f=A.getComputedStyle(d,null);v="svg"===d.nodeName?{}:A.getComputedStyle(d.parentNode,null);
e[d.nodeName]||(n=k.getElementsByTagName("svg")[0],w=k.createElementNS(d.namespaceURI,d.nodeName),n.appendChild(w),e[d.nodeName]=p(A.getComputedStyle(w,null)),"text"===d.nodeName&&delete e.text.fill,n.removeChild(w));if(L||K)for(var x in f)m(f[x],x);else E(f,m);u&&(f=d.getAttribute("style"),d.setAttribute("style",(f?f+";":"")+u));"svg"===d.nodeName&&d.setAttribute("stroke-width","1px");"text"!==d.nodeName&&[].forEach.call(d.children||d.childNodes,a)}}var d=this.renderer,c=d.inlineToAttributes,g=d.inlineBlacklist,
l=d.inlineWhitelist,h=d.unstyledElements,e={},n,k,d=z.createElement("iframe");r(d,{width:"1px",height:"1px",visibility:"hidden"});z.body.appendChild(d);k=d.contentWindow.document;k.open();k.write('\x3csvg xmlns\x3d"http://www.w3.org/2000/svg"\x3e\x3c/svg\x3e');k.close();a(this.container.querySelector("svg"));n.parentNode.removeChild(n)};H.menu=function(b,a,d,c){return["M",b,a+2.5,"L",b+d,a+2.5,"M",b,a+c/2+.5,"L",b+d,a+c/2+.5,"M",b,a+c-1.5,"L",b+d,a+c-1.5]};H.menuball=function(b,a,d,c){b=[];c=c/3-
2;return b=b.concat(this.circle(d-c,a,c,c),this.circle(d-c,a+c+4,c,c),this.circle(d-c,a+2*(c+4),c,c))};l.prototype.renderExporting=function(){var b=this,a=b.options.exporting,d=a.buttons,c=b.isDirtyExporting||!b.exportSVGElements;b.buttonOffset=0;b.isDirtyExporting&&b.destroyExport();c&&!1!==a.enabled&&(b.exportEvents=[],b.exportingGroup=b.exportingGroup||b.renderer.g("exporting-group").attr({zIndex:3}).add(),E(d,function(a){b.addButton(a)}),b.isDirtyExporting=!1);q(b,"destroy",b.destroyExport)};
q(l,"init",function(){var b=this;["exporting","navigation"].forEach(function(a){b[a]={update:function(d,c){b.isDirtyExporting=!0;p(!0,b.options[a],d);u(c,!0)&&b.redraw()}}})});l.prototype.callbacks.push(function(b){b.renderExporting();q(b,"redraw",b.renderExporting)})})(l)});

},{}],41:[function(require,module,exports){
/*! nouislider - 14.0.2 - 6/28/2019 */
(function(factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === "object") {
        // Node/CommonJS
        module.exports = factory();
    } else {
        // Browser globals
        window.noUiSlider = factory();
    }
})(function() {
    "use strict";

    var VERSION = "14.0.2";

    //region Helper Methods

    function isValidFormatter(entry) {
        return typeof entry === "object" && typeof entry.to === "function" && typeof entry.from === "function";
    }

    function removeElement(el) {
        el.parentElement.removeChild(el);
    }

    function isSet(value) {
        return value !== null && value !== undefined;
    }

    // Bindable version
    function preventDefault(e) {
        e.preventDefault();
    }

    // Removes duplicates from an array.
    function unique(array) {
        return array.filter(function(a) {
            return !this[a] ? (this[a] = true) : false;
        }, {});
    }

    // Round a value to the closest 'to'.
    function closest(value, to) {
        return Math.round(value / to) * to;
    }

    // Current position of an element relative to the document.
    function offset(elem, orientation) {
        var rect = elem.getBoundingClientRect();
        var doc = elem.ownerDocument;
        var docElem = doc.documentElement;
        var pageOffset = getPageOffset(doc);

        // getBoundingClientRect contains left scroll in Chrome on Android.
        // I haven't found a feature detection that proves this. Worst case
        // scenario on mis-match: the 'tap' feature on horizontal sliders breaks.
        if (/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)) {
            pageOffset.x = 0;
        }

        return orientation
            ? rect.top + pageOffset.y - docElem.clientTop
            : rect.left + pageOffset.x - docElem.clientLeft;
    }

    // Checks whether a value is numerical.
    function isNumeric(a) {
        return typeof a === "number" && !isNaN(a) && isFinite(a);
    }

    // Sets a class and removes it after [duration] ms.
    function addClassFor(element, className, duration) {
        if (duration > 0) {
            addClass(element, className);
            setTimeout(function() {
                removeClass(element, className);
            }, duration);
        }
    }

    // Limits a value to 0 - 100
    function limit(a) {
        return Math.max(Math.min(a, 100), 0);
    }

    // Wraps a variable as an array, if it isn't one yet.
    // Note that an input array is returned by reference!
    function asArray(a) {
        return Array.isArray(a) ? a : [a];
    }

    // Counts decimals
    function countDecimals(numStr) {
        numStr = String(numStr);
        var pieces = numStr.split(".");
        return pieces.length > 1 ? pieces[1].length : 0;
    }

    // http://youmightnotneedjquery.com/#add_class
    function addClass(el, className) {
        if (el.classList) {
            el.classList.add(className);
        } else {
            el.className += " " + className;
        }
    }

    // http://youmightnotneedjquery.com/#remove_class
    function removeClass(el, className) {
        if (el.classList) {
            el.classList.remove(className);
        } else {
            el.className = el.className.replace(
                new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"),
                " "
            );
        }
    }

    // https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
    function hasClass(el, className) {
        return el.classList
            ? el.classList.contains(className)
            : new RegExp("\\b" + className + "\\b").test(el.className);
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#Notes
    function getPageOffset(doc) {
        var supportPageOffset = window.pageXOffset !== undefined;
        var isCSS1Compat = (doc.compatMode || "") === "CSS1Compat";
        var x = supportPageOffset
            ? window.pageXOffset
            : isCSS1Compat
                ? doc.documentElement.scrollLeft
                : doc.body.scrollLeft;
        var y = supportPageOffset
            ? window.pageYOffset
            : isCSS1Compat
                ? doc.documentElement.scrollTop
                : doc.body.scrollTop;

        return {
            x: x,
            y: y
        };
    }

    // we provide a function to compute constants instead
    // of accessing window.* as soon as the module needs it
    // so that we do not compute anything if not needed
    function getActions() {
        // Determine the events to bind. IE11 implements pointerEvents without
        // a prefix, which breaks compatibility with the IE10 implementation.
        return window.navigator.pointerEnabled
            ? {
                  start: "pointerdown",
                  move: "pointermove",
                  end: "pointerup"
              }
            : window.navigator.msPointerEnabled
                ? {
                      start: "MSPointerDown",
                      move: "MSPointerMove",
                      end: "MSPointerUp"
                  }
                : {
                      start: "mousedown touchstart",
                      move: "mousemove touchmove",
                      end: "mouseup touchend"
                  };
    }

    // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
    // Issue #785
    function getSupportsPassive() {
        var supportsPassive = false;

        /* eslint-disable */
        try {
            var opts = Object.defineProperty({}, "passive", {
                get: function() {
                    supportsPassive = true;
                }
            });

            window.addEventListener("test", null, opts);
        } catch (e) {}
        /* eslint-enable */

        return supportsPassive;
    }

    function getSupportsTouchActionNone() {
        return window.CSS && CSS.supports && CSS.supports("touch-action", "none");
    }

    //endregion

    //region Range Calculation

    // Determine the size of a sub-range in relation to a full range.
    function subRangeRatio(pa, pb) {
        return 100 / (pb - pa);
    }

    // (percentage) How many percent is this value of this range?
    function fromPercentage(range, value) {
        return (value * 100) / (range[1] - range[0]);
    }

    // (percentage) Where is this value on this range?
    function toPercentage(range, value) {
        return fromPercentage(range, range[0] < 0 ? value + Math.abs(range[0]) : value - range[0]);
    }

    // (value) How much is this percentage on this range?
    function isPercentage(range, value) {
        return (value * (range[1] - range[0])) / 100 + range[0];
    }

    function getJ(value, arr) {
        var j = 1;

        while (value >= arr[j]) {
            j += 1;
        }

        return j;
    }

    // (percentage) Input a value, find where, on a scale of 0-100, it applies.
    function toStepping(xVal, xPct, value) {
        if (value >= xVal.slice(-1)[0]) {
            return 100;
        }

        var j = getJ(value, xVal);
        var va = xVal[j - 1];
        var vb = xVal[j];
        var pa = xPct[j - 1];
        var pb = xPct[j];

        return pa + toPercentage([va, vb], value) / subRangeRatio(pa, pb);
    }

    // (value) Input a percentage, find where it is on the specified range.
    function fromStepping(xVal, xPct, value) {
        // There is no range group that fits 100
        if (value >= 100) {
            return xVal.slice(-1)[0];
        }

        var j = getJ(value, xPct);
        var va = xVal[j - 1];
        var vb = xVal[j];
        var pa = xPct[j - 1];
        var pb = xPct[j];

        return isPercentage([va, vb], (value - pa) * subRangeRatio(pa, pb));
    }

    // (percentage) Get the step that applies at a certain value.
    function getStep(xPct, xSteps, snap, value) {
        if (value === 100) {
            return value;
        }

        var j = getJ(value, xPct);
        var a = xPct[j - 1];
        var b = xPct[j];

        // If 'snap' is set, steps are used as fixed points on the slider.
        if (snap) {
            // Find the closest position, a or b.
            if (value - a > (b - a) / 2) {
                return b;
            }

            return a;
        }

        if (!xSteps[j - 1]) {
            return value;
        }

        return xPct[j - 1] + closest(value - xPct[j - 1], xSteps[j - 1]);
    }

    function handleEntryPoint(index, value, that) {
        var percentage;

        // Wrap numerical input in an array.
        if (typeof value === "number") {
            value = [value];
        }

        // Reject any invalid input, by testing whether value is an array.
        if (!Array.isArray(value)) {
            throw new Error("noUiSlider (" + VERSION + "): 'range' contains invalid value.");
        }

        // Covert min/max syntax to 0 and 100.
        if (index === "min") {
            percentage = 0;
        } else if (index === "max") {
            percentage = 100;
        } else {
            percentage = parseFloat(index);
        }

        // Check for correct input.
        if (!isNumeric(percentage) || !isNumeric(value[0])) {
            throw new Error("noUiSlider (" + VERSION + "): 'range' value isn't numeric.");
        }

        // Store values.
        that.xPct.push(percentage);
        that.xVal.push(value[0]);

        // NaN will evaluate to false too, but to keep
        // logging clear, set step explicitly. Make sure
        // not to override the 'step' setting with false.
        if (!percentage) {
            if (!isNaN(value[1])) {
                that.xSteps[0] = value[1];
            }
        } else {
            that.xSteps.push(isNaN(value[1]) ? false : value[1]);
        }

        that.xHighestCompleteStep.push(0);
    }

    function handleStepPoint(i, n, that) {
        // Ignore 'false' stepping.
        if (!n) {
            return;
        }

        // Step over zero-length ranges (#948);
        if (that.xVal[i] === that.xVal[i + 1]) {
            that.xSteps[i] = that.xHighestCompleteStep[i] = that.xVal[i];

            return;
        }

        // Factor to range ratio
        that.xSteps[i] =
            fromPercentage([that.xVal[i], that.xVal[i + 1]], n) / subRangeRatio(that.xPct[i], that.xPct[i + 1]);

        var totalSteps = (that.xVal[i + 1] - that.xVal[i]) / that.xNumSteps[i];
        var highestStep = Math.ceil(Number(totalSteps.toFixed(3)) - 1);
        var step = that.xVal[i] + that.xNumSteps[i] * highestStep;

        that.xHighestCompleteStep[i] = step;
    }

    //endregion

    //region Spectrum

    function Spectrum(entry, snap, singleStep) {
        this.xPct = [];
        this.xVal = [];
        this.xSteps = [singleStep || false];
        this.xNumSteps = [false];
        this.xHighestCompleteStep = [];

        this.snap = snap;

        var index;
        var ordered = []; // [0, 'min'], [1, '50%'], [2, 'max']

        // Map the object keys to an array.
        for (index in entry) {
            if (entry.hasOwnProperty(index)) {
                ordered.push([entry[index], index]);
            }
        }

        // Sort all entries by value (numeric sort).
        if (ordered.length && typeof ordered[0][0] === "object") {
            ordered.sort(function(a, b) {
                return a[0][0] - b[0][0];
            });
        } else {
            ordered.sort(function(a, b) {
                return a[0] - b[0];
            });
        }

        // Convert all entries to subranges.
        for (index = 0; index < ordered.length; index++) {
            handleEntryPoint(ordered[index][1], ordered[index][0], this);
        }

        // Store the actual step values.
        // xSteps is sorted in the same order as xPct and xVal.
        this.xNumSteps = this.xSteps.slice(0);

        // Convert all numeric steps to the percentage of the subrange they represent.
        for (index = 0; index < this.xNumSteps.length; index++) {
            handleStepPoint(index, this.xNumSteps[index], this);
        }
    }

    Spectrum.prototype.getMargin = function(value) {
        var step = this.xNumSteps[0];

        if (step && (value / step) % 1 !== 0) {
            throw new Error("noUiSlider (" + VERSION + "): 'limit', 'margin' and 'padding' must be divisible by step.");
        }

        return this.xPct.length === 2 ? fromPercentage(this.xVal, value) : false;
    };

    Spectrum.prototype.toStepping = function(value) {
        value = toStepping(this.xVal, this.xPct, value);

        return value;
    };

    Spectrum.prototype.fromStepping = function(value) {
        return fromStepping(this.xVal, this.xPct, value);
    };

    Spectrum.prototype.getStep = function(value) {
        value = getStep(this.xPct, this.xSteps, this.snap, value);

        return value;
    };

    Spectrum.prototype.getDefaultStep = function(value, isDown, size) {
        var j = getJ(value, this.xPct);

        // When at the top or stepping down, look at the previous sub-range
        if (value === 100 || (isDown && value === this.xPct[j - 1])) {
            j = Math.max(j - 1, 1);
        }

        return (this.xVal[j] - this.xVal[j - 1]) / size;
    };

    Spectrum.prototype.getNearbySteps = function(value) {
        var j = getJ(value, this.xPct);

        return {
            stepBefore: {
                startValue: this.xVal[j - 2],
                step: this.xNumSteps[j - 2],
                highestStep: this.xHighestCompleteStep[j - 2]
            },
            thisStep: {
                startValue: this.xVal[j - 1],
                step: this.xNumSteps[j - 1],
                highestStep: this.xHighestCompleteStep[j - 1]
            },
            stepAfter: {
                startValue: this.xVal[j],
                step: this.xNumSteps[j],
                highestStep: this.xHighestCompleteStep[j]
            }
        };
    };

    Spectrum.prototype.countStepDecimals = function() {
        var stepDecimals = this.xNumSteps.map(countDecimals);
        return Math.max.apply(null, stepDecimals);
    };

    // Outside testing
    Spectrum.prototype.convert = function(value) {
        return this.getStep(this.toStepping(value));
    };

    //endregion

    //region Options

    /*	Every input option is tested and parsed. This'll prevent
        endless validation in internal methods. These tests are
        structured with an item for every option available. An
        option can be marked as required by setting the 'r' flag.
        The testing function is provided with three arguments:
            - The provided value for the option;
            - A reference to the options object;
            - The name for the option;

        The testing function returns false when an error is detected,
        or true when everything is OK. It can also modify the option
        object, to make sure all values can be correctly looped elsewhere. */

    var defaultFormatter = {
        to: function(value) {
            return value !== undefined && value.toFixed(2);
        },
        from: Number
    };

    function validateFormat(entry) {
        // Any object with a to and from method is supported.
        if (isValidFormatter(entry)) {
            return true;
        }

        throw new Error("noUiSlider (" + VERSION + "): 'format' requires 'to' and 'from' methods.");
    }

    function testStep(parsed, entry) {
        if (!isNumeric(entry)) {
            throw new Error("noUiSlider (" + VERSION + "): 'step' is not numeric.");
        }

        // The step option can still be used to set stepping
        // for linear sliders. Overwritten if set in 'range'.
        parsed.singleStep = entry;
    }

    function testRange(parsed, entry) {
        // Filter incorrect input.
        if (typeof entry !== "object" || Array.isArray(entry)) {
            throw new Error("noUiSlider (" + VERSION + "): 'range' is not an object.");
        }

        // Catch missing start or end.
        if (entry.min === undefined || entry.max === undefined) {
            throw new Error("noUiSlider (" + VERSION + "): Missing 'min' or 'max' in 'range'.");
        }

        // Catch equal start or end.
        if (entry.min === entry.max) {
            throw new Error("noUiSlider (" + VERSION + "): 'range' 'min' and 'max' cannot be equal.");
        }

        parsed.spectrum = new Spectrum(entry, parsed.snap, parsed.singleStep);
    }

    function testStart(parsed, entry) {
        entry = asArray(entry);

        // Validate input. Values aren't tested, as the public .val method
        // will always provide a valid location.
        if (!Array.isArray(entry) || !entry.length) {
            throw new Error("noUiSlider (" + VERSION + "): 'start' option is incorrect.");
        }

        // Store the number of handles.
        parsed.handles = entry.length;

        // When the slider is initialized, the .val method will
        // be called with the start options.
        parsed.start = entry;
    }

    function testSnap(parsed, entry) {
        // Enforce 100% stepping within subranges.
        parsed.snap = entry;

        if (typeof entry !== "boolean") {
            throw new Error("noUiSlider (" + VERSION + "): 'snap' option must be a boolean.");
        }
    }

    function testAnimate(parsed, entry) {
        // Enforce 100% stepping within subranges.
        parsed.animate = entry;

        if (typeof entry !== "boolean") {
            throw new Error("noUiSlider (" + VERSION + "): 'animate' option must be a boolean.");
        }
    }

    function testAnimationDuration(parsed, entry) {
        parsed.animationDuration = entry;

        if (typeof entry !== "number") {
            throw new Error("noUiSlider (" + VERSION + "): 'animationDuration' option must be a number.");
        }
    }

    function testConnect(parsed, entry) {
        var connect = [false];
        var i;

        // Map legacy options
        if (entry === "lower") {
            entry = [true, false];
        } else if (entry === "upper") {
            entry = [false, true];
        }

        // Handle boolean options
        if (entry === true || entry === false) {
            for (i = 1; i < parsed.handles; i++) {
                connect.push(entry);
            }

            connect.push(false);
        }

        // Reject invalid input
        else if (!Array.isArray(entry) || !entry.length || entry.length !== parsed.handles + 1) {
            throw new Error("noUiSlider (" + VERSION + "): 'connect' option doesn't match handle count.");
        } else {
            connect = entry;
        }

        parsed.connect = connect;
    }

    function testOrientation(parsed, entry) {
        // Set orientation to an a numerical value for easy
        // array selection.
        switch (entry) {
            case "horizontal":
                parsed.ort = 0;
                break;
            case "vertical":
                parsed.ort = 1;
                break;
            default:
                throw new Error("noUiSlider (" + VERSION + "): 'orientation' option is invalid.");
        }
    }

    function testMargin(parsed, entry) {
        if (!isNumeric(entry)) {
            throw new Error("noUiSlider (" + VERSION + "): 'margin' option must be numeric.");
        }

        // Issue #582
        if (entry === 0) {
            return;
        }

        parsed.margin = parsed.spectrum.getMargin(entry);

        if (!parsed.margin) {
            throw new Error("noUiSlider (" + VERSION + "): 'margin' option is only supported on linear sliders.");
        }
    }

    function testLimit(parsed, entry) {
        if (!isNumeric(entry)) {
            throw new Error("noUiSlider (" + VERSION + "): 'limit' option must be numeric.");
        }

        parsed.limit = parsed.spectrum.getMargin(entry);

        if (!parsed.limit || parsed.handles < 2) {
            throw new Error(
                "noUiSlider (" +
                    VERSION +
                    "): 'limit' option is only supported on linear sliders with 2 or more handles."
            );
        }
    }

    function testPadding(parsed, entry) {
        if (!isNumeric(entry) && !Array.isArray(entry)) {
            throw new Error(
                "noUiSlider (" + VERSION + "): 'padding' option must be numeric or array of exactly 2 numbers."
            );
        }

        if (Array.isArray(entry) && !(entry.length === 2 || isNumeric(entry[0]) || isNumeric(entry[1]))) {
            throw new Error(
                "noUiSlider (" + VERSION + "): 'padding' option must be numeric or array of exactly 2 numbers."
            );
        }

        if (entry === 0) {
            return;
        }

        if (!Array.isArray(entry)) {
            entry = [entry, entry];
        }

        // 'getMargin' returns false for invalid values.
        parsed.padding = [parsed.spectrum.getMargin(entry[0]), parsed.spectrum.getMargin(entry[1])];

        if (parsed.padding[0] === false || parsed.padding[1] === false) {
            throw new Error("noUiSlider (" + VERSION + "): 'padding' option is only supported on linear sliders.");
        }

        if (parsed.padding[0] < 0 || parsed.padding[1] < 0) {
            throw new Error("noUiSlider (" + VERSION + "): 'padding' option must be a positive number(s).");
        }

        if (parsed.padding[0] + parsed.padding[1] > 100) {
            throw new Error("noUiSlider (" + VERSION + "): 'padding' option must not exceed 100% of the range.");
        }
    }

    function testDirection(parsed, entry) {
        // Set direction as a numerical value for easy parsing.
        // Invert connection for RTL sliders, so that the proper
        // handles get the connect/background classes.
        switch (entry) {
            case "ltr":
                parsed.dir = 0;
                break;
            case "rtl":
                parsed.dir = 1;
                break;
            default:
                throw new Error("noUiSlider (" + VERSION + "): 'direction' option was not recognized.");
        }
    }

    function testBehaviour(parsed, entry) {
        // Make sure the input is a string.
        if (typeof entry !== "string") {
            throw new Error("noUiSlider (" + VERSION + "): 'behaviour' must be a string containing options.");
        }

        // Check if the string contains any keywords.
        // None are required.
        var tap = entry.indexOf("tap") >= 0;
        var drag = entry.indexOf("drag") >= 0;
        var fixed = entry.indexOf("fixed") >= 0;
        var snap = entry.indexOf("snap") >= 0;
        var hover = entry.indexOf("hover") >= 0;
        var unconstrained = entry.indexOf("unconstrained") >= 0;

        if (fixed) {
            if (parsed.handles !== 2) {
                throw new Error("noUiSlider (" + VERSION + "): 'fixed' behaviour must be used with 2 handles");
            }

            // Use margin to enforce fixed state
            testMargin(parsed, parsed.start[1] - parsed.start[0]);
        }

        if (unconstrained && (parsed.margin || parsed.limit)) {
            throw new Error(
                "noUiSlider (" + VERSION + "): 'unconstrained' behaviour cannot be used with margin or limit"
            );
        }

        parsed.events = {
            tap: tap || snap,
            drag: drag,
            fixed: fixed,
            snap: snap,
            hover: hover,
            unconstrained: unconstrained
        };
    }

    function testTooltips(parsed, entry) {
        if (entry === false) {
            return;
        }

        if (entry === true) {
            parsed.tooltips = [];

            for (var i = 0; i < parsed.handles; i++) {
                parsed.tooltips.push(true);
            }
        } else {
            parsed.tooltips = asArray(entry);

            if (parsed.tooltips.length !== parsed.handles) {
                throw new Error("noUiSlider (" + VERSION + "): must pass a formatter for all handles.");
            }

            parsed.tooltips.forEach(function(formatter) {
                if (
                    typeof formatter !== "boolean" &&
                    (typeof formatter !== "object" || typeof formatter.to !== "function")
                ) {
                    throw new Error("noUiSlider (" + VERSION + "): 'tooltips' must be passed a formatter or 'false'.");
                }
            });
        }
    }

    function testAriaFormat(parsed, entry) {
        parsed.ariaFormat = entry;
        validateFormat(entry);
    }

    function testFormat(parsed, entry) {
        parsed.format = entry;
        validateFormat(entry);
    }

    function testKeyboardSupport(parsed, entry) {
        parsed.keyboardSupport = entry;

        if (typeof entry !== "boolean") {
            throw new Error("noUiSlider (" + VERSION + "): 'keyboardSupport' option must be a boolean.");
        }
    }

    function testDocumentElement(parsed, entry) {
        // This is an advanced option. Passed values are used without validation.
        parsed.documentElement = entry;
    }

    function testCssPrefix(parsed, entry) {
        if (typeof entry !== "string" && entry !== false) {
            throw new Error("noUiSlider (" + VERSION + "): 'cssPrefix' must be a string or `false`.");
        }

        parsed.cssPrefix = entry;
    }

    function testCssClasses(parsed, entry) {
        if (typeof entry !== "object") {
            throw new Error("noUiSlider (" + VERSION + "): 'cssClasses' must be an object.");
        }

        if (typeof parsed.cssPrefix === "string") {
            parsed.cssClasses = {};

            for (var key in entry) {
                if (!entry.hasOwnProperty(key)) {
                    continue;
                }

                parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
            }
        } else {
            parsed.cssClasses = entry;
        }
    }

    // Test all developer settings and parse to assumption-safe values.
    function testOptions(options) {
        // To prove a fix for #537, freeze options here.
        // If the object is modified, an error will be thrown.
        // Object.freeze(options);

        var parsed = {
            margin: 0,
            limit: 0,
            padding: 0,
            animate: true,
            animationDuration: 300,
            ariaFormat: defaultFormatter,
            format: defaultFormatter
        };

        // Tests are executed in the order they are presented here.
        var tests = {
            step: { r: false, t: testStep },
            start: { r: true, t: testStart },
            connect: { r: true, t: testConnect },
            direction: { r: true, t: testDirection },
            snap: { r: false, t: testSnap },
            animate: { r: false, t: testAnimate },
            animationDuration: { r: false, t: testAnimationDuration },
            range: { r: true, t: testRange },
            orientation: { r: false, t: testOrientation },
            margin: { r: false, t: testMargin },
            limit: { r: false, t: testLimit },
            padding: { r: false, t: testPadding },
            behaviour: { r: true, t: testBehaviour },
            ariaFormat: { r: false, t: testAriaFormat },
            format: { r: false, t: testFormat },
            tooltips: { r: false, t: testTooltips },
            keyboardSupport: { r: true, t: testKeyboardSupport },
            documentElement: { r: false, t: testDocumentElement },
            cssPrefix: { r: true, t: testCssPrefix },
            cssClasses: { r: true, t: testCssClasses }
        };

        var defaults = {
            connect: false,
            direction: "ltr",
            behaviour: "tap",
            orientation: "horizontal",
            keyboardSupport: true,
            cssPrefix: "noUi-",
            cssClasses: {
                target: "target",
                base: "base",
                origin: "origin",
                handle: "handle",
                handleLower: "handle-lower",
                handleUpper: "handle-upper",
                touchArea: "touch-area",
                horizontal: "horizontal",
                vertical: "vertical",
                background: "background",
                connect: "connect",
                connects: "connects",
                ltr: "ltr",
                rtl: "rtl",
                draggable: "draggable",
                drag: "state-drag",
                tap: "state-tap",
                active: "active",
                tooltip: "tooltip",
                pips: "pips",
                pipsHorizontal: "pips-horizontal",
                pipsVertical: "pips-vertical",
                marker: "marker",
                markerHorizontal: "marker-horizontal",
                markerVertical: "marker-vertical",
                markerNormal: "marker-normal",
                markerLarge: "marker-large",
                markerSub: "marker-sub",
                value: "value",
                valueHorizontal: "value-horizontal",
                valueVertical: "value-vertical",
                valueNormal: "value-normal",
                valueLarge: "value-large",
                valueSub: "value-sub"
            }
        };

        // AriaFormat defaults to regular format, if any.
        if (options.format && !options.ariaFormat) {
            options.ariaFormat = options.format;
        }

        // Run all options through a testing mechanism to ensure correct
        // input. It should be noted that options might get modified to
        // be handled properly. E.g. wrapping integers in arrays.
        Object.keys(tests).forEach(function(name) {
            // If the option isn't set, but it is required, throw an error.
            if (!isSet(options[name]) && defaults[name] === undefined) {
                if (tests[name].r) {
                    throw new Error("noUiSlider (" + VERSION + "): '" + name + "' is required.");
                }

                return true;
            }

            tests[name].t(parsed, !isSet(options[name]) ? defaults[name] : options[name]);
        });

        // Forward pips options
        parsed.pips = options.pips;

        // All recent browsers accept unprefixed transform.
        // We need -ms- for IE9 and -webkit- for older Android;
        // Assume use of -webkit- if unprefixed and -ms- are not supported.
        // https://caniuse.com/#feat=transforms2d
        var d = document.createElement("div");
        var msPrefix = d.style.msTransform !== undefined;
        var noPrefix = d.style.transform !== undefined;

        parsed.transformRule = noPrefix ? "transform" : msPrefix ? "msTransform" : "webkitTransform";

        // Pips don't move, so we can place them using left/top.
        var styles = [["left", "top"], ["right", "bottom"]];

        parsed.style = styles[parsed.dir][parsed.ort];

        return parsed;
    }

    //endregion

    function scope(target, options, originalOptions) {
        var actions = getActions();
        var supportsTouchActionNone = getSupportsTouchActionNone();
        var supportsPassive = supportsTouchActionNone && getSupportsPassive();

        // All variables local to 'scope' are prefixed with 'scope_'

        // Slider DOM Nodes
        var scope_Target = target;
        var scope_Base;
        var scope_Handles;
        var scope_Connects;
        var scope_Pips;
        var scope_Tooltips;

        // Slider state values
        var scope_Spectrum = options.spectrum;
        var scope_Values = [];
        var scope_Locations = [];
        var scope_HandleNumbers = [];
        var scope_ActiveHandlesCount = 0;
        var scope_Events = {};

        // Exposed API
        var scope_Self;

        // Document Nodes
        var scope_Document = target.ownerDocument;
        var scope_DocumentElement = options.documentElement || scope_Document.documentElement;
        var scope_Body = scope_Document.body;

        // Pips constants
        var PIPS_NONE = -1;
        var PIPS_NO_VALUE = 0;
        var PIPS_LARGE_VALUE = 1;
        var PIPS_SMALL_VALUE = 2;

        // For horizontal sliders in standard ltr documents,
        // make .noUi-origin overflow to the left so the document doesn't scroll.
        var scope_DirOffset = scope_Document.dir === "rtl" || options.ort === 1 ? 0 : 100;

        // Creates a node, adds it to target, returns the new node.
        function addNodeTo(addTarget, className) {
            var div = scope_Document.createElement("div");

            if (className) {
                addClass(div, className);
            }

            addTarget.appendChild(div);

            return div;
        }

        // Append a origin to the base
        function addOrigin(base, handleNumber) {
            var origin = addNodeTo(base, options.cssClasses.origin);
            var handle = addNodeTo(origin, options.cssClasses.handle);

            addNodeTo(handle, options.cssClasses.touchArea);

            handle.setAttribute("data-handle", handleNumber);

            if (options.keyboardSupport) {
                // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
                // 0 = focusable and reachable
                handle.setAttribute("tabindex", "0");
                handle.addEventListener("keydown", function(event) {
                    return eventKeydown(event, handleNumber);
                });
            }

            handle.setAttribute("role", "slider");
            handle.setAttribute("aria-orientation", options.ort ? "vertical" : "horizontal");

            if (handleNumber === 0) {
                addClass(handle, options.cssClasses.handleLower);
            } else if (handleNumber === options.handles - 1) {
                addClass(handle, options.cssClasses.handleUpper);
            }

            return origin;
        }

        // Insert nodes for connect elements
        function addConnect(base, add) {
            if (!add) {
                return false;
            }

            return addNodeTo(base, options.cssClasses.connect);
        }

        // Add handles to the slider base.
        function addElements(connectOptions, base) {
            var connectBase = addNodeTo(base, options.cssClasses.connects);

            scope_Handles = [];
            scope_Connects = [];

            scope_Connects.push(addConnect(connectBase, connectOptions[0]));

            // [::::O====O====O====]
            // connectOptions = [0, 1, 1, 1]

            for (var i = 0; i < options.handles; i++) {
                // Keep a list of all added handles.
                scope_Handles.push(addOrigin(base, i));
                scope_HandleNumbers[i] = i;
                scope_Connects.push(addConnect(connectBase, connectOptions[i + 1]));
            }
        }

        // Initialize a single slider.
        function addSlider(addTarget) {
            // Apply classes and data to the target.
            addClass(addTarget, options.cssClasses.target);

            if (options.dir === 0) {
                addClass(addTarget, options.cssClasses.ltr);
            } else {
                addClass(addTarget, options.cssClasses.rtl);
            }

            if (options.ort === 0) {
                addClass(addTarget, options.cssClasses.horizontal);
            } else {
                addClass(addTarget, options.cssClasses.vertical);
            }

            return addNodeTo(addTarget, options.cssClasses.base);
        }

        function addTooltip(handle, handleNumber) {
            if (!options.tooltips[handleNumber]) {
                return false;
            }

            return addNodeTo(handle.firstChild, options.cssClasses.tooltip);
        }

        function isSliderDisabled() {
            return scope_Target.hasAttribute("disabled");
        }

        // Disable the slider dragging if any handle is disabled
        function isHandleDisabled(handleNumber) {
            var handleOrigin = scope_Handles[handleNumber];
            return handleOrigin.hasAttribute("disabled");
        }

        function removeTooltips() {
            if (scope_Tooltips) {
                removeEvent("update.tooltips");
                scope_Tooltips.forEach(function(tooltip) {
                    if (tooltip) {
                        removeElement(tooltip);
                    }
                });
                scope_Tooltips = null;
            }
        }

        // The tooltips option is a shorthand for using the 'update' event.
        function tooltips() {
            removeTooltips();

            // Tooltips are added with options.tooltips in original order.
            scope_Tooltips = scope_Handles.map(addTooltip);

            bindEvent("update.tooltips", function(values, handleNumber, unencoded) {
                if (!scope_Tooltips[handleNumber]) {
                    return;
                }

                var formattedValue = values[handleNumber];

                if (options.tooltips[handleNumber] !== true) {
                    formattedValue = options.tooltips[handleNumber].to(unencoded[handleNumber]);
                }

                scope_Tooltips[handleNumber].innerHTML = formattedValue;
            });
        }

        function aria() {
            bindEvent("update", function(values, handleNumber, unencoded, tap, positions) {
                // Update Aria Values for all handles, as a change in one changes min and max values for the next.
                scope_HandleNumbers.forEach(function(index) {
                    var handle = scope_Handles[index];

                    var min = checkHandlePosition(scope_Locations, index, 0, true, true, true);
                    var max = checkHandlePosition(scope_Locations, index, 100, true, true, true);

                    var now = positions[index];

                    // Formatted value for display
                    var text = options.ariaFormat.to(unencoded[index]);

                    // Map to slider range values
                    min = scope_Spectrum.fromStepping(min).toFixed(1);
                    max = scope_Spectrum.fromStepping(max).toFixed(1);
                    now = scope_Spectrum.fromStepping(now).toFixed(1);

                    handle.children[0].setAttribute("aria-valuemin", min);
                    handle.children[0].setAttribute("aria-valuemax", max);
                    handle.children[0].setAttribute("aria-valuenow", now);
                    handle.children[0].setAttribute("aria-valuetext", text);
                });
            });
        }

        function getGroup(mode, values, stepped) {
            // Use the range.
            if (mode === "range" || mode === "steps") {
                return scope_Spectrum.xVal;
            }

            if (mode === "count") {
                if (values < 2) {
                    throw new Error("noUiSlider (" + VERSION + "): 'values' (>= 2) required for mode 'count'.");
                }

                // Divide 0 - 100 in 'count' parts.
                var interval = values - 1;
                var spread = 100 / interval;

                values = [];

                // List these parts and have them handled as 'positions'.
                while (interval--) {
                    values[interval] = interval * spread;
                }

                values.push(100);

                mode = "positions";
            }

            if (mode === "positions") {
                // Map all percentages to on-range values.
                return values.map(function(value) {
                    return scope_Spectrum.fromStepping(stepped ? scope_Spectrum.getStep(value) : value);
                });
            }

            if (mode === "values") {
                // If the value must be stepped, it needs to be converted to a percentage first.
                if (stepped) {
                    return values.map(function(value) {
                        // Convert to percentage, apply step, return to value.
                        return scope_Spectrum.fromStepping(scope_Spectrum.getStep(scope_Spectrum.toStepping(value)));
                    });
                }

                // Otherwise, we can simply use the values.
                return values;
            }
        }

        function generateSpread(density, mode, group) {
            function safeIncrement(value, increment) {
                // Avoid floating point variance by dropping the smallest decimal places.
                return (value + increment).toFixed(7) / 1;
            }

            var indexes = {};
            var firstInRange = scope_Spectrum.xVal[0];
            var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length - 1];
            var ignoreFirst = false;
            var ignoreLast = false;
            var prevPct = 0;

            // Create a copy of the group, sort it and filter away all duplicates.
            group = unique(
                group.slice().sort(function(a, b) {
                    return a - b;
                })
            );

            // Make sure the range starts with the first element.
            if (group[0] !== firstInRange) {
                group.unshift(firstInRange);
                ignoreFirst = true;
            }

            // Likewise for the last one.
            if (group[group.length - 1] !== lastInRange) {
                group.push(lastInRange);
                ignoreLast = true;
            }

            group.forEach(function(current, index) {
                // Get the current step and the lower + upper positions.
                var step;
                var i;
                var q;
                var low = current;
                var high = group[index + 1];
                var newPct;
                var pctDifference;
                var pctPos;
                var type;
                var steps;
                var realSteps;
                var stepSize;
                var isSteps = mode === "steps";

                // When using 'steps' mode, use the provided steps.
                // Otherwise, we'll step on to the next subrange.
                if (isSteps) {
                    step = scope_Spectrum.xNumSteps[index];
                }

                // Default to a 'full' step.
                if (!step) {
                    step = high - low;
                }

                // Low can be 0, so test for false. If high is undefined,
                // we are at the last subrange. Index 0 is already handled.
                if (low === false || high === undefined) {
                    return;
                }

                // Make sure step isn't 0, which would cause an infinite loop (#654)
                step = Math.max(step, 0.0000001);

                // Find all steps in the subrange.
                for (i = low; i <= high; i = safeIncrement(i, step)) {
                    // Get the percentage value for the current step,
                    // calculate the size for the subrange.
                    newPct = scope_Spectrum.toStepping(i);
                    pctDifference = newPct - prevPct;

                    steps = pctDifference / density;
                    realSteps = Math.round(steps);

                    // This ratio represents the amount of percentage-space a point indicates.
                    // For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-divided.
                    // Round the percentage offset to an even number, then divide by two
                    // to spread the offset on both sides of the range.
                    stepSize = pctDifference / realSteps;

                    // Divide all points evenly, adding the correct number to this subrange.
                    // Run up to <= so that 100% gets a point, event if ignoreLast is set.
                    for (q = 1; q <= realSteps; q += 1) {
                        // The ratio between the rounded value and the actual size might be ~1% off.
                        // Correct the percentage offset by the number of points
                        // per subrange. density = 1 will result in 100 points on the
                        // full range, 2 for 50, 4 for 25, etc.
                        pctPos = prevPct + q * stepSize;
                        indexes[pctPos.toFixed(5)] = [scope_Spectrum.fromStepping(pctPos), 0];
                    }

                    // Determine the point type.
                    type = group.indexOf(i) > -1 ? PIPS_LARGE_VALUE : isSteps ? PIPS_SMALL_VALUE : PIPS_NO_VALUE;

                    // Enforce the 'ignoreFirst' option by overwriting the type for 0.
                    if (!index && ignoreFirst) {
                        type = 0;
                    }

                    if (!(i === high && ignoreLast)) {
                        // Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
                        indexes[newPct.toFixed(5)] = [i, type];
                    }

                    // Update the percentage count.
                    prevPct = newPct;
                }
            });

            return indexes;
        }

        function addMarking(spread, filterFunc, formatter) {
            var element = scope_Document.createElement("div");

            var valueSizeClasses = [];
            valueSizeClasses[PIPS_NO_VALUE] = options.cssClasses.valueNormal;
            valueSizeClasses[PIPS_LARGE_VALUE] = options.cssClasses.valueLarge;
            valueSizeClasses[PIPS_SMALL_VALUE] = options.cssClasses.valueSub;

            var markerSizeClasses = [];
            markerSizeClasses[PIPS_NO_VALUE] = options.cssClasses.markerNormal;
            markerSizeClasses[PIPS_LARGE_VALUE] = options.cssClasses.markerLarge;
            markerSizeClasses[PIPS_SMALL_VALUE] = options.cssClasses.markerSub;

            var valueOrientationClasses = [options.cssClasses.valueHorizontal, options.cssClasses.valueVertical];
            var markerOrientationClasses = [options.cssClasses.markerHorizontal, options.cssClasses.markerVertical];

            addClass(element, options.cssClasses.pips);
            addClass(element, options.ort === 0 ? options.cssClasses.pipsHorizontal : options.cssClasses.pipsVertical);

            function getClasses(type, source) {
                var a = source === options.cssClasses.value;
                var orientationClasses = a ? valueOrientationClasses : markerOrientationClasses;
                var sizeClasses = a ? valueSizeClasses : markerSizeClasses;

                return source + " " + orientationClasses[options.ort] + " " + sizeClasses[type];
            }

            function addSpread(offset, value, type) {
                // Apply the filter function, if it is set.
                type = filterFunc ? filterFunc(value, type) : type;

                if (type === PIPS_NONE) {
                    return;
                }

                // Add a marker for every point
                var node = addNodeTo(element, false);
                node.className = getClasses(type, options.cssClasses.marker);
                node.style[options.style] = offset + "%";

                // Values are only appended for points marked '1' or '2'.
                if (type > PIPS_NO_VALUE) {
                    node = addNodeTo(element, false);
                    node.className = getClasses(type, options.cssClasses.value);
                    node.setAttribute("data-value", value);
                    node.style[options.style] = offset + "%";
                    node.innerHTML = formatter.to(value);
                }
            }

            // Append all points.
            Object.keys(spread).forEach(function(offset) {
                addSpread(offset, spread[offset][0], spread[offset][1]);
            });

            return element;
        }

        function removePips() {
            if (scope_Pips) {
                removeElement(scope_Pips);
                scope_Pips = null;
            }
        }

        function pips(grid) {
            // Fix #669
            removePips();

            var mode = grid.mode;
            var density = grid.density || 1;
            var filter = grid.filter || false;
            var values = grid.values || false;
            var stepped = grid.stepped || false;
            var group = getGroup(mode, values, stepped);
            var spread = generateSpread(density, mode, group);
            var format = grid.format || {
                to: Math.round
            };

            scope_Pips = scope_Target.appendChild(addMarking(spread, filter, format));

            return scope_Pips;
        }

        // Shorthand for base dimensions.
        function baseSize() {
            var rect = scope_Base.getBoundingClientRect();
            var alt = "offset" + ["Width", "Height"][options.ort];
            return options.ort === 0 ? rect.width || scope_Base[alt] : rect.height || scope_Base[alt];
        }

        // Handler for attaching events trough a proxy.
        function attachEvent(events, element, callback, data) {
            // This function can be used to 'filter' events to the slider.
            // element is a node, not a nodeList

            var method = function(e) {
                e = fixEvent(e, data.pageOffset, data.target || element);

                // fixEvent returns false if this event has a different target
                // when handling (multi-) touch events;
                if (!e) {
                    return false;
                }

                // doNotReject is passed by all end events to make sure released touches
                // are not rejected, leaving the slider "stuck" to the cursor;
                if (isSliderDisabled() && !data.doNotReject) {
                    return false;
                }

                // Stop if an active 'tap' transition is taking place.
                if (hasClass(scope_Target, options.cssClasses.tap) && !data.doNotReject) {
                    return false;
                }

                // Ignore right or middle clicks on start #454
                if (events === actions.start && e.buttons !== undefined && e.buttons > 1) {
                    return false;
                }

                // Ignore right or middle clicks on start #454
                if (data.hover && e.buttons) {
                    return false;
                }

                // 'supportsPassive' is only true if a browser also supports touch-action: none in CSS.
                // iOS safari does not, so it doesn't get to benefit from passive scrolling. iOS does support
                // touch-action: manipulation, but that allows panning, which breaks
                // sliders after zooming/on non-responsive pages.
                // See: https://bugs.webkit.org/show_bug.cgi?id=133112
                if (!supportsPassive) {
                    e.preventDefault();
                }

                e.calcPoint = e.points[options.ort];

                // Call the event handler with the event [ and additional data ].
                callback(e, data);
            };

            var methods = [];

            // Bind a closure on the target for every event type.
            events.split(" ").forEach(function(eventName) {
                element.addEventListener(eventName, method, supportsPassive ? { passive: true } : false);
                methods.push([eventName, method]);
            });

            return methods;
        }

        // Provide a clean event with standardized offset values.
        function fixEvent(e, pageOffset, eventTarget) {
            // Filter the event to register the type, which can be
            // touch, mouse or pointer. Offset changes need to be
            // made on an event specific basis.
            var touch = e.type.indexOf("touch") === 0;
            var mouse = e.type.indexOf("mouse") === 0;
            var pointer = e.type.indexOf("pointer") === 0;

            var x;
            var y;

            // IE10 implemented pointer events with a prefix;
            if (e.type.indexOf("MSPointer") === 0) {
                pointer = true;
            }

            // The only thing one handle should be concerned about is the touches that originated on top of it.
            if (touch) {
                // Returns true if a touch originated on the target.
                var isTouchOnTarget = function(checkTouch) {
                    return checkTouch.target === eventTarget || eventTarget.contains(checkTouch.target);
                };

                // In the case of touchstart events, we need to make sure there is still no more than one
                // touch on the target so we look amongst all touches.
                if (e.type === "touchstart") {
                    var targetTouches = Array.prototype.filter.call(e.touches, isTouchOnTarget);

                    // Do not support more than one touch per handle.
                    if (targetTouches.length > 1) {
                        return false;
                    }

                    x = targetTouches[0].pageX;
                    y = targetTouches[0].pageY;
                } else {
                    // In the other cases, find on changedTouches is enough.
                    var targetTouch = Array.prototype.find.call(e.changedTouches, isTouchOnTarget);

                    // Cancel if the target touch has not moved.
                    if (!targetTouch) {
                        return false;
                    }

                    x = targetTouch.pageX;
                    y = targetTouch.pageY;
                }
            }

            pageOffset = pageOffset || getPageOffset(scope_Document);

            if (mouse || pointer) {
                x = e.clientX + pageOffset.x;
                y = e.clientY + pageOffset.y;
            }

            e.pageOffset = pageOffset;
            e.points = [x, y];
            e.cursor = mouse || pointer; // Fix #435

            return e;
        }

        // Translate a coordinate in the document to a percentage on the slider
        function calcPointToPercentage(calcPoint) {
            var location = calcPoint - offset(scope_Base, options.ort);
            var proposal = (location * 100) / baseSize();

            // Clamp proposal between 0% and 100%
            // Out-of-bound coordinates may occur when .noUi-base pseudo-elements
            // are used (e.g. contained handles feature)
            proposal = limit(proposal);

            return options.dir ? 100 - proposal : proposal;
        }

        // Find handle closest to a certain percentage on the slider
        function getClosestHandle(clickedPosition) {
            var smallestDifference = 100;
            var handleNumber = false;

            scope_Handles.forEach(function(handle, index) {
                // Disabled handles are ignored
                if (isHandleDisabled(index)) {
                    return;
                }

                var handlePosition = scope_Locations[index];
                var differenceWithThisHandle = Math.abs(handlePosition - clickedPosition);

                // Initial state
                var clickAtEdge = differenceWithThisHandle === 100 && smallestDifference === 100;

                // Difference with this handle is smaller than the previously checked handle
                var isCloser = differenceWithThisHandle < smallestDifference;
                var isCloserAfter = differenceWithThisHandle <= smallestDifference && clickedPosition > handlePosition;

                if (isCloser || isCloserAfter || clickAtEdge) {
                    handleNumber = index;
                    smallestDifference = differenceWithThisHandle;
                }
            });

            return handleNumber;
        }

        // Fire 'end' when a mouse or pen leaves the document.
        function documentLeave(event, data) {
            if (event.type === "mouseout" && event.target.nodeName === "HTML" && event.relatedTarget === null) {
                eventEnd(event, data);
            }
        }

        // Handle movement on document for handle and range drag.
        function eventMove(event, data) {
            // Fix #498
            // Check value of .buttons in 'start' to work around a bug in IE10 mobile (data.buttonsProperty).
            // https://connect.microsoft.com/IE/feedback/details/927005/mobile-ie10-windows-phone-buttons-property-of-pointermove-event-always-zero
            // IE9 has .buttons and .which zero on mousemove.
            // Firefox breaks the spec MDN defines.
            if (navigator.appVersion.indexOf("MSIE 9") === -1 && event.buttons === 0 && data.buttonsProperty !== 0) {
                return eventEnd(event, data);
            }

            // Check if we are moving up or down
            var movement = (options.dir ? -1 : 1) * (event.calcPoint - data.startCalcPoint);

            // Convert the movement into a percentage of the slider width/height
            var proposal = (movement * 100) / data.baseSize;

            moveHandles(movement > 0, proposal, data.locations, data.handleNumbers);
        }

        // Unbind move events on document, call callbacks.
        function eventEnd(event, data) {
            // The handle is no longer active, so remove the class.
            if (data.handle) {
                removeClass(data.handle, options.cssClasses.active);
                scope_ActiveHandlesCount -= 1;
            }

            // Unbind the move and end events, which are added on 'start'.
            data.listeners.forEach(function(c) {
                scope_DocumentElement.removeEventListener(c[0], c[1]);
            });

            if (scope_ActiveHandlesCount === 0) {
                // Remove dragging class.
                removeClass(scope_Target, options.cssClasses.drag);
                setZindex();

                // Remove cursor styles and text-selection events bound to the body.
                if (event.cursor) {
                    scope_Body.style.cursor = "";
                    scope_Body.removeEventListener("selectstart", preventDefault);
                }
            }

            data.handleNumbers.forEach(function(handleNumber) {
                fireEvent("change", handleNumber);
                fireEvent("set", handleNumber);
                fireEvent("end", handleNumber);
            });
        }

        // Bind move events on document.
        function eventStart(event, data) {
            // Ignore event if any handle is disabled
            if (data.handleNumbers.some(isHandleDisabled)) {
                return false;
            }

            var handle;

            if (data.handleNumbers.length === 1) {
                var handleOrigin = scope_Handles[data.handleNumbers[0]];

                handle = handleOrigin.children[0];
                scope_ActiveHandlesCount += 1;

                // Mark the handle as 'active' so it can be styled.
                addClass(handle, options.cssClasses.active);
            }

            // A drag should never propagate up to the 'tap' event.
            event.stopPropagation();

            // Record the event listeners.
            var listeners = [];

            // Attach the move and end events.
            var moveEvent = attachEvent(actions.move, scope_DocumentElement, eventMove, {
                // The event target has changed so we need to propagate the original one so that we keep
                // relying on it to extract target touches.
                target: event.target,
                handle: handle,
                listeners: listeners,
                startCalcPoint: event.calcPoint,
                baseSize: baseSize(),
                pageOffset: event.pageOffset,
                handleNumbers: data.handleNumbers,
                buttonsProperty: event.buttons,
                locations: scope_Locations.slice()
            });

            var endEvent = attachEvent(actions.end, scope_DocumentElement, eventEnd, {
                target: event.target,
                handle: handle,
                listeners: listeners,
                doNotReject: true,
                handleNumbers: data.handleNumbers
            });

            var outEvent = attachEvent("mouseout", scope_DocumentElement, documentLeave, {
                target: event.target,
                handle: handle,
                listeners: listeners,
                doNotReject: true,
                handleNumbers: data.handleNumbers
            });

            // We want to make sure we pushed the listeners in the listener list rather than creating
            // a new one as it has already been passed to the event handlers.
            listeners.push.apply(listeners, moveEvent.concat(endEvent, outEvent));

            // Text selection isn't an issue on touch devices,
            // so adding cursor styles can be skipped.
            if (event.cursor) {
                // Prevent the 'I' cursor and extend the range-drag cursor.
                scope_Body.style.cursor = getComputedStyle(event.target).cursor;

                // Mark the target with a dragging state.
                if (scope_Handles.length > 1) {
                    addClass(scope_Target, options.cssClasses.drag);
                }

                // Prevent text selection when dragging the handles.
                // In noUiSlider <= 9.2.0, this was handled by calling preventDefault on mouse/touch start/move,
                // which is scroll blocking. The selectstart event is supported by FireFox starting from version 52,
                // meaning the only holdout is iOS Safari. This doesn't matter: text selection isn't triggered there.
                // The 'cursor' flag is false.
                // See: http://caniuse.com/#search=selectstart
                scope_Body.addEventListener("selectstart", preventDefault, false);
            }

            data.handleNumbers.forEach(function(handleNumber) {
                fireEvent("start", handleNumber);
            });
        }

        // Move closest handle to tapped location.
        function eventTap(event) {
            // The tap event shouldn't propagate up
            event.stopPropagation();

            var proposal = calcPointToPercentage(event.calcPoint);
            var handleNumber = getClosestHandle(proposal);

            // Tackle the case that all handles are 'disabled'.
            if (handleNumber === false) {
                return false;
            }

            // Flag the slider as it is now in a transitional state.
            // Transition takes a configurable amount of ms (default 300). Re-enable the slider after that.
            if (!options.events.snap) {
                addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
            }

            setHandle(handleNumber, proposal, true, true);

            setZindex();

            fireEvent("slide", handleNumber, true);
            fireEvent("update", handleNumber, true);
            fireEvent("change", handleNumber, true);
            fireEvent("set", handleNumber, true);

            if (options.events.snap) {
                eventStart(event, { handleNumbers: [handleNumber] });
            }
        }

        // Fires a 'hover' event for a hovered mouse/pen position.
        function eventHover(event) {
            var proposal = calcPointToPercentage(event.calcPoint);

            var to = scope_Spectrum.getStep(proposal);
            var value = scope_Spectrum.fromStepping(to);

            Object.keys(scope_Events).forEach(function(targetEvent) {
                if ("hover" === targetEvent.split(".")[0]) {
                    scope_Events[targetEvent].forEach(function(callback) {
                        callback.call(scope_Self, value);
                    });
                }
            });
        }

        // Handles keydown on focused handles
        // Don't move the document when pressing arrow keys on focused handles
        function eventKeydown(event, handleNumber) {
            if (isSliderDisabled() || isHandleDisabled(handleNumber)) {
                return false;
            }

            var horizontalKeys = ["Left", "Right"];
            var verticalKeys = ["Down", "Up"];

            if (options.dir && !options.ort) {
                // On an right-to-left slider, the left and right keys act inverted
                horizontalKeys.reverse();
            } else if (options.ort && !options.dir) {
                // On a top-to-bottom slider, the up and down keys act inverted
                verticalKeys.reverse();
            }

            // Strip "Arrow" for IE compatibility. https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
            var key = event.key.replace("Arrow", "");
            var isDown = key === verticalKeys[0] || key === horizontalKeys[0];
            var isUp = key === verticalKeys[1] || key === horizontalKeys[1];

            if (!isDown && !isUp) {
                return true;
            }

            event.preventDefault();

            var direction = isDown ? 0 : 1;
            var steps = getNextStepsForHandle(handleNumber);
            var step = steps[direction];

            // At the edge of a slider, do nothing
            if (step === null) {
                return false;
            }

            // No step set, use the default of 10% of the sub-range
            if (step === false) {
                step = scope_Spectrum.getDefaultStep(scope_Locations[handleNumber], isDown, 10);
            }

            // Step over zero-length ranges (#948);
            step = Math.max(step, 0.0000001);

            // Decrement for down steps
            step = (isDown ? -1 : 1) * step;

            setHandle(handleNumber, scope_Spectrum.toStepping(scope_Values[handleNumber] + step), true, true);

            fireEvent("slide", handleNumber);
            fireEvent("update", handleNumber);
            fireEvent("change", handleNumber);
            fireEvent("set", handleNumber);

            return false;
        }

        // Attach events to several slider parts.
        function bindSliderEvents(behaviour) {
            // Attach the standard drag event to the handles.
            if (!behaviour.fixed) {
                scope_Handles.forEach(function(handle, index) {
                    // These events are only bound to the visual handle
                    // element, not the 'real' origin element.
                    attachEvent(actions.start, handle.children[0], eventStart, {
                        handleNumbers: [index]
                    });
                });
            }

            // Attach the tap event to the slider base.
            if (behaviour.tap) {
                attachEvent(actions.start, scope_Base, eventTap, {});
            }

            // Fire hover events
            if (behaviour.hover) {
                attachEvent(actions.move, scope_Base, eventHover, {
                    hover: true
                });
            }

            // Make the range draggable.
            if (behaviour.drag) {
                scope_Connects.forEach(function(connect, index) {
                    if (connect === false || index === 0 || index === scope_Connects.length - 1) {
                        return;
                    }

                    var handleBefore = scope_Handles[index - 1];
                    var handleAfter = scope_Handles[index];
                    var eventHolders = [connect];

                    addClass(connect, options.cssClasses.draggable);

                    // When the range is fixed, the entire range can
                    // be dragged by the handles. The handle in the first
                    // origin will propagate the start event upward,
                    // but it needs to be bound manually on the other.
                    if (behaviour.fixed) {
                        eventHolders.push(handleBefore.children[0]);
                        eventHolders.push(handleAfter.children[0]);
                    }

                    eventHolders.forEach(function(eventHolder) {
                        attachEvent(actions.start, eventHolder, eventStart, {
                            handles: [handleBefore, handleAfter],
                            handleNumbers: [index - 1, index]
                        });
                    });
                });
            }
        }

        // Attach an event to this slider, possibly including a namespace
        function bindEvent(namespacedEvent, callback) {
            scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
            scope_Events[namespacedEvent].push(callback);

            // If the event bound is 'update,' fire it immediately for all handles.
            if (namespacedEvent.split(".")[0] === "update") {
                scope_Handles.forEach(function(a, index) {
                    fireEvent("update", index);
                });
            }
        }

        // Undo attachment of event
        function removeEvent(namespacedEvent) {
            var event = namespacedEvent && namespacedEvent.split(".")[0];
            var namespace = event && namespacedEvent.substring(event.length);

            Object.keys(scope_Events).forEach(function(bind) {
                var tEvent = bind.split(".")[0];
                var tNamespace = bind.substring(tEvent.length);

                if ((!event || event === tEvent) && (!namespace || namespace === tNamespace)) {
                    delete scope_Events[bind];
                }
            });
        }

        // External event handling
        function fireEvent(eventName, handleNumber, tap) {
            Object.keys(scope_Events).forEach(function(targetEvent) {
                var eventType = targetEvent.split(".")[0];

                if (eventName === eventType) {
                    scope_Events[targetEvent].forEach(function(callback) {
                        callback.call(
                            // Use the slider public API as the scope ('this')
                            scope_Self,
                            // Return values as array, so arg_1[arg_2] is always valid.
                            scope_Values.map(options.format.to),
                            // Handle index, 0 or 1
                            handleNumber,
                            // Un-formatted slider values
                            scope_Values.slice(),
                            // Event is fired by tap, true or false
                            tap || false,
                            // Left offset of the handle, in relation to the slider
                            scope_Locations.slice()
                        );
                    });
                }
            });
        }

        // Split out the handle positioning logic so the Move event can use it, too
        function checkHandlePosition(reference, handleNumber, to, lookBackward, lookForward, getValue) {
            // For sliders with multiple handles, limit movement to the other handle.
            // Apply the margin option by adding it to the handle positions.
            if (scope_Handles.length > 1 && !options.events.unconstrained) {
                if (lookBackward && handleNumber > 0) {
                    to = Math.max(to, reference[handleNumber - 1] + options.margin);
                }

                if (lookForward && handleNumber < scope_Handles.length - 1) {
                    to = Math.min(to, reference[handleNumber + 1] - options.margin);
                }
            }

            // The limit option has the opposite effect, limiting handles to a
            // maximum distance from another. Limit must be > 0, as otherwise
            // handles would be unmovable.
            if (scope_Handles.length > 1 && options.limit) {
                if (lookBackward && handleNumber > 0) {
                    to = Math.min(to, reference[handleNumber - 1] + options.limit);
                }

                if (lookForward && handleNumber < scope_Handles.length - 1) {
                    to = Math.max(to, reference[handleNumber + 1] - options.limit);
                }
            }

            // The padding option keeps the handles a certain distance from the
            // edges of the slider. Padding must be > 0.
            if (options.padding) {
                if (handleNumber === 0) {
                    to = Math.max(to, options.padding[0]);
                }

                if (handleNumber === scope_Handles.length - 1) {
                    to = Math.min(to, 100 - options.padding[1]);
                }
            }

            to = scope_Spectrum.getStep(to);

            // Limit percentage to the 0 - 100 range
            to = limit(to);

            // Return false if handle can't move
            if (to === reference[handleNumber] && !getValue) {
                return false;
            }

            return to;
        }

        // Uses slider orientation to create CSS rules. a = base value;
        function inRuleOrder(v, a) {
            var o = options.ort;
            return (o ? a : v) + ", " + (o ? v : a);
        }

        // Moves handle(s) by a percentage
        // (bool, % to move, [% where handle started, ...], [index in scope_Handles, ...])
        function moveHandles(upward, proposal, locations, handleNumbers) {
            var proposals = locations.slice();

            var b = [!upward, upward];
            var f = [upward, !upward];

            // Copy handleNumbers so we don't change the dataset
            handleNumbers = handleNumbers.slice();

            // Check to see which handle is 'leading'.
            // If that one can't move the second can't either.
            if (upward) {
                handleNumbers.reverse();
            }

            // Step 1: get the maximum percentage that any of the handles can move
            if (handleNumbers.length > 1) {
                handleNumbers.forEach(function(handleNumber, o) {
                    var to = checkHandlePosition(
                        proposals,
                        handleNumber,
                        proposals[handleNumber] + proposal,
                        b[o],
                        f[o],
                        false
                    );

                    // Stop if one of the handles can't move.
                    if (to === false) {
                        proposal = 0;
                    } else {
                        proposal = to - proposals[handleNumber];
                        proposals[handleNumber] = to;
                    }
                });
            }

            // If using one handle, check backward AND forward
            else {
                b = f = [true];
            }

            var state = false;

            // Step 2: Try to set the handles with the found percentage
            handleNumbers.forEach(function(handleNumber, o) {
                state = setHandle(handleNumber, locations[handleNumber] + proposal, b[o], f[o]) || state;
            });

            // Step 3: If a handle moved, fire events
            if (state) {
                handleNumbers.forEach(function(handleNumber) {
                    fireEvent("update", handleNumber);
                    fireEvent("slide", handleNumber);
                });
            }
        }

        // Takes a base value and an offset. This offset is used for the connect bar size.
        // In the initial design for this feature, the origin element was 1% wide.
        // Unfortunately, a rounding bug in Chrome makes it impossible to implement this feature
        // in this manner: https://bugs.chromium.org/p/chromium/issues/detail?id=798223
        function transformDirection(a, b) {
            return options.dir ? 100 - a - b : a;
        }

        // Updates scope_Locations and scope_Values, updates visual state
        function updateHandlePosition(handleNumber, to) {
            // Update locations.
            scope_Locations[handleNumber] = to;

            // Convert the value to the slider stepping/range.
            scope_Values[handleNumber] = scope_Spectrum.fromStepping(to);

            var translation = 10 * (transformDirection(to, 0) - scope_DirOffset);
            var translateRule = "translate(" + inRuleOrder(translation + "%", "0") + ")";

            scope_Handles[handleNumber].style[options.transformRule] = translateRule;

            updateConnect(handleNumber);
            updateConnect(handleNumber + 1);
        }

        // Handles before the slider middle are stacked later = higher,
        // Handles after the middle later is lower
        // [[7] [8] .......... | .......... [5] [4]
        function setZindex() {
            scope_HandleNumbers.forEach(function(handleNumber) {
                var dir = scope_Locations[handleNumber] > 50 ? -1 : 1;
                var zIndex = 3 + (scope_Handles.length + dir * handleNumber);
                scope_Handles[handleNumber].style.zIndex = zIndex;
            });
        }

        // Test suggested values and apply margin, step.
        function setHandle(handleNumber, to, lookBackward, lookForward) {
            to = checkHandlePosition(scope_Locations, handleNumber, to, lookBackward, lookForward, false);

            if (to === false) {
                return false;
            }

            updateHandlePosition(handleNumber, to);

            return true;
        }

        // Updates style attribute for connect nodes
        function updateConnect(index) {
            // Skip connects set to false
            if (!scope_Connects[index]) {
                return;
            }

            var l = 0;
            var h = 100;

            if (index !== 0) {
                l = scope_Locations[index - 1];
            }

            if (index !== scope_Connects.length - 1) {
                h = scope_Locations[index];
            }

            // We use two rules:
            // 'translate' to change the left/top offset;
            // 'scale' to change the width of the element;
            // As the element has a width of 100%, a translation of 100% is equal to 100% of the parent (.noUi-base)
            var connectWidth = h - l;
            var translateRule = "translate(" + inRuleOrder(transformDirection(l, connectWidth) + "%", "0") + ")";
            var scaleRule = "scale(" + inRuleOrder(connectWidth / 100, "1") + ")";

            scope_Connects[index].style[options.transformRule] = translateRule + " " + scaleRule;
        }

        // Parses value passed to .set method. Returns current value if not parse-able.
        function resolveToValue(to, handleNumber) {
            // Setting with null indicates an 'ignore'.
            // Inputting 'false' is invalid.
            if (to === null || to === false || to === undefined) {
                return scope_Locations[handleNumber];
            }

            // If a formatted number was passed, attempt to decode it.
            if (typeof to === "number") {
                to = String(to);
            }

            to = options.format.from(to);
            to = scope_Spectrum.toStepping(to);

            // If parsing the number failed, use the current value.
            if (to === false || isNaN(to)) {
                return scope_Locations[handleNumber];
            }

            return to;
        }

        // Set the slider value.
        function valueSet(input, fireSetEvent) {
            var values = asArray(input);
            var isInit = scope_Locations[0] === undefined;

            // Event fires by default
            fireSetEvent = fireSetEvent === undefined ? true : !!fireSetEvent;

            // Animation is optional.
            // Make sure the initial values were set before using animated placement.
            if (options.animate && !isInit) {
                addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
            }

            // First pass, without lookAhead but with lookBackward. Values are set from left to right.
            scope_HandleNumbers.forEach(function(handleNumber) {
                setHandle(handleNumber, resolveToValue(values[handleNumber], handleNumber), true, false);
            });

            // Second pass. Now that all base values are set, apply constraints
            scope_HandleNumbers.forEach(function(handleNumber) {
                setHandle(handleNumber, scope_Locations[handleNumber], true, true);
            });

            setZindex();

            scope_HandleNumbers.forEach(function(handleNumber) {
                fireEvent("update", handleNumber);

                // Fire the event only for handles that received a new value, as per #579
                if (values[handleNumber] !== null && fireSetEvent) {
                    fireEvent("set", handleNumber);
                }
            });
        }

        // Reset slider to initial values
        function valueReset(fireSetEvent) {
            valueSet(options.start, fireSetEvent);
        }

        // Set value for a single handle
        function valueSetHandle(handleNumber, value, fireSetEvent) {
            // Ensure numeric input
            handleNumber = Number(handleNumber);

            if (!(handleNumber >= 0 && handleNumber < scope_HandleNumbers.length)) {
                throw new Error("noUiSlider (" + VERSION + "): invalid handle number, got: " + handleNumber);
            }

            // Look both backward and forward, since we don't want this handle to "push" other handles (#960);
            setHandle(handleNumber, resolveToValue(value, handleNumber), true, true);

            fireEvent("update", handleNumber);

            if (fireSetEvent) {
                fireEvent("set", handleNumber);
            }
        }

        // Get the slider value.
        function valueGet() {
            var values = scope_Values.map(options.format.to);

            // If only one handle is used, return a single value.
            if (values.length === 1) {
                return values[0];
            }

            return values;
        }

        // Removes classes from the root and empties it.
        function destroy() {
            for (var key in options.cssClasses) {
                if (!options.cssClasses.hasOwnProperty(key)) {
                    continue;
                }
                removeClass(scope_Target, options.cssClasses[key]);
            }

            while (scope_Target.firstChild) {
                scope_Target.removeChild(scope_Target.firstChild);
            }

            delete scope_Target.noUiSlider;
        }

        function getNextStepsForHandle(handleNumber) {
            var location = scope_Locations[handleNumber];
            var nearbySteps = scope_Spectrum.getNearbySteps(location);
            var value = scope_Values[handleNumber];
            var increment = nearbySteps.thisStep.step;
            var decrement = null;

            // If snapped, directly use defined step value
            if (options.snap) {
                return [
                    value - nearbySteps.stepBefore.startValue || null,
                    nearbySteps.stepAfter.startValue - value || null
                ];
            }

            // If the next value in this step moves into the next step,
            // the increment is the start of the next step - the current value
            if (increment !== false) {
                if (value + increment > nearbySteps.stepAfter.startValue) {
                    increment = nearbySteps.stepAfter.startValue - value;
                }
            }

            // If the value is beyond the starting point
            if (value > nearbySteps.thisStep.startValue) {
                decrement = nearbySteps.thisStep.step;
            } else if (nearbySteps.stepBefore.step === false) {
                decrement = false;
            }

            // If a handle is at the start of a step, it always steps back into the previous step first
            else {
                decrement = value - nearbySteps.stepBefore.highestStep;
            }

            // Now, if at the slider edges, there is no in/decrement
            if (location === 100) {
                increment = null;
            } else if (location === 0) {
                decrement = null;
            }

            // As per #391, the comparison for the decrement step can have some rounding issues.
            var stepDecimals = scope_Spectrum.countStepDecimals();

            // Round per #391
            if (increment !== null && increment !== false) {
                increment = Number(increment.toFixed(stepDecimals));
            }

            if (decrement !== null && decrement !== false) {
                decrement = Number(decrement.toFixed(stepDecimals));
            }

            return [decrement, increment];
        }

        // Get the current step size for the slider.
        function getNextSteps() {
            return scope_HandleNumbers.map(getNextStepsForHandle);
        }

        // Updateable: margin, limit, padding, step, range, animate, snap
        function updateOptions(optionsToUpdate, fireSetEvent) {
            // Spectrum is created using the range, snap, direction and step options.
            // 'snap' and 'step' can be updated.
            // If 'snap' and 'step' are not passed, they should remain unchanged.
            var v = valueGet();

            var updateAble = [
                "margin",
                "limit",
                "padding",
                "range",
                "animate",
                "snap",
                "step",
                "format",
                "pips",
                "tooltips"
            ];

            // Only change options that we're actually passed to update.
            updateAble.forEach(function(name) {
                // Check for undefined. null removes the value.
                if (optionsToUpdate[name] !== undefined) {
                    originalOptions[name] = optionsToUpdate[name];
                }
            });

            var newOptions = testOptions(originalOptions);

            // Load new options into the slider state
            updateAble.forEach(function(name) {
                if (optionsToUpdate[name] !== undefined) {
                    options[name] = newOptions[name];
                }
            });

            scope_Spectrum = newOptions.spectrum;

            // Limit, margin and padding depend on the spectrum but are stored outside of it. (#677)
            options.margin = newOptions.margin;
            options.limit = newOptions.limit;
            options.padding = newOptions.padding;

            // Update pips, removes existing.
            if (options.pips) {
                pips(options.pips);
            } else {
                removePips();
            }

            // Update tooltips, removes existing.
            if (options.tooltips) {
                tooltips();
            } else {
                removeTooltips();
            }

            // Invalidate the current positioning so valueSet forces an update.
            scope_Locations = [];
            valueSet(optionsToUpdate.start || v, fireSetEvent);
        }

        // Initialization steps
        function setupSlider() {
            // Create the base element, initialize HTML and set classes.
            // Add handles and connect elements.
            scope_Base = addSlider(scope_Target);

            addElements(options.connect, scope_Base);

            // Attach user events.
            bindSliderEvents(options.events);

            // Use the public value method to set the start values.
            valueSet(options.start);

            if (options.pips) {
                pips(options.pips);
            }

            if (options.tooltips) {
                tooltips();
            }

            aria();
        }

        setupSlider();

        // noinspection JSUnusedGlobalSymbols
        scope_Self = {
            destroy: destroy,
            steps: getNextSteps,
            on: bindEvent,
            off: removeEvent,
            get: valueGet,
            set: valueSet,
            setHandle: valueSetHandle,
            reset: valueReset,
            // Exposed for unit testing, don't use this in your application.
            __moveHandles: function(a, b, c) {
                moveHandles(a, b, scope_Locations, c);
            },
            options: originalOptions, // Issue #600, #678
            updateOptions: updateOptions,
            target: scope_Target, // Issue #597
            removePips: removePips,
            removeTooltips: removeTooltips,
            pips: pips // Issue #594
        };

        return scope_Self;
    }

    // Run the standard initializer
    function initialize(target, originalOptions) {
        if (!target || !target.nodeName) {
            throw new Error("noUiSlider (" + VERSION + "): create requires a single element, got: " + target);
        }

        // Throw an error if the slider was already initialized.
        if (target.noUiSlider) {
            throw new Error("noUiSlider (" + VERSION + "): Slider was already initialized.");
        }

        // Test the options and create the slider environment;
        var options = testOptions(originalOptions, target);
        var api = scope(target, options, originalOptions);

        target.noUiSlider = api;

        return api;
    }

    // Use an object instead of a function for future expandability;
    return {
        // Exposed for unit testing, don't use this in your application.
        __spectrum: Spectrum,
        version: VERSION,
        create: initialize
    };
});

},{}],42:[function(require,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).numbro=e()}}(function(){return function a(o,u,c){function s(t,e){if(!u[t]){if(!o[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(l)return l(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var i=u[t]={exports:{}};o[t][0].call(i.exports,function(e){return s(o[t][1][e]||e)},i,i.exports,a,o,u,c)}return u[t].exports}for(var l="function"==typeof require&&require,e=0;e<c.length;e++)s(c[e]);return s}({1:[function(e,r,t){!function(e){"use strict";var t,k=/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,_=Math.ceil,L=Math.floor,T="[BigNumber Error] ",P=T+"Number primitive has more than 15 significant digits: ",U=1e14,j=14,C=9007199254740991,R=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13],I=1e7,$=1e9;function G(e){var t=0|e;return 0<e||e===t?t:t-1}function V(e){for(var t,r,n=1,i=e.length,a=e[0]+"";n<i;){for(t=e[n++]+"",r=j-t.length;r--;t="0"+t);a+=t}for(i=a.length;48===a.charCodeAt(--i););return a.slice(0,i+1||1)}function q(e,t){var r,n,i=e.c,a=t.c,o=e.s,u=t.s,c=e.e,s=t.e;if(!o||!u)return null;if(r=i&&!i[0],n=a&&!a[0],r||n)return r?n?0:-u:o;if(o!=u)return o;if(r=o<0,n=c==s,!i||!a)return n?0:!i^r?1:-1;if(!n)return s<c^r?1:-1;for(u=(c=i.length)<(s=a.length)?c:s,o=0;o<u;o++)if(i[o]!=a[o])return i[o]>a[o]^r?1:-1;return c==s?0:s<c^r?1:-1}function Z(e,t,r,n){if(e<t||r<e||e!==(e<0?_(e):L(e)))throw Error(T+(n||"Argument")+("number"==typeof e?e<t||r<e?" out of range: ":" not an integer: ":" not a primitive number: ")+String(e))}function z(e){var t=e.c.length-1;return G(e.e/j)==t&&e.c[t]%2!=0}function W(e,t){return(1<e.length?e.charAt(0)+"."+e.slice(1):e)+(t<0?"e":"e+")+t}function H(e,t,r){var n,i;if(t<0){for(i=r+".";++t;i+=r);e=i+e}else if(++t>(n=e.length)){for(i=r,t-=n;--t;i+=r);e+=i}else t<n&&(e=e.slice(0,t)+"."+e.slice(t));return e}(t=function e(t){var y,f,p,r,s,o,u,c,l,g,n=A.prototype={constructor:A,toString:null,valueOf:null},d=new A(1),b=20,w=4,h=-7,v=21,m=-1e7,O=1e7,x=!1,a=1,S=0,N={prefix:"",groupSize:3,secondaryGroupSize:0,groupSeparator:",",decimalSeparator:".",fractionGroupSize:0,fractionGroupSeparator:" ",suffix:""},M="0123456789abcdefghijklmnopqrstuvwxyz";function A(e,t){var r,n,i,a,o,u,c,s,l=this;if(!(l instanceof A))return new A(e,t);if(null==t){if(e instanceof A)return l.s=e.s,l.e=e.e,void(l.c=(e=e.c)?e.slice():e);if((u="number"==typeof e)&&0*e==0){if(l.s=1/e<0?(e=-e,-1):1,e===~~e){for(a=0,o=e;10<=o;o/=10,a++);return l.e=a,void(l.c=[e])}s=String(e)}else{if(s=String(e),!k.test(s))return p(l,s,u);l.s=45==s.charCodeAt(0)?(s=s.slice(1),-1):1}-1<(a=s.indexOf("."))&&(s=s.replace(".","")),0<(o=s.search(/e/i))?(a<0&&(a=o),a+=+s.slice(o+1),s=s.substring(0,o)):a<0&&(a=s.length)}else{if(Z(t,2,M.length,"Base"),s=String(e),10==t)return E(l=new A(e instanceof A?e:s),b+l.e+1,w);if(u="number"==typeof e){if(0*e!=0)return p(l,s,u,t);if(l.s=1/e<0?(s=s.slice(1),-1):1,A.DEBUG&&15<s.replace(/^0\.0*|\./,"").length)throw Error(P+e);u=!1}else l.s=45===s.charCodeAt(0)?(s=s.slice(1),-1):1;for(r=M.slice(0,t),a=o=0,c=s.length;o<c;o++)if(r.indexOf(n=s.charAt(o))<0){if("."==n){if(a<o){a=c;continue}}else if(!i&&(s==s.toUpperCase()&&(s=s.toLowerCase())||s==s.toLowerCase()&&(s=s.toUpperCase()))){i=!0,o=-1,a=0;continue}return p(l,String(e),u,t)}-1<(a=(s=f(s,t,10,l.s)).indexOf("."))?s=s.replace(".",""):a=s.length}for(o=0;48===s.charCodeAt(o);o++);for(c=s.length;48===s.charCodeAt(--c););if(s=s.slice(o,++c)){if(c-=o,u&&A.DEBUG&&15<c&&(C<e||e!==L(e)))throw Error(P+l.s*e);if(O<(a=a-o-1))l.c=l.e=null;else if(a<m)l.c=[l.e=0];else{if(l.e=a,l.c=[],o=(a+1)%j,a<0&&(o+=j),o<c){for(o&&l.c.push(+s.slice(0,o)),c-=j;o<c;)l.c.push(+s.slice(o,o+=j));s=s.slice(o),o=j-s.length}else o-=c;for(;o--;s+="0");l.c.push(+s)}}else l.c=[l.e=0]}function i(e,t,r,n){var i,a,o,u,c;if(null==r?r=w:Z(r,0,8),!e.c)return e.toString();if(i=e.c[0],o=e.e,null==t)c=V(e.c),c=1==n||2==n&&(o<=h||v<=o)?W(c,o):H(c,o,"0");else if(a=(e=E(new A(e),t,r)).e,u=(c=V(e.c)).length,1==n||2==n&&(t<=a||a<=h)){for(;u<t;c+="0",u++);c=W(c,a)}else if(t-=o,c=H(c,a,"0"),u<a+1){if(0<--t)for(c+=".";t--;c+="0");}else if(0<(t+=a-u))for(a+1==u&&(c+=".");t--;c+="0");return e.s<0&&i?"-"+c:c}function B(e,t){for(var r,n=1,i=new A(e[0]);n<e.length;n++){if(!(r=new A(e[n])).s){i=r;break}t.call(i,r)&&(i=r)}return i}function D(e,t,r){for(var n=1,i=t.length;!t[--i];t.pop());for(i=t[0];10<=i;i/=10,n++);return(r=n+r*j-1)>O?e.c=e.e=null:e.c=r<m?[e.e=0]:(e.e=r,t),e}function E(e,t,r,n){var i,a,o,u,c,s,l,f=e.c,p=R;if(f){e:{for(i=1,u=f[0];10<=u;u/=10,i++);if((a=t-i)<0)a+=j,o=t,l=(c=f[s=0])/p[i-o-1]%10|0;else if((s=_((a+1)/j))>=f.length){if(!n)break e;for(;f.length<=s;f.push(0));c=l=0,o=(a%=j)-j+(i=1)}else{for(c=u=f[s],i=1;10<=u;u/=10,i++);l=(o=(a%=j)-j+i)<0?0:c/p[i-o-1]%10|0}if(n=n||t<0||null!=f[s+1]||(o<0?c:c%p[i-o-1]),n=r<4?(l||n)&&(0==r||r==(e.s<0?3:2)):5<l||5==l&&(4==r||n||6==r&&(0<a?0<o?c/p[i-o]:0:f[s-1])%10&1||r==(e.s<0?8:7)),t<1||!f[0])return f.length=0,n?(t-=e.e+1,f[0]=p[(j-t%j)%j],e.e=-t||0):f[0]=e.e=0,e;if(0==a?(f.length=s,u=1,s--):(f.length=s+1,u=p[j-a],f[s]=0<o?L(c/p[i-o]%p[o])*u:0),n)for(;;){if(0==s){for(a=1,o=f[0];10<=o;o/=10,a++);for(o=f[0]+=u,u=1;10<=o;o/=10,u++);a!=u&&(e.e++,f[0]==U&&(f[0]=1));break}if(f[s]+=u,f[s]!=U)break;f[s--]=0,u=1}for(a=f.length;0===f[--a];f.pop());}e.e>O?e.c=e.e=null:e.e<m&&(e.c=[e.e=0])}return e}function F(e){var t,r=e.e;return null===r?e.toString():(t=V(e.c),t=r<=h||v<=r?W(t,r):H(t,r,"0"),e.s<0?"-"+t:t)}return A.clone=e,A.ROUND_UP=0,A.ROUND_DOWN=1,A.ROUND_CEIL=2,A.ROUND_FLOOR=3,A.ROUND_HALF_UP=4,A.ROUND_HALF_DOWN=5,A.ROUND_HALF_EVEN=6,A.ROUND_HALF_CEIL=7,A.ROUND_HALF_FLOOR=8,A.EUCLID=9,A.config=A.set=function(e){var t,r;if(null!=e){if("object"!=typeof e)throw Error(T+"Object expected: "+e);if(e.hasOwnProperty(t="DECIMAL_PLACES")&&(Z(r=e[t],0,$,t),b=r),e.hasOwnProperty(t="ROUNDING_MODE")&&(Z(r=e[t],0,8,t),w=r),e.hasOwnProperty(t="EXPONENTIAL_AT")&&((r=e[t])&&r.pop?(Z(r[0],-$,0,t),Z(r[1],0,$,t),h=r[0],v=r[1]):(Z(r,-$,$,t),h=-(v=r<0?-r:r))),e.hasOwnProperty(t="RANGE"))if((r=e[t])&&r.pop)Z(r[0],-$,-1,t),Z(r[1],1,$,t),m=r[0],O=r[1];else{if(Z(r,-$,$,t),!r)throw Error(T+t+" cannot be zero: "+r);m=-(O=r<0?-r:r)}if(e.hasOwnProperty(t="CRYPTO")){if((r=e[t])!==!!r)throw Error(T+t+" not true or false: "+r);if(r){if("undefined"==typeof crypto||!crypto||!crypto.getRandomValues&&!crypto.randomBytes)throw x=!r,Error(T+"crypto unavailable");x=r}else x=r}if(e.hasOwnProperty(t="MODULO_MODE")&&(Z(r=e[t],0,9,t),a=r),e.hasOwnProperty(t="POW_PRECISION")&&(Z(r=e[t],0,$,t),S=r),e.hasOwnProperty(t="FORMAT")){if("object"!=typeof(r=e[t]))throw Error(T+t+" not an object: "+r);N=r}if(e.hasOwnProperty(t="ALPHABET")){if("string"!=typeof(r=e[t])||/^.$|[+-.\s]|(.).*\1/.test(r))throw Error(T+t+" invalid: "+r);M=r}}return{DECIMAL_PLACES:b,ROUNDING_MODE:w,EXPONENTIAL_AT:[h,v],RANGE:[m,O],CRYPTO:x,MODULO_MODE:a,POW_PRECISION:S,FORMAT:N,ALPHABET:M}},A.isBigNumber=function(e){return e instanceof A||e&&!0===e._isBigNumber||!1},A.maximum=A.max=function(){return B(arguments,n.lt)},A.minimum=A.min=function(){return B(arguments,n.gt)},A.random=(r=9007199254740992,s=Math.random()*r&2097151?function(){return L(Math.random()*r)}:function(){return 8388608*(1073741824*Math.random()|0)+(8388608*Math.random()|0)},function(e){var t,r,n,i,a,o=0,u=[],c=new A(d);if(null==e?e=b:Z(e,0,$),i=_(e/j),x)if(crypto.getRandomValues){for(t=crypto.getRandomValues(new Uint32Array(i*=2));o<i;)9e15<=(a=131072*t[o]+(t[o+1]>>>11))?(r=crypto.getRandomValues(new Uint32Array(2)),t[o]=r[0],t[o+1]=r[1]):(u.push(a%1e14),o+=2);o=i/2}else{if(!crypto.randomBytes)throw x=!1,Error(T+"crypto unavailable");for(t=crypto.randomBytes(i*=7);o<i;)9e15<=(a=281474976710656*(31&t[o])+1099511627776*t[o+1]+4294967296*t[o+2]+16777216*t[o+3]+(t[o+4]<<16)+(t[o+5]<<8)+t[o+6])?crypto.randomBytes(7).copy(t,o):(u.push(a%1e14),o+=7);o=i/7}if(!x)for(;o<i;)(a=s())<9e15&&(u[o++]=a%1e14);for(i=u[--o],e%=j,i&&e&&(a=R[j-e],u[o]=L(i/a)*a);0===u[o];u.pop(),o--);if(o<0)u=[n=0];else{for(n=-1;0===u[0];u.splice(0,1),n-=j);for(o=1,a=u[0];10<=a;a/=10,o++);o<j&&(n-=j-o)}return c.e=n,c.c=u,c}),A.sum=function(){for(var e=1,t=arguments,r=new A(t[0]);e<t.length;)r=r.plus(t[e++]);return r},f=function(){var v="0123456789";function m(e,t,r,n){for(var i,a,o=[0],u=0,c=e.length;u<c;){for(a=o.length;a--;o[a]*=t);for(o[0]+=n.indexOf(e.charAt(u++)),i=0;i<o.length;i++)o[i]>r-1&&(null==o[i+1]&&(o[i+1]=0),o[i+1]+=o[i]/r|0,o[i]%=r)}return o.reverse()}return function(e,t,r,n,i){var a,o,u,c,s,l,f,p,g=e.indexOf("."),h=b,d=w;for(0<=g&&(c=S,S=0,e=e.replace(".",""),l=(p=new A(t)).pow(e.length-g),S=c,p.c=m(H(V(l.c),l.e,"0"),10,r,v),p.e=p.c.length),u=c=(f=m(e,t,r,i?(a=M,v):(a=v,M))).length;0==f[--c];f.pop());if(!f[0])return a.charAt(0);if(g<0?--u:(l.c=f,l.e=u,l.s=n,f=(l=y(l,p,h,d,r)).c,s=l.r,u=l.e),g=f[o=u+h+1],c=r/2,s=s||o<0||null!=f[o+1],s=d<4?(null!=g||s)&&(0==d||d==(l.s<0?3:2)):c<g||g==c&&(4==d||s||6==d&&1&f[o-1]||d==(l.s<0?8:7)),o<1||!f[0])e=s?H(a.charAt(1),-h,a.charAt(0)):a.charAt(0);else{if(f.length=o,s)for(--r;++f[--o]>r;)f[o]=0,o||(++u,f=[1].concat(f));for(c=f.length;!f[--c];);for(g=0,e="";g<=c;e+=a.charAt(f[g++]));e=H(e,u,a.charAt(0))}return e}}(),y=function(){function M(e,t,r){var n,i,a,o,u=0,c=e.length,s=t%I,l=t/I|0;for(e=e.slice();c--;)u=((i=s*(a=e[c]%I)+(n=l*a+(o=e[c]/I|0)*s)%I*I+u)/r|0)+(n/I|0)+l*o,e[c]=i%r;return u&&(e=[u].concat(e)),e}function B(e,t,r,n){var i,a;if(r!=n)a=n<r?1:-1;else for(i=a=0;i<r;i++)if(e[i]!=t[i]){a=e[i]>t[i]?1:-1;break}return a}function D(e,t,r,n){for(var i=0;r--;)e[r]-=i,i=e[r]<t[r]?1:0,e[r]=i*n+e[r]-t[r];for(;!e[0]&&1<e.length;e.splice(0,1));}return function(e,t,r,n,i){var a,o,u,c,s,l,f,p,g,h,d,v,m,y,b,w,O,x=e.s==t.s?1:-1,S=e.c,N=t.c;if(!(S&&S[0]&&N&&N[0]))return new A(e.s&&t.s&&(S?!N||S[0]!=N[0]:N)?S&&0==S[0]||!N?0*x:x/0:NaN);for(g=(p=new A(x)).c=[],x=r+(o=e.e-t.e)+1,i||(i=U,o=G(e.e/j)-G(t.e/j),x=x/j|0),u=0;N[u]==(S[u]||0);u++);if(N[u]>(S[u]||0)&&o--,x<0)g.push(1),c=!0;else{for(y=S.length,w=N.length,x+=2,1<(s=L(i/(N[u=0]+1)))&&(N=M(N,s,i),S=M(S,s,i),w=N.length,y=S.length),m=w,d=(h=S.slice(0,w)).length;d<w;h[d++]=0);O=N.slice(),O=[0].concat(O),b=N[0],N[1]>=i/2&&b++;do{if(s=0,(a=B(N,h,w,d))<0){if(v=h[0],w!=d&&(v=v*i+(h[1]||0)),1<(s=L(v/b)))for(i<=s&&(s=i-1),f=(l=M(N,s,i)).length,d=h.length;1==B(l,h,f,d);)s--,D(l,w<f?O:N,f,i),f=l.length,a=1;else 0==s&&(a=s=1),f=(l=N.slice()).length;if(f<d&&(l=[0].concat(l)),D(h,l,d,i),d=h.length,-1==a)for(;B(N,h,w,d)<1;)s++,D(h,w<d?O:N,d,i),d=h.length}else 0===a&&(s++,h=[0]);g[u++]=s,h[0]?h[d++]=S[m]||0:(h=[S[m]],d=1)}while((m++<y||null!=h[0])&&x--);c=null!=h[0],g[0]||g.splice(0,1)}if(i==U){for(u=1,x=g[0];10<=x;x/=10,u++);E(p,r+(p.e=u+o*j-1)+1,n,c)}else p.e=o,p.r=+c;return p}}(),o=/^(-?)0([xbo])(?=\w[\w.]*$)/i,u=/^([^.]+)\.$/,c=/^\.([^.]+)$/,l=/^-?(Infinity|NaN)$/,g=/^\s*\+(?=[\w.])|^\s+|\s+$/g,p=function(e,t,r,n){var i,a=r?t:t.replace(g,"");if(l.test(a))e.s=isNaN(a)?null:a<0?-1:1,e.c=e.e=null;else{if(!r&&(a=a.replace(o,function(e,t,r){return i="x"==(r=r.toLowerCase())?16:"b"==r?2:8,n&&n!=i?e:t}),n&&(i=n,a=a.replace(u,"$1").replace(c,"0.$1")),t!=a))return new A(a,i);if(A.DEBUG)throw Error(T+"Not a"+(n?" base "+n:"")+" number: "+t);e.c=e.e=e.s=null}},n.absoluteValue=n.abs=function(){var e=new A(this);return e.s<0&&(e.s=1),e},n.comparedTo=function(e,t){return q(this,new A(e,t))},n.decimalPlaces=n.dp=function(e,t){var r,n,i;if(null!=e)return Z(e,0,$),null==t?t=w:Z(t,0,8),E(new A(this),e+this.e+1,t);if(!(r=this.c))return null;if(n=((i=r.length-1)-G(this.e/j))*j,i=r[i])for(;i%10==0;i/=10,n--);return n<0&&(n=0),n},n.dividedBy=n.div=function(e,t){return y(this,new A(e,t),b,w)},n.dividedToIntegerBy=n.idiv=function(e,t){return y(this,new A(e,t),0,1)},n.exponentiatedBy=n.pow=function(e,t){var r,n,i,a,o,u,c,s,l=this;if((e=new A(e)).c&&!e.isInteger())throw Error(T+"Exponent not an integer: "+F(e));if(null!=t&&(t=new A(t)),o=14<e.e,!l.c||!l.c[0]||1==l.c[0]&&!l.e&&1==l.c.length||!e.c||!e.c[0])return s=new A(Math.pow(+F(l),o?2-z(e):+F(e))),t?s.mod(t):s;if(u=e.s<0,t){if(t.c?!t.c[0]:!t.s)return new A(NaN);(n=!u&&l.isInteger()&&t.isInteger())&&(l=l.mod(t))}else{if(9<e.e&&(0<l.e||l.e<-1||(0==l.e?1<l.c[0]||o&&24e7<=l.c[1]:l.c[0]<8e13||o&&l.c[0]<=9999975e7)))return a=l.s<0&&z(e)?-0:0,-1<l.e&&(a=1/a),new A(u?1/a:a);S&&(a=_(S/j+2))}for(c=o?(r=new A(.5),u&&(e.s=1),z(e)):(i=Math.abs(+F(e)))%2,s=new A(d);;){if(c){if(!(s=s.times(l)).c)break;a?s.c.length>a&&(s.c.length=a):n&&(s=s.mod(t))}if(i){if(0===(i=L(i/2)))break;c=i%2}else if(E(e=e.times(r),e.e+1,1),14<e.e)c=z(e);else{if(0==(i=+F(e)))break;c=i%2}l=l.times(l),a?l.c&&l.c.length>a&&(l.c.length=a):n&&(l=l.mod(t))}return n?s:(u&&(s=d.div(s)),t?s.mod(t):a?E(s,S,w,void 0):s)},n.integerValue=function(e){var t=new A(this);return null==e?e=w:Z(e,0,8),E(t,t.e+1,e)},n.isEqualTo=n.eq=function(e,t){return 0===q(this,new A(e,t))},n.isFinite=function(){return!!this.c},n.isGreaterThan=n.gt=function(e,t){return 0<q(this,new A(e,t))},n.isGreaterThanOrEqualTo=n.gte=function(e,t){return 1===(t=q(this,new A(e,t)))||0===t},n.isInteger=function(){return!!this.c&&G(this.e/j)>this.c.length-2},n.isLessThan=n.lt=function(e,t){return q(this,new A(e,t))<0},n.isLessThanOrEqualTo=n.lte=function(e,t){return-1===(t=q(this,new A(e,t)))||0===t},n.isNaN=function(){return!this.s},n.isNegative=function(){return this.s<0},n.isPositive=function(){return 0<this.s},n.isZero=function(){return!!this.c&&0==this.c[0]},n.minus=function(e,t){var r,n,i,a,o=this,u=o.s;if(t=(e=new A(e,t)).s,!u||!t)return new A(NaN);if(u!=t)return e.s=-t,o.plus(e);var c=o.e/j,s=e.e/j,l=o.c,f=e.c;if(!c||!s){if(!l||!f)return l?(e.s=-t,e):new A(f?o:NaN);if(!l[0]||!f[0])return f[0]?(e.s=-t,e):new A(l[0]?o:3==w?-0:0)}if(c=G(c),s=G(s),l=l.slice(),u=c-s){for((i=(a=u<0)?(u=-u,l):(s=c,f)).reverse(),t=u;t--;i.push(0));i.reverse()}else for(n=(a=(u=l.length)<(t=f.length))?u:t,u=t=0;t<n;t++)if(l[t]!=f[t]){a=l[t]<f[t];break}if(a&&(i=l,l=f,f=i,e.s=-e.s),0<(t=(n=f.length)-(r=l.length)))for(;t--;l[r++]=0);for(t=U-1;u<n;){if(l[--n]<f[n]){for(r=n;r&&!l[--r];l[r]=t);--l[r],l[n]+=U}l[n]-=f[n]}for(;0==l[0];l.splice(0,1),--s);return l[0]?D(e,l,s):(e.s=3==w?-1:1,e.c=[e.e=0],e)},n.modulo=n.mod=function(e,t){var r,n,i=this;return e=new A(e,t),!i.c||!e.s||e.c&&!e.c[0]?new A(NaN):!e.c||i.c&&!i.c[0]?new A(i):(9==a?(n=e.s,e.s=1,r=y(i,e,0,3),e.s=n,r.s*=n):r=y(i,e,0,a),(e=i.minus(r.times(e))).c[0]||1!=a||(e.s=i.s),e)},n.multipliedBy=n.times=function(e,t){var r,n,i,a,o,u,c,s,l,f,p,g,h,d,v,m=this,y=m.c,b=(e=new A(e,t)).c;if(!(y&&b&&y[0]&&b[0]))return!m.s||!e.s||y&&!y[0]&&!b||b&&!b[0]&&!y?e.c=e.e=e.s=null:(e.s*=m.s,y&&b?(e.c=[0],e.e=0):e.c=e.e=null),e;for(n=G(m.e/j)+G(e.e/j),e.s*=m.s,(c=y.length)<(f=b.length)&&(h=y,y=b,b=h,i=c,c=f,f=i),i=c+f,h=[];i--;h.push(0));for(d=U,v=I,i=f;0<=--i;){for(r=0,p=b[i]%v,g=b[i]/v|0,a=i+(o=c);i<a;)r=((s=p*(s=y[--o]%v)+(u=g*s+(l=y[o]/v|0)*p)%v*v+h[a]+r)/d|0)+(u/v|0)+g*l,h[a--]=s%d;h[a]=r}return r?++n:h.splice(0,1),D(e,h,n)},n.negated=function(){var e=new A(this);return e.s=-e.s||null,e},n.plus=function(e,t){var r,n=this,i=n.s;if(t=(e=new A(e,t)).s,!i||!t)return new A(NaN);if(i!=t)return e.s=-t,n.minus(e);var a=n.e/j,o=e.e/j,u=n.c,c=e.c;if(!a||!o){if(!u||!c)return new A(i/0);if(!u[0]||!c[0])return c[0]?e:new A(u[0]?n:0*i)}if(a=G(a),o=G(o),u=u.slice(),i=a-o){for((r=0<i?(o=a,c):(i=-i,u)).reverse();i--;r.push(0));r.reverse()}for((i=u.length)-(t=c.length)<0&&(r=c,c=u,u=r,t=i),i=0;t;)i=(u[--t]=u[t]+c[t]+i)/U|0,u[t]=U===u[t]?0:u[t]%U;return i&&(u=[i].concat(u),++o),D(e,u,o)},n.precision=n.sd=function(e,t){var r,n,i;if(null!=e&&e!==!!e)return Z(e,1,$),null==t?t=w:Z(t,0,8),E(new A(this),e,t);if(!(r=this.c))return null;if(n=(i=r.length-1)*j+1,i=r[i]){for(;i%10==0;i/=10,n--);for(i=r[0];10<=i;i/=10,n++);}return e&&this.e+1>n&&(n=this.e+1),n},n.shiftedBy=function(e){return Z(e,-C,C),this.times("1e"+e)},n.squareRoot=n.sqrt=function(){var e,t,r,n,i,a=this,o=a.c,u=a.s,c=a.e,s=b+4,l=new A("0.5");if(1!==u||!o||!o[0])return new A(!u||u<0&&(!o||o[0])?NaN:o?a:1/0);if((r=0==(u=Math.sqrt(+F(a)))||u==1/0?(((t=V(o)).length+c)%2==0&&(t+="0"),u=Math.sqrt(+t),c=G((c+1)/2)-(c<0||c%2),new A(t=u==1/0?"1e"+c:(t=u.toExponential()).slice(0,t.indexOf("e")+1)+c)):new A(u+"")).c[0])for((u=(c=r.e)+s)<3&&(u=0);;)if(i=r,r=l.times(i.plus(y(a,i,s,1))),V(i.c).slice(0,u)===(t=V(r.c)).slice(0,u)){if(r.e<c&&--u,"9999"!=(t=t.slice(u-3,u+1))&&(n||"4999"!=t)){+t&&(+t.slice(1)||"5"!=t.charAt(0))||(E(r,r.e+b+2,1),e=!r.times(r).eq(a));break}if(!n&&(E(i,i.e+b+2,0),i.times(i).eq(a))){r=i;break}s+=4,u+=4,n=1}return E(r,r.e+b+1,w,e)},n.toExponential=function(e,t){return null!=e&&(Z(e,0,$),e++),i(this,e,t,1)},n.toFixed=function(e,t){return null!=e&&(Z(e,0,$),e=e+this.e+1),i(this,e,t)},n.toFormat=function(e,t,r){var n;if(null==r)null!=e&&t&&"object"==typeof t?(r=t,t=null):e&&"object"==typeof e?(r=e,e=t=null):r=N;else if("object"!=typeof r)throw Error(T+"Argument not an object: "+r);if(n=this.toFixed(e,t),this.c){var i,a=n.split("."),o=+r.groupSize,u=+r.secondaryGroupSize,c=r.groupSeparator||"",s=a[0],l=a[1],f=this.s<0,p=f?s.slice(1):s,g=p.length;if(u&&(i=o,o=u,g-=u=i),0<o&&0<g){for(i=g%o||o,s=p.substr(0,i);i<g;i+=o)s+=c+p.substr(i,o);0<u&&(s+=c+p.slice(i)),f&&(s="-"+s)}n=l?s+(r.decimalSeparator||"")+((u=+r.fractionGroupSize)?l.replace(new RegExp("\\d{"+u+"}\\B","g"),"$&"+(r.fractionGroupSeparator||"")):l):s}return(r.prefix||"")+n+(r.suffix||"")},n.toFraction=function(e){var t,r,n,i,a,o,u,c,s,l,f,p,g=this,h=g.c;if(null!=e&&(!(u=new A(e)).isInteger()&&(u.c||1!==u.s)||u.lt(d)))throw Error(T+"Argument "+(u.isInteger()?"out of range: ":"not an integer: ")+F(u));if(!h)return new A(g);for(t=new A(d),s=r=new A(d),n=c=new A(d),p=V(h),a=t.e=p.length-g.e-1,t.c[0]=R[(o=a%j)<0?j+o:o],e=!e||0<u.comparedTo(t)?0<a?t:s:u,o=O,O=1/0,u=new A(p),c.c[0]=0;l=y(u,t,0,1),1!=(i=r.plus(l.times(n))).comparedTo(e);)r=n,n=i,s=c.plus(l.times(i=s)),c=i,t=u.minus(l.times(i=t)),u=i;return i=y(e.minus(r),n,0,1),c=c.plus(i.times(s)),r=r.plus(i.times(n)),c.s=s.s=g.s,f=y(s,n,a*=2,w).minus(g).abs().comparedTo(y(c,r,a,w).minus(g).abs())<1?[s,n]:[c,r],O=o,f},n.toNumber=function(){return+F(this)},n.toPrecision=function(e,t){return null!=e&&Z(e,1,$),i(this,e,t,2)},n.toString=function(e){var t,r=this,n=r.s,i=r.e;return null===i?n?(t="Infinity",n<0&&(t="-"+t)):t="NaN":(t=null==e?i<=h||v<=i?W(V(r.c),i):H(V(r.c),i,"0"):10===e?H(V((r=E(new A(r),b+i+1,w)).c),r.e,"0"):(Z(e,2,M.length,"Base"),f(H(V(r.c),i,"0"),10,e,n,!0)),n<0&&r.c[0]&&(t="-"+t)),t},n.valueOf=n.toJSON=function(){return F(this)},n._isBigNumber=!0,"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator&&(n[Symbol.toStringTag]="BigNumber",n[Symbol.for("nodejs.util.inspect.custom")]=n.valueOf),null!=t&&A.set(t),A}()).default=t.BigNumber=t,void 0!==r&&r.exports?r.exports=t:(e||(e="undefined"!=typeof self&&self?self:window),e.BigNumber=t)}(this)},{}],2:[function(e,t,r){"use strict";t.exports={languageTag:"en-US",delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},spaceSeparated:!1,ordinal:function(e){var t=e%10;return 1==~~(e%100/10)?"th":1===t?"st":2===t?"nd":3===t?"rd":"th"},currency:{symbol:"$",position:"prefix",code:"USD"},currencyFormat:{thousandSeparated:!0,totalLength:4,spaceSeparated:!0},formats:{fourDigits:{totalLength:4,spaceSeparated:!0},fullWithTwoDecimals:{output:"currency",thousandSeparated:!0,mantissa:2},fullWithTwoDecimalsNoCurrency:{thousandSeparated:!0,mantissa:2},fullWithNoDecimals:{output:"currency",thousandSeparated:!0,mantissa:0}}}},{}],3:[function(e,t,r){"use strict";function C(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,i=!1,a=void 0;try{for(var o,u=e[Symbol.iterator]();!(n=(o=u.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(e){i=!0,a=e}finally{try{n||null==u.return||u.return()}finally{if(i)throw a}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var R=e("./globalState"),o=e("./validating"),u=e("./parsing"),n=["B","KB","MB","GB","TB","PB","EB","ZB","YB"],M={general:{scale:1024,suffixes:n,marker:"bd"},binary:{scale:1024,suffixes:["B","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],marker:"b"},decimal:{scale:1e3,suffixes:n,marker:"d"}},I={totalLength:0,characteristic:0,forceAverage:!1,average:!1,mantissa:-1,optionalMantissa:!0,thousandSeparated:!1,spaceSeparated:!1,negative:"sign",forceSign:!1};function i(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},r=2<arguments.length?arguments[2]:void 0;if("string"==typeof t&&(t=u.parseFormat(t)),!o.validateFormat(t))return"ERROR: invalid format";var n=t.prefix||"",i=t.postfix||"",a=function(e,t,r){switch(t.output){case"currency":return t=A(t,R.currentCurrencyDefaultFormat()),function(e,t,r){var n=r.currentCurrency(),i=Object.assign({},I,t),a=void 0,o="",u=!!i.totalLength||!!i.forceAverage||i.average,c=t.currencyPosition||n.position,s=t.currencySymbol||n.symbol;i.spaceSeparated&&(o=" ");"infix"===c&&(a=o+s+o);var l=D({instance:e,providedFormat:t,state:r,decimalSeparator:a});"prefix"===c&&(l=e._value<0&&"sign"===i.negative?"-".concat(o).concat(s).concat(l.slice(1)):s+o+l);c&&"postfix"!==c||(l=l+(o=u?"":o)+s);return l}(e,t,R);case"percent":return t=A(t,R.currentPercentageDefaultFormat()),function(e,t,r,n){var i=t.prefixSymbol,a=D({instance:n(100*e._value),providedFormat:t,state:r}),o=Object.assign({},I,t);if(i)return"%".concat(o.spaceSeparated?" ":"").concat(a);return"".concat(a).concat(o.spaceSeparated?" ":"","%")}(e,t,R,r);case"byte":return t=A(t,R.currentByteDefaultFormat()),h=e,v=R,m=r,y=(d=t).base||"binary",b=M[y],w=B(h._value,b.suffixes,b.scale),O=w.value,x=w.suffix,S=D({instance:m(O),providedFormat:d,state:v,defaults:v.currentByteDefaultFormat()}),N=v.currentAbbreviations(),"".concat(S).concat(N.spaced?" ":"").concat(x);case"time":return t=A(t,R.currentTimeDefaultFormat()),l=e,f=Math.floor(l._value/60/60),p=Math.floor((l._value-60*f*60)/60),g=Math.round(l._value-60*f*60-60*p),"".concat(f,":").concat(p<10?"0":"").concat(p,":").concat(g<10?"0":"").concat(g);case"ordinal":return t=A(t,R.currentOrdinalDefaultFormat()),n=e,i=t,o=(a=R).currentOrdinal(),u=Object.assign({},I,i),c=D({instance:n,providedFormat:i,state:a}),s=o(n._value),"".concat(c).concat(u.spaceSeparated?" ":"").concat(s);case"number":default:return D({instance:e,providedFormat:t,numbro:r})}var n,i,a,o,u,c,s;var l,f,p,g;var h,d,v,m,y,b,w,O,x,S,N}(e,t,r);return a=(a=n+a)+i}function B(e,t,r){var n=t[0],i=Math.abs(e);if(r<=i){for(var a=1;a<t.length;++a){var o=Math.pow(r,a),u=Math.pow(r,a+1);if(o<=i&&i<u){n=t[a],e/=o;break}}n===t[0]&&(e/=Math.pow(r,t.length-1),n=t[t.length-1])}return{value:e,suffix:n}}function p(e){for(var t="",r=0;r<e;r++)t+="0";return t}function $(e,t){return-1!==e.toString().indexOf("e")?function(e,t){var r=e.toString(),n=C(r.split("e"),2),i=n[0],a=n[1],o=C(i.split("."),2),u=o[0],c=o[1],s=void 0===c?"":c;if(0<+a)r=u+s+p(a-s.length);else{var l=".";l=+u<0?"-0".concat(l):"0".concat(l);var f=(p(-a-1)+Math.abs(u)+s).substr(0,t);f.length<t&&(f+=p(t-f.length)),r=l+f}return 0<+a&&0<t&&(r+=".".concat(p(t))),r}(e,t):(Math.round(+"".concat(e,"e+").concat(t))/Math.pow(10,t)).toFixed(t)}function D(e){var t=e.instance,r=e.providedFormat,n=e.state,i=void 0===n?R:n,a=e.decimalSeparator,o=e.defaults,u=void 0===o?i.currentDefaults():o,c=t._value;if(0===c&&i.hasZeroFormat())return i.getZeroFormat();if(!isFinite(c))return c.toString();var s,l,f,p,g,h,d,v,m=Object.assign({},I,u,r),y=m.totalLength,b=y?0:m.characteristic,w=m.optionalCharacteristic,O=m.forceAverage,x=!!y||!!O||m.average,S=y?-1:x&&void 0===r.mantissa?0:m.mantissa,N=!y&&(void 0===r.optionalMantissa?-1===S:m.optionalMantissa),M=m.trimMantissa,B=m.thousandSeparated,D=m.spaceSeparated,A=m.negative,E=m.forceSign,F=m.exponential,k="";if(x){var _=function(e){var t=e.value,r=e.forceAverage,n=e.abbreviations,i=e.spaceSeparated,a=void 0!==i&&i,o=e.totalLength,u=void 0===o?0:o,c="",s=Math.abs(t),l=-1;if(s>=Math.pow(10,12)&&!r||"trillion"===r?(c=n.trillion,t/=Math.pow(10,12)):s<Math.pow(10,12)&&s>=Math.pow(10,9)&&!r||"billion"===r?(c=n.billion,t/=Math.pow(10,9)):s<Math.pow(10,9)&&s>=Math.pow(10,6)&&!r||"million"===r?(c=n.million,t/=Math.pow(10,6)):(s<Math.pow(10,6)&&s>=Math.pow(10,3)&&!r||"thousand"===r)&&(c=n.thousand,t/=Math.pow(10,3)),c&&(c=(a?" ":"")+c),u){var f=t.toString().split(".")[0];l=Math.max(u-f.length,0)}return{value:t,abbreviation:c,mantissaPrecision:l}}({value:c,forceAverage:O,abbreviations:i.currentAbbreviations(),spaceSeparated:D,totalLength:y});c=_.value,k+=_.abbreviation,y&&(S=_.mantissaPrecision)}if(F){var L=(l=(s={value:c,characteristicPrecision:b}).value,f=s.characteristicPrecision,p=void 0===f?0:f,g=C(l.toExponential().split("e"),2),h=g[0],d=g[1],v=+h,p&&1<p&&(v*=Math.pow(10,p-1),d=0<=(d=+d-(p-1))?"+".concat(d):d),{value:v,abbreviation:"e".concat(d)});c=L.value,k=L.abbreviation+k}var T,P,U,j=function(e,t,r,n,i){if(-1===n)return e;var a=$(t,n),o=C(a.toString().split("."),2),u=o[0],c=o[1],s=void 0===c?"":c;if(s.match(/^0+$/)&&(r||i))return u;var l=s.match(/0+$/);return i&&l?"".concat(u,".").concat(s.toString().slice(0,l.index)):a.toString()}(c.toString(),c,N,S,M);return j=function(e,t,r,n,i){var a=n.currentDelimiters(),o=a.thousands;i=i||a.decimal;var u=a.thousandsSize||3,c=e.toString(),s=c.split(".")[0],l=c.split(".")[1];return r&&(t<0&&(s=s.slice(1)),function(e,t){for(var r=[],n=0,i=e;0<i;i--)n===t&&(r.unshift(i),n=0),n++;return r}(s.length,u).forEach(function(e,t){s=s.slice(0,e+t)+o+s.slice(e+t)}),t<0&&(s="-".concat(s))),c=l?s+i+l:s}(j=function(e,t,r,n){var i=e,a=C(i.toString().split("."),2),o=a[0],u=a[1];if(o.match(/^-?0$/)&&r)return u?"".concat(o.replace("0",""),".").concat(u):o.replace("0","");if(o.length<n)for(var c=n-o.length,s=0;s<c;s++)i="0".concat(i);return i.toString()}(j,0,w,b),c,B,i,a),(x||F)&&(j=j+k),(E||c<0)&&(T=j,U=A,j=0===(P=c)?T:0==+T?T.replace("-",""):0<P?"+".concat(T):"sign"===U?T:"(".concat(T.replace("-",""),")")),j}function A(e,t){if(!e)return t;var r=Object.keys(e);return 1===r.length&&"output"===r[0]?t:e}t.exports=function(n){return{format:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return i.apply(void 0,t.concat([n]))},getByteUnit:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){var t=M.general;return B(e._value,t.suffixes,t.scale).suffix}.apply(void 0,t.concat([n]))},getBinaryByteUnit:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){var t=M.binary;return B(e._value,t.suffixes,t.scale).suffix}.apply(void 0,t.concat([n]))},getDecimalByteUnit:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){var t=M.decimal;return B(e._value,t.suffixes,t.scale).suffix}.apply(void 0,t.concat([n]))},formatOrDefault:A}}},{"./globalState":4,"./parsing":8,"./validating":10}],4:[function(e,t,r){"use strict";var i=e("./en-US"),n=e("./validating"),a=e("./parsing"),o={},u=void 0,c={},s=null,l={};function f(e){u=e}function p(){return c[u]}o.languages=function(){return Object.assign({},c)},o.currentLanguage=function(){return u},o.currentCurrency=function(){return p().currency},o.currentAbbreviations=function(){return p().abbreviations},o.currentDelimiters=function(){return p().delimiters},o.currentOrdinal=function(){return p().ordinal},o.currentDefaults=function(){return Object.assign({},p().defaults,l)},o.currentOrdinalDefaultFormat=function(){return Object.assign({},o.currentDefaults(),p().ordinalFormat)},o.currentByteDefaultFormat=function(){return Object.assign({},o.currentDefaults(),p().byteFormat)},o.currentPercentageDefaultFormat=function(){return Object.assign({},o.currentDefaults(),p().percentageFormat)},o.currentCurrencyDefaultFormat=function(){return Object.assign({},o.currentDefaults(),p().currencyFormat)},o.currentTimeDefaultFormat=function(){return Object.assign({},o.currentDefaults(),p().timeFormat)},o.setDefaults=function(e){e=a.parseFormat(e),n.validateFormat(e)&&(l=e)},o.getZeroFormat=function(){return s},o.setZeroFormat=function(e){return s="string"==typeof e?e:null},o.hasZeroFormat=function(){return null!==s},o.languageData=function(e){if(e){if(c[e])return c[e];throw new Error('Unknown tag "'.concat(e,'"'))}return p()},o.registerLanguage=function(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1];if(!n.validateLanguage(e))throw new Error("Invalid language data");c[e.languageTag]=e,t&&f(e.languageTag)},o.setLanguage=function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:i.languageTag;if(!c[e]){var r=e.split("-")[0],n=Object.keys(c).find(function(e){return e.split("-")[0]===r});return c[n]?void f(n):void f(t)}f(e)},o.registerLanguage(i),u=i.languageTag,t.exports=o},{"./en-US":2,"./parsing":8,"./validating":10}],5:[function(n,e,t){"use strict";e.exports=function(t){return{loadLanguagesInNode:function(e){return r=t,void e.forEach(function(t){var e=void 0;try{e=n("../languages/".concat(t))}catch(e){console.error('Unable to load "'.concat(t,'". No matching language file found.'))}e&&r.registerLanguage(e)});var r}}}},{}],6:[function(e,t,r){"use strict";var c=e("bignumber.js");function a(e,t,r){var n=new c(e._value),i=t;return r.isNumbro(t)&&(i=t._value),i=new c(i),e._value=n.minus(i).toNumber(),e}t.exports=function(u){return{add:function(e,t){return n=t,i=u,a=new c((r=e)._value),o=n,i.isNumbro(n)&&(o=n._value),o=new c(o),r._value=a.plus(o).toNumber(),r;var r,n,i,a,o},subtract:function(e,t){return a(e,t,u)},multiply:function(e,t){return n=t,i=u,a=new c((r=e)._value),o=n,i.isNumbro(n)&&(o=n._value),o=new c(o),r._value=a.times(o).toNumber(),r;var r,n,i,a,o},divide:function(e,t){return n=t,i=u,a=new c((r=e)._value),o=n,i.isNumbro(n)&&(o=n._value),o=new c(o),r._value=a.dividedBy(o).toNumber(),r;var r,n,i,a,o},set:function(e,t){return r=e,i=n=t,u.isNumbro(n)&&(i=n._value),r._value=i,r;var r,n,i},difference:function(e,t){return r=t,a(i=(n=u)(e._value),r,n),Math.abs(i._value);var r,n,i}}}},{"bignumber.js":1}],7:[function(e,t,r){"use strict";function i(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var a=e("./globalState"),n=e("./validating"),o=e("./loading")(g),u=e("./unformatting"),c=e("./formatting")(g),s=e("./manipulating")(g),l=e("./parsing"),f=function(){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._value=e}var e,r,n;return e=t,(r=[{key:"clone",value:function(){return g(this._value)}},{key:"format",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return c.format(this,e)}},{key:"formatCurrency",value:function(e){return"string"==typeof e&&(e=l.parseFormat(e)),(e=c.formatOrDefault(e,a.currentCurrencyDefaultFormat())).output="currency",c.format(this,e)}},{key:"formatTime",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return e.output="time",c.format(this,e)}},{key:"binaryByteUnits",value:function(){return c.getBinaryByteUnit(this)}},{key:"decimalByteUnits",value:function(){return c.getDecimalByteUnit(this)}},{key:"byteUnits",value:function(){return c.getByteUnit(this)}},{key:"difference",value:function(e){return s.difference(this,e)}},{key:"add",value:function(e){return s.add(this,e)}},{key:"subtract",value:function(e){return s.subtract(this,e)}},{key:"multiply",value:function(e){return s.multiply(this,e)}},{key:"divide",value:function(e){return s.divide(this,e)}},{key:"set",value:function(e){return s.set(this,p(e))}},{key:"value",value:function(){return this._value}},{key:"valueOf",value:function(){return this._value}}])&&i(e.prototype,r),n&&i(e,n),t}();function p(e){var t=e;return g.isNumbro(e)?t=e._value:"string"==typeof e?t=g.unformat(e):isNaN(e)&&(t=NaN),t}function g(e){return new f(p(e))}g.version="2.1.2",g.isNumbro=function(e){return e instanceof f},g.language=a.currentLanguage,g.registerLanguage=a.registerLanguage,g.setLanguage=a.setLanguage,g.languages=a.languages,g.languageData=a.languageData,g.zeroFormat=a.setZeroFormat,g.defaultFormat=a.currentDefaults,g.setDefaults=a.setDefaults,g.defaultCurrencyFormat=a.currentCurrencyDefaultFormat,g.validate=n.validate,g.loadLanguagesInNode=o.loadLanguagesInNode,g.unformat=u.unformat,t.exports=g},{"./formatting":3,"./globalState":4,"./loading":5,"./manipulating":6,"./parsing":8,"./unformatting":9,"./validating":10}],8:[function(e,t,r){"use strict";t.exports={parseFormat:function(e){var t,r,n,i,a,o,u,c,s,l,f,p,g,h,d,v,m,y,b,w,O=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};return"string"!=typeof e?e:(r=O,e=(n=(t=e).match(/^{([^}]*)}/))?(r.prefix=n[1],t.slice(n[0].length)):t,a=O,function(e,t){if(-1===e.indexOf("$")){if(-1===e.indexOf("%"))return-1!==e.indexOf("bd")?(t.output="byte",t.base="general"):-1!==e.indexOf("b")?(t.output="byte",t.base="binary"):-1!==e.indexOf("d")?(t.output="byte",t.base="decimal"):-1===e.indexOf(":")?-1!==e.indexOf("o")&&(t.output="ordinal"):t.output="time";t.output="percent"}else t.output="currency"}(e=(o=(i=e).match(/{([^}]*)}$/))?(a.postfix=o[1],i.slice(0,-o[0].length)):i,O),u=O,(c=e.match(/[1-9]+[0-9]*/))&&(u.totalLength=+c[0]),s=O,(l=e.split(".")[0].match(/0+/))&&(s.characteristic=l[0].length),function(e,t){if(-1!==e.indexOf(".")){var r=e.split(".")[0];t.optionalCharacteristic=-1===r.indexOf("0")}}(e,O),f=O,-1!==e.indexOf("a")&&(f.average=!0),g=O,-1!==(p=e).indexOf("K")?g.forceAverage="thousand":-1!==p.indexOf("M")?g.forceAverage="million":-1!==p.indexOf("B")?g.forceAverage="billion":-1!==p.indexOf("T")&&(g.forceAverage="trillion"),function(e,t){var r=e.split(".")[1];if(r){var n=r.match(/0+/);n&&(t.mantissa=n[0].length)}}(e,O),d=O,(h=e).match(/\[\.]/)?d.optionalMantissa=!0:h.match(/\./)&&(d.optionalMantissa=!1),v=O,-1!==e.indexOf(",")&&(v.thousandSeparated=!0),m=O,-1!==e.indexOf(" ")&&(m.spaceSeparated=!0),b=O,(y=e).match(/^\+?\([^)]*\)$/)&&(b.negative="parenthesis"),y.match(/^\+?-/)&&(b.negative="sign"),w=O,e.match(/^\+/)&&(w.forceSign=!0),O)}}},{}],9:[function(p,e,t){"use strict";var O=[{key:"ZiB",factor:Math.pow(1024,7)},{key:"ZB",factor:Math.pow(1e3,7)},{key:"YiB",factor:Math.pow(1024,8)},{key:"YB",factor:Math.pow(1e3,8)},{key:"TiB",factor:Math.pow(1024,4)},{key:"TB",factor:Math.pow(1e3,4)},{key:"PiB",factor:Math.pow(1024,5)},{key:"PB",factor:Math.pow(1e3,5)},{key:"MiB",factor:Math.pow(1024,2)},{key:"MB",factor:Math.pow(1e3,2)},{key:"KiB",factor:Math.pow(1024,1)},{key:"KB",factor:Math.pow(1e3,1)},{key:"GiB",factor:Math.pow(1024,3)},{key:"GB",factor:Math.pow(1e3,3)},{key:"EiB",factor:Math.pow(1024,6)},{key:"EB",factor:Math.pow(1e3,6)},{key:"B",factor:1}];function x(e){return e.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&")}function g(e,t){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"",n=3<arguments.length?arguments[3]:void 0,i=4<arguments.length?arguments[4]:void 0,a=5<arguments.length?arguments[5]:void 0,o=6<arguments.length?arguments[6]:void 0;if(""!==e)return e===i?0:function e(t,r){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"",i=3<arguments.length?arguments[3]:void 0,a=4<arguments.length?arguments[4]:void 0,o=5<arguments.length?arguments[5]:void 0,u=6<arguments.length?arguments[6]:void 0;if(!isNaN(+t))return+t;var c="",s=t.replace(/(^[^(]*)\((.*)\)([^)]*$)/,"$1$2$3");if(s!==t)return-1*e(s,r,n,i,a,o,u);for(var l=0;l<O.length;l++){var f=O[l];if((c=t.replace(f.key,""))!==t)return e(c,r,n,i,a,o,u)*f.factor}if((c=t.replace("%",""))!==t)return e(c,r,n,i,a,o,u)/100;var p=parseFloat(t);if(!isNaN(p)){var g=i(p);if(g&&"."!==g&&(c=t.replace(new RegExp("".concat(x(g),"$")),""))!==t)return e(c,r,n,i,a,o,u);var h={};Object.keys(o).forEach(function(e){h[o[e]]=e});for(var d=Object.keys(h).sort().reverse(),v=d.length,m=0;m<v;m++){var y=d[m],b=h[y];if((c=t.replace(y,""))!==t){var w=void 0;switch(b){case"thousand":w=Math.pow(10,3);break;case"million":w=Math.pow(10,6);break;case"billion":w=Math.pow(10,9);break;case"trillion":w=Math.pow(10,12)}return e(c,r,n,i,a,o,u)*w}}}}(function(e,t){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"",n=e.replace(r,"");return n=(n=n.replace(new RegExp("([0-9])".concat(x(t.thousands),"([0-9])"),"g"),"$1$2")).replace(t.decimal,".")}(e,t,r),t,r,n,i,a,o)}e.exports={unformat:function(e,t){var r,n,i,a=p("./globalState"),o=a.currentDelimiters(),u=a.currentCurrency().symbol,c=a.currentOrdinal(),s=a.getZeroFormat(),l=a.currentAbbreviations(),f=void 0;if("string"==typeof e)f=function(e,t){if(!e.indexOf(":")||":"===t.thousands)return!1;var r=e.split(":");if(3!==r.length)return!1;var n=+r[0],i=+r[1],a=+r[2];return!isNaN(n)&&!isNaN(i)&&!isNaN(a)}(e,o)?(r=e.split(":"),n=+r[0],i=+r[1],+r[2]+60*i+3600*n):g(e,o,u,c,s,l,t);else{if("number"!=typeof e)return;f=e}if(void 0!==f)return f}}},{"./globalState":4}],10:[function(e,t,r){"use strict";function n(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var i=e("./unformatting"),a=/^[a-z]{2,3}(-[a-zA-Z]{4})?(-([A-Z]{2}|[0-9]{3}))?$/,p={output:{type:"string",validValues:["currency","percent","byte","time","ordinal","number"]},base:{type:"string",validValues:["decimal","binary","general"],restriction:function(e,t){return"byte"===t.output},message:"`base` must be provided only when the output is `byte`",mandatory:function(e){return"byte"===e.output}},characteristic:{type:"number",restriction:function(e){return 0<=e},message:"value must be positive"},prefix:"string",postfix:"string",forceAverage:{type:"string",validValues:["trillion","billion","million","thousand"]},average:"boolean",currencyPosition:{type:"string",validValues:["prefix","infix","postfix"]},currencySymbol:"string",totalLength:{type:"number",restrictions:[{restriction:function(e){return 0<=e},message:"value must be positive"},{restriction:function(e,t){return!t.exponential},message:"`totalLength` is incompatible with `exponential`"}]},mantissa:{type:"number",restriction:function(e){return 0<=e},message:"value must be positive"},optionalMantissa:"boolean",trimMantissa:"boolean",optionalCharacteristic:"boolean",thousandSeparated:"boolean",spaceSeparated:"boolean",abbreviations:{type:"object",children:{thousand:"string",million:"string",billion:"string",trillion:"string"}},negative:{type:"string",validValues:["sign","parenthesis"]},forceSign:"boolean",exponential:{type:"boolean"},prefixSymbol:{type:"boolean",restriction:function(e,t){return"percent"===t.output},message:"`prefixSymbol` can be provided only when the output is `percent`"}},o={languageTag:{type:"string",mandatory:!0,restriction:function(e){return e.match(a)},message:"the language tag must follow the BCP 47 specification (see https://tools.ieft.org/html/bcp47)"},delimiters:{type:"object",children:{thousands:"string",decimal:"string",thousandsSize:"number"},mandatory:!0},abbreviations:{type:"object",children:{thousand:{type:"string",mandatory:!0},million:{type:"string",mandatory:!0},billion:{type:"string",mandatory:!0},trillion:{type:"string",mandatory:!0}},mandatory:!0},spaceSeparated:"boolean",ordinal:{type:"function",mandatory:!0},currency:{type:"object",children:{symbol:"string",position:"string",code:"string"},mandatory:!0},defaults:"format",ordinalFormat:"format",byteFormat:"format",percentageFormat:"format",currencyFormat:"format",timeDefaults:"format",formats:{type:"object",children:{fourDigits:{type:"format",mandatory:!0},fullWithTwoDecimals:{type:"format",mandatory:!0},fullWithTwoDecimalsNoCurrency:{type:"format",mandatory:!0},fullWithNoDecimals:{type:"format",mandatory:!0}}}};function u(e){return!!i.unformat(e)}function g(c,s,l){var e=3<arguments.length&&void 0!==arguments[3]&&arguments[3],t=Object.keys(c).map(function(e){if(!s[e])return console.error("".concat(l," Invalid key: ").concat(e)),!1;var t=c[e],r=s[e];if("string"==typeof r&&(r={type:r}),"format"===r.type){if(!g(t,p,"[Validate ".concat(e,"]"),!0))return!1}else if(f(t)!==r.type)return console.error("".concat(l," ").concat(e,' type mismatched: "').concat(r.type,'" expected, "').concat(f(t),'" provided')),!1;if(r.restrictions&&r.restrictions.length)for(var n=r.restrictions.length,i=0;i<n;i++){var a=r.restrictions[i],o=a.restriction,u=a.message;if(!o(t,c))return console.error("".concat(l," ").concat(e," invalid value: ").concat(u)),!1}if(r.restriction&&!r.restriction(t,c))return console.error("".concat(l," ").concat(e," invalid value: ").concat(r.message)),!1;if(r.validValues&&-1===r.validValues.indexOf(t))return console.error("".concat(l," ").concat(e," invalid value: must be among ").concat(JSON.stringify(r.validValues),', "').concat(t,'" provided')),!1;if(r.children&&!g(t,r.children,"[Validate ".concat(e,"]")))return!1;return!0});return e||t.push.apply(t,n(Object.keys(s).map(function(e){var t=s[e];if("string"==typeof t&&(t={type:t}),t.mandatory){var r=t.mandatory;if("function"==typeof r&&(r=r(c)),r&&void 0===c[e])return console.error("".concat(l,' Missing mandatory key "').concat(e,'"')),!1}return!0}))),t.reduce(function(e,t){return e&&t},!0)}function c(e){return g(e,p,"[Validate format]")}t.exports={validate:function(e,t){var r=u(e),n=c(t);return r&&n},validateFormat:c,validateInput:u,validateLanguage:function(e){return g(e,o,"[Validate language]")}}},{"./unformatting":9}]},{},[7])(7)});


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],43:[function(require,module,exports){
/*!
 * numbro.js language configuration
 * language : Portuguese
 * locale : Brazil
 * author : Ramiro letandas Jr : https://github.com/ramirovjr
 */

module.exports = {
    languageTag: "pt-BR",
    delimiters: {
        thousands: ".",
        decimal: ","
    },
    abbreviations: {
        thousand: "mil",
        million: "milhões",
        billion: "b",
        trillion: "t"
    },
    ordinal: function() {
        return "º";
    },
    currency: {
        symbol: "R$",
        position: "prefix",
        code: "BRL"
    },
    currencyFormat: {
        thousandSeparated: true,
        totalLength: 4,
        spaceSeparated: true,
        average: true
    },
    formats: {
        fourDigits: {
            totalLength: 4,
            spaceSeparated: true,
            average: true
        },
        fullWithTwoDecimals: {
            output: "currency",
            mantissa: 2,
            spaceSeparated: true,
            thousandSeparated: true
        },
        fullWithTwoDecimalsNoCurrency: {
            mantissa: 2,
            thousandSeparated: true
        },
        fullWithNoDecimals: {
            output: "currency",
            spaceSeparated: true,
            thousandSeparated: true,
            mantissa: 0
        }
    }
};

},{}],44:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],45:[function(require,module,exports){
(function (setImmediate,clearImmediate){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":44,"timers":45}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addTableDestak;

function addTableDestak(cityId) {
  var ptCrossedTable = document.querySelector('.js-pt-crossed-table');
  var matCrossedTable = document.querySelector('.js-mat-crossed-table');
  var data = window.chartData.data; // get table rows

  var ptRows = ptCrossedTable.querySelectorAll('tr');
  var matRows = matCrossedTable.querySelectorAll('tr');

  function clearDestaks() {
    ptRows.forEach(function (row) {
      row.classList.remove('destak');
    });
    matRows.forEach(function (row) {
      row.classList.remove('destak');
    });
  }

  if (!cityId) {
    clearDestaks();
    return;
  }

  function getCityInfo() {
    return data.filter(function (item) {
      return item.city.id === cityId;
    });
  }

  var cityInfo = getCityInfo(cityId);
  var ptInfo = cityInfo.find(function (item) {
    return item.subject === 'Português';
  });
  var matInfo = cityInfo.find(function (item) {
    return item.subject === 'Matemática';
  });
  ptRows.forEach(function (row) {
    if (row.classList.contains("js-".concat(ptInfo.range_quality.toLowerCase()))) {
      row.classList.add('destak');
    } else {
      row.classList.remove('destak');
    }
  });
  matRows.forEach(function (row) {
    if (row.classList.contains("js-".concat(matInfo.range_quality.toLowerCase()))) {
      row.classList.add('destak');
    } else {
      row.classList.remove('destak');
    }
  });
}

},{}],47:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = downloadCharts;

var _highcharts = _interopRequireDefault(require("highcharts"));

var _exporting = _interopRequireDefault(require("highcharts/modules/exporting"));

(0, _exporting.default)(_highcharts.default);

function downloadCharts() {
  var ptChartDownloadButton = document.querySelector('.js-download-pt-chart');
  var matChartDownloadButton = document.querySelector('.js-download-mat-chart');

  if (ptChartDownloadButton) {
    ptChartDownloadButton.addEventListener('click', function () {
      var chartDom = document.getElementById('pt-chart');

      var ptChart = _highcharts.default.charts[_highcharts.default.attr(chartDom, 'data-highcharts-chart')];

      ptChart.exportChart({
        type: 'application/pdf',
        filename: 'Português'
      });
    });
  }

  if (matChartDownloadButton) {
    matChartDownloadButton.addEventListener('click', function () {
      var chartDom = document.getElementById('mat-chart');

      var matChart = _highcharts.default.charts[_highcharts.default.attr(chartDom, 'data-highcharts-chart')];

      matChart.exportChart({
        type: 'application/pdf',
        filename: 'Matemática'
      });
    });
  }
}

},{"@babel/runtime/helpers/interopRequireDefault":3,"highcharts":39,"highcharts/modules/exporting":40}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clearFilters;

function clearFilters(exception) {// const formContainer = document.querySelector('.js-form-filter');
  // formContainer.querySelectorAll('select').forEach((select) => {
  //   if (select.id !== exception) {
  //     const selectEl = select;
  //     selectEl.selectedIndex = 0;
  //   }
  // });
  // formContainer.querySelectorAll('input[type="text"]').forEach((input) => {
  //   if (input.id !== exception) {
  //     const inputEl = input;
  //     inputEl.value = '';
  //   }
  // });
}

},{}],49:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hideNoMatchesAlert = hideNoMatchesAlert;
exports.highlightPoint = highlightPoint;

var _highcharts = _interopRequireDefault(require("highcharts"));

var _exporting = _interopRequireDefault(require("highcharts/modules/exporting"));

var _updateHelperText = _interopRequireDefault(require("../updateHelperText"));

(0, _exporting.default)(_highcharts.default);

function hideNoMatchesAlert() {
  document.querySelector('.js-no-matches').setAttribute('hidden', true);
}

function showNoMatchesAlert() {
  document.querySelector('.js-no-matches').removeAttribute('hidden');
} // Highlight city


function highlightPoint(id) {
  var ptChartDom = document.getElementById('pt-chart');
  var matChartDom = document.getElementById('mat-chart');

  var ptChart = _highcharts.default.charts[_highcharts.default.attr(ptChartDom, 'data-highcharts-chart')];

  var matChart = _highcharts.default.charts[_highcharts.default.attr(matChartDom, 'data-highcharts-chart')];

  var ptPoint = ptChart.get(id);
  var matPoint = matChart.get(id);

  if (ptPoint === undefined || matPoint === undefined) {
    return showNoMatchesAlert();
  }

  ptPoint.graphic.toFront();
  ptPoint.select();
  matPoint.graphic.toFront();
  matPoint.select();
  (0, _updateHelperText.default)(id);
  return true;
}

},{"../updateHelperText":57,"@babel/runtime/helpers/interopRequireDefault":3,"highcharts":39,"highcharts/modules/exporting":40}],50:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleChartFilters;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _highcharts = _interopRequireDefault(require("highcharts"));

var _exporting = _interopRequireDefault(require("highcharts/modules/exporting"));

var _axios = _interopRequireDefault(require("axios"));

var _awesomplete = _interopRequireDefault(require("awesomplete"));

var _fuzzysort = _interopRequireDefault(require("fuzzysort"));

var _noUiSlider = _interopRequireDefault(require("./noUiSlider"));

var _updateTableInfo = require("../updateTableInfo");

var _plotCharts = require("../plotCharts");

var _clearFilters = _interopRequireDefault(require("./clearFilters"));

require("./vueFilter");

var _highlightPoint = require("./highlightPoint");

var _config = _interopRequireDefault(require("../../config"));

// import Vue from 'vue';
(0, _exporting.default)(_highcharts.default);

function handleChartFilters() {
  var jsChartForm = document.getElementById('js-chart-form');
  var jsAxisForm = document.getElementById('js-axis-form');
  var cityInput = document.querySelector('#js-city');
  var highlightInput = document.getElementById('highlight'); // const stateInput = document.getElementById('state');

  var regionInput = document.getElementById('region');
  var showAdvancedFiltersButton = document.querySelector('.js-show-advanced');
  var advancedFieldsContainer = document.querySelector('.js-advanced-filters-container');

  if (showAdvancedFiltersButton && advancedFieldsContainer) {
    showAdvancedFiltersButton.addEventListener('click', function () {
      advancedFieldsContainer.classList.toggle('chart-form__advanced-filters-container--active');
      showAdvancedFiltersButton.classList.toggle('button--active');

      if (showAdvancedFiltersButton.innerText === 'Mais configurações') {
        showAdvancedFiltersButton.innerText = 'Fechar configurações';
      } else {
        showAdvancedFiltersButton.innerText = 'Mais configurações';
      } // advancedFieldsContainer.scrollIntoView();

    });
  }

  function getCities() {
    var url = "".concat(_config.default.api.domain, "cities");
    return _axios.default.get(url).then(function (response) {
      return response.data.cities;
    });
  }

  function removeDiacritics(string) {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function populateCitiesList() {
    return _populateCitiesList.apply(this, arguments);
  }

  function _populateCitiesList() {
    _populateCitiesList = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      var cities, cityNames, awesomplete;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!cityInput) {
                _context.next = 7;
                break;
              }

              _context.next = 3;
              return getCities();

            case 3:
              cities = _context.sent;
              cityNames = cities.map(function (city) {
                return {
                  label: "".concat(city.name, " - ").concat(city.state.uf),
                  value: city.id
                };
              });
              awesomplete = new _awesomplete.default(cityInput, {
                nChars: 1,
                maxItems: 5,
                autoFirst: true,
                filter: function filter(text, input) {
                  return _fuzzysort.default.single(removeDiacritics(input), removeDiacritics(text.label));
                },
                replace: function replace(suggestion) {
                  this.input.value = suggestion.label;
                }
              });
              awesomplete.list = cityNames;

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));
    return _populateCitiesList.apply(this, arguments);
  }

  function hideNoMatchesAlert() {
    document.querySelector('.js-no-matches').setAttribute('hidden', true);
  }

  function clearHighlightedPoints() {
    var ptChartDom = document.getElementById('pt-chart');
    var matChartDom = document.getElementById('mat-chart');

    var ptChart = _highcharts.default.charts[_highcharts.default.attr(ptChartDom, 'data-highcharts-chart')];

    var matChart = _highcharts.default.charts[_highcharts.default.attr(matChartDom, 'data-highcharts-chart')];

    var selectedPtPoints = ptChart.getSelectedPoints();
    var selectedMatPoints = matChart.getSelectedPoints();

    if (selectedPtPoints[0]) {
      selectedPtPoints[0].select();
      selectedMatPoints[0].select();
    }
  }

  if (jsChartForm) {
    jsChartForm.addEventListener('submit', function (event) {
      // debugger;
      event.preventDefault(); // toggleLoading();

      var formData = new FormData(event.target);
      var payload = {};
      payload.grade = formData.get('grade');
      payload.xAxis = formData.get('xAxis');
      payload.region = formData.get('region');
      payload.state = formData.get('state');
      payload.inequality = formData.get('inequality');
      payload.quality = formData.get('quality');
      (0, _plotCharts.toggleLoading)();
      (0, _plotCharts.populateChartData)(payload, true); // clearFilters();

      (0, _updateTableInfo.clearTableInfo)();
      hideNoMatchesAlert();
    });
  }

  if (jsAxisForm) {
    jsAxisForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var formData = new FormData(event.target);
      var payload = {};
      payload.grade = formData.get('grade');
      payload.xAxis = formData.get('xAxis'); // toggleLoading();

      (0, _plotCharts.populateChartData)(payload); // clearFilters();

      (0, _updateTableInfo.clearTableInfo)();
      hideNoMatchesAlert(); // toggleLoading();
    });
  }

  function highlightPoints(parameter, value) {
    var ptChartDom = document.getElementById('pt-chart');
    var matChartDom = document.getElementById('mat-chart');

    var ptChart = _highcharts.default.charts[_highcharts.default.attr(ptChartDom, 'data-highcharts-chart')];

    var matChart = _highcharts.default.charts[_highcharts.default.attr(matChartDom, 'data-highcharts-chart')];

    clearHighlightedPoints();

    if (parameter === 'big-cities') {
      ptChart.series[0].points.forEach(function (point) {
        if (point.options.is_big_town === 1) {
          point.select(true, true);
          point.graphic.toFront();
        }
      });
      matChart.series[0].points.forEach(function (point) {
        if (point.options.is_big_town === 1) {
          point.select(true, true);
          point.graphic.toFront();
        }
      });
    }

    if (parameter === 'capital') {
      ptChart.series[0].points.forEach(function (point) {
        if (point.options.is_capital === 1) {
          point.select(true, true);
          point.graphic.toFront();
        }
      });
      matChart.series[0].points.forEach(function (point) {
        if (point.options.is_capital === 1) {
          point.select(true, true);
          point.graphic.toFront();
        }
      });
    }

    if (parameter === 'state') {
      ptChart.series[0].points.forEach(function (point) {
        if (point.options.state === value) {
          point.select(true, true);
          point.graphic.toFront();
        }
      });
      matChart.series[0].points.forEach(function (point) {
        if (point.options.state === value) {
          point.select(true, true);
          point.graphic.toFront();
        }
      });
    }

    if (parameter === 'region') {
      ptChart.series[0].points.forEach(function (point) {
        if (point.options.region === Number(value)) {
          point.select(true, true);
          point.graphic.toFront();
        }
      });
      matChart.series[0].points.forEach(function (point) {
        if (point.options.region === Number(value)) {
          point.select(true, true);
          point.graphic.toFront();
        }
      });
    }

    if (parameter === 'none') {
      clearHighlightedPoints();
    }
  }

  if (cityInput) {
    cityInput.addEventListener('input', function () {
      hideNoMatchesAlert();
    }, false);
    cityInput.addEventListener('awesomplete-selectcomplete', function (event) {
      (0, _clearFilters.default)(event.target.id);
      (0, _highlightPoint.highlightPoint)(event.text.value);
      (0, _updateTableInfo.updateTableInfo)(event.text.value, window.chartData.xAxis, window.chartData.data);
    }, false);
  }

  if (highlightInput) {
    highlightInput.addEventListener('change', function (event) {
      (0, _clearFilters.default)(event.target.id);
      (0, _updateTableInfo.clearTableInfo)();
      highlightPoints(event.target.value);
    }, false);
  } // if (stateInput) {
  //   stateInput.addEventListener('change', (event) => {
  //     clearFilters(event.target.id);
  //     clearTableInfo();
  //     highlightPoints('state', event.target.value);
  //   }, false);
  // }


  if (regionInput) {
    regionInput.addEventListener('change', function (event) {
      (0, _clearFilters.default)(event.target.id);
      (0, _updateTableInfo.clearTableInfo)();
      highlightPoints('region', event.target.value);
    }, false);
  }

  populateCitiesList();
  (0, _noUiSlider.default)();
}

},{"../../config":59,"../plotCharts":55,"../updateTableInfo":58,"./clearFilters":48,"./highlightPoint":49,"./noUiSlider":51,"./vueFilter":52,"@babel/runtime/helpers/asyncToGenerator":2,"@babel/runtime/helpers/interopRequireDefault":3,"@babel/runtime/regenerator":10,"awesomplete":11,"axios":12,"fuzzysort":38,"highcharts":39,"highcharts/modules/exporting":40}],51:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = startRange;

var noUiSlider = _interopRequireWildcard(require("nouislider/distribute/nouislider"));

var _numbro = _interopRequireDefault(require("numbro"));

require("numbro/languages/pt-BR");

_numbro.default.setLanguage('pt-BR');

function startRange() {
  // console.log(nouislider)
  var range = document.getElementById('js-range'); // window.noUiSlider = noUiSlider;

  if (!range) {
    return;
  }

  noUiSlider.create(range, {
    start: [0, 13000000],
    connect: true,
    // tooltips: true,
    range: {
      min: 0,
      max: 13000000
    }
  }); // range.setAttribute('disabled', true);

  var minValue = document.getElementById('js-range-min-value');
  var maxValue = document.getElementById('js-rang-max-value');
  range.noUiSlider.on('update', function (values, handle) {
    if (handle) {
      maxValue.value = (0, _numbro.default)(values[handle]).format({
        average: true,
        mantissa: 1,
        optionalMantissa: true
      });
    } else {
      minValue.value = (0, _numbro.default)(values[handle]).format({
        average: true,
        mantissa: 1,
        optionalMantissa: true
      });
    }
  });
  window.range = range;
}

},{"@babel/runtime/helpers/interopRequireDefault":3,"@babel/runtime/helpers/interopRequireWildcard":4,"nouislider/distribute/nouislider":41,"numbro":42,"numbro/languages/pt-BR":43}],52:[function(require,module,exports){
"use strict";

/* global Vue */
// import './handleChartFilters';
var toPercentageFilter = function toPercentageFilter(value) {
  return "".concat(Math.round(parseFloat(value) * 100), "%");
};

Vue.filter('toPercentage', toPercentageFilter);
window.$vue = new Vue({
  el: '#app',
  data: {
    chartData: null,
    selectedFilters: {
      selectedInequality: null,
      selectedRegion: null,
      selectedQuality: null
    },
    regions: [{
      name: 'centro oeste',
      id: 1
    }, {
      name: 'nordeste',
      id: 2
    }, {
      name: 'norte',
      id: 3
    }, {
      name: 'sudeste',
      id: 4
    }, {
      name: 'sul',
      id: 5
    }],
    states: ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Minas Gerais', 'Mato Grosso do Sul', 'Mato Grosso', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'],
    inequalityRange: [{
      name: 'equidade',
      id: 'equidade'
    }, {
      name: 'desigualdade',
      id: 'desigualdade'
    }, {
      name: 'alta',
      id: 'desigualdade-alta'
    }, {
      name: 'extrema',
      id: 'desigualdade-extrema'
    }, {
      name: 'situações atípicas',
      id: 'situacoes-atipicas'
    }],
    qualityRange: [{
      name: 'baixa',
      id: 'baixa'
    }, {
      name: 'media-baixa',
      id: 'medio-baixa'
    }, {
      name: 'media',
      id: 'media'
    }, {
      name: 'media-alta',
      id: 'medio-alta'
    }, {
      name: 'alta',
      id: 'alta'
    }],
    filterFormLoading: false
  },
  watch: {
    // whenever question changes, this function will run
    selectedFilters: {
      // eslint-disable-next-line object-shorthand
      handler: function handler() {
        this.handleChartFiltersAvailability();
      },
      deep: true
    } // selectedFilters: function () {
    // },
    // deep: true,

  },
  created: function created() {},
  mounted: function mounted() {// this.chartData = window.chartData.data;
  },
  methods: {
    // clearInput(toClear) {
    //   console.log(this.toClear);
    //   this.toClear;
    // },
    toggleFilterFormLoading: function toggleFilterFormLoading() {
      this.filterFormLoading = !this.toggleFilterFormLoading;
    },
    checkRegion: function checkRegion() {
      var _this = this;

      this.regions = this.regions.filter(function (item) {
        var itContains = _this.chartData.some(function (city) {
          return city.region.id === item.id;
        });

        if (!itContains) {
          item.disabled = true;
        } else {
          item.disabled = false;
        }

        return item;
      });
    },
    checkInequality: function checkInequality() {
      var _this2 = this;

      this.inequalityRange = this.inequalityRange.filter(function (item) {
        var itContains = _this2.chartData.some(function (city) {
          return city.range_inequality === item.id;
        });

        if (!itContains) {
          item.disabled = true;
        } else {
          item.disabled = false;
        }

        return item;
      });
    },
    checkQuality: function checkQuality() {
      var _this3 = this;

      this.qualityRange = this.qualityRange.filter(function (item) {
        var itContains = _this3.chartData.some(function (city) {
          return city.range_quality === item.id;
        });

        if (!itContains) {
          item.disabled = true;
        } else {
          item.disabled = false;
        }

        return item;
      });
    },
    handleChartFiltersAvailability: function handleChartFiltersAvailability() {
      var _this4 = this;

      this.toggleFilterFormLoading();
      this.chartData = window.globalChartData; // console.log(this.chartData, this.inequalityRange);

      if (this.selectedFilters.selectedState) {
        this.chartData = this.chartData.filter(function (item) {
          return item.state.id === _this4.selectedFilters.selectedState;
        });
      }

      if (this.selectedFilters.selectedRegion) {
        this.chartData = this.chartData.filter(function (item) {
          return item.region.id === _this4.selectedFilters.selectedRegion;
        });
      }

      if (this.selectedFilters.selectedInequality) {
        this.chartData = this.chartData.filter(function (item) {
          return item.range_inequality === _this4.selectedFilters.selectedInequality;
        });
      }

      if (this.selectedFilters.selectedQuality) {
        this.chartData = this.chartData.filter(function (item) {
          return item.range_quality === _this4.selectedFilters.selectedQuality;
        });
      } // console.log(this.chartData, this.inequalityRange);


      this.checkRegion();
      this.checkQuality();
      this.checkInequality();
      this.toggleFilterFormLoading();
    }
  }
});

},{}],53:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getChartData;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var _config = _interopRequireDefault(require("../config"));

function getChartData(receivedPayload) {
  var chartData = {};
  var firstLoad;

  if (receivedPayload === undefined) {
    firstLoad = true;
    chartData = {
      grade: 5,
      xAxis: 'racial'
    };
  } else {
    chartData = receivedPayload;
  }

  var url = "".concat(_config.default.api.domain, "data?school_grade=").concat(chartData.grade, "&x=").concat(chartData.xAxis);

  if (receivedPayload && receivedPayload.region) {
    url += "&region_id=".concat(receivedPayload.region);
  }

  if (receivedPayload && receivedPayload.state) {
    url += "&state_id=".concat(receivedPayload.state);
  }

  chartData.xAxis = chartData.xAxis; // xAxis = newXAxis;

  function populateGlobalChartData() {
    return _populateGlobalChartData.apply(this, arguments);
  }

  function _populateGlobalChartData() {
    _populateGlobalChartData = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee() {
      var response;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _axios.default.get(url);

            case 3:
              response = _context.sent;
              chartData.data = response.data.data;
              window.chartData = chartData;

              if (firstLoad) {
                window.globalChartData = chartData.data;
              }

              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              window.console.error(_context.t0);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 9]]);
    }));
    return _populateGlobalChartData.apply(this, arguments);
  }

  return populateGlobalChartData();
}

},{"../config":59,"@babel/runtime/helpers/asyncToGenerator":2,"@babel/runtime/helpers/interopRequireDefault":3,"@babel/runtime/regenerator":10,"axios":12}],54:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _sizeToggle = _interopRequireDefault(require("./sizeToggle"));

var _plotCharts = require("./plotCharts");

var _downloadCharts = _interopRequireDefault(require("./downloadCharts"));

var _filter = _interopRequireDefault(require("./filter"));

(0, _plotCharts.populateChartData)();
(0, _downloadCharts.default)();
(0, _sizeToggle.default)();
(0, _filter.default)();

},{"./downloadCharts":47,"./filter":50,"./plotCharts":55,"./sizeToggle":56,"@babel/runtime/helpers/interopRequireDefault":3}],55:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.populateChartData = populateChartData;
exports.toggleLoading = toggleLoading;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _highcharts = _interopRequireDefault(require("highcharts"));

var _exporting = _interopRequireDefault(require("highcharts/modules/exporting"));

var _updateTableInfo = require("./updateTableInfo");

var _updateHelperText = _interopRequireDefault(require("./updateHelperText"));

var _addTableDestak = _interopRequireDefault(require("./addTableDestak"));

var _getChartData = _interopRequireDefault(require("./getChartData"));

var _clearFilters = _interopRequireDefault(require("./filter/clearFilters"));

var _highlightPoint = require("./filter/highlightPoint");

(0, _exporting.default)(_highcharts.default);
var xAxisText;
var isLoading = false;
var ptChartElement = document.getElementById('pt-chart');
var matChartElement = document.getElementById('mat-chart');

_highcharts.default.setOptions({
  lang: {
    printChart: 'Imprimir gráfico',
    resetZoom: 'Resetar zoom'
  },
  tooltip: {
    formatter: function formatter() {
      return "".concat(this.point.options.city, " - ").concat(this.point.options.state);
    }
  }
});

function drawChart(chartData, subject) {
  return _highcharts.default.chart("".concat(subject, "-chart"), {
    chart: {
      type: 'scatter',
      zoomType: 'xy'
    },
    credits: false,
    legend: {
      enabled: false
    },
    turboThreshold: 0,
    title: {
      text: ''
    },
    subtitle: '',
    xAxis: {
      title: {
        enabled: true,
        text: "".concat(xAxisText, " | [Desigualdade]")
      },
      tickInterval: 1,
      max: 3.5,
      min: -3.5,
      startOnTick: true,
      endOnTick: true,
      showLastLabel: true,
      plotLines: [{
        value: 0,
        color: '#e6e6e6',
        dashStyle: 'solid',
        width: 1
      }]
    },
    yAxis: {
      title: {
        text: "".concat(subject === 'pt' ? 'Português' : 'Matemática', " | [N\xEDvel de aprendizagem]")
      },
      lineWidth: 1,
      gridZIndex: 0,
      max: 10,
      min: 0,
      plotLines: [{
        color: 'red',
        width: 2,
        value: 2,
        dashStyle: 'Dot',
        zIndex: 3,
        label: {
          text: 'Baixa',
          align: 'left',
          y: 16
        }
      }, {
        color: 'red',
        width: 2,
        value: 2.9,
        dashStyle: 'Dot',
        zIndex: 3,
        label: {
          text: 'Médio-baixa',
          align: 'left',
          y: 16
        }
      }, {
        color: 'red',
        width: 2,
        value: 3.8,
        dashStyle: 'Dot',
        zIndex: 3,
        label: {
          text: 'Média',
          align: 'left',
          y: 16
        }
      }, {
        color: 'red',
        width: 2,
        value: 4.8,
        dashStyle: 'Dot',
        zIndex: 3,
        label: {
          text: 'Médio-alta',
          align: 'left',
          y: 16
        }
      }, {
        // this last line is a fake one, just to display the label on the graphic
        width: 0,
        value: 6.8,
        dashStyle: 'Dot',
        zIndex: 3,
        label: {
          text: 'Alta',
          align: 'left',
          y: 16
        }
      }]
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 5,
          states: {
            hover: {
              enabled: true,
              lineColor: 'rgb(100,100,100)'
            }
          }
        },
        states: {
          hover: {
            marker: {
              enabled: false
            }
          }
        },
        tooltip: {
          headerFormat: 'Cidade: <b>{point.options.city}</b>'
        }
      }
    },
    series: [{
      turboThreshold: 0,
      cursor: 'pointer',
      color: '#b49ae6',
      className: 'stringSince',
      point: {
        events: {
          click: function click() {
            // clearFilters();
            (0, _highlightPoint.highlightPoint)(this.id);
            (0, _updateTableInfo.updateTableInfo)(this.id);
            (0, _updateHelperText.default)(this.id);
            (0, _addTableDestak.default)(this.id);
          }
        }
      },
      data: chartData
    }]
  });
}

function formatItemsToHighCharts(items) {
  return Object.keys(items).map(function (item) {
    return {
      x: Number(items[item].x),
      y: Number(items[item].y),
      className: items[item].range_inequality,
      id: Number(items[item].city.id),
      city: items[item].city.name,
      state: items[item].state.uf,
      state_id: items[item].state.id,
      region: items[item].region.id,
      is_big_town: items[item].city.is_big_town,
      is_capital: items[item].city.is_capital
    };
  });
}

function toggleLoading() {
  var ptChartDom = document.getElementById('pt-chart');
  var matChartDom = document.getElementById('mat-chart');

  var ptChart = _highcharts.default.charts[_highcharts.default.attr(ptChartDom, 'data-highcharts-chart')];

  var matChart = _highcharts.default.charts[_highcharts.default.attr(matChartDom, 'data-highcharts-chart')];

  if (!ptChart || !matChart) {
    return;
  }

  if (!isLoading) {
    ptChart.showLoading();
    matChart.showLoading();
  } else {
    ptChart.hideLoading();
    matChart.hideLoading();
  }

  isLoading = !isLoading;
}

function setRangeValues(ptItems, matItems) {
  // console.log(ptItems, matItems);
  var allItems = ptItems.concat(matItems);
  var maxValue = Math.max.apply(Math, (0, _toConsumableArray2.default)(allItems.map(function (o) {
    return o.city.inhabitants;
  })).concat([0]));
  var minValue = Math.min.apply(Math, (0, _toConsumableArray2.default)(allItems.map(function (o) {
    return o.city.inhabitants;
  }))); // console.log(maxValue, minValue);

  window.range.noUiSlider.updateOptions({
    start: [minValue, maxValue],
    // connect: true,
    // tooltips: true,
    step: 1000,
    range: {
      min: Math.round(minValue),
      max: Math.round(maxValue)
    }
  });
}

function populateChartData(_x) {
  return _populateChartData.apply(this, arguments);
}

function _populateChartData() {
  _populateChartData = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(payload) {
    var chartData, ptItems, matItems, minInhabitants, maxInhabitants, formatedPtItems, formatedMatItems;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(ptChartElement && matChartElement)) {
              _context.next = 32;
              break;
            }

            _context.prev = 1;

            // console.log('payload:', payload);
            if (payload && payload.grade === null) {
              payload.grade = window.chartData.grade;
            }

            if (payload && payload.xAxis === null) {
              payload.xAxis = window.chartData.xAxis;
            }

            _context.next = 6;
            return (0, _getChartData.default)(payload);

          case 6:
            (0, _updateHelperText.default)();
            (0, _addTableDestak.default)();
            (0, _updateTableInfo.updateTableInfo)();
            chartData = window.chartData.data;
            chartData = chartData.filter(function (item) {
              return item.x !== null;
            });
            ptItems = chartData.filter(function (item) {
              return item.subject === 'Português';
            });
            matItems = chartData.filter(function (item) {
              return item.subject === 'Matemática';
            });

            if (payload && payload.inequality) {
              ptItems = ptItems.filter(function (item) {
                return item.range_inequality === payload.inequality;
              });
              matItems = matItems.filter(function (item) {
                return item.range_inequality === payload.inequality;
              });
            }

            if (payload && payload.quality) {
              ptItems = ptItems.filter(function (item) {
                return item.range_quality === payload.quality;
              });
              matItems = matItems.filter(function (item) {
                return item.range_quality === payload.quality;
              });
            }

            minInhabitants = window.range.noUiSlider.get()[0];
            maxInhabitants = window.range.noUiSlider.get()[1];
            ptItems = ptItems.filter(function (item) {
              return item.city.inhabitants >= minInhabitants && item.city.inhabitants <= maxInhabitants;
            });
            matItems = matItems.filter(function (item) {
              return item.city.inhabitants >= minInhabitants && item.city.inhabitants <= maxInhabitants;
            }); // setRangeValues(ptItems, matItems);

            formatedPtItems = formatItemsToHighCharts(ptItems);
            formatedMatItems = formatItemsToHighCharts(matItems);

            if (window.chartData.xAxis === 'racial') {
              xAxisText = 'Raça';
            }

            if (window.chartData.xAxis === 'sex') {
              xAxisText = 'Gênero';
            }

            if (window.chartData.xAxis === 'nse') {
              xAxisText = 'NSE';
            }

            drawChart(formatedPtItems, 'pt');
            drawChart(formatedMatItems, 'mat');
            _context.next = 32;
            break;

          case 28:
            _context.prev = 28;
            _context.t0 = _context["catch"](1);
            window.console.log(_context.t0);
            toggleLoading();

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 28]]);
  }));
  return _populateChartData.apply(this, arguments);
}

},{"./addTableDestak":46,"./filter/clearFilters":48,"./filter/highlightPoint":49,"./getChartData":53,"./updateHelperText":57,"./updateTableInfo":58,"@babel/runtime/helpers/asyncToGenerator":2,"@babel/runtime/helpers/interopRequireDefault":3,"@babel/runtime/helpers/toConsumableArray":7,"@babel/runtime/regenerator":10,"highcharts":39,"highcharts/modules/exporting":40}],56:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sizeToggle;

var _highcharts = _interopRequireDefault(require("highcharts"));

var _exporting = _interopRequireDefault(require("highcharts/modules/exporting"));

(0, _exporting.default)(_highcharts.default);

function sizeToggle() {
  // Expand and shrink pt charts
  var expandPtChartButton = document.querySelector('.js-expand-pt-chart');
  var shrinkPtChartButton = document.querySelector('.js-shrink-pt-chart');
  var expandMatChartButton = document.querySelector('.js-expand-mat-chart');
  var shrinkMatChartButton = document.querySelector('.js-shrink-mat-chart');
  var charts = document.querySelectorAll('.chart');

  function expandChart(whichChart) {
    var chartDom = document.getElementById(whichChart);

    var highChart = _highcharts.default.charts[_highcharts.default.attr(chartDom, 'data-highcharts-chart')];

    var chartContainer = chartDom.closest('.chart');
    Array.prototype.forEach.call(charts, function (chart) {
      chart.classList.add('hidden');
    });
    chartContainer.classList.add('expanded');
    chartContainer.classList.remove('hidden');
    chartContainer.addEventListener('transitionend', function () {
      highChart.reflow();
    }, false);
  }

  function shrinkChart(whichChart) {
    var chartDom = document.getElementById(whichChart);

    var highChart = _highcharts.default.charts[_highcharts.default.attr(chartDom, 'data-highcharts-chart')];

    Array.prototype.forEach.call(charts, function (chart) {
      chart.classList.remove('hidden');
    });
    chartDom.closest('.chart').classList.remove('expanded');
    highChart.reflow();
  }

  if (expandPtChartButton) {
    expandPtChartButton.addEventListener('click', function () {
      expandChart('pt-chart');
    });
  }

  if (shrinkPtChartButton) {
    shrinkPtChartButton.addEventListener('click', function () {
      shrinkChart('pt-chart');
    });
  } // Expand and shrink mat charts


  if (expandMatChartButton) {
    expandMatChartButton.addEventListener('click', function () {
      expandChart('mat-chart');
    });
  }

  if (shrinkMatChartButton) {
    document.querySelector('.js-shrink-mat-chart').addEventListener('click', function () {
      shrinkChart('mat-chart');
    });
  }
}

},{"@babel/runtime/helpers/interopRequireDefault":3,"highcharts":39,"highcharts/modules/exporting":40}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateHelperText;

function updateHelperText(cityId) {
  var helperText = document.querySelector('.js-helper-text');
  var _window$chartData = window.chartData,
      data = _window$chartData.data,
      xAxis = _window$chartData.xAxis;
  var helperTextDictionary = {
    racial: 'raça',
    sex: 'gênero',
    nse: 'nível sócio econômico',
    baixa: 'baixa',
    'medio-baixa': 'médio baixa',
    media: 'média',
    'medio-alta': 'médio alta',
    alta: 'alta',
    'desigualdade-extrema': 'desigualdade extrema',
    'desigualdade-alta': 'desigualdade alta',
    desigualdade: 'desigualdade',
    equidade: 'equidade',
    'situacoes-atipicas': 'situações atípicas'
  };

  if (!cityId) {
    helperText.setAttribute('hidden', '');
    return;
  }

  function getCityInfo() {
    return data.filter(function (item) {
      return item.city.id === cityId;
    });
  }

  var cityInfo = getCityInfo(cityId);
  var ptInfo = cityInfo.find(function (item) {
    return item.subject === 'Português';
  });
  var matInfo = cityInfo.find(function (item) {
    return item.subject === 'Matemática';
  });
  helperText.removeAttribute('hidden'); // city info

  helperText.querySelector('.js-city').textContent = ptInfo.city.name;
  helperText.querySelector('.js-uf').textContent = ptInfo.state.name;
  helperText.querySelector('.js-inhabitants').textContent = ptInfo.city.inhabitants;
  helperText.querySelector('.js-xAxis').textContent = helperTextDictionary[xAxis]; // pt info

  helperText.querySelector('.js-pt-quality').textContent = helperTextDictionary[ptInfo.range_quality];
  helperText.querySelector('.js-pt-inequality').textContent = helperTextDictionary[ptInfo.range_inequality]; // mat info

  helperText.querySelector('.js-mat-quality').textContent = helperTextDictionary[matInfo.range_quality];
  helperText.querySelector('.js-mat-inequality').textContent = helperTextDictionary[matInfo.range_inequality];
}

},{}],58:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTableInfo = updateTableInfo;
exports.clearTableInfo = clearTableInfo;

var _highcharts = _interopRequireDefault(require("highcharts"));

var _exporting = _interopRequireDefault(require("highcharts/modules/exporting"));

(0, _exporting.default)(_highcharts.default);
var ptTable = document.querySelector('.js-pt-table');
var matTable = document.querySelector('.js-mat-table');

function updateTableInfo(id) {
  var _window$chartData = window.chartData,
      xAxis = _window$chartData.xAxis,
      data = _window$chartData.data;

  function setCityInfo(info) {
    var ptInfo = info.find(function (item) {
      return item.subject === 'Português';
    });
    var matInfo = info.find(function (item) {
      return item.subject === 'Matemática';
    });

    if (ptInfo === undefined || matInfo === undefined) {
      return;
    }

    ptTable.removeAttribute('hidden');
    matTable.removeAttribute('hidden');
    ptTable.getElementsByTagName('h2')[0].textContent = "".concat(ptInfo.city.name, " - ").concat(ptInfo.state.uf);
    matTable.getElementsByTagName('h2')[0].textContent = "".concat(matInfo.city.name, " - ").concat(matInfo.state.uf);

    if (xAxis === 'racial') {
      ptTable.querySelector('.js-unprivileged-title').textContent = 'Número de alunos pretos';
      ptTable.querySelector('.js-unprivileged-value').textContent = ptInfo.count_second_group;
      ptTable.querySelector('.js-privileged-title').textContent = 'Número de alunos brancos';
      ptTable.querySelector('.js-privileged-value').textContent = ptInfo.count_first_group; // document.querySelectorAll('.js-xAxis-text').forEach((span) => {
      //   const domSpan = span;
      //   domSpan.textContent = 'Raça';
      // });
    }

    if (xAxis === 'sex') {
      ptTable.querySelector('.js-unprivileged-title').textContent = 'Número de alunos mulheres';
      ptTable.querySelector('.js-unprivileged-value').textContent = ptInfo.count_second_group;
      ptTable.querySelector('.js-privileged-title').textContent = 'Número de alunos homens';
      ptTable.querySelector('.js-privileged-value').textContent = ptInfo.count_first_group; // document.querySelectorAll('.js-xAxis-text').forEach((span) => {
      //   const domSpan = span;
      //   domSpan.textContent = 'Gênero';
      // });
    }

    if (xAxis === 'nse') {
      ptTable.querySelector('.js-unprivileged-title').textContent = 'Número de alunos nível socioeconômico baixo';
      ptTable.querySelector('.js-unprivileged-value').textContent = ptInfo.count_second_group;
      ptTable.querySelector('.js-privileged-title').textContent = 'Número de alunos nível socioeconômico alto';
      ptTable.querySelector('.js-privileged-value').textContent = ptInfo.count_first_group; // document.querySelectorAll('.js-xAxis-text').forEach((span) => {
      //   const domSpan = span;
      //   domSpan.textContent = 'NSE';
      // });
    }

    ptTable.querySelector('.js-total-students').textContent = ptInfo.count_total;
    ptTable.querySelector('.js-xAxis').textContent = Number(ptInfo.x).toFixed(2);
    ptTable.querySelector('.js-quality').textContent = ptInfo.range_quality;
    ptTable.querySelector('.js-yAxis').textContent = Number(ptInfo.y).toFixed(2);
    ptTable.querySelector('.js-inequality').textContent = ptInfo.range_inequality;

    if (xAxis === 'racial') {
      matTable.querySelector('.js-unprivileged-title').textContent = 'Número de alunos pretos';
      matTable.querySelector('.js-unprivileged-value').textContent = matInfo.count_second_group;
      matTable.querySelector('.js-privileged-title').textContent = 'Número de alunos brancos';
      matTable.querySelector('.js-privileged-value').textContent = matInfo.count_first_group; // matTable.querySelector('.js-xAxis-text').textContent = 'Raça';
    }

    if (xAxis === 'sex') {
      matTable.querySelector('.js-unprivileged-title').textContent = 'Número de alunos mulheres';
      matTable.querySelector('.js-unprivileged-value').textContent = matInfo.count_second_group;
      matTable.querySelector('.js-privileged-title').textContent = 'Número de alunos homens';
      matTable.querySelector('.js-privileged-value').textContent = matInfo.count_first_group; // matTable.querySelector('.js-xAxis-text').textContent = 'Gênero';
    }

    if (xAxis === 'nse') {
      matTable.querySelector('.js-unprivileged-title').textContent = 'Número de alunos nível socioeconômico baixo';
      matTable.querySelector('.js-unprivileged-value').textContent = matInfo.count_second_group;
      matTable.querySelector('.js-privileged-title').textContent = 'Número de alunos nível socioeconômico alto';
      matTable.querySelector('.js-privileged-value').textContent = matInfo.count_first_group; // matTable.querySelector('.js-xAxis-text').textContent = 'NSE';
    }

    matTable.querySelector('.js-total-students').textContent = matInfo.count_total;
    matTable.querySelector('.js-xAxis').textContent = Number(matInfo.x).toFixed(2);
    matTable.querySelector('.js-quality').textContent = matInfo.range_quality;
    matTable.querySelector('.js-yAxis').textContent = Number(matInfo.y).toFixed(2);
    matTable.querySelector('.js-inequality').textContent = matInfo.range_inequality;
  }

  function getCityInfo(cityId) {
    if (!cityId) {
      ptTable.setAttribute('hidden', '');
      matTable.setAttribute('hidden', '');
    }

    return data.filter(function (item) {
      return item.city.id === cityId;
    });
  }

  var newInfo = getCityInfo(id);
  setCityInfo(newInfo);
}

function clearTableInfo() {
  ptTable.getElementsByTagName('h2')[0].textContent = '';
  ptTable.querySelector('.js-unprivileged-value').textContent = '';
  ptTable.querySelector('.js-privileged-value').textContent = '';
  ptTable.querySelector('.js-total-students').textContent = '';
  ptTable.querySelector('.js-xAxis').textContent = '';
  ptTable.querySelector('.js-quality').textContent = '';
  ptTable.querySelector('.js-yAxis').textContent = '';
  ptTable.querySelector('.js-inequality').textContent = '';
  matTable.getElementsByTagName('h2')[0].textContent = '';
  matTable.querySelector('.js-unprivileged-value').textContent = '';
  matTable.querySelector('.js-privileged-value').textContent = '';
  matTable.querySelector('.js-total-students').textContent = '';
  matTable.querySelector('.js-xAxis').textContent = '';
  matTable.querySelector('.js-quality').textContent = '';
  matTable.querySelector('.js-yAxis').textContent = '';
  matTable.querySelector('.js-quality').textContent = '';
}

},{"@babel/runtime/helpers/interopRequireDefault":3,"highcharts":39,"highcharts/modules/exporting":40}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  api: {
    domain: window.location.hostname.indexOf('portalidea.org.br') !== -1 ? 'https://api.portalidea.org.br/api/' : 'https://api.portalidea.org.br/api/'
  }
};
exports.default = _default;

},{}]},{},[54]);
