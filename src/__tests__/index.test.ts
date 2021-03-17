import unknownMatchesTemplate from '../';

describe('simple temporary test', () => {
  test('temp', () => {
    const result = unknownMatchesTemplate('hello', 'string');
    expect(result).toBe(true);
  });

  test('temp', () => {
    const result = unknownMatchesTemplate('hello', 'sring');
    expect(result).toBe(false);
  });
});
