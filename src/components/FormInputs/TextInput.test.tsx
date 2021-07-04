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
    const textInput = screen.getByRole('textbox', { name: 'test_label' });

    expect(textInput).toHaveDisplayValue('test value');
  });

  it('errorMessage not empty - renders error message', () => {
    render(
      <TextInput
        {...baseProps}
        value="test value"
        label="test_label"
        errorMessage="test error"
      />,
    );
    const errorMessage = screen.getByText('test error');
    expect(errorMessage).toBeInTheDocument();
  });

  it('calls onChange on input change', async () => {
    const onChange = jest.fn();
    render(<TextInput {...baseProps} label="test_label" onChange={onChange} />);

    const textInput = screen.getByRole('textbox', { name: 'test_label' });
    userEvent.type(textInput, 'a');

    expect(onChange).toHaveBeenLastCalledWith('a');
  });
});
