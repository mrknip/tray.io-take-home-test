import React from 'react';
import {
  StepNameContainer,
  ProgressIndicatorContainer,
} from './ProgressIndicator.styled';

interface ProgressIndicatorProps {
  currentStep: number;
  stepNames: string[];
}

const ProgressIndicator = ({
  currentStep,
  stepNames,
}: ProgressIndicatorProps) => (
  <ProgressIndicatorContainer>
    {stepNames.map((stepName, index) => (
      <StepNameContainer key={stepName} isActive={index === currentStep}>
        {stepName}
      </StepNameContainer>
    ))}
  </ProgressIndicatorContainer>
);

export default ProgressIndicator;
