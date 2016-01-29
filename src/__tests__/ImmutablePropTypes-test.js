/* eslint-disable new-cap */
import expect from 'expect.js';
var PropTypes;
var React;
var Immutable;

var requiredMessage =
  'Required prop `testProp` was not specified in `testComponent`.';

function typeCheckFail(declaration, value, message) {
  var props = {testProp: value};
  var error = declaration(
    props,
    'testProp',
    'testComponent',
    'prop'
  );
  expect(error instanceof Error).to.be(true);
  expect(error.message).to.be(message);
}

function typeCheckPass(declaration, value) {
  var props = {testProp: value};
  var error = declaration(
    props,
    'testProp',
    'testComponent',
    'prop'
  );
  expect(error).not.to.be.ok();
}

describe('ImmutablePropTypes', function() {
  beforeEach(function() {
    PropTypes = require('../ImmutablePropTypes');
    React = require('react');
    Immutable = require('immutable');
  });

  describe('PropTypes config', function() {
    it('should fail if typeChecker is not a function', function() {
      typeCheckFail(
        PropTypes.listOf({x: React.PropTypes.string}),
        Immutable.List([Immutable.Map({x: 'y'})]),
        'Invalid typeChecker supplied to ' +
        '`testComponent` for propType `testProp`, expected a function.'
      );
      typeCheckPass(
        PropTypes.listOf(PropTypes.contains({x: React.PropTypes.string})),
        Immutable.List([Immutable.Map({x: 'y'})]));
    });
  });

  describe('Primitive Types', function() {
    it('should not warn for valid values', function() {
      typeCheckPass(PropTypes.list, Immutable.List());
      typeCheckPass(PropTypes.map, Immutable.Map());
      typeCheckPass(PropTypes.map, Immutable.OrderedMap());
      typeCheckPass(PropTypes.orderedMap, Immutable.OrderedMap());
      typeCheckPass(PropTypes.record, new (Immutable.Record({a: 1}))());
      typeCheckPass(PropTypes.set, Immutable.Set());
      typeCheckPass(PropTypes.set, Immutable.OrderedSet());
      typeCheckPass(PropTypes.orderedSet, Immutable.OrderedSet());
      typeCheckPass(PropTypes.stack, Immutable.Stack());
      typeCheckPass(PropTypes.seq, Immutable.Seq());
      typeCheckPass(PropTypes.iterable, Immutable.Iterable());
      typeCheckPass(PropTypes.iterable, Immutable.List());
      typeCheckPass(PropTypes.iterable, Immutable.Map());
      typeCheckPass(PropTypes.iterable, Immutable.OrderedMap());
      typeCheckPass(PropTypes.iterable, Immutable.Set());
      typeCheckPass(PropTypes.iterable, Immutable.OrderedSet());
      typeCheckPass(PropTypes.iterable, Immutable.Stack());
      typeCheckPass(PropTypes.iterable, Immutable.Seq());
    });
    it('should warn for invalid lists', function() {
      typeCheckFail(
        PropTypes.list,
        [],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected `List`.'
      );
      typeCheckFail(
        PropTypes.list,
        {},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected `List`.'
      );
      typeCheckFail(
        PropTypes.list,
        '',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected `List`.'
      );
      typeCheckFail(
        PropTypes.list,
        false,
        'Invalid prop `testProp` of type `boolean` supplied to ' +
        '`testComponent`, expected `List`.'
      );
      typeCheckFail(
        PropTypes.list,
        0,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected `List`.'
      );
      typeCheckFail(
        PropTypes.list,
        Immutable.Map(),
        'Invalid prop `testProp` of type `Immutable.Map` supplied to ' +
        '`testComponent`, expected `List`.'
      );
      typeCheckFail(
        PropTypes.list,
        Immutable.Iterable(),
        'Invalid prop `testProp` of type `Immutable.Seq` supplied to ' +
        '`testComponent`, expected `List`.'
      );
    });
    it('should warn for invalid maps', function() {
      typeCheckFail(
        PropTypes.map,
        [],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected `Map`.'
      );
      typeCheckFail(
        PropTypes.map,
        {},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected `Map`.'
      );
      typeCheckFail(
        PropTypes.map,
        '',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected `Map`.'
      );
      typeCheckFail(
        PropTypes.map,
        false,
        'Invalid prop `testProp` of type `boolean` supplied to ' +
        '`testComponent`, expected `Map`.'
      );
      typeCheckFail(
        PropTypes.map,
        0,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected `Map`.'
      );
      typeCheckFail(
        PropTypes.map,
        Immutable.List(),
        'Invalid prop `testProp` of type `Immutable.List` supplied to ' +
        '`testComponent`, expected `Map`.'
      );
      typeCheckFail(
        PropTypes.map,
        Immutable.Iterable(),
        'Invalid prop `testProp` of type `Immutable.Seq` supplied to ' +
        '`testComponent`, expected `Map`.'
      );
    });
    it('should warn for invalid records', function() {
      typeCheckFail(
        PropTypes.record,
        [],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected `Record`.'
      );
      typeCheckFail(
        PropTypes.record,
        {},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected `Record`.'
      );
      typeCheckFail(
        PropTypes.record,
        '',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected `Record`.'
      );
      typeCheckFail(
        PropTypes.record,
        false,
        'Invalid prop `testProp` of type `boolean` supplied to ' +
        '`testComponent`, expected `Record`.'
      );
      typeCheckFail(
        PropTypes.record,
        0,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected `Record`.'
      );
      typeCheckFail(
        PropTypes.record,
        Immutable.List(),
        'Invalid prop `testProp` of type `Immutable.List` supplied to ' +
        '`testComponent`, expected `Record`.'
      );
      typeCheckFail(
        PropTypes.record,
        Immutable.Iterable(),
        'Invalid prop `testProp` of type `Immutable.Seq` supplied to ' +
        '`testComponent`, expected `Record`.'
      );
    });
    it('should be implicitly optional and not warn without values', function() {
      typeCheckPass(PropTypes.list, null);
      typeCheckPass(PropTypes.list, undefined);
    });
    it('should warn for missing required values', function() {
      typeCheckFail(PropTypes.list.isRequired, null, requiredMessage);
      typeCheckFail(PropTypes.list.isRequired, undefined, requiredMessage);
    });
  });

  describe('ListOf Type', function() {
    it('should support the listOf propTypes', function() {
      typeCheckPass(PropTypes.listOf(React.PropTypes.number), Immutable.List([1, 2, 3]));
      typeCheckPass(PropTypes.listOf(React.PropTypes.string), Immutable.List(['a', 'b', 'c']));
      typeCheckPass(PropTypes.listOf(React.PropTypes.oneOf(['a', 'b'])), Immutable.List(['a', 'b']));
    });

    it('should support listOf with complex types', function() {
      typeCheckPass(
        PropTypes.listOf(React.PropTypes.shape({a: React.PropTypes.number.isRequired})),
        Immutable.List([{a: 1}, {a: 2}])
      );

      typeCheckPass(
        PropTypes.listOf(PropTypes.shape({a: React.PropTypes.number.isRequired})),
        Immutable.fromJS([{a: 1}, {a: 2}])
      );

      function Thing() {}
      typeCheckPass(
        PropTypes.listOf(React.PropTypes.instanceOf(Thing)),
        Immutable.List([new Thing(), new Thing()])
      );
    });

    it('should warn with invalid items in the list', function() {
      typeCheckFail(
        PropTypes.listOf(React.PropTypes.number),
        Immutable.List([1, 2, 'b']),
        'Invalid prop `2` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );
    });

    it('should warn with invalid complex types', function() {
      function Thing() {}
      var name = Thing.name || '<<anonymous>>';

      typeCheckFail(
        PropTypes.listOf(React.PropTypes.instanceOf(Thing)),
        Immutable.List([new Thing(), 'xyz']),
        'Invalid prop `1` of type `String` supplied to `testComponent`, expected instance of `' +
        name + '`.'
      );
    });

    it('should warn when passed something other than an Immutable.List', function() {
      typeCheckFail(
        PropTypes.listOf(React.PropTypes.number),
        {'0': 'maybe-array', length: 1},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected an Immutable.js List.'
      );
      typeCheckFail(
        PropTypes.listOf(React.PropTypes.number),
        123,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected an Immutable.js List.'
      );
      typeCheckFail(
        PropTypes.listOf(React.PropTypes.number),
        'string',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected an Immutable.js List.'
      );
      typeCheckFail(
        PropTypes.listOf(React.PropTypes.number),
        [1, 2, 3],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected an Immutable.js List.'
      );
    });

    it('should not warn when passing an empty array', function() {
      typeCheckPass(PropTypes.listOf(React.PropTypes.number), Immutable.List());
      typeCheckPass(PropTypes.listOf(React.PropTypes.number), Immutable.List([]));
    });

    it('should be implicitly optional and not warn without values', function() {
      typeCheckPass(PropTypes.listOf(React.PropTypes.number), null);
      typeCheckPass(PropTypes.listOf(React.PropTypes.number), undefined);
    });

    it('should warn for missing required values', function() {
      typeCheckFail(
        PropTypes.listOf(React.PropTypes.number).isRequired,
        null,
        requiredMessage
      );
      typeCheckFail(
        PropTypes.listOf(React.PropTypes.number).isRequired,
        undefined,
        requiredMessage
      );
    });
  });

  describe('MapOf Type', function() {
    it('should support the mapOf propTypes', function() {
      typeCheckPass(PropTypes.mapOf(React.PropTypes.number), Immutable.Map({1: 1, 2: 2, 3: 3}));
      typeCheckPass(PropTypes.mapOf(React.PropTypes.string), Immutable.Map({1: 'a', 2: 'b', 3: 'c'}));
      typeCheckPass(PropTypes.mapOf(React.PropTypes.oneOf(['a', 'b'])), Immutable.Map({1: 'a', 2: 'b'}));
    });

    it('should support mapOf with complex types', function() {
      typeCheckPass(
        PropTypes.mapOf(React.PropTypes.shape({a: React.PropTypes.number.isRequired})),
        Immutable.Map({1: {a: 1}, 2: {a: 2}})
      );

      typeCheckPass(
        PropTypes.mapOf(PropTypes.shape({a: React.PropTypes.number.isRequired})),
        Immutable.fromJS({1: {a: 1}, 2: {a: 2}})
      );

      function Thing() {}
      typeCheckPass(
        PropTypes.mapOf(React.PropTypes.instanceOf(Thing)),
        Immutable.Map({ 1: new Thing(), 2: new Thing() })
      );
    });

    it('should warn with invalid items in the map', function() {
      typeCheckFail(
        PropTypes.mapOf(React.PropTypes.number),
        Immutable.Map({ 1: 1, 2: 2, 3: 'b' }),
        'Invalid prop `2` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );
    });

    it('should warn with invalid complex types', function() {
      function Thing() {}
      var name = Thing.name || '<<anonymous>>';

      typeCheckFail(
        PropTypes.mapOf(React.PropTypes.instanceOf(Thing)),
        Immutable.Map({ 1: new Thing(), 2: 'xyz' }),
        'Invalid prop `1` of type `String` supplied to `testComponent`, expected instance of `' +
        name + '`.'
      );
    });

    it('should warn when passed something other than an Immutable.Map', function() {
      typeCheckFail(
        PropTypes.mapOf(React.PropTypes.number),
        {'0': 'maybe-array', length: 1},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected an Immutable.js Map.'
      );
      typeCheckFail(
        PropTypes.mapOf(React.PropTypes.number),
        123,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected an Immutable.js Map.'
      );
      typeCheckFail(
        PropTypes.mapOf(React.PropTypes.number),
        'string',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected an Immutable.js Map.'
      );
      typeCheckFail(
        PropTypes.mapOf(React.PropTypes.number),
        [1, 2, 3],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected an Immutable.js Map.'
      );
    });

    it('should not warn when passing an empty object', function() {
      typeCheckPass(PropTypes.mapOf(React.PropTypes.number), Immutable.Map());
      typeCheckPass(PropTypes.mapOf(React.PropTypes.number), Immutable.Map({}));
    });

    it('should be implicitly optional and not warn without values', function() {
      typeCheckPass(PropTypes.mapOf(React.PropTypes.number), null);
      typeCheckPass(PropTypes.mapOf(React.PropTypes.number), undefined);
    });

    it('should warn for missing required values', function() {
      typeCheckFail(
        PropTypes.mapOf(React.PropTypes.number).isRequired,
        null,
        requiredMessage
      );
      typeCheckFail(
        PropTypes.mapOf(React.PropTypes.number).isRequired,
        undefined,
        requiredMessage
      );
    });
  });

  describe('OrderedMapOf Type', function() {
    it('should support the orderedMapOf propTypes', function() {
      typeCheckPass(PropTypes.orderedMapOf(React.PropTypes.number), Immutable.OrderedMap({1: 1, 2: 2, 3: 3}));
      typeCheckPass(PropTypes.orderedMapOf(React.PropTypes.string), Immutable.OrderedMap({1: 'a', 2: 'b', 3: 'c'}));
      typeCheckPass(PropTypes.orderedMapOf(React.PropTypes.oneOf(['a', 'b'])), Immutable.OrderedMap({1: 'a', 2: 'b'}));
    });

    it('should support orderedMapOf with complex types', function() {
      typeCheckPass(
        PropTypes.orderedMapOf(React.PropTypes.shape({a: React.PropTypes.number.isRequired})),
        Immutable.OrderedMap({1: {a: 1}, 2: {a: 2}})
      );

      typeCheckPass(
        PropTypes.orderedMapOf(PropTypes.shape({a: React.PropTypes.number.isRequired})),
        Immutable.fromJS({1: {a: 1}, 2: {a: 2}}).toOrderedMap()
      );

      function Thing() {}
      typeCheckPass(
        PropTypes.orderedMapOf(React.PropTypes.instanceOf(Thing)),
        Immutable.OrderedMap({ 1: new Thing(), 2: new Thing() })
      );
    });

    it('should warn with invalid items in the map', function() {
      typeCheckFail(
        PropTypes.orderedMapOf(React.PropTypes.number),
        Immutable.OrderedMap({ 1: 1, 2: 2, 3: 'b' }),
        'Invalid prop `2` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );
    });

    it('should warn with invalid complex types', function() {
      function Thing() {}
      var name = Thing.name || '<<anonymous>>';

      typeCheckFail(
        PropTypes.orderedMapOf(React.PropTypes.instanceOf(Thing)),
        Immutable.OrderedMap({ 1: new Thing(), 2: 'xyz' }),
        'Invalid prop `1` of type `String` supplied to `testComponent`, expected instance of `' +
        name + '`.'
      );
    });

    it('should warn when passed something other than an Immutable.OrderedMap', function() {
      typeCheckFail(
        PropTypes.orderedMapOf(React.PropTypes.number),
        {'0': 'maybe-array', length: 1},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected an Immutable.js OrderedMap.'
      );
      typeCheckFail(
        PropTypes.orderedMapOf(React.PropTypes.number),
        123,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected an Immutable.js OrderedMap.'
      );
      typeCheckFail(
        PropTypes.orderedMapOf(React.PropTypes.number),
        'string',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected an Immutable.js OrderedMap.'
      );
      typeCheckFail(
        PropTypes.orderedMapOf(React.PropTypes.number),
        [1, 2, 3],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected an Immutable.js OrderedMap.'
      );
      typeCheckFail(
        PropTypes.orderedMapOf(React.PropTypes.number),
        Immutable.fromJS({a: 1, b: 2 }),
        'Invalid prop `testProp` of type `Immutable.Map` supplied to ' +
        '`testComponent`, expected an Immutable.js OrderedMap.'
      );
    });

    it('should not warn when passing an empty object', function() {
      typeCheckPass(PropTypes.orderedMapOf(React.PropTypes.number), Immutable.OrderedMap());
      typeCheckPass(PropTypes.orderedMapOf(React.PropTypes.number), Immutable.OrderedMap({}));
    });

    it('should be implicitly optional and not warn without values', function() {
      typeCheckPass(PropTypes.orderedMapOf(React.PropTypes.number), null);
      typeCheckPass(PropTypes.orderedMapOf(React.PropTypes.number), undefined);
    });

    it('should warn for missing required values', function() {
      typeCheckFail(
        PropTypes.orderedMapOf(React.PropTypes.number).isRequired,
        null,
        requiredMessage
      );
      typeCheckFail(
        PropTypes.orderedMapOf(React.PropTypes.number).isRequired,
        undefined,
        requiredMessage
      );
    });
  });

  describe('SetOf Type', function() {
    it('should support the setOf propTypes', function() {
      typeCheckPass(PropTypes.setOf(React.PropTypes.number), Immutable.Set([1, 2, 3]));
      typeCheckPass(PropTypes.setOf(React.PropTypes.string), Immutable.Set(['a', 'b', 'c']));
      typeCheckPass(PropTypes.setOf(React.PropTypes.oneOf(['a', 'b'])), Immutable.Set(['a', 'b']));
    });

    it('should support setOf with complex types', function() {
      typeCheckPass(
        PropTypes.setOf(React.PropTypes.shape({a: React.PropTypes.number.isRequired})),
        Immutable.Set([{a: 1}, {a: 2}])
      );

      function Thing() {}
      typeCheckPass(
        PropTypes.setOf(React.PropTypes.instanceOf(Thing)),
        Immutable.Set([new Thing(), new Thing() ])
      );
    });

    it('should warn with invalid items in the set', function() {
      typeCheckFail(
        PropTypes.setOf(React.PropTypes.number),
        Immutable.Set([1, 2, 'b']),
        'Invalid prop `2` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );
    });

    it('should warn with invalid complex types', function() {
      function Thing() {}
      var name = Thing.name || '<<anonymous>>';

      typeCheckFail(
        PropTypes.setOf(React.PropTypes.instanceOf(Thing)),
        Immutable.Set([new Thing(), 'xyz' ]),
        'Invalid prop `1` of type `String` supplied to `testComponent`, expected instance of `' +
        name + '`.'
      );
    });

    it('should warn when passed something other than an Immutable.Set', function() {
      typeCheckFail(
        PropTypes.setOf(React.PropTypes.number),
        {'0': 'maybe-array', length: 1},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected an Immutable.js Set.'
      );
      typeCheckFail(
        PropTypes.setOf(React.PropTypes.number),
        123,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected an Immutable.js Set.'
      );
      typeCheckFail(
        PropTypes.setOf(React.PropTypes.number),
        'string',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected an Immutable.js Set.'
      );
      typeCheckFail(
        PropTypes.setOf(React.PropTypes.number),
        [1, 2, 3],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected an Immutable.js Set.'
      );
    });

    it('should not warn when passing an empty object', function() {
      typeCheckPass(PropTypes.setOf(React.PropTypes.number), Immutable.Set());
      typeCheckPass(PropTypes.setOf(React.PropTypes.number), Immutable.Set([]));
    });

    it('should be implicitly optional and not warn without values', function() {
      typeCheckPass(PropTypes.setOf(React.PropTypes.number), null);
      typeCheckPass(PropTypes.setOf(React.PropTypes.number), undefined);
    });

    it('should warn for missing required values', function() {
      typeCheckFail(
        PropTypes.setOf(React.PropTypes.number).isRequired,
        null,
        requiredMessage
      );
      typeCheckFail(
        PropTypes.setOf(React.PropTypes.number).isRequired,
        undefined,
        requiredMessage
      );
    });
  });

  describe('OrderedSetOf Type', function() {
    it('should support the orderedSetOf propTypes', function() {
      typeCheckPass(PropTypes.orderedSetOf(React.PropTypes.number), Immutable.OrderedSet([1, 2, 3]));
      typeCheckPass(PropTypes.orderedSetOf(React.PropTypes.string), Immutable.OrderedSet(['a', 'b', 'c']));
      typeCheckPass(PropTypes.orderedSetOf(React.PropTypes.oneOf(['a', 'b'])), Immutable.OrderedSet(['a', 'b']));
    });

    it('should support orderedSetOf with complex types', function() {
      typeCheckPass(
        PropTypes.orderedSetOf(React.PropTypes.shape({a: React.PropTypes.number.isRequired})),
        Immutable.OrderedSet([{a: 1}, {a: 2}])
      );

      function Thing() {}
      typeCheckPass(
        PropTypes.orderedSetOf(React.PropTypes.instanceOf(Thing)),
        Immutable.OrderedSet([new Thing(), new Thing() ])
      );
    });

    it('should warn with invalid items in the set', function() {
      typeCheckFail(
        PropTypes.orderedSetOf(React.PropTypes.number),
        Immutable.OrderedSet([1, 2, 'b']),
        'Invalid prop `2` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );
    });

    it('should warn with invalid complex types', function() {
      function Thing() {}
      var name = Thing.name || '<<anonymous>>';

      typeCheckFail(
        PropTypes.orderedSetOf(React.PropTypes.instanceOf(Thing)),
        Immutable.OrderedSet([new Thing(), 'xyz' ]),
        'Invalid prop `1` of type `String` supplied to `testComponent`, expected instance of `' +
        name + '`.'
      );
    });

    it('should warn when passed something other than an Immutable.OrderedSet', function() {
      typeCheckFail(
        PropTypes.orderedSetOf(React.PropTypes.number),
        {'0': 'maybe-array', length: 1},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected an Immutable.js OrderedSet.'
      );
      typeCheckFail(
        PropTypes.orderedSetOf(React.PropTypes.number),
        123,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected an Immutable.js OrderedSet.'
      );
      typeCheckFail(
        PropTypes.orderedSetOf(React.PropTypes.number),
        'string',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected an Immutable.js OrderedSet.'
      );
      typeCheckFail(
        PropTypes.orderedSetOf(React.PropTypes.number),
        [1, 2, 3],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected an Immutable.js OrderedSet.'
      );
      typeCheckFail(
        PropTypes.orderedSetOf(React.PropTypes.number),
        Immutable.List([1, 2, 3]),
        'Invalid prop `testProp` of type `Immutable.List` supplied to ' +
        '`testComponent`, expected an Immutable.js OrderedSet.'
      );
      typeCheckFail(
        PropTypes.orderedSetOf(React.PropTypes.number),
        Immutable.Set([1, 2, 3]),
        'Invalid prop `testProp` of type `Immutable.Set` supplied to ' +
        '`testComponent`, expected an Immutable.js OrderedSet.'
      );
    });

    it('should not warn when passing an empty object', function() {
      typeCheckPass(PropTypes.orderedSetOf(React.PropTypes.number), Immutable.OrderedSet());
      typeCheckPass(PropTypes.orderedSetOf(React.PropTypes.number), Immutable.OrderedSet([]));
    });

    it('should be implicitly optional and not warn without values', function() {
      typeCheckPass(PropTypes.orderedSetOf(React.PropTypes.number), null);
      typeCheckPass(PropTypes.orderedSetOf(React.PropTypes.number), undefined);
    });

    it('should warn for missing required values', function() {
      typeCheckFail(
        PropTypes.orderedSetOf(React.PropTypes.number).isRequired,
        null,
        requiredMessage
      );
      typeCheckFail(
        PropTypes.orderedSetOf(React.PropTypes.number).isRequired,
        undefined,
        requiredMessage
      );
    });
  });

  describe('IterableOf Type', function() {
    it('should support the iterableOf propTypes', function() {
      typeCheckPass(PropTypes.iterableOf(React.PropTypes.number), Immutable.List([1, 2, 3]));
      typeCheckPass(PropTypes.iterableOf(React.PropTypes.string), Immutable.List(['a', 'b', 'c']));
      typeCheckPass(PropTypes.iterableOf(React.PropTypes.oneOf(['a', 'b'])), Immutable.List(['a', 'b']));

      typeCheckPass(PropTypes.iterableOf(React.PropTypes.number), Immutable.Map({1: 1, 2: 2, 3: 3}));
      typeCheckPass(PropTypes.iterableOf(React.PropTypes.string), Immutable.Map({1: 'a', 2: 'b', 3: 'c'}));
      typeCheckPass(PropTypes.iterableOf(React.PropTypes.oneOf(['a', 'b'])), Immutable.Map({1: 'a', 2: 'b'}));
    });

    it('should support iterableOf with complex types', function() {
      function Thing() {}

      typeCheckPass(
        PropTypes.iterableOf(React.PropTypes.shape({a: React.PropTypes.number.isRequired})),
        Immutable.List([{a: 1}, {a: 2}])
      );

      typeCheckPass(
        PropTypes.iterableOf(PropTypes.shape({a: React.PropTypes.number.isRequired})),
        Immutable.fromJS([{a: 1}, {a: 2}])
      );

      typeCheckPass(
        PropTypes.iterableOf(React.PropTypes.instanceOf(Thing)),
        Immutable.List([new Thing(), new Thing()])
      );

      typeCheckPass(
        PropTypes.iterableOf(React.PropTypes.shape({a: React.PropTypes.number.isRequired})),
        Immutable.Map({1: {a: 1}, 2: {a: 2}})
      );

      typeCheckPass(
        PropTypes.iterableOf(PropTypes.shape({a: React.PropTypes.number.isRequired})),
        Immutable.fromJS({1: {a: 1}, 2: {a: 2}})
      );

      typeCheckPass(
        PropTypes.iterableOf(React.PropTypes.instanceOf(Thing)),
        Immutable.Map({ 1: new Thing(), 2: new Thing() })
      );
    });

    it('should warn with invalid items in the list', function() {
      typeCheckFail(
        PropTypes.iterableOf(React.PropTypes.number),
        Immutable.List([1, 2, 'b']),
        'Invalid prop `2` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );

      typeCheckFail(
        PropTypes.iterableOf(React.PropTypes.number),
        Immutable.Map({ 1: 1, 2: 2, 3: 'b' }),
        'Invalid prop `2` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );
    });

    it('should warn with invalid complex types', function() {
      function Thing() {}
      var name = Thing.name || '<<anonymous>>';

      typeCheckFail(
        PropTypes.iterableOf(React.PropTypes.instanceOf(Thing)),
        Immutable.List([new Thing(), 'xyz']),
        'Invalid prop `1` of type `String` supplied to `testComponent`, expected instance of `' +
        name + '`.'
      );

      typeCheckFail(
        PropTypes.iterableOf(React.PropTypes.instanceOf(Thing)),
        Immutable.Map({ 1: new Thing(), 2: 'xyz' }),
        'Invalid prop `1` of type `String` supplied to `testComponent`, expected instance of `' +
        name + '`.'
      );
    });

    it('should warn when passed something other than an Immutable.Iterable', function() {
      typeCheckFail(
        PropTypes.iterableOf(React.PropTypes.number),
        {'0': 'maybe-array', length: 1},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected an Immutable.js Iterable.'
      );
      typeCheckFail(
        PropTypes.iterableOf(React.PropTypes.number),
        123,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected an Immutable.js Iterable.'
      );
      typeCheckFail(
        PropTypes.iterableOf(React.PropTypes.number),
        'string',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected an Immutable.js Iterable.'
      );
      typeCheckFail(
        PropTypes.iterableOf(React.PropTypes.number),
        [1, 2, 3],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected an Immutable.js Iterable.'
      );
    });

    it('should not warn when passing an empty iterable', function() {
      typeCheckPass(PropTypes.iterableOf(React.PropTypes.number), Immutable.List());
      typeCheckPass(PropTypes.iterableOf(React.PropTypes.number), Immutable.List([]));
      typeCheckPass(PropTypes.iterableOf(React.PropTypes.number), Immutable.Map({}));
    });

    it('should be implicitly optional and not warn without values', function() {
      typeCheckPass(PropTypes.iterableOf(React.PropTypes.number), null);
      typeCheckPass(PropTypes.iterableOf(React.PropTypes.number), undefined);
    });

    it('should warn for missing required values', function() {
      typeCheckFail(
        PropTypes.iterableOf(React.PropTypes.number).isRequired,
        null,
        requiredMessage
      );
      typeCheckFail(
        PropTypes.iterableOf(React.PropTypes.number).isRequired,
        undefined,
        requiredMessage
      );
    });
  });

  describe('RecordOf Type', function() {
    it('should warn for non objects', function() {
      typeCheckFail(
        PropTypes.recordOf({}),
        'some string',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected an Immutable.js Record.'
      );
      typeCheckFail(
        PropTypes.recordOf({}),
        ['array'],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected an Immutable.js Record.'
      );
      typeCheckFail(
        PropTypes.recordOf({}),
        {a: 1},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected an Immutable.js Record.'
      );
      typeCheckFail(
        PropTypes.recordOf({}),
        Immutable.Map({ a: 1 }),
        'Invalid prop `testProp` of type `Immutable.Map` supplied to ' +
        '`testComponent`, expected an Immutable.js Record.'
      );
    });

    it('should not warn for empty values', function() {
      typeCheckPass(PropTypes.recordOf({}), undefined);
      typeCheckPass(PropTypes.recordOf({}), null);
    });

    it('should not warn for an empty Record object', function() {
      typeCheckPass(PropTypes.recordOf({}).isRequired, new (Immutable.Record({}))());
    });

    it('should not warn for non specified types', function() {
      typeCheckPass(PropTypes.recordOf({}), new (Immutable.Record({key: 1}))());
    });

    it('should not warn for valid types', function() {
      typeCheckPass(PropTypes.recordOf({key: React.PropTypes.number}), new (Immutable.Record({key: 1}))());
    });

    it('should ignore null keys', function() {
      typeCheckPass(PropTypes.recordOf({key: null}), new (Immutable.Record({key: 1}))());
    });

    it('should warn for required valid types', function() {
      typeCheckFail(
        PropTypes.recordOf({key: React.PropTypes.number.isRequired}),
        new (Immutable.Record({}))(),
        'Required prop `key` was not specified in `testComponent`.'
      );
    });

    it('should warn for the first required type', function() {
      typeCheckFail(
        PropTypes.recordOf({
          key: React.PropTypes.number.isRequired,
          secondKey: React.PropTypes.number.isRequired
        }),
        new (Immutable.Record({}))(),
        'Required prop `key` was not specified in `testComponent`.'
      );
    });

    it('should warn for invalid key types', function() {
      typeCheckFail(PropTypes.recordOf({key: React.PropTypes.number}),
        new (Immutable.Record({key: 'abc'}))(),
        'Invalid prop `key` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );
    });

    it('should be implicitly optional and not warn without values', function() {
      typeCheckPass(
        PropTypes.recordOf(PropTypes.recordOf({key: React.PropTypes.number})), null
      );
      typeCheckPass(
        PropTypes.recordOf(PropTypes.recordOf({key: React.PropTypes.number})), undefined
      );
    });

    it('should warn for missing required values', function() {
      typeCheckFail(
        PropTypes.recordOf({key: React.PropTypes.number}).isRequired,
        null,
        requiredMessage
      );
      typeCheckFail(
        PropTypes.recordOf({key: React.PropTypes.number}).isRequired,
        undefined,
        requiredMessage
      );
    });

    it('should accept Records', function() {
      var Type = new Immutable.Record({});

      typeCheckPass(PropTypes.recordOf(Type), new Type());
    });

    it('should not accept wrong Records', function() {
      var TypeA = new Immutable.Record({});
      var TypeB = new Immutable.Record({});

      typeCheckFail(
          PropTypes.recordOf(TypeA),
          new TypeB(),
          'Invalid prop `testProp` supplied to `testComponent`, expected Immutable.js Record of different type.'
      );
    });
  });

  describe('Shape Types [deprecated]', function() {
    it('should warn for non objects', function() {
      typeCheckFail(
        PropTypes.shape({}),
        'some string',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected an Immutable.js Iterable.'
      );
      typeCheckFail(
        PropTypes.shape({}),
        ['array'],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected an Immutable.js Iterable.'
      );
      typeCheckFail(
        PropTypes.shape({}),
        {a: 1},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected an Immutable.js Iterable.'
      );
    });

    it('should not warn for empty values', function() {
      typeCheckPass(PropTypes.shape({}), undefined);
      typeCheckPass(PropTypes.shape({}), null);
      typeCheckPass(PropTypes.shape({}), Immutable.fromJS({}));
    });

    it('should not warn for an empty Immutable object', function() {
      typeCheckPass(PropTypes.shape({}).isRequired, Immutable.fromJS({}));
    });

    it('should not warn for non specified types', function() {
      typeCheckPass(PropTypes.shape({}), Immutable.fromJS({key: 1}));
    });

    it('should not warn for valid types', function() {
      typeCheckPass(PropTypes.shape({key: React.PropTypes.number}), Immutable.fromJS({key: 1}));
    });

    it('should ignore null keys', function() {
      typeCheckPass(PropTypes.shape({key: null}), Immutable.fromJS({key: 1}));
    });

    it('should warn for required valid types', function() {
      typeCheckFail(
        PropTypes.shape({key: React.PropTypes.number.isRequired}),
        Immutable.fromJS({}),
        'Required prop `key` was not specified in `testComponent`.'
      );
    });

    it('should warn for the first required type', function() {
      typeCheckFail(
        PropTypes.shape({
          key: React.PropTypes.number.isRequired,
          secondKey: React.PropTypes.number.isRequired
        }),
        Immutable.fromJS({}),
        'Required prop `key` was not specified in `testComponent`.'
      );
    });

    it('should warn for invalid key types', function() {
      typeCheckFail(PropTypes.shape({key: React.PropTypes.number}),
        Immutable.fromJS({key: 'abc'}),
        'Invalid prop `key` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );
    });

    it('should be implicitly optional and not warn without values', function() {
      typeCheckPass(
        PropTypes.shape(PropTypes.shape({key: React.PropTypes.number})), null
      );
      typeCheckPass(
        PropTypes.shape(PropTypes.shape({key: React.PropTypes.number})), undefined
      );
    });

    it('should warn for missing required values', function() {
      typeCheckFail(
        PropTypes.shape({key: React.PropTypes.number}).isRequired,
        null,
        requiredMessage
      );
      typeCheckFail(
        PropTypes.shape({key: React.PropTypes.number}).isRequired,
        undefined,
        requiredMessage
      );
    });

    it('should probably not validate a list, but does', function() {
      var shape = {
        0: React.PropTypes.number.isRequired,
        1: React.PropTypes.string.isRequired,
        2: React.PropTypes.string
      };
      typeCheckPass(PropTypes.shape(shape), Immutable.List([1, '2']));
    });
  });

  describe('Contains Types', function() {
    it('should warn for non objects', function() {
      typeCheckFail(
        PropTypes.contains({}),
        'some string',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected an Immutable.js Iterable.'
      );
      typeCheckFail(
        PropTypes.contains({}),
        ['array'],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected an Immutable.js Iterable.'
      );
      typeCheckFail(
        PropTypes.contains({}),
        {a: 1},
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected an Immutable.js Iterable.'
      );
    });

    it('should not warn for empty values', function() {
      typeCheckPass(PropTypes.contains({}), undefined);
      typeCheckPass(PropTypes.contains({}), null);
      typeCheckPass(PropTypes.contains({}), Immutable.fromJS({}));
    });

    it('should not warn for an empty Immutable object', function() {
      typeCheckPass(PropTypes.contains({}).isRequired, Immutable.fromJS({}));
    });

    it('should not warn for non specified types', function() {
      typeCheckPass(PropTypes.contains({}), Immutable.fromJS({key: 1}));
    });

    it('should not warn for valid types', function() {
      typeCheckPass(PropTypes.contains({key: React.PropTypes.number}), Immutable.fromJS({key: 1}));
    });

    it('should ignore null keys', function() {
      typeCheckPass(PropTypes.contains({key: null}), Immutable.fromJS({key: 1}));
    });

    it('should warn for required valid types', function() {
      typeCheckFail(
        PropTypes.contains({key: React.PropTypes.number.isRequired}),
        Immutable.fromJS({}),
        'Required prop `key` was not specified in `testComponent`.'
      );
    });

    it('should warn for the first required type', function() {
      typeCheckFail(
        PropTypes.contains({
          key: React.PropTypes.number.isRequired,
          secondKey: React.PropTypes.number.isRequired
        }),
        Immutable.fromJS({}),
        'Required prop `key` was not specified in `testComponent`.'
      );
    });

    it('should warn for invalid key types', function() {
      typeCheckFail(PropTypes.contains({key: React.PropTypes.number}),
        Immutable.fromJS({key: 'abc'}),
        'Invalid prop `key` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );
    });

    it('should be implicitly optional and not warn without values', function() {
      typeCheckPass(
        PropTypes.contains(PropTypes.contains({key: React.PropTypes.number})), null
      );
      typeCheckPass(
        PropTypes.contains(PropTypes.contains({key: React.PropTypes.number})), undefined
      );
    });

    it('should warn for missing required values', function() {
      typeCheckFail(
        PropTypes.contains({key: React.PropTypes.number}).isRequired,
        null,
        requiredMessage
      );
      typeCheckFail(
        PropTypes.contains({key: React.PropTypes.number}).isRequired,
        undefined,
        requiredMessage
      );
    });

    it('should probably not validate a list, but does', function() {
      var contains = {
        0: React.PropTypes.number.isRequired,
        1: React.PropTypes.string.isRequired,
        2: React.PropTypes.string
      };
      typeCheckPass(PropTypes.contains(contains), Immutable.List([1, '2']));
    });
  });
});
