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

type OptionalPrimitiveCheck<
  VariableType,
  TemplateType,
  Typeof extends TypeofValue
> = TemplateType extends Extract<VariableType, TemplateType>
  ? Extract<VariableType, undefined> extends never
    ? `${Typeof}`
    : `${Typeof}?`
  : never;

export type TypeToTypeof<VariableType, Continued> = [VariableType] extends [
  string | number | boolean | undefined
]
  ?
      | OptionalPrimitiveCheck<VariableType, number, 'number'>
      | OptionalPrimitiveCheck<VariableType, string, 'string'>
      | OptionalPrimitiveCheck<VariableType, boolean, 'boolean'>
      | OptionalPrimitiveCheck<VariableType, bigint, 'bigint'>
      | OptionalPrimitiveCheck<VariableType, symbol, 'symbol'>
  : [[any]] extends [VariableType | undefined]
  ? Extract<VariableType, undefined> extends never
    ? [TypeofMap<UnpackArray<VariableType>>] // no undefined
    : [TypeofMap<UnpackArray<VariableType>>, 'optional'] // undefined and array
  : Continued;

// type TestType = string | undefined;

// type A = Extract<TestType, undefined> extends never
//   ? 'required' // no undefined
//   : 'optional'; // undefined and array

// type P = [[any]] extends [TestType | undefined]
//   ? Extract<TestType, undefined> extends never
//     ? 'required' // no undefined
//     : 'optional' // undefined and array
//   : 'no-match'; // not array or undefined

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
