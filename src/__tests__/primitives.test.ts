import unknownMatchesTemplate from '..';

describe('primitives type tests', () => {
  test('type guard recognizes string - truthy', () => {
    const result = unknownMatchesTemplate<string>('hello', 'string');
    expect(result).toBe(true);
  });

  test('type guard recognizes string - falsy', () => {
    const result = unknownMatchesTemplate<string>(true, 'string');
    expect(result).toBe(false);
  });

  test('type guard recognizes boolean - truthy', () => {
    const result = unknownMatchesTemplate<boolean>(true, 'boolean');
    expect(result).toBe(true);
  });

  test('type guard recognizes boolean - falsy', () => {
    const result = unknownMatchesTemplate<boolean>('hello', 'boolean');
    expect(result).toBe(false);
  });

  test('type guard recognizes number - truthy', () => {
    const result = unknownMatchesTemplate<number>(5, 'number');
    expect(result).toBe(true);
  });

  test('type guard recognizes strings - falsy', () => {
    const result = unknownMatchesTemplate<number>(true, 'number');
    expect(result).toBe(false);
  });

  test('type guard recognizes optional strings - truthy', () => {
    const result = unknownMatchesTemplate<string | undefined>(
      undefined,
      'string?'
    );
    expect(result).toBe(true);
  });

  test('type guard recognizes optional boolean - truthy', () => {
    const result = unknownMatchesTemplate<boolean | undefined>(
      undefined,
      'boolean?'
    );
    expect(result).toBe(true);
  });

  test('type guard recognizes optional number - truthy', () => {
    const result = unknownMatchesTemplate<number | undefined>(
      undefined,
      'number?'
    );
    expect(result).toBe(true);
  });

  test('type guard recognizes optional null strings - truthy', () => {
    const result = unknownMatchesTemplate<string | null>(null, 'string?');
    expect(result).toBe(true);
  });

  test('type guard recognizes optional null boolean - truthy', () => {
    const result = unknownMatchesTemplate<boolean | null>(null, 'boolean?');
    expect(result).toBe(true);
  });

  test('type guard recognizes optional null number - truthy', () => {
    const result = unknownMatchesTemplate<number | null>(null, 'number?');
    expect(result).toBe(true);
  });
});
