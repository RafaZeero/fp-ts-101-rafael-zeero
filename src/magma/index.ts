import type { Magma } from 'fp-ts/Magma'
import { getPipeableConcat } from './helpers'

const MagmaSub: Magma<number> = {
  concat: (first, second) => first - second,
}

const concat = getPipeableConcat(MagmaSub)

import { pipe } from 'fp-ts/lib/function'

pipe(10, concat(2), concat(2), concat(-2), console.log)
