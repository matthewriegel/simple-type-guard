import AbstractValidator from './AbstractValidator';
import { handleResult } from './unknownMatchesTemplate';

class SimpleExactMatch<Type> extends AbstractValidator<Type[], 'exact-match'> {
  readonly label = 'exact-match' as const;

  constructor(...template: Type[]) {
    super(template);
  }

  validate(unknownValue: unknown, currentPath: string) {
    return handleResult(
      this.parameter.some(parameter => parameter === unknownValue),
      unknownValue,
      this.label,
      currentPath
    );
  }
}

export default SimpleExactMatch;
