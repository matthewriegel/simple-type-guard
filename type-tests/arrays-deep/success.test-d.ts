import { expectType } from 'tsd';
import unknownMatchesTemplate, {
  SimpleArrayOptional,
  SimpleNumber,
  SimpleObjectOptional,
} from '../../src';

const variable: unknown = '';

expectType<{
  key:
    | (
        | {
            key: number[] | undefined;
          }
        | undefined
      )[]
    | undefined;
} | null>(
  unknownMatchesTemplate<{
    key:
      | Array<
          | {
              key: number[] | undefined;
            }
          | undefined
        >
      | undefined;
  }>(variable, {
    key: new SimpleArrayOptional<
      | {
          key: number[] | undefined;
        }
      | undefined
    >(
      new SimpleObjectOptional<{ key: number[] | undefined }>({
        key: new SimpleArrayOptional<number>(SimpleNumber),
      })
    ),
  })
    ? variable
    : null
);
