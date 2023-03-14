const sum = <T>(array: readonly T[], mapper: (item: T) => number): number =>
  array.reduce((acc, item) => acc + mapper(item), 0);

const obj = [
  { nome: 'a', idade: 1 },
  { nome: 'a', idade: 2 },
  { nome: 'a', idade: 3 },
  { nome: 'a', idade: 4 },
  { nome: 'a', idade: 5 },
];

const a = sum(obj, item => item.idade);

console.log(a);
