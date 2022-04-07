/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/app-node.tsx":
/*!*****************************!*\
  !*** ./client/app-node.tsx ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var react_1 = __importDefault(__webpack_require__(/*! react */ "react"));

var server_1 = __webpack_require__(/*! react-router-dom/server */ "react-router-dom/server");

var app_web_1 = __importDefault(__webpack_require__(/*! ./app-web */ "./client/app-web.tsx")); // @ts-ignore


var AppSSR = function (_a) {
  var url = _a.url;
  return react_1.default.createElement(server_1.StaticRouter, {
    location: url
  }, react_1.default.createElement(app_web_1.default, null));
};

exports["default"] = AppSSR;

/***/ }),

/***/ "./client/app-web.tsx":
/*!****************************!*\
  !*** ./client/app-web.tsx ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var react_1 = __importDefault(__webpack_require__(/*! react */ "react"));

var PageLayout_1 = __importDefault(__webpack_require__(/*! ./components/PageLayout */ "./client/components/PageLayout.tsx"));

var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var Home_1 = __importDefault(__webpack_require__(/*! ./pages/Home */ "./client/pages/Home.tsx"));

var Profile_1 = __importDefault(__webpack_require__(/*! ./pages/Profile */ "./client/pages/Profile.tsx"));

var Login_1 = __importDefault(__webpack_require__(/*! ./pages/Login */ "./client/pages/Login.tsx"));

var Register_1 = __importDefault(__webpack_require__(/*! ./pages/Register */ "./client/pages/Register.tsx"));

var Feed_1 = __importDefault(__webpack_require__(/*! ./pages/Feed */ "./client/pages/Feed.tsx"));

var Wallet_1 = __importDefault(__webpack_require__(/*! ./pages/Wallet */ "./client/pages/Wallet.tsx"));

var App = function () {
  return react_1.default.createElement(react_router_dom_1.Routes, null, react_1.default.createElement(react_router_dom_1.Route, {
    path: "/",
    element: react_1.default.createElement(PageLayout_1.default, null)
  }, react_1.default.createElement(react_router_dom_1.Route, {
    index: true,
    element: react_1.default.createElement(Home_1.default, null)
  }), react_1.default.createElement(react_router_dom_1.Route, {
    path: "profile",
    element: react_1.default.createElement(Profile_1.default, null)
  }), react_1.default.createElement(react_router_dom_1.Route, {
    path: "login",
    element: react_1.default.createElement(Login_1.default, null)
  }), react_1.default.createElement(react_router_dom_1.Route, {
    path: "register",
    element: react_1.default.createElement(Register_1.default, null)
  }), react_1.default.createElement(react_router_dom_1.Route, {
    path: "feed",
    element: react_1.default.createElement(Feed_1.default, null)
  }), react_1.default.createElement(react_router_dom_1.Route, {
    path: "wallet",
    element: react_1.default.createElement(Wallet_1.default, null)
  })));
};

exports["default"] = App;

/***/ }),

/***/ "./client/components/PageLayout.tsx":
/*!******************************************!*\
  !*** ./client/components/PageLayout.tsx ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var react_1 = __importDefault(__webpack_require__(/*! react */ "react"));

var AbsHeader_1 = __importDefault(__webpack_require__(/*! ./absHeader/AbsHeader */ "./client/components/absHeader/AbsHeader.tsx"));

var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "react-router-dom");

__webpack_require__(/*! ../styles/global.css */ "./client/styles/global.css");

__webpack_require__(/*! ../styles/wrappers.css */ "./client/styles/wrappers.css");

var PageLayout = function () {
  return react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement("div", {
    className: "body-wrapper"
  }, react_1.default.createElement(AbsHeader_1.default, null), react_1.default.createElement(react_router_dom_1.Outlet, null)));
};

exports["default"] = PageLayout;

/***/ }),

/***/ "./client/components/absHeader/AbsHeader.tsx":
/*!***************************************************!*\
  !*** ./client/components/absHeader/AbsHeader.tsx ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var react_1 = __importDefault(__webpack_require__(/*! react */ "react"));

__webpack_require__(/*! ../../styles/wrappers.css */ "./client/styles/wrappers.css");

__webpack_require__(/*! ../../styles/absHeader.css */ "./client/styles/absHeader.css");

