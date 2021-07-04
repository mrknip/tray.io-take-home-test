type ValidatorMap = {
  [validatorName: string]: { (value: any): string | null }[];
};

const getValidationErrors = (
  values: Record<string, any>,
  validators: ValidatorMap,
): Record<string, any> => {
  const validationErrors: Record<string, any> = {};

  Object.keys(values).forEach((valueName) => {
    const pageValue = values[valueName];
    if (validators[valueName]) {
      const errorsForValue = validators[valueName].map((validate) =>
        validate(pageValue),
      );

      validationErrors[valueName] =
        errorsForValue.filter((error) => error !== null)[0] || null;
    }
  });

  return validationErrors;
};

export default getValidationErrors;
