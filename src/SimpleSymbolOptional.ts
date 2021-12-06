import AbstractOptionalPrimitiveValidator from './AbstractOptionalPrimitiveValidator';

class SimpleSymbolOptional extends AbstractOptionalPrimitiveValidator<'symbol'> {
  constructor() {
    super('symbol');
  }
}

export default SimpleSymbolOptional;
