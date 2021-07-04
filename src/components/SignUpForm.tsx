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
  ];

  return <MultiPageForm pages={pages} endScreen={<ConfirmationPage />} />;
};

export default SignUpForm;
