"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Gets a value at a path within an object
 * @public
 * @param  {object}                       object
 * @param  {string}                       [path]
 * @param  {string|number|boolean|object} [defaultValue]
 * @return {string|number|boolean|object} The value within the object
 */
var get = function(object, path = "", defaultValue = undefined) {
  var _value = object,
      _path  = path.split(".");

  for (var _i = 0; _i < _path.length; _i++) {
    if (!_value) {
      break;
    }

    _value = _value[_path[_i]];
  }

  if (_value === undefined) {
    return defaultValue;
  }

  return _value;
};

/**
 * Sets a value at a path within an object
 * @public
 * @param  {object}                       object
 * @param  {string}                       path
 * @param  {string|number|boolean|object} value
 * @return {undefined}
 */
var set = function(object, path, value) {
  var _path = path.split(".");

  for (var _i = 0; _i < _path.length; _i++) {
    // Reached the end?
    if (_i === _path.length - 1) {
      object[_path[_i]] = value;
    } else {
      // Initiate the path?
      if (!object[_path[_i]]) {
        object[_path[_i]] = {};
      }

      // Continue the path
      object = object[_path[_i]];
    }
  }
};

exports.get     = get;
exports.set     = set;
exports.default = {
  get    : get,
  set    : set,
};
