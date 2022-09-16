import AbstractValidator from './AbstractValidator';
import { TypeofValue } from './types';
import { handleResult } from './unknownMatchesTemplate';

abstract class AbstractPrimitiveValidator<
  TypeOfGeneric extends TypeofValue,
  Differentiator extends string = TypeOfGeneric
> extends AbstractValidator<TypeOfGeneric, Differentiator> {
  validate(unknownValue: unknown, currentPath: string) {
    return handleResult(
      typeof unknownValue === this.parameter,
      unknownValue,
      this.label,
      currentPath
    );
  }
}

export default AbstractPrimitiveValidator;
