import React from 'react';
import MultiPageForm from './components/MultiPageForm';
import PersonalDetailsPage from './components/SignUpForm/PersonalDetailsPage';
import PrivacyPage from './components/SignUpForm/PrivacyPage';

function App() {
  const pages = [
    { display: PersonalDetailsPage, name: 'Personal details' },
    { display: PrivacyPage, name: 'Privacy' },
  ];

  return (
    <div className="App">
      <MultiPageForm pages={pages} />
    </div>
  );
}

export default App;
