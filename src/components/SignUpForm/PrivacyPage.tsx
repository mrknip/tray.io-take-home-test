import React from 'react';
import { FormContainer } from '../FormPage.styled';
import Checkbox from '../FormInputs/Checkbox';

interface PrivacyPageValues {
  receiveTrayIoUpdates: boolean;
  receiveRelatedProductUpdates: boolean;
}

const defaultValues = {
  receiveTrayIoUpdates: false,
  receiveRelatedProductUpdates: false,
};

interface FormPageProps {
  pageValues?: PrivacyPageValues;
  onPageValuesChange: (newPageValues: PrivacyPageValues) => void;
  onConfirm?: () => void;
}

const FormPage = ({
  pageValues = defaultValues,
  onPageValuesChange,
  onConfirm,
}: FormPageProps) => {
  const { receiveTrayIoUpdates, receiveRelatedProductUpdates } = pageValues;

  const onFieldChange = (fieldName: string) => (newValue: any) => {
    onPageValuesChange({
      ...pageValues,
      [fieldName]: newValue,
    });
  };

  return (
    <FormContainer>
      <Checkbox
        value={receiveTrayIoUpdates}
        onChange={onFieldChange('receiveTrayIoUpdates')}
        label="Receive updates about Tray.io by email"
      />
      <Checkbox
        value={receiveRelatedProductUpdates}
        onChange={onFieldChange('receiveRelatedProductUpdates')}
        label="Receive communication by email for other products created by the Tray.io team"
      />
    </FormContainer>
  );
};

export default FormPage;
