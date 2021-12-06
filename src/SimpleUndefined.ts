import AbstractPrimitiveValidator from './AbstractPrimitiveValidator';
import AbstractValidator from './AbstractValidator';

class SimpleUndefined extends AbstractPrimitiveValidator<'undefined'> {
  constructor() {
    super('undefined');
  }
}

export default SimpleUndefined;
