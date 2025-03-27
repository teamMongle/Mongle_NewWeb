import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/homepage/HomePage";
// import SearchPage from "../pages/SearchPage";
// import PostsPage from "../pages/PostsPage";
// import MyPage from "../pages/MyPage";
// import LoginPage from "../pages/LoginPage";
// import NotFoundPage from "../pages/NotFoundPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/search" element={<SearchPage />} />
      <Route path="/posts" element={<PostsPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/login" element={<LoginPage />} /> */}
      {/* <Route path="*" element={<NotFoundPage />} /> 404 페이지 */}
    </Routes>
  );
};

export default AppRoutes;
