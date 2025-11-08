import { compare } from '@asod/compare';

import {
  type FieldConfig,
  type FieldOperationsConfig,
  type IField,
  type IOperationValue,
} from './index';

class Field<TValue extends IOperationValue> implements IField<TValue> {
  private readonly _operations: Readonly<FieldOperationsConfig<TValue>>;

  constructor(config: FieldConfig<TValue>) {
    this._operations = config.operations;
  }

  add(a: TValue, b: TValue): TValue {
    const { predicate, neutralValue } = this._operations.add;

    if (!this._compare(a, neutralValue)) return b;
    if (!this._compare(b, neutralValue)) return a;
    return predicate(a, b);
  }

  sub(a: TValue, b: TValue): TValue {
    const { predicate, neutralValue } = this._operations.sub;

    if (!this._compare(b, neutralValue)) return a;
    return predicate(a, b);
  }

  mul(a: TValue, b: TValue): TValue {
    const { predicate, neutralValue } = this._operations.mul;

    if (!this._compare(a, neutralValue)) return b;
    if (!this._compare(b, neutralValue)) return a;
    return predicate(a, b);
  }

  div(a: TValue, b: TValue): TValue {
    const { predicate, neutralValue } = this._operations.div;

    if (!this._compare(b, neutralValue)) return a;
    return predicate(a, b);
  }

  private _compare(a: TValue, b: TValue) {
    if ('comparator' in a) return compare(a, b, a.comparator);
    if ('comparator' in b) return compare(a, b, b.comparator);
    return compare(a, b);
  }
}

export { Field };
export default Field;
