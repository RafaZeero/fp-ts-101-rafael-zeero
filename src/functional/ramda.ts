import { pipe } from 'fp-ts/lib/function';
import * as A from 'fp-ts/Array';
import * as R from 'ramda';

type ToSlug = (word: string) => string;

const toSlug: ToSlug = input => {
  const words = input.split(' ');
  const lowercasedWords = words.map(word => word.toLowerCase());
  const slug = lowercasedWords.join('-');
  const encodedURI = encodeURIComponent(slug);
  return encodedURI;
};

const ramdaToSlug: ToSlug = input => R.pipe(R.split(' '), R.map(R.toLower), R.join(''))(input);

const splitFN =
  (separator: string) =>
  (input: string): Array<string> =>
    input.split(separator);
const lowerFN = (input: string): string => input.toLowerCase();
const joinFN =
  (separator: string) =>
  (input: Array<string>): string =>
    input.join(separator);

const fptsToSlug: ToSlug = input =>
  pipe(input, A.of, A.chain(splitFN(' ')), A.map(lowerFN), x => joinFN(' ')(x));

// const slug = toSlug('This is a component');
// const slug = ramdaToSlug('This is a component');
const slug = fptsToSlug('This is a component');

console.log('slug: ', slug);
