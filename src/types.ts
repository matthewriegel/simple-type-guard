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

export const optionalKey = '$optional';

export type PrimitiveClassValidators =
  | typeof SimpleString
  | typeof SimpleBigInt
  | typeof SimpleBoolean
  | typeof SimpleNumber
  | typeof SimpleSymbol
  | typeof SimpleUndefined
  | typeof SimpleNull;
// | typeof SimpleArrayInnerClass;

export type TypeofToType<T> = T extends SimpleNumber
  ? number
  : T extends SimpleString
  ? string
  : T extends SimpleBoolean
  ? boolean
  : T extends SimpleBigInt
  ? bigint
  : T extends SimpleSymbol
  ? symbol
  : T extends SimpleUndefined
  ? undefined
  : never;

export type ComplexClassValidators<ReturnType> =
  | SimpleObjectOptionalInnerClass<ReturnType>
  | SimpleArrayInnerClass<ReturnType>
  | SimpleArrayOptionalInnerClass<ReturnType>;

export type TypeToTypeof<VariableType> =
  | SimpleFunctionInnerClass
  | SimpleSkip
  | (Exclude<VariableType, string> extends never
      ? typeof SimpleString
      : // Number
      Exclude<VariableType, number> extends never
      ? typeof SimpleNumber
      : // Boolean
      Exclude<VariableType, boolean> extends never
      ? typeof SimpleBoolean
      : // BigInt
      Exclude<VariableType, bigint> extends never
      ? typeof SimpleBigInt
      : // Symbol
      Exclude<VariableType, symbol> extends never
      ? typeof SimpleSymbol
      : // Undefined
      Exclude<VariableType, undefined> extends never
      ? typeof SimpleUndefined
      : // Null
      Exclude<VariableType, null> extends never
      ? typeof SimpleNull
      : // String | Undefined | Null
      Exclude<VariableType, string | null | undefined> extends never
      ? typeof SimpleStringOptional
      : // Number | Undefined | Null
      Exclude<VariableType, number | null | undefined> extends never
      ? typeof SimpleNumberOptional
      : // Boolean | Undefined | Null
      Exclude<VariableType, boolean | null | undefined> extends never
      ? typeof SimpleBooleanOptional
      : // BigInt | Undefined | Null
      Exclude<VariableType, bigint | null | undefined> extends never
      ? typeof SimpleBigIntOptional
      : // Symbol | Undefined | Null
      Exclude<VariableType, symbol | null | undefined> extends never
      ? typeof SimpleSymbolOptional
      : // []
      Exclude<
          VariableType,
          VariableType extends unknown[] ? VariableType : never
        > extends never
      ? SimpleArrayInnerClass<UnpackArray<VariableType>>
      : // [] | undefined | null
      Exclude<
          VariableType,
          VariableType extends unknown[]
            ? VariableType | null | undefined
            : never
        > extends never
      ? SimpleArrayOptionalInnerClass<
          UnpackArray<Exclude<VariableType, null | undefined>>
        >
      : // { [keyof]: unknown }
      Exclude<VariableType, Record<string, unknown>> extends never
      ? TypeToTypeofObject<VariableType>
      : // { [keyof]: unknown } | undefined | null
      Exclude<
          VariableType,
          Record<string, unknown> | null | undefined
        > extends never
      ? SimpleObjectOptionalInnerClass<Exclude<VariableType, null | undefined>>
      : //
        never);

export type UnpackArray<T> = T extends (infer U)[] ? U : T;

export type TypeToTypeofObject<T> = {
  [Key in keyof T]: TypeToTypeof<T[Key]>;
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
export type TypeofToTemplate<ReturnType> = TypeToTypeof<Complete<ReturnType>>;

// | FunctionalComparison;

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
