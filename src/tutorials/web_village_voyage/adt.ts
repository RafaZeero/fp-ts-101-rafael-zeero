/**
 * // ** ADT ** //
 *
 * Composed/Composing types
 *
 * Small primitive types and build on top of them.
 *
 * Field + Field ... = Product Type
 * Int + Boolean = Integer x Boolean
 *
 *
 * ```ts
 * type UserRecord = {
 *  name: string
 *  age: number
 *  address: {
 *    city: string
 *    stree: string
 *    }
 * }
 *
 * type UserTuple = [
 *  string,
 *  number,
 *  [
 *    string,
 *    string
 *  ]
 * ]
 * ```
 *
 * Sum type:
 * Can have multiple variant
 * ex: integer variant, boolean variant
 *
 * ```ts
 * type NumOrBool = number | boolean
 *
 * type Either<E, A> =
 * | { _tag: 'Left', left: E },
 * | { _tag: 'Right', right: A },
 * ```
 *
 * `ADT` = Algebraic Data Type
 * { Composite type using operations }
 * - Product operation
 * - Sum operation
 *
 * ADT =/= Abstract Data Type
 *
 * `Abstract Data Type` = Provides an interface to work
 * with that data type
 *
 * `Pattern Matching`
 *
 * - Should cover all the values in the type that is checking
 * - Exhaustive check of the inputs type
 *
 */
const ADTS = () => {};

import * as O from 'fp-ts/Option';

// 📜 Option
type Match = <A, B>(onNone: () => B, onSome: (a: A) => B) => (x: O.Option<A>) => B;

const match: Match = (onNone, onSome) => x => O.isNone(x) ? onNone() : onSome(x.value);

const maybeNum: O.Option<number> = O.some(12);
const maybeNum2: O.Option<number> = O.none;
const result = match(
  // 🔴 Pattern for when value is none
  () => `num does not exist`,
  // 🟢 Pattern for when value is some
  (a: number) => `num is ${a}`
  // )(maybeNum);
)(maybeNum2);

console.log(result);
