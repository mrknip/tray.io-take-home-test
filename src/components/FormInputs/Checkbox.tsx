import React from 'react';
import {
  CheckboxInput,
  CheckBoxLabel,
  CheckboxContainer,
} from './Checkbox.styled';

interface CheckboxProps {
  id: string;
  value: boolean;
  label: string;
  onChange: (newValue: boolean) => void;
}

const Checkbox = ({ id, value, label, onChange }: CheckboxProps) => {
  const handleToggle = () => onChange(!value);
  const handleKeyUp = (e: React.SyntheticEvent) => {
    const nativeEvent = e.nativeEvent as KeyboardEvent;
    if (nativeEvent.key === 'Enter') {
      handleToggle();
    }
  };

  return (
    <CheckboxContainer>
      <CheckboxInput
        id={id}
        role="checkbox"
        aria-label={label}
        tabIndex={0}
        onKeyUp={handleKeyUp}
        onClick={handleToggle}
      >
        {value === true && <div>✓</div>}
      </CheckboxInput>
      <CheckBoxLabel onClick={handleToggle} htmlFor={id}>
        {label}
      </CheckBoxLabel>
    </CheckboxContainer>
  );
};

export default Checkbox;
