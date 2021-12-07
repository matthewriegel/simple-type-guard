import unknownMatchesTemplate from '..';
import SimpleBoolean from '../SimpleBoolean';
import SimpleBooleanOptional from '../SimpleBooleanOptional';
import SimpleNumber from '../SimpleNumber';
import SimpleNumberOptional from '../SimpleNumberOptional';
import SimpleString from '../SimpleString';
import SimpleStringOptional from '../SimpleStringOptional';

describe('primitives type tests', () => {
  test('type guard recognizes string - truthy', () => {
    const result = unknownMatchesTemplate<string>('hello', SimpleString);
    expect(result).toBe(true);
  });

  test('type guard recognizes string - falsy', () => {
    const result = unknownMatchesTemplate<string>(true, SimpleString);
    expect(result).toBe(false);
  });

  test('type guard recognizes boolean - truthy', () => {
    const result = unknownMatchesTemplate<boolean>(true, SimpleBoolean);
    expect(result).toBe(true);
  });

  test('type guard recognizes boolean - falsy', () => {
    const result = unknownMatchesTemplate<boolean>('hello', SimpleBoolean);
    expect(result).toBe(false);
  });

  test('type guard recognizes number - truthy', () => {
    const result = unknownMatchesTemplate<number>(5, SimpleNumber);
    expect(result).toBe(true);
  });

  test('type guard recognizes strings - falsy', () => {
    const result = unknownMatchesTemplate<number>(true, SimpleNumber);
    expect(result).toBe(false);
  });

  test('type guard recognizes optional strings - truthy', () => {
    const result = unknownMatchesTemplate<string | undefined>(
      undefined,
      SimpleStringOptional
    );
    expect(result).toBe(true);
  });

  test('type guard recognizes optional boolean - truthy', () => {
    const result = unknownMatchesTemplate<boolean | undefined>(
      undefined,
      SimpleBooleanOptional
    );
    expect(result).toBe(true);
  });

  test('type guard recognizes optional number - truthy', () => {
    const result = unknownMatchesTemplate<number | undefined>(
      undefined,
      SimpleNumberOptional
    );
    expect(result).toBe(true);
  });

  test('type guard recognizes optional null strings - truthy', () => {
    const result = unknownMatchesTemplate<string | null>(
      null,
      SimpleStringOptional
    );
    expect(result).toBe(true);
  });

  test('type guard recognizes optional null boolean - truthy', () => {
    const result = unknownMatchesTemplate<boolean | null>(
      null,
      SimpleBooleanOptional
    );
    expect(result).toBe(true);
  });

  test('type guard recognizes optional null number - truthy', () => {
    const result = unknownMatchesTemplate<number | null>(
      null,
      SimpleNumberOptional
    );
    expect(result).toBe(true);
  });
});
