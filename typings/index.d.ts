// Typescript typings for `react-immutable-proptypes`

/** Copy of `React.PropTypes`'s `Validator` */
interface Validator<T> {
    (object: T, key: string, componentName: string, ...rest: any[]): Error | null;
}

/** Copy of `React.PropTypes`'s `Requireable<T>` */
interface Requireable<T> extends Validator<T> {
    isRequired: Validator<T>;
}

/** .
 * Modification of `React.PropTypes`'s `ValidationMap<T>` type
 * 
 * `type ValidationMap<T> = { [K in keyof T]?: Validator<T> };`
 * 
 * original seemd too generic, since it allowed stings and numbers as args
 */
type ValidatorMap<T> = { [key: string]: Validator<T> };

/** combination of  */
type ValidaterOrValidatorMap = Validator<any> | ValidatorMap<any>


declare module 'react-immutable-proptypes' {
  /**
   * `ImmutablePropTypes.listOf` is based on `React.PropTypes.array` and
   * is specific to `Immutable.List`
   */
  function listOf(typeChecker: ValidaterOrValidatorMap): Requireable<any>;

  /**
   * `ImmutablePropTypes.mapOf` allows you to control both map values and keys
   * (in `Immutable.Map`, keys could be anything including another Immutable collections).
   * 
   * 
   * It accepts two arguments - first one for values, second one for keys (_optional_).
   * 
   * If you are interested in validation of keys only, just pass `React.PropTypes.any` as
   * the first argument.
   */
  function mapOf(valuesTypeChecker: Requireable<any>, keysTypeChecker?: Requireable<any>): Requireable<any>;

  /** 
   * `ImmutablePropTypes.orderedMapOf` is basically the same as `mapOf`,
   * but it is specific to `Immutable.OrderedMap`.
   */
  function orderedMapOf(valuesTypeChecker: Requireable<any>, keysTypeChecker: Requireable<any>): Requireable<any>;

  /**
   * `ImmutablePropTypes.setOf` is basically the same as `listOf`,
   * but it is specific to `Immutable.Set`.
   */
  function setOf(typeChecker: Requireable<any>): Requireable<any>;

  /**
   * `ImmutablePropTypes.orderedSetOf` is basically the same as `listOf`,
   * but it is specific to `Immutable.OrderedSet`.
   */
  function orderedSetOf(typeChecker: Requireable<any>): Requireable<any>;

  /**
   * `ImmutablePropTypes.stackOf` is basically the same as `listOf`,
   * but it is specific to `Immutable.Stack`.
   */
  function stackOf(typeChecker: Requireable<any>): Requireable<any>;

  /**
   * `ImmutablePropTypes.iterableOf`  is the generic form of `listOf`/`mapOf`.
   * It is useful when there is no need to validate anything other than Immutable.js 
   * compatible (ie. `Immutable.Iterable`).
   * 
   * Continue to use `listOf` and/or `mapOf` when you know the type.
   */
  function iterableOf(typeChecker: Requireable<any>): Requireable<any>;

  /**
   * `ImmutablePropTypes.recordOf` is like contains,
   * except it operates on `Record` properties.
   */
  function recordOf(recordKeys: ValidaterOrValidatorMap): Requireable<any>;

  /**
   * `ImmutablePropTypes.mapContains` is based on `React.PropTypes.shape` and will only work
   * with `Immutable.Map`.
   */
  function shape(shapeTypes: ValidaterOrValidatorMap): Requireable<any>;

  /** 
   * ImmutablePropTypes.contains (formerly `shape`) is based on `React.PropTypes.shape`
   * and will try to work with any `Immutable.Iterable`. 
   * 
   * In my usage it is the most used validator, as I'm often trying to validate that a `map`
   * has certain properties with certain values.
   * @return {Requireable<any>}
   */
  function contains(shapeTypes: ValidaterOrValidatorMap): Requireable<any>;

  /**
   * `ImmutablePropTypes.mapContains` is based on `React.PropTypes.shape` and will only work
   * with `Immutable.Map`.
   */
  function mapContains(shapeTypes: ValidaterOrValidatorMap): Requireable<any>;

  /** checker for `Immutable.List.isList` */
  const list: Requireable<any>;
  /** checker for `Immutable.Map.isMap` */
  const map: Requireable<any>;
  /** checker for `Immutable.OrderedMap.isOrderedMap` */
  const orderedMap: Requireable<any>;
  /** checker for `Immutable.Set.isSet` */
  const set: Requireable<any>;
  /** checker for `Immutable.OrderedSet.isOrderedSet` */
  const orderedSet: Requireable<any>;
  /** checker for `Immutable.Stack.isStack` */
  const stack: Requireable<any>;
  /** checker for `Immutable.Seq.isSeq` */
  const seq: Requireable<any>;
  /** checker for `instanceof Record` */
  const record: Requireable<any>;
  /** checker for `Immutable.Iterable.isIterable` */
  const iterable: Requireable<any>;
}
