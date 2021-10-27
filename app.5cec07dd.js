// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/store/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Store = function () {
  function Store() {
    this.colorList = [{
      color: "rgb(255,163,163)",
      stop: 20,
      index: 0
    }, {
      color: "rgb(232,123,255)",
      stop: 50,
      index: 1
    }, {
      color: "rgb(133,173,255)",
      stop: 90,
      index: 2
    }];
    this.activeColor = this.colorList[0];
    this.isLinear = true;
    this.colorItemIndex = this.colorList.length;
    this.codeData = "css";
    this.codeTypes = [{
      type: "css",
      specialColor: "#2965f1"
    }];
  }

  return Store;
}();

exports.default = Store;
},{}],"node_modules/@handlebars/allow-prototype-access/src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allowInsecurePrototypeAccess = allowInsecurePrototypeAccess;

function allowInsecurePrototypeAccess(HandlebarsInstance) {
  return wrapCompileFunction(HandlebarsInstance.create());
}

function wrapCompileFunction(handlebarsInstance) {
  const originalCompile = handlebarsInstance.compile;

  handlebarsInstance.compile = function compile(templateString, compileOptions) {
    const template = originalCompile.call(this, templateString, compileOptions);
    return function insecureTemplate(context, runtimeOptions) {
      return template(context, extendRuntimeOptions(runtimeOptions));
    };
  };

  return handlebarsInstance;
}

function extendRuntimeOptions(runtimeOptions) {
  return {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
    ...runtimeOptions
  };
}
},{}],"src/pages/main.template.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var template =
/* html */
"\n    <main>\n        <header class=\"w-full shadow font-bold fixed top-0 left-0\">\n            <h1 class=\"text-2xl text-purple-700 text-opacity-50 container mx-auto p-4\">\n                {{title}}\n            </h1>\n            <div id=\"prev-gradient\" class=\"w-full h-80 bg-gray-100\">\n            </div>\n        </header>\n        <section id=\"palette\" class=\"relative container mx-auto rounded-lg shadow bg-gray-50 flex flex-col md:flex-wrap-reverse p-3 mt-72\">\n            <section id=\"palette-gradient\">\n                <div id=\"gradient-bar\"></div>\n            </section>\n            <section>\n                <div id=\"color-list\"></div>\n            </section>\n            <section id=\"palette-options\">\n                <div id=\"change-option\" class=\"p-2 flex flex-col\"></div>\n            </section>\n            <div id=\"code-viewer\">Hello</div>\n        </section>\n\n    </main>\n"; // <section id="palette-color">
//                 <div id="color-picker"></div>
//             </section>

var allowInsecurePrototypeAccess = require("@handlebars/allow-prototype-access").allowInsecurePrototypeAccess;

var insecureHandlebars = allowInsecurePrototypeAccess(window.Handlebars);
exports.default = insecureHandlebars.compile(template);
},{"@handlebars/allow-prototype-access":"node_modules/@handlebars/allow-prototype-access/src/index.js"}],"src/views/core-view.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var CoreView = function () {
  function CoreView(container, template) {
    this._container = container;
    this._template = template;
  }

  return CoreView;
}();

exports.default = CoreView;
},{}],"src/views/prev-gradient.template.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var template =
/* html */
"\n    <div \n    id=\"prev-gradient\"\n    style=\"background: {{#if isLinear}}linear{{else}}radial{{/if}}-gradient({{#if isLinear}}90deg{{else}}circle{{/if}},{{#each colorList}}{{color}} {{stop}}%{{#if @last}}{{else}},{{/if}}{{/each}})\"\n    class=\"h-full\">\n    </div>\n";

var allowInsecurePrototypeAccess = require("@handlebars/allow-prototype-access").allowInsecurePrototypeAccess;

var insecureHandlebars = allowInsecurePrototypeAccess(window.Handlebars);
exports.default = insecureHandlebars.compile(template);
},{"@handlebars/allow-prototype-access":"node_modules/@handlebars/allow-prototype-access/src/index.js"}],"src/views/prev-gradient.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var core_view_1 = __importDefault(require("./core-view"));

var prev_gradient_template_1 = __importDefault(require("./prev-gradient.template"));

var PrevGradient = function (_super) {
  __extends(PrevGradient, _super);

  function PrevGradient(container, data) {
    var _this = _super.call(this, container, (0, prev_gradient_template_1.default)(data)) || this;

    _this.render = function (appendChild) {
      //* appendChild속성은 container요소의 자식으로써 렌더링 할것인지 덮어쓰기 할 것인지에 대한 옵션
      var container = document.querySelector(_this._container);

      if (appendChild) {
        var divFragment = document.createElement("div");
        divFragment.innerHTML = (0, prev_gradient_template_1.default)(_this._data);
        container === null || container === void 0 ? void 0 : container.appendChild(divFragment.children[0]);
      } else {
        if (container) {
          container.innerHTML = (0, prev_gradient_template_1.default)(_this._data);
        }
      }
    };

    _this._data = data;
    return _this;
  }

  return PrevGradient;
}(core_view_1.default);

exports.default = PrevGradient;
},{"./core-view":"src/views/core-view.ts","./prev-gradient.template":"src/views/prev-gradient.template.ts"}],"src/views/color-list.template.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var template =
/* html */
"\n    <header id=\"color-info-container\">\n      <div id=\"color-info\" class=\"flex flex-col items-center\">\n        <div id=\"color-box\" style=\"background-color: {{activeColor.color}}\" class=\"p-4 w-20 h-20 rounded-full shadow-md\"></div>\n        <span id=\"rgb\" class=\"font-bold\">{{activeColor.color}}</span>\n      </div>\n    </header>\n    <hr />\n      <table class=\"border-separate p-4 table-auto space-y-4 min-w-full divide-y divide-gray-200\">\n        <thead class=\"bg-gray-50\">\n          <tr>\n            <th scope=\"col\" class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Delete</th>\n            <th scope=\"col\" class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Color</th>\n            <th scope=\"col\" class=\"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider\">Stop</th>\n          </tr>\n        </thead>\n        <tbody class=\"pb-6\">\n        {{#each colorList}}\n          <style>\n            @media screen and (-webkit-min-device-pixel-ratio: 0) {\n            .input-{{this.index}}[type=\"range\"]::-webkit-slider-thumb {\n                box-shadow: -405px 0 0 400px {{this.color}};\n            }\n          </style>\n          <tr id=\"color-item\" data-index=\"{{this.index}}\" class=\"{{#ifEquals this.index ../activeColor.index}}rounded ring-4 ring-indigo-300{{/ifEquals}} cursor-pointer\">\n              <td class=\"px-6 py-4 whitespace-nowrap\"><button class=\"w-12 font-bold\" data-index=\"{{this.index}}\">&times;</button></td>\n              <td class=\"px-6 py-5\" data-index=\"{{this.index}}\">                \n                <input id=\"color-picker\" data-index=\"{{this.index}}\" name=\"color-picker\" type=\"color\" class=\"w-0 p-5 rounded\" style=\"background: {{this.color}};\">\n              </td>\n              <td class=\"px-6 py-4 whitespace-nowrap\" data-index=\"{{this.index}}\">\n                <input id=\"change-stop\" value=\"{{this.stop}}\" class=\"input-{{this.index}} rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-128\" type=\"range\" min=\"0\" max=\"100\" data-index=\"{{this.index}}\"></input>\n              </td>\n          </tr>\n        {{/each}}\n        </tbody>\n      </table>\n      <div id=\"new-color\" class=\"mt-2 text-green-500 px-6 py-4 whitespace-nowrap text-center bg-gray-200 rounded-lg\" style=\"cursor: copy;\" >+ New Color Set</div>\n      <hr />\n";

var allowInsecurePrototypeAccess = require("@handlebars/allow-prototype-access").allowInsecurePrototypeAccess;

var insecureHandlebars = allowInsecurePrototypeAccess(window.Handlebars);
insecureHandlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});
exports.default = insecureHandlebars.compile(template);
},{"@handlebars/allow-prototype-access":"node_modules/@handlebars/allow-prototype-access/src/index.js"}],"src/views/code-viewer.template.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var template =
/* html */
"\n    <style>\n      #copy-text {\n        transition: ease-in .2s;\n        background: {{#if isLinear}}linear{{else}}radial{{/if}}-gradient({{#if isLinear}}90deg{{else}}circle{{/if}},{{#each colorList}}{{color}} {{stop}}%{{#if @last}}{{else}},{{/if}}{{/each}})\n      }\n      #copy-text:hover {\n        color :white\n      }\n    </style>\n    <header>\n      <ul class=\"flex\">\n        {{#each codeTypes}}\n          <li id=\"code-toggle\" data-index=\"{{this.type}}\" class=\"p-3 cursor-pointer select-none\" style=\"background: {{#ifEquals this.type ../codeData}}{{this.specialColor}}{{else}}bg-gray-300{{/ifEquals}}; color: bg-gray-500\">{{this.type}}</li>\n        {{/each}}\n      </ul>\n    </header>\n    <pre class=\"flex flex-col\">\n        <code class=\"{{codeData}}\">\n          {{#ifEquals codeData \"css\"}}\n            <!--CSS Case-->\nbackground: {{#if isLinear}}linear{{else}}radial{{/if}}-gradient({{#if isLinear}}90deg{{else}}circle{{/if}},{{#each colorList}}{{color}} {{stop}}%{{#if @last}}{{else}},{{/if}}{{/each}})\n          {{/ifEquals}}\n          {{#ifEquals codeData \"xml\"}}\n            <!--XML Case-->\n&lt;shape\nxmlns:android=\"http://schemas.android.com/apk/res/android\"\nandroid:shape=\"rectangle\"\n&gt;\n  &lt;gradient\n  android:angle=\"{{#if isLinear}}90{{else}}circle{{/if}}\"\n  android:centerColor=\"#b4b4b4\"\n  android:endColor=\"#FFFFFF\"\n  android:startColor=\"#000000\"\n  android:type=\"{{#if isLinear}}linear{{else}}radial{{/if}}\" /&gt;\n&lt;/shape &gt;\n          {{/ifEquals}}\n        </code>\n        <button id=\"copy-text\" class=\"w-full py-1\" style=\"\">Copy {{codeData}}</button>\n    </pre>\n    "; // <code class="{{codeData}}">
//   background: {{#if isLinear}}linear{{else}}radial{{/if}}-gradient({{#if isLinear}}90deg{{else}}circle{{/if}},{{#each colorList}}{{color}} {{stop}}%{{#if @last}}{{else}},{{/if}}{{/each}})
// </code>

var allowInsecurePrototypeAccess = require("@handlebars/allow-prototype-access").allowInsecurePrototypeAccess;

