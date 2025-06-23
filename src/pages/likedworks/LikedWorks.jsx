import React from "react";
import SideBar from "../../components/sidebar/SideBar";
import Header from "../../components/layout/header/Header";

const LikedWorks = ({ isLoggedIn }) => {
  return (
    <div>
			<Header />
      <SideBar />
      {/* <h2>좋아요 목록 페이지</h2>
      <p>로그인 상태: {isLoggedIn ? "로그인됨" : "로그인 안됨"}</p> */}
      {/* 안씀 */}
    </div>
  );
};

export default LikedWorks;