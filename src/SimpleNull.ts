import AbstractValidator from './AbstractValidator';
import { Options } from './types';
import { handleResult } from './unknownMatchesTemplate';

class SimpleNull extends AbstractValidator<null, 'null'> {
  readonly label = 'null' as const;

  constructor() {
    super(null);
  }

  validate(unknownValue: unknown, options: Options, currentPath: string) {
    return handleResult(
      unknownValue === null,
      unknownValue,
      this.label,
      options,
      currentPath
    );
  }

  public static isPrimitive = true;
}

export default SimpleNull;
