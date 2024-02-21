import { createPortal } from "react-dom";
import styled from "styled-components";
import textStyles from "../../tokens/textStyle";
import { createRef, useState } from "react";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton.tsx";
import Avatar from "../Avatar/index.tsx";

export type cardModalValues = {
  author: string;
  title: string;
  date?: string;
  content: string;
};

type CardModalProps = {
  isOpen: boolean;
  isNew: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAccept: (values: cardModalValues) => void;
  author?: string;
  title?: string;
  date?: string;
  content?: string;
  customTitle?: string | null;
};
export default function CardModal({
  isOpen,
  isNew = false,
  setIsOpen,
  handleAccept,
  author,
  title,
  date,
  content,
  customTitle,
}: CardModalProps) {
  const backgroundModalRef = createRef<HTMLDivElement>();

  const [authorVal, setAuthorVal] = useState<string>(author || "");
  const [titleval, setTitleVal] = useState<string>(title || "");
  const [contentVal, setContentVal] = useState<string>(content || "");

  const handleModalExit: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (
      backgroundModalRef.current &&
      event.target === backgroundModalRef.current
    ) {
      setIsOpen(false);
    }
  };

  let ModalContent;
  if (isNew === true) {
    ModalContent = (
      <ContentContainer>
        <Title>{customTitle || "Agregar nueva entrada"}</Title>
        <CustomInput
          placeholder="Título"
          value={authorVal}
          setValue={setAuthorVal}
        />
        <CustomInput
          placeholder="Autor"
          value={titleval}
          setValue={setTitleVal}
        />
        <CustomInput
          placeholder="Descripción"
          type="textarea"
          value={contentVal}
          setValue={setContentVal}
        />
        <ButtonsContainer>
          <CustomButton
            handleClick={() => {
              setAuthorVal("");
              setTitleVal("");
              setContentVal("");
              handleAccept({
                author: authorVal,
                title: titleval,
                content: contentVal,
              });
            }}
            text="Guardar"
          />
          <CustomButton
            handleClick={() => {
              setAuthorVal("");
              setTitleVal("");
              setContentVal("");
              setIsOpen(false);
            }}
            isOutlined={true}
            text="Cancelar"
          />
        </ButtonsContainer>
      </ContentContainer>
    );
  } else {
    ModalContent = (
      <ContentContainer>
        <Title>{title}</Title>
        <StyledText>Autor:{author}</StyledText>
        <StyledText>Fecha de publicación:{date}</StyledText>
        <StyledText>{content}</StyledText>
        <ButtonsContainer>
          <CustomButton handleClick={() => setIsOpen(false)} text="Regresar" />
        </ButtonsContainer>
      </ContentContainer>
    );
  }
  const Modal = (
    <MainContainer ref={backgroundModalRef} onClick={handleModalExit}>
      {ModalContent}
    </MainContainer>
  );
  return isOpen === true && createPortal(Modal, document.body);
}

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #011138cc;
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
`;

const ContentContainer = styled.div`
  border-radius: 8px;
  width: 480px;
  background-color: var(--color-neutral-100);
  margin: auto;
  display: flex;
  padding: 32px;
  flex-direction: column;
  gap: 16px;
  text-align: center;
  background: var(--background-gradient-dark);
`;

const Title = styled.h4`
  ${textStyles.h4}
  margin: 0;
`;

const StyledText = styled.div`
  ${textStyles.body1}
  width:100%;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  gap: 16px;
`;
