import getValidationErrors from './getValidationErrors';

describe('getValidationErrors', () => {
  const INVALID_VALUE = 'invalid value';
  const VALID_VALUE = 'valid value';
  const INVALID_VALUE_MESSAGE = 'please enter a valid value';
  const dummyValidatorImplementation = (v: string): string | null =>
    v === INVALID_VALUE ? INVALID_VALUE_MESSAGE : null;

  it('detects validation errors, returns as a string under the value name', () => {
    const values = {
      value1: INVALID_VALUE,
    };
    const dummyValidator = jest.fn(dummyValidatorImplementation);
    const validators = {
      value1: [dummyValidator],
    };

    const result = getValidationErrors(values, validators);

    expect(dummyValidator).toHaveBeenCalledTimes(1);
    expect(result.value1).toBe(INVALID_VALUE_MESSAGE);
  });

  it('passes valid values, returns null under the value name', () => {
    const values = {
      value1: VALID_VALUE,
    };
    const dummyValidator = jest.fn(dummyValidatorImplementation);
    const validators = {
      value1: [dummyValidator],
    };

    const result = getValidationErrors(values, validators);

    expect(dummyValidator).toHaveBeenCalledTimes(1);
    expect(result.value1).toBeNull();
  });

  it('passes first validator, fails second - returns econd validation error', () => {
    const values = {
      value1: 'fail on second go',
    };
    const dummyValidatorA = jest.fn(dummyValidatorImplementation);
    const dummyValidatorB = jest.fn((v: any): string | null =>
      v === 'fail on second go' ? 'failed on second go' : null,
    );
    const validators = {
      value1: [dummyValidatorA, dummyValidatorB],
    };

    const result = getValidationErrors(values, validators);

    expect(dummyValidatorA).toHaveBeenCalledTimes(1);
    expect(dummyValidatorB).toHaveBeenCalledTimes(1);
    expect(result.value1).toBe('failed on second go');
  });
});
