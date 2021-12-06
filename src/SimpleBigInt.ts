import AbstractPrimitiveValidator from './AbstractPrimitiveValidator';
import AbstractValidator from './AbstractValidator';

class SimpleBigInt extends AbstractPrimitiveValidator<'bigint'> {
  constructor() {
    super('bigint');
  }
}

export default SimpleBigInt;
