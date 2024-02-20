import { useState } from "react";
import styled from "styled-components";

export default function CustomInput({ defaultValue = "" }) {
  const [value, setValue] = useState<string>(defaultValue);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setValue(event.target.value);
  };

  const handleInputFocus: React.FocusEventHandler<HTMLInputElement> = (
    event
  ) => {
    event.target.select();
  };

  return (
    <StyledInput
      value={value}
      onChange={handleInputChange}
      onFocus={handleInputFocus}
    />
  );
}

const StyledInput = styled.input`
  border-radius: 8px;
  border: none;
  height: 48px;
  outline: none;
  padding-left: 16px;
  width: 100%;

  &:focus {
    border: 1px solid var(--color-primary-700);
  }
`;
