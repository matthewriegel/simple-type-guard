import AbstractValidator from './AbstractValidator';

class SimpleSkip extends AbstractValidator<unknown, 'skipped'> {
  readonly label = 'skipped' as const;

  // eslint-disable-next-line class-methods-use-this
  validate() {
    return true;
  }
}

export default SimpleSkip;
