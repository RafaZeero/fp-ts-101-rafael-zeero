import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import * as t from 'io-ts';
import { failure } from 'io-ts/PathReporter';
import { withMessage } from 'io-ts-types';
import { gt, gte } from 'lodash';
import { Candidate } from './helpers';

const candidateT = {
  email: 'nice@mail.com',
  english1: '',
  'Rate you [Reading]...': '6',
  name: 'Daniel',
};

const fromExcel = (candidate: any): RawCandidate => {
  console.log('fromExcel: ', candidate);

  return {
    english: {
      listening: parseInt(
        candidate[EXCEL_DESIGN_CANDIDATE.english_reading] ||
          candidate[EXCEL_SALES_CANDIDATE.english_reading],
      ),
      reading: parseInt(
        candidate[EXCEL_DESIGN_CANDIDATE.english_reading] ||
          candidate[EXCEL_SALES_CANDIDATE.english_reading],
      ),
      speaking: parseInt(
        candidate[EXCEL_DESIGN_CANDIDATE.english_reading] ||
          candidate[EXCEL_SALES_CANDIDATE.english_reading],
      ),
      writing: parseInt(
        candidate[EXCEL_DESIGN_CANDIDATE.english_reading] ||
          candidate[EXCEL_SALES_CANDIDATE.english_reading],
      ),
    },
  } as RawCandidate;
};

type RawCandidate = {
  english: {
    reading: number;
    listening: number;
    writing: number;
    speaking: number;
  };
};

type ValidCandidate = t.OutputOf<typeof validCandidateCodec>;

enum EXCEL_SALES_CANDIDATE {
  english_reading = 'Rate you [Reading]...',
}

enum EXCEL_DESIGN_CANDIDATE {
  english_reading = 'Rate you 2 [Reading]...',
}

type ValidLevel = {
  readonly Level: unique symbol;
};

export const validLevelCodec = withMessage(
  t.brand(t.number, (value): value is t.Branded<number, ValidLevel> => isValid(value), 'Level'),
  () => 'Invalid value!',
);

export type Valid = t.TypeOf<typeof validLevelCodec>;

const isValid = (value: number): boolean => value >= 0 && value <= 5;

const validCandidateCodec = t.type({
  english: t.type({
    reading: validLevelCodec,
    listening: validLevelCodec,
    writing: validLevelCodec,
    speaking: validLevelCodec,
  }),
});

const evaluate = (candidate: typeof candidateT) => {
  return pipe(
    candidate,
    // transform to number
    fromExcel,
    validCandidateCodec.decode,
    E.mapLeft(val => failure(val).join(':::')),
    E.chain(E.fromPredicate(maiorQue3, error => `${error}`)),
    // E.fromPredicate(maiorQue3, () => [{ message: 'invalid' }]),

    // validate if > 3
    // E.mapLeft(error => `error: ${error}`),
  );
};

function maiorQue3(obj: ValidCandidate) {
  // lodash
  return gt(obj.english.listening, 3);
}

const testfpts = evaluate(candidateT);

console.dir(testfpts);
