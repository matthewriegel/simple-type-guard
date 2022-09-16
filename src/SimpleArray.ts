import AbstractValidator from './AbstractValidator';
import { arrayAndContentsMatchTemplate } from './object';
import { TypeofToTemplate } from './types';

class SimpleArray<
  Type,
  ConvertedType extends TypeofToTemplate<Type> = TypeofToTemplate<Type>
> extends AbstractValidator<ConvertedType, 'array'> {
  readonly label = 'array' as const;

  validate(unknownValue: unknown, currentPath: string) {
    return arrayAndContentsMatchTemplate<Type>(
      unknownValue,
      this.parameter,
      currentPath
    );
  }
}

export default SimpleArray;
