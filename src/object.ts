import { TypeofToTemplate } from './types';
import { handleResult, unknownMatchesTemplate } from './unknownMatchesTemplate';

export const objectAndContentsMatchTemplate = <ReturnType>(
  unknownValue: unknown,
  template: TypeofToTemplate<ReturnType>,
  currentPath: string
) => {
  const result =
    typeof unknownValue === 'object' &&
    unknownValue !== null &&
    !Array.isArray(unknownValue) &&
    Object.entries(template).every(([key, value]) =>
      unknownMatchesTemplate<ReturnType>(
        (unknownValue as Record<string, unknown>)[key],
        value,
        `${currentPath}.${key}`
      )
    );

  return handleResult(result, unknownValue, 'object', currentPath);
};

export const arrayAndContentsMatchTemplate = <ReturnType>(
  unknownValue: unknown,
  template: TypeofToTemplate<ReturnType>,
  currentPath: string
) => {
  const result =
    Array.isArray(unknownValue) &&
    unknownValue.every(unknownValueItem =>
      unknownMatchesTemplate(unknownValueItem, template, `${currentPath}[]`)
    );

  return handleResult(result, unknownValue, 'array', currentPath);
};
