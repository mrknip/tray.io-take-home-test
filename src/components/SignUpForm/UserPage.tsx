import React from 'react';
import { FormContainer } from '../FormPage.styled';
import TextInput from '../FormInputs/TextInput';
import { ValidatorMap } from '../../types';

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

interface UserPageProps {
  pageValues?: UserPageValues;
  pageValueValidationErrors?: Record<string, any>;
  onPageValuesChange: (newPageValues: UserPageValues) => void;
  onConfirm?: () => void;
}

const UserPage = ({
  pageValues = defaultValues,
  pageValueValidationErrors = {},
  onPageValuesChange,
  onConfirm,
}: UserPageProps) => {
  const { name, role, email, password } = pageValues;

  const onFieldChange = (fieldName: string) => (newValue: any) => {
    const newPageValues = {
      ...pageValues,
      [fieldName]: newValue,
    };
    onPageValuesChange(newPageValues);
  };

  return (
    <FormContainer>
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
        inputType="email"
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
    </FormContainer>
  );
};

export default UserPage;
