// fp-ts imports
import { pipe } from 'fp-ts/lib/function';
// helper functions imports
import { add1, add2, add3, convertToString } from './helpers';

const result = pipe(1, add1, add2, add3); // 7
const result2 = pipe(1, add1, add1, add1); // 4
const result3 = pipe(1, add1, add1, convertToString); // '3'

// const result3 = add1(1);

const typeOf = (value: unknown) => typeof value;

console.log({
  result,
  result2,
  result3,
  typeof_result: typeOf(result),
  typeof_result2: typeOf(result2),
  typeof_result3: typeOf(result3)
});
