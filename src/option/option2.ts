import * as O from 'fp-ts/Option';
import { pipe, constNull, identity } from 'fp-ts/lib/function';
import {
  BehaviorSubject,
  Subject,
  filter,
  interval,
  map,
  merge,
  mergeWith,
  of,
  startWith,
  takeUntil,
  timer
} from 'rxjs';

const _example$ = new Subject<number>();
const example$ = _example$.asObservable();

const data$ = example$.pipe(
  map(O.fromNullable),
  map(O.map(x => x + 100)),
  map(O.fold(constNull, identity))
);

const data2$ = interval(100).pipe(
  mergeWith(example$),
  map(O.fromNullable),
  // map(O.map(x => x * 2)),
  // filter(x => O.isSome(x) && x.value % 2 === 0), // find a better solution to get only the pairs
  map(O.fold(constNull, identity)),
  takeUntil(timer(1000))
);

// data$.subscribe(console.log);
data2$.subscribe(console.log);
