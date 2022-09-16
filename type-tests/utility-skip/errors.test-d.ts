import { expectError } from 'tsd';
import unknownMatchesTemplate, { SimpleSkip } from '../../src';

const variable: unknown = '';

expectError(
  unknownMatchesTemplate<{ key: { foo: string } }>(variable, {
    key: new SimpleSkip({}),
  })
    ? variable
    : null
);
