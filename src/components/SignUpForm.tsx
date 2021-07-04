import React from 'react';
import MultiPageForm from './MultiPageForm';
import UserPage from './SignUpFormPages/UserPage';
import PrivacyPage from './SignUpFormPages/PrivacyPage';
import ConfirmationPage from './SignUpFormPages/ConfirmationPage';
import {
  isNotEmpty,
  isValidEmail,
  isValidPassword,
} from '../helpers/formValidators';

const SignUpForm = () => {
  const pages = [
    {
      display: UserPage,
      name: 'User',
      validators: {
        name: [isNotEmpty],
        email: [isNotEmpty, isValidEmail],
        password: [isNotEmpty, isValidPassword],
      },
    },
    { display: PrivacyPage, name: 'Privacy' },
    { display: ConfirmationPage, name: 'Done' },
  ];

  const onSubmit = (formData: Record<string, any>) => {
    const flattenedFormValues = Object.values(formData).reduce(
      (pageValues, out) => ({ ...out, ...pageValues }),
      {},
    );
    console.log(
      `Form submitted! Data:\n${JSON.stringify(flattenedFormValues, null, 2)}`,
    );
  };

  return <MultiPageForm pages={pages} onSubmit={onSubmit} />;
};

export default SignUpForm;
