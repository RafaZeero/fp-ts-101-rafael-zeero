import * as O from 'fp-ts/Option';
import { const_ } from 'fp-ts/lib/Const';
import { pipe, constNull, identity, constVoid } from 'fp-ts/lib/function';
import {
  BehaviorSubject,
  Subject,
  distinctUntilChanged,
  filter,
  interval,
  map,
  merge,
  mergeWith,
  of,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
  timer,
  zip
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
  map(O.fromPredicate(x => x % 2 === 0)),
  filter(O.isSome),
  map(O.fold(constNull, identity)),
  takeUntil(timer(1000))
);

let foo = zip(interval(500), of('a', 'b', 'a', 'a', 'b')).pipe(
  map(([x, y]) => y),
  take(5)
);

let result = foo.pipe(distinctUntilChanged());

result.subscribe({
  next: x => console.log(x)
});

// data$.subscribe(console.log);
// data2$.subscribe(console.log);
