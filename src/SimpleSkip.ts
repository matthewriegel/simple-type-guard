import AbstractValidator from './AbstractValidator';

class SimpleSkip extends AbstractValidator<unknown> {
  label = 'skipped';

  validate() {
    return true;
  }
}

export default SimpleSkip;
