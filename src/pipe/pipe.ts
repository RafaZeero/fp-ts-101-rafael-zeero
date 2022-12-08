// fp-ts imports
import { pipe } from 'fp-ts/lib/function';
// helper functions imports
import { add1, add2, add3, concat, convertToString, typeOf } from './helpers';

const result = pipe(1, add1, add2, add3); // 7
const result2 = pipe(1, add1, add1, add1); // 4
const result3 = pipe(1, add1, add1, convertToString); // '3'

const tuple = concat(5, n => pipe(n, add1, convertToString)); // [5, '5']

console.log({
  result,
  result2,
  result3,
  tuple,
  typeof_result: typeOf(result),
  typeof_result2: typeOf(result2),
  typeof_result3: typeOf(result3),
  typeof_tuple: typeOf(tuple)
});