var HamburgerHeader_1 = __importDefault(__webpack_require__(/*! ./HamburgerHeader */ "./client/components/absHeader/HamburgerHeader.tsx"));

var HeaderNav_1 = __importDefault(__webpack_require__(/*! ./HeaderNav */ "./client/components/absHeader/HeaderNav.tsx"));

var AbsHeader = function () {
  function handleClick(e) {
    var _a;

    var pathList = (_a = document.querySelector(".hamburger-menu")) === null || _a === void 0 ? void 0 : _a.children;

    if (!pathList) {
      return;
    }

    for (var i = 0; i < pathList.length; i++) {
      if (pathList[i].classList[1]) {
        pathList[i].classList.remove("hm__path-".concat(i + 1, "--animate"));
        continue;
      } else {
        pathList[i].classList.add("hm__path-".concat(i + 1, "--animate"));
        continue;
      }
    }
  }

  return react_1.default.createElement("div", {
    className: "header-wrapper"
  }, react_1.default.createElement("div", {
    className: "max-wrapper"
  }, react_1.default.createElement("div", {
    className: "header-flex-wrapper"
  }, react_1.default.createElement("div", {
    className: "logo-wrapper"
  }, react_1.default.createElement("h1", {
    className: "logo-title"
  }, "Daazzll")), react_1.default.createElement(HeaderNav_1.default, null), react_1.default.createElement("div", {
    className: "btn-wrapper"
  }, react_1.default.createElement("button", {
    className: "login-btn"
  }, "Login"), react_1.default.createElement("button", {
    className: "register-btn"
  }, "Register")), react_1.default.createElement(HamburgerHeader_1.default, {
    handleClick: handleClick
  }))));
};

exports["default"] = AbsHeader;

/***/ }),

/***/ "./client/components/absHeader/HamburgerHeader.tsx":
/*!*********************************************************!*\
  !*** ./client/components/absHeader/HamburgerHeader.tsx ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var react_1 = __importDefault(__webpack_require__(/*! react */ "react"));

var HamburgerIcon_1 = __importDefault(__webpack_require__(/*! ./HamburgerIcon */ "./client/components/absHeader/HamburgerIcon.tsx"));

var HamburgerHeader = function (_a) {
  var handleClick = _a.handleClick;
  return react_1.default.createElement("div", {
    className: "hamburger-wrapper"
  }, react_1.default.createElement("button", {
    onClick: handleClick,
    className: "hamburger-button"
  }), react_1.default.createElement(HamburgerIcon_1.default, null));
};

exports["default"] = HamburgerHeader;

/***/ }),

/***/ "./client/components/absHeader/HamburgerIcon.tsx":
/*!*******************************************************!*\
  !*** ./client/components/absHeader/HamburgerIcon.tsx ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var react_1 = __importDefault(__webpack_require__(/*! react */ "react"));

var HamburgerIcon = function () {
  return react_1.default.createElement("svg", {
    className: "hamburger-menu",
    width: "36",
    height: "36",
    viewBox: "0 0 9.5249999 9.5249999",
    version: "1.1",
    id: "svg5"
  }, react_1.default.createElement("path", {
    className: "hm__path-1",
    d: "m 1.025261,2.9104192 h 6.8791665 c 0.79375,0 0.79375,-1.5875 0,-1.5875 H 1.5544276 l 6.3499999,6.6145832",
    id: "path991"
  }), react_1.default.createElement("path", {
    className: "hm__path-2",
    d: "m 2.8773443,5.0270857 5.0270833,5.3e-6",
    id: "path1740"
  }), react_1.default.createElement("path", {
    className: "hm__path-3",
    d: "m 1.025261,6.8791691 h 6.8791667 c 0.7937498,0 0.7937498,1.3229167 -2e-7,1.3229167 H 1.5544276 L 8.1690109,1.5875025",
    id: "path1742"
  }));
};

exports["default"] = HamburgerIcon;

/***/ }),

/***/ "./client/components/absHeader/HeaderNav.tsx":
/*!***************************************************!*\
  !*** ./client/components/absHeader/HeaderNav.tsx ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var react_1 = __importDefault(__webpack_require__(/*! react */ "react"));

var react_router_dom_1 = __webpack_require__(/*! react-router-dom */ "react-router-dom");

