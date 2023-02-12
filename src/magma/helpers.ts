import type { Magma } from 'fp-ts/Magma'

export const getPipeableConcat =
  <A>(M: Magma<A>) =>
  (second: A) =>
  (first: A): A =>
    M.concat(first, second)

export const log = (message: string) => (value: unknown) => console.log(message + value)
