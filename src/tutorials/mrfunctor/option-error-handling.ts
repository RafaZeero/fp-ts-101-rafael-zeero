import { identity, pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/Option';

type Movie = Readonly<{
  title: string;
  releaseYear: number;
  ratingPosition: number;
  award?: string;
}>;

// * * * * * * * * * * * * * * * * * * //

const movie1: Movie = {
  title: 'The Kingdom of the Monads',
  releaseYear: 2023,
  ratingPosition: 1,
  award: 'Oscar'
};

const movie2: Movie = {
  title: 'Natural Transformations',
  releaseYear: 2023,
  ratingPosition: 6
};

const movie3: Movie = {
  title: 'Fun with for loops',
  releaseYear: 2023,
  ratingPosition: 19
};

// * * * * * * * * * * * * * * * * * * //

const getMovieAwardHightlight = (movie: Movie): O.Option<string> =>
  pipe(
    movie.award, // string | undefined
    O.fromNullable, // Option<string>
    O.map(award => `Awarded with ${award}`) // Option<string>
  );

const getMovieTop10Highlight = (movie: Movie): O.Option<string> =>
  pipe(
    movie,
    O.fromPredicate(({ ratingPosition }) => ratingPosition <= 10), // Option<Movie>
    O.map(({ ratingPosition }) => `In Top 10 at position: ${ratingPosition}`) // Option<string>
  );

const getMovieHighlight = (movie: Movie): string =>
  pipe(
    movie,
    getMovieAwardHightlight,
    O.alt(() => getMovieTop10Highlight(movie)),
    // O.getOrElse(() => `Released in ${movie.releaseYear}`)
    O.fold(() => `Released in ${movie.releaseYear}`, identity)
  );

console.log(getMovieHighlight(movie1));
console.log(getMovieHighlight(movie2));
console.log(getMovieHighlight(movie3));
