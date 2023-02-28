import * as T from 'fp-ts/Task'

// * Tasks never fail !!

const boolTask: T.Task<boolean> = async () => {
  try {
    await asyncFunction()
    return true
  } catch (err) {
    return false
  }
}

const asyncFunction = () =>
  new Promise((resolve, reject) => resolve(setTimeout(() => console.log('timed out'), 5000)))

const asyncFunction2 = () => T.delay(2000)(async () => 'async function 2 run')

boolTask()
asyncFunction2()().then(console.log)
