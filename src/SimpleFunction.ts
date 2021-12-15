import AbstractValidator from './AbstractValidator';

class SimpleFunctionInnerClass extends AbstractValidator<
  any,
  'function-result'
> {
  label = 'function-result' as const;

  validate(unknownVariable: unknown) {
    return this.parameter(unknownVariable);
  }
}

export const SimpleFunctionFunction = (
  callback: (item: unknown) => boolean
): SimpleFunctionInnerClass => {
  return new SimpleFunctionInnerClass(callback);
};

export default SimpleFunctionInnerClass;
