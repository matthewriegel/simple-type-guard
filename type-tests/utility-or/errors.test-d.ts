import { expectError } from 'tsd';
import unknownMatchesTemplate, {
  SimpleNumber,
  SimpleOr,
  SimpleString,
  SimpleSymbol,
} from '../../src';

const variable: unknown = '';

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
