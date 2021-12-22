import AbstractValidator from './AbstractValidator';
import { getMessageFromUnknownErrorOrBlank } from './helpers';
import { ApplyStrictTypeof, TypeofToTemplate } from './types';
import { unknownMatchesTemplate } from './unknownMatchesTemplate';

class SimpleOr<
  Type,
  ConvertedType extends ApplyStrictTypeof<Type>[] = ApplyStrictTypeof<Type>[]
> extends AbstractValidator<ConvertedType, 'or'> {
  readonly label = 'or' as const;

  constructor(...parameters: ConvertedType) {
    super(parameters);
  }

  validate(unknownValue: unknown, currentPath: string) {
    const errors: unknown[] = [];
    const result = this.parameter.some((template): boolean => {
      try {
        return unknownMatchesTemplate<Type>(
          unknownValue,
          template as TypeofToTemplate<Type>,
          currentPath
        );
      } catch (error) {
        errors.push(error);
        return false;
      }
    });

    if (!result) {
      const combinedMessages = errors
        .map(getMessageFromUnknownErrorOrBlank)
        .join('\n');

      throw new Error(combinedMessages);
    }

    return result;
  }
}

export default SimpleOr;
