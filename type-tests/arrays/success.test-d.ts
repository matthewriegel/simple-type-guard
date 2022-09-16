import { expectType } from 'tsd';
import unknownMatchesTemplate, {
  SimpleArray,
  SimpleArrayOptional,
  SimpleString,
} from '../../src';

const variable: unknown = '';

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
