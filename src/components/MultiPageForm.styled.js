import styled, { css } from 'styled-components';

export const SubmitButton = styled.button`
  background: #0a9d0d;
  box-sizing: border-box;
  position: relative;
  color: white;
  font-weight: bold;
  padding: 8px;
  box-shadow: 2px 2px 0 0 black;
  cursor: pointer;

  &:active {
    top: 1px;
    left: 1px;
    box-shadow: none;
  }
`;

export const FormContainer = styled.div`
  margin: auto;
  width: 500px;
`;

export const PageContainer = css`
  border: 2px solid black;
  margin-top: 4px;
  padding: 16px;
`;

export const EndScreenContainer = styled.div`
  ${PageContainer}
`;

export const FormPageContainer = styled.form`
  ${PageContainer}
`;
