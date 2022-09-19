import { expectType } from 'tsd';
import unknownMatchesTemplate, {
  SimpleArray,
  SimpleBoolean,
  SimpleNumber,
  SimpleOr,
  SimpleString,
  SimpleUndefined,
} from '../../src';

const variable: unknown = '';

// Two type
expectType<{ key: string | number } | null>(
  unknownMatchesTemplate<{ key: string | number }>(variable, {
    key: new SimpleOr<string | number>(SimpleString, SimpleNumber),
  })
    ? variable
    : null
);

// Three type
expectType<{ key: string | number | boolean } | null>(
  unknownMatchesTemplate<{ key: string | number | boolean }>(variable, {
    key: new SimpleOr(SimpleString, SimpleNumber, SimpleBoolean),
  })
    ? variable
    : null
);

// Deep Comparison
expectType<{
  key:
    | {
        person: number[];
      }
    | { car: boolean };
} | null>(
  unknownMatchesTemplate<{
    key:
      | {
          person: number[];
        }
      | { car: boolean };
  }>(variable, {
    key: new SimpleOr(
      {
        person: new SimpleArray(SimpleNumber),
      },
      {
        car: SimpleBoolean,
      }
    ),
  })
    ? variable
    : null
);

interface AnimalRef {
  id: number | string;
  breed: string;
}

interface PersonRef {
  id: number | string;
  name: string;
  pets?: AnimalRef[] | AnimalRef;
}

interface Top {
  id: number | string;
  references: (PersonRef | AnimalRef)[];
}

// Nested Or
expectType<Top | null>(
  unknownMatchesTemplate<Top>(variable, {
    id: new SimpleOr(SimpleString, SimpleNumber),
    references: new SimpleArray(
      new SimpleOr(
        {
          id: new SimpleOr(SimpleString, SimpleNumber),
          breed: SimpleString,
        },
        {
          id: new SimpleOr(SimpleString, SimpleNumber),
          name: SimpleString,
          pets: new SimpleOr(
            SimpleUndefined,
            new SimpleArray({
              id: new SimpleOr(SimpleString, SimpleNumber),
              breed: SimpleString,
            }),
            {
              id: new SimpleOr(SimpleString, SimpleNumber),
              breed: SimpleString,
            }
          ),
        }
      )
    ),
  })
    ? variable
    : null
);
