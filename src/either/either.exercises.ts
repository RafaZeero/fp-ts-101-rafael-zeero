import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';

function divideTwoIfEven(num: number): number {
  if (num === 0) throw 'Cannot divide by zero.';

  if (num % 2 !== 0) throw 'Number is not even.';

  return 2 / num;
}

function divideTwoIfEvenO(num: number): O.Option<number> {
  if (num === 0) return O.none;

  if (num % 2 !== 0) return O.none;

  return O.some(2 / num);
}

const exampleOne = divideTwoIfEven(10);
// const exampleOne = divideTwoIfEven(1);
// const exampleOne = divideTwoIfEven(0);

// console.log(exampleOne);

const exampleTwo = divideTwoIfEvenO(10);
// const exampleTwo = divideTwoIfEvenO(1);
// const exampleTwo = divideTwoIfEvenO(0);

// console.log(exampleTwo);

// * * * * * * * * * * * * * * * * * * //

type Left<E> = {
  readonly _tag: 'Left';
  readonly left: E;
};

type Right<A> = {
  readonly _tag: 'Right';
  readonly right: A;
};

type Either<E, A> = Left<E> | Right<A>;

let result: Either<string, number>;

result = { right: -4, _tag: 'Right' };
result = { right: 124, _tag: 'Right' };
result = { right: 756, _tag: 'Right' };
result = { right: 0, _tag: 'Right' };

result = { left: 'Permission denied', _tag: 'Left' };
result = { left: 'Invalid data', _tag: 'Left' };
result = { left: 'WTF BRO?', _tag: 'Left' };

const left = <E, A = never>(e: E): Either<E, A> => ({
  _tag: 'Left',
  left: e
});

const right = <A, E = never>(a: A): Either<E, A> => ({
  _tag: 'Right',
  right: a
});

const isLeft = <E, A>(ma: Either<E, A>): ma is Left<E> => ma._tag === 'Left';
const isRight = <E, A>(ma: Either<E, A>): ma is Right<A> => ma._tag === 'Right';

const tenR = left(10);
//     ^?

// isLeft(tenR) ? console.log('I am a Left type') : console.log('I am a Right type');
// ^?

//                                      Either<Left  , Right>
function divideTwoIfEvenE(num: number): Either<string, number> {
  if (num === 0) return left('Cannot divide by zero.');

  if (num % 2 !== 0) return left('Number is not even.');

  return right(2 / num);
}

// * * * * * * * * * * * * * * * * * * //

const pipe =
  <T extends (...args: Array<any>) => any>(...args: Array<T>) =>
  (x: any) =>
    args.reduce((value, fn) => fn(value), x);

const compose =
  (x: any) =>
  <T extends (...args: Array<any>) => any>(...args: Array<T>) =>
    args.reduce((value, fn) => fn(value), x);

function typedPipe<A>(a: A): A;
function typedPipe<A, B>(a: A, firstFn: (a: A) => B): B;
function typedPipe<A, B, C>(a: A, firstFn: (a: A) => B, secondFn: (b: B) => C): C;
function typedPipe<A, B, C>(a: A, firstFn?: (a: A) => B, secondFn?: (b: B) => C): A | B | C {
  switch (arguments.length) {
    case 1:
      return a;
    case 2:
      return firstFn!(a);
    case 3:
      return secondFn!(firstFn!(a));
  }
  return a;
}

const sum2With = typedPipe(
  false,
  x => x,
  x => x
);

const sum2 = compose(2)(
  x => x + 1,
  x => x + 1
);

console.log(sum2With);
// console.log(sum2);
