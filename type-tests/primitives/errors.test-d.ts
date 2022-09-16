import { expectError } from 'tsd';
import unknownMatchesTemplate, {
  SimpleBoolean,
  SimpleNumber,
  SimpleString,
  SimpleUndefined,
} from '../../src';

const variable: unknown = '';

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
