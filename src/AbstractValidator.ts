import { Options } from './types';

abstract class AbstractValidator<Type, Differentiator extends string> {
  protected abstract readonly label: Differentiator;

  protected parameter: Type;

  constructor(_parameter: Type) {
    this.parameter = _parameter;
  }

  public abstract validate(
    unknownValue: unknown,
    options: Options,
    currentPath: string
  ): boolean;
}

export default AbstractValidator;
