import AbstractValidator from './AbstractValidator';

class SimpleFunction extends AbstractValidator<
  (unknownValue: unknown, currentPath: string) => boolean,
  'function-result'
> {
  label = 'function-result' as const;

  validate(unknownValue: unknown, currentPath: string) {
    return this.parameter(unknownValue, currentPath);
  }
}

export default SimpleFunction;
