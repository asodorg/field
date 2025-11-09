import ASOD from '@asod/core';

declare module '@asod/core' {
  namespace Operation {
    interface IComparable {
      comparator?: ASOD.Comparator;
    }

    interface IOperationObjectValue extends IComparable {}

    type OperationValue = Primitive | IOperationObjectValue;

    interface IOperation<TValue extends OperationValue> {
      (...values: [TValue, ...TValue[]]): TValue;
    }

    interface IBinaryOperation<TValue extends OperationValue>
      extends IOperation<TValue> {
      (a: TValue, b: TValue): TValue;
    }
  }

  namespace Ring {
    interface IRing<TValue extends OperationValue> {
      add: IOperation<TValue>;
      mul: IOperation<TValue>;
    }
  }

  namespace Field {
    interface IField<TValue extends OperationValue> extends IRing<TValue> {
      sub: IOperation<TValue>;
      div: IOperation<TValue>;
    }
  }
}

export = ASOD;
export as namespace ASOD;
