import { isObject } from './object';
import {
  optionalKey,
  Options,
  TypeofToTemplate,
  TypeofToType,
  UnpackArray,
} from './types';
export type { TypeofToTemplate } from './types';

const typeofArrayItemsMatcheType = <
  ReturnType,
  Type extends TypeofToTemplate<ReturnType>
>(
  unknownObjectValue: unknown,
  type: Type,
  options: Options,
  currentPath: string
): unknownObjectValue is TypeofToType<ReturnType>[] => {
  if (!Array.isArray(unknownObjectValue)) {
    return false;
  }

  return unknownObjectValue.every(unknownArrayIndex =>
    unknownMatchesTemplate(unknownArrayIndex, type, options, `${currentPath}[]`)
  );
};

const handleResult = (
  result: boolean,
  unknownVariable: unknown,
  expectedType: unknown,
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

const unknownMatchesTemplate = <ReturnType>(
  unknownVariable: unknown,
  template: TypeofToTemplate<ReturnType>,
  options: Options,
  currentPath: string
): unknownVariable is ReturnType => {
  type PropertyType = Extract<ReturnType, keyof TypeofToTemplate<ReturnType>>;

  if (typeof template === 'function') {
    return handleResult(
      template(unknownVariable),
      unknownVariable,
      'result-of-function',
      options,
      currentPath
    );
  }

  if (Array.isArray(template)) {
    // If variable is undefined, check if the template allows optionals
    if (unknownVariable === undefined || unknownVariable === null) {
      return handleResult(
        template[1] === optionalKey,
        unknownVariable,
        template,
        options,
        currentPath
      );
    }

    const value = template[0];

    return handleResult(
      typeofArrayItemsMatcheType(
        unknownVariable,
        value as any,
        options,
        currentPath
      ),
      unknownVariable,
      'array',
      options,
      currentPath
    );
  }

  // Unknown object must be of an object type to match the template
  // Primitive type check
  if (!isObject(unknownVariable) && !isObject(template)) {
    // If variable is undefined, check if the template allows optionals
    if (unknownVariable === undefined || unknownVariable === null) {
      return handleResult(
        template[template.length - 1] === '?',
        unknownVariable,
        template,
        options,
        currentPath
      );
    }

    return handleResult(
      template.includes(typeof unknownVariable),
      unknownVariable,
      template,
      options,
      currentPath
    );
  } else if (!isObject(unknownVariable)) {
    return handleResult(
      optionalKey in template &&
        (template as { $optional: boolean })[optionalKey],
      unknownVariable,
      'object',
      options,
      currentPath
    );
  }

  // iterate over every template key
  for (const templateKey in template) {
    if (
      !template.hasOwnProperty(templateKey) ||
      !(templateKey in template) ||
      templateKey === optionalKey
    ) {
      continue;
    }

    // `templateValue` is either 'string', 'number', 'boolean', 'undefined', 'function' or an object.
    const templateValue = (
      template as unknown as Record<typeof templateKey, PropertyType>
    )[templateKey];
    const unknownObjectValue = unknownVariable[templateKey];

    // If the template value is an object or function, recursively check object's value
    const propertyMatches = unknownMatchesTemplate<PropertyType>(
      unknownObjectValue,
      templateValue,
      options,
      `${currentPath}.${templateKey}`
    );

    if (!propertyMatches) {
      return false;
    }
  }

  // If all template key|values are included in the unknown object, it matches
  return true;
};

const simpleTypeGuard = <ReturnType>(
  unknownVariable: unknown,
  template: TypeofToTemplate<ReturnType>,
  options: Options = {}
): unknownVariable is ReturnType => {
  try {
    const result = unknownMatchesTemplate(
      unknownVariable,
      template,
      options,
      '_root_'
    );
    return result;
  } catch (error) {
    // attempt to reset the error stack
    if (simpleTypeGuard<Pick<Error, 'message'>>(error, { message: 'string' })) {
      throw new Error(error.message);
    }

    // If there is no message, just rethrow
    throw error;
  }
};

export default simpleTypeGuard;
