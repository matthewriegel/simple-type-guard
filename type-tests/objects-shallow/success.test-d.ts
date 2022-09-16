import { expectType } from 'tsd';
import unknownMatchesTemplate, { SimpleString } from '../../src';

const variable: unknown = '';

// Success
expectType<{ hello: string } | null>(
  unknownMatchesTemplate<{ hello: string }>(variable, { hello: SimpleString })
    ? variable
    : null
);
