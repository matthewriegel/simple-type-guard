export type TypeofToType<T> = T extends 'number'
  ? number
  : T extends 'string'
  ? string
  : T extends 'boolean'
  ? boolean
  : T extends 'undefined'
  ? undefined
  : never;

type FunctionalComparison = (item: unknown) => boolean;

type TypeToTypeof<T, Continued> = T extends number
  ? 'number'
  : T extends string
  ? 'string'
  : T extends boolean
  ? 'boolean'
  : T extends undefined
  ? 'undefined'
  : Continued;

export type TypeofValue = 'string' | 'number' | 'boolean' | 'undefined';

export type TemplateMap<ReturnType> =
  | TypeToTypeof<
      ReturnType,
      {
        [Property in keyof ReturnType]: TemplateMap<ReturnType[Property]>;
      }
    >
  | FunctionalComparison;
