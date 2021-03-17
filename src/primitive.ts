import { TypeofValue } from './types';

export const isBasicPrimitiveTypeof = (
  variable: unknown
): variable is TypeofValue =>
  variable === 'string' ||
  variable === 'boolean' ||
  variable === 'number' ||
  variable === 'undefined';
