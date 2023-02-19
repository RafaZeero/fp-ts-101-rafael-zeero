import * as A from 'fp-ts/Array'
import * as NEA from 'fp-ts/NonEmptyArray'
import { pipe } from 'fp-ts/lib/function'
import { log } from './helper'
import * as E from 'fp-ts/Either'
import * as M from 'fp-ts/lib/Monoid'
import { Semigroup } from 'fp-ts/lib/Semigroup'

const array01 = () =>
  pipe(
    A.range(1, 10),
    A.filter(n => n % 2 === 0),
    A.map(n => n * n),
    log('(FROM ARRAY01) : '),
  )

const foo = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1]
const bar = ['a', 'b', 'c']
const foobar = [
  { name: 'rafa', age: 12 },
  { name: 'dandan', age: 15 },
  { name: 'ray', age: 25 },
  { name: 'gigi', age: 22 },
  { name: 'luna', age: 32 },
]

const array02 = () => pipe(foo, A.zip(bar), log('(FROM ARRAY02) Zip: '))

const array03 = () =>
  pipe(
    foo,
    A.lookup(2),
    E.fromOption(() => 'error!'),
    E.fold(
      err => err,
      x => x.toString(),
    ),
    log('(FROM ARRAY03) Lookup: '),
  )

const array04 = () => pipe(foo, A.head, log('[array 04] from head')) // returns an option
const array05 = () => {
  if (A.isNonEmpty(foo)) return pipe(foo, NEA.head, log('[array 05] from head')) // returns the value itself
}

const array06 = () =>
  pipe(
    A.array.filter(foobar, n => n.age > 20),
    log('[array 06] from filter: '),
  )

const array07 = () =>
  pipe(
    A.array.partitionMap(foobar, n => (n.age < 20 ? E.left(n) : E.right(n))),
    x => x,
    // ({ left: foos, right: bars }) => foos,
    // ({ left: foos, right: bars }) => bars,
    log('[array 07] from partitionMap: '),
  )

const semigroupMax: Semigroup<number> = {
  concat: Math.max,
}

const monoidMax: M.Monoid<number> = {
  concat: semigroupMax.concat,
  empty: Number.NEGATIVE_INFINITY,
}

const array08 = () =>
  pipe(
    A.array.partitionMap(foobar, n => (n.age < 20 ? E.left(n) : E.right(n))),
    ({ left: foos, right: bars }) => {
      const sumLower = A.array.foldMap(M.monoidSum)(foos, foo => foo.age) // sum values below 20
      const sumHigher = A.array.foldMap(M.monoidSum)(bars, bar => bar.age) // sum values equal or higher than 20

      console.log({ sumLower, sumHigher })

      return { sumLower, sumHigher }
    },
    log('sumLower and sumHigher than 20: '),
  )

// array01()
// array02()
// array03'()
// array04()
// array05()
// array06()
// array07()
array08()
