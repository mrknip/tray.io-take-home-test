import styled, { css } from 'styled-components';

const BaseButton = css`
  background: #0a9d0d;
  box-sizing: border-box;
  position: relative;
  color: white;
  font-weight: bold;
  padding: 8px;
  box-shadow: 2px 2px 0 0 black;
  cursor: pointer;
  position: relative;
  left: 100%;
  transform: translateX(-100%);
  margin-top: 16px;

  &:active {
    top: 1px;
    left: calc(100% + 1px);
    box-shadow: none;
  }
`;

export const NextPageButton = styled.button`
  ${BaseButton}
`;

export const SubmitButton = styled.input`
  ${BaseButton}
`;

export const FormContainer = styled.div`
  margin: auto;
  width: 500px;
`;

export const PageContainer = css`
  border: 2px solid black;
  border-radius: 2px;
  margin-top: 4px;
  padding: 16px;
`;

export const EndScreenContainer = styled.div`
  ${PageContainer}
`;

export const FormPageContainer = styled.form`
  ${PageContainer}
`;
