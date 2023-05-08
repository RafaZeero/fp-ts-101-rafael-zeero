import * as E from 'fp-ts/lib/Either';
import { identity } from 'fp-ts/lib/function';

// Either
// ======

// Problem: Given a string, parse the number, yielding an Either of the parsed
// number if successful, or an Error if the parse is unsuccessful.

const parseNumber: (str: string) => E.Either<Error, number> = str =>
  isNaN(parseInt(str))
    ? E.left(new Error('WTF BRO, this is not a number!!'))
    : E.right(parseInt(str));

// uncomment these lines to test out `parseNumber` 👇🏼
const validParseResult = E.fold(identity, identity)(parseNumber('20'));
console.info(validParseResult);

const invalidParseResult = E.fold(identity, identity)(parseNumber('uhms!'));
console.info(invalidParseResult);