var insecureHandlebars = allowInsecurePrototypeAccess(window.Handlebars);
insecureHandlebars.registerHelper("ifEquals", function (arg1, arg2, options) {
  return arg1 === arg2 ? options.fn(this) : options.inverse(this);
});
exports.default = insecureHandlebars.compile(template); //CSS
//background: {{#if isLinear}}linear{{else}}radial{{/if}}-gradient({{#if isLinear}}90deg{{else}}circle{{/if}},{{#each colorList}}{{color}} {{stop}}%{{#if @last}}{{else}},{{/if}}{{/each}})
//XML
// <shape
//         xmlns:android="http://schemas.android.com/apk/res/android"
//         android:shape="rectangle"
//         >
//           <gradient
//           android:angle="90"
//           android:centerColor="#b4b4b4"
//           android:endColor="#FFFFFF"
//           android:startColor="#000000"
//           android:type="linear" />
//         </shape>
},{"@handlebars/allow-prototype-access":"node_modules/@handlebars/allow-prototype-access/src/index.js"}],"../../../.nvm/versions/node/v15.14.0/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../.nvm/versions/node/v15.14.0/lib/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../.nvm/versions/node/v15.14.0/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"node_modules/highlight.js/styles/base16/dracula.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../.nvm/versions/node/v15.14.0/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"node_modules/highlight.js/lib/core.js":[function(require,module,exports) {
var global = arguments[3];
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var deepFreezeEs6 = {
  exports: {}
};

function deepFreeze(obj) {
  if (obj instanceof Map) {
    obj.clear = obj.delete = obj.set = function () {
      throw new Error('map is read-only');
    };
  } else if (obj instanceof Set) {
    obj.add = obj.clear = obj.delete = function () {
      throw new Error('set is read-only');
    };
  } // Freeze self


  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach(function (name) {
    var prop = obj[name]; // Freeze prop if it is an object

    if (_typeof(prop) == 'object' && !Object.isFrozen(prop)) {
      deepFreeze(prop);
    }
  });
  return obj;
}

deepFreezeEs6.exports = deepFreeze;
deepFreezeEs6.exports.default = deepFreeze;
var deepFreeze$1 = deepFreezeEs6.exports;
/** @typedef {import('highlight.js').CallbackResponse} CallbackResponse */

/** @typedef {import('highlight.js').CompiledMode} CompiledMode */

/** @implements CallbackResponse */

var Response = /*#__PURE__*/function () {
  /**
   * @param {CompiledMode} mode
   */
  function Response(mode) {
    _classCallCheck(this, Response);

    // eslint-disable-next-line no-undefined
    if (mode.data === undefined) mode.data = {};
    this.data = mode.data;
    this.isMatchIgnored = false;
  }

  _createClass(Response, [{
    key: "ignoreMatch",
    value: function ignoreMatch() {
      this.isMatchIgnored = true;
    }
  }]);

  return Response;
}();
/**
 * @param {string} value
 * @returns {string}
 */


function escapeHTML(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
}
/**
 * performs a shallow merge of multiple objects into one
 *
 * @template T
 * @param {T} original
 * @param {Record<string,any>[]} objects
 * @returns {T} a single new object
 */


function inherit$1(original) {
  /** @type Record<string,any> */
  var result = Object.create(null);

  for (var key in original) {
    result[key] = original[key];
  }

  for (var _len = arguments.length, objects = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    objects[_key - 1] = arguments[_key];
  }

  objects.forEach(function (obj) {
    for (var _key2 in obj) {
      result[_key2] = obj[_key2];
    }
  });
  return result;
}
/**
 * @typedef {object} Renderer
 * @property {(text: string) => void} addText
 * @property {(node: Node) => void} openNode
 * @property {(node: Node) => void} closeNode
 * @property {() => string} value
 */

/** @typedef {{kind?: string, sublanguage?: boolean}} Node */

/** @typedef {{walk: (r: Renderer) => void}} Tree */

/** */


var SPAN_CLOSE = '</span>';
/**
 * Determines if a node needs to be wrapped in <span>
 *
 * @param {Node} node */

var emitsWrappingTags = function emitsWrappingTags(node) {
  return !!node.kind;
};
/**
 *
 * @param {string} name
 * @param {{prefix:string}} options
 */


var expandScopeName = function expandScopeName(name, _ref) {
  var prefix = _ref.prefix;

  if (name.includes(".")) {
    var pieces = name.split(".");
    return ["".concat(prefix).concat(pieces.shift())].concat(_toConsumableArray(pieces.map(function (x, i) {
      return "".concat(x).concat("_".repeat(i + 1));
    }))).join(" ");
  }

  return "".concat(prefix).concat(name);
};
/** @type {Renderer} */


var HTMLRenderer = /*#__PURE__*/function () {
  /**
   * Creates a new HTMLRenderer
   *
   * @param {Tree} parseTree - the parse tree (must support `walk` API)
   * @param {{classPrefix: string}} options
   */
  function HTMLRenderer(parseTree, options) {
    _classCallCheck(this, HTMLRenderer);

    this.buffer = "";
    this.classPrefix = options.classPrefix;
    parseTree.walk(this);
  }
  /**
   * Adds texts to the output stream
   *
   * @param {string} text */


  _createClass(HTMLRenderer, [{
    key: "addText",
    value: function addText(text) {
      this.buffer += escapeHTML(text);
    }
    /**
     * Adds a node open to the output stream (if needed)
     *
     * @param {Node} node */

  }, {
    key: "openNode",
    value: function openNode(node) {
      if (!emitsWrappingTags(node)) return;
      var scope = node.kind;

      if (node.sublanguage) {
        scope = "language-".concat(scope);
      } else {
        scope = expandScopeName(scope, {
          prefix: this.classPrefix
        });
      }

      this.span(scope);
    }
    /**
     * Adds a node close to the output stream (if needed)
     *
     * @param {Node} node */

  }, {
    key: "closeNode",
    value: function closeNode(node) {
      if (!emitsWrappingTags(node)) return;
      this.buffer += SPAN_CLOSE;
    }
    /**
     * returns the accumulated buffer
    */

  }, {
    key: "value",
    value: function value() {
      return this.buffer;
    } // helpers

    /**
     * Builds a span element
     *
     * @param {string} className */

  }, {
    key: "span",
    value: function span(className) {
      this.buffer += "<span class=\"".concat(className, "\">");
    }
  }]);

  return HTMLRenderer;
}();
/** @typedef {{kind?: string, sublanguage?: boolean, children: Node[]} | string} Node */

/** @typedef {{kind?: string, sublanguage?: boolean, children: Node[]} } DataNode */

/** @typedef {import('highlight.js').Emitter} Emitter */

/**  */


var TokenTree = /*#__PURE__*/function () {
  function TokenTree() {
    _classCallCheck(this, TokenTree);

    /** @type DataNode */
    this.rootNode = {
      children: []
    };
    this.stack = [this.rootNode];
  }

  _createClass(TokenTree, [{
    key: "top",
    get: function get() {
      return this.stack[this.stack.length - 1];
    }
  }, {
    key: "root",
    get: function get() {
      return this.rootNode;
    }
    /** @param {Node} node */

  }, {
    key: "add",
    value: function add(node) {
      this.top.children.push(node);
    }
    /** @param {string} kind */

  }, {
    key: "openNode",
    value: function openNode(kind) {
      /** @type Node */
      var node = {
        kind: kind,
        children: []
      };
      this.add(node);
      this.stack.push(node);
    }
  }, {
    key: "closeNode",
    value: function closeNode() {
      if (this.stack.length > 1) {
        return this.stack.pop();
      } // eslint-disable-next-line no-undefined


      return undefined;
    }
  }, {
    key: "closeAllNodes",
    value: function closeAllNodes() {
      while (this.closeNode()) {
        ;
      }
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return JSON.stringify(this.rootNode, null, 4);
    }
    /**
     * @typedef { import("./html_renderer").Renderer } Renderer
     * @param {Renderer} builder
     */

  }, {
    key: "walk",
    value: function walk(builder) {
      // this does not
      return this.constructor._walk(builder, this.rootNode); // this works
      // return TokenTree._walk(builder, this.rootNode);
    }
    /**
     * @param {Renderer} builder
     * @param {Node} node
     */

  }], [{
    key: "_walk",
    value: function _walk(builder, node) {
      var _this = this;

      if (typeof node === "string") {
        builder.addText(node);
      } else if (node.children) {
        builder.openNode(node);
        node.children.forEach(function (child) {
          return _this._walk(builder, child);
        });
        builder.closeNode(node);
      }

      return builder;
    }
    /**
     * @param {Node} node
     */

  }, {
    key: "_collapse",
    value: function _collapse(node) {
      if (typeof node === "string") return;
      if (!node.children) return;

      if (node.children.every(function (el) {
        return typeof el === "string";
      })) {
        // node.text = node.children.join("");
        // delete node.children;
        node.children = [node.children.join("")];
      } else {
        node.children.forEach(function (child) {
          TokenTree._collapse(child);
        });
      }
    }
  }]);

  return TokenTree;
}();
/**
  Currently this is all private API, but this is the minimal API necessary
  that an Emitter must implement to fully support the parser.

  Minimal interface:

  - addKeyword(text, kind)
  - addText(text)
  - addSublanguage(emitter, subLanguageName)
  - finalize()
  - openNode(kind)
  - closeNode()
  - closeAllNodes()
  - toHTML()

*/

/**
 * @implements {Emitter}
 */


var TokenTreeEmitter = /*#__PURE__*/function (_TokenTree) {
  _inherits(TokenTreeEmitter, _TokenTree);

  var _super = _createSuper(TokenTreeEmitter);

  /**
   * @param {*} options
   */
  function TokenTreeEmitter(options) {
    var _this2;

    _classCallCheck(this, TokenTreeEmitter);

    _this2 = _super.call(this);
    _this2.options = options;
    return _this2;
  }
  /**
   * @param {string} text
   * @param {string} kind
   */


  _createClass(TokenTreeEmitter, [{
    key: "addKeyword",
    value: function addKeyword(text, kind) {
      if (text === "") {
        return;
      }

      this.openNode(kind);
      this.addText(text);
      this.closeNode();
    }
    /**
     * @param {string} text
     */

  }, {
    key: "addText",
    value: function addText(text) {
      if (text === "") {
        return;
      }

      this.add(text);
    }
    /**
     * @param {Emitter & {root: DataNode}} emitter
     * @param {string} name
     */

  }, {
    key: "addSublanguage",
    value: function addSublanguage(emitter, name) {
      /** @type DataNode */
      var node = emitter.root;
      node.kind = name;
      node.sublanguage = true;
      this.add(node);
    }
  }, {
    key: "toHTML",
    value: function toHTML() {
      var renderer = new HTMLRenderer(this, this.options);
      return renderer.value();
    }
  }, {
    key: "finalize",
    value: function finalize() {
      return true;
    }
  }]);

  return TokenTreeEmitter;
}(TokenTree);
/**
 * @param {string} value
 * @returns {RegExp}
 * */

/**
 * @param {RegExp | string } re
 * @returns {string}
 */


function source(re) {
  if (!re) return null;
  if (typeof re === "string") return re;
  return re.source;
}
/**
 * @param {RegExp | string } re
 * @returns {string}
 */


function lookahead(re) {
  return concat('(?=', re, ')');
}
/**
 * @param {RegExp | string } re
 * @returns {string}
 */


function anyNumberOfTimes(re) {
  return concat('(?:', re, ')*');
}
/**
 * @param {RegExp | string } re
 * @returns {string}
 */


function optional(re) {
  return concat('(?:', re, ')?');
}
/**
 * @param {...(RegExp | string) } args
 * @returns {string}
 */


function concat() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
    args[_key3] = arguments[_key3];
  }

  var joined = args.map(function (x) {
    return source(x);
  }).join("");
  return joined;
}
/**
 * @param { Array<string | RegExp | Object> } args
 * @returns {object}
 */


function stripOptionsFromArgs(args) {
  var opts = args[args.length - 1];

  if (_typeof(opts) === 'object' && opts.constructor === Object) {
    args.splice(args.length - 1, 1);
    return opts;
  } else {
    return {};
  }
}
/**
 * Any of the passed expresssions may match
 *
 * Creates a huge this | this | that | that match
 * @param {(RegExp | string)[] } args
 * @returns {string}
 */


function either() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
    args[_key4] = arguments[_key4];
  }

  /** @type { object & {capture?: boolean} }  */
  var opts = stripOptionsFromArgs(args);
  var joined = '(' + (opts.capture ? "" : "?:") + args.map(function (x) {
    return source(x);
  }).join("|") + ")";
  return joined;
}
/**
 * @param {RegExp | string} re
 * @returns {number}
 */


function countMatchGroups(re) {
  return new RegExp(re.toString() + '|').exec('').length - 1;
}
/**
 * Does lexeme start with a regular expression match at the beginning
 * @param {RegExp} re
 * @param {string} lexeme
 */


function startsWith(re, lexeme) {
  var match = re && re.exec(lexeme);
  return match && match.index === 0;
} // BACKREF_RE matches an open parenthesis or backreference. To avoid
// an incorrect parse, it additionally matches the following:
// - [...] elements, where the meaning of parentheses and escapes change
// - other escape sequences, so we do not misparse escape sequences as
//   interesting elements
// - non-matching or lookahead parentheses, which do not capture. These
//   follow the '(' with a '?'.


var BACKREF_RE = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./; // **INTERNAL** Not intended for outside usage
// join logically computes regexps.join(separator), but fixes the
// backreferences so they continue to match.
// it also places each individual regular expression into it's own
// match group, keeping track of the sequencing of those match groups
// is currently an exercise for the caller. :-)

/**
 * @param {(string | RegExp)[]} regexps
 * @param {{joinWith: string}} opts
 * @returns {string}
 */

function _rewriteBackreferences(regexps, _ref2) {
  var joinWith = _ref2.joinWith;
  var numCaptures = 0;
  return regexps.map(function (regex) {
    numCaptures += 1;
    var offset = numCaptures;
    var re = source(regex);
    var out = '';

    while (re.length > 0) {
      var match = BACKREF_RE.exec(re);

      if (!match) {
        out += re;
        break;
      }

      out += re.substring(0, match.index);
      re = re.substring(match.index + match[0].length);

      if (match[0][0] === '\\' && match[1]) {
        // Adjust the backreference.
        out += '\\' + String(Number(match[1]) + offset);
      } else {
        out += match[0];

        if (match[0] === '(') {
          numCaptures++;
        }
      }
    }

    return out;
  }).map(function (re) {
    return "(".concat(re, ")");
  }).join(joinWith);
}
/** @typedef {import('highlight.js').Mode} Mode */

/** @typedef {import('highlight.js').ModeCallback} ModeCallback */
// Common regexps


var MATCH_NOTHING_RE = /\b\B/;
var IDENT_RE = '[a-zA-Z]\\w*';
var UNDERSCORE_IDENT_RE = '[a-zA-Z_]\\w*';
var NUMBER_RE = '\\b\\d+(\\.\\d+)?';
var C_NUMBER_RE = '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)'; // 0x..., 0..., decimal, float

var BINARY_NUMBER_RE = '\\b(0b[01]+)'; // 0b...

var RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~';
/**
* @param { Partial<Mode> & {binary?: string | RegExp} } opts
*/

var SHEBANG = function SHEBANG() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var beginShebang = /^#![ ]*\//;

  if (opts.binary) {
    opts.begin = concat(beginShebang, /.*\b/, opts.binary, /\b.*/);
  }

  return inherit$1({
    scope: 'meta',
    begin: beginShebang,
    end: /$/,
    relevance: 0,

    /** @type {ModeCallback} */
    "on:begin": function onBegin(m, resp) {
      if (m.index !== 0) resp.ignoreMatch();
    }
  }, opts);
}; // Common modes


var BACKSLASH_ESCAPE = {
  begin: '\\\\[\\s\\S]',
  relevance: 0
};
var APOS_STRING_MODE = {
  scope: 'string',
  begin: '\'',
  end: '\'',
  illegal: '\\n',
  contains: [BACKSLASH_ESCAPE]
};
var QUOTE_STRING_MODE = {
  scope: 'string',
  begin: '"',
  end: '"',
  illegal: '\\n',
  contains: [BACKSLASH_ESCAPE]
};
var PHRASAL_WORDS_MODE = {
  begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
};
/**
 * Creates a comment mode
 *
 * @param {string | RegExp} begin
 * @param {string | RegExp} end
 * @param {Mode | {}} [modeOptions]
 * @returns {Partial<Mode>}
 */

