import AbstractValidator from './AbstractValidator';
import { arrayAndContentsMatchTemplate } from './object';
import { TypeofToTemplate } from './types';

class SimpleArrayOptional<
  Type,
  ConvertedType = TypeofToTemplate<Type>
> extends AbstractValidator<ConvertedType, 'array-optional'> {
  readonly label = 'array-optional' as const;

  constructor(parameter: ConvertedType) {
    super(parameter);
  }

  validate(unknownValue: unknown, currentPath: string) {
    if (unknownValue === undefined || unknownValue === null) {
      return true;
    }

    return arrayAndContentsMatchTemplate(
      unknownValue,
      this.parameter,
      currentPath
    );
  }
}

export default SimpleArrayOptional;
