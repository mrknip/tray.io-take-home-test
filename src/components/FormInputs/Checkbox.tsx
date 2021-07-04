import React from 'react';
import {
  CheckboxInput,
  CheckBoxLabel,
  CheckboxContainer,
} from './Checkbox.styled';

interface CheckboxProps {
  value: boolean;
  label: string;
  onChange: (newValue: boolean) => void;
}

const Checkbox = ({ value, label, onChange }: CheckboxProps) => (
  <CheckboxContainer>
    <CheckboxInput onClick={() => onChange(!value)}>
      {value === true && <div>!</div>}
    </CheckboxInput>
    <CheckBoxLabel>{label}</CheckBoxLabel>
  </CheckboxContainer>
);

export default Checkbox;
