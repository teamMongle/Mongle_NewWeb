import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MongleIcon from "../../assets/images/mongleIcon.svg";
import * as M from "./authStyle";
import axios from "axios";
import Modal from "../../components/common/Modal";

const InputWrapper = styled.div`
  position: relative;
  // width: 100%;
`;

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px;
  margin-top: 24px;
  width: 280px;
`;

const SignupButton = styled.button`
  font-size: 14px;
  color: #111827;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  })

  const showAlert = (msg) => {
    setModalMessage(msg);
    setIsConfirm(false);
    setModalVisible(true);
  };

  const showConfirm = (msg, onConfirmCallback) => {
    setModalMessage(msg);
    setIsConfirm(true);
    setModalVisible(true);
    setOnConfirmCallback(() => onConfirmCallback); // callback 저장
  };

  const [onConfirmCallback, setOnConfirmCallback] = useState(() => () => { });

  const handleConfirm = () => {
    if (isConfirm && onConfirmCallback) onConfirmCallback();
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => {
      const updatedData = { ...prev, [name]: value };
      console.log(updatedData)
      return updatedData;
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginData.username || !loginData.password) {
      showAlert("아이디와 비밀번호를 모두 입력해 주세요.");
      return;
    }

    // if (loginData.username === validUsername && loginData.password === validPassword) {
    //   alert("로그인 성공!");
    // } else {
    //   alert("아이디 또는 비밀번호가 틀렸습니다.");
    // }

    try {
      const response = await fetch("http://3.39.231.73:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("로그인 성공:", data);
        setIsLoggedIn(true);  // props로 받은 함수
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", data.access_token);
        navigate("/main");
      } else {
        const errorData = await response.text(); // 혹은 .json() 형식에 따라
        console.error("로그인 실패:", errorData);
        console.error("에러 상태 코드:", response.status);
        // alert("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
        if (response.status === 401) {
          // alert("비밀번호가 틀렸습니다. 다시 확인해 주세요.");
          showAlert("비밀번호가 틀렸습니다. 다시 확인해 주세요.");
        } else {
          // alert("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
          showAlert("로그인에 실패했습니다!");
        }
      }
    } catch (error) {
      console.error("에러 발생:", error.message);
      alert("네트워크 오류입니다. 서버를 확인해 주세요.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (!loginData.username || !loginData.password) {
        showAlert("아이디와 비밀번호를 입력해 주세요.");
      } else {
        handleLogin(e);
      }
    }
  };


  return (
    <M.Container>
      {modalVisible && (
        <Modal
          message={modalMessage}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          showCancel={isConfirm}
        />
      )}
      <M.Content>
        <M.Icon src={MongleIcon} alt="Mongle Icon" />
        <M.Text>몽글몽글한 이야기들이 가득한 곳</M.Text>
        <InputWrapper>
          <LoginBox>
            <M.Input
              type="text"
              name="username"
              placeholder="아이디"
              value={loginData.username}
              onChange={handleLoginChange}
              onKeyDown={handleKeyDown}
            />
            <M.Input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={loginData.password}
              onChange={handleLoginChange}
              onKeyDown={handleKeyDown}
            />
            <M.Button onClick={handleLogin}>로그인</M.Button>
            <div style={{ display: "flex" }}>
              <M.SignupText>아직 계정이 없으신가요?&nbsp;&nbsp;</M.SignupText>
              <SignupButton onClick={() => { navigate("/signup") }}>회원가입</SignupButton>
            </div>
          </LoginBox>
        </InputWrapper>
      </M.Content>
    </M.Container >
  );
}