import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';
import { typeOf } from './helpers';

const dota = {
  char: 'juggerzin'
};

pipe(dota, dotinha => dotinha.char); // 'juggerzin'

export type Books = {
  book1: string;
};

const books = {
  book1: 'Name of the wind'
} as Books | undefined;

const result = pipe(books, listOfBooks => listOfBooks?.book1); // 'Name of the wind'

// @ts-expect-error
const result2 = pipe(books, ({ book1 }) => book1); // error!!

const result3 = pipe(
  books,
  O.fromNullable,
  O.map(({ book1 }) => book1)
); // { _tag: 'Some', value: 'Name of the wind' }

console.log({
  result,
  result2,
  result3,
  typeof_result: typeOf(result),
  typeof_result2: typeOf(result2),
  typeof_result3: typeOf(result3)
});
