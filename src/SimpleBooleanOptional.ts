import AbstractOptionalPrimitiveValidator from './AbstractOptionalPrimitiveValidator';

class SimpleBooleanOptional extends AbstractOptionalPrimitiveValidator<'boolean'> {
  constructor() {
    super('boolean');
  }
}

export default SimpleBooleanOptional;
