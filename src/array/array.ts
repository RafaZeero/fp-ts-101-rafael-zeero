import * as A from 'fp-ts/Array'
import { pipe } from 'fp-ts/lib/function'

const main = () =>
  pipe(
    A.range(1, 100),
    A.filter(n => n % 2 === 0),
    A.map(n => n * n),
    console.log
  )

main()
