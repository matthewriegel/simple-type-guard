import AbstractPrimitiveValidator from './AbstractPrimitiveValidator';
import { Options, TypeofValue } from './types';

abstract class AbstractOptionalPrimitiveValidator<
  TypeOfGeneric extends TypeofValue
> extends AbstractPrimitiveValidator<TypeOfGeneric> {
  // Differentiator for typescript
  private optional = true;

  get label() {
    return `${this.parameter} | undefined | null`;
  }

  validate(unknownValue: unknown, options: Options, currentPath: string) {
    if (unknownValue === undefined || unknownValue === null) {
      return true;
    }

    return super.validate(unknownValue, options, currentPath);
  }
}

export default AbstractOptionalPrimitiveValidator;
