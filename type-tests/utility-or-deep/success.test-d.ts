import { expectType } from 'tsd';
import unknownMatchesTemplate, {
  SimpleNumber,
  SimpleObjectOptional,
  SimpleOr,
  SimpleString,
  SimpleUndefined,
} from '../../src';

const variable: unknown = '';

expectType<{
  response?: {
    status?: number | string;
  };
  code?: number | string;
} | null>(
  unknownMatchesTemplate<{
    response?: {
      status?: number | string;
    };
    code?: number | string;
  }>(variable, {
    response: new SimpleObjectOptional({
      status: new SimpleOr(SimpleString, SimpleNumber, SimpleUndefined),
    }),
    code: new SimpleOr(SimpleString, SimpleNumber, SimpleUndefined),
  })
    ? variable
    : null
);
