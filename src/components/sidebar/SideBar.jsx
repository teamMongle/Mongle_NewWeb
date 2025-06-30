import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = styled.div`
	width: 256px;
	left: 0;
	height: 948px;
    margin-top: 50px;
	position: fixed;
	justify-content: center;
`;

const SideBar = ({ onClickLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const getButtonStyle = (path) => ({
        backgroundColor: "transparent",
        border: "none",
        marginLeft: "100px",
        padding: "20px",
        cursor: "pointer",
        fontSize: "18px",
        color: location.pathname === path ? "#121212" : "#9CA3AF",
        fontWeight: location.pathname === path ? "bold" : "normal",
        textAlign: "left",
        width: "155px",
        borderBottom: path === "/mypage" ? "1px solid #F3F3F3" : "none",
        marginTop: path === "/mypage" ? "150px" : "0",
    });

    return (
        <Sidebar>
            <button
                style={getButtonStyle("/mypage")}
                onClick={() => navigate("/mypage")}
            >
                프로필
            </button>
            <button
                style={getButtonStyle("/mypage/myworks")}
                onClick={() => navigate("/mypage/myworks")}
            >
                내 작품 목록
            </button>
            <button
                style={getButtonStyle("/mypage/likedworks")}
                onClick={() => navigate("/mypage/likedworks")}
            >
                좋아요 목록
            </button>
            <button
                style={getButtonStyle("/draft")}
                onClick={() => navigate("/draft")}
            >
                임시저장
            </button>
            <button
                style={getButtonStyle("/logout")}
                // onClick={() => { onClickLogout() }}
                onClick={() => navigate("/")}
            >
                로그아웃
            </button>
        </Sidebar>
    );
}

export default SideBar;