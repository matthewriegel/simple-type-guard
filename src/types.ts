export const optionalKey = '$optional';

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

type OptionalType = undefined | null;

type OptionalPrimitiveCheck<
  VariableType,
  TemplateType,
  Typeof extends TypeofValue
> = TemplateType extends Extract<VariableType, TemplateType>
  ? Extract<VariableType, OptionalType> extends never
    ? `${Typeof}`
    : `${Typeof}?`
  : never;

export type TypeToTypeof<VariableType> = [VariableType] extends [
  string | number | boolean | OptionalType
]
  ?
      | OptionalPrimitiveCheck<VariableType, number, 'number'>
      | OptionalPrimitiveCheck<VariableType, string, 'string'>
      | OptionalPrimitiveCheck<VariableType, boolean, 'boolean'>
      | OptionalPrimitiveCheck<VariableType, bigint, 'bigint'>
      | OptionalPrimitiveCheck<VariableType, symbol, 'symbol'>
  : [[any]] extends [VariableType | OptionalType]
  ? Extract<VariableType, OptionalType> extends never
    ? [TypeofToTemplate<Exclude<UnpackArray<VariableType>, OptionalType>>] // no undefined
    : [
        TypeofToTemplate<Exclude<UnpackArray<VariableType>, OptionalType>>,
        typeof optionalKey
      ] // undefined and array
  : [Record<keyof VariableType, any>] extends [
      Record<keyof VariableType, any> | OptionalType
    ]
  ? Extract<VariableType, OptionalType | null> extends never
    ? {
        [Property in keyof VariableType]: TypeofToTemplate<
          VariableType[Property]
        >;
      }
    : {
        [Property in keyof VariableType]: TypeofToTemplate<
          VariableType[Property]
        >;
      } & {
        [optionalKey]: true;
      }
  : never;

export type UnpackArray<T> = T extends (infer U)[] ? U : T;

/**
 * TypeofMap
 * Builds a JSON-like type mapping of a passed in type.
 * ie)
 * -      string     =>     'string'
 * - { key: string } => { key: 'string' }
 */
export type TypeofMap<ReturnType> = TypeToTypeof<ReturnType>;

// Similar to Required, this will ensure all properties exist. Optional properties will
// still allow undefined however.
type Complete<T> = {
  [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>>
    ? T[P]
    : T[P] | undefined;
};

export type TypeofToTemplate<ReturnType> =
  | TypeofMap<Complete<ReturnType>>
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
