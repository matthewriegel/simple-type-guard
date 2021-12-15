import SimpleArrayInnerClass from './SimpleArray';
import SimpleArrayOptionalInnerClass from './SimpleArrayOptional';
import SimpleBigInt from './SimpleBigInt';
import SimpleBigIntOptional from './SimpleBigIntOptional';
import SimpleBoolean from './SimpleBoolean';
import SimpleBooleanOptional from './SimpleBooleanOptional';
import SimpleFunctionInnerClass from './SimpleFunction';
import SimpleNull from './SimpleNull';
import SimpleNumber from './SimpleNumber';
import SimpleNumberOptional from './SimpleNumberOptional';
import SimpleObjectOptionalInnerClass from './SimpleObjectOptional';
import SimpleSkip from './SimpleSkip';
import SimpleString from './SimpleString';
import SimpleStringOptional from './SimpleStringOptional';
import SimpleSymbol from './SimpleSymbol';
import SimpleSymbolOptional from './SimpleSymbolOptional';
import SimpleUndefined from './SimpleUndefined';

export type ValidatorTypes =
  | typeof SimpleString
  | typeof SimpleSkip
  | SimpleFunctionInnerClass;

export type IsType<VariableType, ComparisonTime, IfTrueType> = Exclude<
  VariableType,
  ComparisonTime
> extends never
  ? IfTrueType
  : never;

type IsOptionalType<VariableType, ComparisonTime, IfTrueType> = Extract<
  VariableType,
  undefined | null
> extends never
  ? never
  : IsType<VariableType, ComparisonTime | null | undefined, IfTrueType>;

type IsObjectType<VariableType> = ExcludeObject<VariableType> extends never
  ? TypeToTypeofObject<VariableType>
  : never;

type IsObjectOptionalType<VariableType> = Extract<
  VariableType,
  undefined | null
> extends never
  ? never
  : ExcludeObject<Exclude<VariableType, undefined | null>> extends never
  ? SimpleObjectOptionalInnerClass<
      TypeofToTemplate<Exclude<VariableType, null | undefined>>
    >
  : never;

type IsArrayType<VariableType> = IsType<
  // T[]
  VariableType,
  unknown[],
  SimpleArrayInnerClass<TypeofToTemplate<UnpackArray<VariableType>>>
>;

type IsArrayOptionalType<VariableType> = IsOptionalType<
  // T[] | null | undefined
  VariableType,
  unknown[],
  SimpleArrayOptionalInnerClass<
    TypeofToTemplate<UnpackArray<Exclude<VariableType, null | undefined>>>
  >
>;

export type InnerTypeToTypeof<VariableType> =
  | SimpleFunctionInnerClass
  | typeof SimpleSkip
  | IsType<VariableType, string, typeof SimpleString>
  | IsType<VariableType, number, typeof SimpleNumber>
  | IsType<VariableType, boolean, typeof SimpleBoolean>
  | IsType<VariableType, bigint, typeof SimpleBigInt>
  | IsType<VariableType, symbol, typeof SimpleSymbol>
  | IsType<VariableType, undefined, typeof SimpleUndefined>
  | IsType<VariableType, null, typeof SimpleNull>
  | IsOptionalType<VariableType, string, typeof SimpleStringOptional>
  | IsOptionalType<VariableType, number, typeof SimpleNumberOptional>
  | IsOptionalType<VariableType, boolean, typeof SimpleBooleanOptional>
  | IsOptionalType<VariableType, bigint, typeof SimpleBigIntOptional>
  | IsOptionalType<VariableType, symbol, typeof SimpleSymbolOptional>
  | IsArrayType<VariableType>
  | IsArrayOptionalType<VariableType>
  | IsObjectType<VariableType>
  | IsObjectOptionalType<VariableType>;

type ExcludeObject<ReturnType> =
  | Extract<ReturnType, unknown[]>
  | Exclude<ReturnType, object>;

export type UnpackArray<T> = T extends (infer U)[] ? U : never;

export type TypeToTypeofObject<T> = {
  [Key in keyof T]: TypeofToTemplate<T[Key]>;
};

// Similar to Required, this will ensure all properties exist.
// Optional properties will still retain undefined.
type Complete<T> = {
  [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>>
    ? T[P]
    : T[P] | undefined;
};

/**
 * TypeofToTemplate
 * Builds a JSON-like type mapping of a passed in type.
 * ie)
 * -      string     =>     SimpleString
 * - { key: string } => { key: SimpleString }
 */
export type TypeofToTemplate<ReturnType> = InnerTypeToTypeof<
  Complete<ReturnType>
>;

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

type Uu = IsArrayType<{ key: string }[] | undefined>;
type L = IsArrayType<[{ key: string }] | undefined>;
type O = IsArrayType<[{ key: string }]>;
type K = IsArrayType<{ key: string }[]>;
type M = TypeofToTemplate<[{ key: string }] | undefined>;
