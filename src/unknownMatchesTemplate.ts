import { TypeofToTemplate } from 'src';
import { objectAndContentsMatchTemplate } from './object';
import {
  ComplexClassValidators,
  Options,
  PrimitiveClassValidators,
} from './types';

export const handleResult = (
  result: boolean,
  unknownVariable: unknown,
  expectedType: string,
  options: Options,
  currentPath: string
): boolean => {
  if (result || !options.throwErrorOnFailure) {
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
  options: Options,
  currentPath: string
): unknownVariable is ReturnType => {
  if (typeof template === 'function') {
    const resultClass = new (template as PrimitiveClassValidators)();
    return resultClass.validate(unknownVariable, options, currentPath);
  } else if (
    typeof template === 'object' &&
    'validate' in template &&
    typeof template.validate === 'function'
  ) {
    return (template as ComplexClassValidators<unknown>).validate(
      unknownVariable,
      options,
      currentPath
    );
  } else {
    return objectAndContentsMatchTemplate(
      unknownVariable,
      template,
      options,
      currentPath
    );
  }
};
