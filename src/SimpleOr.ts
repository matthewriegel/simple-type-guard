import AbstractValidator from './AbstractValidator';
import { getMessageFromUnknownErrorOrBlank } from './helpers';
import SimpleBoolean from './SimpleBoolean';
import { TypeofToTemplate } from './types';
import { unknownMatchesTemplate } from './unknownMatchesTemplate';

type BreakInToTuple<Type> = Type extends infer A ? [A] : never;

type FilterAndIterate<
  FullType,
  Filter extends unknown[],
  Collection extends unknown[]
> =
  // If: the remaining type after filtering is 'never'
  [Exclude<FullType, Filter[number]>] extends [never]
    ? // Return: the collection we have
      Collection
    : // Else: Remove another iteration
      BreakUnionIntoTemplateList<
        // Run filter on FullType
        Exclude<FullType, Filter[number]>,
        Filter,
        Collection
      >;

type BreakUnionIntoTemplateList<
  FullType,
  Filter extends unknown[] = [],
  Collection extends unknown[] = []
> =
  // Assign: Full type into list of individual type tuples
  // (ie. "string | number" => "[string] | [number]")
  BreakInToTuple<FullType> extends infer Individual
    ? // ensure our individual type is of tuple (make TS happy - we know it's already a tuple)
      Individual extends [unknown]
      ? FilterAndIterate<
          FullType,
          // Combine current filter and new filter type
          [...Individual, ...Filter],
          // Apply TypeofTemplate and add to collection
          [TypeofToTemplate<Individual[number]>, ...Collection]
        >
      : never
    : never;

type ConvertSimpleOr<FullType> =
  // Check for the existance of boolean
  [Extract<FullType, boolean>] extends [never]
    ? // If there is no boolean, continue as normal
      BreakUnionIntoTemplateList<FullType>
    : // Booleans are weird and will be broken into "true | false" instead of just "boolean"
      // so we check for "boolean" and filter it out early.
      //
      // Unfortunately, this means that Boolean must always occur at the end.
      BreakUnionIntoTemplateList<
        Exclude<FullType, boolean>,
        [boolean],
        [typeof SimpleBoolean]
      >;

class SimpleOr<
  Type,
  ConvertedType extends ConvertSimpleOr<Type> = ConvertSimpleOr<Type>
> extends AbstractValidator<ConvertedType, 'or'> {
  readonly label = 'or' as const;

  constructor(...parameters: ConvertedType) {
    super(parameters);
  }

  validate(unknownValue: unknown, currentPath: string) {
    const errors: unknown[] = [];
    const result = (this.parameter as unknown[]).some((template): boolean => {
      try {
        return unknownMatchesTemplate<Type>(
          unknownValue,
          template as ConvertedType[number],
          currentPath
        );
      } catch (error) {
        errors.push(error);
        return false;
      }
    });

    if (!result) {
      const combinedMessages = errors
        .map(getMessageFromUnknownErrorOrBlank)
        .join('\n');

      throw new Error(combinedMessages);
    }

    return result;
  }
}

export default SimpleOr;
