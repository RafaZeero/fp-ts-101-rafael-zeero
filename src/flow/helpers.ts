const multiply = (multiplyNumber: number) => (number: number) =>
  number * multiplyNumber;

export const multiply1 = multiply(1);
export const multiply2 = multiply(2);
export const multiply3 = multiply(3);

export const convertToString = (number: number): string => `${number}`;

export const typeOf = (value: unknown) => typeof value;
