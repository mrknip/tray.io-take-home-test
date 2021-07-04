import React, { useState } from 'react';
import { FormContainer } from './FormPage.styled';
import TextInput from './FormInputs/TextInput';
import useFormData from '../hooks/useFormData';

export interface FormPageProps<PageValues = {}> {
  /** Map of field names to values */
  pageValues?: PageValues;
  /** Map of field names to validation errors for those values */
  pageValueValidationErrors?: Record<string, any>;
  /** Handler for when page's form values change */
  onPageValuesChange: (newPageValues: PageValues) => void;
  onConfirm?: () => void;
}

// const FormPage = ({
//   pageValues,
//   setPageValue,
//   onNextSelected,
//   children,
// }: FormPageProps) => {
//   return <FormContainer>{children}</FormContainer>;
// };

// export default FormPage;
