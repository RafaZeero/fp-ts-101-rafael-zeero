import { pipe } from 'fp-ts/lib/function'
import * as T from 'fp-ts/Task'

const arr: T.Task<number[]> = () => new Promise(resolve => setTimeout(() => resolve([1, 2, 3, 4]), 2000))

const tmap = T.map((array: number[]) => {
  return array
})

const tlog = T.map(array => {
  console.log('reached tmap', array)
})

const runTmap = tmap(arr)
const runTlog = tlog(arr)

pipe(arr, runTmap, runTlog)
