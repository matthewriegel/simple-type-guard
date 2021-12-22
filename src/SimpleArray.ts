import AbstractValidator from './AbstractValidator';
import { arrayAndContentsMatchTemplate } from './object';
import { TypeofToTemplate } from './types';

class SimpleArray<
  Type,
  ConvertedType = TypeofToTemplate<Type>
> extends AbstractValidator<ConvertedType, 'array'> {
  readonly label = 'array' as const;

  constructor(parameter: ConvertedType) {
    super(parameter);
  }

  validate(unknownValue: unknown, currentPath: string) {
    return arrayAndContentsMatchTemplate(
      unknownValue,
      this.parameter,
      currentPath
    );
  }
}

export default SimpleArray;
