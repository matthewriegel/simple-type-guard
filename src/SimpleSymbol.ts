import AbstractPrimitiveValidator from './AbstractPrimitiveValidator';
import AbstractValidator from './AbstractValidator';

class SimpleSymbol extends AbstractPrimitiveValidator<'symbol'> {
  constructor() {
    super('symbol');
  }
}

export default SimpleSymbol;
