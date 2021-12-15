import AbstractPrimitiveValidator from './AbstractPrimitiveValidator';

class SimpleBigInt extends AbstractPrimitiveValidator<'bigint'> {
  readonly label = 'bigint' as const;

  constructor() {
    super('bigint');
  }
}

export default SimpleBigInt;
