import React from 'react';
import MultiPageForm from './components/MultiPageForm';
import UserPage from './components/SignUpForm/UserPage';
import PrivacyPage from './components/SignUpForm/PrivacyPage';
import {
  isNotEmpty,
  isValidEmail,
  isValidPassword,
} from './helpers/formValidators';

function App() {
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

  const endScreen = <div>Well done</div>;

  return <MultiPageForm pages={pages} endScreen={endScreen} />;
}

export default App;
