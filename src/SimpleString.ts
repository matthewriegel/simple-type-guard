import AbstractPrimitiveValidator from './AbstractPrimitiveValidator';

class SimpleString extends AbstractPrimitiveValidator<'string'> {
  readonly label = 'string' as const;

  constructor() {
    super('string');
  }
}

export default SimpleString;
