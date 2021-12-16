import AbstractValidator from './AbstractValidator';
import { handleResult } from './unknownMatchesTemplate';

class SimpleExactMatchInnerClass<Type> extends AbstractValidator<
  Type[],
  'exact-match'
> {
  readonly label = 'exact-match' as const;

  constructor(template: Type[]) {
    super(template);
  }

  validate(unknownValue: unknown, currentPath: string) {
    return handleResult(
      this.parameter.some(parameter => parameter === unknownValue),
      unknownValue,
      this.label,
      currentPath
    );
  }
}

export const SimpleExactMatchFunction = <InputType>(
  ...values: InputType[]
): SimpleExactMatchInnerClass<InputType> => {
  return new SimpleExactMatchInnerClass(values);
};

export default SimpleExactMatchInnerClass;
