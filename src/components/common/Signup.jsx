import React, { useState } from "react";
import styled from "styled-components";
import CheckIcon from "../../assets/images/Check.svg";
import {
    Container, Content, Icon, Text, Input, Button
} from "../../styles/auth";

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const InputWithCheck = styled(Input)`
  position: relative;
  padding-right: 30px;  // 오른쪽에 체크 아이콘 공간 추가
`;

const CheckIconStyled = styled(Icon)`
  position: absolute;
  right: 10px; // 오른쪽에 위치하도록 설정
  top: 50%;
  transform: translateY(-50%); // 수직 가운데 정렬
  width: 16px; // 아이콘 크기 조정
  height: 16px;
`;

export default function Signup() {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isValidInfo, setIsValidInfo] = useState(false);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    const [signupData, setSignupData] = useState({
        username: "",
        password: "",
        name: "",
        age: "",
    });

    const validateInfo = () => {
        const { username, password } = signupData;
        setIsValidInfo(username.length > 0 && password.length > 0);
    };

    // const handleSignupChange = (e) => {
    //     const { name, value } = e.target;

    //     setSignupData((prev) => ({
    //         ...prev,
    //         [name]: value, // name 속성을 key로 사용
    //     }));
    // };

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData((prev) => {
            const updatedData = { ...prev, [name]: value };
            return updatedData;
        });

        if (name === "username" || name === "password") {
            validateInfo();
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://3.36.64.165:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupData),
            });

            if (response.ok) {
                console.log("회원가입 성공!");
            } else {
                console.error("회원가입 실패");
            }
        } catch (error) {
            console.error("에러 발생:", error);
        }
    };

    return (
        <Container>
            <Content>
                {step === 1 ? (
                    <>
                        <Text>아이디와 비밀번호를 입력해 주세요.</Text>
                        <InputWrapper>
                            <p>아이디</p>
                            <InputWithCheck
                                type="text"
                                name="username"
                                placeholder="아이디"
                                value={signupData.username}
                                onChange={handleSignupChange}
                            />
                            {signupData.username && isValidInfo && (
                                <CheckIconStyled src={CheckIcon} alt="Check Icon" />
                            )}
                            <p>비밀번호</p>

                            <InputWithCheck
                                type="password"
                                name="password"
                                placeholder="비밀번호"
                                value={signupData.password}
                                onChange={handleSignupChange}
                            />
                            {signupData.password && isValidInfo && (
                                <CheckIconStyled src={CheckIcon} alt="Check Icon" />
                            )}
                        </InputWrapper>
                        <Button
                            disabled={!isValidInfo}
                            onClick={() => setStep(2)}>
                            다음
                        </Button>
                    </>
                ) : (
                    <>
                        <Input
                            type="text"
                            name="name"
                            placeholder="이름"
                            value={signupData.name}
                            onChange={handleSignupChange}
                        />
                        <Input
                            type="number"
                            name="age"
                            placeholder="나이"
                            value={signupData.age}
                            onChange={handleSignupChange}
                        />
                        <Button
                            disabled={!signupData.name || !signupData.age}
                            onClick={handleSubmit}
                        >
                            다음
                        </Button>
                    </>
                )}
            </Content>
        </Container>
    );
}