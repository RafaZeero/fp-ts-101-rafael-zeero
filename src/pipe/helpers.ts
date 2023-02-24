// add numbers compose functions
const add = (addNumber: number) => (number: number) => number + addNumber

export const add1 = add(1)
export const add2 = add(2)
export const add3 = add(3)

// convert to string
export const convertToString = (number: number): string => `${number}`

// return the data type
export const typeOf = (value: unknown) => typeof value

// create tuple
export const concat = (
  number: number,
  convert: (numberToConvert: number) => string,
): [number, string] => [number, convert(number)]
