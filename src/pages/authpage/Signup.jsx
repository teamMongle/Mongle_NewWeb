import React, { useState } from "react";
import styled from "styled-components";
import * as M from "./authStyle";
import CheckIcon from "../../assets/images/Check.svg";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/common/Modal";

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SignupBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  width: 280px;
`;

const CheckIconStyled = styled(M.Icon)`
  position: absolute;
  right: 10px;
  top: 45%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
`;

const CheckIconStyled_pwd = styled(CheckIconStyled)`
  top: 90%;
`;

const SelectBox = styled.select`
  width: 300px;
  height: 50px;
  padding: 10px;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  font-size: 16px;
  outline: none;

  &::placeholder {
    color: #9CA3AF;
    font-size: 16px;
  }
  &:focus {
    border-color: #C5C7CB;
  }
`;

export default function Signup({ setIsLoggedIn }) {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [onConfirmCallback, setOnConfirmCallback] = useState(() => () => { });
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    name: "",
    age: "",
  });

  const validateUsername = (username) => {
    const regex = /^[a-z0-9]{4,20}$/; // 4~20자 영문 소문자+숫자
    return regex.test(username);
  };

  const showAlert = (msg) => {
    setModalMessage(msg);
    setIsConfirm(false);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    if (isConfirm && onConfirmCallback) onConfirmCallback();
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return regex.test(password);
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));

    if (name === "username") {
      setIsValidUsername(validateUsername(value));
    }
    if (name === "password") {
      setIsValidPassword(validatePassword(value));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://3.39.231.73:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      if (response.ok) {
        // alert("회원가입 성공!");
        setModalMessage("회원가입 성공!");
        setModalVisible(true);
        setIsLoggedIn(true);
        handleLogin(signupData.username, signupData.password);
        // navigate("/main");
      } else {
        console.error("회원가입 실패 응답:", await response.text());
        // alert("회원가입 실패");
        setModalMessage("회원가입 실패");
        setModalVisible(true);
      }
    } catch (error) {
      console.error("에러 발생:", error);
      // alert("서버와의 연결에 실패했습니다.");
      setModalMessage("서버와의 연결에 실패했습니다.");
      setModalVisible(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (step === 1) {
        if (!isValidUsername || !isValidPassword) {
          // alert("아이디 또는 비밀번호 형식을 확인해 주세요.");
          setModalMessage("아이디 또는 비밀번호 형식을 확인해 주세요.");
          setModalVisible(true);
        } else {
          setStep(2);
        }
      } else if (step === 2) {
        if (!signupData.name || !signupData.age) {
          showAlert("이름과 나이를 입력해 주세요.");
          setModalMessage("이름과 나이를 입력해 주세요.");
          setModalVisible(true);
        } else {
          handleSubmit();
        }
      }
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch("http://3.39.231.73:5000/login", {
      // const response = await axios.post("http://3.39.231.73:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password,
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

  return (
    <M.Container>
      {modalVisible && (
        <Modal
          message={modalMessage}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          showCancel={isConfirm}
                    confirmLabel="확인"
        />
      )}
      <M.Content>
        {step === 1 ? (
          <>
            <M.Text>아이디와 비밀번호를 입력해 주세요.</M.Text>
            <InputWrapper>
              <SignupBox>
                <p>아이디</p>
                <M.Input
                  type="text"
                  name="username"
                  placeholder="아이디"
                  value={signupData.username}
                  onChange={handleSignupChange}
                  onKeyDown={handleKeyDown}
                />
                {isValidUsername && (
                  <CheckIconStyled src={CheckIcon} alt="Check Icon" />
                )}

                <p>비밀번호</p>
                <M.Input
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  onKeyDown={handleKeyDown}
                />
                {isValidPassword && (
                  <CheckIconStyled_pwd src={CheckIcon} alt="Check Icon" />
                )}
              </SignupBox>
            </InputWrapper>
            <M.Button
              disabled={!isValidUsername || !isValidPassword}
              onClick={() => setStep(2)}
            >
              다음
            </M.Button>
          </>
        ) : (
          <InputWrapper>
            <SignupBox>
              <p>이름</p>
              <M.Input
                type="text"
                name="name"
                placeholder="이름"
                value={signupData.name}
                onChange={handleSignupChange}
                onKeyDown={handleKeyDown}
              />
              <p>나이</p>
              <SelectBox
                name="age"
                value={signupData.age}
                onChange={handleSignupChange}
                onKeyDown={handleKeyDown}
              >
                <option value="">나이</option>
                {Array.from({ length: 54 }, (_, index) => index + 12).map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </SelectBox>
              <M.Button
                // disabled={!signupData.name || !signupData.age}
                // onClick={handleSubmit}
                onClick={() => {
                  if (!signupData.name || !signupData.age) {
                    alert("이름과 나이를 입력해 주세요.");
                  } else {
                    handleSubmit();
                  }
                }}
              >
                다음
              </M.Button>
            </SignupBox>
          </InputWrapper>
        )}
      </M.Content>
    </M.Container>
  );
}
