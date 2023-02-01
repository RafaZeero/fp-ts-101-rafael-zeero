import * as A from 'fp-ts/lib/Array'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'

type Foo = {
  readonly _tag: 'Foo'
  readonly f: () => number
}

type Bar = {
  readonly _tag: 'Bar'
  readonly g: () => number
}

const compute = (arr: Array<Foo | Bar>) =>
  pipe(
    A.array.partitionMap(arr, a => (a._tag === 'Foo' ? E.left(a) : E.right(a))),
    ({ left: foos, right: bars }) => {
      const sum = A.array.reduce(foos, 0, (prev, foo) => prev + foo.f()) // sum all foos
      const max = A.array.reduce(bars, Number.NEGATIVE_INFINITY, (max, bar) => Math.max(max, bar.g())) // get max bar

      return sum * max
    },
  )

console.log(
  compute([
    { _tag: 'Bar', g: () => 1 },
    { _tag: 'Bar', g: () => 2 },
    { _tag: 'Foo', f: () => 10 },
    { _tag: 'Foo', f: () => 10 },
    { _tag: 'Foo', f: () => 10 },
  ]),
)
