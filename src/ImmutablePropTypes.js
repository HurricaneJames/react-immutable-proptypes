/**
 * This is a straight rip-off of the React.js ReactPropTypes.js proptype validators,
 * modified to make it possible to validate Immutable.js data.
 *     ImmutableTypes.listOf is patterned after React.PropTypes.arrayOf, but for Immutable.List
 *     ImmutableTypes.shape  is based on React.PropTypes.shape, but for any Immutable.Iterable
 */
var Immutable = require('immutable');

var ANONYMOUS = '<<anonymous>>';

var ImmutablePropTypes = {
  listOf:       createListOfTypeChecker,
  mapOf:        createMapOfTypeChecker,
  orderedMapOf: createOrderedMapOfTypeChecker,
  setOf:        createSetOfTypeChecker,
  orderedSetOf: createOrderedSetOfTypeChecker,
  iterableOf:   createIterableOfTypeChecker,
  recordOf:     createRecordOfTypeChecker,
  shape:        createShapeTypeChecker,
  contains:     createShapeTypeChecker,
  // Primitive Types
  list:       createImmutableTypeChecker('List', Immutable.List.isList),
  map:        createImmutableTypeChecker('Map', Immutable.Map.isMap),
  orderedMap: createImmutableTypeChecker('OrderedMap', Immutable.OrderedMap.isOrderedMap),
  set:        createImmutableTypeChecker('Set', Immutable.Set.isSet),
  orderedSet: createImmutableTypeChecker('OrderedSet', Immutable.OrderedSet.isOrderedSet),
  stack:      createImmutableTypeChecker('Stack', Immutable.Stack.isStack),
  seq:        createImmutableTypeChecker('Seq', Immutable.Seq.isSeq),
  record:     createImmutableTypeChecker('Record', function(isRecord) { return isRecord instanceof Immutable.Record; }),
  iterable:   createImmutableTypeChecker('Iterable', Immutable.Iterable.isIterable)
};

function getPropType(propValue) {
  var propType = typeof propValue;
  if (Array.isArray(propValue)) {
    return 'array';
  }
  if (propValue instanceof RegExp) {
    // Old webkits (at least until Android 4.0) return 'function' rather than
    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
    // passes PropTypes.object.
    return 'object';
  }
  if (propValue instanceof Immutable.Iterable) {
    return 'Immutable.' + propValue.toSource().split(' ')[0];
  }
  return propType;
}

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName, location) {
    componentName = componentName || ANONYMOUS;
    if (props[propName] === null) {
      var locationName = location;
      if (isRequired) {
        return new Error(
          `Required ${locationName} \`${propName}\` was not specified in ` +
          `\`${componentName}\`.`
        );
      }
    } else {
      return validate(props, propName, componentName, location);
    }
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

function createImmutableTypeChecker(immutableClassName, immutableClassTypeValidator) {
  function validate(props, propName, componentName, location) {
    var propValue = props[propName];
    if(!immutableClassTypeValidator(propValue)) {
      var propType = getPropType(propValue);
      return new Error(
        `Invalid ${location} \`${propName}\` of type \`${propType}\` ` +
        `supplied to \`${componentName}\`, expected \`${immutableClassName}\`.`
      );
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createIterableTypeChecker(typeChecker, immutableClassName, immutableClassTypeValidator) {

  function validate(props, propName, componentName, location) {
    var propValue = props[propName];
    if (!immutableClassTypeValidator(propValue)) {
      var locationName = location;
      var propType = getPropType(propValue);
      return new Error(
        `Invalid ${locationName} \`${propName}\` of type ` +
        `\`${propType}\` supplied to \`${componentName}\`, expected an Immutable.js ${immutableClassName}.`
      );
    }
    if (typeof typeChecker !== 'function') {
      return new Error(
        `Invalid typeChecker supplied to \`${componentName}\` ` +
        `for propType \`${propName}\`, expected a function.`
      );
    }
    propValue.forEach(function(value, i) {
      var error = typeChecker(propValue, i, componentName, location);
      if (error instanceof Error) {
        return error;
      }
    });
  }
  return createChainableTypeChecker(validate);
}

function createListOfTypeChecker(typeChecker) {
  return createIterableTypeChecker(typeChecker, 'List', Immutable.List.isList);
}

function createMapOfTypeChecker(typeChecker) {
  return createIterableTypeChecker(typeChecker, 'Map', Immutable.Map.isMap);
}

function createOrderedMapOfTypeChecker(typeChecker) {
  return createIterableTypeChecker(typeChecker, 'OrderedMap', Immutable.OrderedMap.isOrderedMap);
}

function createSetOfTypeChecker(typeChecker) {
  return createIterableTypeChecker(typeChecker, 'Set', Immutable.Set.isSet);
}

function createOrderedSetOfTypeChecker(typeChecker) {
  return createIterableTypeChecker(typeChecker, 'OrderedSet', Immutable.OrderedSet.isOrderedSet);
}

function createIterableOfTypeChecker(typeChecker) {
  return createIterableTypeChecker(typeChecker, 'Iterable', Immutable.Iterable.isIterable);
}

function createRecordOfTypeChecker(recordKeys) {
  function validate(props, propName, componentName, location) {
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (!(propValue instanceof Immutable.Record)) {
      var locationName = location;
      return new Error(
        `Invalid ${locationName} \`${propName}\` of type \`${propType}\` ` +
        `supplied to \`${componentName}\`, expected an Immutable.js Record.`
      );
    }
    for (var key in recordKeys) {
      var checker = recordKeys[key];
      if (!checker) {
        continue;
      }
      var mutablePropValue = propValue.toObject();
      var error = checker(mutablePropValue, key, componentName, location);
      if (error) {
        return error;
      }
    }
  }
  return createChainableTypeChecker(validate);
}

// there is some irony in the fact that shapeTypes is a standard hash and not an immutable collection
function createShapeTypeChecker(shapeTypes) {
  function validate(props, propName, componentName, location) {
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (!Immutable.Iterable.isIterable(propValue)) {
      var locationName = location;
      return new Error(
        `Invalid ${locationName} \`${propName}\` of type \`${propType}\` ` +
        `supplied to \`${componentName}\`, expected an Immutable.js Iterable.`
      );
    }
    for (var key in shapeTypes) {
      var checker = shapeTypes[key];
      if (!checker) {
        continue;
      }
      var mutablePropValue = propValue.toObject();
      var error = checker(mutablePropValue, key, componentName, location);
      if (error) {
        return error;
      }
    }
  }
  return createChainableTypeChecker(validate);
}


module.exports = ImmutablePropTypes;
