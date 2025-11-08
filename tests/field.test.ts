import { IOperation } from '../src/declarations';
import { Field } from '../src/field';

describe('operations', () => {
  let add: IOperation<number>;
  let sub: IOperation<number>;
  let mul: IOperation<number>;
  let div: IOperation<number>;

  let numbers: Field<number>;

  beforeEach(() => {
    add = jest.fn((a, b) => a + b);
    sub = jest.fn((a, b) => a - b);
    mul = jest.fn((a, b) => a * b);
    div = jest.fn((a, b) => a / b);

    numbers = new Field<number>({
      operations: {
        add: { func: add, neutralValue: 0 },
        sub: { func: sub, neutralValue: 0 },
        mul: { func: mul, neutralValue: 1 },
        div: { func: div, neutralValue: 1 },
      },
    });
  });

  it('should add a values', () => {
    expect(numbers.add(1, 5)).toBe(6);
    expect(numbers.add(1, 0)).toBe(1);
    expect(numbers.add(0, 1)).toBe(1);
  });

  it('should not call an add operation function for a right neutral value', () => {
    numbers.add(1, 0);

    expect(add).toHaveBeenCalledTimes(0);
  });

  it('should not call an add operation function for a left neutral value', () => {
    numbers.add(0, 1);

    expect(add).toHaveBeenCalledTimes(0);
  });

  it('should subtract a values', () => {
    expect(numbers.sub(1, 5)).toBe(-4);
    expect(numbers.sub(1, 0)).toBe(1);
    expect(numbers.sub(0, 1)).toBe(-1);
  });

  it('should not call a subtract operation function for a right neutral value', () => {
    numbers.sub(1, 0);

    expect(sub).toHaveBeenCalledTimes(0);
  });

  it('should call a subtract operation function for a left neutral value', () => {
    numbers.sub(0, 1);

    expect(sub).toHaveBeenCalledTimes(1);
  });

  it('should multiply a values', () => {
    expect(numbers.mul(4, 5)).toBe(20);
    expect(numbers.mul(1, 5)).toBe(5);
    expect(numbers.mul(5, 1)).toBe(5);
  });

  it('should not call a multiply operation function for a right neutral value', () => {
    numbers.mul(5, 1);

    expect(mul).toHaveBeenCalledTimes(0);
  });

  it('should not call a multiply operation function for a left neutral value', () => {
    numbers.mul(1, 5);

    expect(mul).toHaveBeenCalledTimes(0);
  });

  it('should divide a values', () => {
    expect(numbers.div(20, 5)).toBe(4);
    expect(numbers.div(5, 1)).toBe(5);
    expect(numbers.div(1, 5)).toBe(0.2);
  });

  it('should not call a divide operation function for a right neutral value', () => {
    numbers.div(5, 1);

    expect(div).toHaveBeenCalledTimes(0);
  });

  it('should call a divide operation function for a left neutral value', () => {
    numbers.div(1, 5);

    expect(div).toHaveBeenCalledTimes(1);
  });
});
