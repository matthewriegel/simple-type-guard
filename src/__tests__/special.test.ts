import simpleTypeGuard, { SimpleExactMatch } from '..';

describe('special type tests', () => {
  test('type guard recognizes string - truthy', () => {
    const result = simpleTypeGuard<'hello' | 'dolly'>(
      'hello',
      new SimpleExactMatch('hello', 'dolly')
    );
    expect(result).toBe(true);
  });

  test('type guard recognizes string - falsy', () => {
    const result = simpleTypeGuard<'hello' | 'dolly'>(
      'bye',
      new SimpleExactMatch('hello', 'dolly')
    );
    expect(result).toBe(false);
  });
});
