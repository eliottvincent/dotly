"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Gets a value at a path within an object
 * @public
 * @param  {object}                       object
 * @param  {string}                       path
 * @param  {string|number|boolean|object} [defaultValue]
 * @return {string|number|boolean|object} The value within the object
 */
var get = function(object, path, defaultValue = undefined) {
  let _value = object,
      _path  = path.split(".");

  for (let _i = 0; _i < _path.length; _i++) {
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

exports.get     = get;
exports.default = {
  get    : get,
};
