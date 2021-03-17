export const isObject = (
  variable: unknown
): variable is Record<string, unknown> =>
  typeof variable === 'object' && !!variable && variable.constructor === Object;
