import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/lib/function'
import { log } from './helper'
import * as E from 'fp-ts/Either'

const array01 = () =>
  pipe(
    A.range(1, 10),
    A.filter(n => n % 2 === 0),
    A.map(n => n * n),
    log('(FROM ARRAY01) : '),
  )

const foo = [1, 2, 3]
const bar = ['a', 'b', 'c']

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
// array01()
// array02()
array03()
