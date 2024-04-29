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
  if (path.includes("*")) {
    return __getWildcard(object, path, defaultValue);
  }

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

/**
 * Removes a value at a path within an object
 * @public
 * @param  {object} object
 * @param  {string} path
 * @return {undefined}
 */
var remove = function(object, path) {
  var _path = path.split(".");

  for (var _i = 0; _i < _path.length; _i++) {
    // Reached the end?
    if (_i === _path.length - 1) {
      delete object[_path[_i]];
    } else {
      // Continue the path
      object = object[_path[_i]];
    }
  }
};

/**
 * Gets a value at a path within an object (wildcard)
 * @private
 * @param  {object}                       object
 * @param  {string}                       [path]
 * @param  {string|number|boolean|object} [defaultValue]
 * @return {string|number|boolean|object} The value within the object
 */
var __getWildcard = function(object, path = "", defaultValue = undefined) {
  var _path    = path.split("."),
      _results = __search(object, _path);

  if (_results.length) {
    return _results
  }

  return defaultValue;
};

/**
 * Searches object values based on path (recursive)
 * @private
 * @param  {object} object
 * @param  {object} path
 * @param  {object} currentPath
 * @param  {object} [results]
 * @return {object} Results
 */
var __search = function(object, path, currentPath = [], results = []) {
  if (path.length === 0) {
    results.push({
      $d    : {
        wildcard : true
      },

      path  : currentPath.join("."),
      value : object
    });

    return results;
  }

  // Extract and remove first path' part
  var _part = path[0],
      _path = path.slice(1);

  if (object && typeof object === "object") {
    if (_part === "*") {
      for (var _key in object) {
        __search(
          object[_key],
          _path,
          currentPath.concat(_key),
          results
        );
      }
    } else if (object[_part] !== undefined) {
      __search(
        object[_part],
        _path,
        currentPath.concat(_part),
        results
      );
    }
  }

  return results;
};

exports.get     = get;
exports.set     = set;
exports.remove  = remove;

exports.default = {
  get    : get,
  set    : set,
  remove : remove
};
