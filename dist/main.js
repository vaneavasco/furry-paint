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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Domain/Emitter.js":
/*!*******************************!*\
  !*** ./src/Domain/Emitter.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Emitter {\n  constructor() {\n    this.listeners = new Map();\n  }\n\n  addListener(event, listener) {\n    if (!this.listeners.has(event)) {\n      this.listeners.set(event, []);\n    }\n\n    const listenersForEvent = this.listeners.get(event);\n    listenersForEvent.push(listener);\n    this.listeners.set(event, listenersForEvent);\n  }\n\n  emit(event, ...params) {\n    this.listeners.get(event)\n      .forEach((listener) => {\n        listener.handle(...params);\n      });\n  }\n}\n\n//module.exports = Emitter;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Emitter);\n\n\n//# sourceURL=webpack:///./src/Domain/Emitter.js?");

/***/ }),

/***/ "./src/Domain/Grid.js":
/*!****************************!*\
  !*** ./src/Domain/Grid.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Grid {\n  constructor(height, width, emitter, backgroundColor = '#FFFFFF') {\n    this.height = height;\n    this.width = width;\n    this.backgroundColor = backgroundColor;\n    this.emitter = emitter;\n\n    this.init();\n  }\n\n  paint(x, y, color) {\n    const realColor = this.state[x][y] !== color ? color : this.backgroundColor;\n    this.state[x][y] = realColor;\n    this.emitter.emit('grid.cell.change', x, y, realColor);\n  }\n\n  init() {\n    this.state = Array.from(Array(this.height), () => {\n      return Array.from(Array(this.width), () => this.backgroundColor);\n    });\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Grid);\n\n\n//# sourceURL=webpack:///./src/Domain/Grid.js?");

/***/ }),

/***/ "./src/Domain/Paint.js":
/*!*****************************!*\
  !*** ./src/Domain/Paint.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Paint {\n  constructor(grid, emitter, picker) {\n    this.grid = grid;\n    this.emitter = emitter;\n    this.picker = picker;\n  }\n\n  paint(x, y) {\n    this.grid.paint(x, y, this.picker.color);\n  }\n\n  pickColor(color) {\n    this.picker.color = color;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Paint);\n\n\n//# sourceURL=webpack:///./src/Domain/Paint.js?");

/***/ }),

/***/ "./src/Domain/Picker.js":
/*!******************************!*\
  !*** ./src/Domain/Picker.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Picker {\n  constructor(defaultColor = '#000000', availableColors = ['#FF0000', '#000000']) {\n    this.color = defaultColor;\n    this.availableColors = availableColors;\n  }\n\n  changeColor(color) {\n    if (this.availableColors.indexOf(color) !== -1) {\n      this.color = color;\n    }\n  }\n\n  handle(color) {\n    this.changeColor(color);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Picker);\n\n\n//# sourceURL=webpack:///./src/Domain/Picker.js?");

/***/ }),

/***/ "./src/Presentation/Grid.js":
/*!**********************************!*\
  !*** ./src/Presentation/Grid.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Grid {\n  constructor(grid, cellSize, rootElement) {\n    this.grid = grid;\n    this.cellSize = cellSize;\n    this.rootElement = rootElement;\n    this.cells = new Map();\n    this.isMouseDown = false;\n  }\n\n  draw() {\n    for (let i = 0; i < this.grid.height; i++) {\n      for (let j = 0; j < this.grid.width; j++) {\n        const cell = this.createCell(i, j);\n        this.rootElement.append(cell);\n        this.cells.set(\n          JSON.stringify({\n            x: i,\n            y: j,\n          }),\n          cell,\n        );\n      }\n    }\n\n    return this;\n  }\n\n  createCell(i, j) {\n    const cell = document.createElement('div');\n    cell.setAttribute('style', `width:${this.cellSize}px; height: ${this.cellSize}px; float:left`);\n    cell.setAttribute('data-position', JSON.stringify({\n      x: i,\n      y: j,\n    }));\n    cell.setAttribute('class', 'grid-cell');\n\n    return cell;\n  }\n\n  attachListener(cb) {\n    this.cells.forEach((cell, position) => {\n      cell.addEventListener('mousedown', () => {\n        this.isMouseDown = true;\n        cb(JSON.parse(position));\n      });\n      cell.addEventListener('mousemove', () => {\n        this.isDrag = this.isMouseDown;\n      });\n      cell.addEventListener('mouseover', () => {\n        if (this.isDrag) {\n          cb(JSON.parse(position));\n        }\n      });\n      cell.addEventListener('mouseup', () => {\n        this.isDrag = false;\n        this.isMouseDown = false;\n      });\n    });\n  }\n\n  handle(x, y, color) {\n    const cell = this.cells.get(JSON.stringify({\n      x,\n      y,\n    }));\n    cell.style.backgroundColor = color;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Grid);\n\n\n//# sourceURL=webpack:///./src/Presentation/Grid.js?");

/***/ }),

/***/ "./src/Util.js":
/*!*********************!*\
  !*** ./src/Util.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Util {\n  static ready(fn) {\n    if (document.readyState !== 'loading') {\n      fn();\n    } else if (document.addEventListener) {\n      document.addEventListener('DOMContentLoaded', fn);\n    } else {\n      document.attachEvent('onreadystatechange', () => {\n        if (document.readyState !== 'loading') {\n          fn();\n        }\n      });\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Util);\n\n\n//# sourceURL=webpack:///./src/Util.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Domain_Emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Domain/Emitter */ \"./src/Domain/Emitter.js\");\n/* harmony import */ var _Domain_Picker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Domain/Picker */ \"./src/Domain/Picker.js\");\n/* harmony import */ var _Domain_Paint__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Domain/Paint */ \"./src/Domain/Paint.js\");\n/* harmony import */ var _Domain_Grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Domain/Grid */ \"./src/Domain/Grid.js\");\n/* harmony import */ var _Presentation_Grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Presentation/Grid */ \"./src/Presentation/Grid.js\");\n/* harmony import */ var _Util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Util */ \"./src/Util.js\");\n\n\n\n\n\n\n\nconst config = {\n  cellSize: 30,\n  gridSize: {\n    width: 30,\n    height: 30\n  }\n};\n\n_Util__WEBPACK_IMPORTED_MODULE_5__[\"default\"].ready(() => {\n  const emitter = new _Domain_Emitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  const picker = new _Domain_Picker__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n  const grid = new _Domain_Grid__WEBPACK_IMPORTED_MODULE_3__[\"default\"](config.gridSize.height, config.gridSize.width, emitter);\n  const paint = new _Domain_Paint__WEBPACK_IMPORTED_MODULE_2__[\"default\"](grid, emitter, picker);\n\n  const cellSize = config.cellSize;\n  const rootElement = document.getElementById('root');\n  rootElement.setAttribute(\n    'style',\n    `width: ${cellSize * grid.width}px !important; height: ${cellSize *\n    grid.height}px; border: solid 1px #000000`,\n  );\n\n  const pgrid = new _Presentation_Grid__WEBPACK_IMPORTED_MODULE_4__[\"default\"](grid, cellSize, rootElement);\n  pgrid.draw().attachListener((position) => {\n    paint.paint(position.x, position.y);\n  });\n\n  emitter.addListener('grid.cell.change', pgrid);\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });