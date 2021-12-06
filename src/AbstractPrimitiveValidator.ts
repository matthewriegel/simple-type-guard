import AbstractValidator from './AbstractValidator';
import { Options, TypeofValue } from './types';
import { handleResult } from './unknownMatchesTemplate';

abstract class AbstractPrimitiveValidator<
  TypeOfGeneric extends TypeofValue
> extends AbstractValidator<TypeOfGeneric> {
  constructor(typeofValue: TypeOfGeneric) {
    super(typeofValue);
  }

  get label() {
    return this.parameter;
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

  get type() {
    return 'primitive' as const;
  }
}

export default AbstractPrimitiveValidator;
