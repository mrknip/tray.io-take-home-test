import React, { useState } from 'react';
import { FormContainer } from './FormPage.styled';
import TextInput from './FormInputs/TextInput';
import useFormData from '../hooks/useFormData';

interface FormPageProps {
  pageValues?: Record<string, any>;
  setPageValue?: (fieldName: string, fieldValue: string) => void;
  onNextSelected?: () => void;
}

const FormPage = ({
  pageValues,
  setPageValue,
  onNextSelected,
}: FormPageProps) => {
  const { formValues, setFormValue } = useFormData({
    name: 'roger',
    role: '',
    email: '',
    password: '',
  });

  const { name, role, email, password } = formValues;

  const arePageValuesValid =
    name.length > 0 &&
    role.length > 0 &&
    email.length > 0 &&
    password.length > 0;

  return (
    <FormContainer>
      <TextInput
        value={name}
        onChange={(newValue) => setFormValue('name', newValue)}
        label="Name"
      />
      <TextInput
        value={role}
        onChange={(newValue) => setFormValue('role', newValue)}
        label="Role"
      />
      <TextInput
        value={email}
        onChange={(newValue) => setFormValue('email', newValue)}
        label="Email"
      />
      <TextInput
        value={password}
        onChange={(newValue) => setFormValue('password', newValue)}
        label="Password"
      />
      {arePageValuesValid && <button>Submit</button>}
    </FormContainer>
  );
};

export default FormPage;
