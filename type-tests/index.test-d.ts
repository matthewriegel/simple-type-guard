import { expectError, expectType } from 'tsd';
import unknownMatchesTemplate from '../src';

const variable: unknown = '';

/**
 * Primitive Types
 */
// Error
expectError(unknownMatchesTemplate<number>(variable, 'string'));
expectError(unknownMatchesTemplate<number>(variable, 'boolean'));
expectError(unknownMatchesTemplate<number>(variable, 'undefined'));
expectError(unknownMatchesTemplate<string>(variable, 'number'));
expectError(unknownMatchesTemplate<string>(variable, 'boolean'));
expectError(unknownMatchesTemplate<string>(variable, 'undefined'));
expectError(unknownMatchesTemplate<boolean>(variable, 'string'));
expectError(unknownMatchesTemplate<boolean>(variable, 'number'));
expectError(unknownMatchesTemplate<boolean>(variable, 'undefined'));
expectError(unknownMatchesTemplate<undefined>(variable, 'string'));
expectError(unknownMatchesTemplate<undefined>(variable, 'number'));
expectError(unknownMatchesTemplate<undefined>(variable, 'boolean'));

// Success
expectType<string | null>(
  unknownMatchesTemplate<string>(variable, 'string') ? variable : null
);
expectType<boolean | null>(
  unknownMatchesTemplate<boolean>(variable, 'boolean') ? variable : null
);
expectType<number | null>(
  unknownMatchesTemplate<number>(variable, 'number') ? variable : null
);

/**
 * Shallow Objects
 */
// Error
expectError(
  unknownMatchesTemplate<{ hello: string }>(variable, { hello: 'number' })
    ? variable
    : null
);
expectError(
  unknownMatchesTemplate<{ hello: string }>(variable, 'string')
    ? variable
    : null
);
expectError(
  unknownMatchesTemplate<{ hello: string }>(variable, {}) ? variable : null
);
expectError(
  unknownMatchesTemplate<{ hello: string }>(variable, {
    hello: 'string',
    error: 'undefined',
  })
    ? variable
    : null
);

// Success
expectType<{ hello: string } | null>(
  unknownMatchesTemplate<{ hello: string }>(variable, { hello: 'string' })
    ? variable
    : null
);

/**
 * Deep Objects
 */
// Error
expectError(
  unknownMatchesTemplate<{
    hello: {
      world: number;
    };
  }>(variable, {
    hello: {
      world: 'string',
    },
  })
    ? variable
    : null
);
expectError(
  unknownMatchesTemplate<{
    hello: {
      world: number;
    };
  }>(variable, {
    hello: {
      world: 'number',
      fail: 'string',
    },
  })
    ? variable
    : null
);
expectError(
  unknownMatchesTemplate<{
    hello: {
      world: number;
    };
  }>(variable, {
    hello: {},
  })
    ? variable
    : null
);
expectError(
  unknownMatchesTemplate<{
    hello: {
      world: number;
    };
  }>(variable, {
    hello: 'string',
  })
    ? variable
    : null
);

// Success
expectType<{
  hello: {
    world: number;
  };
} | null>(
  unknownMatchesTemplate<{
    hello: {
      world: number;
    };
  }>(variable, {
    hello: {
      world: 'number',
    },
  })
    ? variable
    : null
);

/**
 * Arrays
 */
// Error
expectError(
  unknownMatchesTemplate<string[]>(variable, ['number']) ? variable : null
);
expectError(
  unknownMatchesTemplate<[string[]]>(variable, ['string']) ? variable : null
);
expectError(
  unknownMatchesTemplate<{ key: string }[]>(variable, [{ key: 'number' }])
    ? variable
    : null
);
// TODO: see if empty arrays can trigger errors
// expectError(unknownMatchesTemplate<string[]>(variable, []) ? variable : null);

// Success
expectType<[[{ key: string }]] | null>(
  unknownMatchesTemplate<[[{ key: string }]]>(variable, [[{ key: 'string' }]])
    ? variable
    : null
);
