# react-immutable-proptypes
PropType validators that work with Immutable.js.

## About
I got tired of seeing `React.PropTypes.instanceOf(Immutable.List)` or `React.PropTypes.instanceOf(Immutable.Map)` as PropTypes for components that should be specifying an Immutable.List of something or an Immutable.Map shape. A little "googling" came up with empty, unless you want to use Flow, which I do not. So, I wrote `react-immutable-proptypes`.

Usage is simple:

    var ImmutablePropTypes = require('react-immutable-proptypes');
    var MyReactComponent = React.createClass({
      // ...
      propTypes: {
        myImmutableList: ImmutableTypes.listOf(
          ImmutableTypes.shape({
            someNumberProp: React.PropTypes.number.isRequired
          })
        )
      }
      // ...
    });

Please send a message or, better yet, create an issue/pull request if you know a better solution, find bugs, or want to add a feature.

## Installing
Installing via [npmjs](https://www.npmjs.com/package/react-immutable-proptypes)

    npm install --save react-immutable-proptypes
