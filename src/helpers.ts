import simpleTypeGuard, { SimpleString } from '.';

export const getMessageFromUnknownErrorOrBlank = (
  unknownError: unknown
): string =>
  (simpleTypeGuard<Pick<Error, 'message'>>(unknownError, {
    message: SimpleString,
  }) &&
    unknownError.message) ||
  '';
