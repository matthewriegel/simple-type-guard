import AbstractOptionalPrimitiveValidator from './AbstractOptionalPrimitiveValidator';

class SimpleNumberOptional extends AbstractOptionalPrimitiveValidator<'number'> {
  constructor() {
    super('number');
  }
}

export default SimpleNumberOptional;
