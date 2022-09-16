import { expectType } from 'tsd';
import unknownMatchesTemplate, {
  SimpleArrayOptional,
  SimpleString,
} from '../../src';

const variable: unknown = '';

expectType<{ key: string[] | undefined } | null>(
  unknownMatchesTemplate<{ key: string[] | undefined }>(variable, {
    key: new SimpleArrayOptional(SimpleString),
  })
    ? variable
    : null
);

expectType<{ key: string[] | undefined } | null>(
  unknownMatchesTemplate<{ key: string[] | undefined }>(variable, {
    key: new SimpleArrayOptional<string>(SimpleString),
  })
    ? variable
    : null
);
