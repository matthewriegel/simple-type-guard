import AbstractValidator from './AbstractValidator';

class SimpleSkip extends AbstractValidator<any> {
  label = 'skipped';

  validate() {
    return true;
  }
}

export default SimpleSkip;
