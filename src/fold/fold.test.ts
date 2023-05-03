import { describe, expect, it } from 'vitest';
import * as O from 'fp-ts/Option';
import { User } from './helper';
import { getPet } from './fold';

describe("Get user's pet", () => {
  it('should not return a pet', () => {
    const noPetUser = O.some<User>({
      name: 'fake-user',
      class: 'mage',
      level: 10
    });

    expect(getPet(noPetUser)).toBe('User has no pets');
  });

  it('should return a pet', () => {
    const petUser = O.some<User>({
      name: 'has pet',
      class: 'mage',
      level: 15,
      pet: "I'm a pet"
    });

    expect(getPet(petUser)).toBe("Nice pet : I'm a pet");
  });
});
