import { expectError, expectType } from 'tsd';
import unknownMatchesTemplate, {
  SimpleExactMatch,
  SimpleOr,
  SimpleSymbol,
} from '../src';
import { SimpleArrayFunction } from '../src/SimpleArray';
import { SimpleArrayOptionalFunction } from '../src/SimpleArrayOptional';
import SimpleBoolean from '../src/SimpleBoolean';
import SimpleBooleanOptional from '../src/SimpleBooleanOptional';
import SimpleNumber from '../src/SimpleNumber';
import SimpleNumberOptional from '../src/SimpleNumberOptional';
import { SimpleObjectOptionalFunction } from '../src/SimpleObjectOptional';
import SimpleSkip from '../src/SimpleSkip';
import SimpleString from '../src/SimpleString';
import SimpleStringOptional from '../src/SimpleStringOptional';
import SimpleUndefined from '../src/SimpleUndefined';

const variable: unknown = '';

/**
 * Primitive Types
 */
// Error
expectError(unknownMatchesTemplate<number>(variable, SimpleString));
expectError(unknownMatchesTemplate<number>(variable, SimpleBoolean));
expectError(unknownMatchesTemplate<number>(variable, SimpleUndefined));
expectError(unknownMatchesTemplate<string>(variable, SimpleNumber));
expectError(unknownMatchesTemplate<string>(variable, SimpleBoolean));
expectError(unknownMatchesTemplate<string>(variable, SimpleUndefined));
expectError(unknownMatchesTemplate<boolean>(variable, SimpleString));
expectError(unknownMatchesTemplate<boolean>(variable, SimpleNumber));
expectError(unknownMatchesTemplate<boolean>(variable, SimpleUndefined));
expectError(unknownMatchesTemplate<undefined>(variable, SimpleString));
expectError(unknownMatchesTemplate<undefined>(variable, SimpleNumber));
expectError(unknownMatchesTemplate<undefined>(variable, SimpleBoolean));
expectError(unknownMatchesTemplate<string | undefined>(variable, SimpleString));
expectError(unknownMatchesTemplate<number | undefined>(variable, SimpleNumber));
expectError(
  unknownMatchesTemplate<boolean | undefined>(variable, SimpleBoolean)
);
expectError(unknownMatchesTemplate<string | null>(variable, SimpleString));
expectError(unknownMatchesTemplate<number | null>(variable, SimpleNumber));
expectError(unknownMatchesTemplate<boolean | null>(variable, SimpleBoolean));
// Success
expectType<string | null>(
  unknownMatchesTemplate<string>(variable, SimpleString) ? variable : null
);
expectType<boolean | null>(
  unknownMatchesTemplate<boolean>(variable, SimpleBoolean) ? variable : null
);
expectType<number | null>(
  unknownMatchesTemplate<number>(variable, SimpleNumber) ? variable : null
);
expectType<string | null | undefined>(
  unknownMatchesTemplate<string | undefined>(variable, SimpleStringOptional)
    ? variable
    : null
);
expectType<boolean | null | undefined>(
  unknownMatchesTemplate<boolean | undefined>(variable, SimpleBooleanOptional)
    ? variable
    : null
);
expectType<number | null | undefined>(
  unknownMatchesTemplate<number | undefined>(variable, SimpleNumberOptional)
    ? variable
    : null
);
expectType<string | null>(
  unknownMatchesTemplate<string | null>(variable, SimpleStringOptional)
    ? variable
    : null
);
expectType<boolean | null>(
  unknownMatchesTemplate<boolean | null>(variable, SimpleBooleanOptional)
    ? variable
    : null
);
expectType<number | null>(
  unknownMatchesTemplate<number | null>(variable, SimpleNumberOptional)
    ? variable
    : null
);
/**
 * Shallow Objects
 */
// Error
expectError(
  unknownMatchesTemplate<{ hello: string }>(variable, { hello: SimpleNumber })
    ? variable
    : null
);
expectError(
  unknownMatchesTemplate<{ hello: string }>(variable, SimpleString)
    ? variable
    : null
);
expectError(
  unknownMatchesTemplate<{ hello: string }>(variable, {}) ? variable : null
);
expectError(
  unknownMatchesTemplate<{ hello: string }>(variable, {
    hello: SimpleString,
    error: SimpleUndefined,
  })
    ? variable
    : null
);

