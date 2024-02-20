import styled from "styled-components";
import textStyles from "../../tokens/textStyle";

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: var(--color-neutral-50, #f4f4f4);
  display: flex;
`;

export const SearchInput = styled.input`
  outline: none;
  border: none;
  width: 100%;
  margin-left: 8px;
  ${textStyles.caption}
`;

export const LabelIconSearch = styled.label`
  cursor: pointer;
  width: 32px;
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
`;
