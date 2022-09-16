import AbstractValidator from './AbstractValidator';
import { arrayAndContentsMatchTemplate } from './object';
import { TypeofToTemplate } from './types';

class SimpleArrayOptional<
  Type,
  ConvertedType extends TypeofToTemplate<Type> = TypeofToTemplate<Type>
> extends AbstractValidator<ConvertedType, 'array-optional'> {
  readonly label = 'array-optional' as const;

  validate(unknownValue: unknown, currentPath: string) {
    if (unknownValue === undefined || unknownValue === null) {
      return true;
    }

    return arrayAndContentsMatchTemplate<Type>(
      unknownValue,
      this.parameter,
      currentPath
    );
  }
}

export default SimpleArrayOptional;
