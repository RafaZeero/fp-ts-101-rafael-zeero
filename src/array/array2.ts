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
