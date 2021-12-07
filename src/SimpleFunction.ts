import AbstractValidator from './AbstractValidator';

class SimpleFunctionInnerClass extends AbstractValidator<
  (item: unknown) => boolean
> {
  label = 'function result';

  validate(unknownVariable: unknown) {
    return this.parameter(unknownVariable);
  }
}

export const SimpleFunctionFunction = (
  callback: (item: unknown) => boolean
) => {
  return new SimpleFunctionInnerClass(callback);
};

export default SimpleFunctionInnerClass;
