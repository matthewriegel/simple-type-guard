import { isObject } from './object';
import SimpleString from './SimpleString';
import {
  AllValidators,
  optionalKey,
  Options,
  TypeofToTemplate,
  TypeofToType,
  UnpackArray,
} from './types';
import AbstractValidator from './AbstractValidator';
import { unknownMatchesTemplate } from './unknownMatchesTemplate';
export type { TypeofToTemplate } from './types';

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
