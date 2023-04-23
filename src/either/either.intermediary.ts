import * as E from 'fp-ts/Either';
import { identity, pipe } from 'fp-ts/function';
import * as A from 'fp-ts/Array';
import * as M from 'fp-ts/lib/Monoid';
import { log } from '../array/helper';
import { split, toUpper } from 'ramda';

const dataE: E.Either<string, string> = E.right('data right');
const data2E: E.Either<string, string> = E.left('data left');

const dataArrE: E.Either<string, string[]> = E.right(['rafa', 'dandan', 'ray']);
const dataArr2E: E.Either<string[], string> = E.left([]);

const either01 = () =>
  pipe(
    data2E,
    E.map(split(' ')),
    E.mapLeft(error => console.log(toUpper(error))),
    E.foldMap(M.monoidString)(v => `${v}!!!!`),
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
    log('either02 :')
  );

// either01();
// either02()
