# Dotly

[![Build Status](https://github.com/eliottvincent/dotly/actions/workflows/test.yml/badge.svg)](https://github.com/eliottvincent/dotly/actions) [![Version](https://img.shields.io/npm/v/dotly.svg)](https://www.npmjs.com/package/dotly) [![Downloads](https://img.shields.io/npm/dt/dotly.svg)](https://www.npmjs.com/package/dotly)

Access properties within an object, using dot-notation.


## Usage

```js
const dotly = require("dotly");

var obj = {
  a: {
    b: {
      c: "hello"
    }
  }
};
console.log(dotly.get(obj, "a.b.c"));
// 'hello'
```


## API

### Gets a value at a path within an object
`get(object, path, defaultValue)` returns the value at the specified path:
* `object` must the object from which to get the value
* `path` must be a string representing the path, using dot notation
* `defaultValue` can be used as a default value

```js
const { get } = require("dotly");

var obj = {
  a: {
    b: {
      c: "hello"
    }
  }
};

console.log(get(obj, "a"));
// {b: {c: 'hello'}}

console.log(get(obj, "a.b.c"));
// 'hello'

console.log(get(obj, "a.b.c.d"));
// undefined

console.log(get(obj, "a.b.c.d", "hallo"));
// 'hallo'
```

### Sets a value at a path within an object
`set(object, path, value)` sets a value at the specified path:
* `object` must the object in which to set the value
* `path` must be a string representing the path, using dot notation
* `value` must be the value to set

```js
const { set } = require("dotly");

var obj = {
  a: {
    b: {
      c: "hello"
    }
  }
};

set(obj, "a.b.d.e", "hallo");
console.log(obj);
// {a: {b: {c: 'hello', d: {e: 'hallo'}}}}

set(obj, "a.b", { hello: "hello" });
console.log(obj);
// {a: {b: {hello: 'hello'}}}
```

### Removes a value at a path within an object
`remove(object, path, value)` removes the value at the specified path:
* `object` must the object from which to remove the value
* `path` must be a string representing the path, using dot notation

```js
const { remove } = require("dotly");

var obj = {
  a: {
    b: {
      c: "hello"
    }
  }
};

console.log(obj);
// {a: {b: {c: 'hello'}}}

remove(obj, "a.b.c");
console.log(obj);
// {a: {b: {}}}
```


## License

dotly is released under the MIT License. See the bundled LICENSE file for details.
