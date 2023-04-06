import * as O from 'fp-ts/Option';
import { pipe, constNull, identity } from 'fp-ts/lib/function';
import { BehaviorSubject, map } from 'rxjs';

const _example$ = new BehaviorSubject<number>(0);
const example$ = _example$.asObservable();

const data$ = example$.pipe(
  map(O.fromNullable),
  map(O.map(x => x + 100)),
  map(O.fold(constNull, identity))
);

data$.subscribe(console.log);
