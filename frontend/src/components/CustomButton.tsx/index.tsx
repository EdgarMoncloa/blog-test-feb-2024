import styled, { css } from "styled-components";

type customButtonProps = {
  text: string;
  isOutlined?: boolean;
  handleClick: () => void;
};
export default function CustomButton({
  text,
  isOutlined = false,
  handleClick,
}: customButtonProps) {
  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    handleClick();
  };
  return (
    <>
      <MainContainer onClick={handleButtonClick} isOutlined={isOutlined}>
        {text}
      </MainContainer>
    </>
  );
}

const filledStyles = css`
  background: var(--color-secondary-500);
  border: none;
`;
const outlinedStyles = css`
  background: var(--color-neutral-50);
  border: var(--color-secondary-500);
`;

const MainContainer = styled.button<{ isOutlined: boolean }>`
  ${(p) => (p.isOutlined === true ? outlinedStyles : filledStyles)}

  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  min-height: 40px;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.5);
  }
`;
