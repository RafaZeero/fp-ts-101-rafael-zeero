import * as E from 'fp-ts/Either';
import * as t from 'io-ts';

// add numbers compose functions
const add = (addNumber: number) => (number: number) => number + addNumber;

export const add1 = add(1);
export const add2 = add(2);
export const add3 = add(3);

// convert to string
export const convertToString = (number: number): string => `${number}`;

// return the data type
export const typeOf = (value: unknown) => typeof value;

// create tuple
export const concat = (
  number: number,
  convert: (numberToConvert: number) => string,
): [number, string] => [number, convert(number)];

export const candidateCodec = t.type({
  name: t.string,
  email: t.string,
  english: t.type({
    listening: t.string,
    reading: t.string,
    speaking: t.string,
    writing: t.string,
  }),
});

export type Candidate = t.TypeOf<typeof candidateCodec>;

export type Evaluation2 = (candidate: Candidate) => E.Either<Error, any>;
