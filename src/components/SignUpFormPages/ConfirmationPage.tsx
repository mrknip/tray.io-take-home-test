import React from 'react';
import { ReactComponent as TickSVG } from '../../assets/tick.svg';
import { TickContainer, ConfirmationMessage } from './ConfirmationPage.styled';

const ConfirmationPage = () => {
  return (
    <>
      <TickContainer>
        <TickSVG />
      </TickContainer>
      <ConfirmationMessage>
        Please verify your email address, you should have received an email from
        us already!
      </ConfirmationMessage>
    </>
  );
};

export default ConfirmationPage;
