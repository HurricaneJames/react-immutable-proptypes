# react-immutable-proptypes

[![Code Climate](https://codeclimate.com/github/HurricaneJames/react-immutable-proptypes/badges/gpa.svg)](https://codeclimate.com/github/HurricaneJames/react-immutable-proptypes) [![Test Coverage](https://codeclimate.com/github/HurricaneJames/react-immutable-proptypes/badges/coverage.svg)](https://codeclimate.com/github/HurricaneJames/react-immutable-proptypes)

PropType validators that work with Immutable.js.


## About

I got tired of seeing `React.PropTypes.instanceOf(Immutable.List)` or `React.PropTypes.instanceOf(Immutable.Map)` as PropTypes for components that should be specifying an `Immutable.List` **_of_** something or an `Immutable.Map` **shape**. A little *"googling"* came up empty, unless you want to use Flow, which I do not. So, I wrote `react-immutable-proptypes`.

Usage is simple, they work with and like any `React.PropType.*` validator.

    var ImmutablePropTypes = require('react-immutable-proptypes');
    var MyReactComponent = React.createClass({
      // ...
      propTypes: {
        myRequiredImmutableList: ImmutablePropTypes.listOf(
          ImmutablePropTypes.shape({
            someNumberProp: React.PropTypes.number.isRequired
          })
        ).isRequired
      }
      // ...
    });


## Installation

Installing via [npmjs](https://www.npmjs.com/package/react-immutable-proptypes)

    npm install --save react-immutable-proptypes


## API

React-Immutable-PropTypes has just two validators that cover 100% of my use cases, and probably 99% of everybody's use cases.

* `ImmutablePropTypes.listOf` is based on `React.PropTypes.array` and is specific to `Immutable.List`.

* `ImmutablePropTypes.shape` is based on `React.PropTypes.shape` and will try to work with any `Immutable.Iterable`. In practice, I would recommend limiting this to `Immutable.Map` or `Immutable.OrderedMap`. However, it is possible to abuse `shape` to validate an array via `Immutable.List`.

        // ...
        aList: ImmutablePropTypes.shape({
          0: React.PropTypes.number.isRequired,
          1: React.PropTypes.string.isRequired,
          2: React.PropTypes.string
        })
        // ...
        <SomeComponent aList={new Immutable.List([1, '2'])} />

    That said, don't do this. Please, just... don't.

These two validators cover the output of `Immutable.fromJS` on standard JSON data sources.


## RFC

Please send a message or, better yet, create an issue/pull request if you know a better solution, find bugs, or want a feature. For example, should `listOf` work with `Immutable.Seq` or `Immutable.Range`. I can think of reasons it should, but it is not a use case I have at the present, so I'm less than inclined to implement it. Alternatively, we could add a validator for sequences and/or ranges.
