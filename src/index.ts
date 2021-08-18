import { isObject } from './object';
import { isBasicPrimitiveTypeof } from './primitive';
import { TemplateMap, TypeofToType, TypeofValue, UnpackArray } from './types';

const typeofUnknownValueMatchesTypeofValue = <Type extends TypeofValue>(
  unknownObjectValue: unknown,
  typeofValue: Type
): unknownObjectValue is TypeofToType<Type> =>
  typeof unknownObjectValue === typeofValue;

const typeofArrayItemsMatcheType = <
  ReturnType,
  Type extends TemplateMap<ReturnType>
>(
  unknownObjectValue: unknown,
  type: Type
): unknownObjectValue is TypeofToType<ReturnType>[] => {
  if (!Array.isArray(unknownObjectValue)) {
    return false;
  }

  return unknownObjectValue.every(unknownArrayIndex =>
    unknownMatchesTemplate(unknownArrayIndex, type)
  );
};

// TODO: find more elegant way of doing this
const isArray = (unknownTemplate: unknown): unknownTemplate is [any] =>
  Array.isArray(unknownTemplate);

const unknownMatchesTemplate = <ReturnType>(
  unknownVariable: unknown,
  template: TemplateMap<ReturnType>
): unknownVariable is ReturnType => {
  type PropertyType = Extract<ReturnType, keyof TemplateMap<ReturnType>>;

  if (typeof template === 'function') {
    return template(unknownVariable);
  }

  if (isArray(template)) {
    const value = template[0];
    return typeofArrayItemsMatcheType(
      unknownVariable,
      value as TemplateMap<ReturnType>
    );
  }

  // Unknown object must be of an object type to match the template
  if (!isObject(unknownVariable) && !isObject(template)) {
    return typeof unknownVariable === template;
  } else if (!isObject(unknownVariable)) {
    return false;
  }

  // iterate over every template key
  for (const templateKey in template) {
    if (!template.hasOwnProperty(templateKey)) {
      continue;
    }

    // `templateValue` is either 'string', 'number', 'boolean', 'undefined', 'function' or an object.
    const templateValue = template[templateKey] as PropertyType;
    const unknownObjectValue = unknownVariable[templateKey];

    let propertyMatches: boolean = false;
    if (isBasicPrimitiveTypeof(templateValue)) {
      // If the template value is of primitive typeof, check that it matches
      propertyMatches = typeofUnknownValueMatchesTypeofValue(
        unknownObjectValue,
        templateValue
      );
    } else {
      // If the template value is an object or function, recursively check object's value
      propertyMatches = unknownMatchesTemplate<PropertyType>(
        unknownObjectValue,
        templateValue
      );
    }
    if (!propertyMatches) {
      return false;
    }
  }

  // If all template key|values are included in the unknown object, it matches
  return true;
};

export default unknownMatchesTemplate;
