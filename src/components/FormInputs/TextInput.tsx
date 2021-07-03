import React from 'react';
import {
  TextInputContainer,
  TextInputLabel,
  RequiredIndicator,
  TextInputField,
} from './TextInput.styled';

interface TextInputProps {
  /**  Input's current value */
  value: string;
  /**  Input change handler */
  onChange: (value: string) => void;
  /**  User-facing label for the input */
  label: string;
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
  inputType = 'text',
  isRequired = false,
  id,
}: TextInputProps) => {
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
      />
    </TextInputContainer>
  );
};

export default TextInput;
