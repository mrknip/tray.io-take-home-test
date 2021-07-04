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

  return <MultiPageForm pages={pages} />;
};

export default SignUpForm;
