(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _menuToggle = require("./menuToggle");

var _menuToggle2 = _interopRequireDefault(_menuToggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import initSlider from './slider';
(0, _menuToggle2.default)();

},{"./menuToggle":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initMenuToggle;

function initMenuToggle() {
  var menuButton = document.querySelector('.js-menu-toggle');
  var menuList = document.querySelector('.js-menu-list');

  function toggleMenu() {
    menuList.classList.toggle('active');
  }

  menuButton.addEventListener('click', function () {
    toggleMenu();
  });
}

},{}]},{},[1]);
