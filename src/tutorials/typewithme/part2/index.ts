import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';

type Foo = { bar: string };
type Fizz = { buzz?: Buzz };
type Buzz = { fizz: string };

const foo = { bar: 'henlo' } as Foo | undefined;

const fizz = { buzz: { fizz: 'undefined' } } as Fizz;

// pipe(
//   foo,
//   O.fromNullable,
//   O.map(({ bar }: Foo) => bar),
//   console.log
// );

pipe(
  fizz,
  O.fromNullable,
  O.chain(({ buzz }) =>
    pipe(
      buzz,
      O.fromNullable,
      O.map(({ fizz }) => fizz)
    )
  ),
  console.log
);
