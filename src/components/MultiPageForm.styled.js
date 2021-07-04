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

const PageContainer = css`
  margin: auto;
  width: 500px;
  height: 500px;
  border: 1px solid red;
`;

export const EndScreenContainer = styled.div`
  ${PageContainer}
`;

export const FormContainer = styled.form`
  ${PageContainer}
`;
