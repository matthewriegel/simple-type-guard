import AbstractValidator from './AbstractValidator';
import { TypeofToTemplate } from './types';
import { handleResult, unknownMatchesTemplate } from './unknownMatchesTemplate';

class SimpleObjectOptionalInnerClass<Type> extends AbstractValidator<
  Type,
  'object-optional'
> {
  readonly label = 'object-optional' as const;

  constructor(template: Type) {
    super(template);
  }

  validate(unknownValue: unknown, currentPath: string) {
    if (unknownValue === undefined || unknownValue === null) {
      return true;
    }

    const result =
      typeof unknownValue === 'object' &&
      unknownValue !== null &&
      !Array.isArray(unknownValue) &&
      Object.entries(this.parameter).every(([key, value]) =>
        unknownMatchesTemplate<Type>(
          (unknownValue as Record<string, unknown>)[key],
          value,
          currentPath
        )
      );

    return handleResult(result, unknownValue, this.label, currentPath);
  }
}

export const SimpleObjectOptionalFunction = <
  InputType,
  ReturnType = TypeofToTemplate<InputType>
>(
  params: ReturnType
): SimpleObjectOptionalInnerClass<ReturnType> => {
  return new SimpleObjectOptionalInnerClass(params);
};

export default SimpleObjectOptionalInnerClass;
