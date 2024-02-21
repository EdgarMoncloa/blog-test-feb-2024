import styled from "styled-components";
import backgroundImg from "./../imgs/cubes-pattern.png";
import textStyles from "../tokens/textStyle.ts";

const MainView = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  overflow: hidden;
  display: flex;
  background-color: var(--color-primary-800);
  background-image: url(${backgroundImg});
`;

const Content = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: 100%;
  grid-template-rows: 1fr 2fr 20fr;
  height: 95%;
  margin: auto;
  max-width: 580px;
  min-height: 720px;
  min-width: 480px;
  width: 50%;
`;

const StyledH1 = styled.h1`
  text-align: center;
  color: var(--color-neutral-50);
  margin: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const MenuContainer = styled.div`
  backdrop-filter: blur(4px);
  background: var(--background-gradient);
  border-radius: 8px;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const Menu = styled.div`
  width: 100%;
  height: auto;
  margin: 16px 32px;
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr 120px;
  grid-template-rows: 100%;
`;

const CardsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  backdrop-filter: blur(4px);
  background: var(--background-gradient);
  border-radius: 8px;
  overflow: hidden;
`;

const CardsList = styled.div`
  width: calc(100% - 64px);
  height: calc(100% - 64px);
  margin: auto;
  justify-content: center;
  display: grid;
  grid-template-columns: 100%;
  grid-auto-rows: 80px;
  overflow: auto;
  gap: 8px;

  overflow-x: hidden;
  /* width */
  &::-webkit-scrollbar {
    width: 12px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background-color: transparent;

    box-shadow: inset 0 0 10px 10px transparent;
    border: solid 3px transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;

    background: var(--color-primary-800);
    background-clip: padding-box;

    border: 4px solid transparent;
  }
`;

const OfflineElement = styled.div`
  ${textStyles.h6}
  text-align:center;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  min-height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export {
  MainView,
  Content,
  StyledH1,
  MenuContainer,
  Menu,
  CardsContainer,
  CardsList,
  OfflineElement,
};
