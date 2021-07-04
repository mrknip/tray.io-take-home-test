import React, { useEffect, useState } from 'react';
import {
  SubmitButton,
  FormContainer,
  EndScreenContainer,
} from './MultiPageForm.styled';
import getValidationErrors from '../helpers/getValidationErrors';
import { ValidatorMap } from '../types';

interface FormPage {
  display: any; // TODO - get correct typing
  name: string;
  validators?: ValidatorMap;
}

interface MultiPageFormProps {
  pages: FormPage[];
  endScreen: React.ReactElement;
}

const MultiPageForm = ({ pages, endScreen }: MultiPageFormProps) => {
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

  if (currentPage === pages.length) {
    return <EndScreenContainer>{endScreen}</EndScreenContainer>;
  }

  const currentPageDetails = pages[currentPage];
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
    console.log('here');
    if (hasErrors) {
      setShowErrors(true);
    } else {
      // submit if last page
      //or
      console.log('next page');
      goToNextPage();
    }
  };

  return (
    <div>
      {pages.map((page, index) => (
        <span key={page.name}>
          {index === currentPage ? <b>{page.name}</b> : page.name}
        </span>
      ))}

      <FormContainer>
        <ActivePage
          pageValues={formData[currentPage]}
          pageValueValidationErrors={showErrors && validationErrors}
          onPageValuesChange={handlePageValuesChange}
        />
      </FormContainer>

      <SubmitButton onClick={handlePageSubmit}>Submit</SubmitButton>
    </div>
  );
};

export default MultiPageForm;
