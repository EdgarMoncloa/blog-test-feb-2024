import { AiOutlineSearch } from "react-icons/ai";
import { MainContainer, SearchInput, LabelIconSearch } from "./styles";

type searchPropsType = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};
export default function Search({ value, setValue }: searchPropsType) {
  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setValue(event.target.value);
  };
  return (
    <MainContainer>
      <SearchInput
        type="text"
        name="search"
        id="search"
        value={value}
        onChange={handleSearchChange}
      />
      <LabelIconSearch htmlFor="search">
        <AiOutlineSearch size={16} />
      </LabelIconSearch>
    </MainContainer>
  );
}
