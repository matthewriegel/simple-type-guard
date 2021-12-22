import AbstractPrimitiveValidator from './AbstractPrimitiveValidator';
import { TypeofValue } from './types';

abstract class AbstractOptionalPrimitiveValidator<
  TypeOfGeneric extends TypeofValue
> extends AbstractPrimitiveValidator<
  TypeOfGeneric,
  `${TypeOfGeneric}-optional`
> {
  validate(unknownValue: unknown, currentPath: string) {
    if (unknownValue === undefined || unknownValue === null) {
      return true;
    }

    return super.validate(unknownValue, currentPath);
  }
}

export default AbstractOptionalPrimitiveValidator;
