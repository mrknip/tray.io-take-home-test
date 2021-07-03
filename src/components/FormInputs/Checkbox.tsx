import React from 'react';
import { CheckboxInput } from './Checkbox.styled';

interface CheckboxProps {
  value: boolean;
  label: string;
  onChange: (newValue: boolean) => void;
}

const Checkbox = ({ value, label, onChange }: CheckboxProps) => (
  <>
    <CheckboxInput onClick={() => onChange(!value)}>
      {value === true && <div>!</div>}
    </CheckboxInput>
    <div>{label}</div>
  </>
);

export default Checkbox;
