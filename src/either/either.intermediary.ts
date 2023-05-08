import * as E from 'fp-ts/Either';
import { identity, pipe } from 'fp-ts/function';
import * as A from 'fp-ts/Array';
import * as M from 'fp-ts/lib/Monoid';
import { log } from '../array/helper';
import { split, toUpper } from 'ramda';

const dataE: E.Either<string, string> = E.right('data right');
const data2E: E.Either<string, string> = E.left('data left');
const data3E: E.Either<string, string> = E.right('mais um mes sem festa junina 😢...');

const dataArrE: E.Either<string, string[]> = E.right(['rafa', 'dandan', 'ray']);
const dataArr2E: E.Either<string[], string> = E.left([]);

const either01 = () =>
  pipe(
    data2E,
    E.map(split(' ')),
    E.mapLeft(error => console.log(toUpper(error))),
    E.foldMap(M.monoidString)(v => `${v}. Ta chegandoo 🙂!!!!`),
    // E.mapLeft(val => val),
    // E.getOrElse(v => v),

    log('either 01: ')
  );

const either02 = () =>
  pipe(
    dataArrE,
    E.map(v =>
      pipe(
        E.right(['a', 'b', 'c']),
        E.map(arr2 => A.zip(v)(arr2)),
        E.mapLeft(() => 'error')
      )
    ),
    E.chain(pair =>
      pipe(
        pair,
        E.map((pairs: [string, string][]) => A.array.reduce(pairs, '', (a, b) => `${a} ${b}`))
      )
    ),
    // E.flatten,
    // E.map(pairs => A.array.reduce(pairs, '', (a, b) => `${a} ${b}`)),
    E.foldMap(M.monoidString)(identity),
    log('either 02 :')
  );

// either01();
either02();

/**
 * Reference from [troiktech](https://troikatech.com/blog/2020/09/24/fp-ts-error-handling-the-functional-way/)
 */
const troiktech = 'check link';

const goodValue: E.Either<Error, string> = E.right('Good');
const badValue: E.Either<Error, string> = E.left(new Error('Bad'));

const worseValue = pipe(
  goodValue,
  E.chain(value => E.left(new Error(`Nothing can be ${value} in 2020`)))
); // this is now a 'left'

const improvedValue = pipe(
  worseValue,
  E.alt(() => E.right('Back to 2015'))
);

// * Returns the same type as the Right value
const mehValue = pipe(
  worseValue,
  E.getOrElse(err => `I used to be ${err}. Now I'm free`)
);

// * Can return a new type !!
const answer = pipe(
  improvedValue,
  E.fold(
    () => 42,
    value => value.length
  )
);
