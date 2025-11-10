import { compare } from '@asod/compare';

import type ASOD from './core';
import { isComparable } from './utils/guards';

type RingOperationConfig<TValue extends ASOD.Operation.OperationValue> = {
  func: ASOD.Operation.IBinaryOperation<TValue>;
  neutralValue?: TValue;
};

type RingOperationsConfig<TValue extends ASOD.Operation.OperationValue> = {
  add: RingOperationConfig<TValue>;
  mul: RingOperationConfig<TValue>;
};

type RingConfig<TValue extends ASOD.Operation.OperationValue> = {
  operations: RingOperationsConfig<TValue>;
};

class Ring<TValue extends ASOD.Operation.OperationValue> implements ASOD.Ring.IRing<TValue> {
  protected readonly _operations: Readonly<RingOperationsConfig<TValue>>;

  constructor(config: RingConfig<TValue>) {
    this._operations = config.operations;
  }

  add(a: TValue, b: TValue): TValue {
    const { func, neutralValue } = this._operations.add;

    if (neutralValue !== undefined) {
      if (this._areEqual(a, neutralValue)) return b;
      if (this._areEqual(b, neutralValue)) return a;
    }

    return func(a, b);
  }

  mul(a: TValue, b: TValue): TValue {
    const { func, neutralValue } = this._operations.mul;

    if (neutralValue !== undefined) {
      if (this._areEqual(a, neutralValue)) return b;
      if (this._areEqual(b, neutralValue)) return a;
    }

    return func(a, b);
  }

  protected _areEqual(a: TValue, b: TValue): boolean {
    return !this._compare(a, b);
  }

  protected _compare(a: TValue, b: TValue): number {
    if (isComparable(a)) return compare(a, b, (a, b) => a.compare(b));
    if (isComparable(b)) return compare(a, b, (a, b) => b.compare(a));
    return compare(a, b);
  }
}

export { Ring };
export default Ring;
