import simpleTypeGuard, {
  SimpleExactMatch,
  SimpleNumber,
  SimpleOr,
  SimpleString,
} from '..';

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

  test('type guard recognizes OR - truthy', () => {
    const result = simpleTypeGuard<string | number>(
      3,
      new SimpleOr(SimpleString, SimpleNumber)
    );
    expect(result).toBe(true);
  });

  test('type guard recognizes OR - falsy', () => {
    const result = simpleTypeGuard<string | number>(
      false,
      new SimpleOr(SimpleString, SimpleNumber)
    );
    expect(result).toBe(false);
  });
});
