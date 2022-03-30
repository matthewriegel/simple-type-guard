import simpleTypeGuard from '..';
import SimpleArray from '../SimpleArray';
import SimpleObjectOptional from '../SimpleObjectOptional';
import SimpleOr from '../SimpleOr';
import SimpleString from '../SimpleString';

describe('error tests', () => {
  test('should properly throw a complete list of the errors returned by the OR class', () => {
    expect(() =>
      simpleTypeGuard<{
        test:
          | Array<{
              foo: string;
            }>
          | Array<{ hello: string }>;
      }>(
        { test: [{}] },
        {
          test: new SimpleOr(
            new SimpleArray({ foo: SimpleString }),
            new SimpleArray({ hello: SimpleString })
          ),
        },
        { throwErrorOnFailure: true }
      )
    ).toThrowError(`Invalid type detected at "_root_.test[].foo":
Expected "string"
Found "undefined"

Variable Output: undefined

Invalid type detected at "_root_.test[].hello":
Expected "string"
Found "undefined"

Variable Output: undefined`);
  });

  test('should properly throw the contents of an optional object', () => {
    expect(() =>
      simpleTypeGuard<{
        test: Array<
          | {
              foo: string;
            }
          | undefined
        >;
      }>(
        { test: [{}] },
        {
          test: new SimpleArray(
            new SimpleObjectOptional({ foo: SimpleString })
          ),
        },
        { throwErrorOnFailure: true }
      )
    ).toThrowError(`Invalid type detected at "_root_.test[].foo":
Expected "string"
Found "undefined"

Variable Output: undefined`);
  });
});
