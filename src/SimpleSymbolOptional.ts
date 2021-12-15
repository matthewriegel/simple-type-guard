import AbstractOptionalPrimitiveValidator from './AbstractOptionalPrimitiveValidator';

class SimpleSymbolOptional extends AbstractOptionalPrimitiveValidator<'symbol'> {
  readonly label = 'symbol-optional' as const;

  constructor() {
    super('symbol');
  }
}

export default SimpleSymbolOptional;
