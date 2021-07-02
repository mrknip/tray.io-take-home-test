import React, { useState } from 'react';
// import { FormContainer } from './MultiPageForm.styled';

interface FormPage {
  display: any;
  name: string;
}

interface MultiPageFormProps {
  pages: FormPage[];
}

const MultiPageForm = ({ pages }: MultiPageFormProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const [formData, setFormData] = useState<Record<string, any>>({});

  const currentPageDetails = pages[currentPage];
  const { display: ActivePage } = currentPageDetails;

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
        onPageFieldValueChange={(fieldName: string) => (newValue: string) => {
          const currentPageValues = formData[currentPage] || {};

          setFormData({
            ...formData,
            [currentPage]: {
              ...currentPageValues,
              [fieldName]: newValue,
            },
          });
        }}
        onPageValuesChange={(newPageValues: Record<string, any>) =>
          setFormData({
            ...formData,
            [`${currentPage}`]: newPageValues,
          })
        }
        onConfirm={goToNextPage}
      />
    </div>
  );
};

export default MultiPageForm;