var COMMENT = function COMMENT(begin, end) {
  var modeOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var mode = inherit$1({
    scope: 'comment',
    begin: begin,
    end: end,
    contains: []
  }, modeOptions);
  mode.contains.push({
    scope: 'doctag',
    // hack to avoid the space from being included. the space is necessary to
    // match here to prevent the plain text rule below from gobbling up doctags
    begin: '[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)',
    end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
    excludeBegin: true,
    relevance: 0
  });
  var ENGLISH_WORD = either( // list of common 1 and 2 letter words in English
  "I", "a", "is", "so", "us", "to", "at", "if", "in", "it", "on", // note: this is not an exhaustive list of contractions, just popular ones
  /[A-Za-z]+['](d|ve|re|ll|t|s|n)/, // contractions - can't we'd they're let's, etc
  /[A-Za-z]+[-][a-z]+/, // `no-way`, etc.
  /[A-Za-z][a-z]{2,}/ // allow capitalized words at beginning of sentences
  ); // looking like plain text, more likely to be a comment

  mode.contains.push({
    // TODO: how to include ", (, ) without breaking grammars that use these for
    // comment delimiters?
    // begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
    // ---
    // this tries to find sequences of 3 english words in a row (without any
    // "programming" type syntax) this gives us a strong signal that we've
    // TRULY found a comment - vs perhaps scanning with the wrong language.
    // It's possible to find something that LOOKS like the start of the
    // comment - but then if there is no readable text - good chance it is a
    // false match and not a comment.
    //
    // for a visual example please see:
    // https://github.com/highlightjs/highlight.js/issues/2827
    begin: concat(/[ ]+/, // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
    '(', ENGLISH_WORD, /[.]?[:]?([.][ ]|[ ])/, '){3}') // look for 3 words in a row

  });
  return mode;
};

var C_LINE_COMMENT_MODE = COMMENT('//', '$');
var C_BLOCK_COMMENT_MODE = COMMENT('/\\*', '\\*/');
var HASH_COMMENT_MODE = COMMENT('#', '$');
var NUMBER_MODE = {
  scope: 'number',
  begin: NUMBER_RE,
  relevance: 0
};
var C_NUMBER_MODE = {
  scope: 'number',
  begin: C_NUMBER_RE,
  relevance: 0
};
var BINARY_NUMBER_MODE = {
  scope: 'number',
  begin: BINARY_NUMBER_RE,
  relevance: 0
};
var REGEXP_MODE = {
  // this outer rule makes sure we actually have a WHOLE regex and not simply
  // an expression such as:
  //
  //     3 / something
  //
  // (which will then blow up when regex's `illegal` sees the newline)
  begin: /(?=\/[^/\n]*\/)/,
  contains: [{
    scope: 'regexp',
    begin: /\//,
    end: /\/[gimuy]*/,
    illegal: /\n/,
    contains: [BACKSLASH_ESCAPE, {
      begin: /\[/,
      end: /\]/,
      relevance: 0,
      contains: [BACKSLASH_ESCAPE]
    }]
  }]
};
var TITLE_MODE = {
  scope: 'title',
  begin: IDENT_RE,
  relevance: 0
};
var UNDERSCORE_TITLE_MODE = {
  scope: 'title',
  begin: UNDERSCORE_IDENT_RE,
  relevance: 0
};
var METHOD_GUARD = {
  // excludes method names from keyword processing
  begin: '\\.\\s*' + UNDERSCORE_IDENT_RE,
  relevance: 0
};
/**
 * Adds end same as begin mechanics to a mode
 *
 * Your mode must include at least a single () match group as that first match
 * group is what is used for comparison
 * @param {Partial<Mode>} mode
 */

var END_SAME_AS_BEGIN = function END_SAME_AS_BEGIN(mode) {
  return Object.assign(mode, {
    /** @type {ModeCallback} */
    'on:begin': function onBegin(m, resp) {
      resp.data._beginMatch = m[1];
    },

    /** @type {ModeCallback} */
    'on:end': function onEnd(m, resp) {
      if (resp.data._beginMatch !== m[1]) resp.ignoreMatch();
    }
  });
};

var MODES = /*#__PURE__*/Object.freeze({
  __proto__: null,
  MATCH_NOTHING_RE: MATCH_NOTHING_RE,
  IDENT_RE: IDENT_RE,
  UNDERSCORE_IDENT_RE: UNDERSCORE_IDENT_RE,
  NUMBER_RE: NUMBER_RE,
  C_NUMBER_RE: C_NUMBER_RE,
  BINARY_NUMBER_RE: BINARY_NUMBER_RE,
  RE_STARTERS_RE: RE_STARTERS_RE,
  SHEBANG: SHEBANG,
  BACKSLASH_ESCAPE: BACKSLASH_ESCAPE,
  APOS_STRING_MODE: APOS_STRING_MODE,
  QUOTE_STRING_MODE: QUOTE_STRING_MODE,
  PHRASAL_WORDS_MODE: PHRASAL_WORDS_MODE,
  COMMENT: COMMENT,
  C_LINE_COMMENT_MODE: C_LINE_COMMENT_MODE,
  C_BLOCK_COMMENT_MODE: C_BLOCK_COMMENT_MODE,
  HASH_COMMENT_MODE: HASH_COMMENT_MODE,
  NUMBER_MODE: NUMBER_MODE,
  C_NUMBER_MODE: C_NUMBER_MODE,
  BINARY_NUMBER_MODE: BINARY_NUMBER_MODE,
  REGEXP_MODE: REGEXP_MODE,
  TITLE_MODE: TITLE_MODE,
  UNDERSCORE_TITLE_MODE: UNDERSCORE_TITLE_MODE,
  METHOD_GUARD: METHOD_GUARD,
  END_SAME_AS_BEGIN: END_SAME_AS_BEGIN
});
/**
@typedef {import('highlight.js').CallbackResponse} CallbackResponse
@typedef {import('highlight.js').CompilerExt} CompilerExt
*/
// Grammar extensions / plugins
// See: https://github.com/highlightjs/highlight.js/issues/2833
// Grammar extensions allow "syntactic sugar" to be added to the grammar modes
// without requiring any underlying changes to the compiler internals.
// `compileMatch` being the perfect small example of now allowing a grammar
// author to write `match` when they desire to match a single expression rather
// than being forced to use `begin`.  The extension then just moves `match` into
// `begin` when it runs.  Ie, no features have been added, but we've just made
// the experience of writing (and reading grammars) a little bit nicer.
// ------
// TODO: We need negative look-behind support to do this properly

/**
 * Skip a match if it has a preceding dot
 *
 * This is used for `beginKeywords` to prevent matching expressions such as
 * `bob.keyword.do()`. The mode compiler automatically wires this up as a
 * special _internal_ 'on:begin' callback for modes with `beginKeywords`
 * @param {RegExpMatchArray} match
 * @param {CallbackResponse} response
 */

function skipIfHasPrecedingDot(match, response) {
  var before = match.input[match.index - 1];

  if (before === ".") {
    response.ignoreMatch();
  }
}
/**
 *
 * @type {CompilerExt}
 */


function scopeClassName(mode, _parent) {
  // eslint-disable-next-line no-undefined
  if (mode.className !== undefined) {
    mode.scope = mode.className;
    delete mode.className;
  }
}
/**
 * `beginKeywords` syntactic sugar
 * @type {CompilerExt}
 */


function beginKeywords(mode, parent) {
  if (!parent) return;
  if (!mode.beginKeywords) return; // for languages with keywords that include non-word characters checking for
  // a word boundary is not sufficient, so instead we check for a word boundary
  // or whitespace - this does no harm in any case since our keyword engine
  // doesn't allow spaces in keywords anyways and we still check for the boundary
  // first

  mode.begin = '\\b(' + mode.beginKeywords.split(' ').join('|') + ')(?!\\.)(?=\\b|\\s)';
  mode.__beforeBegin = skipIfHasPrecedingDot;
  mode.keywords = mode.keywords || mode.beginKeywords;
  delete mode.beginKeywords; // prevents double relevance, the keywords themselves provide
  // relevance, the mode doesn't need to double it
  // eslint-disable-next-line no-undefined

  if (mode.relevance === undefined) mode.relevance = 0;
}
/**
 * Allow `illegal` to contain an array of illegal values
 * @type {CompilerExt}
 */


function compileIllegal(mode, _parent) {
  if (!Array.isArray(mode.illegal)) return;
  mode.illegal = either.apply(void 0, _toConsumableArray(mode.illegal));
}
/**
 * `match` to match a single expression for readability
 * @type {CompilerExt}
 */


function compileMatch(mode, _parent) {
  if (!mode.match) return;
  if (mode.begin || mode.end) throw new Error("begin & end are not supported with match");
  mode.begin = mode.match;
  delete mode.match;
}
/**
 * provides the default 1 relevance to all modes
 * @type {CompilerExt}
 */


function compileRelevance(mode, _parent) {
  // eslint-disable-next-line no-undefined
  if (mode.relevance === undefined) mode.relevance = 1;
} // allow beforeMatch to act as a "qualifier" for the match
// the full match begin must be [beforeMatch][begin]


var beforeMatchExt = function beforeMatchExt(mode, parent) {
  if (!mode.beforeMatch) return; // starts conflicts with endsParent which we need to make sure the child
  // rule is not matched multiple times

  if (mode.starts) throw new Error("beforeMatch cannot be used with starts");
  var originalMode = Object.assign({}, mode);
  Object.keys(mode).forEach(function (key) {
    delete mode[key];
  });
  mode.keywords = originalMode.keywords;
  mode.begin = concat(originalMode.beforeMatch, lookahead(originalMode.begin));
  mode.starts = {
    relevance: 0,
    contains: [Object.assign(originalMode, {
      endsParent: true
    })]
  };
  mode.relevance = 0;
  delete originalMode.beforeMatch;
}; // keywords that should have no default relevance value


var COMMON_KEYWORDS = ['of', 'and', 'for', 'in', 'not', 'or', 'if', 'then', 'parent', // common variable name
'list', // common variable name
'value' // common variable name
];
var DEFAULT_KEYWORD_SCOPE = "keyword";
/**
 * Given raw keywords from a language definition, compile them.
 *
 * @param {string | Record<string,string|string[]> | Array<string>} rawKeywords
 * @param {boolean} caseInsensitive
 */

function compileKeywords(rawKeywords, caseInsensitive) {
  var scopeName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_KEYWORD_SCOPE;

  /** @type KeywordDict */
  var compiledKeywords = Object.create(null); // input can be a string of keywords, an array of keywords, or a object with
  // named keys representing scopeName (which can then point to a string or array)

  if (typeof rawKeywords === 'string') {
    compileList(scopeName, rawKeywords.split(" "));
  } else if (Array.isArray(rawKeywords)) {
    compileList(scopeName, rawKeywords);
  } else {
    Object.keys(rawKeywords).forEach(function (scopeName) {
      // collapse all our objects back into the parent object
      Object.assign(compiledKeywords, compileKeywords(rawKeywords[scopeName], caseInsensitive, scopeName));
    });
  }

  return compiledKeywords; // ---

  /**
   * Compiles an individual list of keywords
   *
   * Ex: "for if when while|5"
   *
   * @param {string} scopeName
   * @param {Array<string>} keywordList
   */

  function compileList(scopeName, keywordList) {
    if (caseInsensitive) {
      keywordList = keywordList.map(function (x) {
        return x.toLowerCase();
      });
    }

    keywordList.forEach(function (keyword) {
      var pair = keyword.split('|');
      compiledKeywords[pair[0]] = [scopeName, scoreForKeyword(pair[0], pair[1])];
    });
  }
}
/**
 * Returns the proper score for a given keyword
 *
 * Also takes into account comment keywords, which will be scored 0 UNLESS
 * another score has been manually assigned.
 * @param {string} keyword
 * @param {string} [providedScore]
 */


function scoreForKeyword(keyword, providedScore) {
  // manual scores always win over common keywords
  // so you can force a score of 1 if you really insist
  if (providedScore) {
    return Number(providedScore);
  }

  return commonKeyword(keyword) ? 0 : 1;
}
/**
 * Determines if a given keyword is common or not
 *
 * @param {string} keyword */


function commonKeyword(keyword) {
  return COMMON_KEYWORDS.includes(keyword.toLowerCase());
}
/*

For the reasoning behind this please see:
https://github.com/highlightjs/highlight.js/issues/2880#issuecomment-747275419

*/

/**
 * @type {Record<string, boolean>}
 */


var seenDeprecations = {};
/**
 * @param {string} message
 */

var error = function error(message) {
  console.error(message);
};
/**
 * @param {string} message
 * @param {any} args
 */


var warn = function warn(message) {
  var _console;

  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key5 = 1; _key5 < _len4; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  (_console = console).log.apply(_console, ["WARN: ".concat(message)].concat(args));
};
/**
 * @param {string} version
 * @param {string} message
 */


var deprecated = function deprecated(version, message) {
  if (seenDeprecations["".concat(version, "/").concat(message)]) return;
  console.log("Deprecated as of ".concat(version, ". ").concat(message));
  seenDeprecations["".concat(version, "/").concat(message)] = true;
};
/* eslint-disable no-throw-literal */

/**
@typedef {import('highlight.js').CompiledMode} CompiledMode
*/


var MultiClassError = new Error();
/**
 * Renumbers labeled scope names to account for additional inner match
 * groups that otherwise would break everything.
 *
 * Lets say we 3 match scopes:
 *
 *   { 1 => ..., 2 => ..., 3 => ... }
 *
 * So what we need is a clean match like this:
 *
 *   (a)(b)(c) => [ "a", "b", "c" ]
 *
 * But this falls apart with inner match groups:
 *
 * (a)(((b)))(c) => ["a", "b", "b", "b", "c" ]
 *
 * Our scopes are now "out of alignment" and we're repeating `b` 3 times.
 * What needs to happen is the numbers are remapped:
 *
 *   { 1 => ..., 2 => ..., 5 => ... }
 *
 * We also need to know that the ONLY groups that should be output
 * are 1, 2, and 5.  This function handles this behavior.
 *
 * @param {CompiledMode} mode
 * @param {Array<RegExp | string>} regexes
 * @param {{key: "beginScope"|"endScope"}} opts
 */

function remapScopeNames(mode, regexes, _ref3) {
  var key = _ref3.key;
  var offset = 0;
  var scopeNames = mode[key];
  /** @type Record<number,boolean> */

  var emit = {};
  /** @type Record<number,string> */

  var positions = {};

  for (var i = 1; i <= regexes.length; i++) {
    positions[i + offset] = scopeNames[i];
    emit[i + offset] = true;
    offset += countMatchGroups(regexes[i - 1]);
  } // we use _emit to keep track of which match groups are "top-level" to avoid double
  // output from inside match groups


  mode[key] = positions;
  mode[key]._emit = emit;
  mode[key]._multi = true;
}
/**
 * @param {CompiledMode} mode
 */


function beginMultiClass(mode) {
  if (!Array.isArray(mode.begin)) return;

  if (mode.skip || mode.excludeBegin || mode.returnBegin) {
    error("skip, excludeBegin, returnBegin not compatible with beginScope: {}");
    throw MultiClassError;
  }

  if (_typeof(mode.beginScope) !== "object" || mode.beginScope === null) {
    error("beginScope must be object");
    throw MultiClassError;
  }

  remapScopeNames(mode, mode.begin, {
    key: "beginScope"
  });
  mode.begin = _rewriteBackreferences(mode.begin, {
    joinWith: ""
  });
}
/**
 * @param {CompiledMode} mode
 */


function endMultiClass(mode) {
  if (!Array.isArray(mode.end)) return;

  if (mode.skip || mode.excludeEnd || mode.returnEnd) {
    error("skip, excludeEnd, returnEnd not compatible with endScope: {}");
    throw MultiClassError;
  }

  if (_typeof(mode.endScope) !== "object" || mode.endScope === null) {
    error("endScope must be object");
    throw MultiClassError;
  }

  remapScopeNames(mode, mode.end, {
    key: "endScope"
  });
  mode.end = _rewriteBackreferences(mode.end, {
    joinWith: ""
  });
}
/**
 * this exists only to allow `scope: {}` to be used beside `match:`
 * Otherwise `beginScope` would necessary and that would look weird

  {
    match: [ /def/, /\w+/ ]
    scope: { 1: "keyword" , 2: "title" }
  }

 * @param {CompiledMode} mode
 */


function scopeSugar(mode) {
  if (mode.scope && _typeof(mode.scope) === "object" && mode.scope !== null) {
    mode.beginScope = mode.scope;
    delete mode.scope;
  }
}
/**
 * @param {CompiledMode} mode
 */


function MultiClass(mode) {
  scopeSugar(mode);

  if (typeof mode.beginScope === "string") {
    mode.beginScope = {
      _wrap: mode.beginScope
    };
  }

  if (typeof mode.endScope === "string") {
    mode.endScope = {
      _wrap: mode.endScope
    };
  }

  beginMultiClass(mode);
  endMultiClass(mode);
}
/**
@typedef {import('highlight.js').Mode} Mode
@typedef {import('highlight.js').CompiledMode} CompiledMode
@typedef {import('highlight.js').Language} Language
@typedef {import('highlight.js').HLJSPlugin} HLJSPlugin
@typedef {import('highlight.js').CompiledLanguage} CompiledLanguage
*/
// compilation

/**
 * Compiles a language definition result
 *
 * Given the raw result of a language definition (Language), compiles this so
 * that it is ready for highlighting code.
 * @param {Language} language
 * @returns {CompiledLanguage}
 */


function compileLanguage(language) {
  /**
   * Builds a regex with the case sensitivity of the current language
   *
   * @param {RegExp | string} value
   * @param {boolean} [global]
   */
  function langRe(value, global) {
    return new RegExp(source(value), 'm' + (language.case_insensitive ? 'i' : '') + (language.unicodeRegex ? 'u' : '') + (global ? 'g' : ''));
  }
  /**
    Stores multiple regular expressions and allows you to quickly search for
    them all in a string simultaneously - returning the first match.  It does
    this by creating a huge (a|b|c) regex - each individual item wrapped with ()
    and joined by `|` - using match groups to track position.  When a match is
    found checking which position in the array has content allows us to figure
    out which of the original regexes / match groups triggered the match.
     The match object itself (the result of `Regex.exec`) is returned but also
    enhanced by merging in any meta-data that was registered with the regex.
    This is how we keep track of which mode matched, and what type of rule
    (`illegal`, `begin`, end, etc).
  */


  var MultiRegex = /*#__PURE__*/function () {
    function MultiRegex() {
      _classCallCheck(this, MultiRegex);

      this.matchIndexes = {}; // @ts-ignore

      this.regexes = [];
      this.matchAt = 1;
      this.position = 0;
    } // @ts-ignore


    _createClass(MultiRegex, [{
      key: "addRule",
      value: function addRule(re, opts) {
        opts.position = this.position++; // @ts-ignore

        this.matchIndexes[this.matchAt] = opts;
        this.regexes.push([opts, re]);
        this.matchAt += countMatchGroups(re) + 1;
      }
    }, {
      key: "compile",
      value: function compile() {
        if (this.regexes.length === 0) {
          // avoids the need to check length every time exec is called
          // @ts-ignore
          this.exec = function () {
            return null;
          };
        }

        var terminators = this.regexes.map(function (el) {
          return el[1];
        });
        this.matcherRe = langRe(_rewriteBackreferences(terminators, {
          joinWith: '|'
        }), true);
        this.lastIndex = 0;
      }
      /** @param {string} s */

    }, {
      key: "exec",
      value: function exec(s) {
        this.matcherRe.lastIndex = this.lastIndex;
        var match = this.matcherRe.exec(s);

        if (!match) {
          return null;
        } // eslint-disable-next-line no-undefined


        var i = match.findIndex(function (el, i) {
          return i > 0 && el !== undefined;
        }); // @ts-ignore

        var matchData = this.matchIndexes[i]; // trim off any earlier non-relevant match groups (ie, the other regex
        // match groups that make up the multi-matcher)

        match.splice(0, i);
        return Object.assign(match, matchData);
      }
    }]);

    return MultiRegex;
  }();
  /*
    Created to solve the key deficiently with MultiRegex - there is no way to
    test for multiple matches at a single location.  Why would we need to do
    that?  In the future a more dynamic engine will allow certain matches to be
    ignored.  An example: if we matched say the 3rd regex in a large group but
    decided to ignore it - we'd need to started testing again at the 4th
    regex... but MultiRegex itself gives us no real way to do that.
     So what this class creates MultiRegexs on the fly for whatever search
    position they are needed.
     NOTE: These additional MultiRegex objects are created dynamically.  For most
    grammars most of the time we will never actually need anything more than the
    first MultiRegex - so this shouldn't have too much overhead.
     Say this is our search group, and we match regex3, but wish to ignore it.
       regex1 | regex2 | regex3 | regex4 | regex5    ' ie, startAt = 0
     What we need is a new MultiRegex that only includes the remaining
    possibilities:
       regex4 | regex5                               ' ie, startAt = 3
     This class wraps all that complexity up in a simple API... `startAt` decides
    where in the array of expressions to start doing the matching. It
    auto-increments, so if a match is found at position 2, then startAt will be
    set to 3.  If the end is reached startAt will return to 0.
     MOST of the time the parser will be setting startAt manually to 0.
  */


  var ResumableMultiRegex = /*#__PURE__*/function () {
    function ResumableMultiRegex() {
      _classCallCheck(this, ResumableMultiRegex);

      // @ts-ignore
      this.rules = []; // @ts-ignore

      this.multiRegexes = [];
      this.count = 0;
      this.lastIndex = 0;
      this.regexIndex = 0;
    } // @ts-ignore


    _createClass(ResumableMultiRegex, [{
      key: "getMatcher",
      value: function getMatcher(index) {
        if (this.multiRegexes[index]) return this.multiRegexes[index];
        var matcher = new MultiRegex();
        this.rules.slice(index).forEach(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
              re = _ref5[0],
              opts = _ref5[1];

          return matcher.addRule(re, opts);
        });
        matcher.compile();
        this.multiRegexes[index] = matcher;
        return matcher;
      }
    }, {
      key: "resumingScanAtSamePosition",
      value: function resumingScanAtSamePosition() {
        return this.regexIndex !== 0;
      }
    }, {
      key: "considerAll",
      value: function considerAll() {
        this.regexIndex = 0;
      } // @ts-ignore

    }, {
      key: "addRule",
      value: function addRule(re, opts) {
        this.rules.push([re, opts]);
        if (opts.type === "begin") this.count++;
      }
      /** @param {string} s */

    }, {
      key: "exec",
      value: function exec(s) {
        var m = this.getMatcher(this.regexIndex);
        m.lastIndex = this.lastIndex;
        var result = m.exec(s); // The following is because we have no easy way to say "resume scanning at the
        // existing position but also skip the current rule ONLY". What happens is
        // all prior rules are also skipped which can result in matching the wrong
        // thing. Example of matching "booger":
        // our matcher is [string, "booger", number]
        //
        // ....booger....
        // if "booger" is ignored then we'd really need a regex to scan from the
        // SAME position for only: [string, number] but ignoring "booger" (if it
        // was the first match), a simple resume would scan ahead who knows how
        // far looking only for "number", ignoring potential string matches (or
        // future "booger" matches that might be valid.)
        // So what we do: We execute two matchers, one resuming at the same
        // position, but the second full matcher starting at the position after:
        //     /--- resume first regex match here (for [number])
        //     |/---- full match here for [string, "booger", number]
        //     vv
        // ....booger....
        // Which ever results in a match first is then used. So this 3-4 step
        // process essentially allows us to say "match at this position, excluding
        // a prior rule that was ignored".
        //
        // 1. Match "booger" first, ignore. Also proves that [string] does non match.
        // 2. Resume matching for [number]
        // 3. Match at index + 1 for [string, "booger", number]
        // 4. If #2 and #3 result in matches, which came first?

        if (this.resumingScanAtSamePosition()) {
          if (result && result.index === this.lastIndex) ;else {
            // use the second matcher result
            var m2 = this.getMatcher(0);
            m2.lastIndex = this.lastIndex + 1;
            result = m2.exec(s);
          }
        }

        if (result) {
          this.regexIndex += result.position + 1;

          if (this.regexIndex === this.count) {
            // wrap-around to considering all matches again
            this.considerAll();
          }
        }

        return result;
      }
    }]);

    return ResumableMultiRegex;
  }();
  /**
   * Given a mode, builds a huge ResumableMultiRegex that can be used to walk
   * the content and find matches.
   *
   * @param {CompiledMode} mode
   * @returns {ResumableMultiRegex}
   */


  function buildModeRegex(mode) {
    var mm = new ResumableMultiRegex();
    mode.contains.forEach(function (term) {
      return mm.addRule(term.begin, {
        rule: term,
        type: "begin"
      });
    });

    if (mode.terminatorEnd) {
      mm.addRule(mode.terminatorEnd, {
        type: "end"
      });
    }

    if (mode.illegal) {
      mm.addRule(mode.illegal, {
        type: "illegal"
      });
    }

    return mm;
  }
  /** skip vs abort vs ignore
   *
   * @skip   - The mode is still entered and exited normally (and contains rules apply),
   *           but all content is held and added to the parent buffer rather than being
   *           output when the mode ends.  Mostly used with `sublanguage` to build up
   *           a single large buffer than can be parsed by sublanguage.
   *
   *             - The mode begin ands ends normally.
   *             - Content matched is added to the parent mode buffer.
   *             - The parser cursor is moved forward normally.
   *
   * @abort  - A hack placeholder until we have ignore.  Aborts the mode (as if it
   *           never matched) but DOES NOT continue to match subsequent `contains`
   *           modes.  Abort is bad/suboptimal because it can result in modes
   *           farther down not getting applied because an earlier rule eats the
   *           content but then aborts.
   *
   *             - The mode does not begin.
   *             - Content matched by `begin` is added to the mode buffer.
   *             - The parser cursor is moved forward accordingly.
   *
   * @ignore - Ignores the mode (as if it never matched) and continues to match any
   *           subsequent `contains` modes.  Ignore isn't technically possible with
   *           the current parser implementation.
   *
   *             - The mode does not begin.
   *             - Content matched by `begin` is ignored.
   *             - The parser cursor is not moved forward.
   */

  /**
   * Compiles an individual mode
   *
   * This can raise an error if the mode contains certain detectable known logic
   * issues.
   * @param {Mode} mode
   * @param {CompiledMode | null} [parent]
   * @returns {CompiledMode | never}
   */


  function compileMode(mode, parent) {
    var _ref6;

    var cmode = mode;
    if (mode.isCompiled) return cmode;
    [scopeClassName, // do this early so compiler extensions generally don't have to worry about
    // the distinction between match/begin
    compileMatch, MultiClass, beforeMatchExt].forEach(function (ext) {
      return ext(mode, parent);
    });
    language.compilerExtensions.forEach(function (ext) {
      return ext(mode, parent);
    }); // __beforeBegin is considered private API, internal use only

    mode.__beforeBegin = null;
    [beginKeywords, // do this later so compiler extensions that come earlier have access to the
    // raw array if they wanted to perhaps manipulate it, etc.
    compileIllegal, // default to 1 relevance if not specified
    compileRelevance].forEach(function (ext) {
      return ext(mode, parent);
    });
    mode.isCompiled = true;
    var keywordPattern = null;

    if (_typeof(mode.keywords) === "object" && mode.keywords.$pattern) {
      // we need a copy because keywords might be compiled multiple times
      // so we can't go deleting $pattern from the original on the first
      // pass
      mode.keywords = Object.assign({}, mode.keywords);
      keywordPattern = mode.keywords.$pattern;
      delete mode.keywords.$pattern;
    }

    keywordPattern = keywordPattern || /\w+/;

    if (mode.keywords) {
      mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);
    }

    cmode.keywordPatternRe = langRe(keywordPattern, true);

    if (parent) {
      if (!mode.begin) mode.begin = /\B|\b/;
      cmode.beginRe = langRe(cmode.begin);
      if (!mode.end && !mode.endsWithParent) mode.end = /\B|\b/;
      if (mode.end) cmode.endRe = langRe(cmode.end);
      cmode.terminatorEnd = source(cmode.end) || '';

      if (mode.endsWithParent && parent.terminatorEnd) {
        cmode.terminatorEnd += (mode.end ? '|' : '') + parent.terminatorEnd;
      }
    }

    if (mode.illegal) cmode.illegalRe = langRe(mode.illegal);
    if (!mode.contains) mode.contains = [];
    mode.contains = (_ref6 = []).concat.apply(_ref6, _toConsumableArray(mode.contains.map(function (c) {
      return expandOrCloneMode(c === 'self' ? mode : c);
    })));
    mode.contains.forEach(function (c) {
      compileMode(c, cmode);
    });

    if (mode.starts) {
      compileMode(mode.starts, parent);
    }

    cmode.matcher = buildModeRegex(cmode);
    return cmode;
  }

  if (!language.compilerExtensions) language.compilerExtensions = []; // self is not valid at the top-level

  if (language.contains && language.contains.includes('self')) {
    throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
  } // we need a null object, which inherit will guarantee


  language.classNameAliases = inherit$1(language.classNameAliases || {});
  return compileMode(language);
}
/**
 * Determines if a mode has a dependency on it's parent or not
 *
 * If a mode does have a parent dependency then often we need to clone it if
 * it's used in multiple places so that each copy points to the correct parent,
 * where-as modes without a parent can often safely be re-used at the bottom of
 * a mode chain.
 *
 * @param {Mode | null} mode
 * @returns {boolean} - is there a dependency on the parent?
 * */


