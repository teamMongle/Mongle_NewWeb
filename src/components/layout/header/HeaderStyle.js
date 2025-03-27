import styled from "styled-components";
import LogoSrc from "../../../assets/images/mongle_.svg";

export const HeaderContainer = styled.header`
  width: 100%;
  height: 76px;
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

export const HeaderContent = styled.div`
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  padding: 0 100px;
  display: flex;
  align-items: center;
`;

export const Logo = styled.img.attrs({
  src: LogoSrc,
  alt: "Logo",
})`
  margin-right: 170px;
`;

export const Navigation = styled.nav`
  display: flex;
  gap: 52px;
  margin-right: auto;
`;

export const NavLink = styled.a`
  width: 72px;
  text-align: center;
  color: #666;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;

  &:hover {
    color: #333;
    cursor: pointer;
  }
`;

export const AuthButton = styled.button`
  background: none;
  border: none;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 500;
  color: #666;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;
