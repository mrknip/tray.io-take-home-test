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

interface FormPage {
  display: any; // I struggled with the typing for React components throughout this exercise
  name: string;
  validators?: ValidatorMap;
}

interface MultiPageFormProps {
  pages: FormPage[];
}

const MultiPageForm = ({ pages }: MultiPageFormProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, any>>(
    {},
  );
  const [showErrors, setShowErrors] = useState<boolean>(false);

  useEffect(() => {
    setValidationErrors({});
    setShowErrors(false);
  }, [currentPage]);

  const currentPageDetails = pages[currentPage];
  const isLastPageToEnter = currentPage === pages.length - 2;
  const isConfirmationPage = currentPage === pages.length - 1;

  const { display: ActivePage, validators: currentPageValidators = {} } =
    currentPageDetails;

  const goToNextPage = () => setCurrentPage(Math.min(currentPage + 1));

  const handlePageValuesChange = (newPageValues: Record<string, any>) => {
    setFormData({
      ...formData,
      [currentPage]: newPageValues,
    });

    const newValidationErrors = getValidationErrors(
      newPageValues,
      currentPageValidators,
    );

    setValidationErrors(newValidationErrors);
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

  const handleFormSubmit = () => {};

  const activePage = (
    <ActivePage
      pageValues={formData[currentPage]}
      pageValueValidationErrors={showErrors && validationErrors}
      onPageValuesChange={handlePageValuesChange}
    />
  );

  return (
    <FormContainer>
      <ProgressIndicator
        currentStep={currentPage}
        stepNames={pages.map((page) => page.name)}
      />

      {isConfirmationPage ? (
        <EndScreenContainer>{activePage}</EndScreenContainer>
      ) : (
        <FormPageContainer>
          {activePage}
          {!isLastPageToEnter && (
            <SubmitButton onClick={handlePageSubmit}>Submit</SubmitButton>
          )}
        </FormPageContainer>
      )}
    </FormContainer>
  );
};

export default MultiPageForm;
