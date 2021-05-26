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

export type TypeToTypeof<T, Continued> = T extends number
  ? 'number'
  : T extends string
  ? 'string'
  : T extends boolean
  ? 'boolean'
  : T extends undefined
  ? 'undefined'
  : T extends []
  ? [UnpackArray<T>]
  : Continued;

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
    [Property in keyof ReturnType]: TemplateMap<ReturnType[Property]>;
  }
>;

export type TemplateMap<ReturnType> =
  | TypeofMap<ReturnType>
  | FunctionalComparison;

export type TypeofValue = 'string' | 'number' | 'boolean' | 'undefined';
