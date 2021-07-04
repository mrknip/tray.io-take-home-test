import React from 'react';
import Checkbox from '../FormInputs/Checkbox';
import { FormPageProps } from '../FormPage';

interface PrivacyPageValues {
  receiveTrayIoUpdates: boolean;
  receiveRelatedProductUpdates: boolean;
}

export const defaultValues = {
  receiveTrayIoUpdates: false,
  receiveRelatedProductUpdates: false,
};

const PrivacyPage = ({
  pageValues,
  onPageValuesChange,
}: FormPageProps<PrivacyPageValues>) => {
  if (!pageValues) return null;

  const { receiveTrayIoUpdates, receiveRelatedProductUpdates } = pageValues;

  const onFieldChange = (fieldName: string) => (newValue: any) => {
    onPageValuesChange({
      ...pageValues,
      [fieldName]: newValue,
    });
  };

  return (
    <>
      <Checkbox
        value={receiveTrayIoUpdates}
        onChange={onFieldChange('receiveTrayIoUpdates')}
        id="receiveTrayIoUpdatesInput"
        label="Receive updates about Tray.io by email"
      />
      <Checkbox
        value={receiveRelatedProductUpdates}
        onChange={onFieldChange('receiveRelatedProductUpdates')}
        id="receiveRelatedProductUpdatesInput"
        label="Receive communication by email for other products created by the Tray.io team"
      />
    </>
  );
};

export default PrivacyPage;
