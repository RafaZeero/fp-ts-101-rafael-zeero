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
// type MatchW = <A, B, C>(onNone: () => B, onSome: (a: A) => C) => (x: O.Option<A>) => B | C;
// const match: MatchW = (onNone, onSome) => x => O.isNone(x) ? onNone() : onSome(x.value);
// // * Match in fp-ts === Fold!
// // * MatchW in fp-ts === FoldW!

// const maybeNum: O.Option<number> = O.some(12);
// const maybeNum2: O.Option<number> = O.none;
// const result = match(
//   // 🔴 Pattern for when value is none
//   () => -2,
//   // 🟢 Pattern for when value is some
//   (a: number) => `num is ${a}`
//   // )(maybeNum);
//   )(maybeNum2);

//   console.log(result);

import * as E from 'fp-ts/Either';

// 📜 Either
// type MatchW = <E, A, B, C>(
//   onLeft: (e: E) => B,
//   onRight: (a: A) => C
// ) => (x: E.Either<E, A>) => B | C;
// const match: MatchW = (onLeft, onRight) => x => E.isLeft(x) ? onLeft(x.left) : onRight(x.right);
// // // * Match in fp-ts === Fold!
// // // * MatchW in fp-ts === FoldW!

// const errorOrNum = E.right(20);
// const errorOrNum2 = E.left('Not a number');
// const result = match(
//   error => `Error happened: ${error}`,
//   number => `Is number ${number}`
//   // )(errorOrNum);
// )(errorOrNum2);

// console.log(result);

// type Nil = { _tag: 'Nil' };
// type Cons<A> = { _tag: 'Cons'; head: A; tail: List<A> };
// type List<A> = Nil | Cons<A>;

// const nil: List<never> = { _tag: 'Nil' };
// const cons = <A>(head: A, tail: List<A>): List<A> => ({
//   _tag: 'Cons',
//   head,
//   tail
// });
// const isNil = <A>(xs: List<A>): xs is Nil => xs._tag === 'Nil';

import * as L from 'fp-ts-contrib/List';

// 📜 List
type Match = <A, B>(
  onNil: () => B,
  onCons: (head: A, tail: L.List<A>) => B
) => (xs: L.List<A>) => B;
export const match: Match = (onNil, onCons) => xs =>
  L.isNil(xs) ? onNil() : onCons(xs.head, xs.tail);

const myList: L.List<number> = L.cons(1, L.cons(2, L.cons(3, L.nil)));
const myList2: L.List<number> = L.nil;
const result = match(
  () => `list is empty`,
  (head: number, tail: L.List<number>) => `head is ${head}`
)(myList);
// )(myList2);

// console.log(result);
