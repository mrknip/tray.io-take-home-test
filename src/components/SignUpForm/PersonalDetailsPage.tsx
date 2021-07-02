import React from 'react';
import { FormContainer } from '../FormPage.styled';
import TextInput from '../FormInputs/TextInput';

interface PersonalDetailsPageProps {
  pageValues?: Record<string, any>;
  onPageFieldValueChange: (fieldName: string) => (newValue: string) => void;
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
      <TextInput
        value={name}
        onChange={onPageFieldValueChange('name')}
        label="Name"
        isRequired
      />
      <TextInput
        value={role}
        onChange={onPageFieldValueChange('role')}
        label="Role"
      />
      <TextInput
        value={email}
        onChange={onPageFieldValueChange('email')}
        label="Email"
        isRequired
      />
      <TextInput
        value={password}
        onChange={onPageFieldValueChange('password')}
        label="Password"
        isRequired
      />
      {arePageValuesValid && <button onClick={onConfirm}>Submit</button>}
    </FormContainer>
  );
};

export default PersonalDetailsPage;
