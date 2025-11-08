import { type Field } from '../declarations/index';

export const isComparable = (
  value: Field.OperationValue,
): value is Field.IComparable =>
  typeof value === 'object' && value !== null && 'comparable' in value;
