import AbstractValidator from './AbstractValidator';
import { getMessageFromUnknownErrorOrBlank } from './helpers';
import { ApplyStrictTypeof } from './types';
import { unknownMatchesTemplate } from './unknownMatchesTemplate';

class SimpleOrInnerClass<Type> extends AbstractValidator<Type[], 'or'> {
  readonly label = 'or' as const;

  validate(unknownValue: unknown, currentPath: string) {
    const errors: unknown[] = [];
    const result = this.parameter.some(template => {
      try {
        unknownMatchesTemplate(unknownValue, template, currentPath);
      } catch (error) {
        errors.push(error);
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

export const SimpleOrFunction = <
  Variables,
  ConvertedVariables extends unknown[] = ApplyStrictTypeof<Variables>[]
>(
  ...list: ConvertedVariables
): SimpleOrInnerClass<ConvertedVariables[number]> => {
  return new SimpleOrInnerClass(
    list.filter(template => template !== undefined)
  );
};

export default SimpleOrInnerClass;
