import styled from 'styled-components';

export const TextInputContainer = styled.div`
  /* border: 1px solid green; */
  padding: 8px;
  user-select: none;
`;

export const TextInputField = styled.input`
  display: block;
  border: 2px solid black;
  box-sizing: border-box;
  width: 100%;
  margin-top: 8px; ;
`;

export const TextInputLabel = styled.label`
  font-size: 14px;
`;

export const RequiredIndicator = styled.span`
  color: red;
  vertical-align: middle;
  margin-left: 4px;
`;
