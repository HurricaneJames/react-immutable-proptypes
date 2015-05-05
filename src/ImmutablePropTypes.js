/**
 * This is a straight rip-off of the React.js ReactPropTypes.js proptype validators,
 * modified to make it possible to validate Immutable.js data.
 *     ImmutableTypes.listOf is patterned after React.PropTypes.arrayOf, but for Immutable.List
 *     ImmutableTypes.shape  is based on React.PropTypes.shape, but for any Immutable.Iterable
 */
var Immutable = require('immutable');

var ANONYMOUS = '<<anonymous>>';

var ImmutablePropTypes = {
  listOf: createListOfTypeChecker,
  mapOf:  createMapOfTypeChecker,
  shape:  createShapeTypeChecker
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
  return propType;
}

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName, location) {
    componentName = componentName || ANONYMOUS;
    if (props[propName] == null) {
      var locationName = location;
      if (isRequired) {
        return new Error(
          ("Required " + locationName + " `" + propName + "` was not specified in ")+
          ("`" + componentName + "`.")
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

function createListOfTypeChecker(typeChecker) {
  function validate(props, propName, componentName, location) {
    var propValue = props[propName];
    if (!Immutable.List.isList(propValue)) {
      var locationName = location;
      var propType = getPropType(propValue);
      return new Error(
        ("Invalid " + locationName + " `" + propName + "` of type ") +
        ("`" + propType + "` supplied to `" + componentName + "`, expected an Immutable.js List.")
      );
    }
    var propValues = propValue.toArray();
    for (var i = 0, len = propValues.length; i < len; i++) {
      var error = typeChecker(propValues, i, componentName, location);
      if (error instanceof Error) {
        return error;
      }
    }
  }
  return createChainableTypeChecker(validate);
}

function createMapOfTypeChecker(typeChecker) {
  function validate(props, propName, componentName, location) {
    var propValue = props[propName];
    if (!Immutable.Map.isMap(propValue)) {
      var locationName = location;
      var propType = getPropType(propValue);
      return new Error(
        ("Invalid " + locationName + " `" + propName + "` of type ") +
        ("`" + propType + "` supplied to `" + componentName + "`, expected an Immutable.js Map.")
      );
    }
    var propValues = propValue.toArray();
    for (var i = 0, len = propValues.length; i < len; i++) {
      var error = typeChecker(propValues, i, componentName, location);
      if (error instanceof Error) {
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
        ("Invalid " + locationName + " `" + propName + "` of type `" + propType + "` ") +
        ("supplied to `" + componentName + "`, expected an Immutable.js Iterable.")
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