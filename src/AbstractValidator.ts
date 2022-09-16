abstract class AbstractValidator<
  TypeofTemplateType,
  Differentiator extends string
> {
  protected abstract readonly label: Differentiator;

  protected parameter: TypeofTemplateType;

  constructor(_parameter: TypeofTemplateType) {
    this.parameter = _parameter;
  }

  public abstract validate(unknownValue: unknown, currentPath: string): boolean;
}

export default AbstractValidator;
