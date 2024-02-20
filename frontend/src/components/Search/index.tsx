import { AiOutlineSearch } from "react-icons/ai";
import { MainContainer, SearchInput, LabelIconSearch } from "./styles";

export default function Search() {
  return (
    <MainContainer>
      <SearchInput type="text" name="search" id="search" />
      <LabelIconSearch htmlFor="search">
        <AiOutlineSearch size={16} />
      </LabelIconSearch>
    </MainContainer>
  );
}
