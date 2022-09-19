import { expectError } from 'tsd';
import unknownMatchesTemplate, {
  SimpleNumber,
  SimpleOr,
  SimpleString,
  SimpleSymbol,
} from '../../src';

const variable: unknown = '';

// Including an extra not-included type
expectError(
  unknownMatchesTemplate<{ key: string | number }>(variable, {
    key: new SimpleOr(SimpleString, SimpleNumber, SimpleSymbol),
  })
    ? variable
    : null
);

// Forgetting a type
expectError(
  unknownMatchesTemplate<{ key: string | number }>(variable, {
    key: new SimpleOr(SimpleString),
  })
    ? variable
    : null
);

// Duplicate Types
expectError(
  unknownMatchesTemplate<{ key: string | number }>(variable, {
    key: new SimpleOr(SimpleString, SimpleNumber, SimpleNumber),
  })
    ? variable
    : null
);
