import {
  MainContainer,
  TextContainer,
  Title,
  SecondRowContainer,
  Author,
  StyledDate,
  Content,
} from "./style";
import CardModal from "../CardModal";
import { useState } from "react";
import Avatar from "../Avatar";

type cardType = {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
};

export default function Card({ id, title, author, date, content }: cardType) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCardClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <CardModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isNew={false}
        handleAccept={() => {}}
        author={author}
        title={title}
        date={date}
        content={content}
      />
      <MainContainer onClick={handleCardClick}>
        <Avatar seed={id} />
        <TextContainer>
          <Title>{title}</Title>
          <SecondRowContainer>
            <Author>{author}</Author>
            <StyledDate>{date}</StyledDate>
          </SecondRowContainer>
          <Content>
            {content.length > 70 ? content.slice(0, 70) + "..." : content}
          </Content>
        </TextContainer>
      </MainContainer>
    </>
  );
}
