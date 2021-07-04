import styled from 'styled-components';

export const TextInputContainer = styled.div`
  /* border: 1px solid green; */
  padding: 8px;
  user-select: none;
`;

interface TextInputFieldProps {
  hasError: boolean;
}

export const TextInputField = styled.input<TextInputFieldProps>`
  display: block;
  border: ${(props) => (props.hasError ? '2px solid red' : '2px solid black')};
  box-sizing: border-box;
  width: 100%;
  margin-top: 8px;
  padding: 4px;
`;

export const ErrorMessage = styled.div`
  background: rgba(255, 0, 0, 0.2);
  color: red;
  padding: 8px;
`;

export const TextInputLabel = styled.label`
  font-size: 14px;
`;

export const RequiredIndicator = styled.span`
  color: red;
  vertical-align: middle;
  margin-left: 4px;
`;
