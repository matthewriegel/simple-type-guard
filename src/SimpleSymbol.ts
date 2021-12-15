import AbstractPrimitiveValidator from './AbstractPrimitiveValidator';

class SimpleSymbol extends AbstractPrimitiveValidator<'symbol'> {
  readonly label = 'symbol' as const;

  constructor() {
    super('symbol');
  }
}

export default SimpleSymbol;
