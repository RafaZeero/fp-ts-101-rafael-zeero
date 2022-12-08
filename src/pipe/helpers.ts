const add = (addNumber: number) => (number: number) => number + addNumber;

export const add1 = add(1);
export const add2 = add(2);
export const add3 = add(3);

export const convertToString = (number: number): string => `${number}`;
