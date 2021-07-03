import React from 'react';
import { FormContainer } from '../FormPage.styled';
import TextInput from '../FormInputs/TextInput';

interface PersonalDetailsPageProps {
  pageValues?: Record<string, any>;
  onPageFieldValueChange: (
    fieldName: string,
  ) => (newValue: string | boolean) => void;
  onConfirm?: () => void;
}

const PersonalDetailsPage = ({
  pageValues = {},
  onPageFieldValueChange,
  onConfirm,
}: PersonalDetailsPageProps) => {
  const { name = '', role = '', email = '', password = '' } = pageValues;

  const arePageValuesValid =
    name.length > 0 &&
    role.length > 0 &&
    email.length > 0 &&
    password.length > 0;

  return (
    <FormContainer>
      <p>All fields marked with * are required</p>
      <TextInput
        value={name}
        onChange={onPageFieldValueChange('name')}
        label="name:"
        id="name"
        isRequired
      />
      <TextInput
        value={role}
        onChange={onPageFieldValueChange('role')}
        label="role:"
        id="role"
      />
      <TextInput
        value={email}
        onChange={onPageFieldValueChange('email')}
        label="email:"
        id="email"
        inputType="email"
        isRequired
      />
      <TextInput
        value={password}
        onChange={onPageFieldValueChange('password')}
        label="password:"
        id="password"
        inputType="password"
        isRequired
      />
      {arePageValuesValid && <button onClick={onConfirm}>Submit</button>}
    </FormContainer>
  );
};

export default PersonalDetailsPage;
