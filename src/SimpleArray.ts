import { TypeofToTemplate } from 'src';
import AbstractValidator from './AbstractValidator';
import { arrayAndContentsMatchTemplate } from './object';
import { Options } from './types';

class SimpleArrayInnerClass<Type> extends AbstractValidator<
  TypeofToTemplate<Type>
> {
  get label() {
    return 'array';
  }

  constructor(template: TypeofToTemplate<Type>) {
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

export const SimpleArrayFunction = <ReturnType>(
  params: TypeofToTemplate<ReturnType>
): SimpleArrayInnerClass<ReturnType> => {
  return new SimpleArrayInnerClass(params);
};

export default SimpleArrayInnerClass;
