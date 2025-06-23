import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as M from "./HeaderStyle";

const Header = ({ isLoggedIn, onLoginClick }) => {
  const location = useLocation();
  const getActiveLinkStyle = (path) => {
    return location.pathname === path
      ? { fontWeight: 700, color: "#121212" }
      : {};
  };
  const navigate = useNavigate();

  return (
    <M.HeaderContainer>
      <M.HeaderContent>
        <Link to="/main">
          <M.Logo />
        </Link>

        <M.Navigation>
          <M.NavLink href="/main" style={getActiveLinkStyle("/main")}>
            추천
          </M.NavLink>
          <M.NavLink href="/search" style={getActiveLinkStyle("/search")}>
            검색
          </M.NavLink>
          <M.NavLink href="/posts" style={getActiveLinkStyle("/posts")}>
            포스트
          </M.NavLink>
        </M.Navigation>

        {isLoggedIn ? (
          <M.NavLink href="/mypage" style={getActiveLinkStyle("/mypage")}>
            마이페이지
          </M.NavLink>
        ) : (
          <M.AuthButton 
            // onClick={onLoginClick}
            onClick={() => navigate("/")}
            href="/"
          >로그인</M.AuthButton>
        )}
      </M.HeaderContent>
    </M.HeaderContainer>
  );
};

export default Header;
