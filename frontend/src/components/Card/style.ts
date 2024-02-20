import styled from "styled-components";
import textStyles from "../../tokens/textStyle";

export const MainContainer = styled.div`
  cursor: pointer;
  background: var(--color-neutral-50);
  border-radius: 8px;
  column-gap: 16px;
  display: grid;
  grid-template-columns: 80px 1fr;
  height: 80px;
  overflow: hidden;
  width: 100%;
  align-items: center;
  position: relative;

  &:hover::before {
    content: "";
    width: 100%;
    display: flex;
    height: 100%;
    position: absolute;
    background: #011138aa;
  }

  &:hover::after {
    color: var(--color-neutral-50);
    content: "Clic para ver nota completa.";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const TextContainer = styled.div`
  width: calc(100% - 16px);
  overflow: hidden;
`;

export const Title = styled.div`
  ${textStyles.h6}
`;

export const SecondRowContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const Author = styled.div`
  ${textStyles.body2}
`;

export const StyledDate = styled.div`
  ${textStyles.body2}
`;

export const Description = styled.div`
  ${textStyles.body1}
`;
