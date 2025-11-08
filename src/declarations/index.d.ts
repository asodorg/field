/// <reference path="global.d.ts" />

import ASOD from '@asod/core';
import { type Comparator } from '@asod/compare';

declare const ABSTRACT_OPERATION_ID: unique symbol;

type AbstractOperationId = typeof ABSTRACT_OPERATION_ID;

declare module '@asod/core' {
  namespace Field {
    /* Common */

    interface IComparable {
      comparator?: Comparator;
    }

    /* Operation */

    interface IOperationValue extends IComparable {}

    type OperationValue = Primitive | IOperationValue;

    interface IOperation<TValue extends OperationValue> {
      (a: TValue, b: TValue): TValue;
    }

    /* Group */

    interface IGroup<TValue extends OperationValue> {
      [ABSTRACT_OPERATION_ID]: IOperation<TValue>;
    }

    /* Ring */

    // prettier-ignore
    interface IRing<TValue extends OperationValue> extends Omit<IGroup<TValue>, AbstractOperationId> {
      add: IOperation<TValue>;
      mul: IOperation<TValue>;
    }

    /* Field */

    // prettier-ignore
    interface IField<TValue extends OperationValue> extends Omit<IRing<TValue>, AbstractOperationId> {
      sub: IOperation<TValue>;
      div: IOperation<TValue>;
    }
  }
}

export = ASOD;
export as namespace ASOD;