function dependencyOnParent(mode) {
  if (!mode) return false;
  return mode.endsWithParent || dependencyOnParent(mode.starts);
}
/**
 * Expands a mode or clones it if necessary
 *
 * This is necessary for modes with parental dependenceis (see notes on
 * `dependencyOnParent`) and for nodes that have `variants` - which must then be
 * exploded into their own individual modes at compile time.
 *
 * @param {Mode} mode
 * @returns {Mode | Mode[]}
 * */


function expandOrCloneMode(mode) {
  if (mode.variants && !mode.cachedVariants) {
    mode.cachedVariants = mode.variants.map(function (variant) {
      return inherit$1(mode, {
        variants: null
      }, variant);
    });
  } // EXPAND
  // if we have variants then essentially "replace" the mode with the variants
  // this happens in compileMode, where this function is called from


  if (mode.cachedVariants) {
    return mode.cachedVariants;
  } // CLONE
  // if we have dependencies on parents then we need a unique
  // instance of ourselves, so we can be reused with many
  // different parents without issue


  if (dependencyOnParent(mode)) {
    return inherit$1(mode, {
      starts: mode.starts ? inherit$1(mode.starts) : null
    });
  }

  if (Object.isFrozen(mode)) {
    return inherit$1(mode);
  } // no special dependency issues, just return ourselves


  return mode;
}

var version = "11.3.1";

