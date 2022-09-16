import { expectError } from 'tsd';
import unknownMatchesTemplate, { SimpleArray, SimpleString } from '../../src';

const variable: unknown = '';

expectError(
  unknownMatchesTemplate<{ key: string[] | undefined }>(variable, {
    key: new SimpleArray(SimpleString),
  })
    ? variable
    : null
);

expectError(
  unknownMatchesTemplate<{ key: string[] | undefined }>(variable, {
    key: new SimpleArray<string>(SimpleString),
  })
    ? variable
    : null
);
