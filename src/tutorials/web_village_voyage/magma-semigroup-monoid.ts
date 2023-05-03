import * as L from 'fp-ts-contrib/List';
import { match } from './adt';

type ListOf<T> = (xs: L.List<T>) => T;

type AddAll = ListOf<number>;
const addAll: AddAll = match(
  () => 0,
  (head, tail) => head + addAll(tail)
);

const list = {
  number: L.cons(2, L.cons(3, L.cons(4, L.nil))),
  string: L.cons('a', L.cons('b', L.cons('c', L.nil)))
};

// console.log(addAll());

type MultiplyAll = ListOf<number>;
const multiplyAll: MultiplyAll = match(
  () => 1,
  (head, tail) => head * multiplyAll(tail)
);

// console.log(multiplyAll(list.number));

type AppendAll = ListOf<string>;
const appendAll: AppendAll = match(
  () => '',
  (head, tail) => head.concat(appendAll(tail))
);

// console.log(appendAll(list.string));

type Magma<A> = {
  concat: (x: A, y: A) => A;
};

type Semigroup<A> = Magma<A>;

const addSemigroup: Semigroup<number> = { concat: (x, y) => x + y };
const multiplySemigroup: Semigroup<number> = { concat: (x, y) => x * y };
const appendSemigroup: Semigroup<string> = { concat: (x, y) => x.concat(y) };

const concatAll =
  <A>(s: Semigroup<A>) =>
  (startsWith: A) =>
  (xs: L.List<A>): A =>
    match(
      () => startsWith,
      (head: A, tail: L.List<A>) => s.concat(head, concatAll(s)(startsWith)(tail))
    )(xs);

console.log(concatAll(addSemigroup)(0)(list.number));
console.log(concatAll(multiplySemigroup)(1)(list.number));
console.log(concatAll(appendSemigroup)('')(list.string));

type Monoid<A> = Semigroup<A> & {
  empty: A;
};

const addMonoid: Monoid<number> = { ...addSemigroup, empty: 0 };
const multiplyMonoid: Monoid<number> = { ...multiplySemigroup, empty: 1 };
const appendMonoid: Monoid<string> = { ...appendSemigroup, empty: '' };

const concatAll2 =
  <A>(m: Monoid<A>) =>
  (xs: L.List<A>): A =>
    match(
      () => m.empty,
      (head: A, tail: L.List<A>) => m.concat(head, concatAll2(m)(tail))
    )(xs);

console.log(concatAll2(addMonoid)(list.number));
console.log(concatAll2(multiplyMonoid)(list.number));
console.log(concatAll2(appendMonoid)(list.string));
