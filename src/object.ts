import { handleResult, unknownMatchesTemplate } from './unknownMatchesTemplate';

export const objectAndContentsMatchTemplate = <Type>(
  unknownValue: unknown,
  template: Type,
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
        `${currentPath}.${key}`
      )
    );

  return handleResult(result, unknownValue, 'object', currentPath);
};

export const arrayAndContentsMatchTemplate = <Type>(
  unknownValue: unknown,
  template: Type,
  currentPath: string
) => {
  const result =
    Array.isArray(unknownValue) &&
    unknownValue.every(unknownValueItem =>
      unknownMatchesTemplate(unknownValueItem, template, `${currentPath}[]`)
    );

  return handleResult(result, unknownValue, 'array', currentPath);
};
