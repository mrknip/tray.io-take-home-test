import React from 'react';
import MultiPageForm from './components/MultiPageForm';
import UserPage from './components/SignUpForm/UserPage';
import PrivacyPage from './components/SignUpForm/PrivacyPage';

function App() {
  const pages = [
    { display: UserPage, name: 'User' },
    { display: PrivacyPage, name: 'Privacy' },
  ];

  const endScreen = <div>Well done</div>;

  return (
    <div>
      <MultiPageForm pages={pages} endScreen={endScreen} />
    </div>
  );
}

export default App;
