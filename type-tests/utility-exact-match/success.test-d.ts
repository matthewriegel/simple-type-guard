import { expectType } from 'tsd';
import unknownMatchesTemplate, { SimpleExactMatch } from '../../src';

const variable: unknown = '';

expectType<{ key: 'hello' | 'dolly' } | null>(
  unknownMatchesTemplate<{ key: 'hello' | 'dolly' }>(variable, {
    key: new SimpleExactMatch('hello', 'dolly'),
  })
    ? variable
    : null
);
