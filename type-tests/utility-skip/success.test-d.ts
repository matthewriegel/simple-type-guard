import { expectType } from 'tsd';
import unknownMatchesTemplate, { SimpleSkip } from '../../src';

const variable: unknown = '';

expectType<{ key: { foo: string } } | null>(
  unknownMatchesTemplate<{ key: { foo: string } }>(variable, {
    key: SimpleSkip,
  })
    ? variable
    : null
);
