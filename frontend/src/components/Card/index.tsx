import {
  MainContainer,
  TextContainer,
  Title,
  SecondRowContainer,
  Author,
  StyledDate,
  Description,
} from "./style";
import CardModal from "../CardModal";
import { createRef, useRef, useState } from "react";
import Avatar from "../Avatar";

export default function Card({
  title = "title",
  author = "author",
  date = "date",
  description = "description",
}) {
  const seed = useRef<number>(Math.random() * (1000 - 1) + 1);

  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <CardModal isOpen={isOpen} setIsOpen={setIsOpen} isNew={false} />
      <MainContainer onClick={handleCardClick}>
        <Avatar seed={seed.current} />
        <TextContainer>
          <Title>{title}</Title>
          <SecondRowContainer>
            <Author>{author}</Author>
            <StyledDate>{date}</StyledDate>
          </SecondRowContainer>
          <Description>{description}</Description>
        </TextContainer>
      </MainContainer>
    </>
  );
}
