import express, { Request, Response } from 'express'
import * as dotenv from 'dotenv'
import { pipe } from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
dotenv.config()

const app = express()
const PORT = process.env['PORT'] || 3333

const users: User[] = []

const user = {
  login: 'rafa',
  senha: '123',
}

app.use(express.urlencoded({ extended: true })) /** Allow req.body */
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  pipe(
    O.fromNullable(req.body),
    E.fromOption(() => 'no values in req.body'),
    E.map(() => res.status(200).send(users)),
    E.mapLeft(error => res.send(error)),
  )
})

app.post('/login', (req: Request, res: Response) =>
  pipe(
    O.fromNullable(req.body as typeof user),
    E.fromOption(() => 'no values in req.body'),
    x => x,
    E.filterOrElse(
      credentials => credentials.login === user.login && credentials.senha === user.senha,
      () => 'error invalid credentials',
    ),
    E.map(() => res.send('logged in')),
    E.mapLeft(error => res.send(error)),
  ),
)

app.post('/', (req: Request, res: Response) => {
  const user = O.fromNullable<User>(req.body.user)

  const response = pipe(
    user,
    O.map(user => user),
  )

  O.isSome(response)
    ? users.push(response.value) && res.send(response.value)
    : res.send('not valid')
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

type User = {
  name: string
  age: number
}
