import ASOD from '@asod/core';

declare module '@asod/core' {
  /**
   * @def `(∀ a, b ∈ F)`: `a + b = b + a`
   * @def `(∀ a, b, c ∈ F)`: `(a + b) + c = a + (b + c)`
   */
  interface IFieldAddOperation<
    TLeftOperand extends Operand<any> = Operand,
    TRightOperand extends Operand<any> = TLeftOperand,
    TResult = TLeftOperand | TRightOperand,
  > extends ICommutativeOperation<TLeftOperand, TRightOperand, TResult>,
      IAssociativeOperation<TLeftOperand, TRightOperand, TResult> {}

  /**
   * @def `(∀ a, b ∈ F)`: `a * b = b * a`
   * @def `(∀ a, b, c ∈ F)`: `(a + b) * c = (a * c) + (b * c)`
   */
  interface IFieldMulOperation<
    TLeftOperand extends Operand<any> = Operand,
    TRightOperand extends Operand<any> = TLeftOperand,
    TResult = TLeftOperand | TRightOperand,
  > extends ICommutativeOperation<TLeftOperand, TRightOperand, TResult>,
      IDistributiveOperation<TLeftOperand, TRightOperand, TResult> {}

  /**
   * @def `(∀ a, b, 𝑒 ∈ F)`: `a - b = 𝑒 - (b - a)`
   * @def `(∀ a, b, c ∈ F)`: `(a - b) * c = (a * c) - (b * c)`
   */
  interface IFieldSubOperation<
    TLeftOperand extends Operand<any> = Operand,
    TRightOperand extends Operand<any> = TLeftOperand,
    TResult = TLeftOperand | TRightOperand,
  > extends IAnticommutativeOperation<TLeftOperand, TRightOperand, TResult>,
      IDistributiveOperation<TLeftOperand, TRightOperand, TResult> {}

  /**
   * @def `(∀ a, b, c ∈ F)`: `(a + b) / c = (a / c) + (b / c)`
   * @def `(∀ a, b, c ∈ F)`: `(a - b) / c = (a / c) - (b / c)`
   */
  interface IFieldDivOperation<
    TLeftOperand extends Operand<any> = Operand,
    TRightOperand extends Operand<any> = TLeftOperand,
    TResult = TLeftOperand | TRightOperand,
  > extends IDistributiveOperation<TLeftOperand, TRightOperand, TResult> {}

  interface IField<
    TElement extends Operand<any> = Operand,
    TAddOperation extends IFieldAddOperation<any> = IFieldAddOperation<TElement>,
    TMulOperation extends IFieldMulOperation<any> = IFieldMulOperation<TElement>,
    TSubOperation extends IFieldSubOperation<any> = IFieldSubOperation<TElement>,
    TDivOperation extends IFieldDivOperation<any> = IFieldDivOperation<TElement>,
  > {
    add: TAddOperation;
    mul: TMulOperation;
    sub: TSubOperation;
    div: TDivOperation;
  }
}

export = ASOD;
export as namespace ASOD;
