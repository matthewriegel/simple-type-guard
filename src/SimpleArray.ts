import AbstractValidator from './AbstractValidator';
import { arrayAndContentsMatchTemplate } from './object';
import SimpleString from './SimpleString';
import { Options, TypeofToTemplate } from './types';

class SimpleArrayInnerClass<Type> extends AbstractValidator<Type> {
  get label() {
    return 'array';
  }

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

export const SimpleArrayFunction = <ReturnType>(
  params: TypeofToTemplate<ReturnType>
): SimpleArrayInnerClass<
  TypeofToTemplate<ReturnType> extends SimpleArrayInnerClass<
    typeof SimpleString
  >
    ? SimpleArrayInnerClass<typeof SimpleString>
    : unknown
> => {
  return new SimpleArrayInnerClass(params) as any;
};

export default SimpleArrayInnerClass;
