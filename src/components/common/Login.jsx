import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MongleIcon from "../../assets/images/mongleIcon.svg";
import { 
    Container, Content, Icon, Text, LoginBox, Input, Button, SignupText 
} from "../../styles/auth";

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


export default function Login() {
    const navigate = useNavigate();

    return (
        <Container>
            <Content>
                {/* <Icon src={`${process.env.PUBLIC_URL}/assets/images/mongleIcon.svg`} alt="Mongle Icon" /> */}
                <Icon src={MongleIcon} alt="Mongle Icon"/>
                <Text>몽글몽글한 이야기들이 가득한 곳</Text>
                <LoginBox>
                    <Input type="text" placeholder="아이디" />
                    <Input type="password" placeholder="비밀번호" />
                    <Button>로그인</Button>
                    <div style={{ display: "flex" }}>
                        <SignupText>아직 계정이 없으신가요?&nbsp;&nbsp;</SignupText>
                        <SignupButton onClick={() => { navigate("/signup")}}>회원가입</SignupButton>
                    </div>
                </LoginBox>
            </Content>
        </Container>
    );
}