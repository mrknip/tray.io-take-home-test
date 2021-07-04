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
  onSubmit: (formData: Record<string, any>) => void;
}

const MultiPageForm = ({ pages, onSubmit }: MultiPageFormProps) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
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

  const goToNextPage = () => setCurrentPage(currentPage + 1);

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

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    // Prevent submit on pressing enter on interim stage
    if (!isLastPageToEnter) {
      handlePageSubmit();
      return;
    }

    onSubmit(formData);

    goToNextPage();
  };

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
        <FormPageContainer onSubmit={handleFormSubmit}>
          {activePage}
          <SubmitButton />
        </FormPageContainer>
      )}
    </FormContainer>
  );
};

export default MultiPageForm;
