import { fireEvent, render, screen } from '@testing-library/react';
import FormPage from './FormPage';

describe('FormPage', () => {
  test('renders more button', () => {
    render(<FormPage />);
    const moreButton = screen.getByRole('button', { text: 'MORE' });
    expect(moreButton).toBeInTheDocument();
  });

  test('augments on more button click', () => {
    render(<FormPage />);

    const moreButton = screen.getByRole('button', { text: 'MORE' });
    fireEvent.click(moreButton);

    const countLabel = screen.getByText(`Count : 1`);
    expect(countLabel).toBeInTheDocument();
  });
});
