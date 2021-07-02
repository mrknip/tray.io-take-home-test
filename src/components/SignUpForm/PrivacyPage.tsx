import React, { useState } from 'react';
import { FormContainer } from '../FormPage.styled';
import TextInput from '../FormInputs/TextInput';

interface FormPageProps {
  pageValues?: Record<string, any>;
  onPageFieldValueChange: (fieldName: string) => (newValue: string) => void;
  onConfirm?: () => void;
}

const FormPage = ({
  pageValues = {},
  onPageFieldValueChange,
  onConfirm,
}: FormPageProps) => {
  const { what = '' } = pageValues;

  return (
    <FormContainer>
      <TextInput
        value={what}
        onChange={onPageFieldValueChange('what')}
        label="WHAT"
      />
    </FormContainer>
  );
};

export default FormPage;
