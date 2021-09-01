export type TypeofToType<T> = T extends 'number'
  ? number
  : T extends 'string'
  ? string
  : T extends 'boolean'
  ? boolean
  : T extends 'undefined'
  ? undefined
  : never;

/**
 * FunctionalComparison
 * Takes an unknown type and returns a boolean to be used
 * as a type guard. 'true' means the unknown object matches the type.
 */
type FunctionalComparison = (item: unknown) => boolean;

type OptionalCheck<
  T,
  TypeTS,
  Typeof extends TypeofValue
> = TypeTS extends Extract<T, TypeTS>
  ? Extract<T, undefined> extends never
    ? `${Typeof}`
    : `${Typeof}?`
  : never;

export type TypeToTypeof<T, Continued> = [T] extends [
  string | number | boolean | undefined
]
  ?
      | OptionalCheck<T, number, 'number'>
      | OptionalCheck<T, string, 'string'>
      | OptionalCheck<T, boolean, 'boolean'>
      | OptionalCheck<T, bigint, 'bigint'>
      | OptionalCheck<T, symbol, 'symbol'>
  : T extends [UnpackArray<T>]
  ? [UnpackArray<T>]
  : Continued;

type P = TypeToTypeof<number | undefined, {}>;
type P34 = TypeToTypeof<number, {}>;
type P2 = OptionalCheck<string | undefined, number, 'number'>;

export type UnpackArray<T> = T extends (infer U)[] ? U : T;

/**
 * TypeofMap
 * Builds a JSON-like type mapping of a passed in type.
 * ie)
 * -      string     =>     'string'
 * - { key: string } => { key: 'string' }
 */
export type TypeofMap<ReturnType> = TypeToTypeof<
  ReturnType,
  {
    [Property in keyof ReturnType]: TypeofToTemplate<ReturnType[Property]>;
  }
>;

export type TypeofToTemplate<ReturnType> =
  | TypeofMap<ReturnType>
  | FunctionalComparison;

export type TypeofValue =
  | 'string'
  | 'number'
  | 'boolean'
  | 'undefined'
  | 'symbol'
  | 'bigint';

export interface Options {
  throwErrorOnFailure?: boolean;
}
