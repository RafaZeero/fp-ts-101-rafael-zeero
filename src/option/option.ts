// types OPTION construction
type Some<A> = {
  _tag: 'Some'
  value: A
}

type None = {
  _tag: 'None'
}

type Option<A> = Some<A> | None

// Examples

const numberZero = 0 // ou Null

const numberOptionSome: Option<number> = {
  _tag: 'Some',
  value: numberZero
}

const numberOptionNone: Option<number> = {
  _tag: 'None'
}

// Functions in tp-ts to use with Option

const isSome = <A>(option: Option<A>): option is Some<A> => option._tag === 'Some'
const isNone = <A>(option: Option<A>): option is None => option._tag === 'None'

// Option Some will log the value
if (isSome(numberOptionSome)) console.log('numberOptionSome Is Some!')
// Option None will NOT log the value
if (isSome(numberOptionNone)) console.log('numberOptionNone Is Some!')

// Option Some will NOT log the value
if (isNone(numberOptionSome)) console.log('numberOptionSome Is None!')
// Option None will log the value
if (isNone(numberOptionNone)) console.log('numberOptionNone Is None!')
