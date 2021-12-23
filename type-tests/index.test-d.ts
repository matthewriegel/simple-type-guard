import { expectError, expectType } from 'tsd';
import unknownMatchesTemplate, {
  SimpleArray,
  SimpleArrayOptional,
  SimpleBoolean,
  SimpleBooleanOptional,
  SimpleExactMatch,
  SimpleNumber,
  SimpleNumberOptional,
  SimpleObjectOptional,
  SimpleOr,
  SimpleSkip,
  SimpleString,
  SimpleStringOptional,
  SimpleSymbol,
  SimpleUndefined,
} from '../src';

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
    new SimpleObjectOptional<{
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
  unknownMatchesTemplate<string[]>(variable, new SimpleArray(SimpleNumber))
    ? variable
    : null
);
expectError(
  unknownMatchesTemplate<[string[]]>(variable, new SimpleArray(SimpleString))
    ? variable
    : null
);
expectError(
  unknownMatchesTemplate<{ key: string }[]>(
    variable,
    new SimpleArray({ key: SimpleNumber })
  )
    ? variable
    : null
);

expectError(
  unknownMatchesTemplate<[{ key: string }] | undefined>(
    variable,
    new SimpleArray({ key: SimpleString })
  )
    ? variable
    : null
);
expectError(
  unknownMatchesTemplate<{ key: string }[] | null>(
    variable,
    new SimpleArray({ key: SimpleString })
  )
    ? variable
    : null
);

// Deep nested array error
expectError(
  unknownMatchesTemplate<[{ key: { key: string[] | undefined }[] }]>(
    variable,
    new SimpleArray({
      key: new SimpleArray({
        key: new SimpleArray(SimpleString),
      }),
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
    new SimpleArray(new SimpleArray({ key: SimpleString }))
  )
    ? variable
    : null
);
// Optional: Undefined
expectType<[{ key: string }] | null | undefined>(
  unknownMatchesTemplate<[{ key: string }] | undefined>(
    variable,
    new SimpleArrayOptional<{ key: string }>({ key: SimpleString })
  )
    ? variable
    : null
);
// Optional: Null
expectType<[{ key: string }] | null>(
  unknownMatchesTemplate<[{ key: string }] | null>(
    variable,
    new SimpleArrayOptional<{ key: string }>({ key: SimpleString })
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
    key: new SimpleOr<string | number>(SimpleString, SimpleNumber),
  })
    ? variable
    : null
);

// Three type
expectType<{ key: string | number | boolean } | null>(
  unknownMatchesTemplate<{ key: string | number | boolean }>(variable, {
    key: new SimpleOr(SimpleString, SimpleBoolean, SimpleNumber),
  })
    ? variable
    : null
);

// Deep Comparison
expectType<{
  key:
    | {
        person: number[];
      }
    | { car: boolean };
} | null>(
  unknownMatchesTemplate<{
    key:
      | {
          person: number[];
        }
      | { car: boolean };
  }>(variable, {
    key: new SimpleOr(
      {
        person: new SimpleArray(SimpleNumber),
      },
      {
        car: SimpleBoolean,
      }
    ),
  })
    ? variable
    : null
);

/**
 * SimpleExactMatch
 */
expectType<{ key: 'hello' | 'dolly' } | null>(
  unknownMatchesTemplate<{ key: 'hello' | 'dolly' }>(variable, {
    key: new SimpleExactMatch('hello', 'dolly'),
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

// Test Optional Arrays
expectError(
  unknownMatchesTemplate<{ key: string[] | undefined }>(variable, {
    key: new SimpleArray(SimpleString),
  })
    ? variable
    : null
);

expectError(
  unknownMatchesTemplate<{ key: string[] | undefined }>(variable, {
    key: new SimpleArray<string>(SimpleString),
  })
    ? variable
    : null
);

expectType<{ key: string[] | undefined } | null>(
  unknownMatchesTemplate<{ key: string[] | undefined }>(variable, {
    key: new SimpleArrayOptional(SimpleString),
  })
    ? variable
    : null
);

expectType<{ key: string[] | undefined } | null>(
  unknownMatchesTemplate<{ key: string[] | undefined }>(variable, {
    key: new SimpleArrayOptional<string>(SimpleString),
  })
    ? variable
    : null
);

// Test Deep Arrays
expectType<{
  key:
    | (
        | {
            key: number[] | undefined;
          }
        | undefined
      )[]
    | undefined;
} | null>(
  unknownMatchesTemplate<{
    key:
      | Array<
          | {
              key: number[] | undefined;
            }
          | undefined
        >
      | undefined;
  }>(variable, {
    key: new SimpleArrayOptional<
      | {
          key: number[] | undefined;
        }
      | undefined
    >(
      new SimpleObjectOptional<{ key: number[] | undefined }>({
        key: new SimpleArrayOptional<number>(SimpleNumber),
      })
    ),
  })
    ? variable
    : null
);
