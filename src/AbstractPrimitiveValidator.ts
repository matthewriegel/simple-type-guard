import AbstractValidator from './AbstractValidator';
import { Options, TypeofValue } from './types';
import { handleResult } from './unknownMatchesTemplate';

abstract class AbstractPrimitiveValidator<
  TypeOfGeneric extends TypeofValue,
  Differentiator extends string = TypeOfGeneric
> extends AbstractValidator<TypeOfGeneric, Differentiator> {
  constructor(typeofValue: TypeOfGeneric) {
    super(typeofValue);
  }

  validate(unknownValue: unknown, options: Options, currentPath: string) {
    return handleResult(
      typeof unknownValue === this.parameter,
      unknownValue,
      this.label,
      options,
      currentPath
    );
  }
}

export default AbstractPrimitiveValidator;
