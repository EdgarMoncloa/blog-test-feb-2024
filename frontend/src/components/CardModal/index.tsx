import { createPortal } from "react-dom";
import styled from "styled-components";
import textStyles from "../../tokens/textStyle";
import { createRef } from "react";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton.tsx";

type CardModalProps = {
  isOpen: boolean;
  isNew: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAccept: () => void;
  handleDelete: () => void;
};
export default function CardModal({
  isOpen,
  isNew = false,
  setIsOpen,
  handleAccept,
  handleDelete,
}: CardModalProps) {
  const backgroundModalRef = createRef<HTMLDivElement>();

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
        <Title>Agregar nueva entrada</Title>
        <CustomInput defaultValue={"Title"} />
        <CustomInput defaultValue={"Autor"} />
        <CustomInput defaultValue={"Fecha"} />
        <CustomInput defaultValue={"Descripcion"} />
        <ButtonsContainer>
          <CustomButton handleClick={handleAccept} text="Guardar" />
          <CustomButton
            handleClick={handleDelete}
            isOutlined={true}
            text="Eliminar"
          />
        </ButtonsContainer>
      </ContentContainer>
    );
  } else {
    ModalContent = (
      <ContentContainer>
        <Title>Title</Title>
        <StyledText>Autor</StyledText>
        <StyledText>Fecha</StyledText>
        <StyledText>Descripcion</StyledText>
        <ButtonsContainer>
          <CustomButton handleClick={handleAccept} text="Regresar" />
          <CustomButton
            handleClick={handleDelete}
            isOutlined={true}
            text="Eliminar"
          />
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
