import unknownMatchesTemplate from '..';
import { SimpleFunctionFunction } from '../SimpleFunction';

describe('function type tests', () => {
  test('function type guard recognizes string - truthy', () => {
    const result = unknownMatchesTemplate<{ hello: string }>(
      { hello: 'thing' },
      {
        hello: SimpleFunctionFunction(item => typeof item === 'string'),
      }
    );
    expect(result).toBe(true);
  });

  test('function type guard recognizes union type - truthy', () => {
    const result = unknownMatchesTemplate<{ hello: string | number }>(
      { hello: 'thing' },
      {
        hello: SimpleFunctionFunction(item => typeof item === 'string'),
      }
    );
    expect(result).toBe(true);
  });

  test('function type guard recognizes object type - truthy', () => {
    const result = unknownMatchesTemplate<{ hello: { test: 'string' } }>(
      { hello: {} },
      {
        hello: SimpleFunctionFunction(item => typeof item === 'object'),
      }
    );
    expect(result).toBe(true);
  });

  test('function type guard recognizes string - truthy', () => {
    const result = unknownMatchesTemplate<{ hello: string }>(
      { hello: 4 },
      {
        hello: SimpleFunctionFunction(item => typeof item === 'string'),
      }
    );
    expect(result).toBe(false);
  });

  test('function type guard recognizes union type - truthy', () => {
    const result = unknownMatchesTemplate<{ hello: string | number }>(
      { hello: {} },
      {
        hello: SimpleFunctionFunction(item => typeof item === 'string'),
      }
    );
    expect(result).toBe(false);
  });

  test('function type guard recognizes object type - truthy', () => {
    const result = unknownMatchesTemplate<{ hello: { test: 'string' } }>(
      { hello: 'test' },
      {
        hello: SimpleFunctionFunction(item => typeof item === 'object'),
      }
    );
    expect(result).toBe(false);
  });
});
