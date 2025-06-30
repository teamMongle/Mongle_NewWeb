import React from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  width: 330px;
  height: 130px;
  background: #fff;
  border-radius: 28px;
  // padding: 24px;
  padding: 40px 32px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Message = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #121212;
  // margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 12px;
`;

const Button = styled.button`
  padding: 10px 16px;
  border: none;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  color: white;
  border-radius: 12px;
  width: 140px;
  background-color: ${({ cancel }) => (cancel ? "#F3F4F6" : "#121212")};
  color: ${({ cancel }) => (cancel ? "#6B7280" : "#FFFFFF")};

  &:hover {
    background-color: ${({ cancel }) => (cancel ? "#E7E7E7" : "#121212")};
    opacity: 0.9;
  }
`;

const Modal = ({ message, onConfirm, onCancel, showCancel = false }) => {
  return (
    <ModalBackground>
      <ModalContainer>
        <Message>{message}</Message>
        <ButtonGroup>
          {showCancel && (
            <Button cancel onClick={onCancel}>취소</Button>
          )}
          <Button onClick={onConfirm}>작품 삭제</Button>
        </ButtonGroup>
      </ModalContainer>
    </ModalBackground>
  );
};

export default Modal;