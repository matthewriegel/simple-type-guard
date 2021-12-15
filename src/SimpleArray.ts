import AbstractValidator from './AbstractValidator';
import { arrayAndContentsMatchTemplate } from './object';
import { Options, TypeofToTemplate } from './types';

class SimpleArrayInnerClass<Type> extends AbstractValidator<Type, 'array'> {
  readonly label = 'array' as const;

  constructor(template: Type) {
    super(template);
  }

  validate(unknownValue: unknown, options: Options, currentPath: string) {
    return arrayAndContentsMatchTemplate(
      unknownValue,
      this.parameter,
      options,
      currentPath
    );
  }
}

export const SimpleArrayFunction = <
  InputType,
  ReturnType = TypeofToTemplate<InputType>
>(
  params: ReturnType
): SimpleArrayInnerClass<ReturnType> => {
  return new SimpleArrayInnerClass(params);
};

export default SimpleArrayInnerClass;
