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

type IsType<VariableType, ComparisonTime, IfTrueType> = Exclude<
  VariableType,
  ComparisonTime
> extends never
  ? IfTrueType
  : never;

type IsOptionalType<VariableType, ComparisonTime, IfTrueType> = IsType<
  VariableType,
  ComparisonTime | null | undefined,
  IfTrueType
>;

export type TypeToTypeof<VariableType> =
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
  | IsType<
      // T[]
      VariableType,
      unknown[],
      SimpleArrayInnerClass<UnpackArray<VariableType>>
    >
  | IsOptionalType<
      // T[] | null | undefined
      VariableType,
      unknown[],
      SimpleArrayOptionalInnerClass<
        UnpackArray<Exclude<VariableType, null | undefined>>
      >
    >
  | IsType<
      // { [keyof]: unknown }
      VariableType,
      ExractObject<VariableType>,
      TypeToTypeofObject<VariableType>
    >
  | IsOptionalType<
      // { [keyof]: unknown } | null | undefined
      VariableType,
      ExractObject<VariableType>,
      SimpleObjectOptionalInnerClass<Exclude<VariableType, null | undefined>>
    >
  | never;

export type UnpackArray<T> = T extends (infer U)[] ? U : T;

export type TypeToTypeofObject<T> = {
  [Key in keyof T]: TypeToTypeof<T[Key]>;
};

type ExractObject<T> = T extends UnpackArray<T>[]
  ? never
  : {
      [Key in keyof RemovePrimitivesAndArrays<T>]: RemovePrimitivesAndArrays<T>[Key];
    };

type RemovePrimitivesAndArrays<T> = Exclude<
  T,
  | string
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined
  | UnpackArray<T>[]
>;

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
export type TypeofToTemplate<ReturnType> = TypeToTypeof<Complete<ReturnType>>;

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
