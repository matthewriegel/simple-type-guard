import AbstractValidator from './AbstractValidator';
import { arrayAndContentsMatchTemplate } from './object';
import { Options, TypeofToTemplate } from './types';

class SimpleArrayOptionalInnerClass<Type> extends AbstractValidator<Type> {
  get label() {
    return 'array | undefined | null';
  }

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

export const SimpleArrayOptionalFunction = <ReturnType>(
  params: TypeofToTemplate<ReturnType>
): SimpleArrayOptionalInnerClass<TypeofToTemplate<ReturnType>> => {
  return new SimpleArrayOptionalInnerClass(params);
};

export default SimpleArrayOptionalInnerClass;
