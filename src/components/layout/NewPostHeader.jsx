import styled from "styled-components";

const Header = styled.div`
    // transform: translate(-50%, -50%);
    width: 70%;
    height: 80px;
    position: relative;
    top: 100px;
    // left: 50%;
    // transform: translateX(-50%);
    margin: 0 auto;

    border-bottom: 2px solid black;
    font-size: 22px;
    font-weight: 800;

    display: flex;
    align-items: center;

    // padding-left: 20px;

    background-color: white;
    z-index: 10;
`

export default function NewPostHeader({ title }) {


    return (
        <Header >
            {/* 글 쓰기 */}
            {title}
        </Header>
    );
}