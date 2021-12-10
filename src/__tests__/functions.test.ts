import simpleTypeGuard, { SimpleFunction, SimpleSkip } from '..';

describe('function type tests', () => {
  test('function type guard recognizes string - truthy', () => {
    const result = simpleTypeGuard<{ hello: string }>(
      { hello: 'thing' },
      {
        hello: SimpleFunction(item => typeof item === 'string'),
      }
    );
    expect(result).toBe(true);
  });

  test('function type guard recognizes union type - truthy', () => {
    const result = simpleTypeGuard<{ hello: string | number }>(
      { hello: 'thing' },
      {
        hello: SimpleFunction(item => typeof item === 'string'),
      }
    );
    expect(result).toBe(true);
  });

  test('function type guard recognizes object type - truthy', () => {
    const result = simpleTypeGuard<{ hello: { test: 'string' } }>(
      { hello: {} },
      {
        hello: SimpleFunction(item => typeof item === 'object'),
      }
    );
    expect(result).toBe(true);
  });

  test('function type guard recognizes string - truthy', () => {
    const result = simpleTypeGuard<{ hello: string }>(
      { hello: 4 },
      {
        hello: SimpleFunction(item => typeof item === 'string'),
      }
    );
    expect(result).toBe(false);
  });

  test('function type guard recognizes union type - truthy', () => {
    const result = simpleTypeGuard<{ hello: string | number }>(
      { hello: {} },
      {
        hello: SimpleFunction(item => typeof item === 'string'),
      }
    );
    expect(result).toBe(false);
  });

  test('function type guard recognizes object type - truthy', () => {
    const result = simpleTypeGuard<{ hello: { test: 'string' } }>(
      { hello: 'test' },
      {
        hello: SimpleFunction(item => typeof item === 'object'),
      }
    );
    expect(result).toBe(false);
  });

  test('SimpleSkip ignores invalid type', () => {
    const result = simpleTypeGuard<{ hello: { test: 'string' } }>(
      { hello: 4 },
      {
        hello: SimpleSkip,
      }
    );
    expect(result).toBe(true);
  });
});
