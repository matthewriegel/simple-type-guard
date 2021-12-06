import AbstractPrimitiveValidator from './AbstractPrimitiveValidator';
import AbstractValidator from './AbstractValidator';

class SimpleNumber extends AbstractPrimitiveValidator<'number'> {
  constructor() {
    super('number');
  }
}

export default SimpleNumber;
