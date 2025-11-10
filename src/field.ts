import type ASOD from './core';
import { Ring } from './ring';

type FieldOperationConfig<TValue extends ASOD.Operation.OperationValue> = {
  func: ASOD.Operation.IBinaryOperation<TValue>;
  neutralValue?: TValue;
};

type FieldOperationsConfig<TValue extends ASOD.Operation.OperationValue> = {
  add: FieldOperationConfig<TValue>;
  sub: FieldOperationConfig<TValue>;
  mul: FieldOperationConfig<TValue>;
  div: FieldOperationConfig<TValue>;
};

type FieldConfig<TValue extends ASOD.Operation.OperationValue> = {
  operations: FieldOperationsConfig<TValue>;
};

class Field<TValue extends ASOD.Operation.OperationValue> extends Ring<TValue> implements ASOD.Field.IField<TValue> {
  protected readonly _operations: Readonly<FieldOperationsConfig<TValue>>;

  constructor(config: FieldConfig<TValue>) {
    super(config);

    this._operations = config.operations;
  }

  sub(a: TValue, b: TValue): TValue {
    const { func, neutralValue } = this._operations.sub;

    if (neutralValue !== undefined && this._areEqual(b, neutralValue)) return a;
    return func(a, b);
  }

  div(a: TValue, b: TValue): TValue {
    const { func, neutralValue } = this._operations.div;

    if (neutralValue !== undefined && this._areEqual(b, neutralValue)) return a;
    return func(a, b);
  }
}

export { Field };
export default Field;
