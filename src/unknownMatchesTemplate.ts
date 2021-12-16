import { TypeofToTemplate } from 'src';
import { objectAndContentsMatchTemplate } from './object';

export const handleResult = (
  result: boolean,
  unknownVariable: unknown,
  expectedType: string,
  currentPath: string
): boolean => {
  if (result) {
    return result;
  }

  let printedVariable: string;
  try {
    printedVariable = JSON.stringify(unknownVariable);
  } catch (error) {
    printedVariable = 'unknown';
  }

  throw new Error(
    `Invalid type detected at "${currentPath}":
Expected "${expectedType}"
Found "${typeof unknownVariable}"

Variable Output: ${printedVariable}`
  );
};

export const unknownMatchesTemplate = <ReturnType>(
  unknownVariable: unknown,
  template: TypeofToTemplate<ReturnType>,
  currentPath: string
): unknownVariable is ReturnType => {
  if (typeof template === 'function') {
    const resultClass = new template(undefined);
    return resultClass.validate(unknownVariable, currentPath);
  } else if (
    typeof template === 'object' &&
    'validate' in template &&
    typeof template.validate === 'function'
  ) {
    return template.validate(unknownVariable, currentPath);
  } else {
    return objectAndContentsMatchTemplate(
      unknownVariable,
      template,
      currentPath
    );
  }
};