var HTMLInjectionError = /*#__PURE__*/function (_Error) {
  _inherits(HTMLInjectionError, _Error);

  var _super2 = _createSuper(HTMLInjectionError);

  function HTMLInjectionError(reason, html) {
    var _this3;

    _classCallCheck(this, HTMLInjectionError);

    _this3 = _super2.call(this, reason);
    _this3.name = "HTMLInjectionError";
    _this3.html = html;
    return _this3;
  }

  return HTMLInjectionError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/*
Syntax highlighting with language autodetection.
https://highlightjs.org/
*/

/**
@typedef {import('highlight.js').Mode} Mode
@typedef {import('highlight.js').CompiledMode} CompiledMode
@typedef {import('highlight.js').CompiledScope} CompiledScope
@typedef {import('highlight.js').Language} Language
@typedef {import('highlight.js').HLJSApi} HLJSApi
@typedef {import('highlight.js').HLJSPlugin} HLJSPlugin
@typedef {import('highlight.js').PluginEvent} PluginEvent
@typedef {import('highlight.js').HLJSOptions} HLJSOptions
@typedef {import('highlight.js').LanguageFn} LanguageFn
@typedef {import('highlight.js').HighlightedHTMLElement} HighlightedHTMLElement
@typedef {import('highlight.js').BeforeHighlightContext} BeforeHighlightContext
@typedef {import('highlight.js/private').MatchType} MatchType
@typedef {import('highlight.js/private').KeywordData} KeywordData
@typedef {import('highlight.js/private').EnhancedMatch} EnhancedMatch
@typedef {import('highlight.js/private').AnnotatedError} AnnotatedError
@typedef {import('highlight.js').AutoHighlightResult} AutoHighlightResult
@typedef {import('highlight.js').HighlightOptions} HighlightOptions
@typedef {import('highlight.js').HighlightResult} HighlightResult
*/


var escape = escapeHTML;
var inherit = inherit$1;
var NO_MATCH = Symbol("nomatch");
var MAX_KEYWORD_HITS = 7;
/**
 * @param {any} hljs - object that is extended (legacy)
 * @returns {HLJSApi}
 */

var HLJS = function HLJS(hljs) {
  // Global internal variables used within the highlight.js library.

  /** @type {Record<string, Language>} */
  var languages = Object.create(null);
  /** @type {Record<string, string>} */

  var aliases = Object.create(null);
  /** @type {HLJSPlugin[]} */

  var plugins = []; // safe/production mode - swallows more errors, tries to keep running
  // even if a single syntax or parse hits a fatal error

  var SAFE_MODE = true;
  var LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";
  /** @type {Language} */

  var PLAINTEXT_LANGUAGE = {
    disableAutodetect: true,
    name: 'Plain text',
    contains: []
  }; // Global options used when within external APIs. This is modified when
  // calling the `hljs.configure` function.

  /** @type HLJSOptions */

  var options = {
    ignoreUnescapedHTML: false,
    throwUnescapedHTML: false,
    noHighlightRe: /^(no-?highlight)$/i,
    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
    classPrefix: 'hljs-',
    cssSelector: 'pre code',
    languages: null,
    // beta configuration options, subject to change, welcome to discuss
    // https://github.com/highlightjs/highlight.js/issues/1086
    __emitter: TokenTreeEmitter
  };
  /* Utility functions */

  /**
   * Tests a language name to see if highlighting should be skipped
   * @param {string} languageName
   */

  function shouldNotHighlight(languageName) {
    return options.noHighlightRe.test(languageName);
  }
  /**
   * @param {HighlightedHTMLElement} block - the HTML element to determine language for
   */


  function blockLanguage(block) {
    var classes = block.className + ' ';
    classes += block.parentNode ? block.parentNode.className : ''; // language-* takes precedence over non-prefixed class names.

    var match = options.languageDetectRe.exec(classes);

    if (match) {
      var language = getLanguage(match[1]);

      if (!language) {
        warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
        warn("Falling back to no-highlight mode for this block.", block);
      }

      return language ? match[1] : 'no-highlight';
    }

    return classes.split(/\s+/).find(function (_class) {
      return shouldNotHighlight(_class) || getLanguage(_class);
    });
  }
  /**
   * Core highlighting function.
   *
   * OLD API
   * highlight(lang, code, ignoreIllegals, continuation)
   *
   * NEW API
   * highlight(code, {lang, ignoreIllegals})
   *
   * @param {string} codeOrLanguageName - the language to use for highlighting
   * @param {string | HighlightOptions} optionsOrCode - the code to highlight
   * @param {boolean} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
   *
   * @returns {HighlightResult} Result - an object that represents the result
   * @property {string} language - the language name
   * @property {number} relevance - the relevance score
   * @property {string} value - the highlighted HTML code
   * @property {string} code - the original raw code
   * @property {CompiledMode} top - top of the current mode stack
   * @property {boolean} illegal - indicates whether any illegal matches were found
  */


  function highlight(codeOrLanguageName, optionsOrCode, ignoreIllegals) {
    var code = "";
    var languageName = "";

    if (_typeof(optionsOrCode) === "object") {
      code = codeOrLanguageName;
      ignoreIllegals = optionsOrCode.ignoreIllegals;
      languageName = optionsOrCode.language;
    } else {
      // old API
      deprecated("10.7.0", "highlight(lang, code, ...args) has been deprecated.");
      deprecated("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277");
      languageName = codeOrLanguageName;
      code = optionsOrCode;
    } // https://github.com/highlightjs/highlight.js/issues/3149
    // eslint-disable-next-line no-undefined


    if (ignoreIllegals === undefined) {
      ignoreIllegals = true;
    }
    /** @type {BeforeHighlightContext} */


    var context = {
      code: code,
      language: languageName
    }; // the plugin can change the desired language or the code to be highlighted
    // just be changing the object it was passed

    fire("before:highlight", context); // a before plugin can usurp the result completely by providing it's own
    // in which case we don't even need to call highlight

    var result = context.result ? context.result : _highlight(context.language, context.code, ignoreIllegals);
    result.code = context.code; // the plugin can change anything in result to suite it

    fire("after:highlight", result);
    return result;
  }
  /**
   * private highlight that's used internally and does not fire callbacks
   *
   * @param {string} languageName - the language to use for highlighting
   * @param {string} codeToHighlight - the code to highlight
   * @param {boolean?} [ignoreIllegals] - whether to ignore illegal matches, default is to bail
   * @param {CompiledMode?} [continuation] - current continuation mode, if any
   * @returns {HighlightResult} - result of the highlight operation
  */


  function _highlight(languageName, codeToHighlight, ignoreIllegals, continuation) {
    var keywordHits = Object.create(null);
    /**
     * Return keyword data if a match is a keyword
     * @param {CompiledMode} mode - current mode
     * @param {string} matchText - the textual match
     * @returns {KeywordData | false}
     */

    function keywordData(mode, matchText) {
      return mode.keywords[matchText];
    }

    function processKeywords() {
      if (!top.keywords) {
        emitter.addText(modeBuffer);
        return;
      }

      var lastIndex = 0;
      top.keywordPatternRe.lastIndex = 0;
      var match = top.keywordPatternRe.exec(modeBuffer);
      var buf = "";

      while (match) {
        buf += modeBuffer.substring(lastIndex, match.index);
        var word = language.case_insensitive ? match[0].toLowerCase() : match[0];
        var data = keywordData(top, word);

        if (data) {
          var _data = _slicedToArray(data, 2),
              kind = _data[0],
              keywordRelevance = _data[1];

          emitter.addText(buf);
          buf = "";
          keywordHits[word] = (keywordHits[word] || 0) + 1;
          if (keywordHits[word] <= MAX_KEYWORD_HITS) relevance += keywordRelevance;

          if (kind.startsWith("_")) {
            // _ implied for relevance only, do not highlight
            // by applying a class name
            buf += match[0];
          } else {
            var cssClass = language.classNameAliases[kind] || kind;
            emitter.addKeyword(match[0], cssClass);
          }
        } else {
          buf += match[0];
        }

        lastIndex = top.keywordPatternRe.lastIndex;
        match = top.keywordPatternRe.exec(modeBuffer);
      }

      buf += modeBuffer.substr(lastIndex);
      emitter.addText(buf);
    }

    function processSubLanguage() {
      if (modeBuffer === "") return;
      /** @type HighlightResult */

      var result = null;

      if (typeof top.subLanguage === 'string') {
        if (!languages[top.subLanguage]) {
          emitter.addText(modeBuffer);
          return;
        }

        result = _highlight(top.subLanguage, modeBuffer, true, continuations[top.subLanguage]);
        continuations[top.subLanguage] = result._top;
      } else {
        result = highlightAuto(modeBuffer, top.subLanguage.length ? top.subLanguage : null);
      } // Counting embedded language score towards the host language may be disabled
      // with zeroing the containing mode relevance. Use case in point is Markdown that
      // allows XML everywhere and makes every XML snippet to have a much larger Markdown
      // score.


      if (top.relevance > 0) {
        relevance += result.relevance;
      }

      emitter.addSublanguage(result._emitter, result.language);
    }

    function processBuffer() {
      if (top.subLanguage != null) {
        processSubLanguage();
      } else {
        processKeywords();
      }

      modeBuffer = '';
    }
    /**
     * @param {CompiledScope} scope
     * @param {RegExpMatchArray} match
     */


    function emitMultiClass(scope, match) {
      var i = 1; // eslint-disable-next-line no-undefined

      while (match[i] !== undefined) {
        if (!scope._emit[i]) {
          i++;
          continue;
        }

        var klass = language.classNameAliases[scope[i]] || scope[i];
        var text = match[i];

        if (klass) {
          emitter.addKeyword(text, klass);
        } else {
          modeBuffer = text;
          processKeywords();
          modeBuffer = "";
        }

        i++;
      }
    }
    /**
     * @param {CompiledMode} mode - new mode to start
     * @param {RegExpMatchArray} match
     */


    function startNewMode(mode, match) {
      if (mode.scope && typeof mode.scope === "string") {
        emitter.openNode(language.classNameAliases[mode.scope] || mode.scope);
      }

      if (mode.beginScope) {
        // beginScope just wraps the begin match itself in a scope
        if (mode.beginScope._wrap) {
          emitter.addKeyword(modeBuffer, language.classNameAliases[mode.beginScope._wrap] || mode.beginScope._wrap);
          modeBuffer = "";
        } else if (mode.beginScope._multi) {
          // at this point modeBuffer should just be the match
          emitMultiClass(mode.beginScope, match);
          modeBuffer = "";
        }
      }

      top = Object.create(mode, {
        parent: {
          value: top
        }
      });
      return top;
    }
    /**
     * @param {CompiledMode } mode - the mode to potentially end
     * @param {RegExpMatchArray} match - the latest match
     * @param {string} matchPlusRemainder - match plus remainder of content
     * @returns {CompiledMode | void} - the next mode, or if void continue on in current mode
     */


    function endOfMode(mode, match, matchPlusRemainder) {
      var matched = startsWith(mode.endRe, matchPlusRemainder);

      if (matched) {
        if (mode["on:end"]) {
          var resp = new Response(mode);
          mode["on:end"](match, resp);
          if (resp.isMatchIgnored) matched = false;
        }

        if (matched) {
          while (mode.endsParent && mode.parent) {
            mode = mode.parent;
          }

          return mode;
        }
      } // even if on:end fires an `ignore` it's still possible
      // that we might trigger the end node because of a parent mode


      if (mode.endsWithParent) {
        return endOfMode(mode.parent, match, matchPlusRemainder);
      }
    }
    /**
     * Handle matching but then ignoring a sequence of text
     *
     * @param {string} lexeme - string containing full match text
     */


    function doIgnore(lexeme) {
      if (top.matcher.regexIndex === 0) {
        // no more regexes to potentially match here, so we move the cursor forward one
        // space
        modeBuffer += lexeme[0];
        return 1;
      } else {
        // no need to move the cursor, we still have additional regexes to try and
        // match at this very spot
        resumeScanAtSamePosition = true;
        return 0;
      }
    }
    /**
     * Handle the start of a new potential mode match
     *
     * @param {EnhancedMatch} match - the current match
     * @returns {number} how far to advance the parse cursor
     */


    function doBeginMatch(match) {
      var lexeme = match[0];
      var newMode = match.rule;
      var resp = new Response(newMode); // first internal before callbacks, then the public ones

      var beforeCallbacks = [newMode.__beforeBegin, newMode["on:begin"]];

      for (var _i2 = 0, _beforeCallbacks = beforeCallbacks; _i2 < _beforeCallbacks.length; _i2++) {
        var cb = _beforeCallbacks[_i2];
        if (!cb) continue;
        cb(match, resp);
        if (resp.isMatchIgnored) return doIgnore(lexeme);
      }

      if (newMode.skip) {
        modeBuffer += lexeme;
      } else {
        if (newMode.excludeBegin) {
          modeBuffer += lexeme;
        }

        processBuffer();

        if (!newMode.returnBegin && !newMode.excludeBegin) {
          modeBuffer = lexeme;
        }
      }

      startNewMode(newMode, match);
      return newMode.returnBegin ? 0 : lexeme.length;
    }
    /**
     * Handle the potential end of mode
     *
     * @param {RegExpMatchArray} match - the current match
     */


    function doEndMatch(match) {
      var lexeme = match[0];
      var matchPlusRemainder = codeToHighlight.substr(match.index);
      var endMode = endOfMode(top, match, matchPlusRemainder);

      if (!endMode) {
        return NO_MATCH;
      }

      var origin = top;

      if (top.endScope && top.endScope._wrap) {
        processBuffer();
        emitter.addKeyword(lexeme, top.endScope._wrap);
      } else if (top.endScope && top.endScope._multi) {
        processBuffer();
        emitMultiClass(top.endScope, match);
      } else if (origin.skip) {
        modeBuffer += lexeme;
      } else {
        if (!(origin.returnEnd || origin.excludeEnd)) {
          modeBuffer += lexeme;
        }

        processBuffer();

        if (origin.excludeEnd) {
          modeBuffer = lexeme;
        }
      }

      do {
        if (top.scope) {
          emitter.closeNode();
        }

        if (!top.skip && !top.subLanguage) {
          relevance += top.relevance;
        }

        top = top.parent;
      } while (top !== endMode.parent);

      if (endMode.starts) {
        startNewMode(endMode.starts, match);
      }

      return origin.returnEnd ? 0 : lexeme.length;
    }

    function processContinuations() {
      var list = [];

      for (var current = top; current !== language; current = current.parent) {
        if (current.scope) {
          list.unshift(current.scope);
        }
      }

      list.forEach(function (item) {
        return emitter.openNode(item);
      });
    }
    /** @type {{type?: MatchType, index?: number, rule?: Mode}}} */


    var lastMatch = {};
    /**
     *  Process an individual match
     *
     * @param {string} textBeforeMatch - text preceding the match (since the last match)
     * @param {EnhancedMatch} [match] - the match itself
     */

    function processLexeme(textBeforeMatch, match) {
      var lexeme = match && match[0]; // add non-matched text to the current mode buffer

      modeBuffer += textBeforeMatch;

      if (lexeme == null) {
        processBuffer();
        return 0;
      } // we've found a 0 width match and we're stuck, so we need to advance
      // this happens when we have badly behaved rules that have optional matchers to the degree that
      // sometimes they can end up matching nothing at all
      // Ref: https://github.com/highlightjs/highlight.js/issues/2140


      if (lastMatch.type === "begin" && match.type === "end" && lastMatch.index === match.index && lexeme === "") {
        // spit the "skipped" character that our regex choked on back into the output sequence
        modeBuffer += codeToHighlight.slice(match.index, match.index + 1);

        if (!SAFE_MODE) {
          /** @type {AnnotatedError} */
          var err = new Error("0 width match regex (".concat(languageName, ")"));
          err.languageName = languageName;
          err.badRule = lastMatch.rule;
          throw err;
        }

        return 1;
      }

      lastMatch = match;

      if (match.type === "begin") {
        return doBeginMatch(match);
      } else if (match.type === "illegal" && !ignoreIllegals) {
        // illegal match, we do not continue processing

        /** @type {AnnotatedError} */
        var _err = new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.scope || '<unnamed>') + '"');

        _err.mode = top;
        throw _err;
      } else if (match.type === "end") {
        var processed = doEndMatch(match);

        if (processed !== NO_MATCH) {
          return processed;
        }
      } // edge case for when illegal matches $ (end of line) which is technically
      // a 0 width match but not a begin/end match so it's not caught by the
      // first handler (when ignoreIllegals is true)


      if (match.type === "illegal" && lexeme === "") {
        // advance so we aren't stuck in an infinite loop
        return 1;
      } // infinite loops are BAD, this is a last ditch catch all. if we have a
      // decent number of iterations yet our index (cursor position in our
      // parsing) still 3x behind our index then something is very wrong
      // so we bail


      if (iterations > 100000 && iterations > match.index * 3) {
        var _err2 = new Error('potential infinite loop, way more iterations than matches');

        throw _err2;
      }
      /*
      Why might be find ourselves here?  An potential end match that was
      triggered but could not be completed.  IE, `doEndMatch` returned NO_MATCH.
      (this could be because a callback requests the match be ignored, etc)
       This causes no real harm other than stopping a few times too many.
      */


      modeBuffer += lexeme;
      return lexeme.length;
    }

    var language = getLanguage(languageName);

    if (!language) {
      error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
      throw new Error('Unknown language: "' + languageName + '"');
    }

    var md = compileLanguage(language);
    var result = '';
    /** @type {CompiledMode} */

    var top = continuation || md;
    /** @type Record<string,CompiledMode> */

    var continuations = {}; // keep continuations for sub-languages

    var emitter = new options.__emitter(options);
    processContinuations();
    var modeBuffer = '';
    var relevance = 0;
    var index = 0;
    var iterations = 0;
    var resumeScanAtSamePosition = false;

    try {
      top.matcher.considerAll();

      for (;;) {
        iterations++;

        if (resumeScanAtSamePosition) {
          // only regexes not matched previously will now be
          // considered for a potential match
          resumeScanAtSamePosition = false;
        } else {
          top.matcher.considerAll();
        }

        top.matcher.lastIndex = index;
        var match = top.matcher.exec(codeToHighlight); // console.log("match", match[0], match.rule && match.rule.begin)

        if (!match) break;
        var beforeMatch = codeToHighlight.substring(index, match.index);
        var processedCount = processLexeme(beforeMatch, match);
        index = match.index + processedCount;
      }

      processLexeme(codeToHighlight.substr(index));
      emitter.closeAllNodes();
      emitter.finalize();
      result = emitter.toHTML();
      return {
        language: languageName,
        value: result,
        relevance: relevance,
        illegal: false,
        _emitter: emitter,
        _top: top
      };
    } catch (err) {
      if (err.message && err.message.includes('Illegal')) {
        return {
          language: languageName,
          value: escape(codeToHighlight),
          illegal: true,
          relevance: 0,
          _illegalBy: {
            message: err.message,
            index: index,
            context: codeToHighlight.slice(index - 100, index + 100),
            mode: err.mode,
            resultSoFar: result
          },
          _emitter: emitter
        };
      } else if (SAFE_MODE) {
        return {
          language: languageName,
          value: escape(codeToHighlight),
          illegal: false,
          relevance: 0,
          errorRaised: err,
          _emitter: emitter,
          _top: top
        };
      } else {
        throw err;
      }
    }
  }
  /**
   * returns a valid highlight result, without actually doing any actual work,
   * auto highlight starts with this and it's possible for small snippets that
   * auto-detection may not find a better match
   * @param {string} code
   * @returns {HighlightResult}
   */


  function justTextHighlightResult(code) {
    var result = {
      value: escape(code),
      illegal: false,
      relevance: 0,
      _top: PLAINTEXT_LANGUAGE,
      _emitter: new options.__emitter(options)
    };

    result._emitter.addText(code);

    return result;
  }
  /**
  Highlighting with language detection. Accepts a string with the code to
  highlight. Returns an object with the following properties:
   - language (detected language)
  - relevance (int)
  - value (an HTML string with highlighting markup)
  - secondBest (object with the same structure for second-best heuristically
    detected language, may be absent)
     @param {string} code
    @param {Array<string>} [languageSubset]
    @returns {AutoHighlightResult}
  */


  function highlightAuto(code, languageSubset) {
    languageSubset = languageSubset || options.languages || Object.keys(languages);
    var plaintext = justTextHighlightResult(code);
    var results = languageSubset.filter(getLanguage).filter(autoDetection).map(function (name) {
      return _highlight(name, code, false);
    });
    results.unshift(plaintext); // plaintext is always an option

    var sorted = results.sort(function (a, b) {
      // sort base on relevance
      if (a.relevance !== b.relevance) return b.relevance - a.relevance; // always award the tie to the base language
      // ie if C++ and Arduino are tied, it's more likely to be C++

      if (a.language && b.language) {
        if (getLanguage(a.language).supersetOf === b.language) {
          return 1;
        } else if (getLanguage(b.language).supersetOf === a.language) {
          return -1;
        }
      } // otherwise say they are equal, which has the effect of sorting on
      // relevance while preserving the original ordering - which is how ties
      // have historically been settled, ie the language that comes first always
      // wins in the case of a tie


      return 0;
    });

    var _sorted = _slicedToArray(sorted, 2),
        best = _sorted[0],
        secondBest = _sorted[1];
    /** @type {AutoHighlightResult} */


    var result = best;
    result.secondBest = secondBest;
    return result;
  }
  /**
   * Builds new class name for block given the language name
   *
   * @param {HTMLElement} element
   * @param {string} [currentLang]
   * @param {string} [resultLang]
   */


  function updateClassName(element, currentLang, resultLang) {
    var language = currentLang && aliases[currentLang] || resultLang;
    element.classList.add("hljs");
    element.classList.add("language-".concat(language));
  }
  /**
   * Applies highlighting to a DOM node containing code.
   *
   * @param {HighlightedHTMLElement} element - the HTML element to highlight
  */


  function highlightElement(element) {
    /** @type HTMLElement */
    var node = null;
    var language = blockLanguage(element);
    if (shouldNotHighlight(language)) return;
    fire("before:highlightElement", {
      el: element,
      language: language
    }); // we should be all text, no child nodes (unescaped HTML) - this is possibly
    // an HTML injection attack - it's likely too late if this is already in
    // production (the code has likely already done its damage by the time
    // we're seeing it)... but we yell loudly about this so that hopefully it's
    // more likely to be caught in development before making it to production

    if (element.children.length > 0) {
      if (!options.ignoreUnescapedHTML) {
        console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk.");
        console.warn("https://github.com/highlightjs/highlight.js/issues/2886");
        console.warn(element);
      }

      if (options.throwUnescapedHTML) {
        var err = new HTMLInjectionError("One of your code blocks includes unescaped HTML.", element.innerHTML);
        throw err;
      }
    }

    node = element;
    var text = node.textContent;
    var result = language ? highlight(text, {
      language: language,
      ignoreIllegals: true
    }) : highlightAuto(text);
    element.innerHTML = result.value;
    updateClassName(element, language, result.language);
    element.result = {
      language: result.language,
      // TODO: remove with version 11.0
      re: result.relevance,
      relevance: result.relevance
    };

    if (result.secondBest) {
      element.secondBest = {
        language: result.secondBest.language,
        relevance: result.secondBest.relevance
      };
    }

    fire("after:highlightElement", {
      el: element,
      result: result,
      text: text
    });
  }
  /**
   * Updates highlight.js global options with the passed options
   *
   * @param {Partial<HLJSOptions>} userOptions
   */


  function configure(userOptions) {
    options = inherit(options, userOptions);
  } // TODO: remove v12, deprecated


  var initHighlighting = function initHighlighting() {
    highlightAll();
    deprecated("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
  }; // TODO: remove v12, deprecated


  function initHighlightingOnLoad() {
    highlightAll();
    deprecated("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
  }

  var wantsHighlight = false;
  /**
   * auto-highlights all pre>code elements on the page
   */

  function highlightAll() {
    // if we are called too early in the loading process
    if (document.readyState === "loading") {
      wantsHighlight = true;
      return;
    }

    var blocks = document.querySelectorAll(options.cssSelector);
    blocks.forEach(highlightElement);
  }

  function boot() {
    // if a highlight was requested before DOM was loaded, do now
    if (wantsHighlight) highlightAll();
  } // make sure we are in the browser environment


  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('DOMContentLoaded', boot, false);
  }
  /**
   * Register a language grammar module
   *
   * @param {string} languageName
   * @param {LanguageFn} languageDefinition
   */


  function registerLanguage(languageName, languageDefinition) {
    var lang = null;

    try {
      lang = languageDefinition(hljs);
    } catch (error$1) {
      error("Language definition for '{}' could not be registered.".replace("{}", languageName)); // hard or soft error

      if (!SAFE_MODE) {
        throw error$1;
      } else {
        error(error$1);
      } // languages that have serious errors are replaced with essentially a
      // "plaintext" stand-in so that the code blocks will still get normal
      // css classes applied to them - and one bad language won't break the
      // entire highlighter


      lang = PLAINTEXT_LANGUAGE;
    } // give it a temporary name if it doesn't have one in the meta-data


    if (!lang.name) lang.name = languageName;
    languages[languageName] = lang;
    lang.rawDefinition = languageDefinition.bind(null, hljs);

    if (lang.aliases) {
      registerAliases(lang.aliases, {
        languageName: languageName
      });
    }
  }
  /**
   * Remove a language grammar module
   *
   * @param {string} languageName
   */


  function unregisterLanguage(languageName) {
    delete languages[languageName];

    for (var _i3 = 0, _Object$keys = Object.keys(aliases); _i3 < _Object$keys.length; _i3++) {
      var alias = _Object$keys[_i3];

      if (aliases[alias] === languageName) {
        delete aliases[alias];
      }
    }
  }
  /**
   * @returns {string[]} List of language internal names
   */


  function listLanguages() {
    return Object.keys(languages);
  }
  /**
   * @param {string} name - name of the language to retrieve
   * @returns {Language | undefined}
   */


  function getLanguage(name) {
    name = (name || '').toLowerCase();
    return languages[name] || languages[aliases[name]];
  }
  /**
   *
   * @param {string|string[]} aliasList - single alias or list of aliases
   * @param {{languageName: string}} opts
   */


  function registerAliases(aliasList, _ref7) {
    var languageName = _ref7.languageName;

    if (typeof aliasList === 'string') {
      aliasList = [aliasList];
    }

    aliasList.forEach(function (alias) {
      aliases[alias.toLowerCase()] = languageName;
    });
  }
  /**
   * Determines if a given language has auto-detection enabled
   * @param {string} name - name of the language
   */


  function autoDetection(name) {
    var lang = getLanguage(name);
    return lang && !lang.disableAutodetect;
  }
  /**
   * Upgrades the old highlightBlock plugins to the new
   * highlightElement API
   * @param {HLJSPlugin} plugin
   */


  function upgradePluginAPI(plugin) {
    // TODO: remove with v12
    if (plugin["before:highlightBlock"] && !plugin["before:highlightElement"]) {
      plugin["before:highlightElement"] = function (data) {
        plugin["before:highlightBlock"](Object.assign({
          block: data.el
        }, data));
      };
    }

    if (plugin["after:highlightBlock"] && !plugin["after:highlightElement"]) {
      plugin["after:highlightElement"] = function (data) {
        plugin["after:highlightBlock"](Object.assign({
          block: data.el
        }, data));
      };
    }
  }
  /**
   * @param {HLJSPlugin} plugin
   */


  function addPlugin(plugin) {
    upgradePluginAPI(plugin);
    plugins.push(plugin);
  }
  /**
   *
   * @param {PluginEvent} event
   * @param {any} args
   */


  function fire(event, args) {
    var cb = event;
    plugins.forEach(function (plugin) {
      if (plugin[cb]) {
        plugin[cb](args);
      }
    });
  }
  /**
   * DEPRECATED
   * @param {HighlightedHTMLElement} el
   */


  function deprecateHighlightBlock(el) {
    deprecated("10.7.0", "highlightBlock will be removed entirely in v12.0");
    deprecated("10.7.0", "Please use highlightElement now.");
    return highlightElement(el);
  }
  /* Interface definition */


  Object.assign(hljs, {
    highlight: highlight,
    highlightAuto: highlightAuto,
    highlightAll: highlightAll,
    highlightElement: highlightElement,
    // TODO: Remove with v12 API
    highlightBlock: deprecateHighlightBlock,
    configure: configure,
    initHighlighting: initHighlighting,
    initHighlightingOnLoad: initHighlightingOnLoad,
    registerLanguage: registerLanguage,
    unregisterLanguage: unregisterLanguage,
    listLanguages: listLanguages,
    getLanguage: getLanguage,
    registerAliases: registerAliases,
    autoDetection: autoDetection,
    inherit: inherit,
    addPlugin: addPlugin
  });

  hljs.debugMode = function () {
    SAFE_MODE = false;
  };

  hljs.safeMode = function () {
    SAFE_MODE = true;
  };

  hljs.versionString = version;
  hljs.regex = {
    concat: concat,
    lookahead: lookahead,
    either: either,
    optional: optional,
    anyNumberOfTimes: anyNumberOfTimes
  };

  for (var key in MODES) {
    // @ts-ignore
    if (_typeof(MODES[key]) === "object") {
      // @ts-ignore
      deepFreeze$1(MODES[key]);
    }
  } // merge all the modes/regexes into our main object


  Object.assign(hljs, MODES);
  return hljs;
}; // export an "instance" of the highlighter


