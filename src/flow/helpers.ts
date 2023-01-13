// multiply numbers compose functions
const multiply = (multiplyNumber: number) => (number: number) => number * multiplyNumber

export const multiply1 = multiply(1)
export const multiply2 = multiply(2)
export const multiply3 = multiply(3)

// convert to string
export const convertToString = (number: number): string => `${number}`

// return the data type
export const typeOf = (value: unknown) => typeof value

// create tuple
export const concat = <A, B>(value: A, convert: (valueToConvert: A) => B): [A, B] => [value, convert(value)]
