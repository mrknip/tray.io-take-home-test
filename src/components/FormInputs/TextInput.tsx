import React from 'react';
import {
  TextInputContainer,
  TextInputLabel,
  RequiredIndicator,
  TextInputField,
  ErrorMessage,
} from './TextInput.styled';

interface TextInputProps {
  /**  Input's current value */
  value: string;
  /**  Input change handler */
  onChange: (value: string) => void;
  /**  User-facing label for the input */
  label: string;
  /** Warning message to user - typically for failed validation */
  errorMessage: string;
  /**  Flag to set input as required field */
  isRequired?: boolean;
  /**  Flag to toggle text input type */
  inputType?: 'email' | 'password' | 'text';
  /**  Used to differentiate form inputs for aria labels */
  id: string;
}

const TextInput = ({
  value,
  onChange,
  label,
  errorMessage,
  inputType = 'text',
  isRequired = false,
  id,
}: TextInputProps) => {
  const hasError = !!errorMessage;

  return (
    <TextInputContainer>
      <TextInputLabel htmlFor={id}>
        {label}
        {isRequired && <RequiredIndicator>*</RequiredIndicator>}
      </TextInputLabel>
      <TextInputField
        id={id}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        type={inputType}
        required={isRequired}
        hasError={hasError}
      />
      {hasError && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </TextInputContainer>
  );
};

export default TextInput;
