import AbstractPrimitiveValidator from './AbstractPrimitiveValidator';

class SimpleBoolean extends AbstractPrimitiveValidator<'boolean'> {
  readonly label = 'boolean' as const;

  constructor() {
    super('boolean');
  }
}

export default SimpleBoolean;
