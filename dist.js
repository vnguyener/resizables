"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ResizablePanels$prop;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ResizablePanels = function ResizablePanels(_ref) {
  var _ref2;

  var children = _ref.children,
      key = _ref.key,
      showResizable = _ref.showResizable,
      hideInitial = _ref.hideInitial,
      onResize = _ref.onResize,
      className = _ref.className;
  var resizableRef = (0, _react.useRef)();

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isDragging = _useState2[0],
      setIsDragging = _useState2[1];

  var _useState3 = (0, _react.useState)({
    '0': 74,
    '1': 74,
    '2': 74
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      panels = _useState4[0],
      setPanels = _useState4[1];

  var _useState5 = (0, _react.useState)(0),
      _useState6 = _slicedToArray(_useState5, 2),
      delta = _useState6[0],
      setDelta = _useState6[1];

  var _useState7 = (0, _react.useState)(0),
      _useState8 = _slicedToArray(_useState7, 2),
      currentPanel = _useState8[0],
      setCurrentPanel = _useState8[1];

  var _useState9 = (0, _react.useState)(0),
      _useState10 = _slicedToArray(_useState9, 2),
      initialPos = _useState10[0],
      setInitialPos = _useState10[1];

  var rest = children.slice(1);
  var startResize = (0, _react.useCallback)(function (event, index) {
    setIsDragging(true);
    setCurrentPanel(index);
    setInitialPos(event.clientX / (document && document.documentElement ? document.documentElement.clientWidth : 1) * 100);
  }, []);
  var stopResize = (0, _react.useCallback)(function () {
    if (isDragging) {
      var _objectSpread2;

      setPanels(_objectSpread({}, panels, (_objectSpread2 = {}, _defineProperty(_objectSpread2, currentPanel, (panels[currentPanel] || 0) - delta), _defineProperty(_objectSpread2, currentPanel - 1, (panels[currentPanel - 1] || 0) + delta), _objectSpread2)));
      setIsDragging(false);
      setDelta(0);
      setCurrentPanel(0);

      if (key != "") {
        var _objectSpread3, _objectSpread4;

        localStorage.setItem(key, JSON.stringify(_objectSpread({}, panels, (_objectSpread3 = {}, _defineProperty(_objectSpread3, currentPanel, (panels[currentPanel] || 0) - delta), _defineProperty(_objectSpread3, currentPanel - 1, (panels[currentPanel - 1] || 0) + delta), _objectSpread3))));
        onResize(_objectSpread({}, panels, (_objectSpread4 = {}, _defineProperty(_objectSpread4, currentPanel, (panels[currentPanel] || 0) - delta), _defineProperty(_objectSpread4, currentPanel - 1, (panels[currentPanel - 1] || 0) + delta), _objectSpread4)));
      }
    }
  }, [currentPanel, delta, key, isDragging, onResize, panels]);
  var resizePanel = (0, _react.useCallback)(function (event) {
    if (isDragging) {
      var _delta = event.clientX / (document && document.documentElement ? document.documentElement.clientWidth : 1) * 100 - initialPos;

      setDelta(_delta);
    }
  }, [initialPos, isDragging]);
  (0, _react.useEffect)(function () {
    var currentRef = resizableRef.current;

    if (currentRef) {
      currentRef.addEventListener("mousemove", resizePanel);
      currentRef.addEventListener("mouseup", stopResize);
      currentRef.addEventListener("mouseleave", stopResize);
    }

    return function () {
      if (currentRef) {
        currentRef.removeEventListener("mousemove", resizePanel);
        currentRef.removeEventListener("mouseup", stopResize);
        currentRef.removeEventListener("mouseleave", stopResize);
      }
    };
  }, [resizePanel, stopResize, resizableRef]);
  (0, _react.useEffect)(function () {
    if (key != "") {
      var storedPanelWidths = localStorage.getItem(key);

      if (storedPanelWidths && showResizable) {
        setPanels(JSON.parse(storedPanelWidths));
        onResize(JSON.parse(storedPanelWidths));
      } else {
        setPanels({
          '0': 74,
          '1': 74,
          '2': 74
        });
      }
    }
  }, [key, onResize, setPanels, showResizable]);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    ref: resizableRef.current,
    className: "panel-container ".concat(className ? className : ""),
    onMouseUp: function onMouseUp() {
      return stopResize();
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "panel",
    style: !hideInitial ? {
      width: "calc(100% - ".concat(panels[1], "vw)")
    } : {
      width: 0
    }
  }, children[0]), (_ref2 = []).concat.apply(_ref2, _toConsumableArray(rest.map(function (child, i) {
    if (rest.length - 1 === i) {
      if (!showResizable) {
        return [/*#__PURE__*/_react["default"].createElement("div", {
          key: "panel_" + i,
          className: "panel",
          style: {
            width: "".concat(panels[i + 1], "vw"),
            flex: "1 1 0%"
          }
        }, child)];
      }

      return [/*#__PURE__*/_react["default"].createElement("div", {
        onMouseDown: function onMouseDown(e) {
          return startResize(e, i + 1);
        },
        key: "resizer_" + i,
        style: currentPanel === i + 1 ? {
          left: delta
        } : {},
        className: "resizer"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        key: "panel_" + i,
        className: "panel",
        style: {
          width: "".concat(panels[i + 1], "vw"),
          flex: "1 1 0%"
        }
      }, child)];
    } else {
      if (!showResizable) {
        return [/*#__PURE__*/_react["default"].createElement("div", {
          key: "panel_" + i,
          className: "panel",
          style: {
            width: panels[i + 1]
          }
        }, child)];
      }

      return [/*#__PURE__*/_react["default"].createElement("div", {
        onMouseDown: function onMouseDown(e) {
          return startResize(e, i + 1);
        },
        key: "resizer_" + i,
        style: currentPanel === i + 1 ? {
          left: delta
        } : {},
        className: "resizer"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        key: "panel_" + i,
        className: "panel",
        style: {
          width: "".concat(panels[i + 1], "vw")
        }
      }, child)];
    }
  })))));
};

ResizablePanels.propTypes = (_ResizablePanels$prop = {
  children: _propTypes["default"].any,
  showResizable: _propTypes["default"].bool,
  hideInitial: _propTypes["default"].bool,
  key: _propTypes["default"].string,
  onResize: _propTypes["default"].func
}, _defineProperty(_ResizablePanels$prop, "key", _propTypes["default"].any), _defineProperty(_ResizablePanels$prop, "className", _propTypes["default"].string), _ResizablePanels$prop);
var _default = ResizablePanels;
exports["default"] = _default;
