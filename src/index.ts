import SimpleString from './SimpleString';
import { Options, TypeofToTemplate } from './types';
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
    if (
      simpleTypeGuard<Pick<Error, 'message'>>(error, { message: SimpleString })
    ) {
      throw new Error(error.message);
    }

    // If there is no message, just rethrow
    throw error;
  }
};

export default simpleTypeGuard;
