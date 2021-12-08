import unknownMatchesTemplate from '..';
import { SimpleArrayFunction } from '../SimpleArray';
import { SimpleArrayOptionalFunction } from '../SimpleArrayOptional';
import SimpleNumber from '../SimpleNumber';
import SimpleString from '../SimpleString';

describe('array type tests', () => {
  test('array type guard recognizes string - truthy', () => {
    const result = unknownMatchesTemplate<string[]>(
      ['hello'],
      SimpleArrayFunction<string>(SimpleString)
    );
    expect(result).toBe(true);
  });

  test('array type guard recognizes string - falsy', () => {
    const result = unknownMatchesTemplate<string[]>(
      [3],
      SimpleArrayFunction<string>(SimpleString)
    );
    expect(result).toBe(false);
  });

  test('array type guard recognizes nested array string - truthy', () => {
    const result = unknownMatchesTemplate<string[][]>(
      [['hello']],
      SimpleArrayFunction<string[]>(SimpleArrayFunction<string>(SimpleString))
    );
    expect(result).toBe(true);
  });

  test('array type guard recognizes nested array string - falsy', () => {
    const result = unknownMatchesTemplate<string[][]>(
      [[3]],
      SimpleArrayFunction<string[]>(SimpleArrayFunction<string>(SimpleString))
    );
    expect(result).toBe(false);
  });

  test('array type guard recognizes object - truthy', () => {
    const result = unknownMatchesTemplate<{ key: number }[]>(
      [{ key: 123 }, { key: 123984 }],
      SimpleArrayFunction<{ key: number }>({ key: SimpleNumber })
    );
    expect(result).toBe(true);
  });

  test('array type guard recognizes object - falsy', () => {
    const result = unknownMatchesTemplate<{ key: number }[]>(
      [{ key: 123 }, { key: 'invalid' }],
      SimpleArrayFunction<{ key: number }>({ key: SimpleNumber })
    );
    expect(result).toBe(false);
  });

  test('array type guard recognizes optional - truthy', () => {
    const result = unknownMatchesTemplate<{ key: number }[] | undefined>(
      undefined,
      SimpleArrayOptionalFunction<{ key: number }>({ key: SimpleNumber })
    );
    expect(result).toBe(true);
  });

  test('array type guard recognizes null optional - truthy', () => {
    const result = unknownMatchesTemplate<{ key: number }[] | null>(
      null,
      SimpleArrayOptionalFunction<{ key: number }>({ key: SimpleNumber })
    );
    expect(result).toBe(true);
  });
});
