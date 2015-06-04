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

  describe('Primitive Types', function() {
    it('should not warn for valid values', function() {
      typeCheckPass(PropTypes.list, new Immutable.List());
      typeCheckPass(PropTypes.map, new Immutable.Map());
      typeCheckPass(PropTypes.map, new Immutable.OrderedMap());
      typeCheckPass(PropTypes.orderedMap, new Immutable.OrderedMap());
      typeCheckPass(PropTypes.set, new Immutable.Set());
      typeCheckPass(PropTypes.set, new Immutable.OrderedSet());
      typeCheckPass(PropTypes.orderedSet, new Immutable.OrderedSet());
      typeCheckPass(PropTypes.stack, new Immutable.Stack());
      typeCheckPass(PropTypes.seq, new Immutable.Seq());
      typeCheckPass(PropTypes.iterable, new Immutable.Iterable());
      typeCheckPass(PropTypes.iterable, new Immutable.List());
      typeCheckPass(PropTypes.iterable, new Immutable.Map());
      typeCheckPass(PropTypes.iterable, new Immutable.OrderedMap());
      typeCheckPass(PropTypes.iterable, new Immutable.Set());
      typeCheckPass(PropTypes.iterable, new Immutable.OrderedSet());
      typeCheckPass(PropTypes.iterable, new Immutable.Stack());
      typeCheckPass(PropTypes.iterable, new Immutable.Seq());
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
        new Immutable.Map(),
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected `List`.'
      );
      typeCheckFail(
        PropTypes.list,
        new Immutable.Iterable(),
        'Invalid prop `testProp` of type `object` supplied to ' +
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
        new Immutable.List(),
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected `Map`.'
      );
      typeCheckFail(
        PropTypes.map,
        new Immutable.Iterable(),
        'Invalid prop `testProp` of type `object` supplied to ' +
        '`testComponent`, expected `Map`.'
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
      typeCheckPass(PropTypes.listOf(React.PropTypes.number), new Immutable.List([1, 2, 3]));
      typeCheckPass(PropTypes.listOf(React.PropTypes.string), new Immutable.List(['a', 'b', 'c']));
      typeCheckPass(PropTypes.listOf(React.PropTypes.oneOf(['a', 'b'])), new Immutable.List(['a', 'b']));
    });

    it('should support listOf with complex types', function() {
      typeCheckPass(
        PropTypes.listOf(React.PropTypes.shape({a: React.PropTypes.number.isRequired})),
        new Immutable.List([{a: 1}, {a: 2}])
      );

      typeCheckPass(
        PropTypes.listOf(PropTypes.shape({a: React.PropTypes.number.isRequired})),
        Immutable.fromJS([{a: 1}, {a: 2}])
      );

      function Thing() {}
      typeCheckPass(
        PropTypes.listOf(React.PropTypes.instanceOf(Thing)),
        new Immutable.List([new Thing(), new Thing()])
      );
    });

    it('should warn with invalid items in the list', function() {
      typeCheckFail(
        PropTypes.listOf(React.PropTypes.number),
        new Immutable.List([1, 2, 'b']),
        'Invalid prop `2` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );
    });

    it('should warn with invalid complex types', function() {
      function Thing() {}
      var name = Thing.name || '<<anonymous>>';

      typeCheckFail(
        PropTypes.listOf(React.PropTypes.instanceOf(Thing)),
        new Immutable.List([new Thing(), 'xyz']),
        'Invalid prop `1` supplied to `testComponent`, expected instance of `' +
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
        PropTypes.listOf(PropTypes.number),
        123,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected an Immutable.js List.'
      );
      typeCheckFail(
        PropTypes.listOf(PropTypes.number),
        'string',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected an Immutable.js List.'
      );
      typeCheckFail(
        PropTypes.listOf(PropTypes.number),
        [1, 2, 3],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected an Immutable.js List.'
      );
    });

    it('should not warn when passing an empty array', function() {
      typeCheckPass(PropTypes.listOf(PropTypes.number), new Immutable.List());
      typeCheckPass(PropTypes.listOf(PropTypes.number), new Immutable.List([]));
    });

    it('should be implicitly optional and not warn without values', function() {
      typeCheckPass(PropTypes.listOf(PropTypes.number), null);
      typeCheckPass(PropTypes.listOf(PropTypes.number), undefined);
    });

    it('should warn for missing required values', function() {
      typeCheckFail(
        PropTypes.listOf(PropTypes.number).isRequired,
        null,
        requiredMessage
      );
      typeCheckFail(
        PropTypes.listOf(PropTypes.number).isRequired,
        undefined,
        requiredMessage
      );
    });
  });

  describe('MapOf Type', function() {
    it('should support the mapOf propTypes', function() {
      typeCheckPass(PropTypes.mapOf(React.PropTypes.number), new Immutable.Map({1: 1, 2: 2, 3: 3}));
      typeCheckPass(PropTypes.mapOf(React.PropTypes.string), new Immutable.Map({1: 'a', 2: 'b', 3: 'c'}));
      typeCheckPass(PropTypes.mapOf(React.PropTypes.oneOf(['a', 'b'])), new Immutable.Map({1: 'a', 2: 'b'}));
    });

    it('should support mapOf with complex types', function() {
      typeCheckPass(
        PropTypes.mapOf(React.PropTypes.shape({a: React.PropTypes.number.isRequired})),
        new Immutable.Map({1: {a: 1}, 2: {a: 2}})
      );

      typeCheckPass(
        PropTypes.mapOf(PropTypes.shape({a: React.PropTypes.number.isRequired})),
        Immutable.fromJS({1: {a: 1}, 2: {a: 2}})
      );

      function Thing() {}
      typeCheckPass(
        PropTypes.mapOf(React.PropTypes.instanceOf(Thing)),
        new Immutable.Map({ 1: new Thing(), 2: new Thing() })
      );
    });

    it('should warn with invalid items in the map list', function() {
      typeCheckFail(
        PropTypes.mapOf(React.PropTypes.number),
        new Immutable.Map({ 1: 1, 2: 2, 3: 'b' }),
        'Invalid prop `2` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );
    });

    it('should warn with invalid complex types', function() {
      function Thing() {}
      var name = Thing.name || '<<anonymous>>';

      typeCheckFail(
        PropTypes.mapOf(React.PropTypes.instanceOf(Thing)),
        new Immutable.Map({ 1: new Thing(), 2: 'xyz' }),
        'Invalid prop `1` supplied to `testComponent`, expected instance of `' +
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
        PropTypes.mapOf(PropTypes.number),
        123,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected an Immutable.js Map.'
      );
      typeCheckFail(
        PropTypes.mapOf(PropTypes.number),
        'string',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected an Immutable.js Map.'
      );
      typeCheckFail(
        PropTypes.mapOf(PropTypes.number),
        [1, 2, 3],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected an Immutable.js Map.'
      );
    });

    it('should not warn when passing an empty object', function() {
      typeCheckPass(PropTypes.mapOf(PropTypes.number), new Immutable.Map());
      typeCheckPass(PropTypes.mapOf(PropTypes.number), new Immutable.Map({}));
    });

    it('should be implicitly optional and not warn without values', function() {
      typeCheckPass(PropTypes.mapOf(PropTypes.number), null);
      typeCheckPass(PropTypes.mapOf(PropTypes.number), undefined);
    });

    it('should warn for missing required values', function() {
      typeCheckFail(
        PropTypes.mapOf(PropTypes.number).isRequired,
        null,
        requiredMessage
      );
      typeCheckFail(
        PropTypes.mapOf(PropTypes.number).isRequired,
        undefined,
        requiredMessage
      );
    });
  });

  describe('SetOf Type', function() {
    it('should support the setOf propTypes', function() {
      typeCheckPass(PropTypes.setOf(React.PropTypes.number), new Immutable.Set([1, 2, 3]));
      typeCheckPass(PropTypes.setOf(React.PropTypes.string), new Immutable.Set(['a', 'b', 'c']));
      typeCheckPass(PropTypes.setOf(React.PropTypes.oneOf(['a', 'b'])), new Immutable.Set(['a','b']));
    });

    it('should support setOf with complex types', function() {
      typeCheckPass(
        PropTypes.setOf(React.PropTypes.shape({a: React.PropTypes.number.isRequired})),
        new Immutable.Set([{a: 1}, {a: 2}])
      );

      function Thing() {}
      typeCheckPass(
        PropTypes.setOf(React.PropTypes.instanceOf(Thing)),
        new Immutable.Set([new Thing(), new Thing() ])
      );
    });

    it('should warn with invalid items in the set list', function() {
      typeCheckFail(
        PropTypes.setOf(React.PropTypes.number),
        new Immutable.Set([1, 2, 'b']),
        'Invalid prop `2` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );
    });

    it('should warn with invalid complex types', function() {
      function Thing() {}
      var name = Thing.name || '<<anonymous>>';

      typeCheckFail(
        PropTypes.setOf(React.PropTypes.instanceOf(Thing)),
        new Immutable.Set([new Thing(), 'xyz' ]),
        'Invalid prop `1` supplied to `testComponent`, expected instance of `' +
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
        PropTypes.setOf(PropTypes.number),
        123,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected an Immutable.js Set.'
      );
      typeCheckFail(
        PropTypes.setOf(PropTypes.number),
        'string',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected an Immutable.js Set.'
      );
      typeCheckFail(
        PropTypes.setOf(PropTypes.number),
        [1, 2, 3],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected an Immutable.js Set.'
      );
    });

    it('should not warn when passing an empty object', function() {
      typeCheckPass(PropTypes.setOf(PropTypes.number), new Immutable.Set());
      typeCheckPass(PropTypes.setOf(PropTypes.number), new Immutable.Set([]));
    });

    it('should be implicitly optional and not warn without values', function() {
      typeCheckPass(PropTypes.setOf(PropTypes.number), null);
      typeCheckPass(PropTypes.setOf(PropTypes.number), undefined);
    });

    it('should warn for missing required values', function() {
      typeCheckFail(
        PropTypes.setOf(PropTypes.number).isRequired,
        null,
        requiredMessage
      );
      typeCheckFail(
        PropTypes.setOf(PropTypes.number).isRequired,
        undefined,
        requiredMessage
      );
    });
  });

  describe('IterableOf Type', function() {
    it('should support the iterableOf propTypes', function() {
      typeCheckPass(PropTypes.iterableOf(React.PropTypes.number), new Immutable.List([1, 2, 3]));
      typeCheckPass(PropTypes.iterableOf(React.PropTypes.string), new Immutable.List(['a', 'b', 'c']));
      typeCheckPass(PropTypes.iterableOf(React.PropTypes.oneOf(['a', 'b'])), new Immutable.List(['a', 'b']));

      typeCheckPass(PropTypes.iterableOf(React.PropTypes.number), new Immutable.Map({1: 1, 2: 2, 3: 3}));
      typeCheckPass(PropTypes.iterableOf(React.PropTypes.string), new Immutable.Map({1: 'a', 2: 'b', 3: 'c'}));
      typeCheckPass(PropTypes.iterableOf(React.PropTypes.oneOf(['a', 'b'])), new Immutable.Map({1: 'a', 2: 'b'}));
    });

    it('should support iterableOf with complex types', function() {
      function Thing() {}

      typeCheckPass(
        PropTypes.iterableOf(React.PropTypes.shape({a: React.PropTypes.number.isRequired})),
        new Immutable.List([{a: 1}, {a: 2}])
      );

      typeCheckPass(
        PropTypes.iterableOf(PropTypes.shape({a: React.PropTypes.number.isRequired})),
        Immutable.fromJS([{a: 1}, {a: 2}])
      );

      typeCheckPass(
        PropTypes.iterableOf(React.PropTypes.instanceOf(Thing)),
        new Immutable.List([new Thing(), new Thing()])
      );

      typeCheckPass(
        PropTypes.iterableOf(React.PropTypes.shape({a: React.PropTypes.number.isRequired})),
        new Immutable.Map({1: {a: 1}, 2: {a: 2}})
      );

      typeCheckPass(
        PropTypes.iterableOf(PropTypes.shape({a: React.PropTypes.number.isRequired})),
        Immutable.fromJS({1: {a: 1}, 2: {a: 2}})
      );

      typeCheckPass(
        PropTypes.iterableOf(React.PropTypes.instanceOf(Thing)),
        new Immutable.Map({ 1: new Thing(), 2: new Thing() })
      );
    });

    it('should warn with invalid items in the list', function() {
      typeCheckFail(
        PropTypes.iterableOf(React.PropTypes.number),
        new Immutable.List([1, 2, 'b']),
        'Invalid prop `2` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );

      typeCheckFail(
        PropTypes.iterableOf(React.PropTypes.number),
        new Immutable.Map({ 1: 1, 2: 2, 3: 'b' }),
        'Invalid prop `2` of type `string` supplied to `testComponent`, ' +
        'expected `number`.'
      );
    });

    it('should warn with invalid complex types', function() {
      function Thing() {}
      var name = Thing.name || '<<anonymous>>';

      typeCheckFail(
        PropTypes.iterableOf(React.PropTypes.instanceOf(Thing)),
        new Immutable.List([new Thing(), 'xyz']),
        'Invalid prop `1` supplied to `testComponent`, expected instance of `' +
        name + '`.'
      );

      typeCheckFail(
        PropTypes.iterableOf(React.PropTypes.instanceOf(Thing)),
        new Immutable.Map({ 1: new Thing(), 2: 'xyz' }),
        'Invalid prop `1` supplied to `testComponent`, expected instance of `' +
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
        PropTypes.iterableOf(PropTypes.number),
        123,
        'Invalid prop `testProp` of type `number` supplied to ' +
        '`testComponent`, expected an Immutable.js Iterable.'
      );
      typeCheckFail(
        PropTypes.iterableOf(PropTypes.number),
        'string',
        'Invalid prop `testProp` of type `string` supplied to ' +
        '`testComponent`, expected an Immutable.js Iterable.'
      );
      typeCheckFail(
        PropTypes.iterableOf(PropTypes.number),
        [1, 2, 3],
        'Invalid prop `testProp` of type `array` supplied to ' +
        '`testComponent`, expected an Immutable.js Iterable.'
      );
    });

    it('should not warn when passing an empty iterable', function() {
      typeCheckPass(PropTypes.iterableOf(PropTypes.number), new Immutable.List());
      typeCheckPass(PropTypes.iterableOf(PropTypes.number), new Immutable.List([]));
      typeCheckPass(PropTypes.iterableOf(PropTypes.number), new Immutable.Map({}));
    });

    it('should be implicitly optional and not warn without values', function() {
      typeCheckPass(PropTypes.iterableOf(PropTypes.number), null);
      typeCheckPass(PropTypes.iterableOf(PropTypes.number), undefined);
    });

    it('should warn for missing required values', function() {
      typeCheckFail(
        PropTypes.iterableOf(PropTypes.number).isRequired,
        null,
        requiredMessage
      );
      typeCheckFail(
        PropTypes.iterableOf(PropTypes.number).isRequired,
        undefined,
        requiredMessage
      );
    });
  });

  describe('Shape Types', function() {
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
      typeCheckPass(PropTypes.shape(shape), new Immutable.List([1, '2']));
    });
  });

});