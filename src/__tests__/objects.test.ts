import unknownMatchesTemplate from '..';
import SimpleBoolean from '../SimpleBoolean';
import SimpleNumber from '../SimpleNumber';
import { SimpleObjectOptionalFunction } from '../SimpleObjectOptional';
import SimpleString from '../SimpleString';
import SimpleStringOptional from '../SimpleStringOptional';

interface ObjectType<T> {
  test: T;
}

describe('objects type tests', () => {
  test('type guard recognizes object with string key/value - truthy', () => {
    const result = unknownMatchesTemplate<ObjectType<string>>(
      { test: 'hello' },
      {
        test: SimpleString,
      }
    );
    expect(result).toBe(true);
  });

  test('type guard recognizes object with string key/value - falsy', () => {
    const result = unknownMatchesTemplate<ObjectType<string>>(
      { test: true },
      {
        test: SimpleString,
      }
    );
    expect(result).toBe(false);
  });

  test('type guard recognizes object with number key/value - truthy', () => {
    const result = unknownMatchesTemplate<ObjectType<number>>(
      { test: 4 },
      {
        test: SimpleNumber,
      }
    );
    expect(result).toBe(true);
  });

  test('type guard recognizes object with string key/value - falsy', () => {
    const result = unknownMatchesTemplate<ObjectType<number>>(
      { test: true },
      {
        test: SimpleNumber,
      }
    );
    expect(result).toBe(false);
  });

  test('type guard recognizes object with numbooleanber key/value - truthy', () => {
    const result = unknownMatchesTemplate<ObjectType<boolean>>(
      { test: true },
      {
        test: SimpleBoolean,
      }
    );
    expect(result).toBe(true);
  });

  test('type guard recognizes object with boolean key/value - falsy', () => {
    const result = unknownMatchesTemplate<ObjectType<boolean>>(
      { test: 'true' },
      {
        test: SimpleBoolean,
      }
    );
    expect(result).toBe(false);
  });

  test('type guard throws error on object with boolean key/value - falsy', () => {
    expect(() =>
      unknownMatchesTemplate<ObjectType<boolean>>(
        { test: 'true' },
        {
          test: SimpleBoolean,
        },
        { throwErrorOnFailure: true }
      )
    ).toThrow();
  });

  test('type guard recognizes optional object - truthy', () => {
    const result = unknownMatchesTemplate<ObjectType<boolean> | undefined>(
      undefined,
      SimpleObjectOptionalFunction<ObjectType<boolean>>({
        test: SimpleBoolean,
      })
    );
    expect(result).toBe(true);
  });

  test('type guard recognizes optional null object - truthy', () => {
    const result = unknownMatchesTemplate<ObjectType<boolean> | null>(
      null,
      SimpleObjectOptionalFunction<ObjectType<boolean>>({
        test: SimpleBoolean,
      })
    );
    expect(result).toBe(true);
  });

  test('type guard recognizes optional filled object - truthy', () => {
    const result = unknownMatchesTemplate<ObjectType<boolean> | null>(
      { test: true },
      SimpleObjectOptionalFunction<ObjectType<boolean>>({
        test: SimpleBoolean,
      })
    );
    expect(result).toBe(true);
  });

  test('type guard recognizes optional property in object - truthy', () => {
    const result = unknownMatchesTemplate<{ test?: string }>(
      {},
      {
        test: SimpleStringOptional,
      }
    );
    expect(result).toBe(true);
  });

  test('type guard recognizes Error object as invalid', () => {
    const result = unknownMatchesTemplate<Error>(undefined, {
      message: SimpleString,
      name: SimpleString,
      stack: SimpleStringOptional,
    });

    expect(result).toBe(false);
  });

  test('type guard recognizes Error object as valid', () => {
    const result = unknownMatchesTemplate<Error>(new Error('test'), {
      message: SimpleString,
      name: SimpleString,
      stack: SimpleStringOptional,
    });

    expect(result).toBe(true);
  });
});
