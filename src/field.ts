import { compare } from '@asod/compare';

import { type Field } from './declarations/index';
import { isComparable } from './utils/guards';

type FieldOperationConfig<TValue extends Field.OperationValue> = {
  func: Field.IOperation<TValue>;
  neutralValue: TValue;
};

type FieldOperationsConfig<TValue extends Field.OperationValue> = {
  add: FieldOperationConfig<TValue>;
  sub: FieldOperationConfig<TValue>;
  mul: FieldOperationConfig<TValue>;
  div: FieldOperationConfig<TValue>;
};

type FieldConfig<TValue extends Field.OperationValue> = {
  operations: FieldOperationsConfig<TValue>;
};

class Field<TValue extends Field.OperationValue>
  implements Field.IField<TValue>
{
  private readonly _operations: Readonly<FieldOperationsConfig<TValue>>;

  constructor(config: FieldConfig<TValue>) {
    this._operations = config.operations;
  }

  add(a: TValue, b: TValue): TValue {
    const { func, neutralValue } = this._operations.add;

    if (!this._compare(a, neutralValue)) return b;
    if (!this._compare(b, neutralValue)) return a;
    return func(a, b);
  }

  sub(a: TValue, b: TValue): TValue {
    const { func, neutralValue } = this._operations.sub;

    if (!this._compare(b, neutralValue)) return a;
    return func(a, b);
  }

  mul(a: TValue, b: TValue): TValue {
    const { func, neutralValue } = this._operations.mul;

    if (!this._compare(a, neutralValue)) return b;
    if (!this._compare(b, neutralValue)) return a;
    return func(a, b);
  }

  div(a: TValue, b: TValue): TValue {
    const { func, neutralValue } = this._operations.div;

    if (!this._compare(b, neutralValue)) return a;
    return func(a, b);
  }

  private _compare(a: TValue, b: TValue) {
    if (isComparable(a)) return compare(a, b, a.comparator);
    if (isComparable(b)) return compare(a, b, b.comparator);
    return compare(a, b);
  }
}

export { Field };
export default Field;
