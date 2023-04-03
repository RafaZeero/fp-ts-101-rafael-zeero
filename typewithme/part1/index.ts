import { pipe, flow } from 'fp-ts/lib/function';

const add1 = (num: number): number => num + 1;
const multiplyBy2 = (num: number): number => num * 2;

const result = pipe(3, add1, multiplyBy2);

// console.log(result); // 8

const toLower = (s: string): string => s.toLowerCase();

const suffixAppend =
  (suffix: string) =>
  (s: string): string =>
    `${suffix} - ${s}`;

const result2 = pipe('AwEsomE', toLower, suffixAppend('adding this'));

console.log(result2);
