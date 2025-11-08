import { type Comparator } from '@asod/compare';

declare namespace ASOD {
  /* Operation */

  interface IOperationValue {
    comparator?: Comparator; //
  }

  interface IOperation<TValue extends IOperationValue> {
    (a: TValue, b: TValue): TValue;
  }

  /* Field */

  type FieldOperationConfig<TValue extends IOperationValue> = {
    predicate: IOperation<TValue>;
    neutralValue: TValue;
  };

  type FieldOperationsConfig<TValue extends IOperationValue> = {
    add: FieldOperationConfig<TValue>;
    sub: FieldOperationConfig<TValue>;
    mul: FieldOperationConfig<TValue>;
    div: FieldOperationConfig<TValue>;
  };

  type FieldConfig<TValue extends IOperationValue> = {
    operations: FieldOperationsConfig<TValue>;
  };

  interface IFieldConstructor<TValue extends IOperationValue> {
    new (config: FieldConfig<TValue>): IField<TValue>;
  }

  interface IField<TValue extends IOperationValue> {
    add: IOperation<TValue>;
    sub: IOperation<TValue>;
    mul: IOperation<TValue>;
    div: IOperation<TValue>;
  }
}

export = ASOD;
export as namespace ASOD;
