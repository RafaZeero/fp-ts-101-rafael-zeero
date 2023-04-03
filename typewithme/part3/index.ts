import * as T from 'fp-ts/Task';

const foo = 'wasd';

/** Same result below */
const bar = T.of(foo);
const wasd: T.Task<string> = () => Promise.resolve(foo);
