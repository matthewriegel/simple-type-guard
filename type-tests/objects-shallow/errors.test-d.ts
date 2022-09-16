import { expectError } from 'tsd';
import unknownMatchesTemplate, {
  SimpleNumber,
  SimpleString,
  SimpleUndefined,
} from '../../src';

const variable: unknown = '';

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
