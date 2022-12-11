// TaskEither for functions that return a Promise
// which will possibly trigger an error

type TaskEither<E, A> = Task<Either<E, A>>;
