import { expectError } from 'tsd';
import unknownMatchesTemplate from '../../src';

const variable: unknown = '';

expectError(
  unknownMatchesTemplate<{ key: { foo: string[] } }>(variable, {
    key: {
      foo: [],
    },
  })
    ? variable
    : null
);
