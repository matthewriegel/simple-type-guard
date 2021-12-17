import simpleTypeGuard, { SimpleFunction, SimpleSkip } from '..';

describe('function type tests', () => {
  test('function type guard recognizes string - truthy', () => {
    const result = simpleTypeGuard<{ hello: string }>(
      { hello: 'thing' },
      {
        hello: new SimpleFunction(item => typeof item === 'string'),
      }
    );
    expect(result).toBe(true);
  });

  test('function type guard recognizes union type - truthy', () => {
    const result = simpleTypeGuard<{ hello: string | number }>(
      { hello: 'thing' },
      {
        hello: new SimpleFunction(item => typeof item === 'string'),
      }
    );
    expect(result).toBe(true);
  });

  test('function type guard recognizes object type - truthy', () => {
    const result = simpleTypeGuard<{ hello: { test: 'string' } }>(
      { hello: {} },
      {
        hello: new SimpleFunction(item => typeof item === 'object'),
      }
    );
    expect(result).toBe(true);
  });

  test('function type guard recognizes string - truthy', () => {
    const result = simpleTypeGuard<{ hello: string }>(
      { hello: 4 },
      {
        hello: new SimpleFunction(item => typeof item === 'string'),
      }
    );
    expect(result).toBe(false);
  });

  test('function type guard recognizes union type - truthy', () => {
    const result = simpleTypeGuard<{ hello: string | number }>(
      { hello: {} },
      {
        hello: new SimpleFunction(item => typeof item === 'string'),
      }
    );
    expect(result).toBe(false);
  });

  test('function type guard recognizes object type - truthy', () => {
    const result = simpleTypeGuard<{ hello: { test: 'string' } }>(
      { hello: 'test' },
      {
        hello: new SimpleFunction(item => typeof item === 'object'),
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
