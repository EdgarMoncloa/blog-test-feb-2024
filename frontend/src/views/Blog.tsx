import styled from "styled-components";

export default function Blog() {
  return (
    <MainContaienr>
      <StyledH1>Blog posts</StyledH1>
    </MainContaienr>
  );
}

const MainContaienr = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 100%;
  overflow: hidden;
  background-color: red;
`;

const StyledH1 = styled.h1`
  width: 100%;
  height: 100%;
  justify-content: center;
`;
