import { compare } from '@asod/compare';

import type ASOD from './core';
import { isComparable } from './utils/guards';

type RingOperationConfig<TValue extends ASOD.Operation.OperationValue> = {
  func: ASOD.Operation.IBinaryOperation<TValue>;
  neutralValue: TValue;
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

    if (!this._compare(a, neutralValue)) return b;
    if (!this._compare(b, neutralValue)) return a;
    return func(a, b);
  }

  mul(a: TValue, b: TValue): TValue {
    const { func, neutralValue } = this._operations.mul;

    if (!this._compare(a, neutralValue)) return b;
    if (!this._compare(b, neutralValue)) return a;
    return func(a, b);
  }

  protected _compare(a: TValue, b: TValue) {
    if (isComparable(a)) return compare(a, b, a.comparator);
    if (isComparable(b)) return compare(a, b, b.comparator);
    return compare(a, b);
  }
}

export { Ring };
export default Ring;
