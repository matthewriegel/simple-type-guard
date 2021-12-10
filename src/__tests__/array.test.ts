import simpleTypeGuard, {
  SimpleArray,
  SimpleArrayOptional,
  SimpleNumber,
  SimpleString,
} from '..';

describe('array type tests', () => {
  test('array type guard recognizes string - truthy', () => {
    const result = simpleTypeGuard<string[]>(
      ['hello'],
      SimpleArray<string>(SimpleString)
    );
    expect(result).toBe(true);
  });

  test('array type guard recognizes string - falsy', () => {
    const result = simpleTypeGuard<string[]>(
      [3],
      SimpleArray<string>(SimpleString)
    );
    expect(result).toBe(false);
  });

  test('array type guard recognizes nested array string - truthy', () => {
    const result = simpleTypeGuard<string[][]>(
      [['hello']],
      SimpleArray<string[]>(SimpleArray<string>(SimpleString))
    );
    expect(result).toBe(true);
  });

  test('array type guard recognizes nested array string - falsy', () => {
    const result = simpleTypeGuard<string[][]>(
      [[3]],
      SimpleArray<string[]>(SimpleArray<string>(SimpleString))
    );
    expect(result).toBe(false);
  });

  test('array type guard recognizes object - truthy', () => {
    const result = simpleTypeGuard<{ key: number }[]>(
      [{ key: 123 }, { key: 123984 }],
      SimpleArray<{ key: number }>({ key: SimpleNumber })
    );
    expect(result).toBe(true);
  });

  test('array type guard recognizes object - falsy', () => {
    const result = simpleTypeGuard<{ key: number }[]>(
      [{ key: 123 }, { key: 'invalid' }],
      SimpleArray<{ key: number }>({ key: SimpleNumber })
    );
    expect(result).toBe(false);
  });

  test('array type guard recognizes optional - truthy', () => {
    const result = simpleTypeGuard<{ key: number }[] | undefined>(
      undefined,
      SimpleArrayOptional<{ key: number }>({ key: SimpleNumber })
    );
    expect(result).toBe(true);
  });

  test('array type guard recognizes null optional - truthy', () => {
    const result = simpleTypeGuard<{ key: number }[] | null>(
      null,
      SimpleArrayOptional<{ key: number }>({ key: SimpleNumber })
    );
    expect(result).toBe(true);
  });
});
