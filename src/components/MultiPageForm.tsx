import React, { useState } from 'react';
import { SubmitButton } from './MultiPageForm.styled';
import getValidationErrors from '../helpers/getValidationErrors';
import { ValidatorMap } from '../types';

interface FormPage {
  display: any; // TODO - get correct typing
  name: string;
  validators?: ValidatorMap;
}

interface MultiPageFormProps {
  pages: FormPage[];
  endScreen: React.ReactNode;
}

const MultiPageForm = ({ pages, endScreen }: MultiPageFormProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const currentPageDetails = pages[currentPage];
  const { display: ActivePage, validators: currentPageValidators = {} } =
    currentPageDetails;

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, any>>(
    {},
  );

  const goToNextPage = () =>
    setCurrentPage(Math.min(currentPage + 1, pages.length - 1));

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

  return (
    <div>
      {pages.map((page, index) => (
        <span key={page.name}>
          {index === currentPage ? <b>{page.name}</b> : page.name}
        </span>
      ))}

      <ActivePage
        pageValues={formData[currentPage]}
        pageValueValidationErrors={validationErrors}
        onPageValuesChange={handlePageValuesChange}
      />

      <SubmitButton onClick={goToNextPage}>Submit</SubmitButton>
    </div>
  );
};

export default MultiPageForm;
