/// <reference path="global.d.ts" />

import { type Comparator } from '@asod/compare';

declare const ABSTRACT_OPERATION_ID: unique symbol;

type AbstractOperationId = typeof ABSTRACT_OPERATION_ID;

declare namespace ASOD {
  /* Common */

  interface IComparable {
    comparator?: Comparator;
  }

  /* Operation */

  interface IOperationValue extends IComparable {}

  interface IOperation<TValue extends Primitive | IOperationValue> {
    (a: TValue, b: TValue): TValue;
  }

  /* Group */

  interface IGroup<TValue extends Primitive | IOperationValue> {
    [ABSTRACT_OPERATION_ID]: IOperation<TValue>;
  }

  /* Ring */

  // prettier-ignore
  interface IRing<TValue extends Primitive | IOperationValue> extends Omit<IGroup<TValue>, AbstractOperationId> {
    add: IOperation<TValue>;
    mul: IOperation<TValue>;
  }

  /* Field */

  // prettier-ignore
  interface IField<TValue extends Primitive | IOperationValue> extends Omit<IRing<TValue>, AbstractOperationId> {
    sub: IOperation<TValue>;
    div: IOperation<TValue>;
  }
}

export = ASOD;
export as namespace ASOD;
