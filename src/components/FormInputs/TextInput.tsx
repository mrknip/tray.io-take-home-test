import React, { useState } from 'react';
import { TextInputContainer } from './TextInput.styled';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  isRequired?: boolean;
}

const TextInput = ({
  value,
  onChange,
  label,
  isRequired = false,
}: TextInputProps) => {
  return (
    <TextInputContainer>
      <div>
        {label}
        {isRequired && <span>*</span>}
      </div>
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </TextInputContainer>
  );
};

export default TextInput;
