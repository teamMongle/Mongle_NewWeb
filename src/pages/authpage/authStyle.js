import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 95vh;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Icon = styled.img`
    width: 180px;
    height: auto;
`;

export const Font = styled.p`
    font-weight: 600;
`;

export const Text = styled(Font)`
    font-size: 21px;
    color: #121212;
    margin: 20px 0;
`;

export const Input = styled.input`
    width: 100%;
    height: 25px;
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

export const Button = styled.button`
    width: 300px;
    padding: 12px;
    margin-top: 20px;
    background: #121212;
    color: white;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 12px;
    cursor: pointer;
`;

export const SignupText = styled.span`
    font-size: 14px;
    color: #9CA3AF;
`;