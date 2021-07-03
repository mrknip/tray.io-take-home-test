import React, { useState } from 'react';
import { FormContainer } from './FormPage.styled';
import TextInput from './FormInputs/TextInput';
import useFormData from '../hooks/useFormData';

interface FormPageProps {
  pageValues?: Record<string, any>;
  setPageValue?: (fieldName: string, fieldValue: string | boolean) => void;
  onNextSelected?: () => void;
  children: React.ReactNode;
}

const FormPage = ({
  pageValues,
  setPageValue,
  onNextSelected,
  children,
}: FormPageProps) => {
  return (
    <FormContainer>
      {children}
      {arePageValuesValid && <button>Submit</button>}
    </FormContainer>
  );
};

export default FormPage;
