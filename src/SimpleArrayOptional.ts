import { TypeofToTemplate } from 'src';
import AbstractValidator from './AbstractValidator';
import { arrayAndContentsMatchTemplate } from './object';
import { Options } from './types';

class SimpleArrayOptionalInnerClass<Type> extends AbstractValidator<
  TypeofToTemplate<Type>
> {
  get label() {
    return 'array | undefined | null';
  }

  constructor(template: TypeofToTemplate<Type>) {
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
) => {
  return new SimpleArrayOptionalInnerClass(params);
};

export default SimpleArrayOptionalInnerClass;
