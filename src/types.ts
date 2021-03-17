export type TypeofToType<T> = T extends 'number'
  ? number
  : T extends 'string'
  ? string
  : T extends 'boolean'
  ? boolean
  : T extends 'undefined'
  ? undefined
  : never;

type TypeToTypeof<T> = T extends number
  ? 'number'
  : T extends string
  ? 'string'
  : T extends boolean
  ? 'boolean'
  : T extends undefined
  ? 'undefined'
  : TemplateMap<T>;

export type TypeofValue = 'string' | 'number' | 'boolean' | 'undefined';

export type TemplateMap<ReturnType> = {
  [Property in keyof ReturnType]: TypeToTypeof<ReturnType[Property]>;
};
