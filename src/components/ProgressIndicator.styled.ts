import styled from 'styled-components';

export const ProgressIndicatorContainer = styled.div`
  display: flex;
  margin: auto;
  border: 2px solid black;
`;

export const StepNameContainer = styled.div<{ isActive: boolean }>`
  display: inline-block;
  flex-grow: 1;
  padding: 8px;
  box-sizing: border-box;
  border-right: 2px solid black;

  &:last-child {
    border-right: none;
  }

  background: ${(props) => (props.isActive ? 'rgba(0, 0, 255, 0.3)' : 'none')};
  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
`;
