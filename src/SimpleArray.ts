import { TypeofToTemplate } from 'src';
import AbstractValidator from './AbstractValidator';
import SimpleString from './SimpleString';
import { Options } from './types';
import { handleResult, unknownMatchesTemplate } from './unknownMatchesTemplate';

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
    const result =
      Array.isArray(unknownValue) &&
      unknownValue.every(unknownValueItem =>
        unknownMatchesTemplate<Type>(
          unknownValueItem,
          this.parameter,
          options,
          currentPath
        )
      );

    return handleResult(result, unknownValue, this.label, options, currentPath);
  }

  get type() {
    return 'complex' as const;
  }
}

export type SimpleArrayType<ReturnType> = (
  params: TypeofToTemplate<ReturnType>
) => SimpleArrayInnerClass<ReturnType>;

export const SimpleArray = <ReturnType>(
  params: TypeofToTemplate<ReturnType>
) => {
  return new SimpleArrayInnerClass(params);
};

export default SimpleArrayInnerClass;
