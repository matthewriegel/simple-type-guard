import AbstractOptionalPrimitiveValidator from './AbstractOptionalPrimitiveValidator';

class SimpleStringOptional extends AbstractOptionalPrimitiveValidator<'string'> {
  constructor() {
    super('string');
  }
}

export default SimpleStringOptional;
