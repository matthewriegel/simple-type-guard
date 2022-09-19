import { expectType } from 'tsd';
import unknownMatchesTemplate, {
  SimpleArray,
  SimpleBoolean,
  SimpleNumber,
  SimpleOr,
  SimpleString,
} from '../../src';

const variable: unknown = '';

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
    key: new SimpleOr(SimpleString, SimpleNumber, SimpleBoolean),
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
