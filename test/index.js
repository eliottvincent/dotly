"use strict";

var src = require("./../src/");

var OBJECT = {
  one: "1",
  true: true,

  a: {
    two: 2,

    b: {
      three: 3
    }
  },

  u: undefined,
  n: null,
  f: false,
  zero: 0
};

var DEFAULT_VALUE = "four";

module.exports = {
  testGet: function(test) {
    test.expect(32);

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
      [OBJECT, "zero", OBJECT.zero]
    ]
      .forEach((entry) => {
        var actual = src.get(entry[0], entry[1]);
        test.equals(actual, entry[2], "usage should work.");
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
      [OBJECT, "zero", DEFAULT_VALUE, OBJECT.zero],
    ]
      .forEach((entry) => {
        var actual = src.get(entry[0], entry[1], entry[2]);
        test.equals(actual, entry[3], "usage with defaultValue should work.");
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
      [{}, "zero", OBJECT.zero],

      [OBJECT, "a.b.three", DEFAULT_VALUE, DEFAULT_VALUE]
    ]
      .forEach((entry) => {
        src.set(entry[0], entry[1], entry[2]);

        var actual = src.get(entry[0], entry[1]);
        test.equals(actual, entry[2], "usage should work.");
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
      [OBJECT, "zero", OBJECT.zero]
    ]
      .forEach((entry) => {
        src.remove(entry[0], entry[1]);

        var actual = src.get(entry[0], entry[1]);
        test.equals(actual, undefined, "usage should work.");
      });

    test.done();
  }
};
