// Tutorial from https://dev.to/anthonyjoeseph/should-i-use-fp-ts-option-28ed

import * as O from 'fp-ts/Option'
import * as E from 'fp-ts/Either'
import { flow, pipe } from 'fp-ts/lib/function'

const lowercase = (a: string): string => a.toLowerCase()
const isAuthor = (a: string): boolean => lowercase(a).includes('bell hooks') || lowercase(a).includes('pattrice jones')
const lastName = (a: string): string | undefined => a.split(' ').length > 1 ? a.split(' ')[1] : undefined

const greet = (name: string | undefined): string => pipe(
  O.fromNullable(name),
  O.chain(O.fromPredicate(isAuthor)),
  O.map(lowercase),
  O.alt(() => pipe(
    O.fromNullable(name),
    O.chain(flow(
      lastName,
      O.fromNullable,
    )),
  )),
  O.map(n => `Hello ${n}`),
  O.getOrElse(() => 'Greetings!'),
)

console.log(greet('Rafael'))