var highlight = HLJS({});
module.exports = highlight;
highlight.HighlightJS = highlight;
highlight.default = highlight;
},{}],"node_modules/highlight.js/lib/languages/css.js":[function(require,module,exports) {
var MODES = function MODES(hljs) {
  return {
    IMPORTANT: {
      scope: 'meta',
      begin: '!important'
    },
    BLOCK_COMMENT: hljs.C_BLOCK_COMMENT_MODE,
    HEXCOLOR: {
      scope: 'number',
      begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
    },
    FUNCTION_DISPATCH: {
      className: "built_in",
      begin: /[\w-]+(?=\()/
    },
    ATTRIBUTE_SELECTOR_MODE: {
      scope: 'selector-attr',
      begin: /\[/,
      end: /\]/,
      illegal: '$',
      contains: [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE]
    },
    CSS_NUMBER_MODE: {
      scope: 'number',
      begin: hljs.NUMBER_RE + '(' + '%|em|ex|ch|rem' + '|vw|vh|vmin|vmax' + '|cm|mm|in|pt|pc|px' + '|deg|grad|rad|turn' + '|s|ms' + '|Hz|kHz' + '|dpi|dpcm|dppx' + ')?',
      relevance: 0
    },
    CSS_VARIABLE: {
      className: "attr",
      begin: /--[A-Za-z][A-Za-z0-9_-]*/
    }
  };
};

var TAGS = ['a', 'abbr', 'address', 'article', 'aside', 'audio', 'b', 'blockquote', 'body', 'button', 'canvas', 'caption', 'cite', 'code', 'dd', 'del', 'details', 'dfn', 'div', 'dl', 'dt', 'em', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'mark', 'menu', 'nav', 'object', 'ol', 'p', 'q', 'quote', 'samp', 'section', 'span', 'strong', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'ul', 'var', 'video'];
var MEDIA_FEATURES = ['any-hover', 'any-pointer', 'aspect-ratio', 'color', 'color-gamut', 'color-index', 'device-aspect-ratio', 'device-height', 'device-width', 'display-mode', 'forced-colors', 'grid', 'height', 'hover', 'inverted-colors', 'monochrome', 'orientation', 'overflow-block', 'overflow-inline', 'pointer', 'prefers-color-scheme', 'prefers-contrast', 'prefers-reduced-motion', 'prefers-reduced-transparency', 'resolution', 'scan', 'scripting', 'update', 'width', // TODO: find a better solution?
'min-width', 'max-width', 'min-height', 'max-height']; // https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes

var PSEUDO_CLASSES = ['active', 'any-link', 'blank', 'checked', 'current', 'default', 'defined', 'dir', // dir()
'disabled', 'drop', 'empty', 'enabled', 'first', 'first-child', 'first-of-type', 'fullscreen', 'future', 'focus', 'focus-visible', 'focus-within', 'has', // has()
'host', // host or host()
'host-context', // host-context()
'hover', 'indeterminate', 'in-range', 'invalid', 'is', // is()
'lang', // lang()
'last-child', 'last-of-type', 'left', 'link', 'local-link', 'not', // not()
'nth-child', // nth-child()
'nth-col', // nth-col()
'nth-last-child', // nth-last-child()
'nth-last-col', // nth-last-col()
'nth-last-of-type', //nth-last-of-type()
'nth-of-type', //nth-of-type()
'only-child', 'only-of-type', 'optional', 'out-of-range', 'past', 'placeholder-shown', 'read-only', 'read-write', 'required', 'right', 'root', 'scope', 'target', 'target-within', 'user-invalid', 'valid', 'visited', 'where' // where()
]; // https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements

var PSEUDO_ELEMENTS = ['after', 'backdrop', 'before', 'cue', 'cue-region', 'first-letter', 'first-line', 'grammar-error', 'marker', 'part', 'placeholder', 'selection', 'slotted', 'spelling-error'];
var ATTRIBUTES = ['align-content', 'align-items', 'align-self', 'all', 'animation', 'animation-delay', 'animation-direction', 'animation-duration', 'animation-fill-mode', 'animation-iteration-count', 'animation-name', 'animation-play-state', 'animation-timing-function', 'backface-visibility', 'background', 'background-attachment', 'background-clip', 'background-color', 'background-image', 'background-origin', 'background-position', 'background-repeat', 'background-size', 'border', 'border-bottom', 'border-bottom-color', 'border-bottom-left-radius', 'border-bottom-right-radius', 'border-bottom-style', 'border-bottom-width', 'border-collapse', 'border-color', 'border-image', 'border-image-outset', 'border-image-repeat', 'border-image-slice', 'border-image-source', 'border-image-width', 'border-left', 'border-left-color', 'border-left-style', 'border-left-width', 'border-radius', 'border-right', 'border-right-color', 'border-right-style', 'border-right-width', 'border-spacing', 'border-style', 'border-top', 'border-top-color', 'border-top-left-radius', 'border-top-right-radius', 'border-top-style', 'border-top-width', 'border-width', 'bottom', 'box-decoration-break', 'box-shadow', 'box-sizing', 'break-after', 'break-before', 'break-inside', 'caption-side', 'caret-color', 'clear', 'clip', 'clip-path', 'clip-rule', 'color', 'column-count', 'column-fill', 'column-gap', 'column-rule', 'column-rule-color', 'column-rule-style', 'column-rule-width', 'column-span', 'column-width', 'columns', 'contain', 'content', 'content-visibility', 'counter-increment', 'counter-reset', 'cue', 'cue-after', 'cue-before', 'cursor', 'direction', 'display', 'empty-cells', 'filter', 'flex', 'flex-basis', 'flex-direction', 'flex-flow', 'flex-grow', 'flex-shrink', 'flex-wrap', 'float', 'flow', 'font', 'font-display', 'font-family', 'font-feature-settings', 'font-kerning', 'font-language-override', 'font-size', 'font-size-adjust', 'font-smoothing', 'font-stretch', 'font-style', 'font-synthesis', 'font-variant', 'font-variant-caps', 'font-variant-east-asian', 'font-variant-ligatures', 'font-variant-numeric', 'font-variant-position', 'font-variation-settings', 'font-weight', 'gap', 'glyph-orientation-vertical', 'grid', 'grid-area', 'grid-auto-columns', 'grid-auto-flow', 'grid-auto-rows', 'grid-column', 'grid-column-end', 'grid-column-start', 'grid-gap', 'grid-row', 'grid-row-end', 'grid-row-start', 'grid-template', 'grid-template-areas', 'grid-template-columns', 'grid-template-rows', 'hanging-punctuation', 'height', 'hyphens', 'icon', 'image-orientation', 'image-rendering', 'image-resolution', 'ime-mode', 'isolation', 'justify-content', 'left', 'letter-spacing', 'line-break', 'line-height', 'list-style', 'list-style-image', 'list-style-position', 'list-style-type', 'margin', 'margin-bottom', 'margin-left', 'margin-right', 'margin-top', 'marks', 'mask', 'mask-border', 'mask-border-mode', 'mask-border-outset', 'mask-border-repeat', 'mask-border-slice', 'mask-border-source', 'mask-border-width', 'mask-clip', 'mask-composite', 'mask-image', 'mask-mode', 'mask-origin', 'mask-position', 'mask-repeat', 'mask-size', 'mask-type', 'max-height', 'max-width', 'min-height', 'min-width', 'mix-blend-mode', 'nav-down', 'nav-index', 'nav-left', 'nav-right', 'nav-up', 'none', 'normal', 'object-fit', 'object-position', 'opacity', 'order', 'orphans', 'outline', 'outline-color', 'outline-offset', 'outline-style', 'outline-width', 'overflow', 'overflow-wrap', 'overflow-x', 'overflow-y', 'padding', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'page-break-after', 'page-break-before', 'page-break-inside', 'pause', 'pause-after', 'pause-before', 'perspective', 'perspective-origin', 'pointer-events', 'position', 'quotes', 'resize', 'rest', 'rest-after', 'rest-before', 'right', 'row-gap', 'scroll-margin', 'scroll-margin-block', 'scroll-margin-block-end', 'scroll-margin-block-start', 'scroll-margin-bottom', 'scroll-margin-inline', 'scroll-margin-inline-end', 'scroll-margin-inline-start', 'scroll-margin-left', 'scroll-margin-right', 'scroll-margin-top', 'scroll-padding', 'scroll-padding-block', 'scroll-padding-block-end', 'scroll-padding-block-start', 'scroll-padding-bottom', 'scroll-padding-inline', 'scroll-padding-inline-end', 'scroll-padding-inline-start', 'scroll-padding-left', 'scroll-padding-right', 'scroll-padding-top', 'scroll-snap-align', 'scroll-snap-stop', 'scroll-snap-type', 'shape-image-threshold', 'shape-margin', 'shape-outside', 'speak', 'speak-as', 'src', // @font-face
'tab-size', 'table-layout', 'text-align', 'text-align-all', 'text-align-last', 'text-combine-upright', 'text-decoration', 'text-decoration-color', 'text-decoration-line', 'text-decoration-style', 'text-emphasis', 'text-emphasis-color', 'text-emphasis-position', 'text-emphasis-style', 'text-indent', 'text-justify', 'text-orientation', 'text-overflow', 'text-rendering', 'text-shadow', 'text-transform', 'text-underline-position', 'top', 'transform', 'transform-box', 'transform-origin', 'transform-style', 'transition', 'transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function', 'unicode-bidi', 'vertical-align', 'visibility', 'voice-balance', 'voice-duration', 'voice-family', 'voice-pitch', 'voice-range', 'voice-rate', 'voice-stress', 'voice-volume', 'white-space', 'widows', 'width', 'will-change', 'word-break', 'word-spacing', 'word-wrap', 'writing-mode', 'z-index' // reverse makes sure longer attributes `font-weight` are matched fully
// instead of getting false positives on say `font`
].reverse();
/*
Language: CSS
Category: common, css, web
Website: https://developer.mozilla.org/en-US/docs/Web/CSS
*/

/** @type LanguageFn */

function css(hljs) {
  var regex = hljs.regex;
  var modes = MODES(hljs);
  var VENDOR_PREFIX = {
    begin: /-(webkit|moz|ms|o)-(?=[a-z])/
  };
  var AT_MODIFIERS = "and or not only";
  var AT_PROPERTY_RE = /@-?\w[\w]*(-\w+)*/; // @-webkit-keyframes

  var IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
  var STRINGS = [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE];
  return {
    name: 'CSS',
    case_insensitive: true,
    illegal: /[=|'\$]/,
    keywords: {
      keyframePosition: "from to"
    },
    classNameAliases: {
      // for visual continuity with `tag {}` and because we
      // don't have a great class for this?
      keyframePosition: "selector-tag"
    },
    contains: [modes.BLOCK_COMMENT, VENDOR_PREFIX, // to recognize keyframe 40% etc which are outside the scope of our
    // attribute value mode
    modes.CSS_NUMBER_MODE, {
      className: 'selector-id',
      begin: /#[A-Za-z0-9_-]+/,
      relevance: 0
    }, {
      className: 'selector-class',
      begin: '\\.' + IDENT_RE,
      relevance: 0
    }, modes.ATTRIBUTE_SELECTOR_MODE, {
      className: 'selector-pseudo',
      variants: [{
        begin: ':(' + PSEUDO_CLASSES.join('|') + ')'
      }, {
        begin: ':(:)?(' + PSEUDO_ELEMENTS.join('|') + ')'
      }]
    }, // we may actually need this (12/2020)
    // { // pseudo-selector params
    //   begin: /\(/,
    //   end: /\)/,
    //   contains: [ hljs.CSS_NUMBER_MODE ]
    // },
    modes.CSS_VARIABLE, {
      className: 'attribute',
      begin: '\\b(' + ATTRIBUTES.join('|') + ')\\b'
    }, // attribute values
    {
      begin: /:/,
      end: /[;}{]/,
      contains: [modes.BLOCK_COMMENT, modes.HEXCOLOR, modes.IMPORTANT, modes.CSS_NUMBER_MODE].concat(STRINGS, [// needed to highlight these as strings and to avoid issues with
      // illegal characters that might be inside urls that would tigger the
      // languages illegal stack
      {
        begin: /(url|data-uri)\(/,
        end: /\)/,
        relevance: 0,
        // from keywords
        keywords: {
          built_in: "url data-uri"
        },
        contains: [{
          className: "string",
          // any character other than `)` as in `url()` will be the start
          // of a string, which ends with `)` (from the parent mode)
          begin: /[^)]/,
          endsWithParent: true,
          excludeEnd: true
        }]
      }, modes.FUNCTION_DISPATCH])
    }, {
      begin: regex.lookahead(/@/),
      end: '[{;]',
      relevance: 0,
      illegal: /:/,
      // break on Less variables @var: ...
      contains: [{
        className: 'keyword',
        begin: AT_PROPERTY_RE
      }, {
        begin: /\s/,
        endsWithParent: true,
        excludeEnd: true,
        relevance: 0,
        keywords: {
          $pattern: /[a-z-]+/,
          keyword: AT_MODIFIERS,
          attribute: MEDIA_FEATURES.join(" ")
        },
        contains: [{
          begin: /[a-z-]+(?=:)/,
          className: "attribute"
        }].concat(STRINGS, [modes.CSS_NUMBER_MODE])
      }]
    }, {
      className: 'selector-tag',
      begin: '\\b(' + TAGS.join('|') + ')\\b'
    }]
  };
}

module.exports = css;
},{}],"src/views/code-viewer.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var core_view_1 = __importDefault(require("./core-view"));

var code_viewer_template_1 = __importDefault(require("./code-viewer.template"));

require("highlight.js/styles/base16/dracula");

var core_1 = __importDefault(require("highlight.js/lib/core"));

var css_1 = __importDefault(require("highlight.js/lib/languages/css"));

core_1.default.registerLanguage("css", css_1.default);

var CodeViewer = function (_super) {
  __extends(CodeViewer, _super);

  function CodeViewer(container, data) {
    var _this = _super.call(this, container, (0, code_viewer_template_1.default)(data)) || this;

    _this.initialize = function () {
      var _a;

      document.querySelectorAll("pre  code").forEach(function (el, _) {
        core_1.default.highlightElement(el);
      });
      (_a = document.getElementById("copy-text")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", _this.onCopy);
      document.querySelectorAll("#code-toggle").forEach(function (toggleItem) {
        toggleItem.addEventListener("click", _this.onToggleCodeType);
      });
    };

    _this.onCopy = function (event) {
      var _a;

      var clipCode = (_a = document.querySelector("pre code")) === null || _a === void 0 ? void 0 : _a.textContent;
      var tempTextArea = document.createElement("textarea");
      document.body.appendChild(tempTextArea);

      if (clipCode) {
        tempTextArea.value = clipCode.trim();
        tempTextArea.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextArea);
      }
    };

    _this.onToggleCodeType = function (event) {
      var toggleButtonEl = event.target;
      var buttonDataset = toggleButtonEl.dataset.index;

      if (buttonDataset) {
        _this._data.codeData = buttonDataset;
      }

      _this.render();
    };

    _this.render = function (appendChild) {
      if (appendChild === void 0) {
        appendChild = false;
      } //* appendChild속성은 container요소의 자식으로써 렌더링 할것인지 덮어쓰기 할 것인지에 대한 옵션


      var container = document.querySelector(_this._container);

      if (appendChild) {
        var divFragment = document.createElement("div");
        divFragment.innerHTML = (0, code_viewer_template_1.default)(_this._data);
        container === null || container === void 0 ? void 0 : container.appendChild(divFragment.children[0]);

        _this.initialize();
      } else {
        if (container) {
          container.innerHTML = (0, code_viewer_template_1.default)(_this._data);

          _this.initialize();
        }
      }
    };

    _this._data = data;
    return _this;
  }

  return CodeViewer;
}(core_view_1.default);

exports.default = CodeViewer;
},{"./core-view":"src/views/core-view.ts","./code-viewer.template":"src/views/code-viewer.template.ts","highlight.js/styles/base16/dracula":"node_modules/highlight.js/styles/base16/dracula.css","highlight.js/lib/core":"node_modules/highlight.js/lib/core.js","highlight.js/lib/languages/css":"node_modules/highlight.js/lib/languages/css.js"}],"src/views/color-list.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var prev_gradient_1 = __importDefault(require("./prev-gradient"));

