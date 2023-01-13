import { rafa, ray, User } from './helper'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/lib/function'

const rafaOpt = O.some(rafa)
const rayOpt = O.some(ray)

// get Pet
const getPet = (userOpt: O.Option<User>) =>
  pipe(
    userOpt,
    O.chain(x => {
      return O.fromNullable(x.pet)
    }),
    O.fold(
      () => console.log('User has no pet!!'),
      pet => console.log(pet)
    )
  )

getPet(rafaOpt)
getPet(rayOpt)
