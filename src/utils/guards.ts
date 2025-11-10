import type ASOD from '../core';

export const isComparable = (value: ASOD.Operation.OperationValue): value is Required<ASOD.Operation.IComparable> =>
  typeof value === 'object' && value !== null && 'compare' in value;
