module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("bG0T");


/***/ }),

/***/ "0K2u":
/***/ (function(module, exports) {

module.exports = require("@auth0/nextjs-auth0");

/***/ }),

/***/ "2NqA":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0K2u");
/* harmony import */ var _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("UwMZ");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_1__);


// https://github.com/zeit/next.js/tree/canary/examples/auth0


/* harmony default export */ __webpack_exports__["a"] = (Object(_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__["initAuth0"])({
  clientId: _config__WEBPACK_IMPORTED_MODULE_1___default.a.AUTH0_CLIENT_ID,
  clientSecret: _config__WEBPACK_IMPORTED_MODULE_1___default.a.AUTH0_CLIENT_SECRET,
  scope: _config__WEBPACK_IMPORTED_MODULE_1___default.a.AUTH0_SCOPE,
  domain: _config__WEBPACK_IMPORTED_MODULE_1___default.a.AUTH0_DOMAIN,
  redirectUri: _config__WEBPACK_IMPORTED_MODULE_1___default.a.REDIRECT_URI,
  postLogoutRedirectUri: _config__WEBPACK_IMPORTED_MODULE_1___default.a.POST_LOGOUT_REDIRECT_URI,
  session: {
    cookieSecret: _config__WEBPACK_IMPORTED_MODULE_1___default.a.SESSION_COOKIE_SECRET,
    cookieLifetime: _config__WEBPACK_IMPORTED_MODULE_1___default.a.SESSION_COOKIE_LIFETIME
  }
}));

/***/ }),

/***/ "UwMZ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  /**
   * Settings exposed to the server.
   */
  module.exports = {
    AUTH0_CLIENT_ID: "MDva71UZbX6ywDlWPHnN23FkZXu51tWA",
    AUTH0_CLIENT_SECRET: "LXNEOmLOd6n5oNnGhWlMCoNf-YrMXPVs3l80paZwX23slfFYaCsDAl42wUK6Cjf5",
    AUTH0_SCOPE: "openid profile",
    AUTH0_DOMAIN: "dev-gbgcj6fb.eu.auth0.com",
    REDIRECT_URI: "http://localhost:3000/api/callback",
    POST_LOGOUT_REDIRECT_URI: "http://localhost:3000/",
    SESSION_COOKIE_SECRET: "s%3Al3ozSdvQ83TtC5RvJ.CibaQoHtaY0H3QOB1kZjfizldfhsdjfhzoefu",
    SESSION_COOKIE_LIFETIME: 7200
  };
} else {}

/***/ }),

/***/ "bG0T":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return callback; });
/* harmony import */ var _lib_auth0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2NqA");



async function callback(req, res) {
  try {
    await _lib_auth0__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"].handleCallback(req, res, {
      redirectTo: '/profile'
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}

/***/ })

/******/ });