var HeaderNav = function () {
  return react_1.default.createElement("nav", {
    className: "nav"
  }, react_1.default.createElement("ul", {
    className: "nav__list"
  }, react_1.default.createElement("li", {
    className: "nav__list__items"
  }, react_1.default.createElement(react_router_dom_1.Link, {
    to: "/",
    className: "items__link"
  }, "Home")), react_1.default.createElement("li", {
    className: "nav__list__items"
  }, react_1.default.createElement(react_router_dom_1.Link, {
    to: "/feed",
    className: "items__link"
  }, "Feed")), react_1.default.createElement("li", {
    className: "nav__list__items"
  }, react_1.default.createElement(react_router_dom_1.Link, {
    to: "/about",
    className: "items__link"
  }, "About")), react_1.default.createElement("li", {
    className: "nav__list__items"
  }, react_1.default.createElement(react_router_dom_1.Link, {
    to: "/contact",
    className: "items__link"
  }, "Contact"))));
};

exports["default"] = HeaderNav;

/***/ }),

/***/ "./client/main-node.tsx":
/*!******************************!*\
  !*** ./client/main-node.tsx ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var app_node_1 = __webpack_require__(/*! ./app-node */ "./client/app-node.tsx");

Object.defineProperty(exports, "default", ({
  enumerable: true,
  get: function () {
    return __importDefault(app_node_1).default;
  }
}));

/***/ }),

/***/ "./client/pages/Feed.tsx":
/*!*******************************!*\
  !*** ./client/pages/Feed.tsx ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var react_1 = __importDefault(__webpack_require__(/*! react */ "react"));

var Feed = function () {
  return react_1.default.createElement("div", null);
};

exports["default"] = Feed;

/***/ }),

/***/ "./client/pages/Home.tsx":
/*!*******************************!*\
  !*** ./client/pages/Home.tsx ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var react_1 = __importDefault(__webpack_require__(/*! react */ "react"));

__webpack_require__(/*! ../styles/wrappers.css */ "./client/styles/wrappers.css");

__webpack_require__(/*! ../styles/home.css */ "./client/styles/home.css");

var Home = function () {
  return react_1.default.createElement("div", {
    className: "home-wrapper"
  }, react_1.default.createElement("section", {
    className: "home"
  }));
};

exports["default"] = Home;

/***/ }),

/***/ "./client/pages/Login.tsx":
/*!********************************!*\
  !*** ./client/pages/Login.tsx ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var react_1 = __importDefault(__webpack_require__(/*! react */ "react"));

var Login = function () {
  // Login Page
  return react_1.default.createElement("div", null, "Login");
};

exports["default"] = Login;

/***/ }),

/***/ "./client/pages/Profile.tsx":
/*!**********************************!*\
  !*** ./client/pages/Profile.tsx ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var react_1 = __importDefault(__webpack_require__(/*! react */ "react"));

var Profile = function () {
  return react_1.default.createElement("div", null);
};

exports["default"] = Profile;

/***/ }),

/***/ "./client/pages/Register.tsx":
/*!***********************************!*\
  !*** ./client/pages/Register.tsx ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var react_1 = __importDefault(__webpack_require__(/*! react */ "react"));

var Register = function () {
  return react_1.default.createElement("div", null);
};

exports["default"] = Register;

/***/ }),

/***/ "./client/pages/Wallet.tsx":
/*!*********************************!*\
  !*** ./client/pages/Wallet.tsx ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var react_1 = __importDefault(__webpack_require__(/*! react */ "react"));

var Wallet = function () {
  return react_1.default.createElement("div", null);
};

exports["default"] = Wallet;

/***/ }),

/***/ "./client/styles/absHeader.css":
/*!*************************************!*\
  !*** ./client/styles/absHeader.css ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./client/styles/global.css":
/*!**********************************!*\
  !*** ./client/styles/global.css ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./client/styles/home.css":
/*!********************************!*\
  !*** ./client/styles/home.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./client/styles/wrappers.css":
/*!************************************!*\
  !*** ./client/styles/wrappers.css ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("react-router-dom");

/***/ }),

/***/ "react-router-dom/server":
/*!******************************************!*\
  !*** external "react-router-dom/server" ***!
  \******************************************/
/***/ ((module) => {

module.exports = require("react-router-dom/server");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./client/main-node.tsx");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=node.js.map