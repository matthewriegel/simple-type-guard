import AbstractPrimitiveValidator from './AbstractPrimitiveValidator';

class SimpleUndefined extends AbstractPrimitiveValidator<'undefined'> {
  readonly label = 'undefined' as const;

  constructor() {
    super('undefined');
  }
}

export default SimpleUndefined;
