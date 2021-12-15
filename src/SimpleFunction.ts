import AbstractValidator from './AbstractValidator';

class SimpleFunctionInnerClass extends AbstractValidator<any> {
  label = 'function result';

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
