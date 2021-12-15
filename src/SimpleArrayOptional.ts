import AbstractValidator from './AbstractValidator';
import { arrayAndContentsMatchTemplate } from './object';
import { Options, TypeofToTemplate } from './types';

class SimpleArrayOptionalInnerClass<Type> extends AbstractValidator<
  Type,
  'array-optional'
> {
  readonly label = 'array-optional' as const;

  constructor(template: Type) {
    super(template);
  }

  validate(unknownValue: unknown, options: Options, currentPath: string) {
    if (unknownValue === undefined || unknownValue === null) {
      return true;
    }

    return arrayAndContentsMatchTemplate(
      unknownValue,
      this.parameter,
      options,
      currentPath
    );
  }
}

export const SimpleArrayOptionalFunction = <
  InputType,
  ReturnType = TypeofToTemplate<InputType>
>(
  params: ReturnType
): SimpleArrayOptionalInnerClass<ReturnType> => {
  return new SimpleArrayOptionalInnerClass(params);
};

export default SimpleArrayOptionalInnerClass;
