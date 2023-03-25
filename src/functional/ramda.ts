import { pipe } from 'fp-ts/lib/function';
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

// const slug = toSlug('This is a component');
const slug = ramdaToSlug('This is a component');

console.log('slug: ', slug);
