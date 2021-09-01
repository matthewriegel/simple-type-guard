import unknownMatchesTemplate from '..';

interface ObjectType<T> {
  test: T;
}

describe('objects type tests', () => {
  test('type guard recognizes object with string key/value - truthy', () => {
    const result = unknownMatchesTemplate<ObjectType<string>>(
      { test: 'hello' },
      {
        test: 'string',
      }
    );
    expect(result).toBe(true);
  });

  test('type guard recognizes object with string key/value - falsy', () => {
    const result = unknownMatchesTemplate<ObjectType<string>>(
      { test: true },
      {
        test: 'string',
      }
    );
    expect(result).toBe(false);
  });

  test('type guard recognizes object with number key/value - truthy', () => {
    const result = unknownMatchesTemplate<ObjectType<number>>(
      { test: 4 },
      {
        test: 'number',
      }
    );
    expect(result).toBe(true);
  });

  test('type guard recognizes object with string key/value - falsy', () => {
    const result = unknownMatchesTemplate<ObjectType<number>>(
      { test: true },
      {
        test: 'number',
      }
    );
    expect(result).toBe(false);
  });

  test('type guard recognizes object with numbooleanber key/value - truthy', () => {
    const result = unknownMatchesTemplate<ObjectType<boolean>>(
      { test: true },
      {
        test: 'boolean',
      }
    );
    expect(result).toBe(true);
  });

  test('type guard recognizes object with boolean key/value - falsy', () => {
    const result = unknownMatchesTemplate<ObjectType<boolean>>(
      { test: 'true' },
      {
        test: 'boolean',
      }
    );
    expect(result).toBe(false);
  });

  test('type guard throws error on object with boolean key/value - falsy', () => {
    expect(() =>
      unknownMatchesTemplate<ObjectType<boolean>>(
        { test: 'true' },
        {
          test: 'boolean',
        },
        { throwErrorOnFailure: true }
      )
    ).toThrow();
  });

  test('type guard recognizes optional object - truthy', () => {
    const result = unknownMatchesTemplate<ObjectType<boolean> | undefined>(
      undefined,
      {
        $optional: true,
        test: 'boolean',
      }
    );
    expect(result).toBe(true);
  });
});
