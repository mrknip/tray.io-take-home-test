import React from 'react';
import { FormContainer } from '../FormPage.styled';
import TextInput from '../FormInputs/TextInput';
import { ValidatorMap } from '../../types';
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

// Make this
// interface UserPageProps {
//   /** Map of field names to values */
//   pageValues?: UserPageValues;
//   /** Map of field names to validation errors for those values */
//   pageValueValidationErrors?: Record<string, any>;
//   /** Array of fields that have just been submitted - used to show validation errors only on submission */
//   submittedFieldNames: string[];
//   /** Handler for when page's form values change */
//   onPageValuesChange: (newPageValues: UserPageValues) => void;
//   onConfirm?: () => void;
// }

const UserPage = ({
  pageValues = defaultValues,
  pageValueValidationErrors = {},
  onPageValuesChange,
  onConfirm,
}: FormPageProps<UserPageValues>) => {
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
    </>
  );
};

export default UserPage;
