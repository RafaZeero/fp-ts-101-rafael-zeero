import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { gte } from 'lodash';

const isValid = (num: { val1: number; val2: number }) => gte(num.val1, 4) && gte(num.val2, 4);
const toNumber = (obj: { val1: string; val2: string }): { val1: number; val2: number } => ({
  val1: Number(obj.val1),
  val2: Number(obj.val2),
});

const checkNum = (obj: { val1: number; val2: number }) => {
  if (obj.val1 < 4 && obj.val2 < 4) return `Both values lower than 4`;
  if (obj.val1 < 4) return `val1 is lower than 4`;
  if (obj.val2 < 4) return `val2 is lower than 4`;
  return '';
};

// * Test if value is higher than 4, then create a message
const testValue = (value: { val1: string; val2: string }) => {
  return pipe(
    value,
    toNumber,
    E.fromPredicate(isValid, num => checkNum(num)),
    E.mapLeft(message => `The final message is: ${message}`),
    E.fold(
      error => `${error}`,
      () => `All values higher than 4`,
    ),
  );
};

const test = testValue({ val1: '4', val2: '4' });

console.log(test);
