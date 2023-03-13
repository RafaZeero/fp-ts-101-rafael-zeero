import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { failure } from 'io-ts/lib/PathReporter';
import { toNumber } from 'lodash';
import { Candidate, candidateCodec, CandidateNumber } from './helpers';

const candidate: Candidate = {
  email: 'rafaa99@gmail.com',
  english: {
    listening: '2',
    reading: '3',
    speaking: '4',
    writing: '5',
  },
  name: 'rafael',
};

const englishToNumber = (candidate: Candidate): CandidateNumber => {
  const newEnglish = Object.assign({} as CandidateNumber['english']) as CandidateNumber['english'];
  Object.keys(candidate.english).forEach(
    key =>
      (newEnglish[key as keyof typeof candidate['english']] = toNumber(
        candidate.english[key as keyof typeof candidate['english']],
      )),
  );

  const updated = { name: candidate.name, email: candidate.email, english: newEnglish };

  return updated;
};

const evaluateCandidate = () =>
  pipe(
    candidate,
    candidateCodec.decode,
    E.map(englishToNumber),
    E.mapLeft(error => new Error(failure(error).join(':::'))),
    E.fold(
      () => 'error',
      val => JSON.stringify(val, null, 2),
    ),
  );

console.dir(evaluateCandidate());
