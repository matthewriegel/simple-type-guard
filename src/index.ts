export { default as SimpleArray } from './SimpleArray';
export { default as SimpleArrayOptional } from './SimpleArrayOptional';
export { default as SimpleBigInt } from './SimpleBigInt';
export { default as SimpleBigIntOptional } from './SimpleBigIntOptional';
export { default as SimpleBoolean } from './SimpleBoolean';
export { default as SimpleBooleanOptional } from './SimpleBooleanOptional';
export { default as SimpleExactMatch } from './SimpleExactMatch';
export { default as SimpleFunction } from './SimpleFunction';
export { default as SimpleNull } from './SimpleNull';
export { default as SimpleNumber } from './SimpleNumber';
export { default as SimpleNumberOptional } from './SimpleNumberOptional';
export { default as SimpleObjectOptional } from './SimpleObjectOptional';
export { default as SimpleOr } from './SimpleOr';
export { default as SimpleSkip } from './SimpleSkip';
export { default as SimpleString } from './SimpleString';
export { default as SimpleStringOptional } from './SimpleStringOptional';
export { default as SimpleSymbol } from './SimpleSymbol';
export { default as SimpleSymbolOptional } from './SimpleSymbolOptional';
export { default as SimpleUndefined } from './SimpleUndefined';
export type { TypeofToTemplate } from './types';
import { getMessageFromUnknownErrorOrBlank } from './helpers';
import { Options, TypeofToTemplate } from './types';
import { unknownMatchesTemplate } from './unknownMatchesTemplate';

const simpleTypeGuard = <ReturnType>(
  unknownVariable: unknown,
  template: TypeofToTemplate<ReturnType>,
  options: Options = {}
): unknownVariable is ReturnType => {
  try {
    const result = unknownMatchesTemplate(unknownVariable, template, '_root_');
    return result;
  } catch (error) {
    if (!options.throwErrorOnFailure) {
      return false;
    }

    // attempt to reset the error stack
    const errorMessage = getMessageFromUnknownErrorOrBlank(error);
    if (errorMessage) {
      throw new Error(errorMessage);
    } else {
      // If there is no message, just rethrow
      throw error;
    }
  }
};

type I = TypeofToTemplate<string | undefined>;

export default simpleTypeGuard;
