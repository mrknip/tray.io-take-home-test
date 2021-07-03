import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TextInput from './TextInput';

describe('TextInput', () => {
  const baseProps = {
    id: 'testInput',
    value: '',
    onChange: () => {},
  };
  it('renders label', () => {
    render(<TextInput {...baseProps} label="test_label" />);
    const textInputLabel = screen.getByText('test_label');

    expect(textInputLabel).toBeInTheDocument();
  });

  it('isRequired true - renders required flag', () => {
    render(<TextInput {...baseProps} label="test_label" isRequired />);
    const requiredLabel = screen.getByText('*');

    expect(requiredLabel).toBeInTheDocument();
  });

  it('value not empty - renders input value', () => {
    render(<TextInput {...baseProps} value="test value" label="test_label" />);
    const textInput = screen.getByRole('textbox', { id: 'testInput' });

    expect(textInput).toHaveDisplayValue('test value');
  });

  // Full disclosure - ran into a problem with testing user input on a controlled component here and had a brain freeze!
  // With more time I'd probably solve this with a componet that fleshes out a use case, and test against that
  it('calls onChange on input change', async () => {
    const onChange = jest.fn();
    render(<TextInput {...baseProps} label="test_label" onChange={onChange} />);

    const textInput = screen.getByRole('textbox', { id: 'testInput' });
    userEvent.type(textInput, 'a');

    expect(onChange).toHaveBeenLastCalledWith('a');
  });
});
