import AbstractValidator from './AbstractValidator';

class SimpleFunctionInnerClass extends AbstractValidator<
  (unknownValue: unknown, currentPath?: string) => boolean,
  'function-result'
> {
  label = 'function-result' as const;

  validate(unknownValue: unknown, currentPath: string) {
    return this.parameter(unknownValue, currentPath);
  }
}

export const SimpleFunctionFunction = (
  callback: (unknownValue: unknown, currentPath?: string) => boolean
): SimpleFunctionInnerClass => {
  return new SimpleFunctionInnerClass(callback);
};

export default SimpleFunctionInnerClass;
