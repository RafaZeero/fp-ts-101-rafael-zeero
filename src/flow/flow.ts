// fp-ts imports
import { flow } from 'fp-ts/lib/function'
// helper functions imports
import { multiply1, multiply2, multiply3, convertToString, typeOf, concat } from './helpers'

const result = flow(multiply1)(2) // 2
const result2 = flow(multiply2, multiply2)(2) //8
const result3 = flow(multiply3, convertToString)(10) // '30

const tuple = concat(10, flow(multiply2, multiply2, convertToString)) // [10, '40']

console.log({
  result,
  result2,
  result3,
  tuple,
  typeof_result: typeOf(result),
  typeof_result2: typeOf(result2),
  typeof_result3: typeOf(result3),
  typeof_tuple: typeOf(tuple)
})
