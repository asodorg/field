import { IComparable, IOperationValue } from '../declarations/index';

export const isComparable = (
  value: Primitive | IOperationValue,
): value is IComparable =>
  typeof value === 'object' && value !== null && 'comparable' in value;
