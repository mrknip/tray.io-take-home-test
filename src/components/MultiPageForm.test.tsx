import { fireEvent, render, screen } from '@testing-library/react';
import MultiPageForm from './MultiPageForm';
import { FormPageProps } from '../types';

describe('MultiPageForm', () => {
  const PageA = (props: FormPageProps<{ pageAValue: string }>) => {
    const { pageValues = { pageAValue: '' }, pageValueValidationErrors = {} } =
      props;

    return (
      <>
        <div>page A content</div>
        <div
          onClick={() =>
            props.onPageValuesChange({
              pageAValue:
                pageValues.pageAValue === 'checked' ? 'checked' : 'not checked',
            })
          }
        >
          toggleA
        </div>
        <div data-testid="page A value">{pageValues.pageAValue}</div>
        <div data-testid="page A validation error">
          {pageValueValidationErrors.pageAValue}
        </div>
      </>
    );
  };
  const PageB = (props: FormPageProps) => <div>page B content</div>;
  const PageC = (props: FormPageProps) => <div>page C content</div>;

  const validationErrorMessage = 'pageAValue is empty';
  const isNotEmpty = (v: string) => {
    return !v ? null : 'pageAValue is empty';
  };

  const pagesWithoutValidation = [
    {
      display: PageA,
      name: 'Page A Progress Label',
    },
    { display: PageB, name: 'Page B Progress Label' },
    { display: PageC, name: 'Page C Progress Label' },
  ];
  const pagesWithValidation = [
    {
      display: PageA,
      name: 'Page A Progress Label',
      validators: {
        pageAValue: [isNotEmpty],
      },
      startingValues: {
        pageAValue: 'not checked',
      },
    },
    { display: PageB, name: 'Page B Progress Label' },
    { display: PageC, name: 'Page C Progress Label' },
  ];
  const noop = () => {};

  describe('basic page navigation', () => {
    it('renders the first page first', () => {
      render(<MultiPageForm pages={pagesWithoutValidation} onSubmit={noop} />);

      expect(screen.getByText('page A content')).toBeInTheDocument();
    });

    it('renders submit button on interim pages', () => {
      render(<MultiPageForm pages={pagesWithoutValidation} onSubmit={noop} />);

      expect(
        screen.getByRole('button', { name: 'Submit' }),
      ).toBeInTheDocument();
    });

    it('progresses page on submit click', () => {
      render(<MultiPageForm pages={pagesWithoutValidation} onSubmit={noop} />);

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      fireEvent.click(submitButton);

      expect(screen.getByText('page B content')).toBeInTheDocument();
    });

    it('does not render submit button on final pages', () => {
      render(<MultiPageForm pages={pagesWithoutValidation} onSubmit={noop} />);

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      fireEvent.click(submitButton);
      fireEvent.click(submitButton);

      expect(screen.queryByRole('button', { name: 'Submit' })).toBeNull();
    });
  });

  describe('form data behaviour', () => {
    it('updates form data', () => {
      render(<MultiPageForm pages={pagesWithoutValidation} onSubmit={noop} />);
      const valueContainer = screen.getByTestId('page A value');

      expect(valueContainer).toHaveTextContent('');

      const toggle = screen.getByText('toggleA');
      fireEvent.click(toggle);

      expect(valueContainer).toHaveTextContent('checked');
    });

    it('does not progress screen when there are validation errors, shows errors', () => {
      render(<MultiPageForm pages={pagesWithValidation} onSubmit={noop} />);
      const validationErrorContainer = screen.getByTestId(
        'page A validation error',
      );

      expect(validationErrorContainer).toHaveTextContent('');
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      fireEvent.click(submitButton);

      expect(screen.getByText('page A content')).toBeInTheDocument();
      expect(validationErrorContainer).toHaveTextContent(
        validationErrorMessage,
      );
    });

    it('does not show validation errors until submission', () => {
      render(<MultiPageForm pages={pagesWithValidation} onSubmit={noop} />);
      const validationErrorContainer = screen.getByTestId(
        'page A validation error',
      );
      const toggle = screen.getByText('toggleA');
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      fireEvent.click(toggle);
      expect(validationErrorContainer).toHaveTextContent('');

      fireEvent.click(toggle);
      expect(validationErrorContainer).toHaveTextContent('');

      fireEvent.click(submitButton);
      expect(validationErrorContainer).toHaveTextContent(
        validationErrorMessage,
      );
    });
  });

  describe('submission', () => {
    it('calls onSubmit when submit pressed on penultimate page', () => {
      const onSubmit = jest.fn();
      render(
        <MultiPageForm pages={pagesWithoutValidation} onSubmit={onSubmit} />,
      );

      const submitButton = screen.getByRole('button', { name: 'Submit' });
      fireEvent.click(submitButton);
      fireEvent.click(submitButton);

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
