import type { Magma } from 'fp-ts/Magma'
import { getPipeableConcat, log } from './helpers'

const MagmaSub: Magma<number> = {
  concat: (first, second) => first - second,
}

const MagmaSum: Magma<number> = {
  concat: (first, second) => first + second,
}

const sub = getPipeableConcat(MagmaSub)
const sum = getPipeableConcat(MagmaSum)

import { pipe } from 'fp-ts/lib/function'

pipe(10, sum(2), sum(2), sum(-2), log('Magma result: '))

pipe(20, sum(3), sub(1), sum(5), log('Magma result 2: '))
