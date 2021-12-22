abstract class AbstractValidator<Type, Differentiator extends string> {
  protected abstract readonly label: Differentiator;

  protected parameter: Type;

  constructor(_parameter: Type) {
    this.parameter = _parameter;
  }

  public abstract validate(unknownValue: unknown, currentPath: string): boolean;
}

export default AbstractValidator;
