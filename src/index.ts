import type ASOD from './core';
import { isIdentityOperand, isNeutralOperand } from '@asod/core/utils';

type FieldOperationsConfig<
  TAddOperation extends ASOD.IFieldAddOperation<any> = ASOD.IFieldAddOperation,
  TMulOperation extends ASOD.IFieldMulOperation<any> = ASOD.IFieldMulOperation,
  TSubOperation extends ASOD.IFieldSubOperation<any> = ASOD.IFieldSubOperation,
  TDivOperation extends ASOD.IFieldDivOperation<any> = ASOD.IFieldDivOperation,
> = {
  add: TAddOperation;
  mul: TMulOperation;
  sub: TSubOperation;
  div: TDivOperation;
};

type FieldConfig<
  TAddOperation extends ASOD.IFieldAddOperation<any> = ASOD.IFieldAddOperation,
  TMulOperation extends ASOD.IFieldMulOperation<any> = ASOD.IFieldMulOperation,
  TSubOperation extends ASOD.IFieldSubOperation<any> = ASOD.IFieldSubOperation,
  TDivOperation extends ASOD.IFieldDivOperation<any> = ASOD.IFieldDivOperation,
> = {
  operations: FieldOperationsConfig<TAddOperation, TMulOperation, TSubOperation, TDivOperation>;
};

class Field<
  TElement extends ASOD.Operand<any> = ASOD.Operand,
  TAddOperation extends ASOD.IFieldAddOperation<any> = ASOD.IFieldAddOperation<TElement>,
  TMulOperation extends ASOD.IFieldMulOperation<any> = ASOD.IFieldMulOperation<TElement>,
  TSubOperation extends ASOD.IFieldSubOperation<any> = ASOD.IFieldSubOperation<TElement>,
  TDivOperation extends ASOD.IFieldDivOperation<any> = ASOD.IFieldDivOperation<TElement>,
> implements ASOD.IField<TElement, TAddOperation, TMulOperation, TSubOperation, TDivOperation>
{
  protected readonly _implementations: Readonly<FieldOperationsConfig<TAddOperation, TMulOperation, TSubOperation, TDivOperation>>;

  readonly add: TAddOperation;
  readonly mul: TMulOperation;
  readonly sub: TSubOperation;
  readonly div: TDivOperation;

  constructor(config: FieldConfig<TAddOperation, TMulOperation, TSubOperation, TDivOperation>) {
    this._implementations = config.operations;

    this.add = this._add as TAddOperation;
    this.mul = this._mul as TMulOperation;
    this.sub = this._sub as TSubOperation;
    this.div = this._div as TDivOperation;
  }

  private _add(a: ASOD.Operand, b: ASOD.Operand): unknown {
    if (isNeutralOperand(a)) return b;
    if (isNeutralOperand(b)) return a;
    return this._implementations.add(a, b);
  }

  private _mul(a: ASOD.Operand, b: ASOD.Operand): unknown {
    if (isIdentityOperand(a)) return b;
    if (isIdentityOperand(b)) return a;
    return this._implementations.mul(a, b);
  }

  private _sub(a: ASOD.Operand, b: ASOD.Operand): unknown {
    if (isNeutralOperand(b)) return a;
    return this._implementations.sub(a, b);
  }

  private _div(a: ASOD.Operand, b: ASOD.Operand): unknown {
    if (isIdentityOperand(b)) return a;
    return this._implementations.div(a, b);
  }
}

export { Field };
export default Field;
