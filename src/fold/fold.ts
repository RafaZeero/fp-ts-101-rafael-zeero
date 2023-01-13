import { rafa, ray, User } from './helper'
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/lib/function'
import { describe, expect, it } from 'vitest'

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
      () => 'User has no pets',
      pet => `Nice pet : ${pet}`
    )
  )

getPet(rafaOpt)
getPet(rayOpt)

describe("Get user's pet", () => {
  it('should not return a pet', () => {
    const noPetUser = O.some<User>({
      name: 'fake-user',
      class: 'mage',
      level: 10
    })

    expect(getPet(noPetUser)).toBe('User has no pets')
  })

  it('should return a pet', () => {
    const petUser = O.some<User>({
      name: 'has pet',
      class: 'mage',
      level: 15,
      pet: "I'm a pet"
    })

    expect(getPet(petUser)).toBe("Nice pet : I'm a pet")
  })
})
