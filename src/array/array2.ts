import * as O from 'fp-ts/Option';
import * as A from 'fp-ts/Array';
import * as Ap from 'fp-ts/Apply';
import { pipe } from 'fp-ts/lib/function';

const nameAndAge: [O.Option<string>, O.Option<number>] = [O.some('anthony'), O.some(26)];

const printSelf = pipe(
  Ap.sequenceT(O.option)(...nameAndAge),
  O.map(([name, age]) => `In five years ${name} will be ${age + 5}`),
  O.getOrElse(() => `Missing name or age.`)
);

console.log(printSelf);

const names: O.Option<string>[] = [O.some('anthony'), O.none, O.some('gabriele')];

const allNamesFailure: O.Option<Array<string>> = pipe(names, A.sequence(O.option));
console.log({ allNamesFailure });
// allNamesFailure = O.none

const allNamesSuccess: O.Option<Array<string>> = pipe(
  [O.some('anthony'), O.some('gabriele')],
  A.sequence(O.option)
);
console.log({ allNamesSuccess });
// allNamesSuccess = O.some(['anthony', 'gabriele'])
