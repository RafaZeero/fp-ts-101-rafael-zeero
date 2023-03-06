import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
dotenv.config();

const app = express();
const PORT = process.env['PORT'] || 3333;

const users: User[] = [];

const user = {
  login: 'rafa',
  senha: '123',
};

app.use(express.urlencoded({ extended: true })); /** Allow req.body */
app.use(express.json());

app.get('/log', (req: Request, res: Response) => {
  res.send('noice');
});

app.get('/', (req: Request, res: Response) => {
  pipe(
    O.fromNullable(req.body.credentials),
    E.fromOption(() => JSON.stringify({ error: 'Unauthorized. Invalid credentials' })),
    E.map(() => res.status(200).send(user)),
    E.mapLeft(error => res.status(401).send(error)),
  );
});
const createEither = (value: O.Option<string>): E.Either<Error, string> => {
  return E.either.of(value) as E.Either<Error, string>;
};

app.get('/save-local-storage/:value', (req: Request, res: Response) => {
  pipe(
    O.fromNullable(req.params['value']),
    E.fromNullable(createEither),
    E.map(value => localStorage.setItem('valor', value)),
  );
});

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
);

app.post('/', (req: Request, res: Response) => {
  const user = O.fromNullable<User>(req.body.user);

  const response = pipe(
    user,
    O.map(user => user),
  );

  O.isSome(response)
    ? users.push(response.value) && res.send(response.value)
    : res.send('not valid');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

type User = {
  name: string;
  age: number;
};
