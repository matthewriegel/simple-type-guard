import { expectType } from 'tsd';
import unknownMatchesTemplate, {
  SimpleBoolean,
  SimpleBooleanOptional,
  SimpleNumber,
  SimpleNumberOptional,
  SimpleString,
  SimpleStringOptional,
} from '../../src';

const variable: unknown = '';

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
