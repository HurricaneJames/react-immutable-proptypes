import * as React from 'react';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import * as Immutable from 'immutable';

// test primitive types
export const propTypesPrimitives = {
  oldListTypeChecker: React.PropTypes.instanceOf(Immutable.List),
  anotherWay: ImmutablePropTypes.list,
  requiredList: ImmutablePropTypes.list.isRequired,
  mapsToo: ImmutablePropTypes.map,
  evenIterable: ImmutablePropTypes.iterable,
  orderedMapYes: ImmutablePropTypes.orderedMap,
  setYes: ImmutablePropTypes.set,
  orderedSetYes: ImmutablePropTypes.orderedSet,
  stackYes: ImmutablePropTypes.stack,
  seqYes: ImmutablePropTypes.seq,
  recordYes: ImmutablePropTypes.record,
};


// Test Contains
export const containsTest = {
  aMap: ImmutablePropTypes.contains({
    aList: ImmutablePropTypes.contains({
      0: React.PropTypes.number,
      1: React.PropTypes.string,
      2: React.PropTypes.number.isRequired,
    }).isRequired,
  })
};

// Test MapOf
export const aMap = ImmutablePropTypes.mapOf(
  React.PropTypes.any, // validation for values
  ImmutablePropTypes.mapContains({ // validation for keys
    a: React.PropTypes.number.isRequired,
    b: React.PropTypes.string
  })
);

// validation for keys (same is in mapOf)
const mapVal =  ImmutablePropTypes.mapContains({ // validation for keys
  a: React.PropTypes.number.isRequired,
  b: React.PropTypes.string
});

// Test orderedMapOf
export const aOrderedMapOf = ImmutablePropTypes.orderedMapOf(
  React.PropTypes.any,
  mapVal
);


// Test listOf
const aListOf = ImmutablePropTypes.listOf(
  React.PropTypes.number, // validation for values
);

// test compatibility with react types
if (aListOf === React.PropTypes.arrayOf(React.PropTypes.number)) {
  alert('should be comparable with reacht types');
}

// Test orderedSetOf
export const aOrderedSetOf = ImmutablePropTypes.orderedSetOf(
  React.PropTypes.number, // validation for values
);

// Test stackOf
export const aStackOf = ImmutablePropTypes.stackOf(
  React.PropTypes.string, // validation for values
);

// Test iterableOf
export const aIterableOf = ImmutablePropTypes.iterableOf(
  React.PropTypes.string, // validation for values
);


// Test recordOf
export const aRecordOf = ImmutablePropTypes.recordOf({
    keyA: React.PropTypes.string,
    keyB: ImmutablePropTypes.seq.isRequired
});

// Test mapContains
export const aMapContains = ImmutablePropTypes.mapContains({
    aList: ImmutablePropTypes.list.isRequired,
});

// Test shape
export const aSahpe = ImmutablePropTypes.shape({
    aList: ImmutablePropTypes.list.isRequired,
});


// Test with component 

React.createClass<{}, {}>({
  propTypes: {
    myRequiredImmutableList: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        someNumberProp: React.PropTypes.number.isRequired
      })
    ).isRequired
  },
  render: () => { return null; }
});

React.createClass<{}, {}>({
  propTypes: {
    myRequiredImmutableList: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        someNumberProp: React.PropTypes.number.isRequired
      })
    ).isRequired
  },
  render: () => { return null; }
});
