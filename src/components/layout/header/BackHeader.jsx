import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowLeft from "../../../assets/images/backIcon.svg";
import * as M from "./HeaderStyle";

const BackHeader = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <M.HeaderContainer>
      <M.HeaderContent>
        <M.BackButton onClick={handleBackClick}>
          <M.BackIcon src={ArrowLeft} alt="뒤로가기" />
        </M.BackButton>
      </M.HeaderContent>
    </M.HeaderContainer>
  );
};

export default BackHeader;
