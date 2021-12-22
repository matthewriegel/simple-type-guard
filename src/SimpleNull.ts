import AbstractValidator from './AbstractValidator';
import { handleResult } from './unknownMatchesTemplate';

class SimpleNull extends AbstractValidator<null, 'null'> {
  readonly label = 'null' as const;

  constructor() {
    super(null);
  }

  validate(unknownValue: unknown, currentPath: string) {
    return handleResult(
      unknownValue === null,
      unknownValue,
      this.label,
      currentPath
    );
  }

  public static isPrimitive = true;
}

export default SimpleNull;
