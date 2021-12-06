import AbstractPrimitiveValidator from './AbstractPrimitiveValidator';
import AbstractValidator from './AbstractValidator';
import { Options } from './types';
import { handleResult } from './unknownMatchesTemplate';

class SimpleNull extends AbstractValidator<null> {
  constructor() {
    super(null);
  }

  get label() {
    return 'null';
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

  get type() {
    return 'primitive' as const;
  }
}

export default SimpleNull;
