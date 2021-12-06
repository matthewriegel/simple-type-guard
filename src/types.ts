import { SimpleArray, SimpleArrayType } from './SimpleArray';
import SimpleBigInt from './SimpleBigInt';
import SimpleBigIntOptional from './SimpleBigIntOptional';
import SimpleBoolean from './SimpleBoolean';
import SimpleBooleanOptional from './SimpleBooleanOptional';
import SimpleNull from './SimpleNull';
import SimpleNumber from './SimpleNumber';
import SimpleNumberOptional from './SimpleNumberOptional';
import SimpleString from './SimpleString';
import SimpleStringOptional from './SimpleStringOptional';
import SimpleSymbol from './SimpleSymbol';
import SimpleSymbolOptional from './SimpleSymbolOptional';
import SimpleUndefined from './SimpleUndefined';

export const optionalKey = '$optional';

export type AllValidators =
  | typeof SimpleString
  | typeof SimpleBigInt
  | typeof SimpleBoolean
  | typeof SimpleNumber
  | typeof SimpleSymbol
  | typeof SimpleUndefined;
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

/**
 * FunctionalComparison
 * Takes an unknown type and returns a boolean to be used
 * as a type guard. 'true' means the unknown object matches the type.
 */
type FunctionalComparison = (item: unknown) => boolean;

type OptionalType = undefined | null;

export type TypeToTypeof<VariableType> = true extends true
  ? //
    Exclude<VariableType, string> extends never
    ? typeof SimpleString
    : //
    Exclude<VariableType, number> extends never
    ? typeof SimpleNumber
    : //
    Exclude<VariableType, boolean> extends never
    ? typeof SimpleBoolean
    : //
    Exclude<VariableType, bigint> extends never
    ? typeof SimpleBigInt
    : //
    Exclude<VariableType, symbol> extends never
    ? typeof SimpleSymbol
    : //
    Exclude<VariableType, undefined> extends never
    ? typeof SimpleUndefined
    : //
    Exclude<VariableType, null> extends never
    ? typeof SimpleNull
    : //
    Exclude<VariableType, string | null | undefined> extends never
    ? typeof SimpleStringOptional
    : //
    Exclude<VariableType, number | null | undefined> extends never
    ? typeof SimpleNumberOptional
    : //
    Exclude<VariableType, boolean | null | undefined> extends never
    ? typeof SimpleBooleanOptional
    : //
    Exclude<VariableType, bigint | null | undefined> extends never
    ? typeof SimpleBigIntOptional
    : //
    Exclude<VariableType, symbol | null | undefined> extends never
    ? typeof SimpleSymbolOptional
    : //
    Exclude<
        VariableType,
        VariableType extends unknown[] ? VariableType : never
      > extends never
    ? ReturnType<SimpleArrayType<UnpackArray<VariableType>>>
    : //
      never
  : never;

type TestType = string[];

const templateBad: TypeToTypeof<TestType> = SimpleString;
const templateGood: TypeToTypeof<TestType> = SimpleArray(SimpleString);
const templateGood2: TypeToTypeof<TestType> = SimpleArray(SimpleNumber);

type Thing = Exclude<string, never>;

//     | OptionalPrimitiveCheck<VariableType, number, 'number'>
//     | OptionalPrimitiveCheck<VariableType, string, 'string'>
//     | OptionalPrimitiveCheck<VariableType, boolean, 'boolean'>
//     | OptionalPrimitiveCheck<VariableType, bigint, 'bigint'>
//     | OptionalPrimitiveCheck<VariableType, symbol, 'symbol'>
// : [[any]] extends [VariableType | OptionalType]
// ? Extract<VariableType, OptionalType> extends never
//   ? [TypeofToTemplate<Exclude<UnpackArray<VariableType>, OptionalType>>] // no undefined
//   : [
//       TypeofToTemplate<Exclude<UnpackArray<VariableType>, OptionalType>>,
//       typeof optionalKey
//     ] // undefined and array
// : [Record<keyof VariableType, any>] extends [
//     Record<keyof VariableType, any> | OptionalType
//   ]
// ? Extract<VariableType, OptionalType | null> extends never
//   ? {
//       [Property in keyof VariableType]: TypeofToTemplate<
//         VariableType[Property]
//       >;
//     }
//   : {
//       [Property in keyof VariableType]: TypeofToTemplate<
//         VariableType[Property]
//       >;
//     } & {
//       [optionalKey]: true;
//     }
// : never;

type X = Exclude<string, never>;

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
