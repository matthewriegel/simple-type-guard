import { expectError, expectType } from 'tsd';
import unknownMatchesTemplate from '.';

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
expectType<undefined | null>(
  unknownMatchesTemplate<undefined>(variable, 'undefined') ? variable : null
);
/** */
