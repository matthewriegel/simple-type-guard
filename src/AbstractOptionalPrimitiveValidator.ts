import AbstractPrimitiveValidator from './AbstractPrimitiveValidator';
import { Options, TypeofValue } from './types';

abstract class AbstractOptionalPrimitiveValidator<
  TypeOfGeneric extends TypeofValue
> extends AbstractPrimitiveValidator<
  TypeOfGeneric,
  `${TypeOfGeneric}-optional`
> {
  validate(unknownValue: unknown, options: Options, currentPath: string) {
    if (unknownValue === undefined || unknownValue === null) {
      return true;
    }

    return super.validate(unknownValue, options, currentPath);
  }
}

export default AbstractOptionalPrimitiveValidator;
