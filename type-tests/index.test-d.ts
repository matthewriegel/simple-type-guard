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
expectError(unknownMatchesTemplate<string | undefined>(variable, 'string'));
expectError(unknownMatchesTemplate<number | undefined>(variable, 'number'));
expectError(unknownMatchesTemplate<boolean | undefined>(variable, 'boolean'));
expectError(unknownMatchesTemplate<string | null>(variable, 'string'));
expectError(unknownMatchesTemplate<number | null>(variable, 'number'));
expectError(unknownMatchesTemplate<boolean | null>(variable, 'boolean'));
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
expectType<string | null | undefined>(
  unknownMatchesTemplate<string | undefined>(variable, 'string?')
    ? variable
    : null
);
expectType<boolean | null | undefined>(
  unknownMatchesTemplate<boolean | undefined>(variable, 'boolean?')
    ? variable
    : null
);
expectType<number | null | undefined>(
  unknownMatchesTemplate<number | undefined>(variable, 'number?')
    ? variable
    : null
);
expectType<string | null>(
  unknownMatchesTemplate<string | null>(variable, 'string?') ? variable : null
);
expectType<boolean | null>(
  unknownMatchesTemplate<boolean | null>(variable, 'boolean?') ? variable : null
);
expectType<number | null>(
  unknownMatchesTemplate<number | null>(variable, 'number?') ? variable : null
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
expectError(
  unknownMatchesTemplate<
    | {
        hello: {
          world: number;
        };
      }
    | undefined
  >(variable, {
    hello: 'string',
  })
    ? variable
    : null
);
// Should throw error if an optional property is missing from the template
expectError(
  unknownMatchesTemplate<
    | {
        hello?: string;
      }
    | undefined
  >(variable, {})
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
expectType<
  | {
      hello: {
        world: number;
      };
    }
  | null
  | undefined
>(
  unknownMatchesTemplate<
    | {
        hello: {
          world: number;
        };
      }
    | undefined
  >(variable, {
    $optional: true,
    hello: {
      world: 'number',
    },
  })
    ? variable
    : null
);
expectType<{
  hello?: string;
} | null>(
  unknownMatchesTemplate<{
    hello?: string;
  }>(variable, {
    hello: 'string?',
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
expectError(
  unknownMatchesTemplate<[{ key: string }] | undefined>(variable, [
    { key: 'string' },
  ])
    ? variable
    : null
);
expectError(
  unknownMatchesTemplate<[{ key: string }] | null>(variable, [
    { key: 'string' },
  ])
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
// Optional: Undefined
expectType<[{ key: string }] | null | undefined>(
  unknownMatchesTemplate<[{ key: string }] | undefined>(variable, [
    { key: 'string' },
    'optional',
  ])
    ? variable
    : null
);
// Optional: Null
expectType<[{ key: string }] | null>(
  unknownMatchesTemplate<[{ key: string }] | null>(variable, [
    { key: 'string' },
    'optional',
  ])
    ? variable
    : null
);
