import AbstractOptionalPrimitiveValidator from './AbstractOptionalPrimitiveValidator';

class SimpleStringOptional extends AbstractOptionalPrimitiveValidator<'string'> {
  readonly label = 'string-optional' as const;

  constructor() {
    super('string');
  }
}

export default SimpleStringOptional;
