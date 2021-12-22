import AbstractOptionalPrimitiveValidator from './AbstractOptionalPrimitiveValidator';

class SimpleBigIntOptional extends AbstractOptionalPrimitiveValidator<'bigint'> {
  readonly label = 'bigint-optional' as const;

  constructor() {
    super('bigint');
  }
}

export default SimpleBigIntOptional;
