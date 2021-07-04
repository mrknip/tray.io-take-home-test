import styled from 'styled-components';

export const CheckboxContainer = styled.div`
  position: relative;
  padding-left: 30px;
  margin-bottom: 16px;
`;

export const CheckboxInput = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 2px solid black;
  border-radius: 2px;
  text-align: center;
  cursor: pointer;
`;

export const CheckBoxLabel = styled.span`
  max-width: calc(100% - 30px);
  display: inline-block;
  vertical-align: middle;
`;
