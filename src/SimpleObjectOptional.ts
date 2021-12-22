import AbstractValidator from './AbstractValidator';
import { TypeofToTemplateExcludeOptionals } from './types';
import { handleResult, unknownMatchesTemplate } from './unknownMatchesTemplate';

class SimpleObjectOptional<
  Type,
  ConvertedType = TypeofToTemplateExcludeOptionals<Type>
> extends AbstractValidator<ConvertedType, 'object-optional'> {
  readonly label = 'object-optional' as const;

  constructor(template: ConvertedType) {
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

export default SimpleObjectOptional;
