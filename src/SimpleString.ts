import AbstractPrimitiveValidator from './AbstractPrimitiveValidator';
import AbstractValidator from './AbstractValidator';

class SimpleString extends AbstractPrimitiveValidator<'string'> {
  constructor() {
    super('string');
  }
}

export default SimpleString;
