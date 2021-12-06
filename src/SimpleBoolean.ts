import AbstractPrimitiveValidator from './AbstractPrimitiveValidator';
import AbstractValidator from './AbstractValidator';

class SimpleBoolean extends AbstractPrimitiveValidator<'boolean'> {
  constructor() {
    super('boolean');
  }
}

export default SimpleBoolean;
