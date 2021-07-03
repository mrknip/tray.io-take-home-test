import React, { useState } from 'react';
import { SubmitButton } from './MultiPageForm.styled';

interface FormPage {
  display: any; // TODO - get correct typing
  name: string;
}

interface MultiPageFormProps {
  pages: FormPage[];
  endScreen: React.ReactNode;
}

const MultiPageForm = ({ pages, endScreen }: MultiPageFormProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const currentPageDetails = pages[currentPage];
  const { display: ActivePage } = currentPageDetails;

  const [formData, setFormData] = useState<Record<string, any>>({});

  const goToNextPage = () =>
    setCurrentPage(Math.min(currentPage + 1, pages.length - 1));

  return (
    <div>
      {pages.map((page, index) => (
        <span key={page.name}>
          {index === currentPage ? <b>{page.name}</b> : page.name}
        </span>
      ))}

      <ActivePage
        pageValues={formData[currentPage]}
        onPageValuesChange={(newPageValues: Record<string, any>) => {
          setFormData({
            ...formData,
            [currentPage]: newPageValues,
          });
        }}
      />

      <SubmitButton onClick={goToNextPage}>Submit</SubmitButton>
    </div>
  );
};

export default MultiPageForm;
