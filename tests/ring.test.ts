import type ASOD from '../src/core';
import { Ring } from '../src/ring';

describe('operations', () => {
  let add: ASOD.Operation.IBinaryOperation<number>;
  let mul: ASOD.Operation.IBinaryOperation<number>;

  let numbers: Ring<number>;

  beforeEach(() => {
    add = jest.fn((a, b) => a + b);
    mul = jest.fn((a, b) => a * b);

    numbers = new Ring<number>({
      operations: {
        add: { func: add, neutralValue: 0 },
        mul: { func: mul, neutralValue: 1 },
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
});
