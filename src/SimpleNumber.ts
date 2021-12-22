import AbstractPrimitiveValidator from './AbstractPrimitiveValidator';

class SimpleNumber extends AbstractPrimitiveValidator<'number'> {
  readonly label = 'number' as const;

  constructor() {
    super('number');
  }
}

export default SimpleNumber;
