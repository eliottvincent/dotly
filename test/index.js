"use strict";

var src = require("./../src/");

var OBJECT = {
  one: "1",
  true: true,

  a: {
    two: 2,

    b: {
      three: 3,
      hello: "hello b"
    },

    c: {
      hello: "hello c"
    }
  },

  u: undefined,
  n: null,
  f: false,
  z: 0
};

var DEFAULT_VALUE = "four";

module.exports = {
  testGet: function(test) {
    test.expect(42);

    var actual = src.get;
    var message = "get should be defined."
    test.ok(actual, message);
    test.equal(typeof actual, "function", message);

    [
      [undefined, "one", undefined],

      [OBJECT, "", undefined],
      [OBJECT, undefined],
      [OBJECT, "a.b.unexistingKey", undefined],
      [OBJECT, "a.b.unexistingKey.anotherUnexistingKey", undefined],

      [OBJECT, "one", OBJECT.one],
      [OBJECT, "true", OBJECT.true],

      [OBJECT, "a", OBJECT.a],
      [OBJECT, "a.two", OBJECT.a.two],
      [OBJECT, "a.b", OBJECT.a.b],
      [OBJECT, "a.b.three", OBJECT.a.b.three],

      [OBJECT, "u", OBJECT.u],
      [OBJECT, "n", OBJECT.n],
      [OBJECT, "f", OBJECT.f],
      [OBJECT, "z", OBJECT.z],

      [OBJECT, "*", [
        {$d: true, path: "one", value: OBJECT.one},
        {$d: true, path: "true", value: OBJECT.true},
        {$d: true, path: "a", value: OBJECT.a},
        {$d: true, path: "u", value: OBJECT.u},
        {$d: true, path: "n", value: OBJECT.n},
        {$d: true, path: "f", value: OBJECT.f},
        {$d: true, path: "z", value: OBJECT.z}
      ]],
      [OBJECT, "*.*", [
        {$d: true, path: "a.two", value: OBJECT.a.two},
        {$d: true, path: "a.b", value: OBJECT.a.b},
        {$d: true, path: "a.c", value: OBJECT.a.c}
      ]],
      [OBJECT, "*.*.hello", [
        {$d: true, path: "a.b.hello", value: OBJECT.a.b.hello},
        {$d: true, path: "a.c.hello", value: OBJECT.a.c.hello}
      ]],
      [OBJECT, "*.two", [
        {$d: true, path: "a.two", value: OBJECT.a.two},
      ]],
      [OBJECT, "a.*", [
        {$d: true, path: "a.two", value: OBJECT.a.two},
        {$d: true, path: "a.b", value: OBJECT.a.b},
        {$d: true, path: "a.c", value: OBJECT.a.c}
      ]],
      [OBJECT, "a.*.*", [
        {$d: true, path: "a.b.three", value: OBJECT.a.b.three},
        {$d: true, path: "a.b.hello", value: OBJECT.a.b.hello},
        {$d: true, path: "a.c.hello", value: OBJECT.a.c.hello}
      ]],
      [OBJECT, "a.b.*", [
        {$d: true, path: "a.b.three", value: OBJECT.a.b.three},
        {$d: true, path: "a.b.hello", value: OBJECT.a.b.hello}
      ]],
      [OBJECT, "a.*.hello", [
        {$d: true, path: "a.b.hello", value: OBJECT.a.b.hello},
        {$d: true, path: "a.c.hello", value: OBJECT.a.c.hello}
      ]],
      [OBJECT, "a.*.hello.unexistingKey", undefined],
      [OBJECT, "a.c.hello.*", undefined]
    ]
      .forEach((entry) => {
        var actual = src.get(entry[0], entry[1]);
        test.deepEqual(actual, entry[2], "get usage should work.");
      });

    [
      [undefined, "one", DEFAULT_VALUE, DEFAULT_VALUE],

      [OBJECT, "", DEFAULT_VALUE, DEFAULT_VALUE],
      [OBJECT, undefined, DEFAULT_VALUE, DEFAULT_VALUE],
      [OBJECT, "a.b.unexistingKey", DEFAULT_VALUE, DEFAULT_VALUE],
      [OBJECT, "a.b.unexistingKey.anotherUnexistingKey", DEFAULT_VALUE, DEFAULT_VALUE],

      [OBJECT, "one", DEFAULT_VALUE, OBJECT.one],
      [OBJECT, "true", DEFAULT_VALUE, OBJECT.true],

      [OBJECT, "a", DEFAULT_VALUE, OBJECT.a],
      [OBJECT, "a.two", DEFAULT_VALUE, OBJECT.a.two],
      [OBJECT, "a.b", DEFAULT_VALUE, OBJECT.a.b],
      [OBJECT, "a.b.three", DEFAULT_VALUE, OBJECT.a.b.three],

      [OBJECT, "u", DEFAULT_VALUE, DEFAULT_VALUE],
      [OBJECT, "n", DEFAULT_VALUE, OBJECT.n],
      [OBJECT, "f", DEFAULT_VALUE, OBJECT.f],
      [OBJECT, "z", DEFAULT_VALUE, OBJECT.z]
    ]
      .forEach((entry) => {
        var actual = src.get(entry[0], entry[1], entry[2]);
        test.equals(actual, entry[3], "get usage with defaultValue should work.");
      });

    test.done();
  },

  testSet: function(test) {
    test.expect(13);

    var actual = src.set;
    var message = "set should be defined."
    test.ok(actual, message);
    test.equal(typeof actual, "function", message);

    [
      [{}, "one", OBJECT.one],
      [{}, "true", OBJECT.true],

      [{}, "a.b.three", OBJECT.a.b.three],
      [{}, "a.b", OBJECT.a.b],
      [{}, "a.two", OBJECT.a.two],
      [{}, "a", OBJECT.a],

      [{}, "u", OBJECT.u],
      [{}, "n", OBJECT.n],
      [{}, "f", OBJECT.f],
      [{}, "z", OBJECT.z],

      [OBJECT, "a.b.three", DEFAULT_VALUE, DEFAULT_VALUE]
    ]
      .forEach((entry) => {
        src.set(entry[0], entry[1], entry[2]);

        var actual = src.get(entry[0], entry[1]);
        test.equals(actual, entry[2], "set usage should work.");
      });

    test.done();
  },

  testRemove: function(test) {
    test.expect(12);

    var actual = src.remove;
    var message = "remove should be defined."
    test.ok(actual, message);
    test.equal(typeof actual, "function", message);

    [
      [OBJECT, "one", OBJECT.one],
      [OBJECT, "true", OBJECT.true],

      [OBJECT, "a.b.three", OBJECT.a.b.three],
      [OBJECT, "a.b", OBJECT.a.b],
      [OBJECT, "a.two", OBJECT.a.two],
      [OBJECT, "a", OBJECT.a],

      [OBJECT, "u", OBJECT.u],
      [OBJECT, "n", OBJECT.n],
      [OBJECT, "f", OBJECT.f],
      [OBJECT, "z", OBJECT.z]
    ]
      .forEach((entry) => {
        src.remove(entry[0], entry[1]);

        var actual = src.get(entry[0], entry[1]);
        test.equals(actual, undefined, "remove usage should work.");
      });

    test.done();
  }
};
