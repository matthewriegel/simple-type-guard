import AbstractOptionalPrimitiveValidator from './AbstractOptionalPrimitiveValidator';

class SimpleBigIntOptional extends AbstractOptionalPrimitiveValidator<'bigint'> {
  constructor() {
    super('bigint');
  }
}

export default SimpleBigIntOptional;
