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

export type TypeToTypeof<VariableType> = [VariableType] extends [
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
    ? [TypeofToTemplate<Exclude<UnpackArray<VariableType>, undefined>>] // no undefined
    : [
        TypeofToTemplate<Exclude<UnpackArray<VariableType>, undefined>>,
        'optional'
      ] // undefined and array
  : [Record<keyof VariableType, any>] extends [
      Record<keyof VariableType, any> | undefined
    ]
  ? Extract<VariableType, undefined> extends never
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
        $optional: true;
      }
  : never;

export type UnpackArray<T> = T extends (infer U)[] ? U : T;

// type TEST_VARIABLE = [{ key: number }] | undefined;
// type P = [Record<keyof TEST_VARIABLE, any>] extends [
//   Record<keyof TEST_VARIABLE, any> | undefined
// ]
//   ? Extract<TEST_VARIABLE, undefined> extends never
//     ? {
//         [Property in keyof TEST_VARIABLE]: TypeofToTemplate<
//           TEST_VARIABLE[Property]
//         >;
//       }
//     : {
//         [Property in keyof TEST_VARIABLE]: TypeofToTemplate<
//           TEST_VARIABLE[Property]
//         >;
//       } & {
//         $optional: true;
//       }
//   : never;

/**
 * TypeofMap
 * Builds a JSON-like type mapping of a passed in type.
 * ie)
 * -      string     =>     'string'
 * - { key: string } => { key: 'string' }
 */
export type TypeofMap<ReturnType> = TypeToTypeof<ReturnType>;

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
