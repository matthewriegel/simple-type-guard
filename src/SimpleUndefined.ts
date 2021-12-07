import AbstractPrimitiveValidator from './AbstractPrimitiveValidator';

class SimpleUndefined extends AbstractPrimitiveValidator<'undefined'> {
  public static isPrimitive = true;

  constructor() {
    super('undefined');
  }
}

export default SimpleUndefined;