var core_view_1 = __importDefault(require("./core-view"));

var color_list_template_1 = __importDefault(require("./color-list.template"));

var code_viewer_1 = __importDefault(require("./code-viewer"));

var ColorList = function (_super) {
  __extends(ColorList, _super);

  function ColorList(container, data) {
    var _this = _super.call(this, container, (0, color_list_template_1.default)(data)) || this;

    _this.onChangeActive = function (event) {
      var _a;

      var colorItemIndex = Number((_a = event.target.parentElement) === null || _a === void 0 ? void 0 : _a.dataset.index);

      if (colorItemIndex !== undefined) {
        var findActiveColor = _this._data.colorList.find(function (colorItem) {
          return colorItem.index === colorItemIndex;
        });

        if (findActiveColor) {
          _this._data.activeColor = findActiveColor;

          _this.render();

          _this.attachEventHandler();
        }
      }
    };

    _this.onDelete = function (event) {
      event.preventDefault();
      var handleTarget = Number(event.target.dataset.index);

      if (_this._data.colorList.length === 2) {
        return;
      }

      if (!isNaN(handleTarget)) {
        _this._data.colorList = _this._data.colorList.filter(function (colorItem) {
          return colorItem.index !== handleTarget;
        });
        var prevGradient = new prev_gradient_1.default("#prev-gradient", _this._data);
        var codeViewer = new code_viewer_1.default("#code-viewer", _this._data);
        codeViewer.render();
        prevGradient.render(false);

        _this.render();

        _this.attachEventHandler();
      }
    };

    _this.onChange = function (event) {
      var inputElement = event.target;
      var changeInputIndex = Number(inputElement.dataset.index);
      var prevGradient = new prev_gradient_1.default("#prev-gradient", _this._data);
      var codeViewer = new code_viewer_1.default("#code-viewer", _this._data);

      var changeElement = _this._data.colorList.find(function (colorItem) {
        return colorItem.index === changeInputIndex;
      });

      var changeElementIndex = _this._data.colorList.indexOf(changeElement);

      if (changeElement) {
        _this._data.colorList[changeElementIndex] = __assign(__assign({}, changeElement), {
          stop: Number(inputElement.value)
        });
        _this._data.activeColor = changeElement;

        _this._data.colorList.sort(function (a, b) {
          return a.stop - b.stop;
        });
      }

      inputElement.addEventListener("blur", function () {
        _this.render();

        _this.attachEventHandler();
      });
      codeViewer.render();
      prevGradient.render(false);
    };

    _this.onChangeColor = function (event) {
      var inputTarget = event.target;
      var inputTargetIndex = Number(inputTarget.dataset.index);

      _this._data.colorList.forEach(function (colorItem, index, colorListObj) {
        if (colorItem.index === inputTargetIndex) {
          _this._data.activeColor = __assign(__assign({}, _this._data.activeColor), {
            index: inputTargetIndex,
            color: ColorList.convertHexToRgb(inputTarget.value)
          });
          colorListObj[index] = _this._data.activeColor;
        }
      });

      var prevGradient = new prev_gradient_1.default("#prev-gradient", _this._data);
      var codeViewer = new code_viewer_1.default("#code-viewer", _this._data);
      codeViewer.render();
      prevGradient.render(false);

      _this.onChangeActive(event);

      _this.attachEventHandler();
    };

    _this.getRandomColor = function () {
      var letters = "0123456789ABCDEF";
      var color = "#";

      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }

      return color;
    };

    _this.onCreateNewColor = function () {
      var newColorItem = {
        color: _this._data.activeColor.color,
        stop: _this._data.colorList[_this._data.colorList.length - 1].stop + 1,
        index: _this._data.colorItemIndex++
      };
      _this._data.colorList = __spreadArray(__spreadArray([], _this._data.colorList, true), [newColorItem], false);
      var prevGradient = new prev_gradient_1.default("#prev-gradient", _this._data);
      var codeViewer = new code_viewer_1.default("#code-viewer", _this._data);
      codeViewer.render();
      prevGradient.render(false);

      _this.render();

      _this.attachEventHandler();
    };

    _this.attachEventHandler = function () {
      var colorItems = document.querySelectorAll("#color-item");
      colorItems.forEach(function (colorItem) {
        var _a, _b;

        (_a = colorItem.children[0]) === null || _a === void 0 ? void 0 : _a.addEventListener("click", _this.onDelete, false);
        (_b = colorItem.children[2]) === null || _b === void 0 ? void 0 : _b.addEventListener("input", _this.onChange, false);
        colorItem.addEventListener("click", _this.onChangeActive, false);
      });
      var newColor = document.querySelector("#new-color");
      newColor === null || newColor === void 0 ? void 0 : newColor.addEventListener("click", _this.onCreateNewColor);
      var colorInputs = document.querySelectorAll("#color-picker");
      colorInputs.forEach(function (colorItem) {
        colorItem.addEventListener("input", _this.onChangeColor);
        colorItem.addEventListener("blur", function () {
          _this.render();

          _this.attachEventHandler();
        });
      });
    };

    _this.render = function (appendChild) {
      if (appendChild === void 0) {
        appendChild = false;
      }

      console.log(_this._data.activeColor); //* appendChild속성은 container요소의 자식으로써 렌더링 할것인지 덮어쓰기 할 것인지에 대한 옵션

      var container = document.querySelector("#color-list");

      if (appendChild) {
        var divFragment = document.createElement("div");
        divFragment.innerHTML = (0, color_list_template_1.default)(_this._data);
        container === null || container === void 0 ? void 0 : container.appendChild(divFragment.children[0]);
      } else {
        if (container) {
          _this.attachEventHandler();

          container.innerHTML = (0, color_list_template_1.default)(_this._data);
        }
      }
    };

    _this._data = data;

    _this.attachEventHandler();

    return _this;
  }

  ColorList.convertHexToRgb = function (hexCode) {
    var value = hexCode.match(/[A-Za-z0-9]{2}/g);
    return "rgb(" + (value === null || value === void 0 ? void 0 : value.map(function (hex) {
      return parseInt(hex, 16);
    }).join(",")) + ")";
  };

  return ColorList;
}(core_view_1.default);

