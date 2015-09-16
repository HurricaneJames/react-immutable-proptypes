## 1.2.x
- 1.2.1 updated documentation to reflect that Immutable object instantiation does not require `new`
- 1.2.0 moved react from peer dependency to dev dependency since React is only used internally to test. This will allow the prop type validators to work on beta/rc versions of react.

## Prior Version Updates
- 1.1.0 added `contains` to replace `shape` validator. `shape` is deprecated and will be removed in v 1.2.0
- 1.0.0 marked as stable, no other changes
- 0.1.8 added `setOf` checker. Thanks to [Don Abrams](https://github.com/donabrams)!
- 0.1.7 added convencience checkers for "primitive" immutable types (map, list, etc...)
- 0.1.6 added `iterableOf`
- 0.1.4 added `mapOf`
- 0.1.3 updated package.json to support React v0.11.0+ (including 0.13.1). Thanks [Andrey Okonetchnikov](https://github.com/okonet)!
