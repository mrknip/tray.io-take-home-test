import React from 'react';
import { FormContainer } from '../FormPage.styled';
import Checkbox from '../FormInputs/Checkbox';

interface FormPageProps {
  pageValues?: Record<string, any>;
  onPageFieldValueChange: (
    fieldName: string,
  ) => (newValue: string | boolean) => void;
  onConfirm?: () => void;
}

const FormPage = ({
  pageValues = {},
  onPageFieldValueChange,
  onConfirm,
}: FormPageProps) => {
  const { receiveTrayIoUpdates = false, receiveRelatedProductUpdates = false } =
    pageValues;

  return (
    <FormContainer>
      <Checkbox
        value={receiveTrayIoUpdates}
        onChange={onPageFieldValueChange('receiveTrayIoUpdates')}
        label="Receive updates about Tray.io by email"
      />
      <Checkbox
        value={receiveRelatedProductUpdates}
        onChange={onPageFieldValueChange('receiveRelatedProductUpdates')}
        label="Receive communication by email for other products created by the Tray.io team"
      />
    </FormContainer>
  );
};

export default FormPage;
