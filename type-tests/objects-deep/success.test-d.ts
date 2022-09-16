import { expectType } from 'tsd';
import unknownMatchesTemplate, {
  SimpleNumber,
  SimpleObjectOptional,
  SimpleStringOptional,
} from '../../src';

const variable: unknown = '';

expectType<{
  hello: {
    world: number;
  };
} | null>(
  unknownMatchesTemplate<{
    hello: {
      world: number;
    };
  }>(variable, {
    hello: {
      world: SimpleNumber,
    },
  })
    ? variable
    : null
);
expectType<
  | {
      hello: {
        world: number;
      };
    }
  | null
  | undefined
>(
  unknownMatchesTemplate<
    | {
        hello: {
          world: number;
        };
      }
    | undefined
  >(
    variable,
    new SimpleObjectOptional<{
      hello: {
        world: number;
      };
    }>({
      hello: {
        world: SimpleNumber,
      },
    })
  )
    ? variable
    : null
);
expectType<{
  hello?: string;
} | null>(
  unknownMatchesTemplate<{
    hello?: string;
  }>(variable, {
    hello: SimpleStringOptional,
  })
    ? variable
    : null
);
