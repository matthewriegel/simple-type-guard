import simpleTypeGuard, {
  SimpleBoolean,
  SimpleBooleanOptional,
  SimpleNumber,
  SimpleNumberOptional,
  SimpleString,
  SimpleStringOptional,
} from '..';

describe('primitives type tests', () => {
  test('type guard recognizes string - truthy', () => {
    const result = simpleTypeGuard<string>('hello', SimpleString);
    expect(result).toBe(true);
  });

  test('type guard recognizes string - falsy', () => {
    const result = simpleTypeGuard<string>(true, SimpleString);
    expect(result).toBe(false);
  });

  test('type guard recognizes boolean - truthy', () => {
    const result = simpleTypeGuard<boolean>(true, SimpleBoolean);
    expect(result).toBe(true);
  });

  test('type guard recognizes boolean - falsy', () => {
    const result = simpleTypeGuard<boolean>('hello', SimpleBoolean);
    expect(result).toBe(false);
  });

  test('type guard recognizes number - truthy', () => {
    const result = simpleTypeGuard<number>(5, SimpleNumber);
    expect(result).toBe(true);
  });

  test('type guard recognizes strings - falsy', () => {
    const result = simpleTypeGuard<number>(true, SimpleNumber);
    expect(result).toBe(false);
  });

  test('type guard recognizes optional strings - truthy', () => {
    const result = simpleTypeGuard<string | undefined>(
      undefined,
      SimpleStringOptional
    );
    expect(result).toBe(true);
  });

  test('type guard recognizes optional boolean - truthy', () => {
    const result = simpleTypeGuard<boolean | undefined>(
      undefined,
      SimpleBooleanOptional
    );
    expect(result).toBe(true);
  });

  test('type guard recognizes optional number - truthy', () => {
    const result = simpleTypeGuard<number | undefined>(
      undefined,
      SimpleNumberOptional
    );
    expect(result).toBe(true);
  });

  test('type guard recognizes optional null strings - truthy', () => {
    const result = simpleTypeGuard<string | null>(null, SimpleStringOptional);
    expect(result).toBe(true);
  });

  test('type guard recognizes optional null boolean - truthy', () => {
    const result = simpleTypeGuard<boolean | null>(null, SimpleBooleanOptional);
    expect(result).toBe(true);
  });

  test('type guard recognizes optional null number - truthy', () => {
    const result = simpleTypeGuard<number | null>(null, SimpleNumberOptional);
    expect(result).toBe(true);
  });
});
