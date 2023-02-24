// fp-ts imports
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'
// helper functions imports
import { add1, add2, add3, concat, convertToString, typeOf } from './helpers'
import pino, { Level } from 'pino'
import PinoPretty from 'pino-pretty'

const streams2 = [{ stream: PinoPretty() }, { stream: pino.destination('src/pipe/custom.log') }]

const levels = {
  emerg: 80,
  alert: 70,
  crit: 60,
  error: 50,
  warn: 40,
  notice: 30,
  info: 20,
  debug: 10,
}

const streams = Object.keys(levels).map(level => {
  return {
    level: level as Level,
    stream: pino.destination(`src/pipe/app-${level}.log`),
  }
})

export const logger = pino(
  {
    name: 'testing-pino',
    customLevels: levels,
    useOnlyCustomLevels: true,
    // formatters: {
    //   level: label => {
    //     return { level: label }
    //   },
    // },
  },
  pino.multistream([...streams, ...streams2], { levels, dedupe: true }),
)

Object.keys(levels).forEach(level => logger[level as Level]('PALAVRAS'))

// logger.info('hello world')
// const child = logger.child({ a: 'property' })
// child.info('hello child!')

const result = pipe(1, add1, add2, add3, convertToString) // 7
const result2 = pipe(1, add1, add1, add1, convertToString) // 4
const result3 = pipe(1, add1, add1, convertToString) // '3'
const result4 = pipe(
  O.fromNullable('1'),
  O.map(v => logger.error(v)),
)

const tuple = concat(5, n => pipe(n, add1, convertToString)) // [5, '5']

const toLog = {
  result,
  result2,
  result3,
  tuple,
  typeof_result: typeOf(result),
  typeof_result2: typeOf(result2),
  typeof_result3: typeOf(result3),
  typeof_tuple: typeOf(tuple),
}

result4
