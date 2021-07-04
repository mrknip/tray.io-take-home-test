import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Checkbox from './Checkbox';

describe('Checkbox', () => {
  const baseProps = {
    id: 'testInput',
    value: false,
    onChange: () => {},
  };

  it('renders label', () => {
    render(<Checkbox {...baseProps} label="test_label" />);
    const label = screen.getByText('test_label');

    expect(label).toBeInTheDocument();
  });

  it('when false and checkbox clicked - onChange called with true', () => {
    const onChange = jest.fn();

    render(<Checkbox {...baseProps} label="test_label" onChange={onChange} />);

    const checkbox = screen.getByRole('checkbox', { name: 'test_label' });
    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('when true and checkbox clicked - onChange called with false', () => {
    const onChange = jest.fn();

    render(
      <Checkbox
        {...baseProps}
        value={true}
        label="test_label"
        onChange={onChange}
      />,
    );

    const checkbox = screen.getByRole('checkbox', { name: 'test_label' });
    fireEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('when label clicked - toggles value', () => {
    const onChange = jest.fn();

    render(<Checkbox {...baseProps} label="test_label" onChange={onChange} />);

    const label = screen.getByText('test_label');
    fireEvent.click(label);

    expect(onChange).toHaveBeenCalledWith(true);
  });
});