exports.default = ColorList;
},{"./prev-gradient":"src/views/prev-gradient.ts","./core-view":"src/views/core-view.ts","./color-list.template":"src/views/color-list.template.ts","./code-viewer":"src/views/code-viewer.ts"}],"src/views/change-options.template.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var template =
/* html */
"\n    <div class=\"flex items-center justify-center \">\n        <button id=\"linear\" class=\"mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded\">Linear</button>\n        <button id=\"radial\" class=\"mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded\">Radial</button>\n    </div>\n";

var allowInsecurePrototypeAccess = require("@handlebars/allow-prototype-access").allowInsecurePrototypeAccess;

var insecureHandlebars = allowInsecurePrototypeAccess(window.Handlebars);
exports.default = insecureHandlebars.compile(template);
},{"@handlebars/allow-prototype-access":"node_modules/@handlebars/allow-prototype-access/src/index.js"}],"src/views/change-options.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var core_view_1 = __importDefault(require("./core-view"));

var change_options_template_1 = __importDefault(require("./change-options.template"));

var prev_gradient_1 = __importDefault(require("./prev-gradient"));

var color_list_1 = __importDefault(require("./color-list"));

var code_viewer_1 = __importDefault(require("./code-viewer"));

var ChangeOptions = function (_super) {
  __extends(ChangeOptions, _super);

  function ChangeOptions(container, data) {
    var _this = _super.call(this, container, (0, change_options_template_1.default)(data)) || this;

    _this.onClick = function (event) {
      var id = event.target.id;

      switch (id) {
        case "linear":
          _this._data.isLinear = true;
          break;

        case "radial":
          _this._data.isLinear = false;
          break;

        default:
          throw new Error("Unhandled Error");
      }

      var prevGradient = new prev_gradient_1.default("#prev-gradient", _this._data);
      var colorList = new color_list_1.default("#color-list", _this._data);
      var codeViewer = new code_viewer_1.default("#code-viewer", _this._data);
      codeViewer.render();
      prevGradient.render(false);
      colorList.render(false);
      colorList.attachEventHandler();
    };

    _this.attachEventHandler = function () {
      var lieanrButton = document.querySelector(_this._container + " #linear");
      var radianButton = document.querySelector(_this._container + " #radial");
      lieanrButton === null || lieanrButton === void 0 ? void 0 : lieanrButton.addEventListener("click", _this.onClick);
      radianButton === null || radianButton === void 0 ? void 0 : radianButton.addEventListener("click", _this.onClick);
    };

    _this.render = function (appendChild) {
      //* appendChild속성은 container요소의 자식으로써 렌더링 할것인지 덮어쓰기 할 것인지에 대한 옵션
      var container = document.querySelector(_this._container);

      if (appendChild) {
        var divFragment = document.createElement("div");
        divFragment.innerHTML = (0, change_options_template_1.default)(_this._data);
        container === null || container === void 0 ? void 0 : container.appendChild(divFragment.children[0]);
      } else {
        if (container) {
          container.innerHTML = (0, change_options_template_1.default)(_this._data);
        }
      }
    };

    _this._data = data;
    return _this;
  }

  return ChangeOptions;
}(core_view_1.default);

exports.default = ChangeOptions;
},{"./core-view":"src/views/core-view.ts","./change-options.template":"src/views/change-options.template.ts","./prev-gradient":"src/views/prev-gradient.ts","./color-list":"src/views/color-list.ts","./code-viewer":"src/views/code-viewer.ts"}],"src/data/site-meta.json":[function(require,module,exports) {
module.exports = {
  "title": "Gradient Generator"
};
},{}],"src/pages/main.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var main_template_1 = __importDefault(require("./main.template"));

var prev_gradient_1 = __importDefault(require("../views/prev-gradient"));

var color_list_1 = __importDefault(require("../views/color-list"));

var change_options_1 = __importDefault(require("../views/change-options"));

var code_viewer_1 = __importDefault(require("../views/code-viewer"));

var site_meta_json_1 = require("../data/site-meta.json");

var MainPage = function () {
  function MainPage(container, data) {
    var _this = this;

    this._fields = [];

    this.render = function () {
      _this._container.innerHTML = _this._template;

      _this._fields.forEach(function (field) {
        field.render(false);

        if (field.attachEventHandler) {
          field.attachEventHandler();
        }
      });
    };

    this._template = (0, main_template_1.default)({
      title: site_meta_json_1.title
    });
    this._container = document.getElementById(container);
    this._data = data;
    this.initialize();
  }

  MainPage.prototype.initialize = function () {
    var prevGradient = new prev_gradient_1.default("#prev-gradient", this._data); // const colorPicker = new ColorPicker("#color-picker", this._data);

    var colorList = new color_list_1.default("#color-list", this._data);
    var changeOptions = new change_options_1.default("#change-option", this._data);
    var codeViewer = new code_viewer_1.default("#code-viewer", this._data);

    this._fields.push(prevGradient); // this._fields.push(colorPicker);


    this._fields.push(colorList);

    this._fields.push(changeOptions);

    this._fields.push(codeViewer);
  };

  return MainPage;
}();

exports.default = MainPage;
},{"./main.template":"src/pages/main.template.ts","../views/prev-gradient":"src/views/prev-gradient.ts","../views/color-list":"src/views/color-list.ts","../views/change-options":"src/views/change-options.ts","../views/code-viewer":"src/views/code-viewer.ts","../data/site-meta.json":"src/data/site-meta.json"}],"src/pages/notfound.template.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var template =
/* html */
"\n    <main>\n     404 \uD398\uC774\uC9C0\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.\n    </main>\n";
exports.default = template;
},{}],"src/pages/notfound.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var notfound_template_1 = __importDefault(require("./notfound.template"));

var NotFoundPage = function () {
  function NotFoundPage(container) {
    var _this = this;

    this.render = function () {
      _this._container.innerHTML = _this._template;
    };

    this._template = notfound_template_1.default;
    this._container = document.getElementById(container);
  }

  return NotFoundPage;
}();

exports.default = NotFoundPage;
},{"./notfound.template":"src/pages/notfound.template.ts"}],"src/router.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var store_1 = __importDefault(require("./store"));

var main_1 = __importDefault(require("./pages/main"));

var notfound_1 = __importDefault(require("./pages/notfound"));

var routePaths = {
  MAIN_PATH: "/",
  LOGIN_PATH: "/login"
};
var store = new store_1.default();

function router() {
  var path = location.pathname;

  switch (path) {
    case routePaths.MAIN_PATH:
      var mainPage = new main_1.default("root", store);
      mainPage.render();
      break;

    default:
      var notFoundPage = new notfound_1.default("root");
      notFoundPage.render();
      break;
  }
}

exports.default = router;
},{"./store":"src/store/index.ts","./pages/main":"src/pages/main.ts","./pages/notfound":"src/pages/notfound.ts"}],"src/app.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var router_1 = __importDefault(require("./router")); //* DOM 렌더링이 완료된 시점에서 router함수를 실행합니다.


window.addEventListener("DOMContentLoaded", function () {
  (0, router_1.default)();
});
},{"./router":"src/router.ts"}],"../../../.nvm/versions/node/v15.14.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53076" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../.nvm/versions/node/v15.14.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/app.ts"], null)
//# sourceMappingURL=/app.5cec07dd.js.map