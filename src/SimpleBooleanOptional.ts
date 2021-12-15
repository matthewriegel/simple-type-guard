import AbstractOptionalPrimitiveValidator from './AbstractOptionalPrimitiveValidator';

class SimpleBooleanOptional extends AbstractOptionalPrimitiveValidator<'boolean'> {
  readonly label = 'boolean-optional' as const;

  constructor() {
    super('boolean');
  }
}

export default SimpleBooleanOptional;
