import React, { useEffect } from 'react';
import TextInput from '../FormInputs/TextInput';
import { FormPageProps } from '../FormPage';

interface UserPageValues {
  name: string;
  role: string;
  email: string;
  password: string;
}

const defaultValues = {
  name: '',
  role: '',
  email: '',
  password: '',
};

const UserPage = ({
  pageValues = defaultValues,
  pageValueValidationErrors = {},
  onPageValuesChange,
  onConfirm,
}: FormPageProps<UserPageValues>) => {
  useEffect(() => {
    if (!pageValues) {
      onPageValuesChange(defaultValues);
    }
  });

  if (!pageValues) return null;

  const { name, role, email, password } = pageValues;

  const onFieldChange = (fieldName: string) => (newValue: any) => {
    const newPageValues = {
      ...pageValues,
      [fieldName]: newValue,
    };
    onPageValuesChange(newPageValues);
  };

  return (
    <>
      <p>All fields marked with * are required</p>
      <TextInput
        value={name}
        onChange={onFieldChange('name')}
        errorMessage={pageValueValidationErrors.name}
        label="name:"
        id="name"
        isRequired
      />
      <TextInput
        value={role}
        onChange={onFieldChange('role')}
        errorMessage={pageValueValidationErrors.role}
        label="role:"
        id="role"
      />
      <TextInput
        value={email}
        onChange={onFieldChange('email')}
        errorMessage={pageValueValidationErrors.email}
        label="email:"
        id="email"
        isRequired
      />
      <TextInput
        value={password}
        onChange={onFieldChange('password')}
        errorMessage={pageValueValidationErrors.password}
        label="password:"
        id="password"
        inputType="password"
        isRequired
      />
    </>
  );
};

export default UserPage;
