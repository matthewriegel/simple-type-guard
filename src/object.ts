import { Options } from './types';
import { handleResult, unknownMatchesTemplate } from './unknownMatchesTemplate';

export const objectAndContentsMatchTemplate = <Type>(
  unknownValue: unknown,
  template: Type,
  options: Options,
  currentPath: string
) => {
  const result =
    typeof unknownValue === 'object' &&
    unknownValue !== null &&
    !Array.isArray(unknownValue) &&
    Object.entries(template).every(([key, value]) =>
      unknownMatchesTemplate<Type>(
        (unknownValue as Record<string, unknown>)[key],
        value,
        options,
        `${currentPath}.${key}`
      )
    );

  return handleResult(result, unknownValue, 'object', options, currentPath);
};

export const arrayAndContentsMatchTemplate = <Type>(
  unknownValue: unknown,
  template: Type,
  options: Options,
  currentPath: string
) => {
  const result =
    Array.isArray(unknownValue) &&
    unknownValue.every(unknownValueItem =>
      unknownMatchesTemplate(
        unknownValueItem,
        template,
        options,
        `${currentPath}[]`
      )
    );

  return handleResult(result, unknownValue, 'array', options, currentPath);
};
