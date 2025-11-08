import foo from '../src';

describe('module', () => {
  it('should be exported', () => {
    expect(typeof foo).toBe('function');
  });
});
