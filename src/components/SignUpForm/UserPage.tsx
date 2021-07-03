import React from 'react';
import { FormContainer } from '../FormPage.styled';
import TextInput from '../FormInputs/TextInput';

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
  onPageValuesChange: (newPageValues: UserPageValues) => void;
  onConfirm?: () => void;
}

const validate = (pageValues: UserPageValues) => {
  const { name, role, email, password } = pageValues;

  const nameValid = name && name.length > 0;

  return {
    name: name,
    email: true,
  };
};

const UserPage = ({
  pageValues = defaultValues,
  onPageValuesChange,
  onConfirm,
}: UserPageProps) => {
  const { name, role, email, password } = pageValues;

  const onFieldChange = (fieldName: string) => (newValue: any) => {
    onPageValuesChange({
      ...pageValues,
      [fieldName]: newValue,
    });
  };

  return (
    <FormContainer>
      <p>All fields marked with * are required</p>
      <TextInput
        value={name}
        onChange={onFieldChange('name')}
        label="name:"
        id="name"
        isRequired
      />
      <TextInput
        value={role}
        onChange={onFieldChange('role')}
        label="role:"
        id="role"
      />
      <TextInput
        value={email}
        onChange={onFieldChange('email')}
        label="email:"
        id="email"
        inputType="email"
        isRequired
      />
      <TextInput
        value={password}
        onChange={onFieldChange('password')}
        label="password:"
        id="password"
        inputType="password"
        isRequired
      />
    </FormContainer>
  );
};

export default UserPage;
