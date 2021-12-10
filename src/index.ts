export { SimpleArrayFunction as SimpleArray } from './SimpleArray';
export { SimpleArrayOptionalFunction as SimpleArrayOptional } from './SimpleArrayOptional';
export { default as SimpleBigInt } from './SimpleBigInt';
export { default as SimpleBigIntOptional } from './SimpleBigIntOptional';
export { default as SimpleBoolean } from './SimpleBoolean';
export { default as SimpleBooleanOptional } from './SimpleBooleanOptional';
export { SimpleFunctionFunction as SimpleFunction } from './SimpleFunction';
export { default as SimpleNull } from './SimpleNull';
export { default as SimpleNumber } from './SimpleNumber';
export { default as SimpleNumberOptional } from './SimpleNumberOptional';
export { SimpleObjectOptionalFunction as SimpleObjectOptional } from './SimpleObjectOptional';
export { default as SimpleSkip } from './SimpleSkip';
export { default as SimpleString } from './SimpleString';
export { default as SimpleStringOptional } from './SimpleStringOptional';
export { default as SimpleSymbol } from './SimpleSymbol';
export { default as SimpleSymbolOptional } from './SimpleSymbolOptional';
export { default as SimpleUndefined } from './SimpleUndefined';
export type { TypeofToTemplate } from './types';
import SimpleString from './SimpleString';
import { Options, TypeofToTemplate } from './types';
import { unknownMatchesTemplate } from './unknownMatchesTemplate';

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
