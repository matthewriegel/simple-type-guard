import unknownMatchesTemplate from '..';

describe('array type tests', () => {
  test('array type guard recognizes string - truthy', () => {
    const result = unknownMatchesTemplate<string[]>(['hello'], ['string']);
    expect(result).toBe(true);
  });

  test('array type guard recognizes string - falsy', () => {
    const result = unknownMatchesTemplate<string[]>([3], ['string']);
    expect(result).toBe(false);
  });

  test('array type guard recognizes nested array string - truthy', () => {
    const result = unknownMatchesTemplate<Array<string[]>>(
      [['hello']],
      [['string']]
    );
    expect(result).toBe(true);
  });

  test('array type guard recognizes nested array string - falsy', () => {
    const result = unknownMatchesTemplate<Array<string[]>>([[3]], [['string']]);
    expect(result).toBe(false);
  });

  test('array type guard recognizes object - truthy', () => {
    const result = unknownMatchesTemplate<Array<{ key: number }>>(
      [{ key: 123 }, { key: 123984 }],
      [{ key: 'number' }]
    );
    expect(result).toBe(true);
  });

  test('array type guard recognizes object - falsy', () => {
    const result = unknownMatchesTemplate<Array<{ key: number }>>(
      [{ key: 123 }, { key: 'invalid' }],
      [{ key: 'number' }]
    );
    expect(result).toBe(false);
  });
});
