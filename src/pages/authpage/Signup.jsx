import React, { useState } from "react";
import styled from "styled-components";
import * as M from "./authStyle";
import CheckIcon from "../../assets/images/Check.svg";
import { useNavigate } from "react-router-dom";

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
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    name: "",
    age: "",
  });

  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const validateUsername = (username) => {
    const regex = /^[a-z0-9]{4,20}$/; // 4~20자 영문 소문자+숫자
    return regex.test(username);
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
      const response = await fetch("http://3.36.64.165:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      if (response.ok) {
        alert("회원가입 성공!");
        setIsLoggedIn(true);
        navigate("/main");
      } else {
        alert("회원가입 실패");
        console.error("회원가입 실패 응답:", await response.text());
      }
    } catch (error) {
      console.error("에러 발생:", error);
      alert("서버와의 연결에 실패했습니다.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (step === 1) {
        if (!isValidUsername || !isValidPassword) {
          alert("아이디 또는 비밀번호 형식을 확인해 주세요.");
        } else {
          setStep(2);
        }
      } else if (step === 2) {
        if (!signupData.name || !signupData.age) {
          alert("이름과 나이를 입력해 주세요.");
        } else {
          handleSubmit();
        }
      }
    }
  };

  return (
    <M.Container>
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