// Success
expectType<{ hello: string } | null>(
  unknownMatchesTemplate<{ hello: string }>(variable, { hello: SimpleString })
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
      world: SimpleString,
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
      world: SimpleNumber,
      fail: SimpleString,
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
    hello: SimpleString,
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
    hello: SimpleString,
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
      world: SimpleNumber,
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
  >(
    variable,
    SimpleObjectOptionalFunction<{
      hello: {
        world: number;
      };
    }>({
      hello: {
        world: SimpleNumber,
      },
    })
  )
    ? variable
    : null
);
expectType<{
  hello?: string;
} | null>(
  unknownMatchesTemplate<{
    hello?: string;
  }>(variable, {
    hello: SimpleStringOptional,
  })
    ? variable
    : null
);

/**
 * Arrays
 */
// Error
expectError(
  unknownMatchesTemplate<string[]>(variable, SimpleArrayFunction(SimpleNumber))
    ? variable
    : null
);
expectError(
  unknownMatchesTemplate<[string[]]>(
    variable,
    SimpleArrayFunction(SimpleString)
  )
    ? variable
    : null
);
expectError(
  unknownMatchesTemplate<{ key: string }[]>(
    variable,
    SimpleArrayFunction({ key: SimpleNumber })
  )
    ? variable
    : null
);

expectError(
  unknownMatchesTemplate<[{ key: string }] | undefined>(
    variable,
    SimpleArrayFunction({ key: SimpleString })
  )
    ? variable
    : null
);
expectError(
  unknownMatchesTemplate<{ key: string }[] | null>(
    variable,
    SimpleArrayFunction({ key: SimpleString })
  )
    ? variable
    : null
);

// Deep nested array error
expectError(
  unknownMatchesTemplate<[{ key: { key: string[] | undefined }[] }]>(
    variable,
    SimpleArrayFunction({
      key: SimpleArrayFunction({ key: SimpleArrayFunction(SimpleString) }),
    })
  )
    ? variable
    : null
);
// TODO: see if empty arrays can trigger errors
// expectError(unknownMatchesTemplate<string[]>(variable, []) ? variable : null);

// Success
expectType<[[{ key: string }]] | null>(
  unknownMatchesTemplate<[[{ key: string }]]>(
    variable,
    SimpleArrayFunction(SimpleArrayFunction({ key: SimpleString }))
  )
    ? variable
    : null
);
// Optional: Undefined
expectType<[{ key: string }] | null | undefined>(
  unknownMatchesTemplate<[{ key: string }] | undefined>(
    variable,
    SimpleArrayOptionalFunction<{ key: string }>({ key: SimpleString })
  )
    ? variable
    : null
);
// Optional: Null
expectType<[{ key: string }] | null>(
  unknownMatchesTemplate<[{ key: string }] | null>(
    variable,
    SimpleArrayOptionalFunction<{ key: string }>({ key: SimpleString })
  )
    ? variable
    : null
);

/**
 * SimpleSkip
 */
expectError(
  unknownMatchesTemplate<{ key: { foo: string } }>(variable, {
    key: new SimpleSkip({}),
  })
    ? variable
    : null
);
expectType<{ key: { foo: string } } | null>(
  unknownMatchesTemplate<{ key: { foo: string } }>(variable, {
    key: SimpleSkip,
  })
    ? variable
    : null
);

/**
 * SimpleOr
 */
// FAILURE
expectError(
  unknownMatchesTemplate<{ key: string | number }>(variable, {
    key: SimpleOr(SimpleString, SimpleNumber, SimpleSymbol),
  })
    ? variable
    : null
);

// Duplicate parameters
// expectError(
//   unknownMatchesTemplate<{ key: string | number }>(variable, {
//     key: SimpleOr(SimpleString, SimpleNumber, SimpleNumber),
//   })
//     ? variable
//     : null
// );

// SUCCESS
// Two type
expectType<{ key: string | number } | null>(
  unknownMatchesTemplate<{ key: string | number }>(variable, {
    key: SimpleOr(SimpleString, SimpleNumber),
  })
    ? variable
    : null
);

expectType<{ key: string | number | boolean } | null>(
  unknownMatchesTemplate<{ key: string | number | boolean }>(variable, {
    key: SimpleOr(SimpleString, SimpleBoolean, SimpleNumber),
  })
    ? variable
    : null
);

/**
 * SimpleExactMatch
 */
expectType<{ key: 'hello' | 'dolly' } | null>(
  unknownMatchesTemplate<{ key: 'hello' | 'dolly' }>(variable, {
    key: SimpleExactMatch('hello', 'dolly'),
  })
    ? variable
    : null
);

/**
 * Common Error Types
 */
expectError(
  unknownMatchesTemplate<{ key: { foo: string[] } }>(variable, {
    key: {
      foo: [],
    },
  })
    ? variable
    : null
);

// TODO using an optional in place of a non-optional
