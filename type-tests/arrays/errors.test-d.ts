import { expectError } from 'tsd';
import unknownMatchesTemplate, {
  SimpleArray,
  SimpleNumber,
  SimpleString,
} from '../../src';

const variable: unknown = '';

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
