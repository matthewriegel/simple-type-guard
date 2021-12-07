import { Options } from './types';

abstract class AbstractValidator<Type> {
  protected parameter: Type;

  constructor(_parameter: Type) {
    this.parameter = _parameter;
  }

  public abstract validate(
    unknownValue: unknown,
    options: Options,
    currentPath: string
  ): boolean;

  abstract get label(): string;
}

export default AbstractValidator;
