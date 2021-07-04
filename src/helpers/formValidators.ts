export const isNotEmpty = (value: string): null | string => {
  if (value && value.length > 0) {
    return null;
  }

  return 'Please fill out this required field';
};

export const isValidEmail = (value: string): null | string => {
  // For transparency - stolen from this particular here https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

  if (!value || !value.length) {
    return null;
  }

  if (emailRegex.test(value)) {
    return null;
  }

  return 'Please enter a valid email address';
};

export const isValidPassword = (value: string): null | string => {
  const errors: Record<string, boolean> = {
    length: false,
    digit: false,
    case: false,
  };

  const errorMessages: Record<string, string> = {
    length: 'at least 9 characters',
    digit: 'at least one number',
    case: 'both upper and lower case letters',
  };

  if (!value || !value.length) {
    return null;
  }

  if (value.length < 9) {
    errors.length = true;
  }

  if (!/[0-9]/.test(value)) {
    errors.digit = true;
  }

  if (!(/[A-Z]/.test(value) && /[a-z]/.test(value))) {
    errors.case = true;
  }

  if (!Object.values(errors).includes(true)) {
    return null;
  }

  const validationMessageParts: string[] = [];
  Object.keys(errors).forEach((errorType) => {
    if (errors[errorType]) {
      validationMessageParts.push(errorMessages[errorType]);
    }
  });

  let validationMessage = 'Please enter a password containing ';

  if (validationMessageParts.length === 1) {
    validationMessage += validationMessageParts[0];
  } else {
    validationMessage += validationMessageParts
      .slice(0, validationMessageParts.length - 1)
      .join(', ');
    validationMessage +=
      ' and ' + validationMessageParts[validationMessageParts.length - 1];
  }

  return validationMessage;
};
