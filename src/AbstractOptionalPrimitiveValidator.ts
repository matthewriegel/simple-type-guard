import AbstractPrimitiveValidator from './AbstractPrimitiveValidator';
import AbstractValidator from './AbstractValidator';
import { Options, TypeofValue } from './types';
import { handleResult } from './unknownMatchesTemplate';

abstract class AbstractOptionalPrimitiveValidator<
  TypeOfGeneric extends TypeofValue
> extends AbstractPrimitiveValidator<TypeOfGeneric> {
  // Differentiator for typescript
  private optional = true;

  validate(unknownValue: unknown, options: Options, currentPath: string) {
    if (unknownValue === undefined || unknownValue === null) {
      return true;
    }

    return super.validate(unknownValue, options, currentPath);
  }
}

export default AbstractOptionalPrimitiveValidator;
