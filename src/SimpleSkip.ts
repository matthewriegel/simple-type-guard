import AbstractValidator from './AbstractValidator';

class SimpleSkip extends AbstractValidator<unknown, 'skipped'> {
  readonly label = 'skipped' as const;

  validate() {
    return true;
  }
}

export default SimpleSkip;
