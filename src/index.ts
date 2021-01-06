const simpleTypeGuard = (unknownVariable: unknown, template: any) =>
  typeof unknownVariable === template;

export default simpleTypeGuard;
