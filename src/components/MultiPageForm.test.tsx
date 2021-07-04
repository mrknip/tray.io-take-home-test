import { fireEvent, render, screen } from '@testing-library/react';
import MultiPageForm from './MultiPageForm';
import { FormPageProps } from './FormPage';

describe('MultiPageForm', () => {
  const PageA = (props: FormPageProps<{ pageAValue: string }>) => {
    const { pageValues = {} }: { pageValues: Record<string, any> } = props;
    return (
      <>
        <div>page A content</div>
        <div
          onClick={() => props.onPageValuesChange({ pageAValue: 'clicked' })}
        >
          toggleA
        </div>
        <div data-testid="page A value">{pageValues.pageAValue}</div>
      </>
    );
  };
  const PageB = (props: FormPageProps) => <div>page B content</div>;
  const PageC = (props: FormPageProps) => <div>page C content</div>;

  const pages = [
    { display: PageA, name: 'Page A Progress Label' },
    { display: PageB, name: 'Page B Progress Label' },
    { display: PageC, name: 'Page C Progress Label' },
  ];
  const noop = () => {};

  describe('basic page navigation', () => {
    it('renders the first page first', () => {
      render(<MultiPageForm pages={pages} onSubmit={noop} />);

      expect(screen.getByText('page A content')).toBeInTheDocument();
    });

    it('renders submit button on interim pages', () => {
      render(<MultiPageForm pages={pages} onSubmit={noop} />);

      expect(
        screen.getByRole('button', { name: 'Submit' }),
      ).toBeInTheDocument();
    });

    it('progresses page on submit click', () => {
      render(<MultiPageForm pages={pages} onSubmit={noop} />);

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      fireEvent.click(submitButton);

      expect(screen.getByText('page B content')).toBeInTheDocument();
    });

    it('does not render submit button on final pages', () => {
      render(<MultiPageForm pages={pages} onSubmit={noop} />);

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      fireEvent.click(submitButton);
      fireEvent.click(submitButton);

      expect(screen.queryByRole('button', { name: 'Submit' })).toBeNull();
    });
  });

  describe('form data behaviour', () => {
    it('updates form data', () => {
      render(<MultiPageForm pages={pages} onSubmit={noop} />);
      const valueContainer = screen.getByTestId('page A value');

      expect(valueContainer).toHaveTextContent('');

      const toggle = screen.getByText('toggleA');
      fireEvent.click(toggle);

      expect(valueContainer).toHaveTextContent('clicked');
    });
  });

  describe('submission', () => {
    it('calls onSubmit when submit pressed on penultimate page', () => {
      const onSubmit = jest.fn();
      render(<MultiPageForm pages={pages} onSubmit={onSubmit} />);

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      fireEvent.click(submitButton);
      fireEvent.click(submitButton);

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
