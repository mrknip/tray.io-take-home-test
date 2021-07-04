import React, { useEffect, useState } from 'react';
import {
  SubmitButton,
  FormContainer,
  FormPageContainer,
  EndScreenContainer,
} from './MultiPageForm.styled';
import getValidationErrors from '../helpers/getValidationErrors';
import { ValidatorMap } from '../types';
import ProgressIndicator from './ProgressIndicator';

interface FormPageConfig {
  /** React component, forms the display of the page, houses the form inputs.  Must implement interface FormPageProps */
  display: any; // TODO: this needs typing that works when passed the component - I did not wrangle Typescript in time for the deadline!
  /** The page name - used in the progress display */
  name: string;
}

interface FormInputPageConfig extends FormPageConfig {
  /** The starting values for fields in each page */
  startingValues: Record<string, any>;
  /**
   * A map of validators for each field.
   * Validators availale in src/helpers/formValidators - they return an error message or null
   * Processed in order, so (e.g.) for required fields isNotEmpty normally comes first
   * */
  validators?: ValidatorMap;
}

interface MultiPageFormProps {
  /** An array of config for each page of the form */
  inputPages: FormInputPageConfig[];
  /**  */
  confirmationPage: FormPageConfig;
  /** Handler for submission of the complete form, once all pages complete */
  onSubmit: (formData: Record<string, any>) => void;
}

const MultiPageForm = ({
  inputPages,
  confirmationPage,
  onSubmit,
}: MultiPageFormProps) => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const isLastInputPage = currentPage === inputPages.length - 1;

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, any>>(
    {},
  );
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [hasFormBeenSubmitted, setHasFormBeenSubmitted] = useState(false);

  const currentPageDetails = inputPages[currentPage];

  const { display: ActivePage, validators: currentPageValidators } =
    currentPageDetails;

  const { display: ConfirmationPage } = confirmationPage;

  useEffect(() => {
    if (
      formData[currentPage] &&
      currentPageValidators &&
      !hasFormBeenSubmitted
    ) {
      const startingValidationErrors = getValidationErrors(
        formData[currentPage],
        currentPageValidators,
      );

      setValidationErrors(startingValidationErrors);
    }
  }, [currentPage, hasFormBeenSubmitted, currentPageValidators, formData]);

  useEffect(() => {
    setShowErrors(false);
  }, [currentPage]);

  useEffect(() => {
    const startingFormData: Record<string, any> = inputPages.reduce(
      (out, pageData, index) => {
        if (pageData.startingValues) {
          return {
            ...out,
            [`${index}`]: { ...pageData.startingValues },
          };
        } else {
          return out;
        }
      },
      {},
    );

    setFormData(startingFormData);
  }, [inputPages]);

  const goToNextPage = () => setCurrentPage(currentPage + 1);

  const handlePageValuesChange = (newPageValues: Record<string, any>) => {
    setFormData({
      ...formData,
      [currentPage]: newPageValues,
    });
  };

  const handlePageSubmit = () => {
    const hasErrors =
      Object.values(validationErrors).filter((v) => v !== null).length > 0;
    if (hasErrors) {
      setShowErrors(true);
    } else {
      goToNextPage();
    }
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    // Prevent submit on pressing enter on interim stage
    if (!isLastInputPage) {
      handlePageSubmit();
      return;
    }

    onSubmit(formData);
    setHasFormBeenSubmitted(true);
  };

  const activePage = hasFormBeenSubmitted ? (
    <ConfirmationPage />
  ) : (
    <ActivePage
      pageValues={formData[currentPage]}
      pageValueValidationErrors={showErrors ? validationErrors : undefined}
      onPageValuesChange={handlePageValuesChange}
    />
  );

  return (
    <FormContainer>
      <ProgressIndicator
        currentStep={hasFormBeenSubmitted ? inputPages.length : currentPage}
        stepNames={inputPages
          .map((page) => page.name)
          .concat(confirmationPage.name)}
      />

      {hasFormBeenSubmitted ? (
        <EndScreenContainer>{activePage}</EndScreenContainer>
      ) : (
        <FormPageContainer onSubmit={handleFormSubmit}>
          {activePage}
          <SubmitButton />
        </FormPageContainer>
      )}
    </FormContainer>
  );
};

export default MultiPageForm;
