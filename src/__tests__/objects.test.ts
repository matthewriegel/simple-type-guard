import unknownMatchesTemplate from '..';

describe('simple temporary test', () => {
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
});
