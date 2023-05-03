import { rafa, ray, User } from './helper';
import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';

const rafaOpt = O.some(rafa);
const rayOpt = O.some(ray);

// get Pet
export const getPet = (userOpt: O.Option<User>) =>
  pipe(
    userOpt,
    O.chain(({ pet }) => O.fromNullable(pet)),
    O.fold(
      () => 'User has no pets',
      pet => `Nice pet : ${pet}`
    ),
    console.log
  );

// get class
export const getClass = (userOpt: O.Option<User>) =>
  pipe(
    userOpt,
    O.chain(user => O.fromNullable(user.class)),
    O.fold(
      () => `You need a class`,
      c => `Your class is ${c}`
    ),
    console.log
  );

// get level
export const getLevel = {
  /* ... */
};

// get info!
export const makeGetInfo = (info: keyof User) => (userOpt: O.Option<User>) =>
  pipe(
    userOpt,
    O.chain(user => O.fromNullable(user[info])),
    O.fold(
      () => `No data provided for "${info}".`,
      data => `Your ${info} is ${data}`
    ),
    console.log
  );

/* ##################################### */

// getPet(rafaOpt);
// getPet(rayOpt);

/* ##################################### */

// getClass(rafaOpt);
// getClass(rayOpt);

/* ##################################### */

const getUserXX = makeGetInfo('pet');

// getUserXX(rafaOpt);

/* ##################################### */

const nestedOpt = O.some(10);

const nestIt = <T>(value: O.Option<T>): O.Option<O.Option<T>> => O.of(value);

const logAndPass = <T>(val: T): T => {
  console.count('logAndPass');
  console.log(val);
  return val;
};

const removeNested = <T>(nested: O.Option<T>) =>
  pipe(
    nested, // O.some(10)
    nestIt, // O.some(O.some(10))
    logAndPass, // 1
    nestIt, // O.some(O.some(O.some(10)))
    logAndPass, // 2
    nestIt, // O.some(O.some(O.some(O.some(10))))
    logAndPass, // 3
    O.chain(O.chain(O.chain(logAndPass))) // 4
    // O.chain(logAndPass),
    // O.flatten,
    // logAndPass, // 4
    // O.chain(logAndPass),
    // O.flatten,
    // logAndPass, // 5
    // O.chain(logAndPass)
    // O.flatten,
    // logAndPass // 6
  );

removeNested(nestedOpt);
