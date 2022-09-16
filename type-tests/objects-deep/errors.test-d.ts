import { expectError } from 'tsd';
import unknownMatchesTemplate, { SimpleNumber, SimpleString } from '../../src';

const variable: unknown = '';

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
