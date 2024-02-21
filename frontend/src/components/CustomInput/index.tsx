import styled from "styled-components";

type customInputProps = {
  placeholder: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  type?: string;
};
export default function CustomInput({
  placeholder,
  value,
  setValue,
  type = "text",
}: customInputProps) {
  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setValue(event.target.value);
  };

  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleInputChange}
    />
  );
}

const StyledInput = styled.input`
  border-radius: 8px;
  border: none;
  height: 48px;
  outline: none;
  padding: 0 16px;
  width: 100%;

  &:focus {
    border: 1px solid var(--color-primary-700);
  }
`;
