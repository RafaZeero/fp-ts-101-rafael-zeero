type Classes = 'mage' | 'warrior' | 'archer'

export type User = {
  name: string
  level: number
  class: Classes
  pet?: string
}

export const rafa: User = {
  name: 'Rafael',
  level: 28,
  class: 'archer'
}

export const ray: User = {
  name: 'Rayssa',
  level: 27,
  class: 'mage',
  pet: 'gigi'
}
