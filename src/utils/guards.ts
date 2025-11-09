import type ASOD from '../core';

export const isComparable = (value: ASOD.Operation.OperationValue): value is ASOD.Operation.IComparable =>
  typeof value === 'object' && value !== null && 'comparable' in value;
