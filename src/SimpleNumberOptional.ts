import AbstractOptionalPrimitiveValidator from './AbstractOptionalPrimitiveValidator';

class SimpleNumberOptional extends AbstractOptionalPrimitiveValidator<'number'> {
  readonly label = 'number-optional' as const;

  constructor() {
    super('number');
  }
}

export default SimpleNumberOptional;
