import simpleTypeGuard from '../';

describe('simple temporary test', () => {
  test('temp', () => {
    const result = simpleTypeGuard('hello', 'string');
    expect(result).toBe(true);
  });
});
