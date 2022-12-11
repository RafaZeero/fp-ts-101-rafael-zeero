// import * as E from 'fp-ts/Either';

// type Right when success/valid
type Right<A> = {
  _tag: 'Right';
  value: A;
};

// type Left when error
type Left<E> = {
  _tag: 'Left';
  value: E;
};

// type to possible throw an error or get the value
type Either<E, A> = Right<A> | Left<E>;

// Usage: usually when doing a tryc/catch method

const isRight = <E, A>(ma: Either<E, A>): ma is Right<A> => ma._tag === 'Right';
const isLeft = <E, A>(ma: Either<E, A>): ma is Left<E> => ma._tag === 'Left';

const error: Left<Error> = {
  _tag: 'Left',
  value: new Error('error')
};

const success: Right<string> = {
  _tag: 'Right',
  value: 'henloo'
};

if (isLeft(error)) console.log('Is Left');

if (isRight(success)) console.log(success.value, ' Is Right');

// Task function will never break or throw error
const isUrl = async (url: string): Promise<boolean> => {
  try {
    const result = new URL(url);
    console.log(result);
    return true;
  } catch {
    return false;
  }
};

// Task type
type Task<A> = () => Promise<A>;

// Or it can be use the type Lazy

type Lazy<A> = () => A;
type TaskWithLazy<A> = Lazy<Promise<A>>;
