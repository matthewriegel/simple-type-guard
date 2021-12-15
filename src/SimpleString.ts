import AbstractPrimitiveValidator from './AbstractPrimitiveValidator';

class SimpleString extends AbstractPrimitiveValidator<'string'> {
  type = 'string';

  constructor() {
    super('string');
  }
}

export default SimpleString;
