import express, { Request, Response } from 'express'
import * as dotenv from 'dotenv'
import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
dotenv.config()

const app = express()
const PORT = process.env['PORT'] || 3333

app.use(express.urlencoded({ extended: true })) /** Allow req.body */
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('henlo !!')
})

app.post('/', (req: Request, res: Response) => {
  const user = O.fromNullable<User>(req.body.user)

  const response = pipe(
    user,
    O.map(user => user)
  )

  O.isSome(response) ? res.send(response.value) : res.send('not valid')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

type User = {
  name: string
  age: number
}
